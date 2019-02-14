package com.home.redpro.test;

import com.alibaba.fastjson.JSONObject;
import com.home.redpro.utils.HttpsPostGetUtil;
import org.junit.Test;
public class JunitTest {

	public static void main(String[] args) {
		System.out.println("Test.main()");
	}

	

	@Test
	public void testLogin() {
		String url = "http://127.0.0.1:2018/redpro/login/validate";
		String strParam = "user=admin&password=1";
		JSONObject json  = HttpsPostGetUtil.httpPost(url, strParam);
		System.out.println(json);
	}
	
	@Test
	public void TestCallTest() {
		LocalTest test = new LocalTest();
		test.testLogin();
	}
}
