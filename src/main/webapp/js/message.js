function msgSound() {
    if (isSound) try {
        document.getElementById("ddsoundHTML5").play()
    } catch(n) {
        try {
            document.getElementById("ddsound").play()
        } catch(t) {}
    }
}
Array.prototype.contains = function(n) {
    for (i = 0; i < this.length && this[i] != n; i++);
    return ! (i == this.length)
};
SF.msg = {};
SF.msg.chat = {
    loginUsercode: "",
    loginUsername: "",
    deptId: "",
    ueditor: null,
    msgLayer: 0,
    fontSize: "14px",
    hub: $.connection.chatHub,
    inSearch: !1,
    faceUrl: [],
    getFace: function() {
        var i = this,
        r, n, f, e, t, u, o;
        if (i.faceUrl.length == 0) for (r = [["sf1/sf_", 18]], n = 0; n < r.length; n++) for (f = r[n][0], e = r[n][1], t = 1; t <= e; t++) u = t,
        t < 10 && (u = "0" + u),
        faceName = f + u + ".gif",
        i.faceUrl.push(faceName);
        return o = "SFOAHtml/dialogs/emotion/images/",
        o + i.faceUrl[parseInt(Math.random() * (i.faceUrl.length - 1))]
    },
    SF_ROBOT_ID: "sf-intelligence-robot",
    GROUP_PREFIX: "_group_",
    init: function(n, t, i) {
        function h() {
            r.hub.server.getUserList().done(function(n) {
                $.isEmptyObject(n) || r.updateUserList(n);
                $("#userlist-" + r.SF_ROBOT_ID).click(function() {
                    r.openChatWindow($(this))
                });
                r.hub.server.getGroups().done(function(n) {
                    $.isEmptyObject(n) || r.updateGroupList(n);
                    r.hub.server.getUnReadMessage().done(function(n) {
                        var f = [],
                        t = [],
                        i,
                        u;
                        $.isEmptyObject(n) || ($(n).each(function(n, i) {
                            var u = i.SenderId,
                            e;
                            i.Scope == 2 ? (u = i.ReceiverId, f.contains(u) || f.push(u)) : i.Scope == 3 && (t.contains(u) || t.push(u));
                            e = r.createRecordDiv(u);
                            r.addSenderRecord(i, e)
                        }), $("#recentsession").addClass("unread"), i = n.length, i > 99 ? (i = "99<i>+<\/i>", $("#total-num").addClass("large")) : $("#total-num").removeClass("large"), $("#total-num").html(i).show(), i > 0 && (u = parseInt($(".waiting-work-tip .count").text()) + n.length, u > 99 ? ($("#msg-total-num").addClass("large"), u = "99<i>+<\/i>", $("#msg-total-num").html(u)) : ($("#msg-total-num").removeClass("large"), $("#msg-total-num").text(u)), $("#msg-total-num").show(), $("#msg-container").addClass("in")), $(".cont .msg-count").each(function() {
                            var n = $(this),
                            t = $("#recordcurrent-" + n.parent().parent().data("userid") + " .record-content").length;
                            t > 0 && n.text(t).show()
                        }));
                        r.hub.server.getRecentUser(10).done(function(n) {
                            var i, u, e;
                            if (!$.isEmptyObject(n)) for (i = n.length - 1; i >= 0; i--) t.contains(n[i].Id) || r.copyToRecent(n[i].Id);
                            for (i = 0; i < f.length; i++) u = f[i],
                            e = $("#" + u),
                            e.length == 0 && r.copyToRecent(u);
                            for (i = 0; i < t.length; i++) u = t[i],
                            e = $("#" + u),
                            e.length == 0 && r.copyToRecent(u)
                        })
                    })
                })
            })
        }
        var r = this,
        u = r.hub,
        f, e, s, o;
        $("#msg-search-btn").click(function() {
            var i = $("#msg-search-text").val(),
            f,
            n,
            u,
            t,
            e;
            i == "" ? (f = $(".msg-cont-one .group").show().find(".cont[data-show='1'] ").show(), $(".msg-cont-one .group .cont").not(f).hide(), $(".msg-cont-one >.group ul").show(), $(".msg-cont-two .cont ul").show(), $(".msg-cont-three .cont ul").show(), r.inSearch = !1) : $(".msg-cont-one").is(":visible") ? ($(".msg-cont-one .group").hide().find(".cont").hide().find("ul").hide(), n = $(".msg-cont-one>.group .cont ul .t:contains('" + i + "')").parent().show(), u = n.parent().show().parent().show(), u.each(function() {
                for (var n = u.parent(".cont").show().parent(".group").show(); n.length > 0;) n = n.parent(".cont").show().parent(".group").show()
            }), n.length > 0 && (n.show().parent().show().parent().show(), $(".msg-cont-one").scrollTop(n.first().parent().parent().position().top)), r.inSearch = !0) : (t = ".msg-cont-two", e = ".msg-cont-three", $(t).is(":visible") || (t = e), $(t + " .cont ul").hide(), $(t + " .cont ul .t:contains('" + i + "')").parent().show())
        });
        $("#msg-search-text").keyup(function(n) { (n.keyCode == 13 || $(this).val() == "") && $("#msg-search-btn").trigger("click")
        });
        $("#task-search-btn").on("click",
        function() {
            var n = "detail-tip-list",
            t = {
                Status: 1,
                pageSize: 1e3,
                nowPage: 1,
                Categories: $("#task-search-text").val().replace("'", "").replace('"', "")
            };
            $("#task-tab").find("li").each(function() {
                if ($(this).hasClass("active")) {
                    var i = $(this).data("for");
                    switch (i) {
                    case ".task-undo-list":
                        t.Status = 1;
                        n = "detail-tip-list";
                        break;
                    case ".task-do-list":
                        t.Status = 2;
                        n = "tip-do-lists";
                        break;
                    case ".task-send-list":
                        t.Status = 3;
                        n = "tip-send-lists"
                    }
                }
            });
			/**
            $.ajax({
                type: "POST",
                url: "PublicModule/Task/TaskAction.ashx?action=GetGrid",
                data: {
                    CsTaskWhere: JSON.stringify(t)
                },
                dataType: "json",
                success: function(t) {
                    t.recordCount > 0 ? t.exhibitDatas.length > 0 && ($("#" + n).html(""), $.each(t.exhibitDatas,
                    function(t, i) {
                        var u = createMsgListHtml(i),
                        r = $(u);
                        r.click(function() {
                            homeCommon.OpenTask(i)
                        });
                        $("#" + n).append(r)
                    })) : ($("#" + n).html(""), $("#" + n).append("<li style='padding-left:30px;'>\u6682\u65e0\u641c\u7d22\u7ed3\u679c\uff01<\/li>"))
                }
            })
			**/
        });
        $("#task-search-text").keyup(function(n) { (n.keyCode == 13 || $(this).val() == "") && $("#task-search-btn").trigger("click")
        });
        this.loginUsercode = n;
        this.loginUsername = t;
        this.deptId = i;
        this.fontSize = $.cookie("chatFontSize"); (typeof this.fontSize == "undefined" || this.fontSize == "") && (this.fontSize = "14px");
        $("#msg-record").on("click", ".record-content img",
        function() {
            var n = $(this);
            n.parent("a").length == 0 && n.siblings("a").length == 0 && r.showBigImg(n.attr("src"))
        }).on("click", ".group-user",
        function() {
            r.openChatWindow($("#userlist-" + $(this).data("userid")))
        });
        $("#msg-record").on("mouseenter", ".record-content a:not([href^='javascript']):not([href^='#'])",
        function() {
            if ($aTag = $(this), typeof $aTag.data("bind") == "undefined") {
                $aTag.data("bind", 1);
                $aTag.attr("target", "_blank");
                var n = $aTag.attr("href");
                n.indexOf("/from") == 0 ? $aTag = $aTag.attr("href", "http://m.baidu.com/" + n) : n.indexOf("publicfile/chatimg") > -1 && $aTag.attr("href", "Chat/DownloadChatFile.aspx?filename=" + $aTag.text() + "&realname=" + n)
            }
        });
        $(".msg-cont").on("click", ".msg-list .cont>ul",
        function() {
            r.openChatWindow($(this))
        });
        $("#user-head").on("click", "li>.showuser",
        function() {
            r.showUserMsg($(this).parent())
        }).on("mouseenter", ">li",
        function() {
            $(this).addClass("hover")
        }).on("mouseleave", ">li",
        function() {
            $(this).removeClass("hover")
        }).on("click", "li>.close",
        function() {
            r.removeCurrentMsg($(this).parent())
        }).hover(function() {
            $(this).css("overflowX", "auto")
        },
        function() {
            $(this).css("overflowX", "hidden")
        });
        $("#msg-more").click(function() {
            var n = $("#user-head li.selected");
            n.attr("data-show-record") == 1 ? n.attr("data-show-record", 0) : n.attr("data-show-record", 1);
            r.showMoreRecord(n, !0)
        });
        $("#close-current-msg").click(function() {
            r.removeCurrentMsg($("#user-head li.selected"))
        });
        $("#send-current-msg").click(function() {
            var i, n, t, f, u, e, o;
            if (!r.ueditor.hasContents()) {
                layer.tips("\u8bf7\u8f93\u5165\u5185\u5bb9", $("#send-msg-content"), {
                    style: ["background-color:#66ccff; color:#fff", "#66ccff"],
                    guide: 2,
                    time: 2
                });
                return
            }
            if (i = "send-" + (new Date).format("yyyyMMddHHmmssS"), r.ueditor.execCommand("selectall"), r.ueditor.execCommand("fontsize", r.fontSize), n = r.ueditor.getContent().replace(/(<p>(<br\/>)*<\/p>)+$/, "").replace(/(<br\/>)+$/, ""), n.length > 2e3) {
                layer.tips("\u5185\u5bb9\u592a\u591a\u5566\uff0c\u6700\u591a\u80fd\u8f93\u51652000\u4e2a\u5b57", $("#send-msg-content"), {
                    style: ["background-color:#66ccff; color:#fff", "#66ccff"],
                    guide: 2,
                    time: 2
                });
                return
            }
            n.indexOf("href") > -1 && (t = $("<div><\/div>"), t.append(n), t.find("a>span").css("fontSize", "12px").parent().css("fontSize", "12px"), n = t.html(), t.remove());
            f = '<div class="time" id="' + i + '">\u53d1\u9001\u4e2d\u2026\u2026<\/div> <div class="i-say record-content">' + n + '<span class="arrow-right"><\/span><\/div><div class="clear-float"><\/div>';
            u = $(".msg-record>li:visible");
            u.append(f);
            setTimeout(function() {
                u.scrollTop(9999999)
            },
            200);
            e = r.ueditor.getContentTxt();
            r.ueditor.focus();
            r.ueditor.execCommand("cleardoc");
            setTimeout(function() {
                r.ueditor.execCommand("fontsize", r.fontSize)
            },
            1);
            o = $("#user-head>li.selected").data("userid");
            o == r.SF_ROBOT_ID ? r.getAnswer(e, i, n) : r.send(n, i)
        });
        $("#msg-container").on("mouseover",
        function() {
            $("#msg-container").addClass("open");
            $(".page-sidemsg").addClass("open");
            $(".person-name").hasClass("open") && $(".person-name").removeClass("open")
        }).mouseout(function(n) {
            var i = n.pageX,
            r = n.pageY,
            t = $("#sidemsg").offset(),
            u = t.left,
            f = t.top; (i < u || r < f) && ($("#msg-container").removeClass("open"), $(".page-sidemsg").removeClass("open"))
        });
        $("#detail-tip-list").on("mouseenter",
        function() {
            createScroll($(this))
        });
        $("#sidemsg").on("mouseenter",
        function(n) {
            var i = n.pageX,
            r = n.pageY,
            t = $("#sidemsg").offset(),
            u = t.left,
            f = t.top;
            i < u || r < f ? ($("#msg-container").removeClass("open"), $(".page-sidemsg").removeClass("open")) : ($(this).addClass("open"), $(".page-sidemsg").addClass("open"), $(".person-name").hasClass("open") && $(".person-name").removeClass("open"))
        }).on("mouseleave",
        function() {
            $("#msg-container").removeClass("open");
            $(".page-sidemsg").removeClass("open")
        });
        $(".person-name").on("click",
        function() {
            $(this).toggleClass("open")
        });
        if ($("#task-tab li").hover(function() {
            $(this).addClass("hover")
        },
        function() {
            $(this).removeClass("hover")
        }).click(function() {
            var n = $(this);
            n.addClass("active").siblings().removeClass("active");
            $(".tip-list").hide();
            $(n.data("for")).show()
        }), $("#msg-tab li").hover(function() {
            $(this).addClass("hover")
        },
        function() {
            $(this).removeClass("hover")
        }).click(function() {
            var n = $(this);
            n.addClass("active").siblings().removeClass("active");
            $(".msg-list").hide();
            $(n.data("for")).show()
        }), f = $("#msg-tab"), f.disableSelection().sortable({
            axis: "x",
            distance: 20,
            cursor: "move",
            stop: function() {
                var n = "";
                $(this).find(">li").each(function() {
                    n += $(this).data("for") + ","
                });
                n = n.substring(0, n.length - 1);
                $.cookie("chatTabOrder", n, {
                    expires: 365
                })
            }
        }), e = $.cookie("chatTabOrder"), typeof e != "undefined" && e != ".msg-cont-one,.msg-cont-three,.msg-cont-two") {
            for (s = e.split(","), o = 0; o < s.length; o++) f.append($("#msg-tab li[data-for='" + s[o] + "']"));
            f.find(">li:first").trigger("click")
        }
        u.client.updateStatus = function(n) {
            var e = n.Id,
            a, v, y, p, w, t, d, i;
            if (e != r.loginUsercode) {
                $user = $(".group ul[data-userid='" + e + "']");
                var l = n.ConnId != $user.attr("data-connid"),
                o = $user.find(".l img"),
                s = o.data("src"),
                u = n.ConnId;
                if (u == "" ? (u = "\u79bb\u7ebf", s = o.data("off-src")) : u = "\u5728\u7ebf", a = n.Status + "\r\n" + n.Memo, $user.attr("data-status", u), o.attr("title", a), l && ($user.attr("data-connid", n.ConnId), o.attr("src", s), $("#userhead-" + e + " img").attr("src", s)), v = $("#recent-" + e), v.length > 0 && (y = v.find(".l img"), y.attr("title", a), l && y.attr("src", s)), l) {
                    if (p = n.ChatGroupIds + ",all,dept" + r.deptId, p != "") for (groupIdArr = p.split(","), t = 0; t < groupIdArr.length; t++) groupIdArr[t] != "" && (w = $("#ifrmgroup-" + SF.msg.chat.GROUP_PREFIX + groupIdArr[t]), w.length > 0 && w[0].contentWindow.changeOrder(e, n.ConnId));
                    for (var h = $user.parent(), c = h.parent(".group"), b = c; b.length > 0;) c = b,
                    b = c.parent().parent(".group");
                    c.find(".title .c>.online").each(function() {
                        var n = $(this),
                        t = n.parent().parent().parent().find("ul[data-status='\u5728\u7ebf']").length;
                        n.html(t)
                    });
                    var k = $user.data("order"),
                    g = u == "\u5728\u7ebf" ? "=": "!=",
                    f = h.find(">ul[data-status" + g + "'\u5728\u7ebf']").not($user);
                    if (f.length > 1) for (t = f.length - 1; t > 0; t--) if (i = $(f[t]), d = $(f[t - 1]), k > i.data("order")) {
                        i.after($user);
                        break
                    } else if (k > d.data("order")) {
                        i.before($user);
                        break
                    } else if (t == 1) {
                        d.before($user);
                        break
                    } else continue;
                    else f.length == 1 ? (i = $(f[0]), k > i.data("order") ? i.after($user) : i.before($user)) : u == "\u5728\u7ebf" ? h.prepend($user) : h.append($user)
                }
            }
        };
        u.client.call = function(n) {
            var t = n.SenderId,
            f, h, u, o;
            if (t != r.loginUsercode) {
                n.Scope == 2 && (t = n.ReceiverId);
                f = r.createRecordDiv(t);
                r.addSenderRecord(n, f);
                var s = $("#userhead-" + t),
                e = $("#userlist-" + t + " .msg-count"),
                i = $("#total-num");
                s.length == 0 ? (e.text(parseInt(e.text()) + 1).show(), u = parseInt(i.text()) + 1 > 99 ? "99<sup>+<\/sup>": parseInt(i.text()) + 1, i.html(u).show(), $("#recentsession").addClass("unread")) : s.hasClass("selected") && $("#xubox_layer" + r.msgLayer).is(":visible") ? (f.show(), setTimeout(function() {
                    f.scrollTop(9999999)
                },
                200), r.hub.server.setRead(t)) : (h = s.find(".msg-count"), h.text(parseInt(h.text()) + 1).show(), e.text(parseInt(e.text()) + 1).show(), u = parseInt(i.text()) + 1, u > 99 ? (u = "99<i>+<\/i>", i.addClass("large")) : i.removeClass("large"), i.html(u).show(), $("#recentsession").addClass("unread"));
                o = parseInt($(".waiting-work-tip .count").text()) + parseInt($("#total-num").text());
                o > 99 ? (o = "99<i>+<\/i>", $("#msg-total-num").addClass("large")) : $("#msg-total-num").removeClass("large");
                $("#msg-total-num").html(o).show();
                $("#msg-container").addClass("in");
                r.copyToRecent(t)
            }
        };
        u.client.refleshUsers = function() {
            h(!1)
        };
        $.connection.hub.disconnected(function() {
            window.console && console.log("disconnected " + new Date)
        });
        $.connection.hub.reconnecting(function() {
            window.console && console.log("reconnecting " + new Date)
        });
        $.connection.hub.reconnected(function() {
            window.console && console.log("reconnected " + new Date)
        });
        $.connection.hub.start().then(function() {
            u.server.onLine().done(function() {
                h()
            })
        }).done(function() {
            var e = ["\u5728\u7ebf", "\u5fd9\u788c", "\u79bb\u5f00", "\u52ff\u6270", "\u4f1a\u8bae", "\u516c\u51fa", "\u8bf7\u5047"],
            s = ["icon-online", "icon-manglu", "icon-likai", "icon-wurao", "icon-huiyi", "icon-gongchu", "icon-qingjia"],
            o = $("#status-arrow"),
            n = $("#select-status"),
            t = "\u81ea\u5b9a\u4e49\u72b6\u6001",
            i,
            r;
            for (o.after('<a href="javascript:void(0)" id="user-define" style="display:none"><\/a>'), i = e.length - 1; i > -1; i--) {
                var f = e[i],
                h = s[i],
                c = i == 0 ? 'class="selected"': "";
                o.after('<a href="javascript:void(0)" ' + c + '><i class="sf-icon icon-status ' + h + '"><\/i>' + f + "<\/a>");
                n.prepend('<option value="' + f + '">' + f + "<\/option>")
            }
            n.append('<option value="' + t + '">' + t + "<\/option>").change(function() {
                $(this).val() == t ? $("#user-define-text").show().focus() : $("#user-define-text").hide()
            });
            r = $("#memo-content").text();
            r == "" && (r = "\u5f53\u524d\u72b6\u6001");
            $("#current-status,#current-status i").click(function(n) {
                var t = $("#status-list");
                t.is(":visible") ? t.hide() : t.show();
                n.stopPropagation()
            }).attr("title", r);
            $("#status-list").mouseleave(function() {
                $("#status-list").hide()
            });
            $("#status-list>a").click(function(n) {
                var t = $(this);
                t.hasClass("selected") || u.server.updateStatus(t.text(), "").done(function() {
                    t.addClass("selected").siblings("a").removeClass("selected");
                    $("#current-status").html(t.html());
                    $(".my-face-icon").html(t.find("i").prop("outerHTML")).attr("title", t.text())
                });
                t.parent().hide();
                n.stopPropagation()
            });
            $("#edit-memo").click(function() {
                var r = $("#current-status"),
                f = $("#user-define-text"),
                e = r.text(),
                i,
                o;
                n.find("option:contains(" + e + ")").length > 0 ? (n.val(e), e == t ? f.show() : f.hide()) : (n.val(t), f.show());
                i = $("#memo-content");
                o = $.layer({
                    type: 1,
                    area: ["auto", "auto"],
                    shade: [.5, "#000"],
                    title: !1,
                    border: [0],
                    fix: !1,
                    page: {
                        dom: "#edit-memo-div"
                    },
                    offset: ["220px", $(window).width() - 450 + "px"],
                    bgcolor: "",
                    success: function() {
                        i.focus()
                    },
                    closeBtn: !1,
                    move: "#edit-memo-div .modal-header",
                    close: function() {
                        i.val(i.data("value"));
                        layer.closeTips()
                    }
                });
                $("#edit-close-btn").on("click",
                function() {
                    layer.close(o)
                });
                $("#edit-memo-btn").unbind().click(function() {
                    var e = i.val(),
                    f,
                    s;
                    if (e.length > 50) layer.tips("\u72b6\u6001\u8bf4\u660e\u4e0d\u80fd\u591a\u4e8e50\u5b57\uff01", i, {
                        style: ["background-color:#66ccff; color:#fff", "#66ccff"],
                        guide: 0,
                        time: 2
                    });
                    else {
                        if (f = n.val(), f == t && (s = $("#user-define-text"), f = SF.util.trim(s.val()), f == "")) {
                            layer.tips("\u8bf7\u586b\u5199\u72b6\u6001\uff01", s, {
                                style: ["background-color:#66ccff; color:#fff", "#66ccff"],
                                guide: 0,
                                time: 2
                            });
                            return
                        } (i.data("value") != e || f != r.text()) && u.server.updateStatus(f, e).done(function() {
                            var t = e,
                            n;
                            t == "" && (t = "\u5f53\u524d\u72b6\u6001");
                            r.attr("title", t);
                            i.data("value") != e && i.data("value", e);
                            f != r.text() && (n = $("#status-list>a:contains('" + f + "'):first"), n.length == 0 && (n = $("#status-list>a:last").show(), n.text(f), n.html(" <i class='sf-icon icon-status icon-zidingyi'><\/i>" + f)), n.addClass("selected").siblings("a").removeClass("selected"), r.html(" <i class='sf-icon icon-status icon-zidingyi'><\/i>" + f), $(".my-face-icon").html("<i class='sf-icon icon-status icon-zidingyi'><\/i>").attr("title", f))
                        });
                        layer.close(o);
                        layer.closeTips()
                    }
                })
            })
        })
    },
    send: function(n, t) {
        var i = $("#user-head>li.selected").data("userid").toString(),
        r = {
            Scope: 3,
            Terminal: 3,
            Type: 1,
            SenderName: this.loginUsername,
            SendContent: n,
            SendTime: new Date,
            ReceiverConnId: $("#userlist-" + i).attr("data-connid"),
            ReceiverId: i,
            ReceiverGroup: ""
        };
        i.indexOf(SF.msg.chat.GROUP_PREFIX) > -1 && (r.Scope = 2);
        this.hub.server.sendMessage(r).done(function(n) {
            typeof t != "undefined" && setTimeout(function() {
                var r = $("#" + t),
                u = new Date(n.FormatSendTime),
                f = $("#recordcurrent-" + i + " .time").not(r).last(),
                e;
                r.text(u.format("HH:mm:ss"));
                f.length == 1 && (e = new Date(f.data("time")), u - e < 3e5 && r.hide());
                r.data("time", n.FormatSendTime)
            },
            500)
        });
        this.copyToRecent(i)
    },
    updateUserList: function(n) {
        var f = "",
        r = "",
        t, v, u, i, h, c, o, l, a;
        for ($(n).each(function(n, t) {
            var i = "",
            u, e, o;
            t.Name != "" && (u = "\u5728\u7ebf", e = t.ImgUrl, t.ConnId == "" && (u = "\u79bb\u7ebf", e = t.OffLineImgUrl), o = t.Status + "\r\n" + t.Memo, i = '<ul id="userlist-' + t.Id + '" data-userid="' + t.Id + '" data-status="' + u + '" data-connid="' + t.ConnId + '" data-order="' + t.Order + '"><li class="l"><img src="' + e + '" title="' + o + '" data-src="' + t.ImgUrl + '"  data-off-src="' + t.OffLineImgUrl + '"/><span class="msg-count">0<\/span><\/li><li class="t" title="' + t.Name + '">' + t.Name + '<\/li><li class="b" title="' + t.JobName + '">' + t.JobName + "<\/li><\/ul>");
            f !== t.GroupId ? (f != "" && (r += "<\/div><\/div>"), f = t.GroupId, r += '<div class="group" data-deptid="' + f + '" data-up-deptid="' + t.UpDeptId + '"><div class="title  margin-bottom-0"><div class="l" title="' + t.GroupName + '">' + t.GroupName + '<\/div><div class="c"><\/div><div class="r arrow-bottomright"><\/div><\/div><div class="clear-float"><\/div><div class="cont">' + i) : r += i
        }), r += "<\/div><\/div>", $(".msg-cont-one").html(r), t = [], v = $(".msg-cont-one").find(".group[data-up-deptid!='0']"), v.each(function() {
            t.push($(this))
        }), u = 0; t.length > 0;) {
            for (i = t.length - 1; i >= 0; i--) {
                var e = t[i],
                y = e.data("up-deptid"),
                s,
                p = "";
                if (u == 0) s = ".msg-cont-one>.group[data-deptid='" + y + "'][data-up-deptid='0']";
                else {
                    for (h = "", c = 0; c < u; c++) h += ".group>.cont>",
                    p += "\u2502";
                    s = ".msg-cont-one>" + h + ".group[data-deptid='" + y + "']"
                }
                o = $(s);
                o.length > 0 && (l = e.find(">.title>.l"), l.text(p + "\u251c" + l.text()), a = o.find(">.cont>.group:first"), a.length > 0 ? a.before(e) : o.find(">.cont").append(e), t = t.slice(0, i).concat(t.slice(i + 1, t.length)))
            }
            if (u++, u > 20) break
        }
        $(".msg-cont-one .group").each(function() {
            for (var r, t = $(this).find(">.cont"), i = t.find(">ul[data-status='\u5728\u7ebf']"), n = i.length - 1; n >= 0; n--) r = $(i[n]),
            t.prepend(r)
        });
        $(".group .title").click(function() {
            var n = $(this).siblings(".cont");
            n.is(":visible") ? SF.msg.chat.inSearch || n.attr("data-show", "0").slideUp().siblings(".title").find(">.r").show() : SF.msg.chat.inSearch || (n.attr("data-show", "1").slideDown().parent().siblings().find(">.cont").slideUp().siblings(".title").find(">.r").show(), n.siblings(".title").find(">.r").hide())
        }).each(function() {
            var n = $(this).siblings(".cont"),
            t = "<span class='online'>" + n.find("ul[data-status='\u5728\u7ebf']").length + "<\/span>/<span class='total'>" + n.find("ul").length + "<\/span>";
            $(this).find(".c").html(t)
        })
    },
    updateGroupList: function(n) {
        var t = "";
        $(n).each(function(n, i) {
            t += '<ul id="userlist-' + i.Id + '" data-userid="' + i.Id + '"  data-connid="' + i.Id + '"><li class="l"><img src="' + i.ImgUrl + '"   /><span class="msg-count">0<\/span><\/li><li class="t" title="' + i.Name + '">' + i.Name + '<\/li><li class="b" title="' + i.Description + '">' + i.Description + "<\/li><\/ul>"
        });
        $(".msg-cont-three .cont").html(t)
    },
    openChatWindow: function(n) {
        function f() {
            var n, t;
            return UE.plugins.shortcutmenu = function() {},
            UE.registerUI("combox",
            function(n, t) {
                for (var i, u = [], f = 0, r; r = [10, 12, 14, 16, 18, 20, 24, 36][f++];) u.push({
                    label: r + "px",
                    value: r + "px",
                    renderLabelHtml: function() {
                        return '<div class="edui-label %%-label" style="line-height:1.5;font-size:' + this.value + ';">' + (this.label || "") + "<\/div>"
                    }
                });
                return i = new UE.ui.Combox({
                    editor: n,
                    items: u,
                    title: "\u5b57\u4f53",
                    initValue: SF.msg.chat.fontSize,
                    onselect: function(t, i) {
                        n.execCommand("selectall");
                        var r = this.items[i].value;
                        setTimeout(function() {
                            n.execCommand("fontsize", r)
                        },
                        1);
                        SF.msg.chat.fontSize = r;
                        $.cookie("chatFontSize", r, {
                            expires: 365
                        })
                    },
                    onbuttonclick: function() {
                        this.showPopup()
                    }
                }),
                n.addListener("selectionchange",
                function() {
                    var r = n.queryCommandState(t);
                    r == -1 ? (i.setDisabled(!0), i.setChecked(!1)) : (i.setDisabled(!1), i.setChecked(r))
                }),
                i
            }),
            n = UE.getEditor("send-msg-content", {
                toolbars: [["emotion", "snapscreen", "simpleupload", "attachment"]],
                theme: "msg",
                initialStyle: "p{ font-size: " + SF.msg.chat.fontSize + ";font-family:'Microsoft YaHei','\u5b8b\u4f53'; }",
                enableContextMenu: !1,
                initialFrameHeight: 100,
                imagePopup: !1,
                emotionLocalization: !0,
                elementPathEnabled: !1,
                wordCount: !1,
                autoHeightEnabled: !1,
                pasteplain: !0,
                focus: !0
            }),
            n.commands.addrow = {
                execCommand: function() {
                    var n = this;
                    return this.execCommand("insertHtml", "<br/>"),
                    n.execCommand("selectall"),
                    setTimeout(function() {
                        n.execCommand("fontszie", SF.msg.chat.fontSize);
                        n.focus(!0)
                    },
                    1),
                    !1
                },
                queryCommandState: function() {}
            },
            n.commands.sendmessage = {
                execCommand: function() {
                    return $("#send-current-msg").click(),
                    !0
                },
                queryCommandState: function() {}
            },
            n.addshortcutkey("addrow", "ctrl+13"),
            n.addshortcutkey("sendmessage", "13"),
            n.ready(function() {
                layer.tips("\u63d0\u793a\uff1aEnter\u952e\u53d1\u9001\uff0cCtrl+Enter\u952e\u6362\u884c", $("#send-current-msg"), {
                    style: ["background-color:#66ccff; color:#fff", "#66ccff"],
                    guide: 0,
                    time: 5
                });
                n.execCommand("serverparam",
                function() {
                    return {
                        from: "home",
                        usercode: SF.msg.chat.loginUsercode
                    }
                })
            }),
            t = $("#xubox_layer" + SF.msg.chat.msgLayer),
            n.addListener("beforesnapscreen",
            function() {
                t.data("left", t.css("left")).css("left", "-10000px")
            }),
            n.addListener("aftersnapscreen",
            function() {
                t.css("left", t.data("left"))
            }),
            n
        }
        var t = n.data("userid"),
        i,
        r,
        u;
        t != this.loginUsercode && (i = $("#userhead-" + t), i.length == 0 && (r = n.find(".t").text(), u = ' <li id="userhead-' + t + '" data-userid="' + t + '"  data-username="' + r + '"><a href="javascript:void(0);" class="showuser"  title="' + r + '"><img src="' + n.find(".l img").attr("src") + '" /><\/a><span class="close" ><\/span><span class="msg-count showuser">0<\/span><span class="arrow-up"><\/span> <\/li>', $("#user-head").append(u), this.createRecordDiv(t).show(), i = $("#userhead-" + t)), this.msgLayer == 0 ? (this.msgLayer = $.layer({
            type: 1,
            area: ["auto", "auto"],
            shade: [0],
            title: !1,
            border: [0],
            move: "#msg-drag",
            page: {
                dom: "#msg-main-container"
            },
            offset: ["", ""],
            bgcolor: "",
            zIndex: 9001,
            closeBtn: !1
        }), this.ueditor = f()) : $("#xubox_layer" + this.msgLayer).show(), this.showUserMsg(i))
    },
    copyToRecent: function(n) {
        var t = "recent-" + n,
        i = $("#" + t),
        r = $(".msg-cont-two .cont");
        i.length > 0 && i.remove();
        r.prepend($("#userlist-" + n).clone().removeAttr("id").attr("id", t))
    },
    createRecordDiv: function(n) {
        var t = "recordcurrent-" + n,
        i = $("#" + t);
        return i.length == 0 && (html = '<li id="' + t + '" data-scroll="999999"><\/li>', $("#msg-record").append(html), i = $("#" + t).hide().preventScroll()),
        i
    },
    addSenderRecord: function(n, t) {
        var h = new Date(n.FormatSendTime),
        u = t.find(".time").last(),
        f = "",
        e = "",
        i,
        r,
        o,
        s;
        n.Scope == 2 && (e = " group-record", i = $("#userlist-" + n.SenderId), r = i.find(".t").text(), f = '<div class="group-user" data-userid="' + n.SenderId + '"><img src="' + i.find("img").data("src") + '"  title="' + r + '"/><div class="username-container"><div class="group-username">' + r + "<\/div><\/div><\/div>");
        o = '<div class="time" data-time="' + n.FormatSendTime + '">' + n.FormatSendTime.replace((new Date).format("yyyy/MM/dd "), "") + "<\/div>" + f + '<div class="you-say record-content ' + e + '">' + n.SendContent + '<span class="arrow-left"><\/span><\/div> <div class="clear-float"><\/div>';
        t.append(o).hide();
        u.length == 1 && (s = new Date(u.data("time")), h - s < 3e5 && t.find(".time").last().hide())
    },
    showBigImg: function(n) {
        var t = new Image;
        t.id = "layimg-tmp";
        t.style.visibility = "hidden";
        t.onload = function() {
            var i = setInterval(function() {
                if (t.complete) {
                    clearInterval(i);
                    imgW = t.offsetWidth;
                    imgH = t.offsetHeight;
                    $("#" + t.id).remove();
                    var r = document.documentElement.clientWidth - 200,
                    u = document.documentElement.clientHeight - 200;
                    r = imgW > r ? r: imgW;
                    r = r < 120 ? 120 : r;
                    u = imgH > u ? u: imgH;
                    $.layer({
                        type: 1,
                        title: "\u67e5\u770b\u56fe\u7247",
                        border: [0],
                        closeBtn: [0],
                        shadeClose: !0,
                        area: ["auto", "auto"],
                        page: {
                            html: '<div class="big-img" style="width:' + r + "px; height:" + (u + 40) + 'px;"><img src="' + n + '" /><\/div>'
                        },
                        bgcolor: "",
                        closeBtn: [0, !0]
                    })
                }
            },
            100)
        };
        t.src = n;
        document.body.appendChild(t)
    },
    closeChat: function() {
        $("#xubox_layer" + this.msgLayer).hide();
        layer.closeTips();
        this.ueditor.execCommand("cleardoc")
    },
    showMoreRecord: function(n, t) {
        var e = !1,
        r = n.data("userid").toString(),
        f,
        i,
        u;
        r.indexOf(this.GROUP_PREFIX) > -1 && (e = !0);
        f = $("#msg-more");
        n.attr("data-show-record") == 1 ? (f.addClass("selected"), $(".right-content iframe").hide(), i = $("#ifrmuserrecord-" + r), i.length == 0 ? (u = '<iframe id="ifrmuserrecord-' + r + '" src="chat/MessageRecord.aspx?usercode=' + r + "&username=" + n.data("username") + '"  frameborder="no" border="0" marginwidth="0" marginheight="0" ><\/iframe>', $(".right-content").append(u)) : (i.show(), t && (i[0].src = i[0].src)), $(".right-content").removeClass("group-width").show()) : (f.removeClass("selected"), e ? ($(".right-content").addClass("group-width").show().find("iframe").hide(), i = $("#ifrmgroup-" + r), i.length == 0 ? (u = '<iframe id="ifrmgroup-' + r + '" src="chat/grouplist.aspx?id=' + r + "&usercode=" + this.loginUsercode + '"  frameborder="no" border="0" marginwidth="0" marginheight="0" ><\/iframe>', $(".right-content").append(u)) : i.show()) : $(".right-content").hide())
    },
    removeCurrentMsg: function(n) {
        var i = n.data("userid"),
        t = n.siblings(":last");
        t.length == 0 ? this.closeChat() : n.hasClass("selected") && this.showUserMsg($("#userhead-" + t.data("userid")));
        $("#ifrmuserrecord-" + i).remove();
        n.remove()
    },
    showUserMsg: function(n) {
        var t = this,
        u = n.data("userid"),
        s = n.siblings(".selected").removeClass("selected"),
        f,
        r,
        i,
        o;
        t.ueditor != null && t.ueditor.isReady && (s.length == 1 && s.data("message", t.ueditor.getContent()), f = n.data("message"), f != undefined && f != "" ? t.ueditor.setContent(f) : t.ueditor.execCommand("cleardoc"), t.ueditor.focus(), t.ueditor.execCommand("selectall"), setTimeout(function() {
            t.ueditor.execCommand("fontsize", t.fontSize)
        },
        1));
        n.addClass("selected");
        r = n.position().left;
        r < 0 && (r = 0); (r > 530 || r == 0) && $("#user-head").scrollLeft(r);
        var l = $("#ifrmuserrecord-") + u,
        h = $("#userlist-" + u + " .msg-count"),
        c = parseInt(h.text()),
        e = $("#recordcurrent-" + u);
        e.show().siblings(":visible").each(function() {
            var n = $(this);
            n.data("scroll", n.prop("scrollTop")).hide()
        });
        c > 0 ? (this.hub.server.setRead(u), setTimeout(function() {
            e.scrollTop(9999999)
        },
        200), $("#recent-" + u + " .msg-count").hide()) : e.scrollTop(e.data("scroll"));
        $totalEle = $("#total-num");
        i = parseInt($totalEle.text()) - c;
        i > 99 ? (i = "99<i>+<\/i>", $totalEle.addClass("large"), $totalEle.html(i)) : ($totalEle.removeClass("large"), $totalEle.text(i));
        o = parseInt($(".waiting-work-tip .count").text()) + i;
        o > 99 ? (o = "99<i>+<\/i>", $("#msg-total-num").addClass("large")) : $("#msg-total-num").removeClass("large");
        $("#msg-total-num").html(o).show();
        $("#msg-total-num").text() == "0" && ($("#msg-total-num").hide(), $("#msg-container").removeClass("in"));
        i < 1 ? ($totalEle.removeClass("large"), $totalEle.hide(), $("#recentsession").removeClass("unread")) : $totalEle.show();
        h.html(0).hide();
        n.find(".msg-count").html(0).hide();
        this.showMoreRecord(n, !1)
    },
    getAnswer: function(n, t, i) {
        var r = this,
        o;
        if (typeof i != "undefined" && i != "" && r.hub.server.saveRobot(i), n == "") {
            var f = new Date,
            e = f.format("yyyy/MM/dd HH:mm:ss"),
            u = r.createRecordDiv(r.SF_ROBOT_ID);
            t != "" && $("#" + t).text(f.format("HH:mm:ss")).data("time", e);
            o = {
                FormatSendTime: e,
                SendContent: "<img src='" + this.getFace() + "'/>"
            };
            r.addSenderRecord(o, u);
            u.show();
            setTimeout(function() {
                u.scrollTop(9999999)
            },
            200);
            return
        }
        $.post("robot/RobotAnswer.aspx", {
            q: n
        },
        function(n) {
            var u = n.data,
            f, i;
            if (typeof n.data == "undefined") {
                alert("\u8bbf\u95ee\u51fa\u9519\uff01");
                return
            }
            t != "" && $("#" + t).text(new Date(n.time).format("HH:mm:ss")).data("time", n.time);
            f = {
                FormatSendTime: n.time,
                SendContent: u
            };
            r.hub.server.saveRobotAnswer(u);
            i = r.createRecordDiv(r.SF_ROBOT_ID);
            r.addSenderRecord(f, i);
            i.show();
            setTimeout(function() {
                i.scrollTop(9999999)
            },
            200)
        }).error(function() {})
    }
};
SF.msg.tips = {
    loginUsercode: "",
    lastQueryTime: "",
    lastQueryNoteTime: "",
    tmpD: "",
    minOpen: !1,
    isMinStatus: function() {
        var n = !1;
        return n = window.outerWidth != undefined ? window.outerWidth <= 160 && window.outerHeight <= 28 : window.screenTop < -3e4 && window.screenLeft < -3e4,
        n && this.tmpD == "" ? this.tmpD = (new Date).format("yyyy-MM-dd HH:mm:ss") : n || (this.tmpD = ""),
        n
    },
    autoIframe: function(n) {
        layer.iframeAuto(n);
        var t = $("#xubox_layer" + n);
        t.css("top", $(window).height() - t.height() + "px")
    },
    init: function(n, t) {
        var i = this;
        i.loginUsercode = n;
        this.getMsg(!0);
        setInterval("SF.msg.tips.getMsg();", t)
    },
    getMsg: function(n) {
        var i = this,
        t;
        this.isMinStatus() ? this.minOpen && (this.lastQueryTime == "" && (this.lastQueryTime = (new Date).format("yyyy-MM-dd HH:mm:ss")), t = this.lastQueryTime, $.get("showtip.aspx?json=1&now=" + t,
        function(n) {
            if (n == 1) {
                var i = window.screen.availWidth - 415,
                r = window.screen.availHeight - 300;
                msgSound();
                window.open("ShowTip.aspx?now=" + t, "_blank", "height=400, width=600, top=" + r + ", left=" + i + ", toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no, status=no")
            }
        }), this.lastQueryTime = (new Date).format("yyyy-MM-dd HH:mm:ss")) : SF.msg.getTaskMsg.inIt();
		/**
        $.get("CheckOnlineCall.aspx",
        function(n) {
            if (n != "0" && n.indexOf("html") == -1) {
                var t = "AttendanceManage/ReplyRollCall.aspx?ID=" + n,
                i = screen.availHeight / 2 - 90,
                r = screen.availWidth / 2 - 175,
                u = "width=350,height=300, border=none, top=" + i + ", left=" + r + ",toolbar=no,menubar=no,scrollbars=no,resizable=no, location=no,status=no";
                window.open(t, "", u)
            }
        });
		**/
        n /**|| $.get("CheckOnlineUser.aspx",
        function(n) {
            n == "Y" && (top.location.href = "Message.aspx?MID=501&UserCode=" + i.loginUsercode)
        })
		**/
    }
};
SF.msg.getTaskMsg = {
    option: {
        ParmValue: "gettaskdo",
        RecordOwner: $.cookie("SFOAUserCode"),
        pageSize: 0,
        dataObj: $("#tip-do-lists")
    },
    inIt: function() {
        this.getTaskUnDo();
        this.getTaskDo();
        this.getTaskSend();
        this.bindMore()
    },
    getTaskDo: function() {
        var n = SF.msg.getTaskMsg;
        n.option.dataObj = $("#tip-do-lists");
        n.option.ParmValue = "gettaskdo";
        n.ajaxGetMsg()
    },
    getTaskSend: function() {
        var n = SF.msg.getTaskMsg;
        n.option.dataObj = $("#tip-send-lists");
        n.option.ParmValue = "gettasksend";
        n.ajaxGetMsg()
    },
    ajaxGetMsg: function() {
        var n = SF.msg.getTaskMsg,
        t = n.option.dataObj;
		/**
        $.ajax({
            type: "get",
            url: "HomeDataHandler/ajax_home.ashx?v=" + Math.random(),
            data: {
                action: "gettask",
                ParmValue: n.option.ParmValue,
                RecordOwner: n.option.RecordOwner
            },
            success: function(i) {
                var r = i.length;
                r > 0 && (msgSound(), t.html(""), $.each(i,
                function(n, i) {
                    var u = createMsgListHtml(i),
                    r = $(u);
                    r.click(function() {
                        homeCommon.OpenTask(i)
                    });
                    t.append(r)
                }), createScroll(n.option.dataObj))
            },
            dataType: "json"
        })
		**/
    },
    bindMore: function() {
        var n = SF.msg.getTaskMsg;
        $("#do-more").on("click",
        function() {
            var n = SF.util.getPath() + "PublicModule/Task/Task.aspx?click=2";
            SF.tab.addTab("dotask", "\u5df2\u529e", n, !0, !1, !1)
        });
        $("#send-more").on("click",
        function() {
            var n = SF.util.getPath() + "PublicModule/Task/Task.aspx?click=3";
            SF.tab.addTab("sendtask", "\u5df2\u53d1", n, !0, !1, !1)
        })
    },
    getTaskUnDo: function() {
        var n = $("#detail-tip-list"),
        t;
		/**
        $.ajax({
            type: "Get",
            url: "ShowTip.aspx?important=true",
            success: function(i) {
                var r = [];
                if (n.html(""), i.length > 0) {
                    var f = i.length,
                    u = new Date,
                    e = u.format("yyyy-MM-dd HH:mm:ss");
                    $.each(i,
                    function(n, t) {
                        var e = {
                            width: "1200",
                            height: "600",
                            title: "\u7cfb\u7edf\u63d0\u9192",
                            body: ""
                        },
                        i = "",
                        o = "\u7cfb\u7edf\u63d0\u9192",
                        u = t.Title,
                        h = u.length > 16 ? u.substring(0, 15) + "...": u,
                        s = $.timeago(t.SendTime.format("yyyy-MM-dd HH:mm:ss")),
                        c = t.Url,
                        l = SF.util.getPath() + "images/new/icons/system-tip.png",
                        f;
                        e.body = "<iframe style=' width:100%; height:100%;' frameborder='0' src='" + c + "'><\/iframe>";
                        i = i + "<li>";
                        i = i + '  <div class="tip-content">';
                        i = i + '    <a class="pull-left user-img" href="javascript:void(0)">';
                        i = i + '     <img class="media-object" src="' + l + '" alt="' + o + '"><\/a>';
                        i = i + '     <div class="media-body">';
                        i = i + '     <p class="tip-user-name">' + o + '<time datetime="' + s + '">' + s + "<\/time><\/p>";
                        i = i + '     <p title="' + u + '">' + h + "<\/p>";
                        i = i + "       <\/div><\/div>";
                        i = i + "<\/li>";
                        f = $(i);
                        f.click(function() {
                            homeCommon.TaskModal.open(e)
                        });
                        r.push(f)
                    });
                    n.append(r)
                }
                t()
            },
            dataType: "json"
        });
		**/
        t = function() {
			/**
            $.ajax({
                type: "get",
                url: "HomeDataHandler/ajax_home.ashx",
                data: {
                    action: "gettask",
                    ParmValue: "gettaskundo",
                    RecordOwner: myUsercode
                },
                success: function(t) {
                    var r = t.length;
                    r > 0 && (msgSound(), $.each(t,
                    function(t, i) {
                        var u = createMsgListHtml(i),
                        r = $(u);
                        r.click(function() {
                            homeCommon.OpenTask(i)
                        });
                        n.append(r)
                    }));
                    var i = 0,
                    u = $(".waiting-work-tip .count"),
                    r = n.find("li").length;
                    r > 0 ? (u.text(parseInt(r)).show(), i = parseInt(r) + parseInt($("#total-num").text()), i > 99 ? (i = "99<i>+<\/i>", $("#msg-total-num").addClass("large")) : $("#msg-total-num").removeClass("large"), $("#msg-total-num").html(i).show(), $("#msg-container").addClass("in")) : (u.text(0).hide(), i = parseInt($("#total-num").text()), (i == "" || i == "0") && ($("#msg-total-num").hide(), $("#msg-container").removeClass("in")));
                    $("#task-tab>li:first").click()
                },
                dataType: "json"
            })
			**/
        }
    }
};
var createMsgListHtml = function(n) {
    var f = new Date,
    s = f.format("yyyy-MM-dd HH:mm:ss"),
    t = "",
    i = n.Title.replace(/<\/?[^>]*>/g, ""),
    e = n.InitiatorPic == "" || n.InitiatorPic == null ? "images/new/icons/BBS_Image.png": SF.util.getPath() + "publicfile/" + n.InitiatorPic,
    r = n.InitiatorName,
    o = i.length > 16 ? i.substring(0, 15) + "...": i,
    u = $.timeago(n.ReceiveTime);
    return t = t + "<li>",
    t = t + '  <div class="tip-content">',
    t = t + '    <a class="pull-left user-img" href="javascript:void(0)">',
    t = t + '     <img class="media-object" src="' + e + '" alt="' + r + '"><\/a>',
    t = t + '     <div class="media-body">',
    t = t + '     <p class="tip-user-name">' + r + '<time datetime="' + u + '">' + u + "<\/time><\/p>",
    t = t + '     <p title="' + i + '">' + o + "<\/p>",
    t = t + "       <\/div><\/div>",
    t + "<\/li>"
},
createScroll = function(n) {
    var t = n.find("li").length;
    if ($(".page-sidemsg").hasClass("open") && t > 0) {
        var r = $(".page-sidemsg").height(),
        i = r - $(".page-sidemsg .top-title-tab").height() - $(".page-sidemsg .panel-footer").height() - 110;
        i < 71 * t && n.slimScroll({
            height: i,
            size: "10px"
        })
    }
}