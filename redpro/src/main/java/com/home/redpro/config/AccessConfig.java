package com.home.redpro.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.home.redpro.interceptor.AccessInterceptor;

@SpringBootConfiguration
public class AccessConfig extends WebMvcConfigurerAdapter{

	@Autowired
	private AccessInterceptor accessInterceptor;
	
	/**
	 * 全局拦截器
	 */
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(accessInterceptor).addPathPatterns("/**");
	}
}
