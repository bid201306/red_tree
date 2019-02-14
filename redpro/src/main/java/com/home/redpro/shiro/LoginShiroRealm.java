package com.home.redpro.shiro;

import java.util.List;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import com.home.redpro.dao.UserDao;
import com.home.redpro.dto.RolePermission;
import com.home.redpro.dto.User;
import com.home.redpro.dto.UserRole;

/**
 * 
    * @ClassName: LoginShiroRealm
    * @Description: TODO
    * @author huangyongzhi
    * @date 2018年8月21日
 */
public class LoginShiroRealm extends AuthorizingRealm{

	@Autowired
	UserDao userDao;

	//角色权限和对应权限添加
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
		//获取登录用户名
		String name= (String) principalCollection.getPrimaryPrincipal();
		//查询用户角色
		List<UserRole> roleList = null;
		try {
			roleList = userDao.qryUserRole(name);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//添加角色和权限
		SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
		for (UserRole userRole : roleList) {
			//添加角色
			simpleAuthorizationInfo.addRole(userRole.getRoleName());
			//查询角色权限
			String roleId = userRole.getRoleId();
			List<RolePermission> rolePermission = null;
			try {
				rolePermission = userDao.qryUserPermission(roleId);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			for (RolePermission permission : rolePermission) {
				//添加权限
				simpleAuthorizationInfo.addStringPermission(permission.getPermission());
			}
		}
		return simpleAuthorizationInfo;
	}

	//用户认证
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
		//加这一步的目的是在Post请求的时候会先进认证，然后在到请求
		if (authenticationToken.getPrincipal() == null) {
			throw new UnknownAccountException();
		}
		//获取用户信息
		String name = authenticationToken.getPrincipal().toString();
		User user = null;
		try {
			user = userDao.qryUser(name);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if (user == null) {
			throw new UnknownAccountException();
		}
		//这里验证authenticationToken和simpleAuthenticationInfo的信息
		SimpleAuthenticationInfo simpleAuthenticationInfo = new SimpleAuthenticationInfo(name, user.getPassword().toString(), getName());
		 // 当验证都通过后，把用户信息放在session里
        Session session = SecurityUtils.getSubject().getSession();
        session.setAttribute("user", user);
		return simpleAuthenticationInfo;

	}

}
