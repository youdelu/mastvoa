<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link href="${pageContext.request.contextPath}/Css/bootstrap.min.css " rel="stylesheet">
<link href="${pageContext.request.contextPath}/Css/font-awesome.min.css " rel="stylesheet">
<link href="${pageContext.request.contextPath}/Css/animate.min.css" rel="stylesheet">
<link href="${pageContext.request.contextPath}/Css/style.min.css" rel="stylesheet">
<!-- Data Tables -->
<link href="${pageContext.request.contextPath}/Css/plugins/dataTables/dataTables.bootstrap.css"
	rel="stylesheet">
<link href="${pageContext.request.contextPath}/Css/plugins/jsTree/style.min.css" rel="stylesheet">
<link href="${pageContext.request.contextPath}/Css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
</head>
<style>
#jstree {
	float: left
}

#panel ,.select-page,.select-url{
	width: 600px;
	height: auto;
	position:fixed;
	left:30%;
	top:-100%;
	padding:30px;
	border-radius:10px;
	background:#fff;
	z-index:999;
	border:1px solid #e5e6e7; 
}
.add {
	color: #1ab394
}
.deleted {
	color: #ed5565;
}
.hide_all{
	color:#999;
}
.hide_m{
	color:#FBA80E;
}


.bottom-button {
	float: right;
	margin: 20px
}

.dataTables tbody tr:hover {
	background-color: #1ab394;
	color: #fff
}

.tbchecked {
	background-color: #1ab394;
	color: #fff
}
._tools{
	margin-top: 30px
}
.red{
	color:red;
	margin-right: 20px;
}

