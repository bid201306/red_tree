package com.home.redpro.controller;

import java.util.HashMap;
import java.util.Map;

import org.apache.shiro.authc.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

//异常处理类
//@ControllerAdvice
public class ExControllerAdvice {
	 /**
     * 全局异常捕捉处理
     * @param ex
     * @return
     */
    @ResponseBody
    @ExceptionHandler(value = Exception.class)
    public Map errorHandler(Exception ex) {
    	if(ex instanceof AuthenticationException) {
    		
    	}
        Map map = new HashMap();
        map.put("code", 1992);
        map.put("msg", ex.getMessage());
        return map;
    }
    
}
