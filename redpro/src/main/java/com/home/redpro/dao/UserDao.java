package com.home.redpro.dao;

import java.util.List;
import java.util.Map;

import com.home.redpro.dto.RolePermission;
import com.home.redpro.dto.User;
import com.home.redpro.dto.UserRole;

public interface UserDao {

	/**
	 * 获取用户列表
	 * @param username
	 * @return
	 * @throws Exception
	 */
	public List<Map<String,Object>> qryuserList(String username ) throws Exception;
	
	/**
	 * 查询用户
	 * @param user
	 * @param password
	 * @return
	 * @throws Exception
	 */
	public User qryUser(String user, String password) throws Exception;
	
	public User qryUser(String user) throws Exception;
	
	public List<UserRole> qryUserRole(String user) throws Exception;
	
	public List<RolePermission> qryUserPermission(String roleId) throws Exception;
}
