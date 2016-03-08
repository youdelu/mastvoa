package com.test.util;

 
public class PasswordUtil {
	/**
	 * 生成含有随机盐的密码
	 */
	public static String generate(String password,String salt) {
 		password = MD5Util.getMD5StringWithSalt(MD5Util.getMD5String(password),salt);
 		System.out.println(password);
 		char[] cs = new char[40];
 		int c = 0 ;
 		for (int i = 0; i < 40; i++) {
 			if(i%5==0){
 				cs[i] = salt.charAt(c++);
 			}else{
 				cs[i] = password.charAt(i-c);
 			}
 		}
		return new String(cs);
	}

	/**
	 * 校验密码是否正确
	 */
	public static boolean verify(String password, String md5) {
 		char[] cs1 = new char[32];
		char[] cs2 = new char[8];
		int c = 0 ;
		for (int i = 0; i < 40; i ++) {
			if(i%5==0){
				cs2[c++] = md5.charAt(i);
			}else{
				cs1[i-c] = md5.charAt(i);
			} 
		}
		String salt = new String(cs2);
		return MD5Util.getMD5StringWithSalt(MD5Util.getMD5String(password),salt).equals(new String(cs1));
	}
 
	public static void main(String[] args) {
		String password = generate("123","fSjSp4dS");
		System.out.println(password);
		System.out.println(verify("123", password));
	}
}
