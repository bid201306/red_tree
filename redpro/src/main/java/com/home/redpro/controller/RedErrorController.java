package com.home.redpro.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.boot.autoconfigure.web.BasicErrorController;
import org.springframework.boot.autoconfigure.web.DefaultErrorAttributes;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;
/**
 * 
    * @ClassName: RedErrorController
    * @Description: TODO
    * @author huangyongzhi
    * @date 2018年8月20日
 */
@Controller
public class RedErrorController extends BasicErrorController {
	
	private static final Logger logger = Logger.getLogger(RedErrorController.class);
	
	public RedErrorController(ServerProperties serverProperties) {
		super(new DefaultErrorAttributes(), serverProperties.getError());
		// TODO Auto-generated constructor stub
	}


    /**
     * 覆盖默认的Json响应
     */
    @Override
    public ResponseEntity<Map<String, Object>> error(HttpServletRequest request) {
        Map<String, Object> body = getErrorAttributes(request,
                isIncludeStackTrace(request, MediaType.ALL));
        HttpStatus status = getStatus(request);

        //输出自定义的Json格式
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("status", false);
        map.put("msg", body.get("message"));

        return new ResponseEntity<Map<String, Object>>(map, status);
    }



    @Override
    public ModelAndView errorHtml(HttpServletRequest request, HttpServletResponse response) {
        //请求的状态
        HttpStatus status = getStatus(request);
        response.setStatus(getStatus(request).value());

        Map<String, Object> model = getErrorAttributes(request,
                isIncludeStackTrace(request, MediaType.TEXT_HTML));
        ModelAndView modelAndView = resolveErrorView(request, response, status, model);
        //如果获取的exception为null 则说明是404
        Object exceptionObject = model.get("exception");
        if(exceptionObject == null) {
        	//指定自定义的视图
            return(modelAndView == null ? new ModelAndView("error/404", model) : modelAndView);
        }else {
        	Object messageObject = model.get("message");
        	if(messageObject != null) {
        		String message = messageObject.toString();
        		logger.info("message:\t" + message);
        		if(message.contains("anonymous")) {
        			return new ModelAndView("login", model);
        		}
        	}
        	String exception = exceptionObject.toString();
        	logger.info("exception:\t" + exception);
        	if(exception.contains("UnauthenticatedException")) {
        	   return new ModelAndView("error/403", model);
        	}
        	return new ModelAndView("error/403", model);
        }
        
        
    }
}
