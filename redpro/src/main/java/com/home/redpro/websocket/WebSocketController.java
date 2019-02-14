package com.home.redpro.websocket;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class WebSocketController {

	@Resource(name = "messageHandler")
	MessageHandler messageHandler;

	@ResponseBody
	@RequestMapping("/send") 
	public String send(String msg){ 
		//messageHandler.sendMessageToUser("hyz", "服务端发送的内容:" + msg); 
		messageHandler.sendMessageToAllUsers("服务端发送的内容:" + msg);
		return "success"; 
	} 
}
