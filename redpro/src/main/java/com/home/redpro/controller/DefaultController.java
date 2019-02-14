package com.home.redpro.controller;

import java.io.FileReader;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.home.redpro.dao.UserDao;
import com.home.redpro.dao.imp.TestDaoImp;

/**
 * 默认访问控制器
 * @author Yongzhi
 *
 */
@Controller
public class DefaultController {


	private static final Logger logger = Logger.getLogger(DefaultController.class);

	@Value("${yongzhi.name}")
	private String myName;

	@Value("${yongzhi.birthday}")
	private String birthday;

	@Value("${today}")
	private String say;

	@Autowired
	TestDaoImp testDaoImp;

	@Autowired
	UserDao userDao;

	@RequiresPermissions(value = { "valhalla" })
	@RequestMapping("/")	
	public ModelAndView redTree() throws Exception {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("name", "yongzhi");
		String words =  "Hello, " + myName + ", 生于" + birthday + ", saying, \"" + say + "\"";
		System.out.println(words);
		modelAndView.addObject("words", words);
		modelAndView.addObject("now", new Date());
		//查询数据库
		List<Map<String, Object>> userList =  userDao.qryuserList("1000");	
		modelAndView.addObject("userList", userList);

		modelAndView.setViewName("index");
		return modelAndView;
	}
	@RequestMapping("/info")
	@ResponseBody
	public String yongzhi(Model model) throws IOException {
		//判断授权
		Subject subject = SecurityUtils.getSubject();
		//拥有角色
		/*if(!subject.hasRole("admin")) {
			throw new AuthenticationException();
		}*/
		//拥有权限
		if(!subject.isPermitted("valhalla")) {
			throw new AuthenticationException();
		}
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
