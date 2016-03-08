package com.test.util;

import java.text.SimpleDateFormat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author 游德禄
 * 使用jackson三方工具序列化对象成object
 */
public class JSON {
	/**
	 * 将任意对象序列成json字符
	 * 
	 * @param object
	 *            要序列化的对象
	 * @return json，注意序列化失败时为null
	 */
	
	public static String date1 = "yyyy年MM月dd日";
	
	public static String getJson(Object object,String sdf) {
		ObjectMapper mapper = new ObjectMapper();
		mapper.setDateFormat(new SimpleDateFormat(sdf==null?"yyyy-MM-dd HH:mm:ss":sdf));
		try {
			return mapper.writeValueAsString(object);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return null;
	}
	public static String getJson(Object object){
		return getJson(object,null);
	}
}
