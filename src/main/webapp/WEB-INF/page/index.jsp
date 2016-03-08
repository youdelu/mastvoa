<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>OA办公系统 - 澳亚卫视</title>
<link
	href="${pageContext.request.contextPath}/Skins/Common/bootstrap.min.css"
	rel="stylesheet" />
<link
	href="${pageContext.request.contextPath}/Skins/Common/main.min.css"
	rel="stylesheet" />
<link
	href="${pageContext.request.contextPath}/js/Bootstrap/css/font-awesome.min.css"
	rel="stylesheet" />
<link href='Skins/Blue/Style.css' rel='stylesheet' type='text/css'
	id=skincss />
<link
	href="${pageContext.request.contextPath}/Skins/Common/ie8checkbox.css"
	rel="stylesheet" />
<link
	href="${pageContext.request.contextPath}/Skins/Common/jquery.gridster.css"
	rel="stylesheet" />
<link
	href="${pageContext.request.contextPath}/Skins/Common/jquery.tipsy.css"
	rel="stylesheet" />
<link
	href="${pageContext.request.contextPath}/Skins/Common/jquery.colpick.css"
	rel="stylesheet" />
<link
	href="${pageContext.request.contextPath}/Skins/Common/message.css"
	rel="stylesheet" />
<link href="${pageContext.request.contextPath}/js/layer/skin/layer.css"
	rel="stylesheet" />
<link
	href="${pageContext.request.contextPath}/SFOAHtml/themes/iframe.css"
	rel="stylesheet" />
<link href="${pageContext.request.contextPath}/Skins/Common/newhome.css"
	rel="stylesheet" />
<link rel="shortcut icon" href="${pageContext.request.contextPath}/favicon.png" />
 
<script src="${pageContext.request.contextPath}/js/jquery.js">
    </script>
<script src="${pageContext.request.contextPath}/js/date.format.js">
    </script>
<script
	src="${pageContext.request.contextPath}/Content/Tools/Jquery/jquery.timeago.js"
	charset="utf-8">
    </script>
<script
	src="${pageContext.request.contextPath}/js/Bootstrap/js/bootstrap.min.js">
    </script>
<script src="${pageContext.request.contextPath}/js/jquery.gridster.js">
    </script>
<script src="${pageContext.request.contextPath}/js/jquery.colpick.js">
    </script>
<script
	src="${pageContext.request.contextPath}/js/jquery.preventScroll.js">
    </script>
<script
	src="${pageContext.request.contextPath}/js/jquery-ui.sortable.min.js">
    </script>
<script src="${pageContext.request.contextPath}/js/layer/layer.min.js">
    </script>
<script
	src="${pageContext.request.contextPath}/js/jquery.signalR-1.1.4.min.js">
    </script>
<script
	src="${pageContext.request.contextPath}/js/search/jquery.quicksearch.js">
    </script>
<script
	src="${pageContext.request.contextPath}/js/slimscroll/jquery.slimscroll.min.js">
    </script>
<script
	src="${pageContext.request.contextPath}/js/bootstrap-hover-dropdown.js">
    </script>
<script src='${pageContext.request.contextPath}/signalr/hubs.js'> </script>
<script src="${pageContext.request.contextPath}/js/date.format.js">
    </script>
<script src="${pageContext.request.contextPath}/js/soffice.js"
	charset="utf-8">
    </script>
<script src="${pageContext.request.contextPath}/js/jquery.cookie.js">
    </script>
<script src="${pageContext.request.contextPath}/js/home.js">
    </script>
<script src="${pageContext.request.contextPath}/js/message.js">
    </script>
<script src="${pageContext.request.contextPath}/js/SfMenu.js">
    </script>
<script src="${pageContext.request.contextPath}/js/homeCommon.js">
    </script>
<link
	href="${pageContext.request.contextPath}/Skins/Common/Theme/Module/Fonts/iconfont.css"
	rel="stylesheet" />
<script
	src="${pageContext.request.contextPath}/PublicModule/JS/CsTask.js">
    </script>
<script type="text/javascript">
      var username = '测试用户';
      var userid = 'youdelu'; //聊天用户代码
      var myDeptId = '5'; //聊天用户代码
      var refleshInterval = 70 * 1000; //数据刷新时间
      var freLink = '575,565,165,99,86,561,320,562,580,581';
      var rootPath = '/';
      var isSound = true; //开启声音提醒
      $(function() {
        $(".person-name").dropdownHover();
        $("#msg-container").dropdownHover();
        SfMenu.Init();
        SF.msg.chat.init(userid, username, myDeptId);
        SF.msg.tips.init(userid, refleshInterval, false);
        SF.menu.right.init(freLink);
        //管理员首次登录打开初始向导
        //搜索菜单
        $('input.searchMenu').quicksearch('.sidebar-menu li');
        homeCommon.Init();
      });
      //兼容以前标签方法
      function CreateDiv(id, url, title, reload) //("mytabguide" + $(this).attr("data-tabid"), $(this).attr("data-url"), $(this).attr("data-title"), 1)
      {
        SF.tab.addTab(id, title, url, true, false, reload);
      }
    </script>
