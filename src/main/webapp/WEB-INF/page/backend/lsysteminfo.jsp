<%@ include file="../jspf/backend/head.jsp"%>
<%@page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.ArrayList,java.util.List"%>

<div class="container">
	<!-- Example row of columns -->
	<div class="row">

		<div class="col-md-12">

			<h2 class="sub-header">系统信息</h2>
			<div class="table-responsive">
				<table class="table">
					<thead>
						<tr class="info">
							<th>序号</th>
							<th>名称</th>
							<th>内容</th>
						</tr>
					</thead>
					<tbody>
					<%Integer systemInfo[]=(Integer[])request.getAttribute("systemInfo"); %>
					<%String infoName[]=(String[])request.getAttribute("infoName"); %>	
					<%String problemInfo[]=(String[])request.getAttribute("problemInfo");%>
					<% if( systemInfo.length==0 )  {%>
						<tr>
							<td class="text-center" colspan="3">没有相关记录</td>
						</tr>
					<%} else {
							for( int i=0;i<systemInfo.length;i++) {
					%>
						<tr class="active">
							<td><%=i %></td>
							<td><%=infoName[i] %></td>
							<td><%=systemInfo[i] %></td>
						</tr>				
						<%	}
						} %>
						<tr class="danger">
							<td>8</td>
							<td><%=infoName[8] %></td>
							<td>ID&nbsp;[<%=problemInfo[0] %>]</td>
						</tr>
						<tr class="danger">
							<td>9</td>
							<td><%=infoName[9] %></td>
							<td>ID&nbsp;[<%=problemInfo[1] %>]</td>
						</tr>
						
					</tbody>
				</table>
			</div>

		</div>
	</div>
 
</div>
<!-- /container -->

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->

<script src="../bootstrap/js/jquery-1.11.1.js"></script>

<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="../bootstrap/js/bootstrap.min.js"></script>

</body>
</html>