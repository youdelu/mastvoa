///soffice新菜单
var SfMenu = {
    option: {
        display: 0,
        isChange:true
    },
    Init: function () {
        //alert(this.option.display);
        this.getDispalyMenuStyle();//获取默认值
        //初始化菜单导航
        this.InitiateSideMenu();
    },
    InitiateSideMenu: function () {
        //点击显示隐藏菜单
        //$(".sidebar-toggler").on('click', function () {
        //    $("#sidebar").toggleClass("hide");
        //    $(".sidebar-toggler").toggleClass("active");
        //    return false;
        //});
        //切换菜单展开收缩效果
		
		////记得将下面的删掉
		$("#sidebar").show();
		
		
        var b = $("#sidebar").hasClass("menu-compact");
        $("#sidebar-collapse").on('click', function () {
            //重新加载模块信息
            SfMenu.option.isChange = false;//只更新大小不更新内容
            SfMenu.SaveDefaultMenu();//保存当前菜单样式
        });
        //操作菜单
        $(".sidebar-menu li").on("mouseenter click", function (e) {
           // alert(SF.box.dispalyMenuStyle);
            var menuLink = $(e.target).closest("a");
            if (!menuLink || menuLink.length == 0)
                return;
            if (!menuLink.hasClass("menu-dropdown")) {
                if (b && menuLink.get(0).parentNode.parentNode == this) {
                    var menuText = menuLink.find(".menu-text").get(0);
                    if (e.target != menuText && !$.contains(menuText, e.target)) {
                        return false;
                    }
                }
                return;
            }
            var submenu = menuLink.next().get(0);
            if (!$(submenu).is(":visible")) {
                var c = $(submenu).parent().closest("ul");
                if (b && c.hasClass("sidebar-menu"))
                    return;
                c.find(">.open > .submenu")
                    .each(function () {
                        if (this != submenu && !$(this.parentNode).hasClass("active"))
                            $(this).parent().removeClass("open");
                        showPageObject();
                    });
            }
            if (submenu && b && $(submenu.parentNode.parentNode).hasClass("sidebar-menu"))
            { return false };
            var $this = $(submenu).parent().closest("ul");
            var $thisOffset = $this.offset();

            var childHeight = $this.find(".submenu:first").height();
            var childLiLength = $this.find(".submenu:first > li").length;
           // $this.find(".submenu:first").css({ "left": "165px" });
            $(submenu).parent().addClass("open");//submenu
            hidePageObject();
            return false;
        });
        //绑定菜单移动上的事件
        $(".sidebar-menu > li").on("mouseenter click", function () {
            //console.log("移动上菜单=" + SF.box.dispalyMenuStyle);
            var $this = $(this);
            var $thisOffset = $this.offset();//要减去滚动条高度
            //var $scrollHeight = $(document).scrollTop();
            var secondTop = $thisOffset.top - $(document).scrollTop() - 100;//当前激活菜单距离顶部的高度
            //alert(secondTop + "$scrollHeight=" + $scrollHeight);

            var menuHeight = $(".page-sidebar").height() - 40;//导航菜单完整高度
            var height = $this.height();

            var childHeight = $this.find(".submenu:first").height();//二级菜单高度    
            var childLiLength = $this.find(".submenu:first > li").length;//二级菜单的个数 
            //向上偏移距离                        //上间距，默认一个菜单的距离     //下间距
            var endTop = 0, elseHeight = 0, paddingTop = height, paddingBottom = 0;

            //console.log("下部高度:" + (menuHeight - secondTop) + "|元素高度" + childHeight + "|上部高度" + secondTop);
            if ((menuHeight - secondTop < childHeight) && (secondTop < childHeight)) {
                //上下空间不足时，子菜单垂直居中

                //如果子菜单的高度大于全部高度的一半
                //如果二级菜单过长，重新计算高度
                if (menuHeight < childHeight) {//如果上下空间加起来都不足，从新计算高度
                    var newheight = menuHeight / (childLiLength+1)-5;
                   //alert(newheight);
                   $this.find(".submenu:first").find('li').css({ "height": newheight + "px", "line-height": newheight + "px" });
                }
                endTop = -secondTop;
                paddingTop = newheight;
            }
            else if ((menuHeight - secondTop < childHeight) && (secondTop > childHeight)) {
                //下部空间不足并且上部空间充足，子菜单向上展示
                endTop = -childHeight;

            }
            else {
                //子菜单向下展示
                endTop = -height;
            }
            $this.find(".submenu:first").css({ "top": endTop + "px" });
            //缩小后菜单样式
            if (SF.box.dispalyMenuStyle != 0) {
                $this.find(".submenu:first").css({ "top": "0px" });
                
                childHeight = childHeight + height;//子级整体高度

                //处理缩小后的菜单样式
                if ((menuHeight - secondTop < childHeight) && (childHeight > secondTop)) {
                    //上下空间不足时，子菜单垂直居中
                    paddingTop = height;
                    endTop = -childHeight / 2;
                    if (secondTop < childHeight / 2) {//如果距离上面的偏移量小于垂直居中的高度（一半）
                        endTop = -secondTop;
                    }
                    if (menuHeight - secondTop < childHeight / 2) {//如果距离下面的偏移量小于垂直居中的高度（一半）
                        endTop = -secondTop ;
                    }
                   // alert("menuHeight=="+menuHeight+";newHeight=="+newHeight + ";hildLiLength=="+childLiLength);
                    $this.find("span.menu-text").css({ "top": endTop + "px" });
                }
                if ((childHeight < menuHeight - secondTop) && (childHeight > secondTop)) {
                    //下部空间充足，上部空间不足
                    endTop = 0;
                }
                if ((childHeight > menuHeight - secondTop) && (childHeight < secondTop)) {
                    //下部空间不足时，上部空间充足
                    //alert(333);
                    endTop = -(childHeight-height);
                    paddingTop = 0;  //特殊处理
                    paddingBottom = height;
                }
                if (childHeight < menuHeight - secondTop && childHeight < secondTop) {
                    //下部空间充足，上部空间充足（默认理想效果）
                    endTop = 0;
                }
                //赋值给子级样式
                $this.find(".submenu:first").css({ "top": endTop + "px", "padding-top": paddingTop + "px", "padding-bottom": paddingBottom + "px" });
                $this.find(".submenu:first").css({ "left": "50px" });
                var width = $this.find(".submenu:first").width();
                $this.find(".submenu:gt(0)").css({ "left": width + "px" });

                //隐藏区域的高度
                $(".sidebar-menu").find('.submenu-cover').hide();
                $this.find('.submenu-cover:first').css({ "width": 195 + "px", "height": childHeight + 90 + "px", "top": endTop -30+ "px", "left": "50px" }).show();
            }
            else {
                $this.find(".submenu:first").css({ "padding-top": "0px", "padding-bottom": "0px" });
                $this.find(".submenu:first").css({ "left": "165px" });
                $this.find(".submenu:gt(0)").css({ "left": "165px" });

                //隐藏区域的高度
                $(".sidebar-menu").find('.submenu-cover').hide();
                $this.find('.submenu-cover:first').css({ "width": 195 + "px", "height": childHeight + 90 + "px", "top": endTop + "px", "left": "165px" }).show();
            }
           
        }).on("mouseleave", function () {
            $(".sidebar-menu li").removeClass("open");
            $(".sidebar-menu").find('.submenu-cover').hide();
            $(".submenu").find('.submenu-cover-third').hide();
            showCurPageObject();//显示object对象
        });

        $(".submenu > li").on("mouseenter click", function () {
            //三级
            var $this = $(this);
            var menuHeight = $(".page-sidebar").height() - 45;
            if ($this.find("ul").length > 0) {
                var thirdSubmenu = $this.find(".submenu:first");
                var thirdHeight = thirdSubmenu.height();//三级菜单总高度
                var thisHeight = thirdSubmenu.find("li").height();//二级菜单高度
                var thisCount = thirdSubmenu.find("li").length;//三级菜单个数
                var thirdTop = $this.offset().top - $(document).scrollTop() - 100; //三级菜单坐标
                var thirdleft = $this.offset().left;
                if (SF.box.dispalyMenuStyle != 0) {
                    thirdleft =  $this.width()-30;
                }
                var isCompress = false;//三级菜单是否压缩高度
                if (thirdHeight > menuHeight) {
                    var nomoheight = menuHeight / thisCount;
                    thirdSubmenu.find('li').css({ "height": nomoheight + "px", "line-height": nomoheight + "px" });
                    thisHeight = nomoheight ;
                    thirdHeight = thirdSubmenu.height();
                    isCompress = true;
                }      

                var endTop = -thisHeight;
                //console.log("下部高度:" + (menuHeight - thirdTop) + "|元素高度" + thirdHeight + "|上部高度" + thirdTop);
              
                if (((menuHeight - thirdTop) < thirdHeight) && (thirdTop > thirdHeight)) {
                    //下部空间不足，上部空间充足
                    endTop = -thirdHeight;
                } else if (((menuHeight - thirdTop) < thirdHeight) && (thirdTop < thirdHeight)) {
                    //上下部空间都不足
                    endTop = -(thirdTop + thisHeight);
                }

                if (isCompress) {
                    endTop = -(thirdTop + thisHeight);
                }

                thirdSubmenu.css({ "top": endTop + "px" });

                //隐藏区域的高度
                $(".submenu").find('.submenu-cover-third').hide();
                $this.find('.submenu-cover-third').css({ "width": 225 + "px", "height": thirdHeight +90+ "px", "top": endTop  + "px", "left": thirdleft + "px" }).show();

                //if (menuHeight - thirdTop < thirdHeight) {
                //    endTop = -thirdHeight;
                //    if (thirdHeight > thirdTop) {
                //        endTop = -(thirdHeight - 100);
                //    }
                //    if (thirdHeight > menuHeight - 100) {
                //        var nomoheight = (menuHeight) / thisCount - 2;
                //        endTop = -(thirdHeight - 60);
                //        thirdSubmenu.find('li').css({ "height": nomoheight + "px", "line-height": nomoheight +"px"});
                //    }
                //    thirdSubmenu.css({ "top": endTop + "px" });
                //}
                //else {
                //    thirdSubmenu.css({ "top": -thisHeight + "px" });
                //}
            }
            else {
                //移动到 没有三级的li上
                var $Onlyli = $this.parent().find("li")
                if ($Onlyli.hasClass("open")) {
                    $(".submenu").find('.submenu-cover-third').hide();
                    $Onlyli.removeClass("open");
                }
            }
        });
        $(document).on("click", function (e) {
            if ($(".sidebar-menu li").hasClass("open")) {
                $(".sidebar-menu li").removeClass("open");
                $(".sidebar-menu").find('.submenu-cover').hide();
                $(".submenu").find('.submenu-cover-third').hide();
            }
            if ($("#info-dropdown").hasClass("open")) {
                $("#info-dropdown").removeClass("open");
            }
        });
        //绑定切换消息事件
        $("#sidemsg .top-title-tab li").on("click", function () {
            var $this = $(this);
            var dataindex = $this.data("index");
            $this.addClass("active").siblings().removeClass("active");
            if (dataindex == "1") {
                $(".msg-work-tab").hide();
                $(".waiting-work-tab").show();
            }
            else {
                $(".msg-work-tab").show();
                $(".waiting-work-tab").hide();
                if (parseInt($("#total-num").text()) > 0) {
                    $("#msg-tab li:eq(2)").click();
                }
                else {
                    $("#msg-tab li:eq(0)").click();
                }
            }
        });
        //End Sidebar Menu Handle
        $("ul.dropdown-menu").click(function (event) {
            event.stopPropagation();
        });

    },
    //保存菜单默认展开效果 1：展开 0：收缩
    SaveDefaultMenu: function () {
    },
    getDispalyMenuStyle: function () {
        SfMenu.ChangeSidebar();
    },
    ChangeSidebar: function () {
        $(".skin"). css({ "width": "165px", "height": "40px" });
        $("#help-btn").text("帮助");
       // $("#sidebar").toggleClass("hide");
        $("#sidebar").removeClass("menu-compact");
        $(".sidebar-collapse").attr("title","收缩");
        $("#sidebar").show();
        //初始化内容区
        $("#user-diy").removeData("gridster");//初始化之前清除缓存数据
        SF.box.init($("#user-diy"));//初始化内容区域
        b = $("#sidebar").hasClass("menu-compact");
        if (b) {
            $(".open > .submenu").removeClass("open");
        }
        var normalLiHeight = $(".sidebar-menu li").height() + "px";
        $(".page-sidebar.menu-compact .sidebar-menu > li > a .menu-text").css("height", normalLiHeight).css("lineHeight", normalLiHeight);
    }
	
	 
};