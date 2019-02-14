package com.home.redpro.dao.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.home.redpro.dao.TestDao;

@Component
public class TestDaoImp implements TestDao{

	@Autowired
    private JdbcTemplate jdbcTemplate;

	@Override
	public int insertTest(String newId, String oldId) {
		String sqlString = "INSERT INTO PM_FLOW_PARAM_INST (PACKAGE_DEFINE_ID, PARAM_CODE, PARAM_NAME, COMMENTS, CREATE_DATE,  PARAM_DEFINE_CODE) SELECT ? PACKAGE_DEFINE_ID, PARAM_CODE, PARAM_NAME, COMMENTS, SYSDATE CREATE_DATE, PARAM_DEFINE_CODE FROM PM_FLOW_PARAM_INST WHERE PACKAGE_DEFINE_ID = ? ";
		int updateRow = jdbcTemplate.update(sqlString,new Object[]{newId,oldId});
		return updateRow;
	}
	
	
}
