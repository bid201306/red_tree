package com.home.redpro.shiro;

import java.util.HashMap;
import java.util.Map;

import org.apache.shiro.codec.Base64;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.CookieRememberMeManager;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.servlet.SimpleCookie;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 
    * @ClassName: ShiroConfiguration
    * @Description: TODO
    * @author huangyongzhi
    * @date 2018年8月21日
 */
//@Configuration
public class ShiroConfiguration {
	//将自己的验证方式加入容器
    @Bean
    public LoginShiroRealm loginShiroRealm() {
    	LoginShiroRealm loginShiroRealm = new LoginShiroRealm();
        return loginShiroRealm;
    }

    //权限管理，配置主要是Realm的管理认证
    @Bean
    public SecurityManager securityManager() {
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        securityManager.setRealm(loginShiroRealm());
        //注入记住我管理器  
        securityManager.setRememberMeManager(rememberMeManager());
        return securityManager;
    }

    //Filter工厂，设置对应的过滤条件和跳转条件
    @Bean
    public ShiroFilterFactoryBean shiroFilterFactoryBean(SecurityManager securityManager) {
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        shiroFilterFactoryBean.setSecurityManager(securityManager);
        Map<String,String> map = new HashMap<String, String>();
        //登出
        map.put("/logout","logout");
        //对所有用户认证
        map.put("/login","authc");
        //登录
        shiroFilterFactoryBean.setLoginUrl("/login");
        //首页
        shiroFilterFactoryBean.setSuccessUrl("/index");
        //错误页面，认证不通过跳转
        //shiroFilterFactoryBean.setUnauthorizedUrl("error/401");
        shiroFilterFactoryBean.setFilterChainDefinitionMap(map);
        return shiroFilterFactoryBean;
    }

    //加入注解的使用，不加入这个注解不生效
    @Bean
    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(SecurityManager securityManager) {
        AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor = new AuthorizationAttributeSourceAdvisor();
        authorizationAttributeSourceAdvisor.setSecurityManager(securityManager);
        return authorizationAttributeSourceAdvisor;
    }
    
    
    /**  
     * cookie对象;  
     * rememberMeCookie()方法是设置Cookie的生成模版，比如cookie的name，cookie的有效时间等等。  
     * @return  
    */  
   @Bean  
   public SimpleCookie rememberMeCookie(){  
         //System.out.println("ShiroConfiguration.rememberMeCookie()");  
         //这个参数是cookie的名称，对应前端的checkbox的name = rememberMe  
         SimpleCookie simpleCookie = new SimpleCookie("rememberMe");  
         //<!-- 记住我cookie生效时间30天 ,单位秒;-->  
         simpleCookie.setMaxAge(60*60*2);  
         return simpleCookie;  
   }  
     
   /**  
     * cookie管理对象;  
     * rememberMeManager()方法是生成rememberMe管理器，而且要将这个rememberMe管理器设置到securityManager中  
     * @return  
    */  
   @Bean  
   public CookieRememberMeManager rememberMeManager(){  
         //System.out.println("ShiroConfiguration.rememberMeManager()");  
         CookieRememberMeManager cookieRememberMeManager = new CookieRememberMeManager();  
         cookieRememberMeManager.setCookie(rememberMeCookie());  
         //rememberMe cookie加密的密钥 建议每个项目都不一样 默认AES算法 密钥长度(128 256 512 位)  
         cookieRememberMeManager.setCipherKey(Base64.decode("2AvVhdsgUs0FSA3SDFAdag=="));  
         return cookieRememberMeManager;  
   }  
   

}
