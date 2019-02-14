package com.home.redpro.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * 
    * @ClassName: SystemController
    * @Description: 后台管理
    * @author huangyongzhi
    * @date 2018年8月29日
 */
@Controller
@RequestMapping("/system")
public class SystemController extends BaseController{
	
	@RequestMapping("/index")
	public ModelAndView index() {	
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("system/index");
		return modelAndView;
	}
}
