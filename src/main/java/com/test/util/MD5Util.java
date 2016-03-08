/**  
 *	   @company 顺风顺水
 *	   @package com.util
 *	   @file MD5Util.java
 *     @Email youdelu@sina.cn
 *     @date  2015-6-10 下午3:43:48 
 *     @version 1.0 
 *	   @author  游德禄
 *     @Description MD5工具 
 */
package com.test.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * @author 游德禄
 *
 */
public class MD5Util {	 
 
		protected static char hexDigits[] = { '0', '1', '2', '3', '4', '5', '6',
				'7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };

		protected static MessageDigest messagedigest = null;

		static {
			try {
				messagedigest = MessageDigest.getInstance("MD5");
			} catch (NoSuchAlgorithmException nsaex) {
				System.err.println(MD5Util.class.getName()
						+ "初始化失败，MessageDigest不支持MD5Util。");
				nsaex.printStackTrace();
			}
		}

		/** 
	     * 生成含有随机盐的密码 
	     */  
	    public static String generate(String password,String salt) {  
	    	password = MD5Util.getMD5StringWithSalt(MD5Util.getMD5String(password),salt);
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
	    
		/**
		 * 功能：加盐版的MD5.返回格式为MD5(密码+{盐值})
		 * 
		 * @param password
		 *            密码
		 * @param salt
		 *            盐值
		 * @return String
		 */
		public static String getMD5StringWithSalt(String password, String salt) {
			if (password == null) {
				throw new IllegalArgumentException("password不能为null");
			}
			if (salt.equals("")||salt==null) {
				throw new IllegalArgumentException("salt不能为空");
			}
			if ((salt.toString().lastIndexOf("{") != -1)
					|| (salt.toString().lastIndexOf("}") != -1)) {
				throw new IllegalArgumentException("salt中不能包含 { 或者 }");
			}
			return getMD5String(password + "{" + salt.toString() + "}");
		}

		/**
		 * 功能：得到文件的md5值。
		 * 
		 * @param file
		 *            文件。
		 * @return String
		 * @throws IOException
		 *             读取文件IO异常时。
		 */
		public static String getFileMD5String(File file) throws IOException {
			@SuppressWarnings("resource")
			FileInputStream in = new FileInputStream(file);
			FileChannel ch = in.getChannel();
			MappedByteBuffer byteBuffer = ch.map(FileChannel.MapMode.READ_ONLY, 0,
					file.length());
			messagedigest.update(byteBuffer);
			return bufferToHex(messagedigest.digest());
		}

		/**
		 * 功能：得到一个字符串的MD5值。
		 * 
		 * @param str
		 *            字符串
		 * @return String
		 */
		public static String getMD5String(String str) {
			return getMD5String(str.getBytes());
		}

		private static String getMD5String(byte[] bytes) {
			messagedigest.update(bytes);
			return bufferToHex(messagedigest.digest());
		}

		private static String bufferToHex(byte bytes[]) {
			return bufferToHex(bytes, 0, bytes.length);
		}

		private static String bufferToHex(byte bytes[], int m, int n) {
			StringBuffer stringbuffer = new StringBuffer(2 * n);
			int k = m + n;
			for (int l = m; l < k; l++) {
				appendHexPair(bytes[l], stringbuffer);
			}
			return stringbuffer.toString();
		}

		private static void appendHexPair(byte bt, StringBuffer stringbuffer) {
			char c0 = hexDigits[(bt & 0xf0) >> 4];
			char c1 = hexDigits[bt & 0xf];
			stringbuffer.append(c0);
			stringbuffer.append(c1);
		}
	}