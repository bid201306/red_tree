package com.home.redpro.controller;

import java.io.FileReader;
import java.io.IOException;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 默认访问控制器
 * @author Yongzhi
 *
 */
@Controller
public class DefaultController {

      
	   private static final Logger logger = Logger.getLogger(DefaultController.class);
	
	   @RequestMapping("/index")
	    public String index(Model model) {
	        return "index";
	    }
	    @RequestMapping("/")
	    public String redTree(Model model) {
	        model.addAttribute("name", "yongzhi");
	        return "index";
	    }
	    @RequestMapping("/info")
	    @ResponseBody
	    public String yongzhi(Model model) throws IOException {
	    	logger.info("通过eureka访问");
	    	String path = "src/main/resources/yongzhi.txt";
	    	FileReader fr = new FileReader(path);
	        StringBuffer wordsSB = new StringBuffer();
	        int ch=0;
	        while((ch=fr.read()) != -1){
	        	wordsSB.append((char)ch);
	        }  
	        return wordsSB.toString().replaceAll("。", "</br></br>");
	    }
}
