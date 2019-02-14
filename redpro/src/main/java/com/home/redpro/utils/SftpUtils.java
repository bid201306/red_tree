package com.home.redpro.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.Vector;

import org.apache.commons.io.IOUtils;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpException; 

/**
 * 
    * @ClassName: SftpUtils
    * @Description: FTP传输工具类
 */
public class SftpUtils {
    
    private ChannelSftp sftp;  
        
    private Session session;  
    /** SFTP 登录用户名*/    
    private String username; 
    /** SFTP 登录密码*/    
    private String password;  
    /** 私钥 */    
    private String privateKey;  
    /** SFTP 服务器地址IP地址*/    
    private String host;  
    /** SFTP 端口*/  
    private int port;  

    
        

    /**
     *  构造基于密码认证的sftp对象  
     * @param username 用户名
     * @param password 密码
     * @param host ip
     * @param port 端口
     */
    public SftpUtils(String username, String password, String host, int port) {  
        this.username = username;  
        this.password = password;  
        this.host = host;  
        this.port = port;  
    } 
    
    
    /**  
     * 构造基于秘钥认证的sftp对象 
     */  
    public SftpUtils(String username, String host, int port, String privateKey) {  
        this.username = username;  
        this.host = host;  
        this.port = port;  
        this.privateKey = privateKey;  
    }  
    
    
    public SftpUtils(){}  
    
    
    /** 
     * 连接sftp服务器 
     */  
    public void login(){  
        try {  
            JSch jsch = new JSch();  
            if (privateKey != null) {  
                jsch.addIdentity(privateKey);// 设置私钥  
            }  
            session = jsch.getSession(username, host, port);             
            if (password != null) {  
                session.setPassword(password);    
            }  
            Properties config = new Properties();  
            config.put("StrictHostKeyChecking", "no");  
            //超时
            session.setTimeout(5000);
            session.setConfig(config);  
            session.connect();             
            Channel channel = session.openChannel("sftp");  
            channel.connect();     
            sftp = (ChannelSftp) channel;  
        } catch (JSchException e) {  
            e.printStackTrace();
        }  
    }    
    
    /** 
     * 关闭连接 server  
     */  
    public void logout(){  
        if (sftp != null) {  
            if (sftp.isConnected()) {  
                sftp.disconnect();  
            }  
        }  
        if (session != null) {  
            if (session.isConnected()) {  
                session.disconnect();  
            }  
        }  
    }  
 
    
    /**  
     * 将输入流的数据上传到sftp作为文件。文件完整路径=basePath+directory
     * @param locateFilePath 本地文件路径
     * @param basePath  服务器的基础路径 
     * @param directory  上传到该目录  
     * @param sftpFileName  sftp端文件名  
     * @throws FileNotFoundException 
     */  
    public void upload(String locateFilePath, String basePath,String directory, String sftpFileName) throws SftpException, FileNotFoundException{  
    	 File file = new File(locateFilePath);  
         InputStream ins = new FileInputStream(file);  
        try {   
            sftp.cd(basePath);
            sftp.cd(directory);  
        } catch (SftpException e) { 
            //目录不存在，则创建文件夹
            String [] dirs=directory.split("/");
            String tempPath=basePath;
            for(String dir:dirs){
            	if(null== dir || "".equals(dir)) continue;
            	tempPath+="/"+dir;
            	try{ 
            		sftp.cd(tempPath);
            	}catch(SftpException ex){
            		sftp.mkdir(tempPath);
            		sftp.cd(tempPath);
            	}
            }
        }  
        sftp.put(ins, sftpFileName);  //上传文件
    } 
    
 
    /** 
     * 下载文件。
     * @param directory 下载目录  
     * @param downloadFile 下载的文件 
     * @param saveFile 存在本地的路径 
     */    
    public void download(String directory, String downloadFile, String saveFile) throws SftpException, FileNotFoundException{  
        if (directory != null && !"".equals(directory)) {  
            sftp.cd(directory);  
        }  
        File file = new File(saveFile);  
        sftp.get(downloadFile, new FileOutputStream(file));  
    }  
    
    /**  
     * 下载文件 
     * @param directory 下载目录 
     * @param downloadFile 下载的文件名 
     * @return 字节数组 
     */  
    public byte[] download(String directory, String downloadFile) throws SftpException, IOException{  
        if (directory != null && !"".equals(directory)) {  
            sftp.cd(directory);  
        }  
        InputStream is = sftp.get(downloadFile);  
          
        byte[] fileData = IOUtils.toByteArray(is);  
          
        return fileData;  
    }  
    
    
    /** 
     * 删除文件 
     * @param directory 要删除文件所在目录 
     * @param deleteFile 要删除的文件 
     */  
    public void delete(String directory, String deleteFile) throws SftpException{  
        sftp.cd(directory);  
        sftp.rm(deleteFile);  
    }  
    
    
    /** 
     * 列出目录下的文件 
     * @param directory 要列出的目录 
     * @param sftp 
     */  
    public Vector<?> listFiles(String directory) throws SftpException {  
        return sftp.ls(directory);  
    }  
      
    //上传文件测试
    public static void main(String[] args) throws SftpException, IOException {  
    		
    	//132.96.29.145
        SftpUtils sftp145 = new SftpUtils("ftpuser", "1qaz@wsx", "127.0.0.1",10045);
        sftp145.login();  
        //列出文件
        Vector files = sftp145.listFiles("./bin2");
        for(Object fileName : files) {
        	System.out.println(fileName);
        }
        System.out.println("*************************************************");
        //132.96.29.146
        SftpUtils sftp146 = new SftpUtils("ftpuser", "1qaz@wsx", "127.0.0.1", 29146);
        sftp146.login();  
        //列出文件
        files = sftp146.listFiles("./");
        for(Object fileName : files) {
        	System.out.println(fileName);
        }
        
      
        
        //上传
        sftp145.upload("D:\\zte\\yongzhi.txt","/home/ftpuser/","bin2", "yongzhi.txt");  
        
        //下载
        sftp145.download("/home/ftpuser/bin2", "yongzhi.txt", "d:\\123.txt");
        
        //删除文件
        //sftp145.delete("/home/ftpuser/bin2", "yongzhi.txt");
        
        //列出文件
        files = sftp145.listFiles("./");
        for(Object fileName : files) {
        	System.out.println(fileName);
        }
        sftp145.logout();  
        
    }  
}
