package com.test.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.test.dao.UserDao;
import com.test.entity.User;
import com.test.util.JSON;

@Service
public class UserService {

	@Resource
	UserDao dao ;
	public User login(String userid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("userid", userid);
		return dao.login(params) ;
	}
	public int getCount(String userid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("userid", userid);
		return dao.count(params) ;
	}
	public String getUser(String draw, String start, String length,
			String orderColumn, String orderDir, String searchValue) {
		// 总记录数
		int recordsTotal = 0;
		// 过滤后记录数
		int recordsFiltered = 0;
		List<String> sArray = new ArrayList<String>();
		if (!searchValue.equals("")) {
			sArray.add(" id like  binary '%" + searchValue + "%'");
			sArray.add("username like  binary '%" + searchValue + "%'");
			sArray.add("_password like  binary '%" + searchValue + "%'");
			sArray.add("root like  binary '%" + searchValue + "%'");
			sArray.add("_date like  binary '%" + searchValue + "%'");
		}

		String individualSearch = "";
		if (sArray.size() == 1) {
			individualSearch = sArray.get(0);
		} else if (sArray.size() > 1) {
			for (int i = 0; i < sArray.size() - 1; i++) {
				individualSearch += sArray.get(i) + " or ";
			}
			individualSearch += sArray.get(sArray.size() - 1);
		}
		List<User> user = new ArrayList<User>();
		String recordsFilteredSql = "";
		String searchSQL = "";
		String sql = "";
		if (individualSearch != "") {
			searchSQL = " where " + individualSearch;
		}
		sql += searchSQL;
		recordsFilteredSql += searchSQL;
		sql += " order by " + orderColumn + " " + orderDir;
		recordsFilteredSql += " order by " + orderColumn + " " + orderDir;
		sql += " limit " + start + ", " + length;
		recordsTotal = getRecordsTotal();
		if (searchValue != "") {
			 recordsFiltered = getRecordsFiltered(recordsFilteredSql);
		} else {
			recordsFiltered = recordsTotal;
		}
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("condition", sql);
		user = dao.getUser(params);
		Map<Object, Object> info = new HashMap<Object, Object>();
		  info.put("data", user); 
		  info.put("recordsTotal", recordsTotal);
		  info.put("recordsFiltered", recordsFiltered);
		  info.put("draw", draw);
		return JSON.getJson(info);
	}

	public int getRecordsFiltered(String condition) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("condition", condition);
		return dao.getRecordsFiltered(params);
	}
	
	public int getRecordsTotal() {
		return dao.getRecordsTotal();
	}
	public int insertUser(User user) {
		 return dao.insertUser(user);
	}
	public void updateUser(User user) {
		 dao.updateUser(user);
	}
	public void deleteUser(String id) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("id", id);
		 dao.deleteUser(params);
	}
}

