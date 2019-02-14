package com.home.redpro.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/fish")
public class FishTestController {

	@RequestMapping("/test")	
	public ModelAndView test() throws Exception {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("fish/test");
		return modelAndView;
	}
	
	@RequestMapping("/model")	
	public ModelAndView model() throws Exception {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("fish/model");
		return modelAndView;
	}
	
	@RequestMapping("/relative")	
	public ModelAndView relative() throws Exception {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("fish/relative");
		return modelAndView;
	}
}
