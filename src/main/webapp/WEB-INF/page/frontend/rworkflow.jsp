<%@ include file="../jspf/backend/head.jsp"%>
<%@page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.ArrayList,java.util.List,java.util.HashMap,rbac.javabean.RbacAccount"%>

<div class="container">
	<!-- Example row of columns -->
	<div class="row">

		<div class="col-md-12">

			<h2 class="sub-header">待审列表</h2>
			<div class="table-responsive">
				<table class="table table-striped">
					<thead>
						<tr>
							<th>id</th>
							<th>名称</th>
							<th>申请人</th>
							<th>时间</th>
							<th>
							<%
								String status=request.getParameter("status");
								if(status != null) {
									if(status.equals("success")) {
							%>
										<span class="bg-info">审批成功</span>
							<%
									}else {
							%>
										<span class="bg-info">审批失败</span>
							<%			
									}
								}else {
									out.print("#");
								}
							%></th>
						</tr>
					</thead>
					<tbody>
						<% 
						HashMap<Integer,RbacAccount> rbac=(HashMap<Integer,RbacAccount>)getServletContext().getAttribute("rbac");
						List<ArrayList<Object>> rows = (List<ArrayList<Object>>) request.getAttribute("rows");

						if(rows == null) { 
							%>
						<tr>
							<td class="text-center" colspan="5">没有相关记录</td>
						</tr>
							<%				
							}else {

								for (List<Object> row : rows) {
						%>
						<tr>
							
							<td><%=row.get(0).toString() %></td>
							<td><%=row.get(1).toString() %></td>
							<td><%=rbac.get(Integer.valueOf(row.get(2).toString())).getFullname() %></td>
							<td><%=row.get(3).toString().substring(0, row.get(3).toString().length()-2) %></td>
							
							<td><a href="detailflow?flowid=<%=row.get(0).toString() %>"><span class="glyphicon glyphicon-pencil">.....</span></a></td>
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
					<li><a href="rworkflow.do?pageNumber=<%=pageNumber - 1%>">&laquo;</a></li>
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
								<a href="rworkflow.do?pageNumber=<%=i%>"><%=i%></a></li>
					<%
							}
						} else if (pageNumber + 4 >= countPage) {
							for (int i = countPage - 4; i <= countPage; i++) {
					%>
								<li <%=(i == pageNumber) ? " class=\"active\"" : ""%>>
								<a href="rworkflow.do?pageNumber=<%=i%>"><%=i%></a></li>
					<%
						}
						} else {
							for (int i = pageNumber; i <= pageNumber + 4; i++) {
					%>
								<li <%=(i == pageNumber) ? " class=\"active\"" : ""%>>
								<a href="rworkflow.do?pageNumber=<%=i%>"><%=i%></a></li>
					<%
							}
						}
					%>


					<%
						if (pageNumber < countPage) {
					%>
					<li><a href="rworkflow.do?pageNumber=<%=pageNumber + 1%>">&raquo;</a></li>
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

</script>


<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="../bootstrap/js/bootstrap.min.js"></script>

</body>
</html>