package com.home.redpro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

//激活eureka中的DiscoveryClient实现
//@EnableDiscoveryClient 
//路由激活
//@EnableZuulProxy
@SpringBootApplication
public class RedproApplication {

	public static void main(String[] args) {
		SpringApplication.run(RedproApplication.class, args);
	}
}
