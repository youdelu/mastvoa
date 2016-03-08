package com.test.controller.system;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.test.entity.Menu;
import com.test.entity.User;
import com.test.service.MenuService;
import com.test.service.UserService;
import com.test.util.Ht;
import com.test.util.JSON;
import com.test.util.PasswordUtil;
import com.test.util.StringUtil;

@Controller
@RequestMapping("/menu/")
public class MenuController {
	@Resource 
	UserService us ;
	@Resource
	MenuService service;
	@RequestMapping(value = "index")
	public String menu(HttpServletRequest rst) {
		rst.setAttribute("menu", service.getMenu(true,false));
		return "common/menu";
	}
	
	@RequestMapping(value = "getMenu")
	public void getMenu(HttpServletRequest request,HttpServletResponse response) {
		String hasDelete = request.getParameter("hasDelete");
		boolean hd = false ;
		if(!StringUtil.isEmpty(hasDelete)){
			if(hasDelete.equals("true")){
				hd = true ;
			}
		}
		 Ht.p(response, service.getMenu(true,hd));
	}
	
	@RequestMapping(value = "getUrl")
	public void getUrl(HttpServletRequest rst,HttpServletResponse response) {
		String id = rst.getParameter("id");
		String url = null ;
		if(!StringUtil.isEmpty(id)){
			url = service.getOneMenu(id).getLink();
		}
		try {
			if(url.startsWith("http")){
				response.sendRedirect(url);
			}else{
				response.sendRedirect("/demo/"+url);
			}
		} catch (IOException e) {
			Ht.p(response,e.getMessage());
		}
	}
	@RequestMapping(value = "oneMenu")
	public void oneMenu(HttpServletRequest rst, HttpServletResponse response) {
		String id = rst.getParameter("id");
		Ht.p(response, JSON.getJson(service.getOneMenu(id)));
	}

	@RequestMapping(value = "delMenu")
	public void delMenu(HttpServletRequest rst, HttpServletResponse response) {
			String id = rst.getParameter("id");
			String hasDel = rst.getParameter("hasDel");
			boolean hd = false ;
			if(!StringUtil.isEmpty(hasDel)){
				if(hasDel.equals("true")){
					hd = true ;
				}
			}
			Ht.p(response,  service.delMenu(id,hd));
	}

	@RequestMapping(value = "/addMenu")
	public void addMenu(HttpServletRequest rst, HttpServletResponse response) {
		boolean add = Boolean.parseBoolean(rst.getParameter("add"));
		String hasDel = rst.getParameter("hasDel");
		String mid = rst.getParameter("mid");
		String parent_id = rst.getParameter("parent_id");
		String _name = rst.getParameter("_name");
		String link = rst.getParameter("link");
		String icon = rst.getParameter("icon");
		String _type = rst.getParameter("_type");
		String _order = rst.getParameter("_order");
		String _show = rst.getParameter("_show");
		boolean hd = false ;
		if(!StringUtil.isEmpty(hasDel)){
			if(hasDel.equals("true")){
				hd = true ;
			}
		}
		
		int code = 0;
		try {
			if(hd){
				service.updateDel(mid);
			}else{
				Menu menu = new Menu();
				menu.setMid(mid == null ? 0 : Integer.parseInt(mid));
				menu.setParent_id(parent_id == null ? 0 : Integer
						.parseInt(parent_id));
				menu.set_name(_name);
				menu.setLink(link);
				menu.setIcon(icon);
				menu.set_type(Integer.parseInt(_type));
				menu.set_order(Integer.parseInt(_order));
				menu.set_show(Integer.parseInt(_show));
				if (add) {
					service.insertMenu(menu);
				} else {
					service.updateMenu(menu);
				}
			}
			code = 1;
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		Ht.p(response, code);
	}
	@RequestMapping(value = "/lock")
	public void lock(HttpServletRequest request,HttpServletResponse response){
		String type = request.getParameter("type");
		String psd = request.getParameter("psd");
		String r = "";
		HttpSession session =  request.getSession();
		User user = (User) session.getAttribute("user");
		if(type.equals("0")){
			r = service.getLock(user.getUserid());
		}else if(type.equals("1")){
			if(user!=null){
				if(PasswordUtil.verify(psd,user.get_password())){
					service.putLock("false",user.getUserid());
					r = "true";
				}else{
					r = "false";
				}
			}else{
				r = "0";
			} 
		}else{
			service.putLock("true",user.getUserid());
			r = "true";
		}
		Ht.p(response, r);
	}
	@RequestMapping(value = "/option")
	public void option(HttpServletRequest request,HttpServletResponse response){
		String type = request.getParameter("type");
		String val = request.getParameter("val");
		String r = "";
		HttpSession session =  request.getSession();
		User user = (User) session.getAttribute("user");
		if(type.equals("0")){
			r = service.getOption(user.getUserid());
		}else if(type.equals("1")){
			if(val.equals("0")){
				val = "1";
			}else{
				val = "0";
			}
			service.putOption(val, user.getUserid());
			r = val ;
		} 
		Ht.p(response, r);
	}
}
