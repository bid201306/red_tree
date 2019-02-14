package com.home.redpro.test;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.home.redpro.utils.GsonHelper;

public class LocalTest {

	public static void main(String[] args) {
		
		Gson gson = new GsonBuilder().disableHtmlEscaping().create();


		String text = "<% var date=date();%> ${@date.getTime()}";
		System.out.println(GsonHelper.toJson(text));
		System.out.println(gson.toJson(text));
		System.out.println(text.toString());
		
		
		
		
		
		
		
		
		
		
		

	}

	public static void testMap() {
		
		String a = "ers\":\"AtomicService2DbPars";
		//a = a.replaceAll("\\\"AtomicService2DbParse20181107", "");
		a = a.substring(2, a.length() - 2);
		System.out.println(a);
	    Map<String, String> map1 = new HashMap<String, String>(){{
	        put("1", "a");
	        put("2", "b");
	        put("3", "c");
	    }};
	    Map<String, String> map2 = new HashMap<String, String>(){{
	        put("test1", "张三");
	        put("test2", "李四");
	        put("test3", "王五");
	    }};
	    Map<String, String> resultMap = new HashMap<String, String>(){{
	        putAll(map1);
	        putAll(map2);
	    }};
	    System.out.println(resultMap);
		Map<String, Object> test  = new HashMap<String, Object>();
		test.put("a", null);
		test.put("b", "");
		test.put("c", "33");
	}
	public static boolean isConnect(String host,int port){
		Socket socket = new Socket();
		try{
			socket.connect(new InetSocketAddress(host, port));
		}catch (IOException e) {
			return false;
		}finally{
			try{
				socket.close();
			}catch (IOException e) {
				e.printStackTrace();
			}
		}
		return true;
	}


	public void testLogin() {
		System.out.println("I am losing my mind");
	}

	public static void testSwitch(String words) {
		switch(words) {
		case "a" :
			System.out.println("我不好");
		case "b" :
			System.out.println("我很好");
			break;
		case "c" :
			System.out.println("我痛");
			break;
		case "d" :
			System.err.println("需要金钱");
			break;
		default : 
			System.out.println("i am alone");
		}
	}
}
