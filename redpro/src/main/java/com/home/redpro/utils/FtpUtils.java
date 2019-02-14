package com.home.redpro.utils;

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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FtpUtils {
	private Logger logger = LoggerFactory.getLogger(FtpUtils.class);

	private FTPClient ftpClient = null;
	private String    hostname;
	private int       port;
	private String    username;
	private String    password;
	public String    remoteDir;

	/**
	 * 本地字符编码 GBK
	 */
	static String LOCAL_CHARSET_GBK = "GBK";
	/**
	 * 本地字符编码 UTF-8
	 */
	static String LOCAL_CHARSET_UTF8= "UTF-8";
	/**
	 * ftp设值的编码
	 */
	private String FTP_CHARSET;

	// FTP协议里面，规定文件名编码为iso-8859-1
	static String SERVER_CHARSET = "ISO-8859-1";

	/**
	 * uploadFileDir的格式应该是 temp 默认取当前ftp用户登录的路径 + uploadFileDir
	 * */
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
	public FtpUtils(String hostname, int port, String username, String password, String uploadFileDir) {
		this.hostname = hostname;
		this.port = port;
		this.username = username;
		this.password = password;
		//uploadFileDir的格式应该是 temp 默认取当前ftp用户登录的路径 + uploadFileDir
		uploadFileDir = removeFirstSeparate(uploadFileDir);
		this.uploadFileDir = validatePath(uploadFileDir);
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
		//设置超时
		//ftpClient.setConnectTimeout(5000);
		ftpClient.connect(hostname);
		if (!ftpClient.login(username, password)) {
			throw new Exception("FTP log error");
		}
		ftpClient.enterLocalPassiveMode();
		if (FTPReply.isPositiveCompletion(ftpClient.sendCommand("OPTS UTF8", "ON"))) {
			this.FTP_CHARSET = LOCAL_CHARSET_UTF8;
		} else {
			this.FTP_CHARSET = LOCAL_CHARSET_GBK;
		}
		logger.info("服务器编码为:\t" + FTP_CHARSET);
		ftpClient.setControlEncoding(FTP_CHARSET);
		ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);
		String pwd = getCurrentPath();
		pwd = validatePath(pwd);
		this.remoteDir = pwd;
		logger.info("用户登录路径:\t" + pwd);
		ftpClient.changeWorkingDirectory(pwd);
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

	/**
	 * 
	 * @Title: getFileSize
	 * @Description: TODO 获取文件大小
	 * @param @param fileName
	 * @param @return
	 * @param @throws IOException    
	 * @return Long    
	 * @throws
	 * @author huangyongzhi
	 * @date 2018年9月14日
	 * @version V1.0
	 */
	public Long getFileSize(String fileName) throws IOException {
		changeWorkingDirectory(remoteDir + uploadFileDir);
		FTPFile[] files = ftpClient.listFiles(fileName);
		if(files != null && files.length > 0) {
			String name = files[0].getName();
			//命名规则是 500            32 Sep 12 07:44 test.txt
			//如果linux不改内核 这个不会变 即获取第二个非空格
			String[] nameArray = name.split(" ");
			for(int i=1; i<nameArray.length;i++) {
				String temp = nameArray[i];
				if(!temp.equals("")) {
					return Long.valueOf(temp);
				}				
			}
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
			d = new String(dir.toString().getBytes(FTP_CHARSET), SERVER_CHARSET);
			//尝试切入目录
			if(changeWorkingDirectory(d))
				return true;
			String[] arr =  dir.split("/");
			StringBuffer sbfDir=new StringBuffer();
			//循环生成子目录
			for(String s : arr){
				//目录编码，解决中文路径问题
				d = new String(s.toString().getBytes(FTP_CHARSET),SERVER_CHARSET);
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
		return dateString[0] + "/" + dateString[1];
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

	/**
	 * 
	 * @Title: validatePath
	 * @Description: TODO 如果字符串最后一位没有/ 则补上
	 */
	public String validatePath(String path) {
		if(path.length() > 1) {
			if(!path.substring(path.length() -1).equals("/")) {
				path = path + "/";
			}
		}
		return path;
	}

	/**
	 * 
	 * @Title: removeFirstSeparate
	 * @Description: 如果首位是/ 则移除
	 */
	public String removeFirstSeparate(String path) {
		if(path.length() > 1) {
			String fisrtWord = path.substring(0,1);
			if(fisrtWord.equals("/")) {
				path = path.substring(1,path.length());
			}
		}
		return path;
	}


	// 根据Unicode编码完美的判断中文汉字和符号
	private static boolean isChinese(char c) {
		Character.UnicodeBlock ub = Character.UnicodeBlock.of(c);
		if (ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS || ub == Character.UnicodeBlock.CJK_COMPATIBILITY_IDEOGRAPHS
				|| ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A || ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_B
				|| ub == Character.UnicodeBlock.CJK_SYMBOLS_AND_PUNCTUATION || ub == Character.UnicodeBlock.HALFWIDTH_AND_FULLWIDTH_FORMS
				|| ub == Character.UnicodeBlock.GENERAL_PUNCTUATION) {
			return true;
		}
		return false;
	}

	/**
	 * 
	 * @Title: isChinese
	 * @Description:  判断中文汉字和符号
	 * @param @param strName
	 */
	public  boolean isChineseString(String strName) {
		char[] ch = strName.toCharArray();
		for (int i = 0; i < ch.length; i++) {
			char c = ch[i];
			if (isChinese(c)) {
				return true;
			}
		}
		return false;
	}

	public static void main(String args[]) throws Exception {






		String str = "1哎哎哎234oo";

		String hostname="172.16.22.150";//ip
		String username="orchestration";//用户名
		String password="orchestration";//密码
		String remoteDir = "/home/orchestration/"; //操作目录
		String uploadFileDir = "test"; //上传目录
		int port = 21;
		FtpUtils ftp = new FtpUtils(hostname,port,username,password,uploadFileDir);

		//登录
		ftp.login();
		System.out.println(ftp.isChineseString(str));
		System.out.println("远程目录" + ftp.remoteDir);
		System.out.println("当前路径");
		System.out.println(ftp.getCurrentPath());
		String[] fileNames  = ftp.listFiles();
		Long size = ftp.getFileSize("test.txt");
		System.out.println("test.txtsize:\t" + size);
		System.out.println(ftp.getFileSize("uos-client-0.0.6.jar"));
		System.out.println("144345-2018 副本.txt size:\t" + ftp.getFileSize("144345-2018 副本.txt"));
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
		String sourceFile = "144345-2018-副本.txt";
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
