package com.home.redpro.shiro;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.beetl.core.Configuration;
import org.beetl.core.GroupTemplate;
import org.beetl.core.Template;
import org.beetl.core.resource.StringTemplateResourceLoader;

import com.home.redpro.utils.GsonHelper;

public class ShiroExt {
	/**
	 * 验证当前用户是否为“访客”，即未认证（包含未记住）的用户。
	 *
	 * @return
	 */
	public boolean isGuest() {
		return getSubject() == null || getSubject().getPrincipal() == null;
	}

	/**
	 * 认证通过或已记住的用户。
	 *
	 * @return
	 */
	public boolean isUser() {
		return getSubject() != null && getSubject().getPrincipal() != null;
	}

	/**
	 * 已认证通过的用户。不包含已记住的用户，这是与user标签的区别所在。
	 *
	 * @return
	 */
	public boolean isAuthenticated() {
		return getSubject() != null && getSubject().isAuthenticated();
	}

	/**
	 * 未认证通过用户，与authenticated标签相对应。与guest标签的区别是，该标签包含已记住用户。
	 * @return
	 */
	public boolean isNotAuthenticated() {
		return !isAuthenticated();
	}

	/**
	 * 输出当前用户信息，通常为登录帐号信息
	 *
	 * @param map
	 * @return
	 */
	public String principal(Map map) {
		String strValue = null;
		if (getSubject() != null) {

			// Get the principal to print out
			Object principal;
			String type = map != null ? (String) map.get("type") : null;
			if (type == null) {
				principal = getSubject().getPrincipal();
			} else {
				principal = getPrincipalFromClassName(type);
			}
			String property = map != null ? (String) map.get("property") : null;
			// Get the string value of the principal
			if (principal != null) {
				if (property == null) {
					strValue = principal.toString();
				} else {
					strValue = getPrincipalProperty(principal, property);
				}
			}

		}

		if (strValue != null) {
			return strValue;
		} else {
			return null;
		}
	}

	/**
	 * 验证当前用户是否属于该角色。
	 *
	 * @param roleName
	 * @return
	 */
	public boolean hasRole(String roleName) {
		return getSubject() != null && getSubject().hasRole(roleName);
	}

	/**
	 * 与hasRole标签逻辑相反，当用户不属于该角色时验证通过。
	 *
	 * @param roleName
	 * @return
	 */
	public boolean lacksRole(String roleName) {
		boolean hasRole = getSubject() != null
				&& getSubject().hasRole(roleName);
		return !hasRole;
	}

	/**
	 * 验证当前用户是否属于以下任意一个角色。 以逗号分隔
	 *
	 * @param roleNames
	 * @return
	 */
	public boolean hasAnyRole(String roleNames) {
		boolean hasAnyRole = false;

		Subject subject = getSubject();

		if (subject != null) {

			// Iterate through roles and check to see if the user has one of the
			// roles
			for (String role : roleNames.split(",")) {

				if (subject.hasRole(role.trim())) {
					hasAnyRole = true;
					break;
				}

			}

		}

		return hasAnyRole;
	}

	/**
	 * 验证当前用户是否拥有指定权限。
	 *
	 * @param p
	 * @return
	 */
	public boolean hasPermission(String p) {
		return getSubject() != null && getSubject().isPermitted(p);
	}

	/**
	 * 与hasPermission标签逻辑相反，当前用户没有制定权限时，验证通过。
	 *
	 * @param p
	 * @return
	 */
	public boolean lacksPermission(String p) {
		return !hasPermission(p);
	}

	@SuppressWarnings({ "unchecked" })
	private Object getPrincipalFromClassName(String type) {
		Object principal = null;

		try {
			Class cls = Class.forName(type);
			principal = getSubject().getPrincipals().oneByType(cls);
		} catch (ClassNotFoundException e) {

		}
		return principal;
	}

	private String getPrincipalProperty(Object principal, String property) {
		String strValue = null;

		try {
			BeanInfo bi = Introspector.getBeanInfo(principal.getClass());

			// Loop through the properties to get the string value of the
			// specified property
			boolean foundProperty = false;
			for (PropertyDescriptor pd : bi.getPropertyDescriptors()) {
				if (pd.getName().equals(property)) {
					Object value = pd.getReadMethod().invoke(principal,
							(Object[]) null);
					strValue = String.valueOf(value);
					foundProperty = true;
					break;
				}
			}

			if (!foundProperty) {
				final String message = "Property [" + property
						+ "] not found in principal of type ["
						+ principal.getClass().getName() + "]";

				throw new RuntimeException(message);
			}

		} catch (Exception e) {
			final String message = "Error reading property [" + property
					+ "] from principal of type ["
					+ principal.getClass().getName() + "]";

			throw new RuntimeException(message, e);
		}

		return strValue;
	}

	protected Subject getSubject() {
		return SecurityUtils.getSubject();
	}

	public static void main(String[] args) throws IOException {
		StringTemplateResourceLoader resourceLoader = new StringTemplateResourceLoader();
		Configuration cfg = Configuration.defaultConfiguration();
		GroupTemplate gt = new GroupTemplate(resourceLoader, cfg);
		String template = "hello, ${PROD_ATTR.VPC.i4!}";
		Template t = gt.getTemplate(template);
		Map<String,Object> test = new HashMap<String, Object>();
		Map<String,Object> vpc = new HashMap<String, Object>();
		Map<String,Object> iMap = new HashMap<String, Object>();
		for(int i=0; i<5; i++) {
			iMap.put("i"+i, i * 10000 + "");
		}
		vpc.put("VPC", iMap);
		test.put("PROD_ATTR", vpc);		
		System.out.println(GsonHelper.toJson(test));
		t.binding("PROD_ATTR", vpc);
		String str = t.render();
		System.out.println(str);

	}

	public static void testBind() throws IOException {
		StringTemplateResourceLoader resourceLoader = new StringTemplateResourceLoader();
		Configuration cfg = Configuration.defaultConfiguration();
		GroupTemplate gt = new GroupTemplate(resourceLoader, cfg);
		String template = "hello, ${PROD_ATTR.VPC.i4!}";
		Template t = gt.getTemplate(template);
		Map<String,Object> test = new HashMap<String, Object>();
		Map<String,Object> vpc = new HashMap<String, Object>();
		Map<String,Object> iMap = new HashMap<String, Object>();
		for(int i=0; i<5; i++) {
			iMap.put("i"+i, i * 10000 + "");
		}
		vpc.put("VPC", iMap);
		test.put("PROD_ATTR", vpc);		
		System.out.println(GsonHelper.toJson(test));
		t.binding("PROD_ATTR", vpc);
		String str = t.render();
		System.out.println(str);
	}

}