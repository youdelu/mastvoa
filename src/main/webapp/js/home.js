function showPageObject() {
    var n = $("iframe.lastiframe").removeClass("lastiframe");
    n.length > 0 && (n.find("object.object-hide").removeClass("object-hide"), $(n[0].contentWindow.document).find("object.object-hide").removeClass("object-hide"), $(n[0].contentWindow.document).find("iframe,frame").each(function() {
        var n = $(this)[0];
        $(n.contentWindow.document).find("object.object-hide").removeClass("object-hide")
    }))
}
function showCurPageObject() {
    var n = $("#ifr" + $(".tab-box-list>li.active").data("tabid")).removeClass("lastiframe");
    n.length > 0 && (n.find("object.object-hide").removeClass("object-hide"), $(n[0].contentWindow.document).find("object.object-hide").removeClass("object-hide"), $(n[0].contentWindow.document).find("iframe,frame").each(function() {
        var n = $(this)[0];
        $(n.contentWindow.document).find("object.object-hide").removeClass("object-hide")
    }))
}
function hidePageObject() {
    var t = $(".tab-box-list>li.active"),
    n;
    t.length > 0 && (n = $("#ifr" + t.data("tabid")), n.length > 0 && (n.addClass("lastiframe"), n.find("object:visible").addClass("object-hide"), $(n[0].contentWindow.document).find("object:visible").addClass("object-hide"), $(n[0].contentWindow.document).find("iframe,frame").each(function() {
        var n = $(this)[0];
        $(n.contentWindow.document).find("object:visible").addClass("object-hide")
    })))
}
function resizeTipHeight() {}
function resizeMenu() {
    var n = "45px",
    r = document.documentElement.clientHeight - 170,
    u = $(".sidebar-menu > li").length,
    f = !0,
    t,
    i;
    u * 45 + 52 > r && (t = r / u, t = t < 22 ? 22 : t, n = t + "px", f = !1);
    $leftLi = $(".sidebar-menu li").css("height", n).css("lineHeight", n);
    $(".sidebar-menu li a.menu-dropdown").css("height", n).css("lineHeight", n);
    $(".page-sidebar .sidebar-menu a").css("height", n).css("lineHeight", n);
    i = 15;
    n != "45px" && (i = t / 2 - 4);
    $(".page-sidebar .sidebar-menu a .menu-expand").css("top", i + "px")
}
function resizeUserList() {
    var n = document.documentElement.clientHeight - 250;
    $(".msg-cont .msg-list").css("height", n)
}
function resizeIframe() {
    ifameHeight = document.documentElement.clientHeight - 110;
    $(".framecontent").css("height", ifameHeight + "px")
}
function showDiy(n, t) {
    var f, l, o, s, h, c, a, y;
    if ($(".diy-module table tr").eq(0).show(), $(".diy-module table tr").eq(1).show(), $(".diy-module table tr").eq(4).show(), $("#trans").show(), $("label[for='trans']").show(), $(".diy-module-type input").removeAttr("checked"), $(".diy-module-type span").hide(), f = n.data("alltypes"), l = n.data("type"), (f != undefined || f != null) && f.length > 1 && (o = f.split(","), o.length > 0)) for (s = 0; s < o.length; s++) if (h = o[s], h != "") $(".diy-module-type span[data-type='" + h + "']").show();
    else break;
    c = $(".diy-module-type span[data-type='" + l + "']");
    c.show();
    c.find("input").prop("checked", !0);
    n.attr("id") || (a = "existswidget-" + parseInt(Math.random() * 1e6), n.attr("id", a));
    $("#for-newli").val(n.attr("id"));
    $("#diy-module-title").val(n.attr("data-title"));
    var i = n.data("bgcolor"),
    r = n.data("title-color"),
    u = n.data("font-color"),
    p = n.data("type").toString();
    switch (p) {
    case "2":
        i = n.data("iconbgcolor");
        r = n.data("icontitcolor");
        u = n.data("iconcontcolor")
    }
    i == "transparent" ? ($("#trans").prop("checked", !0), $("#module-bgcolor").css("visibility", "hidden")) : ((i == "" || i == null) && (i = "#ffffff"), $("#trans").prop("checked", !1), $("#module-bgcolor").val(i.colorHex()).css("backgroundColor", i).css("visibility", "visible")); (r == "" || r == null) && (r = "#000000");
    $("#module-title-color").val(r.colorHex()).css("backgroundColor", r); (u == "" || u == null) && (u = "#000000");
    $("#module-font-color").val(u.colorHex()).css("backgroundColor", u);
    t = t || window.event;
    var e = t.clientX || t.pageX,
    w = t.clientY || t.pageY,
    v = document.body.clientWidth;
    return e + 300 + 40 > v && (y = e + 300 + 40 - v, e = e - y - 40),
    $.layer({
        type: 1,
        area: ["auto", "auto"],
        shade: [0],
        title: !1,
        border: [0],
        move: ".diy-drag",
        page: {
            dom: ".diy-module"
        },
        close: function() {
            SF.module.updatelayout()
        },
        offset: [w - 15 + "px", e + 40 + "px"]
    })
}
function ModuleInit() {
 
}
function CountModSelInfo() {
    $("#mod_sel_num").text($(".module-menu-third span.click").length);
    $("#mod_nosel_num").text($(".module-menu-third span").length - $(".module-menu-third span.click").length)
}
function ThemeInit() {
    var n = $("#cur_skin").val(),
    t = $("#cur_layout").val();
    $(".theme-skin>ul>li[data-id='" + n + "']").find("img").addClass("click");
    $(".theme-layout-style[data-id='" + t + "']").addClass("click");
    $(".theme-layout-style[data-id='" + t + "']").data("iscur", "1");
    $(".theme-skin>ul>li[data-id='" + n + "']").data("iscur", "1")
}
function ChangeLayout(n) {
    var u = n,
    t, r, i, h;
    for (SF.box.box.remove_all_widgets(), $(".homepage>ul>li").remove(), t = u.data("mods"), r = u.data("mods"), typeof r == "string" && r.charAt(1) == "," && (t = r.substring(0, 1) + r.substring(2, r.length), t = JSON.parse(t)), layindex = layer.load("\u6b63\u5728\u5207\u6362\u5e03\u5c40", 3), i = 0; i < t.length; i++) {
        var f = t[i].url,
        e = t[i].type,
        c = t[i].title,
        tt = t[i].style,
        l = t[i].size_x,
        a = t[i].size_y,
        o = t[i].col,
        s = t[i].row,
        v = t[i].bgcolor,
        y = t[i].titleColor,
        p = t[i].fontColor,
        w = t[i].alltypes,
        b = t[i].iconbgcolor,
        k = t[i].iconcontcolor,
        d = t[i].icontitcolor,
        g = t[i].linkurl,
        nt = t[i].linkid;
        SF.box.box.add_widget('<li class="gs-w"  data-url="' + f + '"  data-type="' + e + '" data-alltypes="' + w + '" data-title="' + c + '" data-col="' + o + '"data-row="' + s + '"data-bgcolor="' + v + '"data-font-color="' + p + '"data-title-color="' + y + '"data-iconbgcolor="' + b + '"data-iconcontcolor="' + k + '"data-icontitcolor="' + d + '"data-linkurl="' + g + '"data-linkid="' + nt + '"><\/li>', l, a, o, s);
        h = $(".homepage>ul>li[class=gs-w][data-url='" + f + "'][data-type='" + e + "']");
        SF.box.reflesh(h)
    }
}
function IframeCall(n, t, i) {
    SF.tab.addTab(n, t, i, !0, !1, !0)
}
function IframeMsg(n, t) {
    n == "alert" ? layer.alert(t, -1, "\u7cfb\u7edf\u63d0\u793a") : n == "msg" ? layer.msg(t, 2) : n == "confirm" && layer.confirm(t,
    function() {
        return ! 0
    },
    function() {
        return ! 1
    })
}
function IframeUpdateLinkUrl(n, t, i) {
    me = $(".homepage>ul>li[data-linkid='" + n + "']");
    var r = t,
    u = i;
    me.data("title", u);
    me.data("linkurl", r);
    SF.box.reflesh(me);
    SF.module.updatelayout()
}
function initRightMenu() {
    var n = $("#lock_rightmenu"),
    t = $.cookie("MenuLock");
    t != "unlock" ? (n.addClass("shortcut-lock").removeClass("shortcut-unlock"), righMenuShow()) : (n.addClass("shortcut-unlock").removeClass("shortcut-lock"), rightMenuHide())
}
function resizeRightMenu() {
    $(".right").css("height", $(window).height())
}
function righMenuShow() {
    var n = $.cookie("MenuLock");
    n != "unlock" && ($(".tools").addClass("right-menu-margin"), $(".tab-box-more").addClass("right-menu-margin"), $(".content").addClass("right-menu-margin"), $(".right").css("height", $(window).height()), $(".module-right").css("margin-right", "20px"), $(".module-right-button").css("margin-right", "20px"), $(".module-right-content").css("margin-right", "20px"))
}
function rightMenuHide() {
    $(".right").stop().fadeOut("slow");
    $(".tools").removeClass("right-menu-margin");
    $(".tab-box-more").removeClass("right-menu-margin");
    $(".content").removeClass("right-menu-margin");
    $(".right").css("height", $(window).height());
    $(".module-right").css("margin-right", "0");
    $(".module-right-button").css("margin-right", "0");
    $(".module-right-content").css("margin-right", "0")
}
function lockLoginCenter() {
    var n = $(window).height(),
    t = $(window).width(),
    r = $(window).scrollTop(),
    i = $(window).scrollLeft();
    $("#lockArea").css("width", t + i);
    $("#lockArea").css("height", n + r);
    $("#lockLogin").css("top", n * .3);
    $("#lockLogin").css("left", (t - 400) / 2 + i);
    $(".pwd_input").val("")
}
function isLockScreen() {
	$.ajax({
        type: "POST",
        url: "menu/lock.do",
        data: {
            type: "0",
        },
        success: function(n) {
        	if(n=='true'){
	        	$("#lockArea").show();
	        	$("#lockLogin").show();
        	}else{
        		$("#lockArea").hide();
	        	$("#lockLogin").hide();
        	}
        }
    })
}
function unLockScreen() {
    var n = $(".pwd_input");
    $.ajax({
        type: "POST",
        url: "menu/lock.do",
        data: {
            type: "1",
            psd: n.val()
        },
        success: function(t) {
        	if(t=='true'){
        		$("#lockArea").hide();
        		$("#lockLogin").hide();
        	}else if(t=='0'){
        		alert("会话已过期，请重新登录!");
        		location.reload();
        	}else{
        		alert("密码错误，解锁失败!");
        	}
        }
    })
}
 
