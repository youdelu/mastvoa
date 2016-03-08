package com.test.common;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

public class XssHttpServletRequestWraper extends HttpServletRequestWrapper {

	public XssHttpServletRequestWraper(HttpServletRequest request) {
		super(request);
	}
	
	@Override
	public String getParameter(String name) {
		return clearXss(super.getParameter(name));
	}
	
	@Override
	public String getHeader(String name) {
		return clearXss(super.getHeader(name));
	}
	
	@Override
	public String[] getParameterValues(String name) {
		String[] values = super.getParameterValues(name);
		String[] newValues = new String[values.length];
		
		for(int i =0; i< values.length; i++){
			newValues[i] = clearXss(values[i]);
		}
		
		return newValues;
	}

	/**
	 * 防止SQL注入与XSS攻击
	 * @param value
	 * @return
	 */
	private String clearXss(String value){
		if (value == null || "".equals(value)) {
			return value;
		}
		//value =  value.replaceAll(".*([';]+|(--)+).*", " ");
		value = value.replaceAll("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"");
		value = value.replace("script", "");
		value = value.replace("'", "\"");
		return value;
	}
	
}
