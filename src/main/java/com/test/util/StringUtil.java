 
package com.test.util;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletResponse;

/**
 * 字符串工具类
 */
public class StringUtil {
	 private final static String regxpForHtml = "<([^>]*)>"; // 过滤所有以<开头以>结尾的标签
    /**
     * 判断字符串为空
     *
     * @param str 字符串信息
     * @return true or false
     */
    public static boolean isEmpty(String str) {
        return str == null || str.trim().length() == 0;
    }

    /**
     * 判断字符数组，不为空
     *
     * @param values 字符数组
     * @return true or false
     */
    public static boolean areNotEmpty(String... values) {
        boolean result = true;
        if (values == null || values.length == 0) {
            result = false;
        } else {
            for (String value : values) {
                result &= !isEmpty(value);
                if (result == false) {
                    return result;
                }
            }
        }
        return result;
    }

    /**
     * join方法将 Stirng数组，通过separater分隔符进行分割
     *
     * @param resource 源数组
     * @param separater 分隔符
     * @return
     */
    public static String join(String[] resource, String separater) {
        if (resource == null || resource.length == 0) {
            return null;
        }
        int len = resource.length;
        StringBuilder sb = new StringBuilder();
        if (len > 0) {
            sb.append(resource[0]);
        }
        for (int i = 1; i < len; i++) {
            sb.append(separater);
            sb.append(resource[i]);
        }
        return sb.toString();
    }

    public static String getMiddle(String sourse, String first, String last) {
        if (!areNotEmpty(sourse, first, last)) {
            return null;
        }
        int beginIndex = sourse.indexOf(first) + first.length();
        int endIndex = sourse.lastIndexOf(last);
        return sourse.substring(beginIndex, endIndex);
    }

    public static String repaceTabs(String src) {
        return src.trim().replaceAll("\t|\r", " ");
    }
    public static boolean isEng(String s){
    	String str = s.replace(" ", "");
    	String regex="^[a-zA-Z]+.，,。？“”]、-/=&#@$《》<>【】{}[]*%!`~";
    	Pattern pattern = Pattern.compile(regex);
    	Matcher match=pattern.matcher(str);
    	boolean b=match.matches();
    	if(b){
    		return true;
    	}
    	return false;
    }
    /**  
     *   
     * 基本功能：过滤所有以"<"开头以">"结尾的标签  
     * <p>  
     *   
     * @param str  
     * @return String  
     */  
    public static String filterHtml(String str) {   
        Pattern pattern = Pattern.compile(regxpForHtml);   
        Matcher matcher = pattern.matcher(str);   
        StringBuffer sb = new StringBuffer();   
        boolean result1 = matcher.find();   
        while (result1) {   
            matcher.appendReplacement(sb, "");   
            result1 = matcher.find();   
        }   
        matcher.appendTail(sb);   
        return sb.toString();   
    } 
}

