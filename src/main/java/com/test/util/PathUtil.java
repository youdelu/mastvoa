/**  
 *	   @company  澳亚卫视
 *	   @author  游德禄
 *     @Email youdelu@sina.cn
 *     @date  2015年12月22日 上午10:01:19 
 *     @version 1.0 
 *     @parameter  
 *     @return  
 *     
 */
package com.test.util;

/**
 * @author 游德禄
 *
 */
public class PathUtil {
	public static String win="F:/images/";
	public static String linux="/images/";
	public static String getPath(){
		String os = System.getProperty("os.name");
		if(os.toLowerCase().startsWith("win")){
		   os = win ;
		}else{
			os = linux ;
		}
		return os;
	}

}
