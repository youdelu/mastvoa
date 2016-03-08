package com.test.controller.system;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import rbac.RbacInitialize;
import rbac.javabean.Account;
import rbac.javabean.RbacAccount;
import rbac.javabean.RbacRole;
import security.BCrypt;
import tool.CheckPermission;
import tool.Pagination;
import backend.javabean.Announcement;
import backend.javabean.Defaultflow;
import backend.javabean.Workform;

import com.test.dao.backend.D_Announcement;
import com.test.dao.backend.D_Defaultflow;
import com.test.dao.backend.D_Department;
import com.test.dao.backend.D_Workform;
import com.test.dao.frontend.D_AccountInfo;
import com.test.dao.frontend.D_Delegate;
import com.test.dao.frontend.D_DetailMyApplication;
import com.test.dao.frontend.D_FinishedFlow;
import com.test.dao.frontend.D_Form_Type;
import com.test.dao.frontend.D_Workflow;
import com.test.util.Ht;

import frontend.inputcheck.CheckAccountInfo;
import frontend.inputcheck.CheckQuery;
import frontend.inputcheck.CheckWorkflow;
import frontend.javabean.Delegate;
import frontend.javabean.Typeform;
import frontend.javabean.Workflow;

@Controller
@RequestMapping("/frontend/")
public class FrontendController {
 
