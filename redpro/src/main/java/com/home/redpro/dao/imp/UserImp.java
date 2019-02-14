package com.home.redpro.dao.imp;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.home.redpro.dao.UserDao;
import com.home.redpro.dto.RolePermission;
import com.home.redpro.dto.User;
import com.home.redpro.dto.UserRole;

@Service
public class UserImp implements UserDao{

	@Autowired
    private JdbcTemplate jdbcTemplate;
	
	@Override
	public List<Map<String, Object>> qryuserList(String username) throws Exception {
        //String sqlString = "SELECT * FROM RED_USER WHERE ID < ?";
		String sqlString = "SELECT COUNT(1) NUM FROM UOS_TACHE_DEF WHERE PACKAGE_DEFINE_ID = 4065000 AND TACHE_CODE = '4063000:A6579-51-31791-947-73034' ";
        //List<Map<String,Object>> list= jdbcTemplate.queryForList(sqlString,new Object[]{username});
        List<Map<String,Object>> list= jdbcTemplate.queryForList(sqlString);

        return list;
	}

	/**
	 * 查询用户信息
	 */
	@Override
	public User qryUser(String user, String password) throws Exception {
		String sqlString = "SELECT ID,USERNAME,PASSWORD,NICKNAME,EMAIL,CREATE_DATE,LOGIN_NUMBER,MOBILE_TEL FROM RED_USER WHERE USERNAME = ? AND PASSWORD = ?";
		List<User> userList = jdbcTemplate.query(sqlString, new Object[]{user,password}, new BeanPropertyRowMapper(User.class));
		return userList.size() > 0 ? userList.get(0) : null;
	}
	
	@Override
	public User qryUser(String user) throws Exception {
		String sqlString = "SELECT ID,USERNAME,PASSWORD,NICKNAME,EMAIL,CREATE_DATE,LOGIN_NUMBER,MOBILE_TEL FROM RED_USER WHERE USERNAME = ? ";
		List<User> userList = jdbcTemplate.query(sqlString, new Object[]{user}, new BeanPropertyRowMapper(User.class));
		return userList.size() > 0 ? userList.get(0) : null;
	}
	
	/**
	 * 查询用户角色
	 */
	@Override
	public List<UserRole> qryUserRole(String user) throws Exception{
		String sqlString = "SELECT USR.ID,USR.USERNAME,UR.ROLE_ID,ROLE.ROLE_NAME FROM RED_USER USR INNER JOIN RED_USER_ROLE UR ON USR.ID = UR.ID " + 
				"LEFT JOIN RED_ROLE ROLE ON UR.ROLE_ID = ROLE.ID WHERE USERNAME = ? ";
		List<UserRole> userRoleList = jdbcTemplate.query(sqlString, new Object[]{user}, new BeanPropertyRowMapper(UserRole.class));
		return userRoleList;
	}

	/**
	 * 查询用户权限
	 */
	@Override
	public List<RolePermission> qryUserPermission(String roleId) throws Exception {
		String sqlString = "select * from red_role role inner join red_permission pms on role.ID = pms.ROLE_ID where role_id = ? ";
		List<RolePermission> permissionList = jdbcTemplate.query(sqlString, new Object[]{roleId}, new BeanPropertyRowMapper(RolePermission.class));
		return permissionList;
	}

}