function showNormal() {
    layer.close(SF.box.layerIndex);
    $(".module-title li").removeClass("hover");
    $(".theme").slideUp();
    $(".header,.tab-box,.page-sidebar").css({
        position: "fixed"
    });
    $(".page-sidebar").removeClass("before");
    $(".page-content").removeClass("position-absolute");
    $("#sidebar,.tab-box").css({
        top: "60px"
    });
    $("#sidemsg").removeClass("theme-change");
    $(".content").removeClass("margin-top-0");
    SF.tab.ADDENABLED = !0;
    $(".theme-layout-style").removeClass("click");
    $(".theme-skin img").removeClass("click");
    $(".module-left-content>ul>li").removeClass("click");
    $(".module-menu-third span").removeClass("click")
}
function closeWindows() {
    var i = navigator.appName,
    r = parseInt(navigator.appVersion),
    n,
    t;
    if (i == "Microsoft Internet Explorer") n = document.all && !window.opera && window.XMLHttpRequest ? !0 : !1,
    n ? (window.open("", "_parent", ""), window.close()) : (this.focus(), self.opener = this, self.close());
    else {
        try {
            this.focus();
            self.opener = this;
            self.close()
        } catch(u) {}
        try {
            window.open("", "_self", "");
            window.close()
        } catch(u) {}
        try {
            t = window.open("tmppage.htm", "_self");
            t.close()
        } catch(u) {}
    }
}
function setIfrmeStyle(n, t) {
    var b = n.data("linkid"),
    i = window.frames[b],
    e,
    v,
    s,
    h,
    l,
    a,
    y,
    w;
    if (i != undefined) {
        if ($(".diy-module table tr").eq(0).hide(), $(".diy-module table tr").eq(1).hide(), $(".diy-module table tr").eq(4).hide(), $("#trans").hide(), $("label[for='trans']").hide(), $(".diy-module-type input").removeAttr("checked"), $(".diy-module-type span").hide(), e = n.data("alltypes"), v = n.data("type"), (e != undefined || e != null) && e.length > 1 && (s = e.split(","), s.length > 0)) for (h = 0; h < s.length; h++) if (l = s[h], l != "") $(".diy-module-type span[data-type='" + l + "']").show();
        else break;
        a = $(".diy-module-type span[data-type='" + v + "']");
        a.show();
        a.find("input").prop("checked", !0);
        n.attr("id") || (y = "existswidget-" + parseInt(Math.random() * 1e6), n.attr("id", y));
        $("#for-newli").val(n.attr("id"));
        $("#diy-module-title").val(n.attr("data-title"));
        var r = "",
        f = "",
        u = "";
        i != undefined && (i.contentWindow != null && i.contentWindow != undefined ? (r = i.contentWindow.getBgColor(), u = i.contentWindow.getContColor()) : (r = i.getBgColor(), u = i.getContColor()), f = n.parent().find(".box-content-title").css("color"));
        r == "transparent" ? ($("#trans").prop("checked", !0), $("#module-bgcolor").css("visibility", "hidden")) : ((r == "" || r == null) && (r = "#ffffff"), $("#trans").prop("checked", !1), $("#module-bgcolor").val(r.colorHex()).css("backgroundColor", r).css("visibility", "visible")); (f == "" || f == null) && (f = "#000000");
        $("#module-title-color").val(f.colorHex()).css("backgroundColor", f); (u == "" || u == null) && (u = "#000000");
        $("#module-font-color").val(u.colorHex()).css("backgroundColor", u);
        var c = t || window.event,
        o = c.clientX || c.pageX,
        k = c.clientY || c.pageY,
        p = document.body.clientWidth;
        return o + 300 + 40 > p && (w = o + 300 + 40 - p, o = o - w - 40),
        $.layer({
            type: 1,
            area: ["auto", "auto"],
            shade: [0],
            title: !1,
            border: [0],
            move: ".diy-drag",
            page: {
                dom: ".diy-module"
            },
            close: function() {
                SF.module.updatelayout()
            },
            offset: [k - 15 + "px", o + 40 + "px"]
        })
    }
}
function launchFullScreen() {
    var n = document.documentElement;
    n.requestFullScreen ? n.requestFullScreen() : n.mozRequestFullScreen ? n.mozRequestFullScreen() : n.webkitRequestFullScreen ? n.webkitRequestFullScreen() : n.msRequestFullscreen && n.msRequestFullscreen()
}
function cancelFullscreen() {
    document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen()
}
 