	@RequestMapping(value = "nworkform")
	public String nworkform(HttpServletRequest request,HttpServletResponse response) {
		HashMap<Integer,Typeform> typeforms=D_Form_Type.doSelectAll();
		request.setAttribute("typeforms", typeforms);
		return "frontend/nworkform";
	}
	@RequestMapping(value = "nworkflow")
	public String nworkflow(HttpServletRequest request,HttpServletResponse response){
		String formid = request.getParameter("formid");
		Workform workform = D_Workform.doSelect(formid);
		ArrayList<Defaultflow> workflows = D_Defaultflow.doSelectActive(formid);
		@SuppressWarnings("unchecked")
		HashMap<Integer, RbacAccount> rbac = (HashMap<Integer, RbacAccount>) request.getServletContext().getAttribute("rbac");
		//HashMap<Integer, RbacRole> roles = (HashMap<Integer, RbacRole>) request.getServletContext().getAttribute("roles");

		String workformName = request.getParameter("workformName");
		String mWorkflow = request.getParameter("mWorkflow");
		String content = request.getParameter("editor1");
		int accountid = (Integer) request.getSession().getAttribute("id");

		String checked = CheckWorkflow.doCheckNull(mWorkflow, workformName,content);

		if (checked.equals("ok")) {
			mWorkflow = mWorkflow.trim();
			workformName = workformName.trim();
			content = content.trim();

			checked = CheckWorkflow.doMatch(mWorkflow, workformName);
		}

		String roleflow;
		String custom;
		if (checked.equals("ok")) {
			String kaptchaExpected = (String) request.getSession().getAttribute(com.google.code.kaptcha.Constants.KAPTCHA_SESSION_KEY);
			String kaptchaReceived = request.getParameter("kaptcha");

			if (kaptchaReceived == null || !kaptchaReceived.equalsIgnoreCase(kaptchaExpected)) {
					checked="验证码错误";
			} else {

				if (mWorkflow.substring(0, 1).equals("0")) {
					roleflow = mWorkflow.substring(2);
					custom = "t";
				} else {
					//3，4，6，7  我有 6 只需 7 签，类推
					String workflow[] = mWorkflow.split(",");
					roleflow = workflow[workflow.length - 1];
					for (int i = workflow.length - 2; i >= 0; i--) {
						// 判断是否有此角色
						if (rbac.get(accountid).getRole().contains(Integer.valueOf( workflow[i]))) {
							break;
						}
						roleflow = workflow[i] + "," + roleflow;
					}

					custom = "f";
				}

				int count = D_Workflow.doCreate(workformName, roleflow,content, accountid, custom);
				if (count != 0) {
					try {
						response.sendRedirect("nworkflow.do?checked=success&formid="+ formid);
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					return null;
				} else {
					checked = "数据库操作失败";
				}
			}

		request.setAttribute("formid", formid);
		request.setAttribute("workform", workform);
		request.setAttribute("workflows", workflows);
		request.setAttribute("checked", checked);
		}
		return "frontend/nworkflow";
	}
	@RequestMapping(value = "rworkflow")
	public String rworkflow(HttpServletRequest request,HttpServletResponse response){
		int accountId = (Integer) request.getSession().getAttribute("id");
		@SuppressWarnings("unchecked")
		HashMap<Integer, RbacAccount> rbac = (HashMap<Integer, RbacAccount>) request.getServletContext().getAttribute("rbac");
		// 查询所有待审的表单
		ArrayList<Workflow> workflows = D_Workflow.doSelectReady();

		StringBuilder readyFor = new StringBuilder();
		boolean check = false;
		
		//委托我的所有用户
		ArrayList<Delegate> DelegateList = D_Delegate.doSelectDelegate(accountId);

		for (Workflow workflow : workflows) {
			check = CheckPermission.doCheckPermisson(workflow, accountId, rbac);
			if (check) {
				int flowId = workflow.getId();
				readyFor.append(flowId + ",");
			} else if (DelegateList != null) {
				for (Delegate delegate : DelegateList) {
					check = CheckPermission.doCheckPermisson(workflow,delegate.getAccountId(), rbac);
					if (check) {
						int flowId = workflow.getId();
						readyFor.append(flowId + ",");
						break;
					}
				}
			}
		}

		String myReadyFor = null;

		if (readyFor.length() != 0) {
			myReadyFor = readyFor.toString();
			myReadyFor = myReadyFor.substring(0, readyFor.length() - 1);
		}

		// System.out.println(myReadyFor);

		if (myReadyFor != null) {
			myReadyFor = " WHERE id IN (" + myReadyFor + ")";

			int pageNumber;
			if (request.getParameter("pageNumber") == null) {
				pageNumber = 1;
			} else {
				pageNumber = Integer
						.valueOf(request.getParameter("pageNumber"));
			}

			Pagination page = new Pagination(pageNumber, 2, "workflow",
					myReadyFor);
			// System.out.println(page.getTotal());
			if (page.getTotal() != 0) {
				String[] columns = { "id", "name", "account_id", "createtime" };
				List<ArrayList<Object>> rows = page.getRows(columns);
				request.setAttribute("rows", rows);
				request.setAttribute("pageNumber", pageNumber);
				request.setAttribute("countPage", page.getCountPage());
			}
		}
		return "frontend/rworkflow";
	}
	@RequestMapping(value = "detailflow")
	public String detailflow(HttpServletRequest request,HttpServletResponse response){
		@SuppressWarnings("unchecked")
		HashMap<Integer, RbacRole> roles = (HashMap<Integer, RbacRole>)request.getServletContext().getAttribute("roles");
		@SuppressWarnings("unchecked")
		HashMap<Integer,RbacAccount> rbac=(HashMap<Integer,RbacAccount>)request.getServletContext().getAttribute("rbac");
		
		String flowid = request.getParameter("flowid");
		int accountid = (Integer) request.getSession().getAttribute("id");
		
		//委托我的所有用户
		ArrayList<Delegate> DelegateList = D_Delegate.doSelectDelegate(accountid);
		//检测是不有权限
		Workflow workflow = null;
		boolean check=false;
		
		if (flowid != null) {	
			workflow = D_Workflow.doSelectDetail(Integer.valueOf(flowid));
		}
		
		if(workflow!=null) {
			check=CheckPermission.doCheckPermisson(workflow,accountid, rbac);
			if(!check) {
				for (Delegate delegate : DelegateList) {
					check=CheckPermission.doCheckPermisson(workflow, delegate.getAccountId(), rbac);
					if(check) break;
				}
			}
		}

		ArrayList<String> finishInfo=null;
		if (check) {
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
		} else {
			try {
				response.sendRedirect("rworkflow.do");
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
		request.setAttribute("flowid", flowid);
		return "frontend/detailflow";
	}
	@RequestMapping(value = "modifyflow")
	public String modifyflow(HttpServletRequest request,HttpServletResponse response){
		@SuppressWarnings("unchecked")
		HashMap<Integer,RbacAccount> rbac=(HashMap<Integer,RbacAccount>)request.getServletContext().getAttribute("rbac");
		String flowid=request.getParameter("flowid");
		
		int accountid=(Integer)request.getSession().getAttribute("id");
		
		//委托我的所有用户
		ArrayList<Delegate> DelegateList = D_Delegate.doSelectDelegate(accountid);
		Workflow workflow=null;
		int count=0;
		
		//检测是不有权限
		boolean check=false;
		int delegateAccountId = accountid;
		
		if (flowid != null) {	
			workflow = D_Workflow.doSelectDetail(Integer.valueOf(flowid));
		}
		if(workflow!=null) {
			check=CheckPermission.doCheckPermisson(workflow,accountid, rbac);
			if(!check) {
				for (Delegate delegate : DelegateList) {
					check=CheckPermission.doCheckPermisson(workflow, delegate.getAccountId(), rbac);
					if(check) {
						delegateAccountId=delegate.getAccountId();
						break;
					}
				}
			}
		}

		String decision=request.getParameter("decision");
		String content=request.getParameter("editor1");
		
		
		if(decision!= null && content !=null && workflow != null && check) {
			if(decision.equals("agree") || decision.equals("reject")) {
								
				String accountflow;
				String roleflow;
				String roleflowArray[];
				int status=0;	//0 没变 1成功完成  2拒绝
				
				StringBuilder sb = new StringBuilder();
				
				if(workflow.getAccountflow()==null) {
					if(delegateAccountId != accountid) {
						accountflow=delegateAccountId+"-"+String.valueOf(accountid);
					}else {
						accountflow=String.valueOf(accountid);
					}
				}else{
					if(delegateAccountId != accountid) {
						accountflow=delegateAccountId+"-"+String.valueOf(accountid)+","+workflow.getAccountflow();
					}else {
						accountflow=String.valueOf(accountid)+","+workflow.getAccountflow();
					}
				}
					
				roleflowArray=workflow.getRoleflow().split(",");
				if(roleflowArray.length == 1) {
					status = 1;
					roleflow=String.valueOf(rbac.get(accountid).getDepartmentId());
					//roleflow=""; 保留最后一位角色，为单据存放部门
				} else {
					for(int i = 1; i < roleflowArray.length; i++){
						 sb.append(roleflowArray[i]+",");
					}
					roleflow=sb.toString();
					roleflow=roleflow.substring(0, roleflow.length()-1);
				}
				
				if(decision.equals("reject")) {
					status = 2;
					roleflow=String.valueOf(rbac.get(accountid).getDepartmentId());
				}
				
				count=D_Workflow.doModifyWorkflow(flowid, content, accountflow, roleflow, status);	
			}
			if(count==1) {
				try {
					response.sendRedirect("rworkflow.do?status=success");
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			return null;
		}

		try {
			response.sendRedirect("rworkflow.do?status=failure");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	@RequestMapping(value = "uworkflow")
	public String uworkflow(HttpServletRequest request,HttpServletResponse response){
		String formid = request.getParameter("formid");
		Workform workform = D_Workform.doSelect(formid);
		ArrayList<Defaultflow> workflows = D_Defaultflow.doSelectActive(formid);
		@SuppressWarnings("unchecked")
		HashMap<Integer, RbacAccount> rbac = (HashMap<Integer, RbacAccount>) request.getServletContext().getAttribute("rbac");
		//HashMap<Integer, RbacRole> roles = (HashMap<Integer, RbacRole>) request.getServletContext().getAttribute("roles");
		String workformName = request.getParameter("workformName");
		String mWorkflow = request.getParameter("mWorkflow");
		String content = request.getParameter("editor1");
		int accountid = (Integer) request.getSession().getAttribute("id");

		String checked = CheckWorkflow.doCheckNull(mWorkflow, workformName,content);

		if (checked.equals("ok")) {
			mWorkflow = mWorkflow.trim();
			workformName = workformName.trim();
			content = content.trim();

			checked = CheckWorkflow.doMatch(mWorkflow, workformName);
		}

		String roleflow;
		String custom;
		if (checked.equals("ok")) {

			String kaptchaExpected = (String) request.getSession().getAttribute(com.google.code.kaptcha.Constants.KAPTCHA_SESSION_KEY);
			String kaptchaReceived = request.getParameter("kaptcha");

			if (kaptchaReceived == null || !kaptchaReceived.equalsIgnoreCase(kaptchaExpected)) {
					checked="验证码错误";
			} else {

				if (mWorkflow.substring(0, 1).equals("0")) {
					roleflow = mWorkflow.substring(2);
					custom = "t";
				} else {
					//3，4，6，7  我有 6 只需 7 签，类推
					String workflow[] = mWorkflow.split(",");
					roleflow = workflow[workflow.length - 1];
					for (int i = workflow.length - 2; i >= 0; i--) {
						// 判断是否有此角色
						if (rbac.get(accountid).getRole().contains(Integer.valueOf( workflow[i]))) {
							break;
						}
						roleflow = workflow[i] + "," + roleflow;
					}

					custom = "f";
				}

				int count = D_Workflow.doCreate(workformName, roleflow,content, accountid, custom);
				if (count != 0) {
					try {
						response.sendRedirect("nworkflow.do?checked=success&formid="+ formid);
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					return null;
				} else {
					checked = "数据库操作失败";
				}
			}

		}
		request.setAttribute("formid", formid);
		request.setAttribute("workform", workform);
		request.setAttribute("workflows", workflows);
		request.setAttribute("checked", checked);
		return "frontend/nworkflow";
	}
	@RequestMapping(value = "rannouncement")
	public String rannouncement(HttpServletRequest request,HttpServletResponse response){
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
		return "frontend/rannouncement";
	}
	@RequestMapping(value = "nannouncement")
	public String nannouncement(HttpServletRequest request,HttpServletResponse response){
		String announcementId = request.getParameter("announcementId");
		Announcement announcement =  D_Announcement.doSelect(announcementId);
		request.setAttribute("announcement", announcement);
		return "frontend/nannouncement";
	}
	@RequestMapping(value = "rfinishedflow")
	public String rfinishedflow(HttpServletRequest request,HttpServletResponse response){
		int accountid=(Integer)request.getSession().getAttribute("id");

		int pageNumber;
		if (request.getParameter("pageNumber") == null) {
			pageNumber = 1;
		} else {
			pageNumber = Integer.valueOf(request.getParameter("pageNumber"));
		}
		
		String condition=" WHERE accountflow REGEXP '^" + accountid + "(,[[:digit:]]+)*$' AND status != 0 ORDER BY id DESC";
		Pagination page = new Pagination(pageNumber, 10, "workflow",condition);

		if (page.getTotal() != 0) {
			String[] columns = { "id", "name","account_id","createtime","status"};
			List<ArrayList<Object>> rows = page.getRows(columns);
			request.setAttribute("rows", rows);
			request.setAttribute("pageNumber", pageNumber);
			request.setAttribute("countPage", page.getCountPage());
		}
		return "frontend/rfinishedflow";
	}
	@RequestMapping(value = "detailfinishedflow")
	public String detailfinishedflow(HttpServletRequest request,HttpServletResponse response){
		String flowid=request.getParameter("flowid");
		int accountid=(Integer)request.getSession().getAttribute("id");
		@SuppressWarnings("unchecked")
		HashMap<Integer, RbacRole> roles = (HashMap<Integer, RbacRole>)request.getServletContext().getAttribute("roles");
		@SuppressWarnings("unchecked")
		HashMap<Integer,RbacAccount> rbac=(HashMap<Integer,RbacAccount>)request.getServletContext().getAttribute("rbac");
		Workflow workflow=null;
		
		if(flowid != null) {
			workflow=D_FinishedFlow.doSelectDetail(accountid, Integer.valueOf(flowid));	
		}

		ArrayList<String> finishInfo=null;
		if(workflow != null) {
			if(workflow.getAccountflow()!=null) {
				String accountFlow[]=workflow.getAccountflow().split(",");
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
				response.sendRedirect("rfinishedflow.do");
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
		 
		return "frontend/detailfinishedflow";
	}
	@RequestMapping(value = "rmyapplication")
	public String rmyapplication(HttpServletRequest request,HttpServletResponse response){
		int accountid=(Integer)request.getSession().getAttribute("id");
		int pageNumber;
		if (request.getParameter("pageNumber") == null) {
			pageNumber = 1;
		} else {
			pageNumber = Integer.valueOf(request.getParameter("pageNumber"));
		}
		
		String condition=" WHERE account_id=" + accountid+ " ORDER BY id DESC";
		Pagination page = new Pagination(pageNumber, 10, "workflow",condition);

		if (page.getTotal() != 0) {
			String[] columns = { "id", "name","account_id","createtime","status"};
			List<ArrayList<Object>> rows = page.getRows(columns);
			request.setAttribute("rows", rows);
			request.setAttribute("pageNumber", pageNumber);
			request.setAttribute("countPage", page.getCountPage());
		}
		 
		return "frontend/rmyapplication";
	}
	@RequestMapping(value = "detailmyapplication")
	public String detailmyapplication(HttpServletRequest request,HttpServletResponse response){
		String flowid=request.getParameter("flowid");
		int accountid=(Integer)request.getSession().getAttribute("id");
		@SuppressWarnings("unchecked")
		HashMap<Integer, RbacRole> roles = (HashMap<Integer, RbacRole>)request.getServletContext().getAttribute("roles");
		@SuppressWarnings("unchecked")
		HashMap<Integer,RbacAccount> rbac=(HashMap<Integer,RbacAccount>)request.getServletContext().getAttribute("rbac");
		
		Workflow workflow=null;
		
		if(flowid != null) {
			workflow=D_DetailMyApplication.doSelectDetail(accountid, Integer.valueOf(flowid));	
		}

		ArrayList<String> finishInfo=null;
		if(workflow != null) {
			if(workflow.getAccountflow()!=null) {
				String accountFlow[]=workflow.getAccountflow().split(",");
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
				response.sendRedirect("rmyapplication.do");
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
		//System.out.println(workflow.getStatus());
	 
		return "frontend/detailmyapplication";
	}
	@RequestMapping(value = "userInfo")
	public String userInfo(HttpServletRequest request,HttpServletResponse response){
		String password = request.getParameter("password");
		String email = request.getParameter("email");
		String fullname = request.getParameter("fullname");

		int accountid = (Integer) request.getSession().getAttribute("id");
		Account user = D_AccountInfo.doSelect(accountid);
		
		if (password != null) {
			if (password.trim().equals("")) {
				password = user.getPassword();
			}
		}

		String checked = CheckAccountInfo
				.doCheckNull(password, fullname, email);
		
		if (checked.equals("ok")) {
			password = password.trim();
			email = email.trim();
			fullname = fullname.trim();
			checked = CheckAccountInfo.doMatch(email, fullname);
		}

		if (checked.equals("ok")) {
			String hashed;

			if (!password.equals(user.getPassword())) {
				hashed = BCrypt.hashpw(password, BCrypt.gensalt());
			} else {
				hashed = user.getPassword();
			}
			int count = D_AccountInfo.doUpdate(hashed, email, fullname, accountid);
			if (count == 0) {
				checked = "数据库操作失败";
			} else {
				synchronized (request.getServletContext().getAttribute("rbac")) {
					HashMap<Integer, RbacAccount> rbac = RbacInitialize
							.doRbacUserInit();
					HashMap<Integer, RbacRole> roles = RbacInitialize
							.doRbacRoleInit();

					request.getServletContext().setAttribute("rbac", rbac);
					request.getServletContext().setAttribute("roles", roles);
				}
				try {
					response.sendRedirect("userInfo.do?checked=success");
				} catch (IOException e) {
					e.printStackTrace();
				}
				return null;
			}
		}

		request.setAttribute("checked", checked);
		request.setAttribute("userinfo", user);
		return "frontend/userinfo";
	}
	@RequestMapping(value = "fquery")
	public String fquery(HttpServletRequest request,HttpServletResponse response){
		String myMonth = request.getParameter("month");
		String myYear = request.getParameter("year");
		String myType = request.getParameter("mytype");

		int accountid = (Integer) request.getSession().getAttribute("id");

		String checked = CheckQuery.doCheckNull(myYear, myMonth);

		if (checked.equals("ok")) {
			myYear = myYear.trim();
			myMonth = myMonth.trim();
			checked = CheckQuery.doMatch(myYear, myMonth);
		}

		if (checked.equals("ok")) {

			int pageNumber;
			if (request.getParameter("pageNumber") == null) {
				pageNumber = 1;
			} else {
				pageNumber = Integer.valueOf(request.getParameter("pageNumber"));
			}

			String condition;

			if (myType.equals("myapplication")) {
				condition = " WHERE account_id=" + accountid
						+ " and YEAR(createtime)=" + myYear
						+ " and MONTH(createtime)=" + myMonth
						+ " ORDER BY id DESC";
				request.setAttribute("mytype", "detailmyapplication");
			} else {
				condition = " WHERE accountflow REGEXP '^" + accountid
						+ "(,[[:digit:]]+)*$' AND status != 0"
						+ " and YEAR(createtime)=" + myYear
						+ " and MONTH(createtime)=" + myMonth
						+ " ORDER BY id DESC";
				request.setAttribute("mytype", "detailfinishedflow");
			}

			Pagination page = new Pagination(pageNumber, 1, "workflow",condition);

			if (page.getTotal() != 0) {
				String[] columns = { "id", "name", "account_id", "createtime",
						"status" };
				List<ArrayList<Object>> rows = page.getRows(columns);
				request.setAttribute("rows", rows);
				request.setAttribute("pageNumber", pageNumber);
				request.setAttribute("countPage", page.getCountPage());
				request.setAttribute("myYear", myYear);
				request.setAttribute("myMonth", myMonth);
				request.setAttribute("pType", myType);
			}
		}

		request.setAttribute("checked",checked);
		return "frontend/fquery";
	}
	@RequestMapping(value = "rdepartmentflow")
	public String rdepartmentflow(HttpServletRequest request,HttpServletResponse response){
		int accountid = (Integer) request.getSession().getAttribute("id");
		@SuppressWarnings("unchecked")
		HashMap<Integer, RbacAccount> rbac = (HashMap<Integer, RbacAccount>) request.getServletContext().getAttribute("rbac");
		int depId=rbac.get(accountid).getDepartmentId();
		// 可审批用户都可查询本部已审批单据

		int pageNumber;
		if (request.getParameter("pageNumber") == null) {
			pageNumber = 1;
		} else {
			pageNumber = Integer.valueOf(request.getParameter("pageNumber"));
		}
 
		String condition = " WHERE roleflow REGEXP '^"+ depId + "(,[[:digit:]]+)*$' AND status !=0 AND custom = 'f' ORDER BY id DESC";
		Pagination page = new Pagination(pageNumber, 10, "workflow", condition);

		if (page.getTotal() != 0) {
			String[] columns = { "id", "name", "account_id", "createtime","status" };
			List<ArrayList<Object>> rows = page.getRows(columns);
			request.setAttribute("rows", rows);
			request.setAttribute("pageNumber", pageNumber);
			request.setAttribute("countPage", page.getCountPage());
		}
		return "frontend/rdepartmentflow";
	}
	@RequestMapping(value = "detaildepartmentflow")
	public String detaildepartmentflow(HttpServletRequest request,HttpServletResponse response){
		@SuppressWarnings("unchecked")
		HashMap<Integer, RbacRole> roles = (HashMap<Integer, RbacRole>)request.getServletContext().getAttribute("roles");
		@SuppressWarnings("unchecked")
		HashMap<Integer,RbacAccount> rbac=(HashMap<Integer,RbacAccount>)request.getServletContext().getAttribute("rbac");
		
		String flowid = request.getParameter("flowid");
		int accountid = (Integer) request.getSession().getAttribute("id");

		int depId=rbac.get(accountid).getDepartmentId();

		Workflow workflow = null;

		if (flowid != null) {
			workflow = D_FinishedFlow.doSelectDepartmentDetail(depId,
					Integer.valueOf(flowid));
		}
		
		ArrayList<String> finishInfo = null;
		if (workflow != null) {
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
		} else {
			try {
				response.sendRedirect("rdepartmentflow.do");
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

		return "frontend/detailfinishedflow";
	}
	@RequestMapping(value = "modifydelegate")
	public String modifydelegate(HttpServletRequest request,HttpServletResponse response){
		int accountid = (Integer) request.getSession().getAttribute("id");
		String delegateId=request.getParameter("userid");
		String status=request.getParameter("status");
		int count=0;
		
		if(status != null) {
			if(delegateId!=null) {
				if(D_Delegate.doSelect(accountid) != null ) {
					D_Delegate.doDelete(accountid);
				}
				count=D_Delegate.doCreate(accountid, Integer.valueOf(delegateId));
				if(count != 0) {
					Ht.p(response,"ok");
				}else {
					Ht.p(response,"error");
				}
			}else {
				count=D_Delegate.doUpdate(Integer.valueOf(status),accountid);
				if(count != 0) {
					Ht.p(response,"ok");
				}else {
					Ht.p(response,"error");
				}
			}
			return null;
		}
		
		Delegate delegate=D_Delegate.doSelect(accountid);
		if(delegate!=null) {
			request.setAttribute("delegate", delegate);
		}
		return "frontend/modifydelegate";
	}
}
