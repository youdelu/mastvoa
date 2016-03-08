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

import com.test.entity.Menu;

/**
 * @author 游德禄
 *
 */
@Repository
public interface MenuDao {
	List<Menu> getMenu(Map<String, Object> params);
	Menu getOneMenu(Map<String, Object> params);
	void delMenu(Map<String, Object> params);
	int insertMenu(Menu menu);
	void updateMenu(Menu menu);
	void updateDel(Map<String, Object> params);
	//锁屏
	String getLock(Map<String, Object> params);
	void putLock(Map<String, Object> params);
	//菜单选项
	String getOption(Map<String, Object> params);
	void putOption(Map<String, Object> params);
	
}
