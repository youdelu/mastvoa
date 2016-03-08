package com.test.controller.system;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import rbac.RbacInitialize;
import rbac.inputcheck.CheckAccount;
import rbac.inputcheck.CheckPermission;
import rbac.inputcheck.CheckRole;
import rbac.javabean.Account;
import rbac.javabean.AccountPermissionRole;
import rbac.javabean.Permission;
import rbac.javabean.RbacAccount;
import rbac.javabean.RbacPermission;
import rbac.javabean.RbacRole;
import security.BCrypt;
import tool.Pagination;
import backend.javabean.Department;

import com.test.dao.backend.D_Department;
import com.test.dao.rbac.D_Account;
import com.test.dao.rbac.D_Permission;
import com.test.dao.rbac.D_Role;
import com.test.dao.rbac.D_Role_Account;
import com.test.dao.rbac.D_Role_Hierarchy;
import com.test.dao.rbac.D_Role_Permission;
import com.test.util.Ht;

@Controller
@RequestMapping("/rbac/")
public class RbacController {
 
	@RequestMapping(value = "cuser")
	public String cuser(HttpServletRequest request,HttpServletResponse response) {
		Account user = new Account();
		user.setUsername(request.getParameter("username"));
		user.setPassword(request.getParameter("password"));
		user.setEmail(request.getParameter("email"));
		user.setFullname(request.getParameter("fullname"));
		String default_roleid = request.getParameter("default_roleid");
		String enable = request.getParameter("enabled");
		String default_depid = request.getParameter("default_depid");
		if (default_roleid == null) {
			ArrayList<AccountPermissionRole> dbroles = D_Role.doSelectAll();
			request.setAttribute("dbroles", dbroles);
			ArrayList<Department> departments=D_Department.doSelectAllDepartment();
			request.setAttribute("departments", departments);
			 return "rbac/cuser";
		} else {
			if (enable == null)
				enable = "0";
			String checked = CheckAccount.doCheckNull(user, enable,
					default_roleid,default_depid);
			if (checked.equals("ok")) {
				enable = enable.trim();
				checked = CheckAccount.doMatch(user, enable, default_roleid,default_depid);
			}
			if (checked.equals("ok")) {
				int enabled = Integer.valueOf(enable);
				String hashed = BCrypt.hashpw(user.getPassword(),
						BCrypt.gensalt());
				int count = D_Account.doCreate(user.getUsername(), hashed,
						user.getEmail(), user.getFullname(), enabled,
						Integer.valueOf(default_roleid),Integer.valueOf(default_depid));
				if (count != 0) {
					synchronized (request.getServletContext()) {
						HashMap<Integer, RbacAccount> rbac = RbacInitialize.doRbacUserInit();
						HashMap<Integer, RbacRole> roles = RbacInitialize.doRbacRoleInit();
						HashMap<Integer,ArrayList<String>> actions=RbacInitialize.doRbacActionInit();
						request.getServletContext().setAttribute("actions", actions);	
						request.getServletContext().setAttribute("rbac", rbac);
						request.getServletContext().setAttribute("roles", roles);
					}
					Ht.p(response, "ok");
				} else {
					checked = "数据库操作失败";
				}
			}
			Ht.p(response, checked);
		}
		return null;
	}
	@RequestMapping(value = "crole")
	public String crole(HttpServletRequest request,HttpServletResponse response) {
		String name = request.getParameter("name");
		String alias = request.getParameter("alias");
		String advanced_roleid=request.getParameter("advanced_roleid");
		if (name == null || alias == null) {
			return "rbac/crole";
		} else {
			String checked = CheckRole.doCheckNull(name, alias);
			if (checked.equals("ok")) {
				name = name.trim();
				alias = alias.trim();
				checked = CheckRole.doMatch(name, alias);
			}
			if (checked.equals("ok")) {
				int count=0;
				if(advanced_roleid .equals("0")) {
					count = D_Role.doCreate(name, alias);
				}else {
					count = D_Role.doCreateHierarchy(name, alias,Integer.valueOf(advanced_roleid ));
				}
				if (count != 0) {
					Ht.p(response, "ok");
				} else {
					checked = "数据库操作失败";
				}
			}
			Ht.p(response, checked);
		}
		return null;
	}
	@RequestMapping(value = "cpermission")
	public String cpermission(HttpServletRequest request,HttpServletResponse response)  {
		String name = request.getParameter("name");
		String alias = request.getParameter("alias");
		String pid = request.getParameter("pid");

		if (pid == null) {
			ArrayList<Permission> permissions = D_Permission
					.doSelectAllController();
			request.setAttribute("permissions", permissions);
			return "rbac/cpermission";
		} else {
			String checked = CheckPermission.doCheckNull(name, alias, pid);

			if (checked.equals("ok")) {
				name = name.trim();
				alias = alias.trim();
				checked = CheckPermission.doMatch(name, alias, pid);
			}
			if (checked.equals("ok")) {
				int GeneratedId = D_Permission.doCreate(name, alias, pid);
				if (GeneratedId != 0) {
					Ht.p(response,"ok"+GeneratedId);
				} else {
					checked = "数据库操作失败";
				}
			}
			Ht.p(response,checked);
		}
		return null;
	}
	@RequestMapping(value = "crelationship")
	public String crelationship(HttpServletRequest request,HttpServletResponse response)  {
		String roleid = request.getParameter("roleid");
		String userid = request.getParameter("userid");
		String permissionid = request.getParameter("permissionid");
		if (roleid == null) {
			ArrayList<AccountPermissionRole> users = D_Account.doSelectAll();
			ArrayList<Permission> DBpermissions=D_Permission.doSelectAllControllerActions();
			HashMap<Permission,ArrayList<Permission>> ControllerActions=new HashMap<Permission,ArrayList<Permission>>();
			ArrayList<Permission> pers=null;
			for(Permission per : DBpermissions) {
				if(per.getPid()==0) {
					//System.out.println(per.getAlias());
					pers=doSelectActions(DBpermissions,per.getId());
					if(pers.size()>0) {
						ControllerActions.put(per,pers);
					}
				}
			}
			ArrayList<AccountPermissionRole> roles = D_Role.doSelectAll();
			request.setAttribute("users", users);
			request.setAttribute("ControllerActions", ControllerActions);
			request.setAttribute("roles", roles);
			return "rbac/crelationship";
		} else {
			int count = 0;
			if (userid != null) {
				count = D_Role_Account.doCreate(roleid, userid);
			} else if (permissionid != null) {
				count = D_Role_Permission.doCreate(roleid, permissionid);
			}
			if (count != 0) {
				synchronized (request.getServletContext()) {
					HashMap<Integer, RbacAccount> rbac = RbacInitialize.doRbacUserInit();
					HashMap<Integer, RbacRole> roles = RbacInitialize.doRbacRoleInit();
					HashMap<Integer,ArrayList<String>> actions=RbacInitialize.doRbacActionInit();
					request.getServletContext().setAttribute("actions", actions);	
					request.getServletContext().setAttribute("rbac", rbac);
					request.getServletContext().setAttribute("roles", roles);
				}
				Ht.p(response,"ok");
			} else {
				Ht.p(response,"no");
			}
		}
		return null;
	}
	protected ArrayList<Permission> doSelectActions(ArrayList<Permission> DBpermissions,int id) {
		ArrayList<Permission> pers=new ArrayList<Permission>();
		for(Permission per : DBpermissions) {
			
			if(per.getPid() == id) {
				pers.add(per);	
			}  
		}
		return pers;	
	}
	
	
		
