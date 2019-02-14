package com.home.redpro.websocket;

import java.util.Map;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

public class WebSocketInterceptor extends HttpSessionHandshakeInterceptor{
	@Override
	public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, 
			Map<String, Object> attributes) throws Exception { 
		if(request instanceof ServletServerHttpRequest){ 
			ServletServerHttpRequest serverHttpRequest = (ServletServerHttpRequest)request; 
			//获取参数 
			String userId = serverHttpRequest .getServletRequest().getParameter("userId"); 
			attributes.put(MessageHandler.USER_KEY, userId); 
		} 	   
		return true; 
	} 
}
