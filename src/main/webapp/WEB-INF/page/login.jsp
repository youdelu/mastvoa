<%@ page language="java" pageEncoding="UTF-8"%>
 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>用户登录 - 澳亚卫视</title>
    <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width"/>
	<meta content="yes" name="apple-mobile-web-app-capable" />
	<meta content="black" name="apple-mobile-web-app-status-bar-style" />
	<meta content="telephone=no" name="format-detection" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0"> 
	<link rel="SHORTCUT ICON" href="${pageContext.request.contextPath}/icon/logo.png"/>
　 <link rel="BOOKMARK" href="${pageContext.request.contextPath}/icon/logo.png"/>
  </head>
  <link rel="stylesheet" type="text/css"  href="${pageContext.request.contextPath}/Css/login.css"/>
  <link href="${pageContext.request.contextPath}/Css/plugins/sweetalert/sweetalert.css" rel="stylesheet"/>
  <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.js"></script>
  <body>
 <div class="back">
            <div class="items">
                <div class="item item1"
                     style="background-image:url(${pageContext.request.contextPath}/images/bg/1.jpg)"></div>
                <div class="item item2"
                     style="background-image:url(${pageContext.request.contextPath}/images/bg/2.jpg)"></div>
                <div class="item item3"
                     style="background-image:url(${pageContext.request.contextPath}/images/bg/3.jpg)"></div>
            </div>
        </div>
  <div id="top">
    <div class="top-nav-bd">
    	<div class="top-nav">
            <div id="logo">
                  <img src="${pageContext.request.contextPath}/Skins/Common/logo.png" height="41px"/>                 
            </div>
        </div>
    </div>
</div>

 
  	  <div id="box"></div>
      <div id="login">
        <h3>用户登录</h3>
        <form id="loginform" name="loginform" method="post" action="">
          <label for="userid">账号:</label>
          <input type="text" name="userid"  value="admin" id="userid" class="txtfield" tabindex="1">
          
          <label for="password">密码:</label>
          <input type="password" name="password" value="123"  id="password" class="txtfield" tabindex="2">
          
           <label id="check-b"><input type="checkbox" checked="checked" height="20" id="checkbox"/><span class="check_text">记住密码</span></label>
          
          <div class="center">
		         <div id="loginbtn" >
		    		<span>登录</span>
		    		<div></div>
				</div> 
          </div>
        </form>
      </div>
	<div class="footer">
         澳亚卫视  版权所有
         <br/>Copyright © 2004 - 2015 MASTV. All Rights Reserved
    </div>
  </body>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/login.js"></script>
<script src="${pageContext.request.contextPath}/js/jquery.map.js"></script>
<script  type="text/javascript" src="${pageContext.request.contextPath}/js/plugins/sweetalert/sweetalert.min.js"></script>
<script>

    var slideEle = slider($('.items'));
    function slider(elem) {
        var items = elem.children(),
                max = items.length - 1,
                animating = false,
                currentElem,
                nextElem,
                pos = 0;

        sync();

        return {
            next: function () {
                move(1);
            },
            prev: function () {
                move(-1);
            },
            itemsNum: items && items.length
        };

        function move(dir) {
            if (animating) {
                return;
            }
            if (dir > 0 && pos == max || dir < 0 && pos == 0) {
                if (dir > 0) {
                    nextElem = elem.children('div').first().remove();
                    nextElem.hide();
                    elem.append(nextElem);
                } else {
                    nextElem = elem.children('div').last().remove();
                    nextElem.hide();
                    elem.prepend(nextElem);
                }
                pos -= dir;
                sync();
            }
            animating = true;
            items = elem.children();
            currentElem = items[pos + dir];
            $(currentElem).fadeIn(400, function () {
                pos += dir;
                animating = false;
            });
        }

        function sync() {
            items = elem.children();
            for (var i = 0; i < items.length; ++i) {
                items[i].style.display = i == pos ? 'block' : '';
            }
        }

    }

    if (slideEle.itemsNum && slideEle.itemsNum > 1) {
        setInterval(function () {
            slideEle.next();
        }, 4000)
    }

</script>

<script>
var type = '${type}';
$(document).ready(function(){
	if(type==1){
		$("#login h3").text("会话过期，请重新登录").css("color","red");
	}
	  $("#loginbtn").click(function(){
		 var id = $("#userid").val();
		 var psd = $("#password").val();
		 var error ="";
		 if(id==""){
			error="很抱歉，您还未输入用户名!";
		 } else if(psd==""){
			error="很抱歉，您还未输入密码!";
		 } 
		 if(error!=""){
			 swal("请填写登录信息",error, "warning");
		 	return;
			 }else{
				 $("#loginbtn span").text("登录中");
		        	$.ajax({
		    		type: "POST",
		    		url: "login_in.do",
		    		data: {"userid":id,"password":psd},
		    		dataType:"text", 
		    		beforeSend:function(){ 
		    			doProgress(); 
		    			}, 
		    		success: function(res){  
		       			 if(res=="1"){
		       				setCookie("userid",id);
	      					if($(":checkbox").prop("checked")){
	      						setCookie("checked","true");
		      					setCookie("password",psd);	
	      					}else{
	      						if(getCookie("password")!=null){
	      							setCookie("checked","false");
	      							setCookie("password","");
	      						}
	      					}
		       				if(type==1){
		       					swal({
		            	   	        title: "登录成功",
		            	   	        text:"您可以点击确认关闭此窗口继续工作了。",
		            	   	        type: "success",
		            	   	        confirmButtonText: "确认",
		            	   	        closeOnConfirm: true
		            	   	    },function(){
		            	   	    	window.close();
		            	   	    });
		       				}else{
		      					var top = ($("#login").offset().top+160)+"px";
		      					var left = ($("#login").offset().left-60)+"px";
		      					var value = {
			       						width:"0px",
			       						height:"0px",
			       						left:"+="+left,
			       						top:"-="+top,
			       						padding:"0px",
			       						margin:"0px"
			       					};
		       					$("#box").animate(value,500);
		       					$("#login").html("").animate(value,500);
			       			    setTimeout(function(){
			       			    	  location.href="/demo/";
			       				},500);
		       				}
		       			 }else{
		       				compLogin();
		       				swal({
	            	   	        title: "登录失败",
	            	   	        text:"账号或密码错误，如果忘记密码了请联系管理员",
	            	   	        type: "error",
	            	   	        confirmButtonText: "确认",
	            	   	        closeOnConfirm: true
	            	   	    },function(){
	            	   	    	if(type==1)
	            	   	    		window.open("/demo/login.do",'_blank',"");
	            	   	    });
		       			 }
		    		},
		    		error: function(){
		    			compLogin();
		    			swal({
            	   	        title: "连接服务器失败",
            	   	        text:"请检查您的设备是否能上网或联系系统管理员！",
            	   	        type: "error",
            	   	        confirmButtonText: "确认",
            	   	        closeOnConfirm: true
            	   	    },function(){
            	   	    	if(type==1)
            	   	    		window.open("/demo/login.do",'_blank',"");
            	   	    });
		     		return false;
		    		}
			 	});
			 }
		  });
	  	$(":checked").prop("checked",getCookie("checked"));
		$("#userid").val(getCookie("userid"));
		$("#password").val(getCookie("password"));
});
</script>
</html>



