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
package com.test.common;

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
	private List<Menu> nodes;
	private boolean ht = false ;
	public MenuTree(List<Menu> nodes){
		this.nodes = nodes;
	}
	
	public String buildTree( boolean ht){
		this.ht = ht ;
		if(ht){
			html.append("<ul>");
		}
		for (Menu node : nodes) {
			Integer id = node.getMid();
			if(node.getParent_id()==0){
			if(ht){
				html.append("<li ");
				if(node.getDel()==1){
					html.append(" class='deleted' ");
				}else{
					if(node.get_show()==1){
						html.append(" class='hide_all' ");
					}else if(node.get_show()==2){
						html.append(" class='hide_m' ");
					}
				}
				html.append(" pid='0' uid='"+id+"' ><a href='"+(ht?"javascript:void(0);' value='"+id:node.getLink())+"' >" + node.get_name() + "</a>");
			}else{
					if(node.get_show()==0){
						StringBuffer text = new StringBuffer();
						text.append("<li> ");
						if(node.get_type()==1){
							text.append("<a href='#' class='menu-dropdown'>");
						}else{
							text.append("<a href='javascript:void(0);' data-id='"+node.getMid()+"' data-url='system/getUrl.do?id="+node.getMid()+"' class='link linktab'> ");
						}
						if(StringUtil.isEmpty(node.getIcon())){
							text.append("<div class='img'></div> ");
						}else{
							text.append("<div class='img'> <img src='Skins/Common/Icon/"+node.getIcon()+".png' /> </div> ");
						}
						text.append("<span class='menu-text'> "+node.get_name()+" </span>");
						if(node.get_type()==1){
							text.append("<i class='menu-expand'> </i>");
						}
						text.append("</a> <div class='submenu-cover'></div>");
						html.append(text);
					}
			}
			build(node);
			}
		} 
		html.append("</li >"+(ht?"<li class='add' data-jstree='{\"type\":\"add\"}' pid='0'>添加子菜单</li></ul>":""));
		return html.toString();
	}
	
	private void build(Menu node){
		List<Menu> children = getChildren(node);
		int pid = 0 ;
		if (!children.isEmpty()) {
			html.append("<ul "+(ht?"":"class='submenu'")+">");
			for (Menu child : children) {
				Integer id = child.getMid();
				pid = child.getParent_id();
				if(ht){
					html.append("<li ");
					if(child.getDel()==1){
						html.append(" class='deleted' ");
					}else{
						if(child.get_show()==1){
							html.append(" class='hide_all' ");
						}else if(child.get_show()==2){
							html.append(" class='hide_m' ");
						}
					}
					html.append(" pid='"+pid+"' uid='"+id+"' ><a href='"+(ht?"javascript:void(0);' value='"+id:child.getLink())+"' >" + child.get_name() + "</a>");
				}else{
					if(child.get_show()==0){
						StringBuffer text = new StringBuffer();
						text.append("<li> ");
						if(child.get_type()==1){
							text.append("<a href='#' class='menu-dropdown'>");
						}else{
							text.append("<a href='javascript:void(0);' data-id='"+child.getMid()+"' data-url='menu/getUrl.do?id="+child.getMid()+"' class='link linktab'> ");
						}
						if(!StringUtil.isEmpty(child.getIcon())){
							text.append("<div class='img'> <img src='Skins/Common/Icon/"+child.getIcon()+".png' /> </div> ");
						}
						text.append("<span class='menu-text'> "+child.get_name()+" </span>");
						if(child.get_type()==1){
							text.append("<i class='menu-expand'> </i>");
						}
						text.append("</a> <div class='submenu-cover'></div>");
						html.append(text);
					}
				}
				build(child);
			}
			html.append((ht?"<li data-jstree='{\"type\":\"add\"}' class='add' pid='"+pid+"'>添加子菜单</li></ul>":"</ul>"));
		}else{
			html.append("</li>");
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
}