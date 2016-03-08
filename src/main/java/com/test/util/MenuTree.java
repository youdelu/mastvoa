/**  
 *	   @company  澳亚卫视
 *	   @author  游德禄
 *     @Email youdelu@sina.cn
 *     @date  2015年11月26日 上午9:00:39 
 *     @version 1.0 
 *     @parameter  
 *     @return  
 *     
 */
package com.test.util;

import java.util.ArrayList;
import java.util.List;

import com.test.entity.Menu;
import com.test.util.StringUtil;

/**
 * @author 游德禄
 *
 */
public class MenuTree {
	private StringBuffer html = new StringBuffer();
	private StringBuffer filter = new StringBuffer();
	private List<Menu> nodes;
	private boolean ht = false ;
	private String lang ;
	private int f ;
	private boolean nav;
	public MenuTree(List<Menu> nodes){
		this.nodes = nodes;
	}
	
	public String buildTree(String lang,boolean ht,int parent_id,int menu_id,int f,boolean nav){
		this.ht = ht ;
		this.lang = lang ;
		this.f = f ;
		this.nav = nav;
		if(StringUtil.isEmpty(lang)){
			lang = "cht";
		}
		if(!nav){
			html.append("<ul >");
		}
		for (Menu node : nodes) {
			Integer id = node.getMid();
			if (node.getParent_id() == parent_id) {
				 
					if(menu_id==0){
						if(ht){
							html.append("\r\n<li "+(node.get_show()==0?"class='notuse'":" ")+" pid='0' uid='"+id+"'>" + node.get_name() );
						}else{
							if(nav){
								if(id==f){
									filter.append(">  "+node.get_name());
								}
							}else{
								if(node.get_show()==1){
									html.append("\r\n<li "+(id==f?"class = 'active'":" ")+"><a href='/demo/"+node.getLink()+"?lang="+lang+"' >" + node.get_name() + "</a>");
								}
							}
						}
						build(node);
					}else{
						if(menu_id == id){
							build(node);
						}
					}
				}
		}
		if(nav){
			return filter.toString();
		}else{
			html.append("\r\n</li  data-jstree='{\"type\":\"add\"}'>"+(ht?"<li class='add' pid='0'>+添加新菜单</li>":"")+"</ul>");
		}
		return html.toString();
	}
	
	private void build(Menu node){
		List<Menu> children = getChildren(node);
		int pid = 0 ;
		if (!children.isEmpty()) {
			html.append("\r\n<ul>");
			for (Menu child : children) {
				Integer id = child.getMid();
				pid = child.getParent_id();
				if(ht){
					html.append("\r\n<li "+(child.get_show()==0?"class='notuse'":" ")+" pid='"+pid+"' uid='"+id+"' ><a href='"+(ht?"#' value='"+id:child.getLink())+"' >" + child.get_name() + "</a>");
				}else{
					if(child.get_show()==1){
						if(nav){
							if(id==f){
								filter.append(">  "+node.get_name());
							}
						}else{
							html.append("\r\n<li><a href='/demo/"+child.getLink()+"?lang="+lang+"' "+(id==f?"class = 'active'":" ")+">" + child.get_name() +  "</a>");
						}
					}
				}
				build(child);
			}
			if(!nav){
				html.append("\r\n</li  data-jstree='{\"type\":\"add\"}'>"+(ht?"<li class='add' pid='"+pid+"'>+添加新菜单</li>":"")+"</ul>");
			}
		} 
	}
	
	private List<Menu> getChildren(Menu node){
		List<Menu> children = new ArrayList<Menu>();
		Integer id = node.getMid();
		for (Menu child : nodes) {
			if (id == child.getParent_id()) {
				children.add(child);
			}
		}
		return children;
	}

	public int getF() {
		return f;
	}

	public void setF(int f) {
		this.f = f;
	}

	public boolean isNav() {
		return nav;
	}

	public void setNav(boolean nav) {
		this.nav = nav;
	}

	public StringBuffer getFilter() {
		return filter;
	}

	public void setFilter(StringBuffer filter) {
		this.filter = filter;
	}
}