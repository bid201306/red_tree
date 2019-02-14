package com.home.redpro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
//激活eureka中的DiscoveryClient实现
//@EnableDiscoveryClient 
@SpringBootApplication
public class RedproOaasApplication {

	public static void main(String[] args) {
		SpringApplication.run(RedproOaasApplication.class, args);
	}
}
