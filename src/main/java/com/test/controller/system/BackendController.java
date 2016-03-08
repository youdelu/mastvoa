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

import rbac.inputcheck.CheckDepartment;
import rbac.inputcheck.CheckRole;
import rbac.javabean.RbacAccount;
import rbac.javabean.RbacRole;
import tool.Pagination;
import backend.inputcheck.CheckFormtype;
import backend.inputcheck.CheckQuery;
import backend.inputcheck.CheckWorkflow;
import backend.inputcheck.CheckWorkform;
import backend.javabean.Announcement;
import backend.javabean.Defaultflow;
import backend.javabean.Department;
import backend.javabean.Formtype;
import backend.javabean.Workform;

import com.test.dao.backend.D_Announcement;
import com.test.dao.backend.D_Defaultflow;
import com.test.dao.backend.D_Department;
import com.test.dao.backend.D_Formtype;
import com.test.dao.backend.D_SystemInfo;
import com.test.dao.backend.D_Workflow;
import com.test.dao.backend.D_Workform;
import com.test.dao.login.D_LoginLimit;
import com.test.util.Ht;

import frontend.javabean.Workflow;

@Controller
@RequestMapping("/backend/")
public class BackendController {
 
	@RequestMapping(value = "cworkflow")
	public String cworkflow(HttpServletRequest request,HttpServletResponse response) {
		String mWorkflow=request.getParameter("mWorkflow");
		String wName=request.getParameter("wName");
		String formId=request.getParameter("formid");
		String checked = CheckWorkflow.doCheckNull(mWorkflow, wName,formId);
		if (checked.equals("ok")) {
			checked = CheckWorkflow.doMatch(mWorkflow, wName,formId);
		}	
		if(checked.equals("ok")) {
			mWorkflow=mWorkflow.trim();
			wName=wName.trim();
			int count = D_Defaultflow.doCreate(mWorkflow,wName,formId);
			if(count!=0) {			
				Ht.p(response, "ok");
			}else {
				Ht.p(response, "数据库操作失败");
			}
		}else if(checked.equals("")){
			ArrayList<Workform> formList=D_Workform.doSelectAll();
			request.setAttribute("formList", formList);
			 return "backend/cworkflow";
		}else {
			Ht.p(response,checked);
		}
		return null;
	}
	@RequestMapping(value = "lworkflow")
	public String lworkflow(HttpServletRequest request,HttpServletResponse response) {
		String flowid=request.getParameter("flowid");
		if(flowid!=null) {
			int count=D_Defaultflow.doDelete(Integer.valueOf(flowid));
			if (count!=0) {			
				Ht.p(response,"ok");
			} else {
				Ht.p(response,"no");
			}
			return null;
		}
		
		int pageNumber;
		if (request.getParameter("pageNumber") == null) {
			pageNumber = 1;
		} else {
			pageNumber = Integer.valueOf(request.getParameter("pageNumber"));
		}

		Pagination page = new Pagination(pageNumber, 2, "defaultflow","");

		if (page.getTotal() != 0) {
			String[] columns = { "id", "name", "participate" ,"workform_id"};
			List<ArrayList<Object>> rows = page.getRows(columns);
			for(ArrayList<Object> row : rows) {
				if(row.get(3)!= null ) {
					String workformId=row.get(3).toString();
					String workformName=D_Workform.doSelect(workformId).getName();
					row.set(3,workformName);
				}else {
					row.set(3, "空");
				}
			}
			
			request.setAttribute("rows", rows);
			request.setAttribute("pageNumber", pageNumber);
			request.setAttribute("countPage", page.getCountPage());
		}
		return "backend/lworkflow";
	}
	@RequestMapping(value = "cworkform")
	public String cworkform(HttpServletRequest request,HttpServletResponse response) {
		String name=request.getParameter("workformName");
		String content=request.getParameter("editor1");
		String formtypeId=request.getParameter("formtypeId");
		
		String checked=CheckWorkform.doCheckNull(content, name);
		
		if(checked.equals("ok")) {
			name=name.trim();
			content=content.trim();
			
			checked=CheckWorkform.doMatch(name);
		}
		
		if (checked.equals("ok")) {
						
			int count = D_Workform.doCreate(content, name,Integer.parseInt(formtypeId));
			if(count!=0) {
				try {
					response.sendRedirect("cworkform.do?checked=success");
				} catch (IOException e) {
					e.printStackTrace();
				}
				return null; 
			}else {
				checked="数据库操作失败";
			}
		}
		
		ArrayList<Formtype> formtype=D_Formtype.doSelectAll();
		if(formtype.size()==0) {
			try {
				response.sendRedirect("cformtype.do");
			} catch (IOException e) {
				e.printStackTrace();
			}
			return null;
		}
		request.setAttribute("formtype", formtype);
		request.setAttribute("checked", checked);
		return "backend/cworkform";
	}
	@RequestMapping(value = "lworkform")
	public String lworkform(HttpServletRequest request,HttpServletResponse response) {
		String workformId=request.getParameter("workformId");
		if(workformId!=null) {
			int count=D_Workform.doDelete(Integer.valueOf(workformId));
			if (count!=0) {			
				Ht.p(response,"ok");
			} else {
				Ht.p(response,"no");
			}
			return null;
		}
		int pageNumber;
		if (request.getParameter("pageNumber") == null) {
			pageNumber = 1;
		} else {
			pageNumber = Integer.valueOf(request.getParameter("pageNumber"));
		}
		Pagination page = new Pagination(pageNumber, 2, "workform","");
		if (page.getTotal() != 0) {
			String[] columns = { "id", "name"};
			List<ArrayList<Object>> rows = page.getRows(columns);
			request.setAttribute("rows", rows);
			request.setAttribute("pageNumber", pageNumber);
			request.setAttribute("countPage", page.getCountPage());
		}
		return "backend/lworkform";
	}
	@RequestMapping(value = "uworkform")
	public String uworkform(HttpServletRequest request,HttpServletResponse response) {
String workformId = request.getParameter("workformId");
		String name = request.getParameter("workformName");
		String content = request.getParameter("editor1");
		String formtypeId=request.getParameter("formtypeId");
		String checked = CheckWorkform.doCheckNull(content, name);
		if (checked.equals("ok")) {
			name = name.trim();
			content = content.trim();
			checked = CheckWorkform.doMatch(name);
		}
		if (checked.equals("ok")) {
			int count = D_Workform.doUpdate(content, name,Integer.valueOf(workformId),Integer.valueOf(formtypeId));
			if (count != 0) {
				try {
					response.sendRedirect("uworkform.do?checked=success&workformId="+workformId);
				} catch (IOException e) {
					e.printStackTrace();
				}
				return null;
			} else {
				checked = "数据库操作失败";
			}
		}
		
		ArrayList<Formtype> formtype=D_Formtype.doSelectAll();
		Workform form = D_Workform.doSelect(workformId);
		//ArrayList<Defaultflow> workflows=D_Defaultflow.doSelectAll();
		ArrayList<Defaultflow> activeflows=D_Defaultflow.doSelectActive(workformId);
		request.setAttribute("workform", form);
		//request.setAttribute("workflows", workflows);
		request.setAttribute("activeflows", activeflows);
		request.setAttribute("formtype", formtype);
		request.setAttribute("checked", checked);
		return "backend/uworkform";
	}
	@RequestMapping(value = "uworkflow")
	public String uworkflow(HttpServletRequest request,HttpServletResponse response) {
		String flowId=request.getParameter("flowId");
		String updateFlowId =request.getParameter("updateflowId");
		String mWorkflow=request.getParameter("mWorkflow");
		String wName=request.getParameter("wName");
		String mflowid=request.getParameter("mflowid");
		
		if(flowId != null) {
			int count=D_Defaultflow.doDelete(Integer.valueOf(flowId));
			if(count != 0) {
				Ht.p(response,"ok");
			}else{
				Ht.p(response,"数据库操作失败");
			}
		}else if(mWorkflow != null && wName != null && mflowid != null) {
			int count=D_Defaultflow.doUpdate(wName,mWorkflow,mflowid);
			if(count != 0) {
				Ht.p(response,"ok");
			}else{
				Ht.p(response,"数据库操作失败");
			}	
		}else if(updateFlowId != null ){
			Defaultflow flow=D_Defaultflow.doSelect(updateFlowId);
			request.setAttribute("flow", flow);
			return "backend/uworkflow";
		}
		return null;
	}
	@RequestMapping(value = "cformtype")
	public String cformtype(HttpServletRequest request,HttpServletResponse response) {
		String name=request.getParameter("name");
		String checked=CheckFormtype.doCheckNull(name);
		if(checked.equals("ok")) {
			name=name.trim();
			checked=CheckFormtype.doMatch(name);
		}
		if (checked.equals("ok")) {
			int count = D_Formtype.doCreate(name);
			if(count!=0) {
				try {
					response.sendRedirect("cformtype.do?checked=success");
				} catch (IOException e) {
					e.printStackTrace();
				}
				return null; 
			}else {
				checked="数据库操作失败";
			}
		}
		request.setAttribute("checked", checked);
		return "backend/cformtype";
	}
	@RequestMapping(value = "lformtype")
	public String lformtype(HttpServletRequest request,HttpServletResponse response) {
		String formtypeid=request.getParameter("formtypeid");
		if(formtypeid != null) {
			int count=D_Formtype.doDelete(Integer.valueOf(formtypeid));
			if (count!=0) {			
				Ht.p(response,"ok");
			} else {
				Ht.p(response,"no");
			}
			return null;
		}
		int pageNumber;
		if (request.getParameter("pageNumber") == null) {
			pageNumber = 1;
		} else {
			pageNumber = Integer.valueOf(request.getParameter("pageNumber"));
		}

		Pagination page = new Pagination(pageNumber, 2, "formtype","");

		if (page.getTotal() != 0) {
			String[] columns = { "id", "name"};
			List<ArrayList<Object>> rows = page.getRows(columns);
			request.setAttribute("rows", rows);
			request.setAttribute("pageNumber", pageNumber);
			request.setAttribute("countPage", page.getCountPage());
		}

		return "backend/lformtype";
	}
	@RequestMapping(value = "uformtype")
	public String uformtype(HttpServletRequest request,HttpServletResponse response) {
		String name = request.getParameter("name");
		String formtypeId = request.getParameter("formtypeId");
		String checked = CheckFormtype.doCheckNull(name);
		if (checked.equals("ok")) {
			name=name.trim();
			checked = CheckFormtype.doMatch(name);
		}
		ArrayList<String> formtype=D_Formtype.doSelect(formtypeId);
		if (checked.equals("ok")) {
			int count = D_Formtype.doUpdate(name, Integer.valueOf(formtypeId));
			if (count == 0) {
				checked = "数据库操作失败";
			}else {
				try {
					response.sendRedirect("uformtype.do?formtypeId=" + formtypeId
							+ "&checked=success");
				} catch (IOException e) {
					e.printStackTrace();
				}
				return null;
			}
		}
		request.setAttribute("formtype", formtype);
		request.setAttribute("checked", checked);
		return "backend/uformtype";
	}
	@RequestMapping(value = "lloginlimit")
	public String lloginlimit(HttpServletRequest request,HttpServletResponse response) {
		String username=request.getParameter("username");
		if(username != null) {
			int count=D_LoginLimit.doDelete(username);
			if (count!=0) {			
				Ht.p(response,"ok");
			} else {
				Ht.p(response,"no");
			}
			return null;
		}
		
		int pageNumber;
		if (request.getParameter("pageNumber") == null) {
			pageNumber = 1;
		} else {
			pageNumber = Integer.valueOf(request.getParameter("pageNumber"));
		}

		Pagination page = new Pagination(pageNumber, 8, "loginlimit","");

		if (page.getTotal() != 0) {
			String[] columns = { "id", "ipaddress","createtime","number","username"};
			List<ArrayList<Object>> rows = page.getRows(columns);
			request.setAttribute("rows", rows);
			request.setAttribute("pageNumber", pageNumber);
			request.setAttribute("countPage", page.getCountPage());
		}

		return "backend/lloginlimit";
	}
	@RequestMapping(value = "cannouncement")
	public String cannouncement(HttpServletRequest request,HttpServletResponse response) {
		String name=request.getParameter("announcementName");
		String content=request.getParameter("editor1");
		
		String checked=CheckWorkform.doCheckNull(content, name);
		
		if(checked.equals("ok")) {
			name=name.trim();
			content=content.trim();
			
			checked=CheckWorkform.doMatch(name);
		}
		
		if (checked.equals("ok")) {
						
			int count = D_Announcement.doCreate(content, name);
			if(count!=0) {
				try {
					response.sendRedirect("cannouncement.do?checked=success");
				} catch (IOException e) {
					e.printStackTrace();
				}
				return null; 
			}else {
				checked="数据库操作失败";
			}
		}
		request.setAttribute("checked", checked);
		return "backend/cannouncement";
	}
	@RequestMapping(value = "lannouncement")
	public String lannouncement(HttpServletRequest request,HttpServletResponse response) {
		String announcementId=request.getParameter("announcementid");
		if(announcementId!=null) {
			int count=D_Announcement.doDelete(Integer.valueOf(announcementId));
			if (count!=0) {			
				Ht.p(response,"ok");
			} else {
				Ht.p(response,"no");
			}
			return null;
		}
		
		int pageNumber;
		if (request.getParameter("pageNumber") == null) {
			pageNumber = 1;
		} else {
			pageNumber = Integer.valueOf(request.getParameter("pageNumber"));
		}

		Pagination page = new Pagination(pageNumber, 2, "announcement"," ORDER BY id DESC");

		if (page.getTotal() != 0) {
			String[] columns = { "id", "name","createtime"};
			List<ArrayList<Object>> rows = page.getRows(columns);
			request.setAttribute("rows", rows);
			request.setAttribute("pageNumber", pageNumber);
			request.setAttribute("countPage", page.getCountPage());
		}
		return "backend/lannouncement";
	}
	@RequestMapping(value = "uannouncement")
	public String uannouncement(HttpServletRequest request,HttpServletResponse response) {
		String announcementId = request.getParameter("announcementId");

		String name = request.getParameter("announcementName");
		String content = request.getParameter("editor1");
		String checked = CheckWorkform.doCheckNull(content, name);

		if (checked.equals("ok")) {
			name = name.trim();
			content = content.trim();

			checked = CheckWorkform.doMatch(name);
		}

		if (checked.equals("ok")) {

			int count = D_Announcement.doUpdate(content, name,Integer.valueOf(announcementId));
			if (count != 0) {
				try {
					response.sendRedirect("uannouncement.do?checked=success&announcementId="
							+ announcementId);
				} catch (IOException e) {
					e.printStackTrace();
				}
				return null;
			} else {
				checked = "数据库操作失败";
			}
		}

		Announcement announcement =  D_Announcement.doSelect(announcementId);

		request.setAttribute("announcement", announcement);
		request.setAttribute("checked", checked);
		return "backend/uannouncement";
	}
	@RequestMapping(value = "queryuser")
	public String queryuser(HttpServletRequest request,HttpServletResponse response) {
		String queryname = request.getParameter("queryname");
		String queryType = request.getParameter("querytype");

		String checked = CheckQuery.doCheckNull(queryType);

		if (checked.equals("ok")) {
			checked = CheckQuery.doCheckFullname(queryname);
		}

		if (checked.equals("ok")) {
			if (queryType.equals("username")) {
				checked = CheckQuery.doMatchUsername(queryname);	
			} else if (queryType.equals("fullname")) {
				checked = CheckQuery.doMatchFullname(queryname);
			} else if(queryType.equals("userid")) {
				checked= CheckQuery.doMatchUserid(queryname);
			}
		}

		if (checked.equals("ok")) {

			int pageNumber;
			if (request.getParameter("pageNumber") == null) {
				pageNumber = 1;
			} else {
				pageNumber = Integer.valueOf(request.getParameter("pageNumber"));
			}

			String condition;

			if (queryType.equals("username")) {
				condition = " WHERE username LIKE '%" + queryname + "%'"
						+ " ORDER BY id DESC";
			} else if (queryType.equals("fullname")) {
				condition = " WHERE fullname LIKE '%" + queryname + "%'"
						+ " ORDER BY id DESC";		
			} else  {
				condition = " WHERE id LIKE '%" + queryname + "%'"
						+ " ORDER BY id DESC";	
			}
			
			Pagination page = new Pagination(pageNumber, 2, "account",condition);

			if (page.getTotal() != 0) {
				String[] columns = { "id", "username", "fullname", "email","enabled" ,"default_roleid"};
				List<ArrayList<Object>> rows = page.getRows(columns);
				request.setAttribute("rows", rows);
				request.setAttribute("pageNumber", pageNumber);
				request.setAttribute("countPage", page.getCountPage());
				request.setAttribute("queryname", queryname);
				request.setAttribute("querytype", queryType);
			}
		}
		request.setAttribute("checked", checked);
		return "backend/queryuser";
	}
	@RequestMapping(value = "queryworkflow")
	public String queryworkflow(HttpServletRequest request,HttpServletResponse response) {
		String queryId=request.getParameter("queryid");
		String queryType=request.getParameter("querytype");
		String status=request.getParameter("status");
		String year=request.getParameter("year");
		String month=request.getParameter("month");
		String tense=request.getParameter("tense");

		String checked=CheckQuery.doCheckNull(queryType, status, year, month, tense);
		
		if(checked.equals("ok")) {
			 queryType= queryType.trim();
			 status=status.trim();
			 year=year.trim();
			 month= month.trim();
			 tense=tense.trim();
			 checked=CheckQuery.doMatch(year, month);
		}
		
		if(checked.equals("ok")) {
					
			int pageNumber;
			if (request.getParameter("pageNumber") == null) {
				pageNumber = 1;
			} else {
				pageNumber = Integer.valueOf(request.getParameter("pageNumber"));
			}		
			
			String condition="";
			String cQueryType="";
			String cStatus="";
			//String cCustom="";
			String cDate="'"+year+"-"+month+"-1"+"'";
			String cOrder="ORDER BY id DESC";
			
			if(queryId!=null) {
				if(!queryId.equals("")) {
					queryId=queryId.trim();
				}
			}
			
			if(!queryId.equals("")) {
				if(queryType.equals("department")) {
					cQueryType="roleflow=" + queryId+ " AND ";
				}else {
					cQueryType="account_id="+ queryId + " AND ";
				}
				
			}
				
			if(!status.equals("3")) {
				cStatus="status="+status;
			}else {
				cStatus="status<"+4;
			}
	
			if(tense.equals("current")) {
				cDate= "YEAR(createtime)=" + year+ " and MONTH(createtime)=" + month;
			}else if(tense.equals("before")) {
				cDate="date(createtime)<="+cDate;
			}else if(tense.equals("after")) {
				cDate="date(createtime)>="+cDate;
			}
	
			condition=" WHERE "+cQueryType + cStatus+" AND "+cDate+" "+cOrder;

			Pagination page = new Pagination(pageNumber, 2, "workflow",condition);

			if (page.getTotal() != 0) {
				String[] columns = { "id", "name", "account_id", "createtime", "status" };
				List<ArrayList<Object>> rows = page.getRows(columns);
				request.setAttribute("rows", rows);
				request.setAttribute("pageNumber", pageNumber);
				request.setAttribute("countPage", page.getCountPage());
				request.setAttribute("year", year);
				request.setAttribute("month", month);
				request.setAttribute("tense", tense);
				request.setAttribute("status", status);
				request.setAttribute("querytype", queryType);
				request.setAttribute("queryid", queryId);
			}	
		}
		ArrayList<Department> departments=D_Department.doSelectAllDepartment();
		request.setAttribute("departments", departments);
		request.setAttribute("checked", checked);
		return "backend/queryworkflow";
	}
	@RequestMapping(value = "qdetailworkflow")
	public String qdetailworkflow(HttpServletRequest request,HttpServletResponse response) {
		String flowid=request.getParameter("flowid");
		@SuppressWarnings("unchecked")
		HashMap<Integer, RbacRole> roles = (HashMap<Integer, RbacRole>)request.getServletContext().getAttribute("roles");
		@SuppressWarnings("unchecked")
		HashMap<Integer,RbacAccount> rbac=(HashMap<Integer,RbacAccount>)request.getServletContext().getAttribute("rbac");
		Workflow workflow=null;
		
		if(flowid != null) {
			workflow=D_Workflow.doSelectQdetail(Integer.valueOf(flowid));	
		}
		
		ArrayList<String> finishInfo=null;
		if(workflow != null) {
			if (workflow.getAccountflow() != null) {
				String accountFlow[] = workflow.getAccountflow().split(",");
				finishInfo=new ArrayList<String>();
				String accountInfo=null;
				
				for(String account : accountFlow) {
					 //如果是委托的
					if(account.contains("-")) {
						String AccountIdInfo[]=account.split("-");
						//委托人和经办人信息
						int userId=Integer.valueOf(AccountIdInfo[0]);
						int delegateId=Integer.valueOf(AccountIdInfo[1]);
						
						accountInfo=D_Department.doSelect(rbac.get(userId).getDepartmentId()).getAlias()+
						"-"+roles.get(rbac.get(userId).getDefault_roleid()).getAlias()+
						"-"+rbac.get(userId).getFullname()
						+"-->"+
						D_Department.doSelect(rbac.get(delegateId).getDepartmentId()).getAlias()+
						"-"+roles.get(rbac.get(delegateId).getDefault_roleid()).getAlias()+
						"-"+rbac.get(delegateId).getFullname();
						
						finishInfo.add(accountInfo);
					}else {
						int userId=Integer.valueOf(account);
						accountInfo=D_Department.doSelect(rbac.get(userId).getDepartmentId()).getAlias()+
								"-"+roles.get(rbac.get(userId).getDefault_roleid()).getAlias()+
								"-"+rbac.get(userId).getFullname();
						finishInfo.add(accountInfo);
					}
				}
			}
		}else {
			try {
				response.sendRedirect("queryworkflow.do");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return null;
		}
		
		String accountInfo=D_Department.doSelect(rbac.get(workflow.getAccount_id()).getDepartmentId()).getAlias()+
				"-"+roles.get(rbac.get(workflow.getAccount_id()).getDefault_roleid()).getAlias()+
				"-"+rbac.get(workflow.getAccount_id()).getFullname();
		request.setAttribute("accountInfo", accountInfo);
		
		request.setAttribute("finishInfo", finishInfo);
		request.setAttribute("content", workflow.getContent());
		request.setAttribute("status", workflow.getStatus());
	 
		return "backend/qdetailworkflow";
	}
	@RequestMapping(value = "lsysteminfo")
	public String lsysteminfo(HttpServletRequest request,HttpServletResponse response) {
		int rbacAccountCount=0;
		int rbacRoleCount=0;
		
		int dbAccountCount=0;
		int dbRoleCount=0;
		
		int workflowCount=0;
		int finishedWorkflowCount=0;
		int rejectedWorkflowCount=0;
		int unfinishedWorkflowCount=0;
		String rbacRolekey="";
		String rbacAccountkey="";
		
		@SuppressWarnings("unchecked")
		HashMap<Integer,RbacAccount> rbac=(HashMap<Integer,RbacAccount>)request.getServletContext().getAttribute("rbac");
		@SuppressWarnings("unchecked")
		HashMap<Integer, RbacRole> roles = (HashMap<Integer, RbacRole>)request.getServletContext().getAttribute("roles");
		
		String problemInfo[]=new String[3];

		Set<Integer> roleskey=roles.keySet();
		for(Integer key : roleskey) {
			rbacRolekey+=key+",";
		}
		if(!rbacRolekey.equals("")){
			rbacRolekey= " WHERE id NOT IN ("+rbacRolekey.substring(0, rbacRolekey.length()-1)+")";
		}
		problemInfo[0]=D_SystemInfo.problemRoleAccount(rbacRolekey);  //未在系统中的角色-用户
			
		Set<Integer> accountkey=rbac.keySet();
		for(Integer key : accountkey) {
			rbacAccountkey+=key+",";
		}
		if(!rbacAccountkey.equals("")){
			rbacAccountkey=" WHERE id NOT IN ("+rbacAccountkey.substring(0, rbacAccountkey.length()-1)+")";
		}
		problemInfo[2]=D_SystemInfo.problemRbacAccount(rbacAccountkey);  //未在系统中的用户
		
		
		rbacAccountCount=rbac.size();
		rbacRoleCount=roles.size();
		dbAccountCount=D_SystemInfo.doCountAccount();
		dbRoleCount=D_SystemInfo.doCountRole();
		workflowCount=D_SystemInfo.doCountWorkflow();
		finishedWorkflowCount=D_SystemInfo.doCountFinishedWorkflow();
		rejectedWorkflowCount=D_SystemInfo.doCountRejectedWorkflow();
		unfinishedWorkflowCount=D_SystemInfo.doCountUnfinishedWorkflow();
		
		Integer systemInfo[]=new Integer[8];
		systemInfo[0]=rbacAccountCount;
		systemInfo[1]=rbacRoleCount;
		systemInfo[2]=dbAccountCount;
		systemInfo[3]=dbRoleCount;
		systemInfo[4]=workflowCount;
		systemInfo[5]=finishedWorkflowCount;
		systemInfo[6]=rejectedWorkflowCount;
		systemInfo[7]=unfinishedWorkflowCount;
		
		
		String infoName[]=new String[11];
		infoName[0]="系统用户";
		infoName[1]="系统角色";
		infoName[2]="数据库用户";
		infoName[3]="数据库角色";
		infoName[4]="工作流总数";
		infoName[5]="完成的工作流";
		infoName[6]="拒绝的工作流";
		infoName[7]="未完成的工作流";
		infoName[8]="未在系统中的角色-用户";
		infoName[9]="未在系统中的用户";
			
		request.setAttribute("problemInfo", problemInfo);
		request.setAttribute("systemInfo", systemInfo);
		request.setAttribute("infoName", infoName);
	 
		return "backend/lsysteminfo";
	}
	@RequestMapping(value = "cdepartment")
	public String cdepartment(HttpServletRequest request,HttpServletResponse response) {
		String name = request.getParameter("name");
		String alias = request.getParameter("alias");
		String pid=request.getParameter("pid");

		if (name == null || alias == null) {
			ArrayList<Department> departments=D_Department.doSelectAllDepartment();
			request.setAttribute("departments", departments);
			return "backend/cdepartment";
		} else {
			String checked = CheckDepartment.doCheckNull(name, alias);
			
			if (checked.equals("ok")) {
				name = name.trim();
				alias = alias.trim();

				checked = CheckDepartment.doMatch(name, alias);
			}
 
			if (checked.equals("ok")) {
				int GeneratedId=0;
				synchronized (request.getServletContext()) {
					GeneratedId = D_Department.doCreate(name, alias,Integer.valueOf(pid ));
				}
				if (GeneratedId != 0) {
					Ht.p(response,"ok"+GeneratedId);
					return null;
				} else {
					checked = "数据库操作失败";
				}
			}
			Ht.p(response,checked);
		}
		return null;
	}
	@RequestMapping(value = "ldepartment")
	public String ldepartment(HttpServletRequest request,HttpServletResponse response) {
		int pageNumber;
		if (request.getParameter("pageNumber") == null) {
			pageNumber = 1;
		} else {
			pageNumber = Integer.valueOf(request.getParameter("pageNumber"));
		}

		Pagination page = new Pagination(pageNumber, 10, "department AS dep LEFT JOIN department AS pdep ON dep.pid = pdep.id","");

		if (page.getTotal() != 0) {
			String[] columns = { "dep.id", "dep.name", "dep.alias" ,"pdep.alias"};
			List<ArrayList<Object>> rows = page.getRows(columns);
			request.setAttribute("rows", rows);
			request.setAttribute("pageNumber", pageNumber);
			request.setAttribute("countPage", page.getCountPage());
		}
		return "backend/ldepartment";
	}
	@RequestMapping(value = "ddepartment")
	public String ddepartment(HttpServletRequest request,HttpServletResponse response) {
		String depid = request.getParameter("depid");
		 
		String status = "";

		int count = 0;
		int cid = 0;
		
		//判断此ID有没有下层部门
		synchronized (request.getServletContext()) {
			cid = D_Department.doSelectChild(Integer.valueOf(depid));
			if (cid == 0) {
				count = D_Department.doDelete(Integer.valueOf(depid));
			}
		}
		if (count != 0) {
			status = "ok";
		}
		Ht.p(response,status);
		return null;
	}
	@RequestMapping(value = "udepartment")
	public String udepartment(HttpServletRequest request,HttpServletResponse response) {
		String newName = request.getParameter("newName");
		String DepartmentId= request.getParameter("departmentId");
		String alias = request.getParameter("alias");

		String checked = CheckRole.doCheckNull(newName, alias);

		if (checked.equals("ok")) {
			newName = newName.trim();
			alias = alias.trim();

			checked = CheckRole.doMatch(newName, alias);
		}

		Department dep =D_Department.doSelect(Integer.valueOf(DepartmentId));
		Department pdep=D_Department.doSelect(dep.getPid());

		if (checked.equals("ok")) {

			int count = D_Department.doUpdate(newName, alias,DepartmentId);
			if (count == 0) {
				checked = "数据库操作失败";
			} else {
				try {
					response.sendRedirect("udepartment.do?departmentId=" + DepartmentId
							+ "&checked=success");
				} catch (IOException e) {
					e.printStackTrace();
				}
				return null;
			}
		}
		
		if (pdep != null) {
			request.setAttribute("pdep",pdep);
		}
		
		ArrayList<Department> departments=D_Department.doSelectAllDepartment();
		request.setAttribute("departments", departments);
		request.setAttribute("dep", dep);
		request.setAttribute("checked", checked);
		 
		return "backend/udepartment";
	}
	@RequestMapping(value = "udephierarchy")
	public String udephierarchy(HttpServletRequest request,HttpServletResponse response) {
		String depid=request.getParameter("depid");
		String pdepid=request.getParameter("pdepid");

		int count=0;
		String status="no";
		
		if(pdepid !=null) {
			synchronized (request.getServletContext()) {
				count=D_Department.doUpdateHierarchy(depid, pdepid);
			}
			if(count != 0) {
				status="ok";
			}
		}else {
			synchronized (request.getServletContext()) {
				count=D_Department.doDeleteHierarchy(depid);
			}
			if(count != 0) {
				status="ok";
			}
		}
		Ht.p(response,status);
		return null;
	}
	@RequestMapping(value = "pdephierarchy")
	public String pdephierarchy(HttpServletRequest request,HttpServletResponse response) {
		StringBuilder sb = new StringBuilder();
		ArrayList<Department> departments=D_Department.doSelectAllDepartment();
		for(Department dep : departments) {
			if(dep.getPid()==0) {
				sb.append("<ul>");
				doRecursion(sb,dep.getPid(),departments,dep);
				sb.append("</ul>");
			}	
		}
		String hierarchytree=sb.toString();
		request.setAttribute("hierarchytree",hierarchytree);
		return "backend/pdephierarchy";
	}
public static void doRecursion(StringBuilder sb,int id,ArrayList<Department> departments,Department dep) {
		sb.append("<li data-depid=\""+id+"\">"+dep.getAlias());
		for(Department d : departments)
		if(d.getPid()==dep.getId()) {
			sb.append("<ul>");
			doRecursion(sb,d.getPid(),departments,d);	
			sb.append("</ul>");
		}
		sb.append("</li>");
	}
}
