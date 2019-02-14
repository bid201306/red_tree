package com.home.redpro.ws.ftp;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPClientConfig;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;

public class FtpUtil {

	private FTPClient ftpClient = null;
	private String    hostname;
	private int       port;
	private String    username;
	private String    password;
	private String    remoteDir;
	private String uploadFileDir;
	public static final String dateForm = "yyyy-MM-dd"; // 日期格式
	private String[] dateString;
	/**
	 * 初始化
	 * @param hostname
	 * @param port
	 * @param username
	 * @param password
	 * @param remoteDir 账户所在目录
	 * @param uploadFileDir 对方上传的目录
	 */
	public FtpUtil(String hostname, int port, String username, String password, String remoteDir, String uploadFileDir) {
		this.hostname = hostname;
		this.port = port;
		this.username = username;
		this.password = password;
		this.remoteDir = remoteDir;
		this.uploadFileDir = uploadFileDir;
		if (remoteDir == null) {
			remoteDir = "/";
		}
		DateFormat format = new SimpleDateFormat(dateForm);
		Date toDay = new Date();
		dateString = format.format(toDay).split("-");

	}

	/**
	 * FTP登陆
	 * @throws IOException
	 */
	public void login() throws Exception {
		ftpClient = new FTPClient();
		ftpClient.configure(getFTPClientConfig());
		ftpClient.setDefaultPort(port);
		ftpClient.setControlEncoding("UTF-8");
		ftpClient.connect(hostname);
		if (!ftpClient.login(username, password)) {
			throw new Exception("FTP log error");
		}
		ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);
		ftpClient.changeWorkingDirectory(remoteDir);
	}

	/**
	 * 得到配置
	 * @return
	 */
	private FTPClientConfig getFTPClientConfig() {
		// 创建配置对象
		FTPClientConfig conf = new FTPClientConfig(FTPClientConfig.SYST_NT);
		conf.setServerLanguageCode("zh");
		return conf;
	}

	/**
	 * 关闭FTP服务器
	 */
	public void closeServer() {
		try {
			if (ftpClient != null) {
				ftpClient.logout();
				ftpClient.disconnect();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 链接是否已经打开
	 * @return
	 */
	public boolean serverIsOpen() {
		if (ftpClient == null) {
			return false;
		}
		return !ftpClient.isConnected();
	}

	/**
	 * 列表FTP文件
	 * @param regEx
	 * @return
	 */
	public String[] listFiles() {
		String[] names;
		try {
			names = ftpClient.listNames();
			if (names == null)
				return new String[0];
			return names;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new String[0];
	}


	/**
	 *  判定文件是否存在
	 * @param fileName
	 * @return
	 * @throws IOException 
	 */
	public boolean isFileExist(String fileName) throws IOException {
		changeWorkingDirectory(remoteDir + uploadFileDir);
		String[] fileList =  listFiles();
		for(int i=0; i<fileList.length; i++) {
			if(fileList[i].equals(fileName)) {
				return true;
			}
		}
		return false;
	}

	public Long getFileSize(String fileName) throws IOException {

		changeWorkingDirectory(remoteDir + uploadFileDir);
		FTPFile[] files = ftpClient.listFiles(fileName);
		if(files != null && files.length > 0) {
			return files[0].getSize();
		}
		return 0L;
	}

	/**
	 * 取得FTP操作类的句柄
	 * @return
	 */
	public FTPClient getFtpClient() {
		return ftpClient;
	}

	/**
	 * 上传
	 * @throws Exception
	 */
	public boolean upload(String localFilePath, String remoteFilePath) throws Exception {
		boolean state = false;
		File localFile = new File(localFilePath);
		if (!localFile.isFile() || localFile.length() == 0) {
			return state;
		}
		FileInputStream localIn = new FileInputStream(localFile);
		state = this.upload(localIn, remoteFilePath);
		localIn.close();
		return state;
	}

	/**
	 * 上传
	 * @throws Exception
	 */
	public boolean upload(InputStream localIn, String remoteFilePath) throws Exception {
		this.createDir(new File(remoteFilePath).getParent());
		boolean result = ftpClient.storeFile(remoteFilePath, localIn);
		return result;
	}

	/**
	 * 是否存在FTP目录
	 * @param dir
	 * @param ftpClient
	 * @return
	 */
	public boolean isDirExist(String dir) {
		try {
			int retCode = ftpClient.cwd(dir);
			//这里需要返回目标目录
			changeWorkingDirectory(remoteDir);
			return FTPReply.isPositiveCompletion(retCode);
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * 创建FTP多级目录
	 * @param remoteFilePath
	 * @throws IOException
	 */
	public void createDir(String dir) throws IOException {
		if (!isDirExist(dir)) {
			File file = new File(dir);
			this.createDir(file.getParent());
			ftpClient.makeDirectory(dir);
		}
	}


	/**
	 * 
	 * @Title: makeDir
	 * @Description: 创建目录  如果目录存在则直接返回true
	 * @param @param dir
	 * @param @return    
	 * @return boolean    
	 * @throws
	 * @author huangyongzhi
	 * @date 2018年9月13日
	 * @version V1.0
	 */
	public boolean makeDir(String dir) {
		if(isDirExist(dir))
			return true;
		String d;
		try {
			//目录编码，解决中文路径问题
			d = new String(dir.toString().getBytes("GBK"),"iso-8859-1");
			//尝试切入目录
			if(changeWorkingDirectory(d))
				return true;
			String[] arr =  dir.split("/");
			StringBuffer sbfDir=new StringBuffer();
			//循环生成子目录
			for(String s : arr){
				//目录编码，解决中文路径问题
				d = new String(s.toString().getBytes("GBK"),"iso-8859-1");
				//尝试切入目录
				if(changeWorkingDirectory(d))
					continue;
				if(!ftpClient.makeDirectory(d)){
					return false;
				}
				changeWorkingDirectory(d);
			}
			//这里需要返回目标目录
			changeWorkingDirectory(remoteDir);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * 删除文件
	 * @param remoteFilePath
	 */
	public boolean delFile(String remoteFilePath) {
		try {
			return ftpClient.deleteFile(remoteFilePath);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * 下载
	 * @throws Exception
	 */
	public void download(String localFilePath, String remoteFilePath) throws Exception {
		OutputStream localOut = new FileOutputStream(localFilePath);
		this.download(localOut, remoteFilePath);
		localOut.close();
	}

	/**
	 * 下载
	 * @throws Exception
	 */
	public void download(OutputStream localOut, String remoteFilePath) throws Exception {
		boolean result = ftpClient.retrieveFile(remoteFilePath, localOut);
		if (!result) {
			throw new Exception("download fail!");
		}
	}


	/**
	 * 
	 * @Title: renameFile
	 * @Description: 相当于mv 注意 不会主动创建目录 需要自行创建
	 * @param @param srcFname
	 * @param @param targetFname
	 * @param @return    
	 * @return boolean    
	 * @throws
	 * @author huangyongzhi
	 * @date 2018年9月13日
	 * @version V1.0
	 * @throws IOException 
	 */
	public boolean renameFile(String srcFname,String targetFname) throws IOException{ 
		printWorkingDirectory();
		boolean flag = false;  
		if( ftpClient!=null ){  
			try {  
				flag = ftpClient.rename(uploadFileDir + srcFname,targetFname);  
			} catch (IOException e) {  
				e.printStackTrace();  
			}  
		}  
		return flag;  
	}  

	/**
	 * 
	 * @Title: changeWorkingDirectory
	 * @Description: 切换目录
	 * @param @param remoteDir
	 * @param @return
	 * @param @throws IOException    
	 * @return boolean    
	 * @throws
	 * @author huangyongzhi
	 * @date 2018年9月13日
	 * @version V1.0
	 */
	public boolean changeWorkingDirectory(String remoteDir) throws IOException {
		return ftpClient.changeWorkingDirectory(remoteDir);

	}

	/**
	 * 
	 * @Title: printWorkingDirectory
	 * @Description: 相当于pwd
	 * @param @return
	 * @param @throws IOException    
	 * @return String    
	 * @throws
	 * @author huangyongzhi
	 * @date 2018年9月13日
	 * @version V1.0
	 */
	public String printWorkingDirectory() throws IOException {
		String pwd = ftpClient.printWorkingDirectory();
		System.out.println("当前目录:\t" + pwd);
		return pwd;
	}


	public String getDateDir() {
		return dateString[0] + "/" + dateString[1] + "/" + dateString[0] + dateString[1] + dateString[2];
		//return "2018/09/20180915";
	}

	public String getCurrentPath() throws IOException {
		String[] rt = ftpClient.doCommandAsStrings("pwd", "");
		Pattern p = Pattern.compile("\"(.*?)\"");
		Matcher m=p.matcher(rt[0]);
		String pwd = "";
		if(m.find()){
			pwd = m.group(0).replace("\"","");
		}
		return pwd;
	}

	public static void main(String args[]) throws Exception {


		String hostname="172.16.22.150";//临时域名
		String username="orchestration";//用户名
		String password="orchestration";//密码
		String remoteDir = "/home/orchestration/";
		String uploadFileDir = "test/";
		int port = 21;
		FtpUtil ftp = new FtpUtil(hostname,port,username,password,remoteDir,uploadFileDir);
		//登录
		ftp.login();

		System.out.println("当前路径");
		System.out.println(ftp.getCurrentPath());
		ftp.listFiles();
		Long size = ftp.getFileSize("test.txt");
		System.out.println("size:\t" + size);
		System.out.println(ftp.getFileSize("uos-client-0.0.6.jar"));
		System.out.println(ftp.getFileSize("2.jar") == 0L);
		System.out.println(ftp.getDateDir());
		if(true) {
			return;
		}

		//下载
		//ftp.download("D:\\t.sh", "/home/orchestration/test/t.sh");
		//ftp.download("D:\\te.txt", "test.txt");
		//重命名
		// ftp.renameFile("test.txt", "hide.txt");
		//移动
		String dir = ftp.getDateDir();

		//判定文件是否存在
		String sourceFile = "t.sh";
		boolean isExist = ftp.isFileExist(sourceFile);
		System.out.println(sourceFile + "存在:\t" + isExist);
		//获取后缀
		String suffix = sourceFile.substring(sourceFile.lastIndexOf(".") + 1);
		//移动的目录
		String newPath = dir + "/" + System.currentTimeMillis() + "." + suffix;
		System.out.println(newPath);
		//判定目录是否存在
		boolean isExist1 = ftp.isDirExist(dir);
		System.out.println("isExist1:\t" + isExist1);
		//创建目录
		ftp.makeDir(dir);
		boolean isExist2 = ftp.isDirExist(dir);
		System.out.println("isExist2后目录");
		ftp.printWorkingDirectory();
		System.out.println("isExist2:\t" + isExist2);



		System.out.println("mv文件");
		//移动文件
		boolean move = ftp.renameFile(sourceFile, newPath);

		System.out.println("移动情况:\t" + move);

		//关闭链接
		ftp.closeServer();



	}

}