function closeToDoModel() {
    $("#mod_task_run").hide().removeClass("in")
}
SF.menu = {};
SF.menu.right = {
    isModifyFav: !1,
    isInitRightLink: !1,
    tipIndex: 0,
    isAddTip: !1,
    scrollInterval: 0,
    upStep: 2,
    initMarginTop: 245,
    footHeight: 260,
    init: function(n) {
        var t = this,
        i, u, f;
        $(".new-right-menu li").on("mouseenter",
        function() {
            var n = $(this),
            i = n.data("position"),
            r = "margin:0 22px -10px 0;";
            i == undefined && (i = 3, r = "");
            t.tipIndex = layer.tips(n.find(".shortcut-title").html(), n, {
                style: ["opacity:0.8;max-width:300px;" + r + " background-color:#000000; color:#fff", "#000000"]
            })
        }).on("mouseleave",
        function() {
            layer.close(t.tipIndex)
        }).mouseleave(function() {
            t.isModifyFav && !$("#edit-menu-tool").is(":visible") && t.saveShortcut();
            $(".shortcut-arrow").hide();
            var n = $("#cust-shortcut");
            $(window).height() - t.initMarginTop - t.footHeight > n.height() && n.css("marginTop", t.initMarginTop + "px")
        }).mouseenter(function() {
            var n = $("#cust-shortcut").height();
            $arrow = $(".shortcut-arrow");
            $(window).height() - t.initMarginTop - t.footHeight < n && $arrow.show()
        });
        $(".shortcut-foot .arrow-down").hover(function() {
            var n = $(".cust-add:last"),
            i = $(".shortcut-foot .arrow-down");
            t.scrollInterval = setInterval(function() {
                if (n.offset().top + 47 > i.offset().top) {
                    var r = $("#cust-shortcut"),
                    u = parseInt(r.css("marginTop"));
                    u -= t.upStep;
                    r.css("marginTop", u + "px")
                }
            },
            100)
        },
        function() {
            clearInterval(t.scrollInterval);
            t.upStep = 2
        }).click(function() {
            t.upStep < 20 && (t.upStep += 2)
        }).bind("selectstart",
        function() {
            return ! 1
        });
        $(".shortcut-header .arrow-up").hover(function() {
            var n = $(".cust-add:first"),
            i = $(".shortcut-header .arrow-up");
            t.scrollInterval = setInterval(function() {
                if (n.offset().top < i.offset().top + 21) {
                    var r = $("#cust-shortcut"),
                    u = parseInt(r.css("marginTop"));
                    u += t.upStep;
                    r.css("marginTop", u + "px")
                }
            },
            100)
        },
        function() {
            clearInterval(t.scrollInterval);
            t.upStep = 2
        }).click(function() {
            t.upStep < 20 && (t.upStep += 2)
        }).bind("selectstart",
        function() {
            return ! 1
        });
        $("#add-shortcut").click(function() {
            $.cookie("MenuLock", "lock", {
                expires: 365
            });
            $("#lock_rightmenu").removeClass("shortcut-unlock").addClass("shortcut-lock");
            righMenuShow();
            $(".nav-box .nav-cont").addClass("add").show().parent().parent().addClass("active");
            $("#cust-shortcut").addClass("add");
            $("#edit-menu-tool").show();
            t.isAddTip || (layer.tips("\u63d0\u793a\uff1a\u70b9\u51fb\u201c+\u201d\u6dfb\u52a0\u94fe\u63a5\u5230\u53f3\u4fa7\u5bfc\u822a", $(".nav-cont-right ul:visible:first .link .add-fav:first"), {
                style: ["background-color:#66ccff; color:#fff", "#66ccff"],
                guide: 0,
                time: 3
            }), t.isAddTip = !0);
            hidePageObject()
        });
        $("#exit-edit-menu").click(function() {
            $(this).parent().hide();
            $(".nav-box .nav-cont").removeClass("add").hide().parent().parent().removeClass("active");
            $("#cust-shortcut").removeClass("add");
            t.isModifyFav && t.saveShortcut();
            showPageObject()
        });
        $(".nav-cont-right a.link .add-fav").click(function(n) {
            var r, o;
            n.stopPropagation();
            var s = $(this),
            h = $("#cust-shortcut"),
            u = s.parent(),
            f = u.text(),
            c = u.data("url"),
            e = u.data("id"),
            i = h.find(".cust-add>a[data-menu-id=" + e + "]");
            i.length == 0 ? (i = t.addRightShortcut(c, e, f, f.substring(0, 1)), t.isModifyFav = !0, t.scrollEnd(i)) : (r = 0, o = setInterval(function() {
                r % 2 == 0 ? i.css("backgroundColor", "red") : i.css("backgroundColor", "transparent");
                r == 7 && (i.css("backgroundColor", "transparent"), clearInterval(o));
                r++
            },
            300))
        }).attr("title", "\u6dfb\u52a0\u83dc\u5355\u5230\u53f3\u4fa7\u5bfc\u822a");
      
        $("#full-menu-title").blur(function() {
            var n = $(this),
            t = $("#short-menu-title");
            n.val() != "" && t.val() == "" && t.val(n.val().substring(0, 1))
        });
        $("#cust-shortcut").disableSelection().sortable({
            stop: function() {
                t.isModifyFav = !0;
                layer.closeTips()
            },
            start: function() {
                layer.closeTips()
            },
            axis: "y",
            distance: 5,
            cursor: "move",
            cancel: ".del-fav"
        });
        var r = n.split(","),
        o = $("#mylink-link"),
        e = $("#changyong");
        $("#mylink").hover(function() {
            $(".mylink .tip-arrow-right").show();
            $(".mylink .mylink-content").show();
            $(".mylink .fill").show()
        },
        function() {
            $(".mylink .tip-arrow-right").hide();
            $(".mylink .mylink-content").hide();
            $(".mylink .fill").hide()
        })
    },
    scrollEnd: function(n) {
        var t = $("#add-shortcut").offset().top,
        i;
        n.offset().top + 47 > t + 14 && (i = setInterval(function() {
            if (n.offset().top + 47 > t) {
                var u = $("#cust-shortcut"),

                r = parseInt(u.css("marginTop"));
                r = r - 47;
                u.css("marginTop", r + "px")
            } else clearInterval(i)
        },
        1))
    },
    saveShortcut: function() {
        var n = "",
        t = "",
        i = "",
        r = "";
        $("#cust-shortcut .cust-add>a").each(function() {
            var u = $(this);
            n += u.siblings(".shortcut-title").text().replace(/\|/g, "\u258f") + "|";
            t += u.data("menu-id") + "|";
            i += u.text().replace(/\|/g, "\u258f") + "|";
            r += u.data("url").replace(/\|/g, "%7C") + "|"
        });
        $.post(location.pathname, {
            saveShortcutLink: 1,
            url: r,
            shorttitle: i,
            menuid: t,
            fulltitle: n
        });
        this.isModifyFav = !1
    },
    addRightShortcut: function(n, t, i, r) {
        var f = ' data-menu-id="' + t + '"',
        e, u, o;
        return t == 0 && (f += " data-out-id='" + (new Date).format("yyyyMMddHHmmssS") + parseInt(Math.random() * 1e4) + "'"),
        e = ' <div class="shortcut-link cust-add" ><span class="del-fav"><\/span><a data-url="' + n + '" ' + f + ' href="javascript:void(0)">' + r + '<\/a><div class="shortcut-title">' + i + "<\/div> <\/div>",
        u = $("#cust-shortcut").append(e).find(".cust-add:last"),
        this.isInitRightLink && (o = $.cookie("dragtip"), typeof $.cookie("dragtip") == "undefined" && ($.cookie("dragtip", 1, {
            expires: 365
        }), layer.tips("\u63d0\u793a\uff1a\u62d6\u52a8\u53ef\u4ee5\u6392\u5217\u987a\u5e8f\uff0c\u70b9\u51fb\u53ef\u4fee\u6539\u5bfc\u822a\u4fe1\u606f\u3002", u, {
            style: ["background-color:#66ccff; color:#fff", "#66ccff"],
            guide: 0,
            time: 5
        }))),
        u
    }
};


 
$(function() {
    var e, t, f, s, h, n;
    SF.tab.init();
    $("#msg-main-container .right-content").preventScroll();
    $("#detail-tip-list").preventScroll();
    $(".msg-list").each(function() {
        $(this).preventScroll()
    });
    e = $(".sidebar-menu li");
    resizeMenu();
    resizeUserList();
    resizeIframe();
    initRightMenu();
    isLockScreen();
    lockLoginCenter();
    resizeTipHeight();
    $(window).resize(function() {
        resizeMenu();
        resizeUserList();
        SF.tab.view();
        resizeIframe();
        resizeRightMenu();
        lockLoginCenter();
        resizeTipHeight()
    });
    $(window).scroll(function() {
        lockLoginCenter()
    });
    $("a.linktab").on("click",
    function() {
        var n = $(this);
        $("#edit-menu-tool").is(":visible") || (SF.tab.addTab("mainmenu" + n.data("id"), n.text(), n.data("url"), !0, !1, !0), $(".submenu a.active").removeClass("active"))
    });
    $("#search-box").mouseenter(function() {
        var n = $(this);
        n.addClass("search-box-mouseover");
        $(".search-img-img").addClass("search-img-img-over");
        n.stop().animate({
            width: "300px"
        },
        "fast", "",
        function() {
            $("#search-text").show();
            $("#search-option").show();
            $("#search-text-input").focus();
            $("#search-text").on("mouseenter",
            function() {
                $(this).find(".systemtip-option").show()
            }).on("mouseleave",
            function() {
                $(this).find(".systemtip-option").hide()
            });
            $("#search-text").find(".systemtip-option").on("click",
            function() {
                $("#search-text-input").val("")
            })
        })
    }).mouseleave(function() {
        if (!$("#search-text-input").is(":focus") || $("#search-text-input").val() == "") {
            var n = $(this);
            $("#search-dropdown").hide();
            $("#search-text").hide();
            $("#search-option").hide();
            $("#search-box").stop().animate({
                width: "50px"
            },
            "fast", "",
            function() {
                $("#search-box").removeClass("search-box-mouseover");
                $(".search-img-img").removeClass("search-img-img-img-over")
            })
        }
    });
    $(".search-img-img").click(function() {
        SF.tab.addTab("search", "\u641c  \u7d22", "seach.do?type=" + $("#search-type").text() + "&s=" + $("#search-text-input").val(), !0, !1, !0)
    });
    $("#search-dropdown-list").find("li").hover(function() {
        $(this).addClass("search-dropdown-li-mouseover")
    },
    function() {
        $(this).removeClass("search-dropdown-li-mouseover")
    });
    $("#search-dropdown-list li").click(function() {
        var n = $(this);
        n.addClass("search-dropdown-li-selected").siblings().removeClass("search-dropdown-li-selected");
        $("#search-type").text(n.text());
        $("#search-text-input").focus();
        $("#search-dropdown").hide()
    });
    $("#search-option").click(function() {
        var n = $("#search-dropdown");
        n.is(":visible") ? n.hide() : n.show()
    });
    $("#update-pw").click(function() {
        $.layer({
            type: 2,
            shadeClose: !0,
            title: ["\u4fee\u6539\u5bc6\u7801", "background:" + $(".header").css("background-color") + ";"],
            closeBtn: [0, !0],
            shade: [.5, "#000"],
            border: [0],
            offset: ["20px", $(window).width() - 550 + "px"],
            area: ["500px", "250px"],
            iframe: {
                src: "system/editPwd.do"
            },
            success: function() {}
        })
    });
    $("#waiting-work").hover(function() {
        $(this).find(".count").is(":visible") && ($("#tip-div").show(), hidePageObject())
    },
    function() {
        $("#tip-div").hide();
        showPageObject()
    });
/*    $(".person-album-pics img").click(function() {
        url = "Album/PhotoList?UserId=" + $(this).data("usercode") + "&TypeId=" + $(this).data("typeid");
        SF.tab.addTab("personalbum", "\u6211\u7684\u76f8\u518c", url, !0, !1, !1)
    });*/
    $(".person-info-name").click(function() {});
    var i = 1,
    c = $(".album-pics>ul>li").length,
    r = Math.ceil(c / 4),
    o = $(".person-album-pics").width(),
    u = $(".album-pics"),
    l = $(".person-arrow-right");
    if (r > 1 ? $(".person-arrow-right").show() : $(".person-arrow-right").hide(), l.click(function() {
        u.is(":animated") || (i == 1 ? (u.animate({
            left: "-=" + o * (r - 1)
        },
        500), i = r) : (u.animate({
            left: "+=" + o
        },
        500), i--))
    }), $("#person-option-setting,.person-info-photo").click(function() {
        SF.tab.addTab("personset", "\u4e2a\u4eba\u4e2d\u5fc3", "system/FirstPageInfo.aspx?tabindex=3", !0, !1, !1)
    }), $("#person-option-lock").click(function() {
        var n = $(this).parent().data("usercode");
        $.ajax({
            type: "POST",
            url: "menu/lock.do",
            data: {
                type: "2",
            },
            success: function(n) {
                 if(n=='true'){
                	 $("#lockArea").show();
                     $("#lockLogin").show();
                 }
            }
        })
    }), $(".jq_lockscreen").click(function() {
        unLockScreen()
    }), $(".pwd_input").bind("keyup",
    function(n) {
        n.keyCode == 13 && unLockScreen()
    }), $("#person-option-logoff").click(function() {
        try {
            $.connection.hub.stop();
            window.location.href = "loginoff.do"
        } catch(n) {
            window.location.href = "loginoff.do"
        }
    }), $("#person-option-signout").click(function() {
        closeWindows()
    }), t = $(".info-post"), t.children().length > 0) {
        $("#update-gw").show();
        $("#update-gw").on("click mouseover",
        function(n) {
            $(".info-post").show();
            n.stopPropagation()
        });
        $(".info-post li").hover(function() {
            $(this).addClass("info-post-li-hover")
        },
        function() {
            $(this).removeClass("info-post-li-hover")
        }).click(function(n) {
            var t = $(this);
            n.stopPropagation()
        });
        $(".info-zhiwei").click(function() {
            t.toggle()
        });
        $(".info-zhiwei").mouseleave(function() {
            t.hide()
        })
    } else $("#update-gw").hide();
    $("#theme-btn").click(function() {
        $(".header,.tab-box,.page-sidebar").css({
            position: "relative"
        });
        $(".page-sidebar").addClass("before");
        $(".page-content").addClass("position-absolute");
        $("#sidebar,.tab-box").css({
            top: "0px"
        });
        $("#sidemsg").addClass("theme-change");
        $("#msg-container,#sidemsg").removeClass("open");
        $(".theme").slideDown();
        $(".content").addClass("margin-top-0");
        ThemeInit();
        SF.tab.addTab("mainmenuindex", "", "", !0, !1, !0, !1);
        SF.tab.ADDENABLED = !1;
        SF.box.lastHTML = $(".homepage>ul").html()
    });
    $(".theme-skin li").click(function() {
        $(".theme-skin").find("img").removeClass("click");
        $(this).find("img").removeClass("hover");
        $(this).find("img").addClass("click");
        var n = $(this).data("code"),
        t = $(this).data("id");
        changeCss(n, t);
        $(".xubox_title").css({
            background: $(this).find("img").css("background-color")
        })
    });
    $(".theme-skin li").hover(function() {
        $(this).find("img").hasClass("click") || $(this).find("img").addClass("hover")
    },
    function() {
        $(this).find("img").removeClass("hover")
    });
     
    $(".theme-layout-style").hover(function() {
        $(this).hasClass("click") || $(this).addClass("hover")
    },
    function() {
        $(this).removeClass("hover")
    });
    $(".module-left-content>ul>li").click(function() {
        $(this).siblings().removeClass("click");
        $(this).addClass("click");
        var n = $(this).data("id"),
        t = $(this).data("modtype");
        $(".module-right-content ul").hide();
        $(".module-right-content ul[data-parentid=" + n + "][data-parenttype=" + t + "]").show()
    });
    $(".module-left-content>ul>li").hover(function() {
        $(this).addClass("hover")
    },
    function() {
        $(this).removeClass("hover")
    });
    $(".module-menu-third span").hover(function() {
        $(this).addClass("hover")
    },
    function() {
        $(this).removeClass("hover")
    });
    $(".module-menu-third span").click(function() {
        var n = $(this),
        f = n.data("ismutli"),
        u,
        i,
        t,
        r;
        if (f == "1") {
            n.addClass("click");
            i = "";
            $(this).data("type") == "4" && (i = n.text());
            $("#diy-module-title").val(i);
            t = "custom-" + parseInt(Math.random() * 1e6 + (new Date).getTime());
            $(this).attr("data-id", t);
            u = "";
            SF.box.box.add_widget('<li id="' + t + '" class="newwidget" data-linkid="' + t + '" data-linkurl="' + u + '" class="newwidget"  data-url="' + n.data("url") + '"  data-type="' + n.data("type") + '"data-alltypes="' + $(this).data("alltypes") + '" data-title="' + i + '" data-skin="' + $("#cur_skin").val() + '"><\/li>', n.data("sizex"), n.data("sizey"));
            r = $(".homepage>ul>li:last");
            SF.box.reflesh(r);
            return
        }
        if (n.hasClass("click")) {
            n.removeClass("click");
            $('.newwidget[data-url="' + n.data("url") + '"]').length != 0 ? (SF.box.remove($('.newwidget[data-url="' + n.data("url") + '"]')), layer.close(SF.box.layerIndex)) : $('.gs-w[data-url="' + n.data("url") + '"]').length != 0 && (SF.box.remove($('.gs-w[data-url="' + n.data("url") + '"]')), layer.close(SF.box.layerIndex));
            return
        }
        n.addClass("click");
        i = n.text();
        $("#diy-module-title").val(i);
        t = "newwidget-" + parseInt(Math.random() * 1e6 + (new Date).getTime());
        $(this).attr("data-id", t);
        SF.box.box.add_widget('<li id="' + t + '" class="newwidget"  data-url="' + n.data("url") + '"  data-type="' + n.data("type") + '"data-alltypes="' + $(this).data("alltypes") + '" data-title="' + n.data("title") + '" data-skin="' + $("#cur_skin").val() + '"><\/li>', n.data("sizex"), n.data("sizey"));
        r = $(".homepage>ul>li:last");
        SF.box.reflesh(r);
        $("#mod_sel_num").text($(".module-menu-third span.click").length);
        $("#mod_nosel_num").text($(".module-menu-third span").length - $(".module-menu-third span.click").length)
    });
    $(".module-btn").hover(function() {
        $(this).addClass("hover")
    },
    function() {
        $(this).removeClass("hover")
    });
    $(".module-btn-save").hover(function() {
        $(this).addClass("hover")
    },
    function() {
        $(this).removeClass("hover")
    });
    $("#module-btn-save").click(function() {
        layer.close(SF.box.layerIndex);
        $(".theme-module").hide();
        $(".theme-skin").show();
        $(".theme-layout").show();
        $(".type-save").show();
        SF.box.enabled = !1
    });
    $("#module-btn-goback").click(function() {
        layer.close(SF.box.layerIndex);
        $("#module-btn-recover").click();
        $(".theme-module").hide();
        $(".theme-skin").show();
        $(".theme-layout").show();
        $(".type-save").show()
    });
    $("#module-btn-clear").click(function() {
        $(".module-menu-third span.click").each(function() {
            $(this).removeClass("click")
        });
        SF.box.box.remove_all_widgets();
        CountModSelInfo()
    });
    $("#module-btn-recover").click(function() {
        var i = "",
        c = $(".theme-layout-style").filter(".click").data("id"),
        n,
        t,
        h;
        if (c == "1" ? i = $("#json_mods").val() : (i = $(".theme-layout-style").filter(".click").data("mods"), i = JSON.stringify(i)), i != "" && i != "undefined") for (n = $.parseJSON(i), $(".newwidget").each(function() {
            for (var t, r = !0,
            i = 0; i < n.length; i++) $(this).data("url") == n[i].url && (r = !1);
            r && (t = $(this), SF.box.remove(t), layer.close(SF.box.layerIndex), $('.module-menu-third span[data-url="' + t.data("url") + '"][data-title="' + t.data("title") + '"][data-type="' + t.data("type") + '"]').removeClass("click"))
        }), n = $.parseJSON(i), t = 0; t < n.length; t++) {
            var r = n[t].url,
            u = n[t].type,
            f = $('.gs-w[data-url="' + r + '"][data-type="' + u + '"]');
            if (f.length == 0 && f != undefined && f != null) {
                var e = n[t].title,
                tt = n[t].style,
                l = n[t].size_x,
                a = n[t].size_y,
                o = n[t].col,
                s = n[t].row,
                v = n[t].bgcolor,
                y = n[t].titleColor,
                p = n[t].fontColor,
                w = n[t].alltypes,
                b = n[t].iconbgcolor,
                k = n[t].iconcontcolor,
                d = n[t].icontitcolor,
                g = n[t].linkurl,
                nt = n[t].linkid;
                SF.box.box.add_widget('<li class="gs-w"  data-url="' + r + '"  data-type="' + u + '" data-alltypes="' + w + '" data-title="' + e + '" data-col="' + o + '"data-row="' + s + '"data-bgcolor="' + v + '"data-font-color="' + p + '"data-title-color="' + y + '"data-iconbgcolor="' + b + '"data-iconcontcolor="' + k + '"data-icontitcolor="' + d + '"data-linkurl="' + g + '"data-linkid="' + nt + '"><\/li>', l, a, o, s);
                h = $(".homepage>ul>li[class=gs-w][data-url='" + r + "'][data-type='" + u + "']");
                SF.box.reflesh(h);
                $('.module-menu-third span[data-url="' + r + '"][data-title="' + e + '"][data-type="' + u + '"]').addClass("click")
            }
        }
    });
    $("#save-cancle").click(function() {
        var i = $(".theme-layout-style").filter(".click").data("id"),
        n,
        t;
        recoverCss();
        $(".theme-layout-style").each(function() {
            $(this).data("iscur") == "1" && (n = $(this).data("id"), t = $(this))
        });
        i != n && n != undefined ? (showNormal(), ChangeLayout(t)) : ($("#module-btn-recover").click(), showNormal());
        $(".xubox_title").css({
            background: $(".header").css("background-color")
        });
        $(".drag-module").css("display", "none")
    });
    $("#save-theme").click(function() {
        var t = $(".theme-skin>ul>li img").filter(".click").parent().data("id"),
        n = $(".theme-layout-style").filter(".click").data("id");
        saveCss();
        n != "1" && $("#IndexPower").val() == "1" ? (layer.confirm("\u662f\u5426\u4fee\u6539\u6b64\u9ed8\u8ba4\u4e3b\u9898\uff1f",
        function() {
            UpdateTheme()
        },
        function() {
            $("#module-btn-recover").click();
            showNormal()
        }), $(".xubox_dialog").find(".xubox_msgico").hide(), $(".xubox_dialog").find(".xubox_text").css({
            "padding-left": "90px"
        }), $(".xubox_border").css({
            background: "transparent"
        }), $(".xubox_botton").find(".xubox_no").css({
            background: "#F2F2F2",
            color: "#666",
            border: "1px solid #ccc",
            "font-weight": "400"
        }), $(".xubox_title,.xubox_botton .xubox_yes").css({
            background: $(".header").css("background-color")
        })) : SaveTheme()
    });
    $(".type-save input").hover(function() {
        $(this).addClass("hover")
    },
    function() {
        $(this).removeClass("hover")
    });
    $(".colorpick").each(function() {
        var n = $(this).val().replace("#", "");
        $(this).colpick({
            submitText: "\u786e\u5b9a",
            layout: "hex",
            color: n,
            onSubmit: function(n, t, i, r) {
                var f = "#" + t,
                o, e;
                $(r).css("backgroundColor", f).val(f).colpickHide();
                var u = $("#" + $("#for-newli").val()),
                h = $(r).attr("id").replace("module", "data"),
                s = u.data("type");
                switch (h) {
                case "data-bgcolor":
                    u.css("backgroundColor", f);
                    switch (s.toString()) {
                    case "1":
                        u.data("bgcolor", $("#module-bgcolor").css("backgroundColor"));
                        break;
                    case "2":
                        u.data("iconbgcolor", $("#module-bgcolor").css("backgroundColor"));
                        break;
                    case "4":
                        o = u.data("linkid");
                        e = window.frames[o];
                        e.contentWindow != null && e.contentWindow != undefined ? e.contentWindow.setBgColor($("#module-bgcolor").css("backgroundColor")) : e.setBgColor($("#module-bgcolor").css("backgroundColor"));
                        u.data("bgcolor", $("#module-bgcolor").css("backgroundColor"))
                    }
                    break;
                case "data-title-color":
                    u.find(".title-color").css("color", f);
                    switch (s.toString()) {
                    case "1":
                        u.find(".box-content-hr").css("borderColor", f);
                        u.find(".box-option").css("color", f);
                        u.data("title-color", $("#module-title-color").css("backgroundColor"));
                        break;
                    case "2":
                        u.data("icontitcolor", $("#module-title-color").css("backgroundColor"));
                        break;
                    case "4":
                        u.find(".box-content-title").css("color", $("#module-title-color").css("backgroundColor"));
                        u.data("title-color", $("#module-title-color").css("backgroundColor"))
                    }
                    break;
                case "data-font-color":
                    u.find(".font-color").css("color", f);
                    switch (s.toString()) {
                    case "1":
                        u.data("font-color", $("#module-font-color").css("backgroundColor"));
                        break;
                    case "2":
                        u.data("iconcontcolor", $("#module-font-color").css("backgroundColor"));
                        break;
                    case "4":
                        o = u.data("linkid");
                        e = window.frames[o];
                        e.contentWindow.setBgColor($("#module-font-color").css("backgroundColor"));
                        u.data("font-color", $("#module-font-color").css("backgroundColor"))
                    }
                }
            }
        })
    });
    $("#diy-module-title").blur(function() {
        var n = $(this).val(),
        t = $("#" + $("#for-newli").val());
        t.attr("data-title", n).find(".title-color").text(n);
        $(t).data("title", n)
    });
    $(".diy-module-type input").click(function() {
        var u = $(this).attr("value"),
        n = $("#" + $("#for-newli").val());
        n.data("type", u);
        n.attr("data-type", u);
        SF.box.reflesh(n);
        var t = n.data("bgcolor"),
        i = n.data("title-color"),
        r = n.data("font-color");
        switch (n.data("type")) {
        case "2":
            t = n.data("iconbgcolor");
            i = n.data("icontitcolor");
            r = n.data("iconcontcolor")
        }
        t == "transparent" ? ($("#trans").prop("checked", !0), $("#module-bgcolor").css("visibility", "hidden")) : ((t == "" || t == null) && (t = "#ffffff"), $("#trans").prop("checked", !1), $("#module-bgcolor").val(t.colorHex()).css("backgroundColor", t).css("visibility", "visible")); (i == "" || i == null) && (i = "#000000");
        $("#module-title-color").val(i.colorHex()).css("backgroundColor", i); (r == "" || r == null) && (r = "#000000");
        $("#module-font-color").val(r.colorHex()).css("backgroundColor", r)
    });
    $("#trans").click(function() {
        var n = "",
        u = $(this),
        i = $("#module-bgcolor"),
        t,
        r;
        u.is(":checked") ? (n = "transparent", i.css("visibility", "hidden")) : (n = i.val(), i.css("visibility", "visible"));
        t = $("#" + $("#for-newli").val());
        r = $(".diy-module-type input:checked").attr("value");
        r == "1" ? t.data("bgcolor", n) : t.data("iconbgcolor", n);
        t.css("backgroundColor", n)
    });
    $(document).mousemove(function(n) {
        n = n || window.event;
        var t;
        t = n.pageX ? n.pageX: n.clientX + document.body.scrollLeft - document.body.clientLeft;
        t > $(document.body).width() - 5 && righMenuShow()
    });
    $(".right").bind("mouseleave",
    function() {
        $.cookie("MenuLock") == "unlock" && rightMenuHide()
    });
    $("#lock_rightmenu").bind("click",
    function() {
        var t = $(this),
        i = $.cookie("MenuLock"),
        n;
        i != "unlock" ? (n = "unlock", t.removeClass("shortcut-lock").addClass("shortcut-unlock")) : (n = "lock", t.removeClass("shortcut-unlock").addClass("shortcut-lock"));
        $.cookie("MenuLock", n, {
            expires: 365
        });
        righMenuShow()
    });
    $(".jq_scroll_top").bind("click",
    function() {
        scrollTo(0, 0);
        $(".framecontent").find("iframe").each(function(n, t) {
            var i = $(t).attr("id");
            window.frames[i].contentWindow ? window.frames[i].contentWindow.scrollTo(0, 0) : window.frames[i].scrollTo(0, 0)
        })
    });
    f = $("#systiptype").val(); (f == "1" || f == "3") && (s = $.cookie("systemtipclose"), s == "true" ? (h = $.cookie("systemtip"), n = $(".systemtip-content span").text(), n != "" && n != "undefined" && h != n && $(".systemtip").animate({
        top: 5
    },
    "slow",
    function() {
        $(".systemtip").show()
    })) : (n = $(".systemtip-content span").text(), n != "" && n != "undefined" && $(".systemtip").animate({
        top: 5
    },
    "slow",
    function() {
        $(".systemtip").show()
    })));
    $(".systemtip-option").click(function() {
        $(".systemtip").animate({
            top: -50
        },
        "slow",
        function() {
            $(".systemtip").hide();
            $.cookie("systemtip", $(".systemtip-content span").text(), {
                path: "/",
                expires: 1
            });
            $.cookie("systemtipclose", "true", {
                path: "/",
                expires: 1
            })
        })
    });
    $(".systemtip-option").hover(function() {
        $(this).addClass("hover")
    },
    function() {
        $(this).removeClass("hover")
    })
});
$(function() {})