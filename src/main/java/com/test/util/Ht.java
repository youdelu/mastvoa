/**  
 *	   @company  澳亚卫视
 *	   @author  游德禄
 *     @Email youdelu@sina.cn
 *     @date  2016年1月21日 上午4:09:56 
 *     @version 1.0 
 *     @parameter  
 *     @return  
 *     
 */
package com.test.util;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

/**
 * @author 游德禄
 *
 */
public class Ht {
	 public static void p(HttpServletResponse response,Object txt){
	    	PrintWriter writer;
			try {
				response.setCharacterEncoding("UTF-8");
				writer = response.getWriter();
				writer.write(String.valueOf(txt));
				writer.flush();
				writer.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
	    }
}
