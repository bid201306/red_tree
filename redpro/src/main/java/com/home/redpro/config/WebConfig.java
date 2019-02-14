package com.home.redpro.config;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.beetl.core.resource.WebAppResourceLoader;
import org.beetl.ext.spring.BeetlSpringViewResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternUtils;

import com.home.redpro.shiro.BeetlConfiguration;
import com.home.redpro.shiro.ShiroExt;

/**
 * 
    * @ClassName: WebConfig
    * @Description: TODO
    * @author huangyongzhi
    * @date 2018年8月21日
 */
@Configuration
public class WebConfig {

	

	/**
	 * 
	    * @Title: getBeetlGroupUtilConfiguration
	    * @Description: beetl 配置
	    * @param @return    
	    * @return BeetlGroupUtilConfiguration    
	    * @throws
	    * @author huangyongzhi
	    * @date 2018年8月21日
	    * @version V1.0
	 */
	
    @Bean(initMethod = "init")
    public BeetlConfiguration beetlConfiguration() throws IOException {
        BeetlConfiguration beetlConfiguration = new BeetlConfiguration();
        ResourcePatternResolver patternResolver = ResourcePatternUtils.getResourcePatternResolver(new DefaultResourceLoader());
        WebAppResourceLoader webAppResourceLoader =
                new WebAppResourceLoader(patternResolver.getResource("classpath:/").getFile().getPath());
        beetlConfiguration.setResourceLoader(webAppResourceLoader);
        return beetlConfiguration;
    }

    @Bean(name = "beetlViewResolver")
    public BeetlSpringViewResolver getBeeOtlSpringViewResolver() throws IOException {
        BeetlSpringViewResolver beetlSpringViewResolver = new BeetlSpringViewResolver();
        beetlSpringViewResolver.setPrefix("static/view/");
        beetlSpringViewResolver.setSuffix(".html");
        beetlSpringViewResolver.setContentType("text/html;charset=UTF-8");
        beetlSpringViewResolver.setOrder(0);
        beetlSpringViewResolver.setConfig(beetlConfiguration());
        return beetlSpringViewResolver;
    }


    
    
}
