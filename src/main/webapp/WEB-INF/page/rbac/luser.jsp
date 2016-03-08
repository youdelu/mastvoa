<%@ include file="../jspf/backend/head.jsp"%>
<%@page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.ArrayList,java.util.List,java.util.HashMap,rbac.javabean.RbacRole"%>
<%
HashMap<Integer, RbacRole> roles = (HashMap<Integer, RbacRole>)getServletContext().getAttribute("roles");
%>

<div class="container">
	<!-- Example row of columns -->
	<div class="row">

		<div class="col-md-12">

			<h2 class="sub-header">用户列表</h2>
			<div class="table-responsive">
				<table class="table table-striped">
					<thead>
						<tr>
							<th>id</th>
							<th>用户</th>
							<th>全名</th>
							<th>邮箱</th>
							<th>角色</th>
							<th>部门</th>
						</tr>
					</thead>
					<tbody>
						<%
							List<ArrayList<Object>> rows;
											rows = (List<ArrayList<Object>>) request.getAttribute("rows");
											if (rows == null) {
						%>
						<tr>
							<td class="text-center"  colspan="6">没有相关记录</td>
						</tr>
						<%
							} else {

							for (List<Object> row : rows) {
						%>
						<tr<%=(row.get(4).toString().equals("false"))?" class=\"text-danger\"":"" %>>
							<%
								for (int i=0;i<row.size()-3;i++) {
							%>

							<td><%=row.get(i).toString()%></td>
							<%
								}
							%>
							<%
							int roleid=Integer.valueOf(row.get(row.size()-2).toString());
							%>
							<td><%=roles.get(roleid).getAlias() %></td>
							<td><%=row.get(row.size()-1) %></td>
							<td><a href="uuser?username=<%=row.get(1)%>"><span
									class="glyphicon glyphicon-pencil"></span></a> &nbsp; 
									
									<% 
									if(row.get(row.size()-3).toString().equals("true")) {								
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
					<li><a href="luser?pageNumber=<%=pageNumber - 1%>">&laquo;</a></li>
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
					<li <%=(i == pageNumber) ? " class=\"active\"" : ""%>><a
						href="luser?pageNumber=<%=i%>"><%=i%></a></li>
					<%
						}
										} else if (pageNumber + 4 >= countPage) {
											for (int i = countPage - 4; i <= countPage; i++) {
					%>
					<li <%=(i == pageNumber) ? " class=\"active\"" : ""%>><a
						href="luser?pageNumber=<%=i%>"><%=i%></a></li>
					<%
						}
										} else {
											for (int i = pageNumber; i <= pageNumber + 4; i++) {
					%>
					<li <%=(i == pageNumber) ? " class=\"active\"" : ""%>><a
						href="luser?pageNumber=<%=i%>"><%=i%></a></li>
					<%
						}
										}
					%>


					<%
						if (pageNumber < countPage) {
					%>
					<li><a href="luser?pageNumber=<%=pageNumber + 1%>">&raquo;</a></li>
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
 
</div>
<!-- /container -->

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->

<script src="../bootstrap/js/jquery-1.11.1.js"></script>

<script>
$(".glyphicon-remove").parent().on("click", function() {
	var confirm_ = confirm("您确认要删除?");
	if (confirm_) {
		var username=$(this).data("username");
		var user=$(this).parent().parent();
		var del=$(this);
		$.post( "duser.do", { uname: username}, function( data ) {
        	 if(data=="ok") {
        		user.addClass("text-danger");
        		del.remove();
         	}else {
        		 alert("修改失败，请联系管理员");
         	}
     	});
	}
});
	
	
	
</script>


<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="../bootstrap/js/bootstrap.min.js"></script>

</body>
</html>