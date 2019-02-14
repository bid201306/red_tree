package com.home.redpro;

import java.util.List;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/eureka")
public class DiscoverEureka {
	private Logger logger = LoggerFactory.getLogger(DiscoverEureka.class);

	@Autowired
	private DiscoveryClient discoveryClient;

	
	@RequestMapping("/getRegistered")
	public String getRegistered(){
		//输出内容
		StringBuilder sb = new StringBuilder();
		sb.append("<table border=\"0\" cellpadding=\"8\"> <tr><th>eureka已注册服务数量:\t" + discoveryClient.getServices().size()  + "</th></tr>");
		sb.append("<tr><th>服务名</th><th>ip</th><th>端口</th><th>serviceId</th><th>uri</th><th>meta</th> </tr>");
		for( String s :  discoveryClient.getServices()){	
			logger.info(s);
			List<ServiceInstance> serviceInstances =  discoveryClient.getInstances(s);
			for(ServiceInstance si : serviceInstances){
				sb.append("<tr><td>" + s + "</td> <td>" + si.getHost() + "</td><td>" + si.getPort() + "</td><td>" + si.getServiceId() + "</td><td>" + si.getUri() + "</td><td>" + si.getMetadata() + "</td></tr>");
			}

		}
		logger.info(sb.toString());
		return sb.toString();
	}

}
