package com.test.util;

import java.util.Random;

public class RandomString {
	private static final String splitStr = " "; // 分割符

	// 取数字字符串 用 splitStr 分割
	private static String getNumberString() {
		StringBuffer buf = new StringBuffer();
		for (int i = 0; i < 10; i++) {
			buf.append(String.valueOf(i));
			buf.append(splitStr);
		}
		return buf.toString();
	}

	// 取大写字母字符串 用 splitStr 分割
	private static String getUppercase() {
		StringBuffer buf = new StringBuffer();
		for (int i = 0; i < 26; i++) {
			buf.append(String.valueOf((char) ('A' + i)));
			buf.append(splitStr);
		}
		return buf.toString();
	}

	// 取小写字母字符串 用 splitStr 分割
	private static String getLowercase() {
		StringBuffer buf = new StringBuffer();
		for (int i = 0; i < 26; i++) {
			buf.append(String.valueOf((char) ('a' + i)));
			buf.append(splitStr);
		}
		return buf.toString();
	}

	// 取特殊字符串 用 splitStr 分割
	private static String getSpecialString() {
		String str = "~@#$%^&*()_+|\\=-`";
		StringBuffer buf = new StringBuffer();
		for (int i = 0; i < str.length(); i++) {
			buf.append(str.substring(i, i + 1));
			buf.append(splitStr);
		}
		return buf.toString();
	}

	// 根据所取的字符串类型连接相应的字符串并返回
	private static String getString(String type) {
		StringBuffer pstr = new StringBuffer();
		if (type.length() > 0) {
			if (type.indexOf('i') != -1)
				pstr.append(getNumberString());
			if (type.indexOf('l') != -1)
				pstr.append(getLowercase());
			if (type.indexOf('u') != -1)
				pstr.append(getUppercase());
			if (type.indexOf('s') != -1)
				pstr.append(getSpecialString());

		}
		return pstr.toString();
	}

	/**
	 * 取随机字符串
	 * 
	 * @param length
	 *            返回随机字符串的长度
	 * @param type
	 *            要取的字符串类型: i、取数字 l、取小写字母 u、取大写字母 s、取特殊字符
	 * @return String 随机字符串
	 */
	public static String getRandomString(int length, String type) {
		String allStr = getString(type);
		String[] arrStr = allStr.split(splitStr);
		StringBuffer pstr = new StringBuffer();
		if (length > 0) {
			for (int i = 0; i < length; i++) {
				pstr.append(arrStr[new Random().nextInt(arrStr.length)]);
			}
		}
		return pstr.toString();
	}
}
