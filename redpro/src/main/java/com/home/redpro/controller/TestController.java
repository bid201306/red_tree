package com.home.redpro.controller;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.home.redpro.dao.UserDao;
import com.home.redpro.dao.imp.TestDaoImp;
import com.home.redpro.interceptor.AccessInterceptor;
import com.home.redpro.utils.GsonHelper;

@Controller
@RequestMapping("/test")
public class TestController {
	private static final Logger logger = Logger.getLogger(TestController.class);

	private String myName;
	
	private String birthday;

	private String say;
	
	
	@Autowired
	TestDaoImp testDaoImp;
	
	@Autowired
	UserDao userDao;
	
    @RequestMapping("/hello")
    public String hello(Model model) throws Exception {
        return "test";
    }
    
    @RequestMapping("/queryUserList")
    @ResponseBody
    public String queryUosUserList(String userName) throws Exception {
    	List<Map<String, Object>> userList =  userDao.qryuserList(userName);	
    	return GsonHelper.toJson(userList);
    }
    
    @RequestMapping("/saveTest")
    @ResponseBody
    public String saveTest() {
    	int insertRows = testDaoImp.insertTest("4","289500");
    	return "插入数据:\t" + insertRows + "条";
    }
    
    @RequestMapping("/getDetailCloudLineInfo")
    @ResponseBody
    public String getDetailCloudLineInfo(@RequestBody String params) throws IOException {
    	logger.info("\nbody json:\t " + params);
    	String path = "src/main/resources/DetailCloudLineInfo.txt";
		FileReader fr = new FileReader(path);
		StringBuffer wordsSB = new StringBuffer();
		int ch=0;
		while((ch=fr.read()) != -1){
			wordsSB.append((char)ch);
		}  
		fr.close();
		logger.info("返回josn:\t" + wordsSB);
    	return wordsSB.toString();
    }
    
    
    /**
     * 
        * @Title: getDetailVlanInfo
        * @Description: <p style='color:red;font-weight:900;'>获取Vlan信息</p>
        * @param params
        * @return
        * @throws IOException  
        * String    
        * @throws
     */
    @RequestMapping("/getDetailVlanInfo")
    @ResponseBody
    public String getDetailVlanInfo(@RequestBody String params) throws IOException {
    	logger.info("\nbody json:\t " + params);
    	String path = "src/main/resources/DetailVlanInfo.txt";
		FileReader fr = new FileReader(path);
		StringBuffer wordsSB = new StringBuffer();
		int ch=0;
		while((ch=fr.read()) != -1){
			wordsSB.append((char)ch);
		}  
		fr.close();
		logger.info("返回josn:\t" + wordsSB);
    	return wordsSB.toString();
    }
    
}