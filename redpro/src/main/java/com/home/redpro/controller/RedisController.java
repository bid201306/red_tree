package com.home.redpro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.home.redpro.service.PublisherService;


/**
 * redeis生产者 向redis数据插入数据
 * @author Yongzhi
 *
 */
@RestController
public class RedisController {
	@Autowired
    private PublisherService publisherService;
	
	@RequestMapping("/push")
	public String pushMessage(@RequestParam(name="msg",defaultValue="ste",required=true) String msg) {
		return publisherService.pushMessage(msg);
	}
}