	@RequestMapping(value = "drelationship")
	public String drelationship(HttpServletRequest request,HttpServletResponse response)  {
		String roleid = request.getParameter("roleid");
		String proleid = request.getParameter("proleid");
		String userid = request.getParameter("userid");
		String permissionid = request.getParameter("permissionid");
		@SuppressWarnings("unchecked")
		HashMap<Integer, RbacRole> roles = (HashMap<Integer, RbacRole>)request.getServletContext().getAttribute("roles");
		HashMap<Integer, RbacPermission> rolesPermission = (HashMap<Integer, RbacPermission>) D_Role_Permission.doSelectRolePermission();
		@SuppressWarnings("unchecked")
		HashMap<Integer,RbacAccount> rbac=(HashMap<Integer,RbacAccount>)request.getServletContext().getAttribute("rbac");
		if (roleid == null && proleid==null) {
			request.setAttribute("rolesPermission", rolesPermission);
			return "rbac/drelationship";
		} else {
			int count = 0;
			if (roleid != null) {
				//默认相关不能删除,删除用户把些用户默认角色改为其它
				synchronized (request.getServletContext()) {
					int default_roleid = rbac.get(Integer.valueOf(userid)).getDefault_roleid();
					if(default_roleid != Integer.valueOf(roleid)) {
						count = D_Role_Account.doDelete(roleid,userid);
					}
				}
			}else if (proleid != null) {
					count = D_Role_Permission.doDelete(proleid, permissionid);
			}
			if (count != 0) {
				synchronized (request.getServletContext()) {
					rbac = RbacInitialize.doRbacUserInit();
					roles = RbacInitialize.doRbacRoleInit();
					HashMap<Integer,ArrayList<String>> actions=RbacInitialize.doRbacActionInit();
					request.getServletContext().setAttribute("actions", actions);	
					request.getServletContext().setAttribute("rbac", rbac);
					request.getServletContext().setAttribute("roles", roles);
				}
				Ht.p(response,"ok");
			} else {
				Ht.p(response,"no");
			}
		}
		return null;
	}
	@RequestMapping(value = "luser")
	public String luser(HttpServletRequest request,HttpServletResponse response)  {
		int pageNumber;
		if (request.getParameter("pageNumber") == null) {
			pageNumber = 1;
		} else {
			pageNumber = Integer.valueOf(request.getParameter("pageNumber"));
		}
		Pagination page = new Pagination(pageNumber, 18, "account INNER JOIN department ON department_id=department.id","");
		if (page.getTotal() != 0) {
			String[] columns = { "account.id", "username", "fullname", "email","enabled" ,"default_roleid","department.alias"};
			List<ArrayList<Object>> rows = page.getRows(columns);
			request.setAttribute("rows", rows);
			request.setAttribute("pageNumber", pageNumber);
			request.setAttribute("countPage", page.getCountPage());
		}
		return "rbac/luser";
	}
	@RequestMapping(value = "lrole")
	public String lrole(HttpServletRequest request,HttpServletResponse response)  {
		int pageNumber;
		if (request.getParameter("pageNumber") == null) {
			pageNumber = 1;
		} else {
			pageNumber = Integer.valueOf(request.getParameter("pageNumber"));
		}

		Pagination page = new Pagination(pageNumber, 10, "role","");

		if (page.getTotal() != 0) {
			String[] columns = { "id", "name", "alias" };
			List<ArrayList<Object>> rows = page.getRows(columns);
			request.setAttribute("rows", rows);
			request.setAttribute("pageNumber", pageNumber);
			request.setAttribute("countPage", page.getCountPage());
		}
		return "rbac/lrole";
	}
	@RequestMapping(value = "lpermission")
	public String lpermission(HttpServletRequest request,HttpServletResponse response)  {
		int pageNumber;
		if (request.getParameter("pageNumber") == null) {
			pageNumber = 1;
		} else {
			pageNumber = Integer.valueOf(request.getParameter("pageNumber"));
		}
		Pagination page = new Pagination(pageNumber, 8, "permission LEFT JOIN permission AS p ON permission.pid = p.id","");
		if (page.getTotal() != 0) {
			String[] columns = { "permission.id", "permission.name", "permission.alias" , "p.alias"};
			List<ArrayList<Object>> rows = page.getRows(columns);
			request.setAttribute("rows", rows);
			request.setAttribute("pageNumber", pageNumber);
			request.setAttribute("countPage", page.getCountPage());
		}
		return "rbac/lpermission";
	}
	@RequestMapping(value = "uuser")
	public String uuser(HttpServletRequest request,HttpServletResponse response)  {
		ArrayList<AccountPermissionRole> dbroles = D_Role.doSelectAll();
		request.setAttribute("dbroles", dbroles);
		Account user = new Account();
		user.setUsername(request.getParameter("newUsername"));
		user.setPassword(request.getParameter("password"));
		user.setEmail(request.getParameter("email"));
		user.setFullname(request.getParameter("fullname"));
		String enable = request.getParameter("enabled");
		String username = request.getParameter("username");
		if (enable == null)
			enable = "0";
		Account oldUser = D_Account.doSelect(username);
		if (user.getPassword() != null) {
			if (user.getPassword().trim().equals("")) {
				user.setPassword(oldUser.getPassword());
			}
		}
		String checked = CheckAccount.doCheckNull(user, enable);
		if (checked.equals("ok")) {
			enable = enable.trim();
			checked = CheckAccount.doMatch(user, enable);
		}
		if (checked.equals("ok")) {
			int enabled = Integer.valueOf(enable);
			String hashed ;
			if( !user.getPassword().equals(oldUser.getPassword())) {
				hashed = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
			}else {
				hashed =user.getPassword();
			}
			int count = D_Account.doUpdate(user.getUsername(), hashed,
					user.getEmail(), user.getFullname(), enabled, username);
			if (count == 0) {
				checked = "数据库操作失败";
			} else {
				synchronized (request.getServletContext()) {
					HashMap<Integer, RbacAccount> rbac = RbacInitialize.doRbacUserInit();
					HashMap<Integer, RbacRole> roles = RbacInitialize.doRbacRoleInit();
					HashMap<Integer,ArrayList<String>> actions=RbacInitialize.doRbacActionInit();
					request.getServletContext().setAttribute("actions", actions);	
					request.getServletContext().setAttribute("rbac", rbac);
					request.getServletContext().setAttribute("roles", roles);
				}

				try {
					response.sendRedirect("uuser.do?username=" + user.getUsername()
							+ "&checked=success");
				} catch (IOException e) {
					e.printStackTrace();
				}
				return null;
			}
		}
		@SuppressWarnings("unchecked")
		HashMap<Integer,RbacAccount> rbac=(HashMap<Integer,RbacAccount>)request.getServletContext().getAttribute("rbac");
		ArrayList<Integer> accountRoles=rbac.get(oldUser.getId()).getRole();
		ArrayList<AccountPermissionRole> ownedRole=new ArrayList<AccountPermissionRole>();
		AccountPermissionRole role=null;
		
		for(int roleId : accountRoles) {
			role=D_Role.doSelect(roleId);
			ownedRole.add( role);
		}
		request.setAttribute("ownedRole", ownedRole);
		request.setAttribute("checked", checked);
		request.setAttribute("user", oldUser);
		ArrayList<Department> departments=D_Department.doSelectAllDepartment();
		request.setAttribute("departments", departments);
		return "rbac/uuser";
	}
	@RequestMapping(value = "urole")
	public String urole(HttpServletRequest request,HttpServletResponse response)  {
		String newName = request.getParameter("newName");
		String rolename = request.getParameter("roleName");
		String alias = request.getParameter("alias");
		String checked = CheckRole.doCheckNull(newName, alias);
		if (checked.equals("ok")) {
			newName = newName.trim();
			alias = alias.trim();
			checked = CheckRole.doMatch(newName, alias);
		}
		AccountPermissionRole role =D_Role.doSelect(rolename);
		int advanced_role=D_Role_Hierarchy.doSelect(role.getId());

		if (checked.equals("ok")) {

			int count = D_Role.doUpdate(newName, alias, rolename);
			if (count == 0) {
				checked = "数据库操作失败";
			} else {
				synchronized (request.getServletContext()) {
					HashMap<Integer, RbacAccount> rbac = RbacInitialize.doRbacUserInit();
					HashMap<Integer, RbacRole> roles = RbacInitialize.doRbacRoleInit();
					HashMap<Integer,ArrayList<String>> actions=RbacInitialize.doRbacActionInit();
					request.getServletContext().setAttribute("actions", actions);	
					request.getServletContext().setAttribute("rbac", rbac);
					request.getServletContext().setAttribute("roles", roles);
				}

				try {
					response.sendRedirect("urole.do?roleName=" + newName
							+ "&checked=success");
				} catch (IOException e) {
					e.printStackTrace();
				}
				return null;
			}
		}
		
		if (advanced_role!=0) {
			request.setAttribute("advancedrole",advanced_role);
		}
		request.setAttribute("role", role);
		request.setAttribute("checked", checked);
		return "rbac/urole";
	}
	@RequestMapping(value = "upermission")
	public String upermission(HttpServletRequest request,HttpServletResponse response)  {
		String newName = request.getParameter("newName");
		String permissionName = request.getParameter("permissionName");
		String alias = request.getParameter("alias");
		String checked=CheckPermission.doCheckNull(newName, alias, "0");
		if(checked.equals("ok")) {
			newName=newName.trim();
			alias=alias.trim();
			checked=CheckPermission.doMatch(newName, alias, "0");
		}
		
		AccountPermissionRole permission=D_Permission.doSelect(permissionName);
		
		if (checked.equals("ok")) {
						
			int count = D_Permission.doUpdate(newName,alias,permissionName);
			if(count==0) {
				checked="数据库操作失败";
			}else {
				synchronized (request.getServletContext()) {
					HashMap<Integer, RbacAccount> rbac = RbacInitialize.doRbacUserInit();
					HashMap<Integer, RbacRole> roles = RbacInitialize.doRbacRoleInit();
					HashMap<Integer,ArrayList<String>> actions=RbacInitialize.doRbacActionInit();
					request.getServletContext().setAttribute("actions", actions);	
					request.getServletContext().setAttribute("rbac", rbac);
					request.getServletContext().setAttribute("roles", roles);
				}
				try {
					response.sendRedirect("upermission.do?permissionName="+newName+"&checked=success");
				} catch (IOException e) {
					e.printStackTrace();
				}
				return null;
			}
		}
		request.setAttribute("permission", permission);
		request.setAttribute("checked", checked);
		return "rbac/upermission";
	}
	@RequestMapping(value = "drolePermission")
	public String drolePermission(HttpServletRequest request,HttpServletResponse response)  {
		String tableName=request.getParameter("tableName");
		String uid=request.getParameter("uname");
		String status="";
		if(tableName != null && uid != null) {
			if(!tableName.equals("role") && !tableName.equals("permission")) {
				status="";
			}else {
				int count=0;
				int relationshipCount=0;
				if(tableName.equals("role")) {
					relationshipCount=D_Role_Permission.doSelectHasRelationship(Integer.valueOf(uid));	
					if(relationshipCount == 0) {
						count=D_Role_Permission.doDeleteRoleOrPermission(Integer.valueOf(uid), tableName);
					}
				}else if(tableName.equals("permission")){
					count=D_Role_Permission.doDeleteRoleOrPermission(Integer.valueOf(uid), tableName);
				}
				if(count!=0) {
					status="ok";
				}else {
					status="";
				}
			}
		}else {
			status="";
		}
		Ht.p(response,status);
		return null;
	}
	@RequestMapping(value = "duser")
	public String duser(HttpServletRequest request,HttpServletResponse response)  {
		String username=request.getParameter("uname");
		String status="";
		if(username!=null) {
			int count=D_Account.doUpdate(username);
			if(count!=0) {
				status="ok";
			}else {
				status="no";
			}
		}
		Ht.p(response,status);
		return null;
	}
	@RequestMapping(value = "sdefaultRole")
	public String sdefaultRole(HttpServletRequest request,HttpServletResponse response)  {
		String userid = request.getParameter("userid");
		String roleid = request.getParameter("roleid");
		if (userid != null && roleid != null) {
			int count1 = 0;
			int count2 = 0;
			String status="0";
			count1 = D_Role_Account.doCreate(roleid, userid);
			@SuppressWarnings("unchecked")
			HashMap<Integer, RbacRole> roles = (HashMap<Integer, RbacRole>)request.getServletContext().getAttribute("roles");
			synchronized (roles) {
				if(roles.get(Integer.valueOf(roleid)).getUser().containsKey(Integer.valueOf(userid))) {
					count2 = D_Role.doUpdateDefault(Integer.valueOf(userid),Integer.valueOf(roleid));
				}
			}
			if (count1 != 0 && count2 == 0) {
				status ="1";
			}else if (count1 == 0 && count2 != 0) {
				status= "2";
			}else if(count1 !=0 && count2 !=0) {
				status="3";
			}
			
			if(count1 != 0 || count2!=0) {
				synchronized (request.getServletContext()) {
					HashMap<Integer, RbacAccount> rbac = RbacInitialize.doRbacUserInit();
					roles = RbacInitialize.doRbacRoleInit();
					HashMap<Integer,ArrayList<String>> actions=RbacInitialize.doRbacActionInit();
					request.getServletContext().setAttribute("actions", actions);	
					request.getServletContext().setAttribute("rbac", rbac);
					request.getServletContext().setAttribute("roles", roles);
				}
				
			}
			Ht.p(response,status);
		}
		return null;
	}
	@RequestMapping(value = "urolehierarchy")
	public String urolehierarchy(HttpServletRequest request,HttpServletResponse response)  {
		String roleid=request.getParameter("roleid");
		String advancedid=request.getParameter("advancedid");
		int count=0;
		String status="no";
		if(advancedid !=null) {
			count=D_Role_Hierarchy.doUpdate(roleid, advancedid);
			if(count != 0) {
				status="ok";
			}
		}else {
			count=D_Role_Hierarchy.doDelete(roleid);
			if(count != 0) {
				status="ok";
			}
		}
		Ht.p(response,status);
		return null;
	}
	@RequestMapping(value = "prolehierarchytree")
	public String prolehierarchytree(HttpServletRequest request,HttpServletResponse response)  {
		@SuppressWarnings("unchecked")
		HashMap<Integer,RbacRole> roles=(HashMap<Integer,RbacRole>)request.getServletContext().getAttribute("roles");
		Set<Integer> roleskey=roles.keySet();
		StringBuffer sb = new StringBuffer();
		for(Integer key : roleskey) {
			if(D_Role_Hierarchy.doSelect(key)==0) {
				sb.append("<ul>");
				doRecursion(sb,key,roles);
				sb.append("</ul>");
			}
		}
		String hierarchytree=sb.toString();
		request.setAttribute("hierarchytree",hierarchytree);
		return "rbac/prolehierarchytree";
	}
public static void doRecursion(StringBuffer sb,int id,HashMap<Integer,RbacRole> roles) {
		sb.append("<li data-roleid=\""+id+"\">"+roles.get(id).getAlias());
		ArrayList<Integer> basic_role=D_Role_Hierarchy.doSelectAdvanced(id);
		if(basic_role.size()!= 0) {
			sb.append("<ul>");
			for( int roleid : basic_role) {	
				doRecursion(sb,roleid,roles);
			}
			sb.append("</ul>");
		}
		sb.append("</li>");
	}
	@RequestMapping(value = "dpermission")
	public String dpermission(HttpServletRequest request,HttpServletResponse response)  {
		String permissionId = request.getParameter("permissionId");
		String status = "";
		int count = 0;
		int cid = 0;
		// 判断此ID有没有下层操作
		cid = D_Permission.doSelectChild(Integer.valueOf(permissionId));
		if (cid == 0) {
			count = D_Permission.doDelete(Integer.valueOf(permissionId));
		}
		if (count != 0) {
			status = "ok";
		}
		Ht.p(response,status);
		return null;
	}
}
