<%@ include file="../jspf/backend/head.jsp"%>
<%@page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.ArrayList,java.util.List,java.util.HashMap,rbac.javabean.RbacRole"%>

<div class="container">
	<!-- Example row of columns -->

	<h2 class="sub-header">用户查询</h2>

	<form action="queryuser.do" method="post" class="form-horizontal" role="form">
		<div class="form-group">
			<label for="mquerytype" class="col-md-2 control-label">类型</label>
			<div class="col-md-4" id="mquerytype">
				<select name="querytype" class="form-control">
					<option value="username">账号</option>
					<option value="fullname">全名</option>
					<option value="userid">ID号</option>
				</select>
			</div>
			<div class="col-md-6">
				<button type="submit" class="btn btn-warning">提交</button>
			</div>
		</div>

		<div class="form-group">
			<label for="mqueryname" class="col-md-2 control-label">内容</label>
			<div class="col-md-4">
				<input name="queryname" type="text" class="form-control" id="mqueryname"
					placeholder="内容">
			</div>
			<div class="col-md-6"></div>
		</div>

	</form>

<%if(!request.getAttribute("checked").equals("")) {%>
	<hr>
	<div class="row">
		<div class="col-md-12">
			<h2 class="sub-header">查询结果</h2>
			  <div class="table-responsive">
				<table class="table table-striped">
					<thead>
						<tr>
							<th>id</th>
							<th>用户</th>
							<th>全名</th>
							<th>邮箱</th>
							<th>角色</th>
						</tr>
					</thead>
					<tbody>
						<%
							HashMap<Integer, RbacRole> roles = (HashMap<Integer, RbacRole>)getServletContext().getAttribute("roles");
							List<ArrayList<Object>> rows;
							rows = (List<ArrayList<Object>>) request.getAttribute("rows");
							if (rows == null) {
						%>
						<tr>
							<td class="text-center"  colspan="5">没有相关记录</td>
						</tr>
						<%
							} else {

							for (List<Object> row : rows) {
						%>
						<tr<%=(row.get(4).toString().equals("false"))?" class=\"text-danger\"":"" %>>
							<%
								for (int i=0;i<row.size()-2;i++) {
							%>

							<td><%=row.get(i).toString()%></td>
							<%
								}
							%>
							<%
							int roleid=Integer.valueOf(row.get(row.size()-1).toString());
							%>
							<td><%=roles.get(roleid).getAlias() %></td>
							<td><a href="<%=basePath+"rbac/uuser.do" %>?username=<%=row.get(1)%>"><span
									class="glyphicon glyphicon-pencil"></span></a> &nbsp; 
									
									<% 
									if(row.get(row.size()-2).toString().equals("true")) {								
									%>
									<a data-username="<%=row.get(1)%>" href="#">
										<span class="glyphicon glyphicon-remove"></span>
									</a>
									<%} %>
									
									</td>
						</tr>

						<%
							}
											}
						%>

					</tbody>
				</table>
			</div>
			<%
				if (rows != null) {
						int pageNumber = (Integer) request.getAttribute("pageNumber");
						int countPage = (Integer) request.getAttribute("countPage");
			%>
			<div class="text-center">
				<ul class="pagination">

					<%
						if (pageNumber > 1) {
					%>
					<li><a href="queryuser.do?querytype=<%=request.getAttribute("querytype") %>&queryname=<%=request.getAttribute("queryname") %>&pageNumber=<%=pageNumber - 1%>">&laquo;</a></li>
					<%
						} else {
					%>
					<li class="disabled"><a href="#">&laquo;</a></li>
					<%
						}
					%>

					<%
						if (countPage <= 5) {
									for (int i = 1; i <= countPage; i++) {
					%>
					<li <%=(i == pageNumber) ? " class=\"active\"" : ""%>>
					<a href="queryuser.do?querytype=<%=request.getAttribute("querytype") %>&queryname=<%=request.getAttribute("queryname") %>&pageNumber=<%=i%>"><%=i%></a></li>
					<%
						}
										} else if (pageNumber + 4 >= countPage) {
											for (int i = countPage - 4; i <= countPage; i++) {
					%>
					<li <%=(i == pageNumber) ? " class=\"active\"" : ""%>>
					<a href="queryuser.do?querytype=<%=request.getAttribute("querytype") %>&queryname=<%=request.getAttribute("queryname") %>&pageNumber=<%=i%>"><%=i%></a></li>
					<%
						}
										} else {
											for (int i = pageNumber; i <= pageNumber + 4; i++) {
					%>
					<li <%=(i == pageNumber) ? " class=\"active\"" : ""%>>
					<a href="queryuser.do?querytype=<%=request.getAttribute("querytype") %>&queryname=<%=request.getAttribute("queryname") %>&pageNumber=<%=i%>"><%=i%></a></li>
					<%
						}
										}
					%>

					<%
						if (pageNumber < countPage) {
					%>
					<li><a href="queryuser.do?querytype=<%=request.getAttribute("querytype") %>&queryname=<%=request.getAttribute("queryname") %>&pageNumber=<%=pageNumber + 1%>">&raquo;</a></li>
					<%
						} else {
					%>
					<li class="disabled"><a href="#">&raquo;</a></li>
					<%
						}
					%>


				</ul>
			</div>
			<%
				}
			%>

		</div>
	</div>
<%} %>
 
</div>
<!-- /container -->

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->

<script src="../bootstrap/js/jquery-1.11.1.js"></script>

<script>
$(".glyphicon-remove").parent().on("click", function() {
	var username=$(this).data("username");
	var user=$(this).parent().parent();
	var del=$(this);
	$.post( "<%=basePath+"rbac/duser.do" %>", { uname: username}, function( data ) {
         if(data=="ok") {
        	user.addClass("text-danger");
        	del.remove();
         }else {
        	 alert("数据库操作失败");
         }
     });

});
	
	
</script>


<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="../bootstrap/js/bootstrap.min.js"></script>

</body>
</html>