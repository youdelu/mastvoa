var SF = SF = window.SF || {};
SF.tab = function() {
    var r = function() {},
    n = -1,
    t,
    i = "mainmenuindex";
    return {
        ADDENABLED: !0,
        init: function() {
            $icon = $(".tab-box-more .icon");
            $(".tab-box-more").mouseleave(function() {
                $icon.removeClass("hover");
                $(this).children().not($icon).hide()
            });
            $icon.hover(function() {
                $(this).addClass("hover");
                $(this).siblings().show()
            });
            $(".tab-box-list").disableSelection().sortable({
                axis: "x",
                cancel: ".close",
                distance: 20,
                cursor: "move"
            })
        },
        addTab: function(r, u, f, e, o, s) {
            var h, a, l, it, k, rt, d, g, nt, v, ut, ft, tt, y;
            if (this.ADDENABLED) {
                if (h = f.toLowerCase(), h.indexOf("archiveinfohq.aspx") > -1 || h.indexOf("archiveinfocg.aspx") > -1 || h.indexOf("archiveinfo.aspx") > -1 || h.indexOf("archivewordinfohq.aspx") > -1 || h.indexOf("archivewordinfocg.aspx") > -1 || h.indexOf("archivewordinfo.aspx") > -1) {
                    window.open(f, "");
                    return
                }
                var p = $("#" + i),
                w = $("body"),
                c = $(".framecontent"),
                b = "ifr" + r;
                c.find("iframe").hide();
                a = $('.tab-box-list li[data-tabid="' + r + '"]');
                a.length > 0 ? ($(".tab-box-list li.active").removeClass("active"), l = $(".tab-box-more"), l.is(":visible") && (l.find("li.active").removeClass("active"), l.find("li.active").removeClass("active"), l.find('li[data-tabid="' + r + '"]').addClass("active")), a.removeClass("active-move"), a.addClass("active"), r != i ? (p.hide(), c.show(), w.css("overflow", "hidden"), it = $("#" + b).show(), k = it[0], s && (rt = Math.random(), f += f.indexOf("?") > -1 ? "&": "?", f += "_tmpr=" + rt, k.src = f), (!0 || k.contentWindow.location.href.indexOf(".htm") > -1) && (d = c.height(), c.css("height", d - 1 + "px"), setTimeout(function() {
                    c.css("height", d + "px")
                },
                1))) : (p.show(), c.hide(), w.css("overflow", "auto"))) : (g = "", nt = "", e && (g = 'class="close" onclick="SF.tab.closeTab(\'' + r + "')\"", nt = " ondblclick=SF.tab.closeTab('" + r + "')"), v = $.trim(u.replace(/<[^>]+>/g, "").replace(/'|"/g, "\u2018")), v.length > 6 && (u = v.substring(0, 6) + "..."), ut = '<li class="active"  ' + nt + ' data-tabid="' + r + '"><div class="l" onclick="SF.tab.addTab(&quot;' + r + "&quot;,&quot;" + u + "&quot;,&quot;" + f + "&quot;," + e + "," + o + ',false)" title="' + v + '">' + u + '<\/div><div class="r"><div ' + g + "><\/div><\/div><\/li>", $(".tab-box-list li").removeClass("active"), $(".tab-box-list").append(ut), ft = '<iframe id="' + b + '" src="' + f + '" class="tabiframe" frameborder="no" border="0" marginwidth="0" marginheight="0" ><\/iframe>', p.hide(), c.append(ft).show(), tt = $(".tab-box-list li"), tt.each(function() {
                    $(this).on("mouseenter",
                    function() {
                        $(this).hasClass("active") || $(this).addClass("active-move")
                    }).on("mouseleave",
                    function() {
                        $(this).removeClass("active-move")
                    })
                }), tt.find(".r").each(function() {
                    $(this).on("mouseenter",
                    function() {
                        $(this).addClass("hover-img")
                    }).on("mouseleave",
                    function() {
                        $(this).removeClass("hover-img")
                    })
                }), n != -1 && clearInterval(n), y = $("#div-load").css("width", 0).show(), t = 1, n = setInterval(function() {
                    y.css("width", t + "%");
                    t++;
                    t == 95 && n != -1 && (clearInterval(n), n = -1)
                },
                40), $("#" + b).load(function() {
                    n != -1 && (clearInterval(n), n = -1);
                    y.css("width", "100%");
                    setTimeout(function() {
                        y.hide()
                    },
                    100);
                    $(this).unbind()
                }), w.css("overflow", "hidden"), this.view());
                scrollTo(0, 0);
                showCurPageObject()
            }
        },
        closeTab: function(n) {
            var u = $("[data-tabid='" + n + "']"),
            f = $("#ifr" + n),
            t,
            r;
            f[0].src = "index.htm";
            u.remove();
            f.remove();
            u.hasClass("active") && (t = $(".tab-box-list li").not($("#blank-tab")).last(), t.addClass("active"), r = $("#ifr" + t.data("tabid")), r.length > 0 ? r.show() : ($("#" + i).show(), $("body").css("overflow", "auto"), $(".framecontent").hide()));
            $("#div-load").hide();
            this.view()
        },
        closeCurrent: function() {
            this.closeTab($(".tab-box-list>li.active").data("tabid"))
        },
        view: function() {
            var i, r, u, n;
            $("#blank-tab").remove();
            var t = $(".tab-box-list li"),
            f = document.documentElement.clientWidth,
            e = f - 305;
            if (SF.box.dispalyMenuStyle != 0 && (e = f - 265), i = 0, t.length > 0) for (r = 0, n = 0; n < t.length; n++) if (r += $(t[n]).width() - 2, r > e) {
                i = n;
                break
            }
            if (i > 0) {
                for (u = "", n = i; n < t.length; n++) u += $(t[n]).prop("outerHTML");
                $(t[i - 1]).css("zIndex", 11111);
                $(t[i]).before("<li class='blank' id='blank-tab'><\/li>");
                $(".tab-box-more").show().find(".tab").html(u).find("li").hover(function() {
                    $(this).addClass("hover")
                },
                function() {
                    $(this).removeClass("hover")
                })
            } else $(".tab-box-more").hide()
        }
    }
} ();
SF.box = {
    enabled: !1,
    MAX_COUNT: 20,
    MIN_COLS: 12,
    MAX_COLS: 12,
    DEFAULT_WIDTH: 128,
    count: 0,
    root: null,
    box: null,
    layerIndex: 0,
    dispalyMenuStyle: 0,
    config: null,
    lastHTML: "",
    gridw: 128,
    gridh: 128,
    beforeResizeHeight: 0,
    init: function(n) {
        var u;
        if (n) {
            var t = this,
            r = $(n),
            i = window.document.body.clientWidth - 170;
            SF.box.dispalyMenuStyle != 0 && (i = window.document.body.clientWidth - 55);
            u = $("#sidebar").height() - 110;
            i > 1900 ? (t.gridw = t.DEFAULT_WIDTH, t.gridh = t.DEFAULT_WIDTH) : 1900 > i && i > 1550 ? (t.gridw = parseInt((i - 210) / 12), t.gridh = parseInt((u - 55) / 6)) : i > 2990 ? (t.gridw = 142, t.gridh = 142) : (t.gridw = 96, t.gridh = 96);
            t.root = r;
            t.box = r.gridster({
                widget_margins: [8, 8],
                widget_base_dimensions: [t.gridw, t.gridh],
                min_cols: t.MIN_COLS,
                max_cols: t.MAX_COLS,
                resize: {
                    enabled: !0,
                    start: function(n, i, r) {
                        t.box.$el.find(".drag-module").addClass("move");
                        t.beforeResizeHeight = r.height()
                    },
                    resize: function(n, i, r) {
                        SF.module.changeStyle(r);
                        t.box.$el.find(".drag-module").addClass("move")
                    },
                    stop: function(n, i, r) {
                        var u, f;
                        SF.module.changeStyle(r);
                        t.box.$el.find(".drag-module").removeClass("move");
                        t.beforeResizeHeight != r.height() && (u = r.find("iframe"), u.length > 0 && u[0].contentWindow.resizeData && u[0].contentWindow.resizeData());
                        t.beforeResizeWidth != r.width() && (u = r.find("iframe"), u.length > 0 && u[0].contentWindow.resizeDoByWidth && u[0].contentWindow.resizeDoByWidth());
                        f = parseInt(r.data("type"));
                        f == 1 && t.reflesh(r);
                        SF.module.updatelayout()
                    }
                },
                serialize_params: function(n, t) {
                    return {
                        col: t.col,
                        row: t.row,
                        size_x: t.size_x,
                        size_y: t.size_y,
                        url: n.data("url"),
                        bgcolor: n.data("bgcolor"),
                        titleColor: n.data("title-color"),
                        fontColor: n.data("font-color"),
                        type: n.data("type"),
                        title: n.data("title"),
                        alltypes: n.data("alltypes"),
                        iconbgcolor: n.data("iconbgcolor"),
                        iconcontcolor: n.data("iconcontcolor"),
                        icontitcolor: n.data("icontitcolor"),
                        linkurl: n.data("linkurl"),
                        linkid: n.data("linkid")
                    }
                },
                draggable: {
                    handle: "h1",
                    start: function() {
                        t.box.$el.find(".drag-module").addClass("move")
                    },
                    drag: function() {},
                    stop: function() {
                        t.box.$el.find(".drag-module").removeClass("move");
                        SF.module.updatelayout()
                    }
                }
            }).data("gridster");
            SfMenu.option.isChange && r.children("li").each(function() {
                t.reflesh($(this));
                SF.module.changeStyle($(this))
            });
        }
    },
    remove: function(n) {
        var t = n.attr("id"),
        i;
        t && $(".module-title li[data-id='" + t + "']").removeClass("hover");
        n.find("iframe").data("type") == "note" && (i = n.find("iframe").attr("id"), SF.module.updateNote(i));
        this.box.remove_widget(n);
        layer.close(this.layerIndex);
        $(".module-menu-third span[data-url='" + n.data("url") + "'][data-type='" + n.data("type") + "']").removeClass("click");
        CountModSelInfo();
        SF.module.updatelayout()
    },
    reflesh: function(n) {
        var t, e, a, l, r, h, u, s, f;
        n.html('<div class="load-user"><\/div>');
        t = n.data("title"); (t == "\u4fbf\u7b3a" || t == "\u6211\u7684\u4fbf\u7b3a") && (t = "\u6211\u7684\u5907\u5fd8");
        var c = n.data("url"),
        v = parseInt(n.data("type")),
        o = $("#SysDefautSkin").val(),
        y = $(".theme-skin>ul>li img").filter(".click").parent(),
        i = y.data("id");
        i = i != undefined ? i: $("#cur_skin").val();
        e = $("#cur_layout").val();
        a = $(".theme-skin>ul>li[data-id='" + i + "']").find("img").css("backgroundColor");
        switch (v) {
        case 1:
            if (c) try {
                $.getJSON(n.data("url"), {
                    skin: i
                },
                function(r) {
                    var g = r.data.length,
                    u = "",
                    k = "fromtitle_" + (new Date).format("HHmmssS") + parseInt(Math.random() * 1e7),
                    d = "SF.tab.addTab(&quot;" + k + "&quot;,&quot;" + t + "&quot;,&quot;" + r.url + "&quot;, true, false, false)",
                    c = n.data("font-color"),
                    f,
                    s,
                    h,
                    b;
                    c && c != "undefined" && (e == "1" || o == i) || (c = r.contentcolor, n.data("font-color", c));
                    f = n.data("title-color");
                    f && f != "undefined" && (e == "1" || o == i) || (f = r.titlecolor, n.data("title-color", f));
                    s = n.data("bgcolor");
                    s && s != "undefined" && (e == "1" || o == i) || (s = r.bgcolor, n.data("bgcolor", s));
                    u += '<h1 data-type="1" class="drag-module box-option"><\/h1>';
                    u += '<h1 class="drag-shade"><\/h1>';
                    u += '<span class="box-content-title title-color"  onclick="' + d + '">' + t + "<\/span>";
                    u += '<hr class="box-content-hr" />';
                    u += ' <ul class="box-content font-color" >';
                    var a = r.data,
                    v = a.length,
                    p = n.height() - 37;
                    for (p < v * 37 && (v = parseInt(p / 37)), h = 0; h < v; h++) {
                        var w = "",
                        l = a[h].URL,
                        y = a[h].title.replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, "").replace(/</g, "&lt;");
                        l && l != "" && (l = l.replace(" ", ""), b = "fromcontent_" + (new Date).format("HHmmssS") + parseInt(Math.random() * 1e7), w = 'onclick="SF.tab.addTab(&quot;' + b + "&quot;,&quot;" + y.replace(/"/g, "'") + "&quot;,&quot;" + l + '&quot;, true, false, false)"');
                        u += '<li ><div class="content-left" ' + w + ' title="' + y + '">' + y + '<\/div> <div class="content-right">' + a[h].date + "<\/div><\/li>"
                    }
                    u += "<\/ul>";
                    n.empty();
                    n.html(u);
                    n.find(".title-color").css("color", f);
                    n.find(".box-content-hr").css("borderColor", f);
                    n.find(".font-color").css("color", c);
                    n.css("backgroundColor", s);
                    n.append('<span class="gs-resize-handle gs-resize-handle-both"><\/span>');
                    n.append('<span class="iconfont icon-iconfont21 edit-module box-option" onclick="SF.module.editor($(this).parent(),event);" title="\u8bbe\u7f6e"><\/span>');
                    n.append('<span class="iconfont icon-delete remove-module box-option" onclick="SF.box.remove($(this).parent());" title="\u5220\u9664"><\/span>');
                    n.append('<span class="iconfont icon-shuaxin refresh-module box-option" onclick="SF.box.reflesh($(this).parent());" title="\u5237\u65b0"><\/span>');
                    n.find(".box-option").css("color", f)
                })
            } catch(p) {}
            break;
        case 2:
            if (c) try {
                $.getJSON(n.data("url"), {
                    skin: i
                },
                function(r) {
                    var u = "",
                    h = "fromtitle_" + (new Date).format("HHmmssS") + parseInt(Math.random() * 1e7),
                    f = "SF.tab.addTab(&quot;" + h + "&quot;,&quot;" + t + "&quot;,&quot;" + r.url + "&quot;, true, false, false)",
                    s;
                    color = n.data("iconcontcolor");
                    color && color != "undefined" && (e == "1" || o == i) || (color = r.iconcontcolor, n.data("iconcontcolor", color));
                    titleColor = n.data("icontitcolor");
                    titleColor && titleColor != "undefined" && (e == "1" || o == i) || (titleColor = r.icontitcolor, n.data("icontitcolor", titleColor));
                    bgcolor = n.data("iconbgcolor");
                    bgcolor && bgcolor != "undefined" && (e == "1" || o == i) || (bgcolor = r.iconbgcolor, n.data("iconbgcolor", bgcolor));
                    u += '<div class="box-icon-shade" ><\/div>';
                    u += '<h1 class="drag-module box-option"><\/h1>';
                    u += '<h1 class="drag-shade"><\/h1>';
                    u += '<div class="box-icon" >';
                    s = r.imageurl;
                    u += '<div class="box-icon-right"><img src="' + s + '" onclick="' + f + '" /><\/div>';
                    u += '<div class="box-icon-left">';
                    u += '<span class="box-icon-title title-color" onclick="' + f + '">' + t + "<\/span>";
                    u += '<span class="box-icon-num font-color" onclick="' + f + '">' + r.count + "<\/span><\/div>";
                    n.empty();
                    n.html(u);
                    n.find(".title-color").css("color", titleColor);
                    n.find(".font-color").css("color", color);
                    n.css("backgroundColor", bgcolor);
                    n.append('<span class="gs-resize-handle gs-resize-handle-both" ><\/span>');
                    n.append('<span class="iconfont icon-iconfont21 edit-module box-option" onclick="SF.module.editor($(this).parent(),event);" title="\u8bbe\u7f6e"><\/span>');
                    n.append('<span class="iconfont icon-delete remove-module box-option" onclick="SF.box.remove($(this).parent());" title="\u5220\u9664"><\/span>');
                    n.append('<span class="iconfont icon-shuaxin refresh-module box-option" onclick="SF.box.reflesh($(this).parent());" title="\u5237\u65b0"><\/span>');
                    n.find(".box-option").css("color", "#FFF");
                    SF.module.changeStyle(n)
                })
            } catch(p) {}
            break;
        case 3:
            n.append('<hr class="box-content-hr iframe-border-color" />');
            l = "PublicModule/Chart.aspx?url=" + c.split("&")[1].replace("url=", "") + "&name=" + t;
            f = "<iframe name='chartmod'  class='box-iframe'  src='" + l + "' data-type='chart'  frameborder='no' allowtransparency='true'  border='0' marginwidth='0' marginheight='0'  scrolling='no' width='100%' height='100%'><\/iframe>";
            n.css("padding", "0");
            n.append(f);
            n.append('<h1 class="drag-module box-option resize-option" style="background-color:rgb(255,255,255);filter: alpha(opacity=10); opacity: 0.1;"><\/h1>');
            n.append('<h1 class="drag-shade"><\/h1>');
            n.append('<span class="box-content-title iframe-title-color">' + t + "<\/span>");
            n.append('<span class="gs-resize-handle gs-resize-handle-both"><\/span>');
            n.append('<span class="iconfont icon-delete remove-module box-option iframe-title-color" onclick="SF.box.remove($(this).parent());" title="\u5220\u9664"><\/span>');
            n.append('<span class="iconfont icon-shuaxin refresh-module iframe-refresh-module box-option iframe-title-color" onclick="SF.box.reflesh($(this).parent());" title="\u5237\u65b0"><\/span>');
            $("iframe[src='" + l + "']").load(function() {
                n.find(".load-user").remove();
                $(this).unbind()
            });
            break;
        case 4:
            n.append('<hr class="box-iframe-hr iframe-border-color" />');
            u = c.split("&")[1].replace("url=", "");
            f = "";
            u.indexOf("PublicModule/Note/Note.aspx") != -1 ? (s = n.data("linkid"), u = "PublicModule/Note/Note.aspx?linkid=" + s, f = "<iframe name='ifrmod' data-type='note' class='box-iframe' id='" + s + "'  src='" + u + "' frameborder='no' allowtransparency='true' border='0' marginwidth='0' marginheight='0' scrolling='no' width='100%' height='100%'><\/iframe>") : f = "<iframe name='ifrmod' class='box-iframe'  src='" + u + "' frameborder='no' allowtransparency='true' border='0' marginwidth='0' marginheight='0' scrolling='no' width='100%' height='100%'><\/iframe>";
            n.css("padding", "0");
            n.append(f);
            n.append('<h1 class="drag-module box-option resize-option" style="background-color:rgb(255,255,255);filter: alpha(opacity=10); opacity: 0.1;" ><\/h1>');
            n.append('<h1 class="drag-shade"><\/h1>');
            switch (t) {
            case "\u8003\u52e4":
                r = "SF.tab.addTab('module-sign','\u8003\u52e4\u767b\u8bb0','AttendanceManage/AttendRegister.aspx',true,false,true)";
                n.append('<span class="box-content-title iframe-title-color"  onclick="' + r + '">' + t + "<\/span>");
                break;
            case "\u65e5\u5386":
                n.append('<span class="box-content-title iframe-title-color">' + t + "<\/span>");
                n.find(".box-iframe-hr").remove();
                break;
            case "\u5929\u6c14":
                n.append('<span class="box-content-title iframe-title-color">' + t + "<\/span>");
                n.find(".box-iframe-hr").remove();
                break;
            case "\u6211\u7684\u5907\u5fd8":
                r = "SF.tab.addTab('module-note','\u6211\u7684\u5907\u5fd8','MessageInfo/ShowPad.aspx',true,false,true)";
                n.append('<span class="box-content-title iframe-title-color"  onclick="' + r + '" >' + t + "<\/span>");
                break;
            case "\u90ae\u4ef6":
                r = "SF.tab.addTab('module-email','\u6211\u7684\u90ae\u4ef6','EmailCenter/Email.aspx',true,false,true)";
                n.append('<span class="box-content-title iframe-title-color" onclick="' + r + '">' + t + "<\/span>");
                break;
            case "\u65b0\u95fb(\u56fe\u6587\u6df7\u6392)":
                n.find(".box-iframe-hr").remove();
                break;
            case "\u5de5\u4f5c\u53f0":
                r = "SF.tab.addTab('module-todotask','\u5de5\u4f5c\u53f0','PublicModule/Task/Task.aspx?jump=1',true,false,true)";
                n.append('<span class="box-content-title iframe-title-color"  onclick="' + r + '">' + t + "<\/span>");
                break;
            case "\u5feb\u901f\u521b\u5efa":
                r = "SF.tab.addTab('module-fastcreate','\u5feb\u901f\u521b\u5efa','PublicModule/Task/FastTask.aspx?jump=1',true,false,true)";
                n.append('<span class="box-content-title iframe-title-color" onclick="' + r + '">' + t + "<\/span>");
                break;
            case "\u6548\u7387\u5206\u6790":
                n.append('<span class="box-content-title iframe-title-color">' + t + "<\/span>")
            }
            n.append('<span class="gs-resize-handle gs-resize-handle-both"><\/span>');
            n.append('<span class="iconfont icon-delete remove-module box-option iframe-title-color" onclick="SF.box.remove($(this).parent());" title="\u5220\u9664"><\/span>');
            n.append('<span class="iconfont icon-shuaxin refresh-module iframe-refresh-module box-option iframe-title-color" onclick="SF.box.reflesh($(this).parent());" title="\u5237\u65b0"><\/span>');
            $("iframe[src='" + u + "']").load(function() {
                n.find(".load-user").remove();
                $(this).unbind()
            });
            break;
        case 5:
            n.append('<hr class="box-content-hr iframe-border-color" />');
            h = n.data("linkurl");
            h == "" || h == "undefined" || h == null ? (s = n.data("linkid"), u = "PublicModule/Custom.aspx?linkid=" + s) : u = h;
            f = "<iframe class='box-iframe' name='ifrmod' src='" + u + "' data-type='custom' frameborder='no'  border='0' marginwidth='0' marginheight='0' scrolling='auto' width='100%' height='100%'><\/iframe>";
            n.empty();
            n.append(f);
            n.append('<h1 class="drag-module box-option resize-option" style="background-color:rgb(255,255,255);filter: alpha(opacity=10); opacity: 0.1;"><\/h1>');
            n.append('<h1 class="drag-shade"><\/h1>');
            n.append('<span class="box-content-title iframe-title-color">' + t + "<\/span>");
            n.append('<span class="gs-resize-handle gs-resize-handle-both"><\/span>');
            n.append('<span class="iconfont icon-delete remove-module box-option" onclick="SF.box.remove($(this).parent());" title="\u5220\u9664"><\/span>');
            n.append('<span class="iconfont icon-shuaxin refresh-module iframe-refresh-module box-option" onclick="SF.box.reflesh($(this).parent());" title="\u5237\u65b0"><\/span>');
            n.find(".box-option").css("color", a)
        }
    }
};
SF.util = {
    clone: function(n, t) {
        var r, i;
        t = t || {};
        for (i in n) n.hasOwnProperty(i) && (r = n[i], typeof r == "object" ? (t[i] = utils.isArray(r) ? [] : {},
        utils.clone(n[i], t[i])) : t[i] = r);
        return t
    },
    trim: function(n) {
        return n && (n = n.replace(/^[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+|[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+$/g, "")),
        n || ""
    },
    getPath: function() {
        var t = "/",
        n;
        if (typeof window.top.rootPath != "undefined") t = window.top.rootPath;
        else try {
            n = window.opener;
            typeof n != "undefined" && typeof n.top.rootPath != "undefined" && (t = n.top.rootPath)
        } catch(i) {}
        return t
    }
};
SF.form = {
    IsNull: function(n) {
        var t, i, r;
        return $("#" + n) ? (t = "", i = $("#" + n).attr("sfplugins"), t = i == "radios" || i == "checkboxs" ? $("input[name='" + n + "']:checked").val() : $("#" + n).val(), r = $("#" + n).attr("title") == undefined ? "\u5b58\u5728\u672a\u586b\u9879\u76ee\uff0c\u4e0d\u80fd\u4fdd\u5b58\uff01": $("#" + n).attr("title") + "\u5b57\u6bb5\u4e3a\u5fc5\u586b\uff0c\u8bf7\u586b\u5199\uff01", $("#" + n).attr("readonly") == "readonly" ? !1 : t ? !1 : (alert(r), !0)) : !1
    },
    IsInteger: function(n) {
        if ($("#" + n)) {
            var t;
            return (strVal = $("#" + n).val(), !strVal) ? !0 : (t = /^[\-\+]?([1-9]\d*|0|[1-9]\d{0,2}(,\d{3})*)$/, t.test(strVal) ? !0 : (alert("\u5fc5\u987b\u8f93\u5165\u6574\u6570\uff01"), !1))
        }
        return ! 0
    },
    IsNumber: function(n) {
        if ($("#" + n)) {
            var t;
            return (strVal = $("#" + n).val(), !strVal) ? !0 : (t = /^[\-\+]?([0-9]\d*|0|[1-9]\d{0,2}(,\d{3})*)(\.\d+)?$/, t.test(strVal)) ? (gar = strVal + ".", tmp = gar.split("."), tmp[0].length > 15 ? (alert("\u6574\u6570\u90e8\u5206\u4e0d\u80fd\u8d85\u8fc7 16\u4f4d"), !1) : !0) : (alert("\u5fc5\u987b\u8f93\u5165\u5c0f\u6570\uff01"), !1)
        }
        return ! 0
    },
    IsCNY: function(n) {
        if ($("#" + n)) {
            var t;
            return (strVal = $("#" + n).val(), !strVal) ? !0 : (t = /(-)?\d+(\.\d+)?/, t.test(strVal) ? !0 : (alert("\u5fc5\u987b\u8f93\u5165\u6570\u503c\u7c7b\u578b\uff01"), !1))
        }
        return ! 0
    },
    IsUSD: function(n) {
        if ($("#" + n)) {
            var t;
            return (strVal = $("#" + n).val(), !strVal) ? !0 : (t = /(-)?\d+(\.\d+)?/, t.test(strVal) ? !0 : (alert("\u5fc5\u987b\u8f93\u5165\u6570\u503c\u7c7b\u578b\uff01"), !1))
        }
        return ! 0
    },
    IsPercent: function(n) {
        if ($("#" + n)) {
            var t;
            return (strVal = $("#" + n).val(), !strVal) ? !0 : (t = /\d+(\.\d+)?/, t.test(strVal) ? !0 : (alert("\u5fc5\u987b\u8f93\u5165\u6570\u503c\u7c7b\u578b\uff01"), !1))
        }
        return ! 0
    }
};
String.prototype.format = function(n) {
    var i = this,
    r, t, u;
    if (arguments.length > 0) if (arguments.length == 1 && typeof n == "object") for (r in n) n[r] != undefined && (u = new RegExp("({" + r + "})", "g"), i = i.replace(u, n[r]));
    else for (t = 0; t < arguments.length; t++) arguments[t] != undefined && (u = new RegExp("({[" + t + "]})", "g"), i = i.replace(u, arguments[t]));
    return i
};
String.prototype.colorHex = function() {
    var t = this,
    f, r, u, i, e, n;
    if (/^(rgb|RGB)/.test(t)) {
        for (f = t.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(","), r = "#", n = 0; n < f.length; n++) u = Number(f[n]).toString(16),
        u === "0" && (u += u),
        r += u;
        return r.length !== 7 && (r = t),
        r
    }
    if (/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t)) {
        if (i = t.replace(/#/, "").split(""), i.length === 6) return t;
        if (i.length === 3) {
            for (e = "#", n = 0; n < i.length; n += 1) e += i[n] + i[n];
            return e
        }
    } else return t
};
String.prototype.colorRgb = function() {
    var t = this.toLowerCase(),
    i,
    r,
    n;
    if (t && reg.test(t)) {
        if (t.length === 4) {
            for (i = "#", n = 1; n < 4; n += 1) i += t.slice(n, n + 1).concat(t.slice(n, n + 1));
            t = i
        }
        for (r = [], n = 1; n < 7; n += 2) r.push(parseInt("0x" + t.slice(n, n + 2)));
        return "RGB(" + r.join(",") + ")"
    }
    return t
};
SF.module = {
    editor: function(n, t) {
        layer.close(SF.box.layerIndex);
        SF.box.layerIndex = showDiy(n, t)
    },
    editorIfrme: function(n, t) {
        layer.close(SF.box.layerIndex);
        SF.box.layerIndex = setIfrmeStyle(n, t)
    },
    isSave: !0,
    updatelayout: function() {
        var i = $("#person-option-lock").data("usercode"),
        n,
        t;
        i != "test" && (n = $("#cur_skin").val(), t = $("#cur_layout").val(), $(".theme").css("display") == "none" && (t != "1" ? SF.module.isSave && (layer.confirm("\u662f\u5426\u4fdd\u5b58\u4fee\u6539\u540e\u7684\u5e03\u5c40\uff1f\u786e\u8ba4\u540e\u7cfb\u7edf\u5c06\u4e3a\u4f60\u81ea\u52a8\u4fdd\u5b58\uff01",
        function() {
            $(".theme-layout-style").each(function() {
                $(this).data("iscur") == "1" && $(this).data("iscur", "0")
            });
            $(".theme-layout-style[data-id='1']").data("iscur", "1");
            $("theme-layout-content .theme-layout-style").each(function() {
                $(this).removeClass("click")
            });
            $(".theme-layout-style[data-id='1']").addClass("click");
            $.post("HomeDataHandler/controller.ashx?action=theme&option=savetheme", {
                json: JSON.stringify(SF.box.box.serialize()),
                layout: "1",
                css: n,
                isenable: "0"
            },
            function() {
                $("#json_mods").val(JSON.stringify(SF.box.box.serialize()));
                $(".theme-layout-style[data-id='1']").data("mods", $.parseJSON($("#json_mods").val()));
                $("#cur_layout").val("1");
                layer.msg("\u9996\u9875\u5e03\u5c40\u5df2\u4fee\u6539", 1, {
                    type: -1,
                    shade: !1,
                    offset: ["0", "0"]
                })
            })
        },
        function() {
            SF.module.isSave = !1
        }), $(".xubox_title,.xubox_botton .xubox_yes").css({
            background: $(".header").css("background-color")
        })) : $.post("HomeDataHandler/controller.ashx?action=theme&option=savetheme", {
            json: JSON.stringify(SF.box.box.serialize()),
            layout: "1",
            css: n,
            isenable: "0"
        },
        function() {
            $("#json_mods").val(JSON.stringify(SF.box.box.serialize()));
            $(".theme-layout-style[data-id='1']").data("mods", $.parseJSON($("#json_mods").val()));
            $("#cur_layout").val("1");
            layer.msg("\u9996\u9875\u5e03\u5c40\u5df2\u4fee\u6539", 1, {
                type: -1,
                shade: !1,
                offset: ["0", "0"]
            })
        })))
    },
    changeStyle: function(n) {
        var e, i, r, t, u, f;
        n.show();
        e = n.data("type");
        e == "2" && (i = parseInt(n.attr("data-sizex")), r = parseInt(n.attr("data-sizey")), SF.box.gridw <= SF.box.DEFAULT_WIDTH && (t = window.document.body.clientWidth - 170, SF.box.dispalyMenuStyle != 0 && (t = window.document.body.clientWidth - 55), i === 1 && r === 1 ? (n.find(".box-icon").css({
            "margin-top": "-40px",
            "margin-left": "-45px"
        }), n.find(".box-icon-left").css("display", "block"), n.find(".box-icon-right").css({
            display: "none",
            margin: "0 auto"
        }), n.find(".box-icon-title,.box-icon-num").css("font-size", "16px"), 1900 > t && t > 1550 && (n.find(".box-icon-right").css({
            display: "block",
            margin: "0 auto"
        }), n.find(".box-icon").css({
            "margin-top": "-40px",
            "margin-left": "-60px"
        }), n.find(".box-icon-title,.box-icon-num").css("font-size", "20px"))) : i > 1 && r === 1 ? (n.find(".box-icon").css({
            "margin-top": "-20px",
            "margin-left": "-60px"
        }), n.find(".box-icon-left").css("display", "inline-block"), n.find(".box-icon-right").css({
            display: "inline-block",
            margin: "0 5px"
        }), n.find(".box-icon-title,.box-icon-num").css("font-size", "20px"), parseInt(n.find(".box-icon-num").text()) > 99 ? n.find(".box-icon").css({
            "margin-left": "-90px"
        }) : n.find(".box-icon").css({
            "margin-left": "-60px"
        })) : i == 1 && r > 1 ? (1900 > t && t > 1550 ? n.find(".box-icon").css({
            "margin-top": "-40px",
            "margin-left": "-60px"
        }) : t <= 1550 && n.find(".box-icon").css({
            "margin-top": "-40px",
            "margin-left": "-45px"
        }), n.find(".box-icon-title,.box-icon-num").css("font-size", "20px"), n.find(".box-icon-left").css({
            display: "block",
            margin: "0 auto"
        }), n.find(".box-icon-right").css({
            display: "block",
            margin: "0 auto"
        })) : i == 2 && r > 1 ? (n.find(".box-icon").css({
            "margin-top": "-20px",
            "margin-left": "-60px"
        }), n.find(".box-icon-title,.box-icon-num").css("font-size", "20px"), n.find(".box-icon-left").css("display", "inline-block"), n.find(".box-icon-right").css({
            display: "inline-block",
            margin: "0 5px"
        }), parseInt(n.find(".box-icon-num").text()) > 99 ? n.find(".box-icon").css({
            "margin-left": "-90px"
        }) : n.find(".box-icon").css({
            "margin-left": "-60px"
        })) : (n.find(".box-icon").css({
            "margin-top": "-20px",
            "margin-left": "-60px"
        }), n.find(".box-icon-title,.box-icon-num").css("font-size", "20px"), n.find(".box-icon-left").css("display", "inline-block"), n.find(".box-icon-right").css({
            display: "inline-block",
            margin: "0 5px"
        }), parseInt(n.find(".box-icon-num").text()) > 99 ? n.find(".box-icon").css({
            "margin-left": "-90px"
        }) : n.find(".box-icon").css({
            "margin-left": "-60px"
        }))), u = n.width(), f = n.height(), u == SF.box.gridw && f == SF.box.gridh ? (n.find(".box-icon-right").removeClass("onegrid"), n.find(".border").removeClass("onegrid"), n.find(".box-icon").removeClass("twogrid"), n.find(".box-icon").addClass("onegrid")) : u == SF.box.gridw && f >= SF.box.gridh * 2 ? (n.find(".box-icon").removeClass("onegrid"), n.find(".box-icon-right").addClass("onegrid"), n.find(".border").addClass("onegrid"), n.find(".box-icon").addClass("twogrid")) : (n.find(".box-icon").removeClass("onegrid"), n.find(".box-icon-right").removeClass("onegrid"), n.find(".border").removeClass("onegrid"), n.find(".box-icon").removeClass("twogrid")))
    },
    updateNote: function(n) {
        $.post("HomeDataHandler/controller.ashx?action=theme&option=updatenote", {
            id: n
        },
        function() {})
    }
}