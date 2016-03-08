package com.test.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.test.common.Uploader;
import com.test.util.PathUtil;

@Controller
public class UploadController {
	@RequestMapping(value = "/UpLoad")
	public void helloWorld(HttpServletRequest request,HttpServletResponse response) throws IOException{
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter writer = response.getWriter();
		Uploader up = new Uploader(request);
		String path = "upload";
	    up.setSavePath(path);
	  /*  String[] fileType = {".gif" , ".png" , ".jpg" , ".jpeg" , ".bmp"};
	    up.setAllowFiles(fileType);
	    up.setMaxSize(20000); //单位KB
*/	    String name = null ;
	    String originalName = null ;
	    long size = 0l;
	    String state = null;
	    String type = null ;
	    int code  = 0;
	    try {
			up.upload();
			name = up.getFileName() ;
			originalName = up.getOriginalName() ;
			size =  up.getSize()  ;
			state = up.getState()  ;
			type = up.getType() ;
			code = 1 ;
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	    SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
	    String date = sdf.format(new Date());
	    String url = "GetImage.html?uid=upload&date="+date+"&file="+name;
	    String result = "{\"code\":\""+code +"\", \"name\":\""+ name+"\", \"originalName\": \""+ originalName+"\", \"size\": "+size+", \"state\": \""+ state+"\", \"type\": \""+ type +"\", \"url\": \""+ url+"\"}";
	    result = result.replaceAll( "\\\\", "\\\\" );
    	System.out.println(result);
    	writer.print(result);
    	writer.flush();
    	writer.close();
	}
	@RequestMapping(value = "GetImage")
	public void getImage(HttpServletRequest request,HttpServletResponse response) throws IOException{
		OutputStream o = response.getOutputStream();
		  String uid = request.getParameter("uid");
		  String filename = request.getParameter("file");
		  String date = request.getParameter("date");
		  if(uid!=null&&filename!=null){
			  String file = PathUtil.getPath();
			  if(uid.charAt(0)=='s'){
				  file +="system/"+uid+"/"+filename;
			  }else if(uid.charAt(0)=='u'){
				  file +="system/"+uid+"/"+date+"/"+filename;
			  }else{
				  file += "users/user_"+uid+"/"+filename+".jpg";
			  }
			  File fileLoad = new File(file);
			  byte b[] = new byte[500];
			  response.reset();
			  response.setContentType("image/jpeg");
			  response
			    .setHeader("content-disposition", "attachment; filename="+filename);
			  long fileLength = fileLoad.length();   //这里的length()返回的是文件的长度,以字节为单位,Long类型
			  String length1 = String.valueOf(fileLength);
			  response.setHeader("Content_Length", length1);  //content-length指的是有效负载的字节(Byte)长度
			  FileInputStream in = new FileInputStream(fileLoad);
			  int n;
			  while ((n = in.read(b)) != -1) {
			   o.write(b, 0, n);
			  }
			  in.close();
			  o.close();
		  } 
	}
}
