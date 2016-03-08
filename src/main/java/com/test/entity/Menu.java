/**  
 *	   @company  澳亚卫视
 *	   @author  游德禄
 *     @Email youdelu@sina.cn
 *     @date  2015年11月24日 下午5:18:53 
 *     @version 1.0 
 *     @parameter  
 *     @return  
 *     
 */
package com.test.entity;

import java.util.Date;

/**
 * @author 游德禄
 *
 */
public class Menu {
	private int mid ;
	private int parent_id;
	private String _name ;
	private String link ;
	private String icon ;
	private int _type ;
	private int _order ;
	private int _show ;
	private int del ;
	private Date _date;
	public int getMid() {
		return mid;
	}
	public void setMid(int mid) {
		this.mid = mid;
	}
	public int getParent_id() {
		return parent_id;
	}
	public void setParent_id(int parent_id) {
		this.parent_id = parent_id;
	}
	public String get_name() {
		return _name;
	}
	public void set_name(String _name) {
		this._name = _name;
	}
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public int get_type() {
		return _type;
	}
	public void set_type(int _type) {
		this._type = _type;
	}
	public int get_order() {
		return _order;
	}
	public void set_order(int _order) {
		this._order = _order;
	}
	public int get_show() {
		return _show;
	}
	public void set_show(int _show) {
		this._show = _show;
	}
	public int getDel() {
		return del;
	}
	public void setDel(int del) {
		this.del = del;
	}
	public Date get_date() {
		return _date;
	}
	public void set_date(Date _date) {
		this._date = _date;
	}
 
}
