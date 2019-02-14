package com.home.redpro.interceptor;

import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**
 * 
    * @ClassName: AccessInterceptor
    * @Description: 接口访问输出日志
    * @author huangyongzhi
    * @date 2017年5月21日
 */
@Component
public class AccessInterceptor implements HandlerInterceptor{

	private static final Logger logger = Logger.getLogger(AccessInterceptor.class);

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		try {
			StringBuilder sb = new StringBuilder();
			sb.append("\n\n---------------------------------------------------------------------------");
			sb.append("\nSpringMVC controller report [" + Thread.currentThread().getId() + "]\n");

			HandlerMethod handlerMethod = (HandlerMethod) handler;
			sb.append("Controller  : ").append(handlerMethod.getBeanType().getName()).append(".(").append(handlerMethod.getBeanType().getSimpleName()).append(".java:1)\n");
			
			Enumeration headerNames = request.getHeaderNames();
			sb.append("Header      : ");
		    while (headerNames.hasMoreElements()) {
		        String key = (String) headerNames.nextElement();
		        String value = request.getHeader(key);
		        sb.append(key + ":" + value + "\t");
		    }
			sb.append("Method      : ").append(handlerMethod.getMethod().getName()).append("\n");
			sb.append("Url         : ").append(request.getRequestURI()).append("\n");
			// print all parameters
			Enumeration<String> e = request.getParameterNames();
			if (e.hasMoreElements()) {
				sb.append("Parameter   : ");
				while (e.hasMoreElements()) {
					String name = e.nextElement();
					String[] values = request.getParameterValues(name);
					if (values.length == 1) {
						sb.append(name).append("=").append(values[0]);
					} else {
						sb.append(name).append("[]={");
						for (int i = 0; i < values.length; i++) {
							if (i > 0)
								sb.append(",");
							sb.append(values[i]);
						}
						sb.append("}");
					}
					sb.append("  ");
				}
				sb.append("\n");
			}
			
			logger.info(sb.toString());
		} catch (Exception e) {
			logger.error(e.getMessage(), e.getCause());
		}

		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub

	}
}
