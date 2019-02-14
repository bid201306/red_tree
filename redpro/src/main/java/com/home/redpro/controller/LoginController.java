package com.home.redpro.controller;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.home.redpro.dao.UserDao;
import com.home.redpro.dto.User;
import com.home.redpro.utils.GsonHelper;

@Controller
public class LoginController extends BaseController {
	
	@Autowired
	UserDao userDao;

	@RequestMapping("/login")
	public String index() {		
		return "login";
	}
	
	@RequestMapping("/notLogin")
	@ResponseBody
	public String notLogin() {		
		return "notLogin";
	}
	
	
	@RequestMapping("/login/validate")
	@ResponseBody
	public String validate(@RequestParam(name="user") String userName, @RequestParam(name="password") String password, boolean rememberMe) throws Exception {	
		logger.info("用户登录:\t" + userName);
		//添加用户认证信息
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken usernamePasswordToken = new UsernamePasswordToken(userName, password, rememberMe);
		//进行验证，这里可以捕获异常，然后返回对应信息
        try {
			subject.login(usernamePasswordToken);
		} catch (AuthenticationException e) {
			usernamePasswordToken.clear();
			throw new Exception("用户或密码不正确！");
        }
        Session session = SecurityUtils.getSubject().getSession();
        User user = (User) session.getAttribute("user");
		return GsonHelper.toJson(user);
	}
}
