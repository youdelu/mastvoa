package com.test.controller;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.test.entity.User;
import com.test.service.MenuService;
import com.test.service.UserService;
import com.test.util.Ht;
import com.test.util.PasswordUtil;
import com.test.util.StringUtil;

@Controller
public class IndexController {
	@Resource MenuService ms ;
	@Resource UserService us ;
	@RequestMapping(value = "index")
	public String helloWorld(HttpServletRequest request){
		request.setAttribute("menu", ms.getMenu(false,false));
		
		return "index";
	}
	@RequestMapping(value = "login")
	public String login(HttpServletRequest request){
		String type = request.getParameter("type");
		if(!StringUtil.isEmpty(type)){
			request.setAttribute("type", 1);
		}else{
			request.setAttribute("type", 0);
		}
		return "login";
	}
	@RequestMapping(value = "loginoff")
	public void loginoff(HttpServletRequest request,HttpServletResponse response) throws IOException{
		User user = new User();
		user = (User) request.getSession().getAttribute("user");
		if(user!=null){
			request.getSession().invalidate();
		}
		response.sendRedirect("login.do");
	}
	@RequestMapping(value = "login_in")
	public void login_in(HttpServletRequest request,HttpServletResponse response){
		String userid = request.getParameter("userid");
		String password = request.getParameter("password");
		if(userid!=null&&password!=null){
			User user = new User();
			user = us.login(userid) ;
			int msg = 0;
			if(user!=null){
				if(PasswordUtil.verify(password,user.get_password())){
					request.getSession().setAttribute("user", user);
					msg = 1;
				} 
			} 
			Ht.p(response, msg);
		}
	}
}
