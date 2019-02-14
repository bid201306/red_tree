package com.home.redpro.websocket;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer{
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) { 
		registry.addHandler(myHandler(), "/testHandler").addInterceptors(new WebSocketInterceptor()); 
		registry.addHandler(myHandler(), "/socketJs/testHandler").addInterceptors(new WebSocketInterceptor()).withSockJS(); 

	} 

	@Bean("messageHandler")
	public WebSocketHandler myHandler(){ 
		return new MessageHandler(); 
	} 
}
