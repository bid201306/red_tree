package com.home.redpro.service.imp;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import com.home.redpro.service.PublisherService;

@Service
public class PublisherServiceImp implements PublisherService{

	private static final Logger logger = Logger.getLogger(PublisherServiceImp.class);
	@Autowired
	private StringRedisTemplate stringRedisTemplate;

	@Override
	public String pushMessage(String words) {
		stringRedisTemplate.convertAndSend("words",words);
		logger.info("push message:\t" + words);
		return "success";
	}


}
