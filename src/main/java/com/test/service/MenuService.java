package com.test.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.test.common.MenuTree;
import com.test.dao.MenuDao;
import com.test.entity.Menu;

@Service
public class MenuService {

	@Resource
	MenuDao dao;
	 
	public String getMenu(boolean isHt,boolean hasDelete) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("isHt", isHt);
		params.put("hasDelete", hasDelete);
		List<Menu> list = new ArrayList<Menu>();
		list = dao.getMenu(params);
		MenuTree tree = new MenuTree(list);
		return tree.buildTree(isHt);
	}
	public Menu getOneMenu(String id) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("mid", id);
		Menu menu= dao.getOneMenu(params);
		return menu;
	}
	public boolean delMenu(String id,boolean hasDel) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("mid", id);
		params.put("hasDel", hasDel);
		try{
			 dao.delMenu(params);
		}catch(Exception e){
			return false ;
		}
		return true;
	}
	public int insertMenu(Menu menu) {
		 return dao.insertMenu(menu);
	}
	public void updateMenu(Menu menu) {
		 dao.updateMenu(menu);
	}
	public void updateDel(String id) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("mid", id);
		 dao.updateDel(params);
	}
	public String getLock(String userid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("uid", userid);
		 return dao.getLock(params);
	}
	public void putLock(String value,String userid){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("value", value);
		params.put("uid", userid);
		 dao.putLock(params);
	}
	public String getOption(String userid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("uid", userid);
		 return dao.getOption(params);
	}
	public void putOption(String value,String userid){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("value", value);
		params.put("uid", userid);
		 dao.putOption(params);
	}
}