</head>

<body>

	  <div class="systemtip">
        <input id="systiptype" value="1" type="hidden" />
        <div class="systemtip-content">
           <a href='javascript:void(0);' data-id='323'
				 data-url='system/menu.do' class='link linktab'> 
				 <span style="color:#fff"> 今天发了10月份的工资，请大家查收 一下 </span>
			 </a> 
        </div>
        <span class="systemtip-option">
          ×
        </span>
      </div>
     
	<!--/页面顶部提醒-->
	<!--header-->
	<div class="header"
		style="background-image: url(Skins/Common/logo.png); background-repeat: no-repeat; background-position: 27px 0">
		<div class="logo"></div>
		<div class="tools">
			<ul>
				<li>
					<div id="search-box" class="search-box">
						<div id="search-option" class="search-option">
							<p id="search-type">全部</p>
							<div class="arrow-bottomright search-arrow-downright"></div>
						</div>
						<div id="search-dropdown" class="search-dropdown">
							<div id="search-dropdown-list" class="search-dropdown-list">
								<ul>
									<li>全部</li>
									<li>备忘</li>
									<li>计划</li>
									<li>任务</li>
								</ul>
							</div>
						</div>
						<div id="search-text" class="search-text">
							<input type="text" id="search-text-input" /> <span
								class="systemtip-option"
								style="top: 6px; left: 160px; display: none;"> × </span>
						</div>
						<div id="search-img" class="search-img">
							<div class="search-img-img search-img-img-over" title="搜索">
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="person-name dropdown-toggle" id="info-dropdown"
						data-hover="dropdown">
						<div class="info-face" title="个人信息" id="info-face">
							<div class="info-face-img">
								<img class="my-face" src="publicfile/test20160106173329105.png"
									onerror="this.src='images/new/icons/BBS_Image.png'" />
								<div class="my-face-icon">
									<i class="sf-icon icon-status icon-online"> </i>
								</div>
							</div>

						</div>
						<div class="info">
							<div class="info-name">
								<span title="游德禄"> 游德禄 </span> <span title="总经理"> 程序猿</span>
							</div>
						</div>
					</div>  
					<ul class="pull-right dropdown-menu dropdown-login-area"
						aria-labelledby="info-dropdown">
						<li>
							<div class="media person-info">
								<div class="pull-left">
									<a href="javascript:void(0)" class="person-info-photo"> <img
										class="media-object"
										onerror="this.src='images/new/icons/BBS_Image.png'"
										src="publicfile/test20160106173329105.png" />
									</a>
									<div id="current-status" title="当前状态"
										data-stopprogagation="true">
										<i class="sf-icon icon-status icon-online"> </i> 在线
									</div>
									<div id="status-list" data-stopprogagation="true">
										<div class="arrow-up" id="status-arrow" >
										</div>
										<div>
											<a id="edit-memo" href="javascript:void(0)"> <i
												class="sf-icon icon-status icon-custom"> </i> 自定义
											</a>
										</div>
										<div style="border-top: 1px solid #ccc;">
											<a href="javascript:void(0);" data-id="304"
												data-url="SysSetInfo/PersionStatus.aspx"
												class="link linktab"> 历史状态 </a>
										</div>
									</div>
								</div>
								<div class="media-body jibenxinxi">
									<ul>
										<li><span> 部门 </span> &nbsp; 新媒体</li>
										<li><span> 职位 </span> &nbsp;
											<div class="info-zhiwei">
												程序猿  
												<div class="info-post"></div>
											</div></li>
										<li><span> 账号 </span> &nbsp; youdelu</li>
										<li><a class="update-pw"  id="update-pw" href="javascript:void(0)">修改密码</a></li>
									</ul>
								</div>
							</div>
						</li>
						<li>
					 <ul class="dengluxinxi">
						<li>
							<div class="person-options">
								<div id="person-option-setting" class="person-option">
									<img alt="个人中心" src="Skins/Common/profile/setting.png"
										title="个人中心" />
									<p>个人中心</p>
								</div>
								<div id="person-option-lock" class="person-option"
									data-usercode="test">
									<img alt="锁定" src="Skins/Common/profile/lock.png" title="锁定" />
									<p>锁定</p>
								</div>
								<div id="person-option-logoff" class="person-option">
									<img alt="注销" src="Skins/Common/profile/logoff.png" title="注销" />
									<p>注销</p>
								</div>
							</div>
						</li>
					</ul>
				</li>
				</ul> 
				 <li>
              <div class="msg wave" id="msg-container">
                <div class="msg-nav">
                  <div class="msg-nav-num" id="msg-total-num">
                    0
                  </div>
                </div>
              </div>
            </li> 
			</ul>
		</div>
	</div>
	<!--/header-->
	<!-- Main Container -->
	<div class="main-container container-fluid">
		<!--内容区域-->
		<div class="page-container">
			<!-- Page Sidebar -->
			<div class="page-sidebar" id="sidebar">
				<!--左边菜单区域-->
				<!--菜单搜索-->
				<div class="sidebar-header-wrapper">
					<input type="text" class="searchinput searchMenu" value=""
						placeholder=" 搜索菜单" /> <i
						class="sf-icon sf-search"> </i>
				</div>
				<!-- /菜单搜索 -->
				<!-- Sidebar Menu -->
				
				<div>
					<ul class="nav sidebar-menu">
						 ${menu } 
					 </ul>
				</div>
				<div class="skin">
					<a href='javascript:void(0);' data-id='511'
						data-url='system/menu.do?ID=511' id="help-btn" class="linktab">
						<span class="menu-text"> 帮助 </span>
					</a>
				</div>
				<!--/一级菜单-->
			</div>
			<div class="nav-cont-right">
				<ul data-parent-id="parent-cy" class="changyong"
					style="display: none;">
				</ul>
			</div>
			<!-- /Page Sidebar -->
			<div class="page-content">
				<!--选项卡-->
				<div class="tab-box">
					<ul class="tab-box-list">
						<li class="sf-home-default" data-tabid="mainmenuindex"
							onClick="SF.tab.addTab('mainmenuindex','','',true,false,true,true)">
							<i class="fa fa-home"> </i>
							<div class="sf-home-desk">首页</div>
						</li>
					</ul>
					<div class="tab-box-more">
						<div class="icon"></div>
						<div class="arrow-up"></div>
						<ul class="tab">
						</ul>
					</div>
				</div>
				<!--/选项卡-->
				<!--内容区域-->
				<div class="content">
 
					<div class="framecontent" style="position: relative;">
						<div id="div-load"
							style="display: none; height: 2px; background: red; position: absolute; top: 0; left: 0;">
						</div>
					</div>
				</div>
			</div>
			<!--即时通-->
			<div class="page-sidemsg" id="sidemsg">
				<div class="top-title-tab">
					<ul>
						<li class="active" id="waiting-info" data-index="1">
							<div class="">
								<div class="waiting-work-tip" title="待办消息">
									<div class="count">0</div>
								</div>
								<p>待办消息</p>
							</div>
						</li>
						<li id="msg-info" data-index="2">
							<div class="">
								<div class="instan-message-tip" title="即时通讯">
									<div class="msg-nav-num" id="total-num">0</div>
								</div>
								<p>即时通讯</p>
							</div>
						</li>
					</ul>
				</div>
				<div class="panel-body">
					<div class="panel-content">
						<!--待办消息页面-->
						<div class="waiting-work-tab">
							<div class="body-title">
								<ul id="task-tab">
									<li data-for=".task-undo-list" class="active" title="待办">
										<i class="sfico sfico-undo"> </i>
									</li>
									<li data-for=".task-do-list" title="已办"><i
										class="sfico sfico-do"> </i></li>
									<li data-for=".task-send-list" title="已发"><i
										class="sfico sfico-send"> </i></li>
								</ul>
							</div>
							<div class="body-content">
								<div class="msg-cont">
									<div class="msg-cont-search">
										<i id="task-search-btn" class="sf-icon sf-search"> </i> <input
											type="text" id="task-search-text" class="searchinput"
											value="" />
									</div>
									<div class="task-undo-list tip-list">
										<ul id="detail-tip-list">
										</ul>
									</div>
									<div class="task-do-list tip-list">
										<ul id="tip-do-lists">
											<!--已办-->
										</ul>
										<p class="text-center task-more">
											<a href="javascript:void(0)" class="btn-default" id="do-more">
												查看更多 </a>
										</p>
									</div>
									<div class="task-send-list tip-list">
										<ul id="tip-send-lists">
											<!--已发-->
										</ul>
										<p class="text-center task-more">
											<a href="javascript:void(0)" class="btn-default"
												id="send-more"> 查看更多 </a>
										</p>
									</div>
								</div>
							</div>
						</div>
						<!--/待办消息页面-->
						<!--即时通讯页面-->
						<div class="msg-work-tab">
							<div class="body-title">
								<ul id="msg-tab">
									<li data-for=".msg-cont-one" title="联系人"><i
										class="sfico sfico-user"> </i></li>
									<li data-for=".msg-cont-three" title="用户组"><i
										class="sfico sfico-group"> </i></li>
									<li data-for=".msg-cont-two" title="最近会话"><i
										class="sfico sfico-time"> </i></li>
								</ul>
							</div>
							<div class="body-content">
								<div class="msg-cont">
									<div class="msg-cont-search">
										<i id="msg-search-btn" class="sf-icon sf-search"> </i> <input
											type="text" id="msg-search-text" class="searchinput" value="" />
									</div>
									<div class="msg-cont-one msg-list">
										<div class="load-user"></div>
									</div>
									<div class="msg-cont-two msg-list">
										<div class="cont"></div>
									</div>
									<div class="msg-cont-three msg-list">
										<div class="cont"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!--/即时通讯页面-->
				</div>
				 
				<iframe frameborder=0 scrolling=no
					style="background-color: transparent; position: absolute; z-index: -1; width: 100%; height: 100%; top: 0; left: 0;">
				
				</iframe>
			</div>
			<!--/即时通-->
		</div>
		<!--/内容区域-->
	</div>
	<!--/ Main Container -->
	<!--聊天窗口-->
	<div class="msg-main" id="msg-main-container">
		<div class="left-content">
			<div class="msg-drag" id="msg-drag"></div>
			<div class="msg-close">
				<a href="javascript:" onClick="SF.msg.chat.closeChat()"> × </a>
			</div>
			<div class="clear-float"></div>
			<ul class="user-head" id="user-head">
			</ul>
			<div class="msg-container">
				<ul class="msg-record" id="msg-record">
				</ul>
				<ul class="add-msg">
					<li><script id="send-msg-content" type="text/plain">
                </script></li>
					<li id="msg-more" class="msg-more">沟通记录 <span class="arrow">
					</span>
					</li>
				</ul>
			</div>
			<ul class="msg-btn">
				<li><input id="close-current-msg" value="关闭" type="button" />
				</li>
				<li><input id="send-current-msg" title="Enter键发送，Ctrl+Enter键换行"
					value="发送" type="button" /></li>
			</ul>
		</div>
		<div class="right-content"></div>
	</div>
	<!--/聊天窗口-->
	<!--屏幕锁定-->
	<div class="lock-screen" id="lockArea"></div>
	<div class="lock-login" id="lockLogin">
		<div
			style="float: left; width: 75px; height: 50px; line-height: 50px;">
			<img src="Skins/Common/LockScreen/locked.png" alt="" width="32"
				height="39" />
		</div>
		<div style="float: left;">
			<h2>已锁定</h2>
		</div>
		<div
			style="float: left; height: 70px; width: 450px; margin-top: 15px;">
			<div class="lock-input-div">
				<input type="password" placeholder="  请输入登录密码解锁"
					class="pwd_input lock-input" />
			</div>
			<div style="float: left;">
				<a class="jq_lockscreen lock-enter" href="javascript:void(0)"> </a>
			</div>
		</div>
	</div>
	<!--屏幕锁定-->
	<!--更改即时通讯在线状态-弹出框-->
	<div id="edit-memo-div">
		<div class="modal-header">
			<h4 class="modal-title">状态信息设置</h4>
		</div>
		<div class="modal-body">
			<span class="sp-left"> 选择状态： </span> <span class="sp-right"> <select
				id="select-status">
			</select> <input type="text" id="user-define-text" maxlength="5" />
			</span> <br /> <br /> <span class="sp-left"> 状态说明： </span> <span
				class="sp-right"> <textarea data-value="" id="memo-content"
					rows="5">
            </textarea> <br /> (50字以内)
			</span>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-default" id="edit-close-btn"
				data-dismiss="modal">取消</button>
			<button type="button" id="edit-memo-btn" class="btn btn btn-default">
				确定</button>
		</div>
	</div>
	<!--/更改即时通讯在线状态-->
	 
	<div id="importantIcon">
		<a href="javascript:" title="重要提醒"> </a>
	</div>
	<embed id="ddsound" src="msg.mp3" hidden="true" quality="high"
		pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?p1_prod_version=shockwaveflash"
		autostart="false" type="application/x-shockwave-flash" width="1"
		height="1">
	</embed>
	<audio src="msg.mp3" controls id="ddsoundHTML5" style="display: none">
	</audio>
</body>

</html>