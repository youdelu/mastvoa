/**  
 *	   @company  澳亚卫视
 *	   @author  游德禄
 *     @Email youdelu@sina.cn
 *     @date  2015年11月24日 下午3:57:07 
 *     @version 1.0 
 *     @parameter  
 *     @return  
 *     
 */
package com.test.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.test.entity.User;

/**
 * @author 游德禄
 *
 */
@Repository
public interface UserDao {
	User login(Map<String, Object> params);
	List<User> getUser(Map<String, Object> params);
	int getRecordsFiltered(Map<String, Object> params);
	int getRecordsTotal();
	int count(Map<String, Object> params);
	int insertUser(User user);
	void updateUser(User user);
 	void deleteUser(Map<String, Object> params);
}