#tree-icons img{
	padding:5px;
	margin:15px;
	cursor:pointer;
}
#tree-url {
	height:200px;
	overflow: auto;
}
#tree-url::-webkit-scrollbar {
    width: 5px;
}
#tree-url ol li{
	padding:5px;
	cursor:pointer;
}
#tree-url ol li:hover{
	background: #1ab394;
	color:#fff;
}
.icon_checked,#tree-icons img:hover{
	padding:4px;
	border:1px solid #1ab394;
}
#clean-icon{
	display:none;
	float:right;
	margin-right:10px;
	cursor: pointer;
}
.icon img{
	display:none;
}
#hasDelete{
	display: inline;
	cursor: pointer;
	position:relative;
	font-size: 10px;
}
#hasDelete input{
	position: absolute;
}
#hasDelete span{
	position: absolute;
	width:100px;
	top:2px;
	left:18px;
}
</style>
<body>
	<div id="jstree"> </div>
	<div id="hasDelete"><input type="checkbox" /><span>显示已删除</span></div>
	<div id="panel">
		<form  class="form-horizontal">
			<center>
				<h3 id="form_title">添加菜单</h3>
			</center>
			<div class="hr-line-dashed"></div>
			<div class="form-group">
				<label class="col-sm-2 control-label"><span class="red">*</span>名称</label>
				<div class="col-sm-10">
						<input type="text" class="form-control name">
						<div class="has-del-tip deleted">该菜单已删除，恢复后才能修改</div>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 control-label">图标</label>
				<div class="col-sm-10">
					<div class="input-group">
						<div class="form-control icon"><img src=""/><span id="clean-icon">清除</span></div>
						<div class="input-group-btn">
							<button data-toggle="dropdown"
								class="btn btn-primary dropdown-toggle icon-select" type="button">
								选择 
							</button>
						</div>
					</div>
				</div>
			</div>
				<div class="form-group">
				<label class="col-sm-2 control-label"><span class="red">*</span>类型</label>
				<div class="col-sm-10">
					<select class="form-control m-b type" name="account">
						  <option value="0">链接菜单</option>
						  <option value="1">目录菜单</option> 
					</select>
				</div>
			</div>
				<div class="form-group link-box">
				<label class="col-sm-2 control-label"><span class="red">*</span>链接</label>
				<div class="col-sm-10">
					<div class="input-group">
						<input type="text" class="form-control url">
						<div class="input-group-btn">
							<a data-toggle="modal" class="btn btn-primary  choose-link" href="#modal-form">选择</a>
						</div>
					</div>
					<div class="hide_all">* 如果要引用其他站点需加上http头</div>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 control-label">优先级</label>
				<div class="col-sm-10">
					<select class="form-control m-b order" name="account">
						<% 
						for(int i = -50 ; i < 50 ;i++){
							out.print("<option>"+i+"</option>");
						}
						%>
					</select>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 control-label">可见范围</label>
				<div class="col-sm-10">
					<select class="form-control m-b show" name="account">
						  <option value="0">对所有人可见</option> 
						  <option value="1">对所有人隐藏</option> 
						  <option value="2">对部分人可见</option> 
					</select>
				</div>
			</div>
			<div class="form-group view-box">
				<label class="col-sm-2 control-label">可见的人</label>
				<div class="col-sm-10">
					<div class="input-group">
						<input type="text" class="form-control people">
						<div class="input-group-btn">
							<a data-toggle="modal" class="btn btn-primary  choose-dd" href="#modal-form">选择</a>
						</div>
					</div>
					<div class="hide_all">* 可见性只对其本身或子类影响，父类的可见性属性优先考虑</div>
				</div>
			</div>
			<div class="form-group">
				<div class="col-sm-8 col-sm-offset-2">
					<button class="btn btn-primary  _add" type="button">确认添加</button>
					<button class="btn btn-danger del" type="button">删除</button>
					<button class="btn btn-white addchild" onClick="addChild()" type="button">添加子节点</button>
					<button class="btn btn-white cancel" type="button">取消</button>
				</div>
			</div>
			</form>
	</div>
	<div class="select-page">
			<center>
				<h3>请选择图标</h3>
			</center>
		<div class="hr-line-dashed"></div>
		<div class="select-body">
			<div id="tree-icons">
				<img src="${pageContext.request.contextPath}/Skins/Common/Icon/changyong.png"  alt="changyong"/>
				<img src="${pageContext.request.contextPath}/Skins/Common/Icon/client-active.png" alt="client-active"/>
				<img src="${pageContext.request.contextPath}/Skins/Common/Icon/dispatch-active.png" alt="dispatch-active"/>
				<img src="${pageContext.request.contextPath}/Skins/Common/Icon/file-active.png" alt="file-active"/>
				<img src="${pageContext.request.contextPath}/Skins/Common/Icon/finance-active.png" alt="finance-active"/>
				<img src="${pageContext.request.contextPath}/Skins/Common/Icon/flownew-active.png" alt="flownew-active"/>
				<img src="${pageContext.request.contextPath}/Skins/Common/Icon/gateway-active.png" alt="gateway-active"/>
				<img src="${pageContext.request.contextPath}/Skins/Common/Icon/hr-active.png" alt="hr-active"/>
				<img src="${pageContext.request.contextPath}/Skins/Common/Icon/information-active.png" alt="information-active"/>
				<img src="${pageContext.request.contextPath}/Skins/Common/Icon/knowledge-active.png" alt="knowledge-active"/>
				<img src="${pageContext.request.contextPath}/Skins/Common/Icon/powerset-active.png" alt="powerset-active"/>
				<img src="${pageContext.request.contextPath}/Skins/Common/Icon/resources-active.png" alt="resources-active"/>
				<img src="${pageContext.request.contextPath}/Skins/Common/Icon/setting-active.png" alt="setting-active"/>
				<img src="${pageContext.request.contextPath}/Skins/Common/Icon/work-active.png" alt="work-active"/>
			</div>
		</div>
		<div class=" bottom-button">
				<button class="btn  icon-qd" type="button">确定</button>
				<button class="btn btn-white icon-qx"  type="button">取消</button>
		</div>
	</div>
	 <div class="select-url">
			<center>
				<h3>请选择系统内部链接</h3>
			</center>
		<div class="hr-line-dashed"></div>
		<div class="select-body">
			<div id="tree-url">
				 <ol>
				 		<li>backend/lsysteminfo.do----系统信息 </li>
				 		<li> backend/lloginlimit.do----锁定管理 </li>
				 		<li>backend/queryuser.do----用户查询</li>
				 		<li>backend/queryworkflow.do----工作流查询</li>
				 		<li>backend/cannouncement.do----添加公告</li>
				 		<li>backend/lannouncement.do----列出公告</li>
				 		<li>backend/cworkflow.do----添加流程</li>
				 		<li>backend/lworkflow.do----列出流程</li>
				 		<li>backend/cformtype.do----添加类型</li>
				 		<li>backend/lformtype.do----列出类型</li>
				 		<li>backend/cworkform.do----添加表单</li>
				 		<li>backend/lworkform.do----列出表单</li>
				 		<li>backend/cdepartment.do----添加部门</li>
				 		<li>backend/ldepartment.do----列出部门</li>
				 		<li>backend/pdephierarchy.do----部门层次</li>
				 		<li>rbac/cuser.do----添加用户</li>
				 		<li>rbac/luser.do----列出用户</li>
				 		<li>rbac/crole.do----添加角色</li>
				 		<li>rbac/lrole.do----列出角色</li>
				 		<li>rbac/prolehierarchytree.do----列出层次</li>
				 		<li>rbac/cpermission.do----添加权限</li>
				 		<li>rbac/lpermission.do----列出权限</li>
				 		<li>rbac/crelationship.do----添加关系</li>
				 		<li>rbac/drelationship.do----删除关系</li>
				 		<li>frontend/rworkflow.do----审批</li>
				 		<li>frontend/nworkform.do----申请</li>
				 		<li>frontend/fquery.do----内容查询</li>
				 		<li>frontend/rdepartmentflow.do----本部门</li>
				 		<li>frontend/rfinishedflow.do----已审批</li>
				 		<li>frontend/rannouncement.do----公告</li>
				 		<li>frontend/modifydelegate.do----委托</li>
				 		<li>backend/lsysteminfo.do----系统信息</li>
				 		<li>frontend/nworkform.do----消息</li>
				 </ol>
			</div>
		</div>
		<div class=" bottom-button">
				<button class="btn  choose-page" type="button">确定</button>
				<button class="btn btn-white choose-page-qx"  type="button">取消</button>
		</div>
	</div>
	<!-- 全局js -->
	<script src="${pageContext.request.contextPath}/js/jquery-2.1.1.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jsTree/jstree.min.js"></script>
	<script  type="text/javascript" src="${pageContext.request.contextPath}/js/plugins/sweetalert/sweetalert.min.js"></script>
	<script>
	var uid = 0 ,pid = 0;
	var hasDel = false ;
	var pageid ;
	var add = true ,iadd = false,hasDelete = false;
	var mylink ;
	var link;
	var icon_src = "",sys_link="";
		$(document).ready(
				function() {
					var pHeight  = $("#panel").height()+70;
					$("#panel").css({"top":"-"+pHeight+"px"});
					var sHeight  = $(".select-page").height()+100;
					$(".select-page").css({"top":"-"+sHeight+"px"});
					var uHeight  = $(".select-url").height()+100;
					$(".select-url").css({"top":"-"+uHeight+"px"});
					$("#tree-icons img").click(function(){
						$(".icon_checked").removeClass("icon_checked");
						$(this).addClass("icon_checked");
						icon_src = $(this).attr("alt");
					});
					$("#tree-url ol li").click(function(){
						$(".icon_checked").removeClass("icon_checked");
						$(this).addClass("icon_checked");
						var arr = new Array();
						arr = $(this).text().split("----");
						sys_link = arr[0];
					});
					$(".icon-qd").click(function(){
						 $(".icon img").attr("src","${pageContext.request.contextPath}/Skins/Common/Icon/"+icon_src+".png");
						 $(".icon img").show(300);
						$(".select-page").animate({top:'-'+sHeight+'px'});
					});
					$(".icon-qx").click(function(){
						$(".select-page").animate({top:'-'+sHeight+'px'});
					});
				 	$(".icon-select").click(function(){
							$(".select-page").animate({top:'0px'});
				 	});
				 	$(".icon").mouseover(function(){
				 		if($(".icon img").is(":visible")){
							$("#clean-icon").show();		 			
				 		} 
				 	});
				 	$(".icon").mouseleave(function(){
				 		$("#clean-icon").hide();	
				 	});
				 	$("#clean-icon").click(function(){
				 		icon_src = "";
				 		$(".icon img").hide(300);
				 	});
				 	$(".type").change(function(){
				 		if($(this).val()==0){
				 			$(".link-box").show(300);
				 		}else{
				 			$(".link-box").hide(300);
				 		}
				 	});
				 	$(".show").change(function(){
				 		if($(this).val()==2){
				 			$(".view-box").show(300);
				 		}else{
				 			$(".view-box").hide(300);
				 		}
				 	});
				 	$("#hasDelete").click(function(){
				 		if(hasDelete){
				 			hasDelete = false ;
				 		}else{
				 			hasDelete = true ;
				 		}
				 		$("#hasDelete input").prop("checked",hasDelete);
				 		getMenu();
				 	});
					$(".cancel").click(function(){
						if(add&&iadd){
							$(".addchild").show();
							edit(uid);
						}else{
							$("#panel").animate({top:'-'+pHeight+'px'});
						}
					});
					$(".del").click(function(){
						del(uid);
					});
					$("._add").click(function(){
						saveOrUpdate(uid,pid);
					});
					$(".choose-page").click(function(){
						$(".select-url").animate({top:'-'+uHeight+'px'});
						$(".url").val(sys_link);
					});
					$(".choose-page-qx").click(function(){
						$(".select-url").animate({top:'-'+uHeight+'px'});
					});
					$(".choose-link").click(function(){
						$(".select-url").animate({top:'0px'});
					});
					getMenu();
				});
		function getMenu(){
		 	$.ajax({
	    		type: "POST",
	    		url: "getMenu.do",
	    		data: {"hasDelete":hasDelete},
	    		dataType:"text", 
	    		success: function(res){  
	    			$("#jstree").html("<div id='jstreee'>"+res+"</div>");
	    			$("#jstreee").jstree({
	    				"core" : {
	    					"check_callback" : true
	    				},
	    				"plugins" : [ "types", "dnd" ],
	    				"types" : {
	    					"default" : {
	    						"icon" : "fa fa-folder"
	    					},
	    					"add" : {
	    						"icon" : "fa fa-file-text-o"
	    					}
	    				}
	    			}) 
	    			.bind(
	    					'click.jstree',
	    					function(event) {
	    						var eventNodeName = event.target.nodeName;
	    						if (eventNodeName == 'INS') {
	    							return;
	    						} else if (eventNodeName == 'A') {
	    							var $subject = $(event.target).parent();
	    							uid = $(event.target).parents('li')
	    							.attr('uid');
	    							pid = $(event.target).parents('li')
	    							.attr('pid');
	    							$("#panel").animate({top:'0px'});
	    							if ($subject.find('ul').length > 0 || uid!=undefined) {
	    								$(".addchild").show();
	    								edit(uid);
	    							} else {
	    								add = true ;
	    								iadd = false ;
	    								$(".del").hide();
	    								$("._tools").hide();
	    								$("._add").html("确认添加");
	    								$("#form_title").html("添加菜单");
	    								 $(".form-group input,.form-group select,.icon").attr("readonly",false);
	    			            		 $(".has-del-tip").hide(300);
	    								$(".addchild").hide();
	    								$(".link-box").show(300);
	    								clear();
	    							}
	    						} 
	    					  });
	    			}
	    		});
		}
		function addChild(){
			add = true ;
			iadd = true ;
			$(".del").hide();
			$(".addchild").hide();
			$("._add").html("确认添加");
			$("._tools").hide();
			$("#form_title").html("在节点[ ../"+ $(".name").val()+" ] 中添加子菜单");
			clear();
			pid = uid ;
		}
		function edit(id){
			add = false ;
			$(".del").show();
			$("._tools").show();
			$("#form_title").html("修改菜单");
			$("._add").html("确认修改");
			  $.ajax({
		             url: "oneMenu.do",
		             data: {
		                 "id": id
		             }, success: function (data) {
		            	 var menu = $.parseJSON(data);
		            	 
		            	 if(menu.del==1){
		            		 hasDel = true ;
		            		 $(".form-group input,.form-group select,.icon").attr("readonly","readonly");
		            		 $(".has-del-tip").show(300);
		            		 $("._add").html("恢复");
		            		 $(".del").html("彻底删除");
		            		 $(".addchild").hide(300);
		            	 }else{
		            		 hasDel = false ;
		            		 $(".form-group input,.form-group select,.icon").attr("readonly",false);
		            		 $("._add").html("确认修改");
		            		 $(".del").html("删除");
		            		 $(".addchild").show(300);
		            		 $(".has-del-tip").hide(300);
		            	 }
		            	 $(".name").val(menu._name);
		            	 if(menu.icon!=""){
		            		 icon_src = menu.icon ;
		            		 $(".icon img").show(300);
		            		 $(".icon img").attr("src","${pageContext.request.contextPath}/Skins/Common/Icon/"+icon_src+".png");
		            	 }else{
		            		 icon_src="";
		            		 $(".icon img").hide();
		            	 }
		            	 $(".type").val(menu._type);
		            	 if(menu._type==0){
		            		 $(".link-box").show(300);
		            	 }else{
		            		 $(".link-box").hide(300);
		            	 }
		            	 $(".url").val(menu.link);
		            	 $(".order").val(menu._order);
		            	 $(".show").val(menu._show);
		            	 if(menu._show==2){
		            		 	$(".view-box").show(300);
		            	 }else{
		            			$(".view-box").hide(300);
		            	 }
		            	 mylink = menu.link ;
		             }
		         });
		}
		function clear(){
			 $(".name").val("");
			 icon_src="";
    		 $(".icon img").hide();
        	 $(".type").val(0);
        	 $(".url").val("");
        	 $(".order").val(0);
        	 $(".show").val(0);
        	 $(".view-box").hide();
		}
		function saveOrUpdate(uid,pid){
			 var name = $(".name").val();
			 if(!hasDel){
				 if(name==""){
					 swal("拒绝操作", "名称不能为空", "warning");
					 return;
				 }
	        	 var type = $(".type").val();
	        	 if(type==""){
					 swal("拒绝操作", "请选择类型", "warning");
					 return;
				 }
	        	 var url = $(".url").val();
	        	 if(type==0 && url==""){
					 swal("拒绝操作", "请输入链接", "warning");
					 return;
				 }
			 }
        	 var order = $(".order").val();
        	 var show = $(".show").val();
			$.ajax({
	             url: "addMenu.do",
	             data: {
	            	 "hasDel":hasDel,
	            	 "add":add,
	                 "mid": uid,
	                 "parent_id":pid,
	                 "_name":name,
	                 "icon":icon_src,
	                 "_type":type,
	                 "link":url,
	                 "_order":order,
	                 "_show":show
	             }, success: function (data) {
	             if(data==5){
            		 swal("拒绝访问", "您无权限执行该操作", "warning");
            	 }else if(data==1){
	         			swal({
            	   	        title: "已成功"+(hasDel?"恢复":add?"添加":"修改")+"！",
            	   	        type: "success",
            	   	        confirmButtonText: "确定",
            	   	        closeOnConfirm: true
            	   	    }, function () {
            	   	    	getMenu();
            	   	    });
	            	 }else if(!data){
	            		 swal((add?"添加":"修改")+"失敗！",  "服務器內部錯誤或參數不正確，如果經常出現此類錯誤請聯繫系統管理員。", "error");
	            	 }else{
	            		 swal("會話已過期！", "服務器已重啟或您長時間未操作，為確保安全請您先退出后重新登錄", "error");
	            	 }
	             }
	         });
		}
		function del(id){
			swal({
	   	        title: "您确定要"+(hasDel?"彻底":"")+"删除菜单节点吗？",
	   	        text: "该操作删除后!"+(hasDel?"将无法恢复，请谨慎操作":"还可以恢复，请放心操作"),
	   	        type: "warning",
	   	        cancelButtonText:"取消",
	   	        showCancelButton: true,
	   	        confirmButtonColor: "#DD6B55",
	   	        confirmButtonText: "刪除",
	   	        closeOnConfirm: false
	   	    }, function () {
	   	     $.ajax({
	             url: "delMenu.do",
	             data: {
	            	 "hasDel":hasDel,
	                 "id": id
	             }, success: function (data) {
	            	 if(data){
	            			swal({
	            	   	        title: "已成功刪除！",
	            	   	        type: "success",
	            	   	        confirmButtonText: "確定",
	            	   	        closeOnConfirm: false
	            	   	    }, function () {
	            	   	    	location.reload();
	            	   	    });
	            	 }else if(!data){
	            		 swal("删除失败！", (data==5?"您暂无权限执行该操作":"服务器内容错误或参数不正确，如经常出现这种情况，请联系系统管理员。"), "error");
	            	 }else{
	            		 swal("会话过期！", "服务器已重启或您长时间未操作，请重新登录", "error");
	            	 }
	             }
	         });
	   	    });
		}
	</script>
</body>
</html>
