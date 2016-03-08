/*
 * 邮件中心
 */
$(function () {
    $.ajaxSetup({
        cache: false
    });

    init();//初始化

    /***********导航区**********/

    //鼠标经过样式
    $(".mail-nav-item").hover(function () {
        $(this).addClass("hover");
    }, function () {
        $(this).removeClass("hover");
    });
    $(".mail-nav dd").hover(function () {
        $(this).addClass("hover");
    }, function () {
        $(this).removeClass("hover");
    });
    $(".mail-nav-top .option").hover(function () {
        $(this).addClass("hover");
    }, function () {
        $(this).removeClass("hover");
    })

    //搜索
    $(".mail-search-txt").focus(function () {
        var me = $(this);
        me.val("");
        me.addClass("focus");
    });
    $(".mail-search-txt").blur(function () {
        var me = $(this);
        if ($.trim(me.val()) == "") {
            me.val("邮件搜索...");
        }
    });

    //邮件夹
    $(".item-floder").click(function () {
        var me = $(".mailfolder");
        me.find("ul").slideToggle("fast", function () {
            if (me.find("ul").css("display") == "none") {
                $(".floder-icon").removeClass("show");
            }
            else {
                $(".floder-icon").addClass("show");
            }
        });
    });
    $(".floder-icon").click(function () {
        $(this).toggleClass("show");
        $(this).parent().find("ul").toggle();
    })



    /***********未读邮件**********/

    //鼠标经过样式
    $(".tool-menu-item").hover(function () {
        $(this).addClass("hover");
    }, function () {
        $(this).removeClass("hover");
    });


    //工具栏单击
    $(".tool").hover(function () {
        var me = $(this);
        me.siblings().find(".tool-menu").hide();
        me.find(".tool-menu").toggle();
    });

    //选中
    $(".mails-check").click(function (e) {
        var me = $(this);
        if (me[0].checked) {
            $(".mail-curshow").find(".mail-row").addClass("select").find(".mail-check").prop("checked", true);
        }
        else {
            $(".mail-curshow").find(".mail-row").removeClass("select").find(".mail-check").prop("checked", false);
        }
        e.stopPropagation();
    });
    //选中项
    $(".tool_select .tool-menu-item").click(function () {
        $(".mail-curshow").find(".mail-row").siblings().removeClass("select").find(".mail-check").prop("checked", false);
        var me = $(this);
        switch (me.data("id").toString()) {
            case "1"://全选
                $(".mail-curshow").find(".mails-check").prop("checked", true);
                $(".mail-curshow").find(".mail-row").siblings().addClass("select").find(".mail-check").prop("checked", true);
                break;
            case "2"://不选
                $(".mail-curshow").find(".mails-check").prop("checked", false);
                $(".mail-curshow").find(".mail-row").siblings().removeClass("select").find(".mail-check").prop("checked", false);
                break;
            case "3"://已读
                var len = $(".mail-curshow").find(".mail-cont-read").length;
                if (len > 0) {
                    $(".mail-curshow").find(".mail-row").siblings().removeClass("select").find(".mail-check").prop("checked", false);
                    $(".mail-curshow").find(".mail-cont-read").addClass("select").find(".mail-check").prop("checked", true);
                }
                else {
                    $(".mail-curshow").find(".mails-check").prop("checked", false);
                }
                break;
            case "4"://未读
                var len = $(".mail-curshow").find(".mail-cont-unread").length;
                if (len > 0) {
                    $(".mail-curshow").find(".mail-row").siblings().removeClass("select").find(".mail-check").prop("checked", false);
                    $(".mail-curshow").find(".mail-cont-unread").addClass("select").find(".mail-check").prop("checked", true);
                }
                else {
                    $(".mail-curshow").find(".mails-check").prop("checked", false);
                }
                break;
            default:
                break;
        }
    })
    //查看
    $(".tool_lookup .tool-menu-item").click(function (e) {
        var me = $(this);
        switch (me.data("id").toString()) {
            case "1"://内部邮件
                MAIL.Receive.getUnreadMail(undefined, "1");
                $(".tool_lookup").data("type", "1");
                break;
            case "2"://外部邮件
                MAIL.Receive.getUnreadMail(undefined, "2");
                $(".tool_lookup").data("type", "2");
                break;
            case "3":
                MAIL.Receive.getUnreadMail(undefined, "3");
                $(".tool_lookup").data("type", "3");
                break;
            default:
                break;
        }
    })

    /***********写信**********/
    //鼠标经过样式
    $(".write-toolr-item").hover(function () {
        $(this).addClass("hover");
    }, function () {
        $(this).removeClass("hover");
    });
    $(".addresses-list-item").hover(function () {
        $(this).addClass("hover");
    }, function () {
        $(this).removeClass("hover");
    });
    $(".addr-addgroup").hover(function () {
        $(this).addClass("hover");
    }, function () {
        $(this).removeClass("hover");
    });
    $(".addr-group").hover(function () {
        $(this).find(".addr-addgroup").show();
    }, function () {
        $(this).find(".addr-addgroup").hide();
    })
    $(".send-theme").click(function () {
        var me = $(this);
        me.parent().parent().parent().find(".input-content").removeClass("active").end().find(".input-title").removeClass("active").end().find(".input-option").removeClass("active");
        me.parent().parent().find(".input-content").addClass("active").end().find(".input-title").addClass("active").end().find(".input-option").addClass("active");
    })
    //输入邮箱地址
    $(".send-addresss").click(function (e) {
        var me = $(this);
        me.parent().parent().parent().find(".write-input-row").removeClass("mail-inputaddr-cur").find(".input-content").removeClass("active").end().find(".input-title").removeClass("active").end().find(".input-option").removeClass("active");
        me.parent().parent().addClass("mail-inputaddr-cur").find(".input-content").addClass("active").end().find(".input-title").addClass("active").end().find(".input-option").addClass("active");
        var $inputtxt = me.find(".input-txt");
        if ($inputtxt.val() != undefined) {
            if ($.trim(me.find(".input-txt").val()) == "") {
                $inputtxt.appendTo(me).css("visibility", "visible").focus();
                me.find(".input-txt").focus();
            }
            else {
                addmailaddr($inputtxt);//添加邮件地址
                
            }
        }
        else {
            me.parent().find(".input-txt").appendTo(me).css("visibility", "visible").focus();
            me.parent().find(".input-txt").focus();
        }
    });
    $(".input-txt").click(function (e) {
        $(this).focus();
        e = e || window.event;
        if (e.stopPropagation)
            e.stopPropagation();
        else
            e.cancelBubble = true;
    })
    //输入邮箱地址失去焦点时
    $(".input-txt").blur(function (e) {
        var me = $(this);
        if ($.trim(me.val()) == "") {
            me.css("width", "1").css("visibility", "visible").val("");
        }
        else {
            addmailaddr(me);//添加邮件地址
        }
        me.parent().next().hide();//联系人提示
        if (me.data("type") == 1) { //判断输入框是否为输入状态
            me.focus();
            me.data("type", "0");
            e = e || window.event;
            if (e.stopPropagation)
                e.stopPropagation();
            else
                e.cancelBubble = true;
        }

    });
    //删除
    $(".input-txt").keydown(function (e) {
        if (e.keyCode == 8 || e.keyCode == 46) {
            if ($(this).val() == "") {
                $(this).prev().remove();
            }
        }
    });
    //输入联系人信息 输入框宽度变化
    $(".input-txt").keydown(function () {
        var me = $(this);
        var len = me.val().length;
        var inputlen = len * 10 + 50;
        me.css("width", inputlen + "px");
    });
    //输入联系人 实时获取相应信息
    $(".input-txt").keyup(function () {
        var me = $(this);
        if (me.data("type") == 2) { //判断输入框是否为选择状态
            me.data("type", "0");
        }
        else {
            MAIL.Address.getMatchAddrs(me);
        }
    })
    //页面 键盘事件
    $(document).keydown(function (e) {
        var curActive = document.activeElement;
        if (curActive.className == "input-txt") {
            var $inputtxt = $(curActive);
            switch (e.keyCode) {
                case 13: //Enter
                    if ($inputtxt.val() !== "") {
                        $inputtxt.parent().click().end().val("");
                        $inputtxt.data("type", "1");  //输入框 输入状态
                    }
                    break;
                case 38: //Up
                    var $match = $inputtxt.parent().next();
                    var active = $match.find("li").filter(".active");
                    if (active.length > 0) {
                        var prevli = active.prev();
                        if (prevli.length > 0) {
                            $match.find("li").removeClass("active");
                            prevli.addClass("active");
                            $inputtxt.data("type", 2); //输入框 选择状态
                        }
                    }
                    break;
                case 40: //Down
                    var $match = $inputtxt.parent().next();
                    var active = $match.find("li").filter(".active");
                    if (active.length > 0) {
                        var nextli = active.next();
                        if (nextli.length > 0) {
                            $match.find("li").removeClass("active");
                            nextli.addClass("active");
                            $inputtxt.data("type", 2); //输入框 选择状态
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    });

    //联系人组
    $(".addr-floder").click(function () {
        var me = $(this);
        me.next().toggle();
        if (me.prev().hasClass("show")) {
            me.prev().removeClass("show");
        }
        else {
            me.prev().addClass("show");
        }
    });
    //联系人组图标点击
    $(".addr-icon").click(function () {
        $(this).toggleClass("show");
        $(this).next().next().toggle();
    })
    //添加联系人
    $(".item-addr").click(function (e) {
        addaddr($(this));
    });
    //添加该组
    $(".addr-addgroup").click(function (e) {
        addaddrgroup($(this));
        e = e || window.event;
        if (e.stopPropagation)
            e.stopPropagation();
        else
            e.cancelBubble = true;
    })
    //抄送
    $(".toolr-copysend").click(function () {
        var me = $(this);
        if (me.find("span").text() == "抄送") {
            $(".input-copysend").show();
            me.find("span").text("取消抄送");
            me.data("status", "1");
        } else {
            $(".input-copysend").hide();
            me.find("span").text("抄送");
            me.data("status", "0");
            $(".input-copysend").find(".send-address").remove();
        }
    })

    //密送
    $(".toolr-bccsend").click(function () {
        var me = $(this);
        if (me.find("span").text() == "密送") {
            $(".input-bccsend").show();
            me.find("span").text("取消密送");
            me.data("status", "1");
        } else {
            $(".input-bccsend").hide();
            me.find("span").text("密送");
            me.data("status", "0");
            $(".input-bccsend").find(".send-address").remove();
        }
    })

    //单独发送
    $(".toolr-groupsend").click(function () {
        var me = $(this);
        if (me.find("span").text() == "单独发送") {
            $(".input-groupsend").show();
            me.find("span").text("取消单独发送");
            me.data("status", "1");
            $(".input-copysend").hide();
            $(".input-bccsend").hide();
            $(".input-send").hide();
            $(".toolr-bccsend").hide();
            $(".toolr-copysend").hide();
            $(".input-title-groupsend").css("width", "70px");
        } else {
            $(".input-groupsend").hide();
            me.find("span").text("单独发送");
            me.data("status", "0");

            $(".input-send").show();
            if ($(".toolr-copysend").data("status") == 1) {
                $(".input-copysend").show();
            }
            if ($(".toolr-bccsend").data("status") == 1) {
                $(".input-bccsend").show();
            }
            $(".toolr-bccsend").show();
            $(".toolr-copysend").show();
            $(".input-title-groupsend").css("width", "60px");
        }
    })

    //选中短信提醒
    $("#option-msg").click(function (e) {

        $(".option-send-msgtype").toggleClass("option-nochecked");
        if ($(this)[0].checked) {
            $(this).prop("checked", true);
            $("#option-msgmain").removeAttr("disabled");
            $("#option-msgall").removeAttr("disabled");
        } else {
            $(this).prop("checked", false);
            $("#option-msgmain").attr("disabled", "disabled");
            $("#option-msgall").attr("disabled", "disabled");
        }
    })

    //添加附件
    $(".attachment-btn-file").change(function () {
        if ($(this).val() == "")
            return;
        var path = $(this).val();
        var files = path.split(".");
        var filter = files[files.length - 1];

        var filepath = path.split("\\");
        var name = filepath[filepath.length - 1];

        var size = getFileSize($(this));
        if (size == -1) {
            layer.alert("你所选择的文件不能上传,原因如下：\n\t 文件大小未知!", 3, "附件上传提示");
        } else if (size == -2) {
            layer.alert("你所选择的文件不能上传,原因如下：\n\t 单文件大小超过最大限制(1G)!", 3, "附件上传提示");
        }
        else {
            $('</div><div class="attachment-cont"><div title="' + name + '" class="attachment-name">' + name + '</div><div class="attachment-size">' + size + '</div><span class="attachment-del" onmouseover="delattaover($(this))" onmouseout="delattaout($(this))" onclick="delatta($(this))">删除</span></div>')
            .appendTo(".attachment-conts");
        }
        $(this).val("");
    });

    //删除附件
    $(".attachment-del").click(function () {
        $(this).parent().remove();
    });

    /*查看邮件*/
    $(".mail-toolbar .tool").hover(function () {
        $(this).addClass("hover");
    }, function () {
        $(this).removeClass("hover");
    })
    //删除-收件
    $("#recv_del").click(function () {
        var type = $(".mail-recv").data("type");
        var ids = "";
        var idsout = "";
        var idssend = "";
        var idssendout = "";
        $(".mail-recv").find(".mail-row").filter(".select").each(function () {
            var me = $(this);
            if (me.hasClass("select")) {
                var id = me.data("id");
                var flag = me.data("flag");
                if (me.hasClass("mail-typeout")) {
                    if (flag == "send") {
                        idssendout += id + ",";
                    }
                    else {
                        idsout += id + ",";
                    }
                  
                } else {
                    if (flag == "send") {
                        idssend += id + ",";
                    }
                    else {
                        ids += id + ",";
                    }
                }
            }
        })

        if (ids == "" && idsout == ""&&idssend==""&&idssendout=="") {
            sysmsg("请选择邮件");
        }
        else {
            if (ids != "") {
                MAIL.Receive.delInRecvMail(ids);
            }
            if (idsout != "") {
                MAIL.Receive.delOutRecvMail(idsout);
            }
            if (idssend != "") {
                MAIL.Send.deleteMail(idssend, "1", "in");
            }
            if(idssendout!="") {
                MAIL.Send.deleteMail(idssendout, "2", "out");
            }
        }
    })
    //删除-已发送
    $("#sendin_del").click(function () {
        var ids = "";
        $(".mail-sendin").find(".mail-row").filter(".select").each(function () {
            var me = $(this);
            if (me.hasClass("select")) {
                var id = me.data("id");
                ids += id + ",";
            }
        })
        if (ids != "") {
            var navid = getCurNavID();
            if (navid == "mailInSend") {
                MAIL.Send.deleteMail(ids, "1","in");
            }
            else {
                MAIL.Send.deleteMail(ids, "2","out");
            }

        } else {
            sysmsg("请选择邮件");
        }
    })
    //删除-草稿箱
    $("#draft_del").click(function () {
        var ids = "";
        $(".mail-draft").find(".mail-row").filter(".select").each(function () {
            var me = $(this);
            if (me.hasClass("select")) {
                var id = me.data("id");
                ids += id + ",";
            }
        })
        if (ids != "") {
            MAIL.Send.deleteMail(ids, "0");
        }
        else {
            sysmsg("请选择邮件");
        }
    })
    //标记-收件
    $(".tool_mark").find(".tool-menu-item").click(function () {
        var id = $(this).data("id");
        var ids = "";
        var types = "";
        var flags = "";
        $(".mail-curshow").find(".mail-row").filter(".select").each(function () {
            var me = $(this);
            var id = me.data("id");
            var type = me.data("type");
            var flag = me.data("flag");
            ids += id + ",";
            types += type + ",";
            flags += flag + ",";
        })
        if (id == 3) {
            //全部设为已读
            MAIL.Receive.setRead(ids, "2", types);
        } else {
            if (ids != "") {
                switch (id) {
                    case 1:   //已读
                        MAIL.Receive.setRead(ids, "1", types);
                        break;
                    case 2:   //未读
                        MAIL.Receive.setRead(ids, "0", types);
                        break;
                    case 3:   //全部设为已读
                        //MAIL.Receive.setRead(ids, "2", types);
                        break;
                    case 4:   //置顶
                        MAIL.Receive.setTop(ids, "1", types);
                        break;
                    case 5:   //取消置顶
                        MAIL.Receive.setTop(ids, "0", types);
                        break;
                    case 6://标记星标
                        MAIL.Receive.setStar(ids, "1", flags, types);
                        $(".mail-curshow").find(".mail-row").filter(".select").find(".row-star").addClass("active");
                        break;
                    case 7: //取消星标
                        MAIL.Receive.setStar(ids, "0", flags, types);
                        $(".mail-curshow").find(".mail-row").filter(".select").find(".row-star").removeClass("active");
                        break;
                    default:
                        break;
                }
            }
            else {
                sysmsg("请选择邮件");
            }
        }
      
    })
    //移动-收件
    $("#recv_move").find(".tool-menu-item").click(function () {
        var ids = "";
        var types = "";
        $(".mail-recv").find(".mail-row").filter(".select").each(function () {
            var me = $(this);
            var id = me.data("id");
            var type = me.data("type");
            ids += id + ",";
            types += type + ",";
        })
        if (ids != "") {
            var folerid = $(this).data("id");
            MAIL.Receive.moveFolder(ids, types, folerid);
        }
    })
    //移动-收件
    $("#recvout_move").find(".tool-menu-item").click(function () {
        var ids = "";
        var types = "";
        $(".mail-recvout").find(".mail-row").filter(".select").each(function () {
            var me = $(this);
            var id = me.data("id");
            var type = me.data("type");
            ids += id + ",";
            types += type + ",";
        })
        if (ids != "") {
            var folerid = $(this).data("id");
            MAIL.Receive.moveFolderOut(ids,types, folerid);
        }
    })
    //移动-已发送
    $("#sendin_move").find(".tool-menu-item").click(function () {
        var ids = "";
        var types = "";
        $(".mail-sendin").find(".mail-row").filter(".select").each(function () {
            var me = $(this);
            var id = me.data("id");
            var type = me.data("type");
            ids += id + ",";
        })
        if (ids != "") {
            var folerid = $(this).data("id");
            MAIL.Send.moveFolder(ids,types, folerid);
        }
    })
    //移动外部-已发送
    $("#sendout_move").find(".tool-menu-item").click(function () {
        var ids = "";
        $(".mail-sendout").find(".mail-row").filter(".select").each(function () {
            var me = $(this);
            var id = me.data("id");
            ids += id + ",";
        })
        if (ids != "") {
            var folerid = $(this).data("id");
            MAIL.Send.moveFolder(ids, folerid);
        }
    })
    //刷新-收件
    $("#recv_refresh").click(function () {
        MAIL.Receive.refresh();
    })
    //刷新-已发送
    $("#sendin_refresh").click(function () {
        var navid = getCurNavID();
        if (navid == "mailInSend") {
            MAIL.Send.refresh("1", "in");
        }
        else {
            MAIL.Send.refresh( "1", "out");
        }
    })
    //刷新-草稿箱
    $("#draft_refresh").click(function () {
        MAIL.Send.refresh("0");
    })
    //收件
    $("#mailRecv").click(function () {
        var layerid = layer.load("正在收件...");
        selectMenu($("#mailUnread"));//选择菜单
        showCont($(".mail-recv"));//显示内容
        MAIL.Receive.getUnreadMail();
        //接收一次外部邮件
        MAIL.Receive.autoRefreshOutMail();
    });
    //写信
    $("#mailSend").click(function () {
        if (!$(this).hasClass("select")) {
            MAIL.Address.getAddressGroup();//获取联系人组
            MAIL.Address.getRecentContact();//获取最近联系人            
            selectMenu($(this));
            showCont($(".mail-write"));//显示内容
            $(".input-send").addClass("mail-inputaddr-cur").find(".input-content").addClass("active").end().find(".input-title")
                .addClass("active").end().find(".input-option").addClass("active").end().find(".send-addresss").click();
            clearSendInfo();
        }
    });
    //未读邮件
    $("#mailUnread").click(function () {
        //if (!$(this).hasClass("select")) {
            selectMenu($(this));
            showCont($(".mail-recv"));//显示内容
            MAIL.Receive.getUnreadMail();
            $(".mail-recv").data("type", "0");
        //}
    });
    //星标邮件
    $("#mailStar").click(function () {
        selectMenu($(this));
        showCont($(".mail-recv"));//显示内容
        MAIL.Receive.getStarMail();
        $(".mail-recv").data("type", "3");
        $(".starmail-icon").addClass("active");
    });
    //邮件夹
    $(".item-file").click(function () {

    })
    //通讯录
    $("#mailAddresses").click(function () {
        if (!$(this).hasClass("select")) {
            selectMenu($(this));
            showCont($(".mail-addres"));//显示内容
            MAIL.Address.getContact();

        }
    })
    //草稿箱
    $("#mailDraft").click(function () {
        if (!$(this).hasClass("select")) {
            selectMenu($(this));
            showCont($(".mail-draft"));//显示内容
            MAIL.Send.getDraftMailList();
        }
    })
    //回收箱
    $("#mailRecover").click(function () {
        if (!$(this).hasClass("select")) {
            selectMenu($(this));
            showCont($(".mail-recover"));//显示内容
        }
        MAIL.Receive.getRecoverMail();
    })
    //内部邮件 收件箱
    $("#mailInRecv").click(function () {
       // if (!$(this).hasClass("select")) {
            selectMenu($(this));
            showCont($(".mail-recv"));//显示内容
            MAIL.Receive.getInRecvMail();
            $(".mail-recv").data("type", "1"); //0-未读邮件信息;1-内部收件箱信息
       // }
    })
    //内部邮件 发件箱
    $("#mailInSend").click(function () {
       // if (!$(this).hasClass("select")) {
            selectMenu($(this));
            showCont($(".mail-sendin"));//显示内容
            MAIL.Send.getMailList();
            $(".mail-sendin").data("type", "0");
       // }
     
    })
    //外部邮件 收件箱
    $("#mailOutRecv").click(function () {
        //if (!$(this).hasClass("select")) {
            selectMenu($(this));
            showCont($(".mail-recvout"));//显示内容
            MAIL.Receive.getOutMailList();
       // }
    })
    //外部邮件 发件箱
    $("#mailOutSend").click(function () {
        //if (!$(this).hasClass("select")) {
            selectMenu($(this));
            showCont($(".mail-sendin"));//显示内容
            MAIL.Send.getMailOutList();
            $(".mail-sendin").data("type", "1");
       // }
    })
    //外部邮件 设置
    $("#mailSet").click(function () {
        if (!$(this).hasClass("select")) {
            selectMenu($(this));
            showCont($(".mail-set"));//显示内容

        }
    })

    //上一封 收件 
    $("#mailrecv_pre").click(function () {
        var me = $(this);
        var id = me.data("id");
        if (id == null || id == undefined || id == "") {
            sysmsg("已是第一封");
            return;
        }
        var mailid = me.data("mailid");
        var type = me.data("type");
        $("#curRecvID").val(id);
        $("#curRecvMailID").val(mailid);
        readmailInfo(id);
    })
    //下一封 收件 
    $("#mailrecv_next").click(function () {
        var me = $(this);
        var id = me.data("id");
        if (id == null || id == undefined || id == "") {
            sysmsg("已是最后一封");
            return;
        }
        var mailid = me.data("mailid");
        var type = me.data("type");
        $("#curRecvID").val(id);
        $("#curRecvMailID").val(mailid);
        readmailInfo(id);
    })
    //上一封 收件外部
    $("#mailrecvout_pre").click(function () {
        var me = $(this);
        var id = me.data("id");
        if (id == null || id == undefined || id == "") {
            sysmsg("已是第一封");
            return;
        }
        var mailid = id;
        $("#curRecvOutID").val(id);
        $("#curRecvOutMailID").val(mailid);
        readmailInfo(id);
     
    })

    //下一封 收件外部
    $("#mailrecvout_next").click(function () {
        var me = $(this);
        var id = me.data("id");
        if (id == null || id == undefined || id == "") {
            sysmsg("已是最后一封");
            return;
        }
        var mailid = id;
        $("#curRecvOutID").val(id);
        $("#curRecvOutMailID").val(mailid);
        readmailInfo(id);

    })

    //上一封 已发送
    $("#mailsend_pre").click(function () {
        var me = $(this);
        var id = me.data("id");
        if (id == null || id == undefined || id == "") {
            sysmsg("已是第一封");
            return;
        }
        var mailid = id;
        var type = me.data("type");
        $("#curSendID").val(id);
        $("#curSendMailID").val(mailid);
        readmailInfo(id);
    })
    //下一封 已发送 
    $("#mailsend_next").click(function () {
        var me = $(this);
        var id = me.data("id");
        if (id == null || id == undefined || id == "") {
            sysmsg("已是最后一封");
            return;
        }
        var mailid = id;
        var type = me.data("type");
        $("#curSendID").val(id);
        $("#curSendMailID").val(mailid);
        readmailInfo(id);
    })
    //删除 内部收件箱邮件
    $(".tool_deldetal").click(function () {
        var id = $("#curRecvID").val();
        MAIL.Receive.delInRecvMail(id);
        //goback();
    })
    //删除 外部收件箱邮件
    $(".tool_deldetalout").click(function () {
        var id = $("#curRecvOutID").val();
        MAIL.Receive.delOutRecvMail(id);
        // goback();
    })
    //删除 已发送邮件
    $(".tool_delsendinfo").click(function () {
        var id = $("#curSendID").val();
        var navid = getCurNavID();
        if (navid == "mailInSend") {
            MAIL.Send.deleteMail(id, "1", "in");
        }
        else {
            MAIL.Send.deleteMail(id, "1", "out");
        }
        goback();
    })
    //回收箱 选中
    $(".recover_tool_select").find(".tool-menu-item").click(function () {
        var me = $(this);
        var id = me.data("id");
        switch (id.toString()) {
            case "1":
                $(".mail-curshow").find(".mails-check").prop("checked", true);
                $(".mail-curshow").find(".mail-row").siblings().addClass("select").find(".mail-check").prop("checked", true);
                break;
            case "2":
                $(".mail-curshow").find(".mails-check").prop("checked", false);
                $(".mail-curshow").find(".mail-row").siblings().removeClass("select").find(".mail-check").prop("checked", false);
                break;
            case "3":
                var len = $(".mail-curshow").find(".mail-row[data-flag='recv']").length;
                if (len > 0) {
                    $(".mail-curshow").find(".mail-row").siblings().removeClass("select").find(".mail-check").prop("checked", false);
                    $(".mail-curshow").find(".mail-row[data-flag='recv']").addClass("select").find(".mail-check").prop("checked", true);
                }
                else {
                    $(".mail-curshow").find(".mails-check").prop("checked", false);
                }
                break;
            case "4":
                var len = $(".mail-curshow").find(".mail-row[data-flag='send']").length;
                if (len > 0) {
                    $(".mail-curshow").find(".mail-row").siblings().removeClass("select").find(".mail-check").prop("checked", false);
                    $(".mail-curshow").find(".mail-row[data-flag='send']").addClass("select").find(".mail-check").prop("checked", true);
                }
                else {
                    $(".mail-curshow").find(".mails-check").prop("checked", false);
                }
                break;
        }
    })
    //回收箱 查看
    $(".recover_tool_lookup").find(".tool-menu-item").click(function () {
        var me = $(this);
        var id = me.data("id");
        switch (id.toString()) {
            case "1"://接收邮件
                MAIL.Receive.getRecoverMail(undefined, "1");
                $(".recover_tool_lookup").data("type", "1");//选中
                break;
            case "2"://发送邮件
                MAIL.Receive.getRecoverMail(undefined, "2");
                $(".recover_tool_lookup").data("type", "2");//选中
                break;
            case "3":
                MAIL.Receive.getRecoverMail(undefined, "3");
                $(".recover_tool_lookup").data("type", "3");//选中
                break;
        }
    })
    //回收箱 彻底删除
    $(".recover_tool_del").click(function () {
        var len = $(".mail-curshow").find(".mail-row").filter(".select").length;
        if (len > 0) {
            layer.confirm("邮件删除后无法恢复,确定是否删除？", function () {
                var ids = "", flags = "", modes = "";
                $(".mail-curshow").find(".mail-row").filter(".select").each(function () {
                    var me = $(this);
                    var id;
                    var flag = me.data("flag");
                    if (flag == "recv") {
                        id= me.data("id");
                    }
                    else {
                        id = me.data("mailid");
                    }
                    var is = me.hasClass("mail-typein");
                    var mode = me.hasClass("mail-typein") == true ? "1" : "2";
                    modes += mode + ",";
                    ids += id + ",";
                    flags += flag + ",";
                })
                if (ids != "") {
                    MAIL.Receive.deleteMail(ids, flags,modes);
                }
            })
        }
        else {
            sysmsg("请选择邮件");
        }

    })
    //回收箱 还原
    $(".recover_tool_reduced").click(function () {
        var len = $(".mail-curshow").find(".mail-row").filter(".select").length;
        if (len > 0) {
            var ids = "", flags = "", modes = "";
            $(".mail-curshow").find(".mail-row").filter(".select").each(function () {
                var me = $(this);
                if (me.hasClass("select")) {
                    var id = me.data("id");
                    var flag = me.data("flag");
                    var mode = me.hasClass("mail-typein") == true ? "1" : "2";
                    ids += id + ",";
                    flags += flag + ",";
                    modes += mode + ",";
                }
            })
            if (ids != "") {
                MAIL.Receive.restoreMail(ids, flags,modes);
            }
        }
        else {
            sysmsg("请选择邮件");
        }
    })

    //写信 鼠标经过按钮
    $(".write-tooll").hover(function () {
        $(this).toggleClass("hover");
    })

    //发送 发送邮件
    $(".tool_send").click(function () {
        if ($("#draftMailID").val() == "") {
            sendMail("1");//直接发送
        }
        else {
            sendMail("2");//从草稿箱发送
        }
    })
    //存草稿 发送邮件
    $(".tool_savedraft").click(function () {
        sendMail("0");//存草稿
    })
    //取消 发送邮件
    $(".tool_cancel").click(function () {
        var groupsends = $(".input-groupsend").find(".send-address");
        var copysends = $(".input-copysend").find(".send-address");
        var bccsends = $(".input-bccsend").find(".send-address");
        var sends = $(".input-send").find(".send-address");
        var theme = $(".input-theme").val();
        var curfile = $(".uploadify-queue").find(".uploadify-queue-item");
        var content = UE.getEditor("editor").getContent();

        if (groupsends.length > 0 || copysends.length > 0 || bccsends.length > 0 || sends.length > 0 || theme != "" || curfile.length > 0 || content != "") {
            //添空内容
            var index = layer.confirm("你正在写信中,确定离开吗？", function () {
                layer.close(index);
                clearSendInfo();

                if ($("#mailSend").hasClass("select")) {
                     $(".mail-recv").data("type", "0");
                    selectMenu($("#mailUnread"));
                    showCont($(".mail-recv"));//显示内容
                    MAIL.Receive.getUnreadMail();
                }
                else {
                    goback();
                }
            });

        }
        else {
            //添空内容
            selectMenu($("#mailUnread"));
            showCont($(".mail-recv"));//显示内容
            MAIL.Receive.getUnreadMail();
            $(".mail-recv").data("type", "0");
            clearSendInfo();
        }
    })

    //重写
    $(".tool_reset").click(function () {
        clearSendInfo();
        sysmsg("邮件内容已清空");
    })

    //再次编辑发送
    $(".tool_sendagain").click(function () {
        clearSendInfo();
        var curNavID = getCurNavID();
        var id = $("#curSendID").val();
        var mailid = id;
        if (curNavID == "mailInSend") {
            MAIL.Send.getMailEditorContent(id, mailid, "1");
            MAIL.Send.getMailEditorInfo(id, mailid);
        }
        else {
            mailid = $("#curSendMailID").val();
            MAIL.Send.getOutSendMailEditorContent(id, mailid, "1");
            MAIL.Send.getOutSendMailEditorInfo(id, mailid);
        }
        showCont($(".mail-write"));
    })

    //回复
    $(".tool_reply").click(function () {
        mailReply("1");
    })
    //回复全部
    $(".tool_replyall").click(function () {
        mailReply("2");
    })
    //转发
    $(".tool_retransmission").click(function () {
        mailReply("3");
    })
    //回复 外部邮件
    $(".tool_replyout").click(function () {
        mailOutReply("1");
    })
    //回复全部 外部邮件
    $(".tool_replyallout").click(function () {
        mailOutReply("2");
    })
    //转发 外部邮件
    $(".tool_retransmissionout").click(function () {
        mailOutReply("3");
    })

    /*通讯录*/
    $(".contact-btn").hover(function () {
        $(this).addClass("hover");
    }, function () {
        $(this).removeClass("hover");
    });
    $(".seletcontact").hover(function () {
        $(this).addClass("hover");
    }, function () {
        $(this).removeClass("hover");
    });
    //新建联系人
    $("#addres_addcontact").click(function () {
        initContactInfo();
        $.layer({
            type: 1,
            area: ['auto', 'auto'],
            shade: [0.2, '#000'],
            title: "新建联系人",
            border: [2, 1, '#E5E5E5'],
            page: { dom: '#contactInfo' }
        });
    })
    //选择联系人
    $(".seletcontact").click(function () {
        openUserList("contactnameIn", "contactcode");
    })
    //保存联系人
    $("#contact_save").click(function () {
        saveContact();
    })
    //取消
    $("#contact_cancel").click(function () {
        $("#curContactID").val("");
        layer.closeAll();
    })
    //新建分组
    $("#addres_addgroup").click(function () {
        initContactGroupInfo();
        $.layer({
            type: 1,
            area: ['auto', 'auto'],
            shade: [0.2, '#000'],
            title: "新建联系组",
            border: [2, 1, '#E5E5E5'],
            page: { dom: '#contactGroupInfo' }
        });
    })

    //保存联系组
    $("#contactgroup_save").click(function () {
        saveContactGroup();
    })
    //取消
    $("#contactgroup_cancel").click(function () {
        $("#curContactGroupID").val("");
        layer.closeAll();
    })
    //选择联系人类型
    $(".contact-type").click(function () {
        var type = $(this).val();
        selContactType(type);
    })
    //分组查看
    $("#addres_lookup .tool-menu-item").click(function (e) {
        var id = $(this).data("id");
        if (id == "0") {
            $("#addres_delgroup").hide();
            MAIL.Address.getContact();
        }
        else {
            $("#addres_delgroup").show();
            MAIL.Address.getContactByGroupID(id);
        }
    })
    //分组查看
    $("#addres_lookup .tool-menu-item").click(function (e) {

    })
    //编辑组
    $("#addres_editorgroup").click(function () {
        initContactGroupInfo();
        $("#curContactGroupID").val($("#curlookGroupID").val());
        $("#contactgroupname").val($("#curlookGroupName").val());
        $.layer({
            type: 1,
            area: ['auto', 'auto'],
            shade: [0.2, '#000'],
            title: "编辑联系组",
            border: [2, 1, '#E5E5E5'],
            page: { dom: '#contactGroupInfo' }
        });
        $("#contactgroupname").focus();
    })
    //删除组
    $("#addres_delgroup").click(function (e) {
        layer.confirm("确定删除【" + $("#curlookGroupName").val() + "】联系组吗？\n\r 提示：联系人不会被删除", function () {
            var groupid = $("#curlookGroupID").val();//当前显示组
            MAIL.Address.deleteContactGroup(groupid);

            $("#curlookGroupID").val("0");
            $("#curlookGroupName").val("");
        }, function () {

        })
    })

    //删除联系人
    $("#addres_delcontact").click(function (e) {
        var ids = "";
        $(".mail-curshow").find(".mail-row").filter(".select").each(function () {
            var me = $(this);
            if (me.hasClass("select")) {
                var id = me.data("id");
                ids += id + ",";
            }
        })
        if (ids != "") {
            layer.confirm("删除后无法恢复,确认是否删除？", function () {
                MAIL.Address.deleteContact(ids);
            }, function () {
            })

        } else {
            sysmsg("请选择联系人");
        }
    })
    //添加邮件夹
    $(".floder-addicon").click(function (e) {
        e = e || window.event;
        if (e.stopPropagation)
            e.stopPropagation();
        else
            e.cancelBubble = true;

        $.layer({
            type: 1,
            area: ['auto', 'auto'],
            shade: [0.2, '#000'],
            title: "添加邮件夹",
            border: [2, 1, '#E5E5E5'],
            page: { dom: '#folderInfo' }
        });
        $("#curFolderID").val("");
        $("#foldername").focus();
    })
    $(".floder-addicon").hover(function () {
        $(this).toggleClass("hover");
    })
    //邮件夹添加图标显示
    $(".item-floder").hover(function () {
        $(".floder-addicon").toggle();
    })
    //保存邮件夹
    $("#folder_save").click(function () {
        var id = $("#curFolderID").val();
        var name = $("#foldername").val();
        if (id == "") {
            MAIL.Receive.addMailFolder(name);
        }
        else {
            MAIL.Receive.updateMailFolder(id,name);
        }
    })
    //取消邮件夹编辑
    $("#folder_cancel").click(function () {
        $("#foldername").val();
        layer.closeAll();
    })
    $("#searchtxt").keydown(function (e) {
        if (e.keyCode == 13 && $.trim($(this).val()) != "") {
            showCont($(".mail-searchinfo"));
            searchMail($(this).val());
        }
    })
    $(".search-icon").click(function () {
        var me = $("#searchtxt");
        if (me.val() == "邮件搜索..." || me.val() == "") {
            me.val("");
            me.focus();
        }
        else {
            showCont($(".mail-searchinfo"));
            searchMail(me.val());
        }
    });
    $("#searchtxt").focus(function () {
        selectMenu($(".mail-search"));
        if ($(this).val() == "邮件搜索...")
        {
            $(this).addClass("active");
            $(this).val("");
        }
    });
    $("#searchtxt").blur(function () {
        if ($.trim($(this).val()) == "") {
            $(this).val("邮件搜索...");
            $(this).removeClass("active");
        }
    });
    //高级设置
    $("#more-setting").click(function () {
        var $this = $(this);
        var $highSettingEle = $(".mail-set .high-setting");
        if ($highSettingEle.first().is(":visible")) {
            $highSettingEle.hide();
            $this.removeClass("selected");
        }
        else {
            $highSettingEle.show();
            $this.addClass("selected");
        }
    });

    //自动提示邮箱地址
    $("#emailAddress").keyup(function (ev) {
        layer.closeTips();
        var $ele = $(this);
        var email=$ele.val();
        if (email.length>0) {
            $(".tip-email").show();
            var pre = email;
            var domain = "";
            var atIndex = pre.lastIndexOf("@");
            if (atIndex > -1) {
                pre = pre.substring(0, atIndex);
                domain = email.substring(atIndex);
            }           
            $(".email").hide().each(function () {
                var $tmp = $(this);
                $tmp.text(pre+"@" + $tmp.data("mail-ext"));
            });
            if (domain != "") {
                var $existEle = $(".email:contains('" + domain + "')");
                if ($existEle.length==0) {
                    $(".tip-email").hide();
                }
                else {
                    $existEle.show();
                }
            }
            else {
                $(".email").show();
            }
        }
        else {
            $(".tip-email").hide();
        }
       
    }).keydown(function (ev) {
        if (ev.which==9) {//tab切换
            $(".tip-email").hide();
        }
    });
    $("#trAccount").mouseleave(function () {
        $(".tip-email").hide();
        var email = $("#emailAddress").val();      
        if (checkEmail()) {
            $(".email:contains('" + email + "'):first").trigger("click");
            var domain = email.substring(email.indexOf("@") + 1);
            var $popServer = $("#popServer");
            var $popPort = $("#popPort");
            var $smtpServer = $("#smtpServer");
            var $smtpPort = $("#smtpPort");
            if ($popServer.val().indexOf(domain) == -1) {
                $popServer.val("pop." + domain);
            }
            if ($smtpServer.val().indexOf(domain) == -1) {
                $smtpServer.val("smtp." + domain);
            }
            if ($popPort.val() == "") {
                if ($("#popSsl0").is(":checked")) {
                    $popPort.val(110);
                }
                else {
                    $popPort.val(995);
                }
            }
            if ($smtpPort.val() == "") {
                if ($("#smtpSsl0").is(":checked")) {
                    $smtpPort.val(25);
                }
                else {
                    $smtpPort.val(465);
                }
            }
        }       
    });

    //提示邮箱地址点击
    $(".email").click(function () {
        var $tmp=$(this);
        $("#emailAddress").val($tmp.text());
        $("#popServer").val($tmp.data("popserver"));
        $("#smtpServer").val($tmp.data("smtpserver"));
        if ($tmp.data("usessl")==true) {
            $("#popPort").val(995);
            $("#popSsl1").prop('checked', "true")
            $("#smtpPort").val(465);
            $("#smtpSsl1").prop('checked', "true");
        }
        else {
            $("#popPort").val(110);
            $("#popSsl0").prop('checked', "true")
            $("#smtpPort").val(25);
            $("#smtpSsl0").prop('checked', "true");
        }
        $(".tip-email").hide();        
    }).hover(function () {
        $(this).addClass("hover");
    }, function () {
        $(this).removeClass("hover");
    });

    //使用ssl填写默认端口
    $("input[type=radio][name=pop-ssl]").change(function () {
        $("#popPort").val($(this).data("value"));
    });
    $("input[type=radio][name=smtp-ssl]").change(function () {
        $("#smtpPort").val($(this).data("value"));
    });

    //保存设置
    $("#save-email-setting").click(function () {
        if (!checkEmail()) {
            return;
        }
        if ($("#hfAdd").val() == "1") {
            saveEmail();
        } else {
            layer.confirm("确定是否更换邮箱账号？更换成功后服务器将删除之前账号的邮件信息", function () {
                saveEmail();
            },"更换外部邮箱")
        }
    });

    function saveEmail() {
        layer.load("正在保存设置……");
        $.ajax({
            type: 'POST',
            url: "Controller.ashx?action=savesetting",
            data: {
                option: "set",
                account: $("#emailAddress").val(),
                password: $("#emailPassword").val(),
                popServer: $("#popServer").val(),
                popPort: $("#popPort").val(),
                popSSL: $("input[name='pop-ssl']:checked").val(),
                smtpServer: $("#smtpServer").val(),
                smtpPort: $("#smtpPort").val(),
                smtpSSL: $("input[name='smtp-ssl']:checked").val(),
                senderName: $("#senderName").val(),
                add: $("#hfAdd").val()
            },
            success: function (data) {
                if (data.status == "1") {
                    $("#hfAdd").val("0");//已添加账号
                    $("#delte-email").show();
                    if (data.msg != "") {//发信设置不正确
                        layer.alert("保存成功，但发信设置不正确，错误信息：" + data.msg, 1);
                    }
                    else {
                        layer.msg('保存成功', 1, 1);
                        MAIL.Receive.refreshOutMail();
                    }
                }
                else {
                    layer.alert(data.msg, 3);
                }
            },
            error: function () {
                layer.alert("保存失败，请重试！", 3);
            }
        });
    }
    function checkEmail() {
        var $ele = $("#emailAddress");
        var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (!reg.test($ele.val())) {
            layer.tips('邮箱账号格式不正确！', $ele, {
                style: ['background-color:#66ccff; color:#fff', '#66ccff'],
                guide: 1
            });
            return false;
        }
        return true;
    }

    //刷新 外部邮件
    $("#recvout_refresh").click(function () {
        MAIL.Receive.autoRefreshOutMail();
    })

    //删除 外部邮件
    $("#recvout_del").click(function () {
        var ids = "";
        $(".mail-curshow").find(".mail-row").filter(".select").each(function () {
            var me = $(this);
            if (me.hasClass("select")) {
                var id = me.data("id");
                ids += id + ",";
            }
        })
        if (ids != "") {
            MAIL.Receive.delOutRecvMail(ids);
        } else {
            sysmsg("请选择邮件");
        }
    })
    //删除外部邮箱
    $("#delte-email").click(function () {
        layer.confirm("确定删除此邮箱吗？删除后系统将清空此邮箱的所有信息", function () {
            layer.load("正在删除...");
            $.ajax({
                type: 'POST',
                url: "Controller.ashx?action=receive",
                data: {
                    option: "deletemailaccout"
                },
                success: function (data) {
                    if (data.status == "1") {
                        layer.closeAll();
                        $("#hfAdd").val("1");
                        $("#delte-email").hide();
                        MAIL.Receive.getMailNum();
                        $("#emailAddress").val("email@qq.com");
                        $("#emailPassword").val("");
                        sysmsg("已删除");
                    }
                    else {
                        layer.alert("删除失败", 3);
                    }
                },
                error: function () {
                    layer.alert("删除失败，请重试！", 3);
                }
            });
        })
    })

});


/*
 * 初始化
 */
function init() {

    //selectMenu($("#mailUnread"));//选择菜单
    //showCont($(".mail-recv"));//显示内容
    //MAIL.Receive.getUnreadMail();

    MAIL.Address.getAddressGroup();//获取联系人组
    MAIL.Address.getRecentContact();//获取最近联系人            
    selectMenu($("#mailSend"));
    showCont($(".mail-write"));//显示内容



    if ($("#hfAdd").val() == "0") {
        $("#delte-email").show();
    }
    else {
        $("#delte-email").hide();
    }

    var recv_totalrows = $("#recv_totalrows").val();
    var recv_pages = $("#recv_pages").val();
    if (recv_pages > 0) {
        $("#mailsrecv-page").show();
        /*分页*/
        pager.init({
            pagerid: 'mailsrecv-page',
            //页码
            pno: '1',
            //总页码
            total: recv_pages,
            //总数据条数
            totalRecords: recv_totalrows
        });
        pager.generPageHtml();
    }

    /*编辑器*/
    var ue = UE.getEditor("editor", {
        initialFrameHeight: 250
        //, serverUrl: "../sfoahtml/net/controller.ashx?from=email"//后台处理
        , autoHeightEnabled: false
        , wordCount: false
        , elementPathEnabled: false
        , disabledTableInTable:false  
        , toolbars: [[
            'fullscreen', 'source', '|', 'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
            'directionalityltr', 'directionalityrtl', 'indent', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
            'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
            'simpleupload', 'insertimage', 'scrawl' , 'map', 'gmap', 'insertframe', 'insertcode', 'template', 'background', '|',
            'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
            'print', 'preview', 'searchreplace', 'drafts'
        ]]
    });
    ue.ready(function () {
        //ue.setHeight(500);
    });

    setTimeout(function () {
    /*附件上传*/
    $("#uploadify").uploadify({
        //指定swf文件
        'swf': 'Js/uploadify/uploadify.swf',
        //后台处理的页面
        'uploader': getDwUrl() + 'EmailCenter/Handle/UploadHandler.ashx',
        //按钮显示的文字
        'buttonText': '添加附件',
        //显示的高度和宽度，默认 height 30；width 120
        //'height': 15,
        //'width': 80,
        //上传文件的类型  默认为所有文件    'All Files'  ;  '*.*'
        //在浏览窗口底部的文件类型下拉菜单中显示的文本
        //'fileTypeDesc': 'Image Files',
        //允许上传的文件后缀
        //'fileTypeExts': '*.gif; *.jpg; *.png',
        //发送给后台的其他参数通过formData指定
        //'formData': { 'someKey': 'someValue', 'someOtherKey': 1 },
        //上传文件页面中，你想要用来作为文件队列的元素的id, 默认为false  自动生成,  不带#
        //'queueID': 'fileQueue',
        //选择文件后自动上传
        'auto': true,
        //设置为true将允许多文件上传
        'multi': true,
        //上传完成后是否移除显示
        removeCompleted: false,
        //宽度
        width: "60",
        height: "25",
        uploadLimit: 9
    });
    }, 10)
    /*短信提醒*/
    if ($("#msgtipflag").val() != "Y") {
        $("#option-msg").attr("disabled", "disabled");
    }

    /*获取邮件夹*/
    MAIL.Receive.getMailFolder();

    /*获取联系组*/
    MAIL.Address.getContactGroup();

    //接收一次外部邮件 十分钟刷新一次
    // var intervalID = setInterval(function () { MAIL.Receive.autoRefreshOutMail(); }, 600000);

    //$(".input-send").addClass("mail-inputaddr-cur").find(".input-content").addClass("active").end().find(".input-title")
    //.addClass("active").end().find(".input-option").addClass("active").end().find(".send-addresss").click();
    //clearSendInfo();
}

/*
 * 选择导航菜单
 */
function selectMenu($ele) {
    $(".mail-nav-item").removeClass("select");//清除样式
    $(".mail-dl").removeClass("select");//清除样式
    $("#mailSend").removeClass("select");//清除样式
    $ele.addClass("select");//添加样式

    if ($ele.attr("id") == "mailUnread") {
        $(".mail-recv").find(".tool_lookup").show();
    }
    else {
        $(".mail-recv").find(".tool_lookup").hide();
    }

    if ($ele.attr("id") == "mailStar") {
        $(".mail-recv").find(".tool_mark").find(".tool-menu").find("div:lt(7)").hide();
    }
    else {
        $(".mail-recv").find(".tool_mark").find(".tool-menu").find("div:lt(7)").show();
    }

    $(".starmail-icon").removeClass("active");

    //查看选项恢复初始
    $(".recover_tool_lookup").data("type", "3");
    $(".tool_lookup").data("type", "3");
}

/*
 * 显示内容
 */
function showCont($ele) {
    if (!$ele.hasClass("mail-curshow")) {
        $(".mail-content").children().hide().removeClass("mail-curshow");//隐藏其它内容页面
        $ele.show().addClass("mail-curshow");//显示当前内容
        $ele.find(".mails-check").prop("checked", false);
        layer.closeAll();
    }


}

/*
 * 选择行 根据第一列
 */
function checkrowbyfirst($ele)
{
    e = event || window.event;
    if (e.stopPropagation)
        e.stopPropagation();
    else
        e.cancelBubble = true;

    var me = $ele.find(".mail-check");
    if ($ele.parent().hasClass("select")) {
        me.prop("checked", false);
    }
    else {
        me.prop("checked", true);
    }

    checkrow(me);
}

/*
 * 选中行
 */
function checkrow($ele) {
    e = event || window.event;
    if (e.stopPropagation)
        e.stopPropagation();
    else
        e.cancelBubble = true;

    var me = $ele[0];
    if (me.checked == true) {
        $ele.parent().parent().removeClass("hover");
        $ele.parent().parent().addClass("select");
    }
    else {
        $ele.parent().parent().removeClass("select");
        $ele.parent().parent().addClass("hover");
    }

    var allselect = true;
    $(".mail-curshow").find(".mail-row").siblings().find(".mail-check").each(function () {
        var me = $(this)[0];
        if (me.checked != true) {
            allselect = false;
        }
    })
    $(".mail-curshow").find(".mails-check").prop("checked", allselect);
}

//鼠标经过样式
function mailrowover($ele) {
    if (!$ele.hasClass("select")) {
        $ele.addClass("hover");
    }
}
function mailrowout($ele) {
    $ele.removeClass("hover");
}

/*
 * 添加邮件地址
 */
function addmailaddr($ele) {
    var $match = $ele.parent().next();
    var activeli = $match.find("li").filter(".active");
    if (activeli.length > 0) {
        var code = activeli.data("usercode");
        var address = $(".mail-inputaddr-cur").find(".send-address[data-code='" + code + "']");
        if (address.length == 0) {
            var mail = activeli.data("mail");
            var mailname = activeli.data("mailname");
            var name = activeli.data("username");
            var type = activeli.data("type");//0-内部地址;1-内、外部地址;2-外部地址;
            var name = activeli.data("username");
            var typehtml = "";
            if (type == "1") {
                typehtml += ' <div class="send-address-type">';
                typehtml += '<div class="send-type-item send-type-in select" title="发送内部邮件" onclick="selSendType($(this))">内</div>';
                typehtml += '<div class="send-type-item send-type-out" title="发送外部邮件" onclick="selSendType($(this))">外</div>';
                typehtml += '</div>';
            }
            $ele.before($(' <div class="send-address" onclick="insertaddr($(this))" \
               data-id="" data-name="' + name + '" data-code="' + code + '" data-mail="' + mail + '" \
               data-mailname="' + mailname + '" data-type="' + type + '" title="' + mail + '" ><div class="send-address-cont">' + name + '\
               </div>'+ typehtml + '<div title="删除" class="send-address-del" onclick="delmailaddr($(this))">×</div></div>'));

            //$ele.before($(' <div class="send-address" onclick="insertaddr($(this))" ><div class="send-address-cont">' + name + '</div><div class="send-address-del" title="删除" onclick="delmailaddr($(this))">×</div></div>'));
            $ele.css("width", "1").val("").css("visibility", "hidden");
        }
        else {
            address.addClass("active");
            setTimeout(function () { address.removeClass("active"); }, '1000');
            $ele.css("width", "1").val("").css("visibility", "hidden");
        }
    }
    else {
        var mailaddress = $ele.val();
        var address = $(".mail-inputaddr-cur").find(".send-address[data-code='" + mailaddress + "']");
        var type = 2;
        if (address.length == 0) {
            $ele.css("width", "1").val("").css("visibility", "hidden");
            var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            if (reg.test(mailaddress)) {

                $ele.before($(' <div class="send-address" onclick="insertaddr($(this))" \
               data-id="" data-name="' + mailaddress + '" data-code="' + mailaddress + '" data-mail="' + mailaddress + '" \
               data-mailname="' + mailaddress + '" data-type="' + type + '" title="' + mailaddress + '" ><div class="send-address-cont">' + mailaddress + '\
               </div><div title="删除" class="send-address-del" onclick="delmailaddr($(this))">×</div></div>'));
                // $ele.before($(' <div class="send-address" onclick="insertaddr($(this))" ><div class="send-address-cont">' + mailaddress + '</div><div class="send-address-del" title="删除" onclick="delmailaddr($(this))">×</div></div>'));
            }
            else {

                $ele.before($(' <div title="邮件地址有误" class="send-address send-addresserror" onclick="insertaddr($(this))" \
               data-id="" data-name="' + mailaddress + '" data-code="' + mailaddress + '" data-mail="' + mailaddress + '" \
               data-mailname="' + mailaddress + '" data-type="' + type + '" title="' + mailaddress + '" ><div class="send-address-cont">' + mailaddress + '\
               </div><div title="删除" class="send-address-del send-address-delerror" onclick="delmailaddr($(this))">×</div></div>'));
                //$ele.before($(' <div title="邮件地址有误" class="send-address send-addresserror"  onclick="insertaddr($(this))" ><div class="send-address-cont">' + mailaddress + '</div><div title="删除" class="send-address-del send-address-delerror" onclick="delmailaddr($(this))">×</div></div>'));
            }
        }
        else {
            address.addClass("active");
            setTimeout(function () { address.removeClass("active"); }, '1000');
        }
    }
}
/*
 * 删除邮件地址
 */
function delmailaddr($ele) {
    $ele.parent().remove();
}

/*
 * 插入联系人
 */
function insertaddr($ele) {
    var m = $ele;
    var me = $ele.parent();
    me.parent().parent().parent().find(".write-input-row").removeClass("mail-inputaddr-cur").find(".input-content").removeClass("active").end().find(".input-title").removeClass("active").end().find(".input-option").removeClass("active");
    me.parent().parent().addClass("mail-inputaddr-cur").find(".input-content").addClass("active").end().find(".input-title").addClass("active").end().find(".input-option").addClass("active");
    var $inputtxt = me.find(".input-txt");
    $inputtxt.hide();
    if ($inputtxt.val() != undefined) {
        if ($.trim(me.find(".input-txt").val()) == "") {
            $inputtxt.css("width", "10px").css("visibility", "visible").focus();
            m.before($inputtxt);
            $inputtxt.show();
            $inputtxt.focus();
        }
        else {
            addmailaddr($inputtxt);//添加邮件地址
        }
    }
    else {
        m.before($inputtxt.css("width", "10px").css("visibility", "visible").focus());
        $inputtxt.focus();
    }
    e = event || window.event;
    if (e.stopPropagation)
        e.stopPropagation();
    else
        e.cancelBubble = true;

    setTimeout(function () { $inputtxt.css("visibility", "visible").focus();$inputtxt.focus(); }, 200);
}
/*
 * 添加联系人
 */
function addaddr($ele) {
    var code = $ele.data("usercode");
    var address = $(".mail-inputaddr-cur").find(".send-address[data-code='" + code + "']");
    if (address.length == 0) {
        var mail = $ele.data("mail");
        var mailname = $ele.data("mailname");
        var name = $ele.data("username");
        var type = $ele.data("type");//0-内部地址;1-内、外部地址;2-外部地址;
        var nameshow = type == "2" ? mailname : name;
        code = type == "2" ? mail : code;
        var typehtml = "";
        if (type == "1") {
            typehtml += ' <div class="send-address-type">';
            typehtml += '<div class="send-type-item send-type-in  select" title="发送内部邮件" onclick="selSendType($(this))">内</div>';
            typehtml += '<div class="send-type-item send-type-out" title="发送外部邮件" onclick="selSendType($(this))">外</div>';
            typehtml += '</div>';
        }
        $(' <div class="send-address" onclick="insertaddr($(this))" \
        data-id="" data-name="' + name + '" data-code="' + code + '" data-mail="' + mail + '" \
        data-mailname="' + mailname + '" data-type="' + type + '" title="' + mail + '" ><div class="send-address-cont">' + nameshow + '\
       </div>'+ typehtml + '<div title="删除" class="send-address-del" onclick="delmailaddr($(this))">×</div></div>')
           .appendTo($(".write-header").find(".mail-inputaddr-cur").find(".send-addresss"));
    }
    else {
        address.addClass("active");
        setTimeout(function () { address.removeClass("active"); }, '1000');
    }
}

/*
 * 添加联系人组
 */
function addaddrgroup($ele) {
    $ele.parent().next().find(".item-addr").each(function () {
        addaddr($(this));
    })
}
/*
 * 联系组展开
 */
function clickaddricon($ele) {
    $ele.toggleClass("show");
    $ele.next().next().toggle();
}
/*
 * 联系组展开
 */
function clickaddrfloder($ele) {
    var me = $ele;
    me.next().toggle();
    if (me.prev().hasClass("show")) {
        me.prev().removeClass("show");
    }
    else {
        me.prev().addClass("show");
    }
}
/*
* 联系组 鼠标经过
*/
function addrgroupover($ele) {
    $ele.find(".addr-addgroup").show();
    $ele.addClass("hover");
}
/*
* 联系组 鼠标离开
*/
function addrgroupout($ele) {
    $ele.find(".addr-addgroup").hide();
    $ele.removeClass("hover");
}
/*
* 联系人 鼠标经过
*/
function addritemover($ele) {
    $ele.addClass("hover");
}
/*
* 联系人 鼠标离开
*/
function addritemout($ele) {
    $ele.removeClass("hover");
}
/*
 * 阅读邮件
 */
function readmail($ele) {
  
    $ele.removeClass("mail-cont-unread").addClass("mail-cont-read");
    $(".recvinfo-sender-addrs").html("");//发件人
    $(".recvinfo-recver-addrs").html("");//收件人
    $(".recvinfo-copyer-addrs").html("");//抄送人
    $(".recvinfo-files").html("");//附件
    $(".recvinfo-txt").html("");//内容

    var id = $ele.data("id");
    var mailid = $ele.data("mailid");
    $("#curRecvID").val(id);
    $("#curRecvMailID").val(mailid);
    var title = $ele.find(".row-title").text();
    $(".recvinfo-mailtitle").text(title);
    var mailid = $ele.data("mailid");
    var isread = $ele.data("isread");
    MAIL.Receive.getInMailContent(id, mailid, isread);
    MAIL.Receive.getInMailInfo(id, mailid);
    showCont($(".mail-recvinfo"));

    var preid = $ele.prev() != undefined ? $ele.prev().data("id") : "";
    preid = preid != undefined ? preid : "";
    var pretitle = $ele.prev() != undefined ? $ele.prev().find(".row-title").text() : "";
    var premailid = $ele.prev() != undefined ? $ele.prev().data("mailid") : "";
    premailid = premailid != undefined ? premailid : "";
    var preisread = $ele.prev() != undefined ? $ele.prev().data("isread") : "";
    var nextid = $ele.next() != undefined ? $ele.next().data("id") : "";
    nextid = nextid != undefined ? nextid : "";
    var nexttitle = $ele.next() != undefined ? $ele.next().find(".row-title").text() : "";
    var nextmailid = $ele.next() != undefined ? $ele.next().data("mailid") : "";
    nextmailid = nextmailid != undefined ? nextmailid : "";
    var nextisread = $ele.next() != undefined ? $ele.next().data("isread") : "";
    $("#mailrecv_pre").data("id", preid).data("mailid", premailid).data("isread", preisread).attr("title", pretitle);
    $("#mailrecv_next").data("id", nextid).data("mailid", nextmailid).data("isread", nextisread).attr("title", nexttitle);
    setdelbtn();
}



/*
 * 返回
 */
function goback() {
    //当前选中菜单
    var id = getCurNavID();

    switch (id) {
        case "mailRecover": //回收箱
            showCont($(".mail-recover"));
            MAIL.Receive.getRecoverMail(pager.pno);
            break;
        case "mailDraft": //草稿箱
            break;
        case "mailInSend"://内部 已发送
            showCont($(".mail-sendin"));
            MAIL.Send.getMailList(pager.pno);
            break;
        case "mailOutRecv": //外部 收件
            showCont($(".mail-recvout"));
            MAIL.Receive.getOutMailList(pager.pno);
            break;
        case "mailOutSend": //外部 已发送
            showCont($(".mail-sendin"));
            MAIL.Send.getMailOutList(pager.pno);
            break;
        case "mailSearch":
            showCont($(".mail-searchinfo")); //搜索邮件
            MAIL.Receive.searchMail($("#searchWord").text());
            break;
        default:
            showCont($(".mail-recv")); //内部 接收
            MAIL.Receive.refresh(pager.pno);
            break;
    }
}
/*
 * 获取当前选中菜单ID
 */
function getCurNavID() {
    var curNav = $(".mail-nav-item").filter(".select").length != 0 ? $(".mail-nav-item").filter(".select") : $(".mail-dl").filter(".select").length != 0 ? $(".mail-dl").filter(".select") : $("#mailSearch");
    var id = curNav.attr("id");
    return id;
}
/*
 * 邮件夹
 */
function flderClick($ele) {
    if (!$ele.hasClass("select")) {
        var folderid = $ele.data("id");
        selectMenu($ele);
        showCont($(".mail-recv"));//显示内容
        MAIL.Receive.getInFolderMail(folderid);
        $(".mail-recv").data("type", "2");
    }
}

/*
 * 添加联系人
 */
function addAddresser($ele) {
    initContactInfo();
    $.layer({
        type: 1,
        area: ['auto', 'auto'],
        shade: [0.2, '#000'],
        title: "快速添加联系人",
        border: [2, 1, '#E5E5E5'],
        page: { dom: '#contactInfo' }
    });

    var type = $ele.parent().data("type");
    var code = $ele.parent().data("code");
    var name = $ele.parent().data("name");
    var mail = $ele.parent().data("address");

    $(".contact-type").attr("disabled", "disabled");
    if (type == "1"||type=="0") {
        selContactType("1");
        $(".seletcontact").hide();
        $("#contactcode").val(code);
        $("#contactnameIn").val(name);
        $("#contacttype_in").prop("checked", true);
    }
    else {
        selContactType("2");
        $("#contactcode").val(code);
        $("#contactnameOut").val(name);
        $("#contactmail").val(mail);
        $("#contacttype_out").prop("checked", true);
        $("#contactnameOut").focus();
    }
}
/*
 * 附件 鼠标经过
 */
function recvfileOver($ele) {
    $ele.addClass("hover");
}
/*
 * 附件 鼠标离开过
 */
function recvfileOut($ele) {
    $ele.removeClass("hover");
}
/*
 * 附件 鼠标经过
 */
function recvfileClick($ele) {
    var name = $ele.data("name");
    var realname = $ele.data("realname");
    var type = $ele.data("type");
    var path = $ele.data("path");
    MAIL.Receive.downFile(name, realname, type, path);
}

/*
 * 显示所有/隐藏信息 按钮
 */
function addrDisplayOver($ele) {
    $ele.addClass("hover");
}
function addrDisplayOut($ele) {
    $ele.removeClass("hover");
}
function addrDisplayClick($ele) {
    var type = $ele.data("type");
    var eles = $ele.parent().children();
    var len = eles.length;
    if (type == 0) {
        $ele.data("type", "1").text("隐藏信息");
        $ele.siblings().removeClass("addr-item-display");
    }
    else {
        $ele.data("type", "0").text("显示所有");
        for (var i = 10; i < len - 1; i++) {
            eles.eq(i).addClass("addr-item-display");
        }
    }
}
/**********/

/*
 * 全部下载
 */
function addrDownClick($ele) {
    var title = "", id = "";
    var navID = getCurNavID();
    var type = "";
    if (navID == "mailInSend") {
        title = $(".sendinfo-mailtitle").text();
        id = $("#curSendMailID").val();
    }
    else if (navID == "mailOutRecv")
    {
        title = $(".recvoutinfo-mailtitle").text();
        id = $("#curRecvOutID").val();
    }
    else if (navID == "mailOutSend")
    {
        title = $(".sendinfo-mailtitle").text();
        id = $("#curSendID").val();
        type = "1";
    }
    else {
        title = $(".recvinfo-mailtitle").text();
        id = $("#curRecvMailID").val();
    }

    MAIL.Receive.downAllFile(id, title,type);
}

/*
 * 弹出系统提示信息
 */
function sysmsg(info, time,icon) {
    if (info != undefined) {
        var t = time == undefined ? 1 : time;
        layer.msg(info, t, { type: -1, shade: false, offset: ['0', '0'] },1);
    }
}

/*
 * 联系人匹配 经过
 */
function matchRowOver($ele) {
    $ele.siblings().removeClass("active");
    $ele.addClass("active");
}
/*
 * 联系人匹配 选择
 */
function matchRowClick($ele) {
    var $inputtxt = $ele.parent().parent().prev().find(".input-txt");
    $inputtxt.val($ele.find(".match-name").text());
    $ele.parent().parent().prev().click();
}

/*
 * 选择发送方式
 */
function selSendType($ele) {
    if ($ele.hasClass("select")) {
        $ele.removeClass("select");
        if (!$ele.siblings().eq(0).hasClass("select")) {
            $ele.siblings().eq(0).addClass("select");
        }
    }
    else {
        $ele.addClass("select");
    }
    e = event || window.event;
    if (e.stopPropagation)
        e.stopPropagation();
    else
        e.cancelBubble = true;
}

/*
 * 获取内部邮件地址
 */
function getInAddress($ele, sendtype) {
    var address = new Array();
    $ele.each(function () {
        var me = $(this);
        var mail = me.data("name");
        var outmail = me.data("mail");
        var code = me.data("code");
        var addrtype = me.data("type");
        var sendmode = "0";
        switch (addrtype) {
            case 0:  //只发内
                address.push({ mail: mail, code: code, type: sendtype, mode: sendmode });
                break;
            case 1: //能发内、外
                if (me.find(".send-type-in").hasClass("select")) {
                    sendmode = "1";
                    if (me.find(".send-type-out").hasClass("select")) {
                        sendmode = "2";
                    }
                    address.push({ mail: mail, code: code, type: sendtype, mode: sendmode });
                }
                break;
            default: break;
        }
    });
    return address;
}
/*
 * 获取外部邮件地址
 */
function getOutAddress($ele, sendtype) {
    var address = new Array();
    $ele.each(function () {
        var me = $(this);
        var mail = me.data("name");
        var outmail = me.data("mail");
        var code = me.data("code");
        var addrtype = me.data("type");
        var sendmode = "2";
        switch (addrtype) {
            case 1: //能发内、外
                if (me.find(".send-type-out").hasClass("select")) {
                    sendmode = "1";
                    address.push({ mail: outmail, code: mail, type: sendtype, mode: sendmode });
                }
                break;
            case 2: //只发外
                address.push({ mail: outmail, code: mail, type: sendtype, mode: sendmode });
                break;
            default: break;
        }
    });

    return address;
}

/*
 * 发送邮件
 */
function sendMail(optiontype) {
    //删除错误的收件人信息
    $(".input-send").find(".send-addresserror").remove(); //收件人
    $(".input-groupsend").find(".send-addresserror").remove(); //单独发送人
    $(".input-copysend").find(".send-addresserror").remove(); //抄送人
    $(".input-bccsend").find(".send-addresserror").remove(); //密送人

    var senders = $(".input-send").find(".send-address"); //收件人
    var groupsenders = $(".input-groupsend").find(".send-address"); //单独发送人
    var copysenders = $(".input-copysend").find(".send-address"); //抄送人
    var bccsenders = $(".input-bccsend").find(".send-address"); //密送人
    var theme = $(".input-themetxt").find(".input-theme"); //主题

    var iscopy = $(".toolr-copysend").data("status") == 1 ? true : false; //是否抄送
    var isbcc = $(".toolr-bccsend").data("status") == 1 ? true : false; //是否密送
    var isgroup = $(".toolr-groupsend").data("status") == 1 ? true : false;//是否单独发送

    var issingle = "0";
    var inaddress = new Array();
    var outaddress = new Array();
    /********发送地址********/
    if (isgroup) {
        if (groupsenders.length != 0) {
            issingle = "1";//单独发送
            inaddress = getInAddress(groupsenders, "0"); //内部地址
            outaddress = getOutAddress(groupsenders, "0"); //外部地址
        }
        else {
            sysmsg("请填写有效的收件人信息", 2);
            return;
        }
    }
    else {
        if (copysenders.length == 0 && bccsenders.length == 0 && senders.length == 0) {
            sysmsg("请填写有效的收件人信息", 2);
            return;
        }
        else {
            inaddress = getInAddress(senders, "0"); //内部地址
            outaddress = getOutAddress(senders, "0"); //外部地址
            if (iscopy) {
                var copyinaddress = getInAddress(copysenders, "2");
                if (copyinaddress.length > 0) {
                    for (var i = 0; i < copyinaddress.length; i++) {
                        inaddress.push(copyinaddress[i]); //内部地址
                    }
                }
                var copyoutaddress = getOutAddress(copysenders, "2");
                if (copyoutaddress.length > 0) {
                    for (var i = 0; i < copyoutaddress.length; i++) {
                        outaddress.push(copyoutaddress[i]); //内部地址
                    }
                }
            }
            if (isbcc) {
                var bccinaddress = getInAddress(bccsenders, "1");
                if (bccinaddress.length > 0) {
                    for (var i = 0; i < bccinaddress.length; i++) {
                        inaddress.push(bccinaddress[i]); //内部地址
                    }
                }
                var bccoutaddress = getOutAddress(bccsenders, "1");
                if (bccoutaddress.length > 0) {
                    for (var i = 0; i < bccoutaddress.length; i++) {
                        outaddress.push(bccoutaddress[i]); //内部地址
                    }
                }
            }
        }
    }
    /********主题********/
    var theme = $.trim($(".input-theme").val());


    /********附件********/
    var attachments = new Array();
    var curfile = $(".uploadify-queue").find(".uploadify-queue-item");
    var isuploading = false; //是否正在上传
    if (curfile.length > 0) {
        curfile.each(function () {
            if ($(this).css("display") != "none") {
                if ($(this).data("iscomplete") == "0") {
                    isuploading = true;
                } else {
                    var name = $(this).data("newname");
                    var realname = $(this).data("realname");
                    var type = $(this).data("type");
                    var size = $(this).data("size");
                    var attachment = { name: name, realname: realname, type: type, size: size };
                    attachments.push(attachment);
                }
            }
        })
    }
    if (isuploading) {
        sysmsg("正在上传附件,请稍候...", 2);
        return;
    }
    /********内容********/
    var sendcontent = UE.getEditor("editor").getContent();

    /*********其它选项********/
    var isurgent = $("#option-urgent").is(":checked") == true ? "1" : "0"; //是否紧急
    var isreceipt = $("#option-receipt").is(":checked") == true ? "1" : "0"; //是否回执
    var ismsgtip = $("#option-msg").is(":checked") == true ? $("#option-msgmain").is(":checked") == true ? "1" : "2" : "0"; //是否发送短信
    var darftid = $("#draftMailID").val();
    var sendinfo = {
        optiontype: optiontype, issingle: issingle
       , inaddress: inaddress
       , outaddress: outaddress
       , attachments: attachments
       , theme: theme, isurgent: isurgent, ismsgtip: ismsgtip, isreceipt: isreceipt
       , darftid: darftid
    };

    MAIL.Send.sendMail(JSON.stringify(sendinfo), sendcontent, optiontype);

}

/*
 * 清空邮件发送信息
 */
function clearSendInfo() {
    //联系人
    $(".input-groupsend").find(".send-address").remove().end().hide().removeClass("mail-inputaddr-cur").find(".input-content").removeClass("active").end().find(".input-title").removeClass("active").end().find(".input-option").removeClass("active");
    $(".input-copysend").find(".send-address").remove().end().hide().removeClass("mail-inputaddr-cur").find(".input-content").removeClass("active").end().find(".input-title").removeClass("active").end().find(".input-option").removeClass("active");
    $(".input-bccsend").find(".send-address").remove().end().hide().removeClass("mail-inputaddr-cur").find(".input-content").removeClass("active").end().find(".input-title").removeClass("active").end().find(".input-option").removeClass("active");
    $(".input-send").find(".send-address").remove().end().show().addClass("mail-inputaddr-cur").find(".input-content").addClass("active").end().find(".input-title").addClass("active").end().find(".input-option").addClass("active");
    $(".input-themetxt").removeClass("mail-inputaddr-cur").find(".input-content").removeClass("active").end().find(".input-title").removeClass("active");
    $(".input-theme").val("");

    $(".toolr-copysend").show().data("status", "0").find("span").text("抄送");
    $(".toolr-bccsend").show().data("status", "0").find("span").text("密送");
    $(".toolr-groupsend").show().data("status", "0").find("span").text("单独发送");
    //清空附件
    if ($("#upload_flag").css("display") == "none") {
        $("#uploadify").uploadify('clear', '*');
    }
    //添空内容
    UE.getEditor("editor").setContent("");
    //更多选项
    $("#option-urgent").prop("checked", false);
    $("#option-receipt").prop("checked", false);
    $("#option-msg").prop("checked", false);
    $("#option-msgmain").prop("checked", true).attr("disabled", "disabled");
    $("#option-msgall").prop("checked", false).attr("disabled", "disabled");
    //清除草稿箱邮件ID
    $("#draftMailID").val("");

}


/*
 * 查看已发送的邮件
 */
function readsendmail($ele) {

    $(".sendinfo-sender-addrs").html("");//发件人
    $(".sendinfo-recver-addrs").html("");//收件人
    $(".sendinfo-copyer-addrs").html("");//抄送人
    $(".sendinfo-files").html("");//附件
    $(".sendinfo-txt").html("");//内容

    var id = $ele.data("id");
    var mailid = id;
    $("#curSendID").val(id);
    $("#curSendMailID").val(mailid);
    var title = $ele.find(".row-title").text();
    $(".sendinfo-mailtitle").text(title);
    //var mailid = $ele.data("mailid");
    var isread = $ele.data("isread");
    MAIL.Send.getInMailContent(id, mailid, isread);
    MAIL.Send.getInMailInfo(id, mailid);
    showCont($(".mail-sendinfo"));

    var preid = $ele.prev() != undefined ? $ele.prev().data("id") : "";
    preid = preid != undefined ? preid : "";
    var pretitle = $ele.prev() != undefined ? $ele.prev().find(".row-title").text() : "";
    var premailid = $ele.prev() != undefined ? $ele.prev().data("mailid") : "";
    premailid = premailid != undefined ? premailid : "";
    var preisread = $ele.prev() != undefined ? $ele.prev().data("isread") : "";
    var nextid = $ele.next() != undefined ? $ele.next().data("id") : "";
    nextid = nextid != undefined ? nextid : "";
    var nexttitle = $ele.next() != undefined ? $ele.next().find(".row-title").text() : "";
    var nextmailid = $ele.next() != undefined ? $ele.next().data("mailid") : "";
    nextmailid = nextmailid != undefined ? nextmailid : "";
    var nextisread = $ele.next() != undefined ? $ele.next().data("isread") : "";
    $("#mailsend_pre").data("id", preid).data("mailid", premailid).data("isread", preisread).attr("title", pretitle);
    $("#mailsend_next").data("id", nextid).data("mailid", nextmailid).data("isread", nextisread).attr("title", nexttitle);

    setdelbtn();
}

/*
 * 查看草稿箱邮件
 */
function readdraftmail($ele) {

    clearSendInfo();
    var id = $ele.data("id");
    $("#draftMailID").val(id);
    var mailid = id;
    MAIL.Send.getMailEditorContent(id, mailid, "1");
    MAIL.Send.getMailEditorInfo(id, mailid);
    showCont($(".mail-write"));
    selectMenu($("#mailSend"));

}

/*
 * 删除草稿箱的附件
 */
function deleteAtta(draftID) {
    //删除服务器上文件
    var me = $("#" + draftID);
    var filename = me.data("newname");
    var size = me.data("size");
    $.ajax({
        type: 'POST',
        async: false,
        url: "/EmailCenter/Handle/UploadHandler.ashx",
        data: { filename: filename, option: "delete", size: size },
        success: function (data) {
            sysmsg("附件已删除");
        }
    });
    swfuploadify = $("#uploadify").data('uploadify');//附件上传对象
    $("#uploadify").uploadify('settings', 'uploadLimit', swfuploadify.settings.uploadLimit + 1);//附件上传数量限制
    me.remove();
}

/*
 * 邮件回复 全部回复或转发
 */
function mailReply(type) {
    clearSendInfo();
    var id = $("#curRecvID").val();
    var mailid = $("#curRecvMailID").val();
    MAIL.Send.replyMailInfo(id, mailid, type);
    selectMenu($("#mailSend"));
    showCont($(".mail-write"));
}

/*
 * 外部邮件回复 全部回复或转发
 */
function mailOutReply(type)
{
    clearSendInfo();
    var id = $("#curRecvOutID").val();
    var mailid = $("#curRecvOutMailID").val();
    MAIL.Send.replyMailOutInfo(id, mailid, type);
    selectMenu($("#mailSend"));
    showCont($(".mail-write"));
}

/*
 * 编辑联系人
 */
function editorcontact($ele) {
    $.layer({
        type: 1,
        area: ['auto', 'auto'],
        shade: [0.2, '#000'],
        title: "编辑联系人",
        border: [2, 1, '#E5E5E5'],
        page: { dom: '#contactInfo' }
    });

    var id = $ele.data("id");
    $("#curContactID").val(id);
    var type = $ele.data("type");
    var code = $ele.data("code");
    var name = $ele.data("name");
    var mail = $ele.data("mail");
    var groupid = $ele.data("groupid");

    $(".contact-type").attr("disabled", "disabled");
    if (type == "1") {
        selContactType("1");
        $("#contactcode").val(code);
        $("#contactnameIn").val(name);
        $("#contactgroups").val(groupid);
        $("#contacttype_in").prop("checked", true);
    }
    else {
        selContactType("2");
        $("#contactcode").val(code);
        $("#contactnameOut").val(name);
        $("#contactmail").val(mail);
        $("#contactgroups").val(groupid);
        $("#contacttype_out").prop("checked", true);
        $("#contactnameOut").focus();
    }


}

/*
 * 切换联系人类型
 */
function selContactType(type) {
    if (type == "2") {
        //外部联系人
        $(".contact-namein-row").hide();
        $(".contact-nameout-row").show();
        $(".contact-mail-row").show();
        $("#contactnameOut").focus();
    }
    else {
        //内部联系人
        $(".contact-namein-row").show();
        $(".contact-nameout-row").hide();
        $(".contact-mail-row").hide();
    }
}

/*
 * 初始化联系人
 */
function initContactInfo() {
    $(".contact-type").removeAttr("disabled");
    $("#contacttype_in").prop("checked", true);
    $(".contact-namein-row").show();
    $(".contact-nameout-row").hide();
    $(".contact-mail-row").hide();
    $("#curContactID").val("");
    $("#contactmail").val("");
    $("#contactnameIn").val("");
    $("#contactnameOut").val("");
    $("#contactcode").val("");
    $("#contactgroups").val("0");
    $(".seletcontact").show();
}

/*
 * 保存联系人
 */
function saveContact() {
    var name = "";
    var namein = $("#contactnameIn").val();
    var nameout = $("#contactnameOut").val(); addAddresser
    var code = $("#contactcode").val();
    var type = $("#contacttype_in").is(":checked") == true ? "1" : "2";
    var mail = $("#contactmail").val();
    var groupid = $("#contactgroups").val();
    var id = $("#curContactID").val();

    if (type == "1") {
        name = namein;
        if (code == "") {
            sysmsg("请输入联系人姓名");
            return;
        }

    }
    else {
        name = nameout;
        if (nameout == "") {
            sysmsg("请输入联系人姓名");
            return;
        }
        else if (mail == "") {
            sysmsg("请输入邮件地址");
            return;
        } else {
            var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            if (!reg.test(mail)) {
                sysmsg("邮件地址无效,请重新输入", 2);
                return;
            }
        }
    }

    if (id == "") {
        MAIL.Address.addContact(code, name, mail, type, groupid);
    }
    else {
        MAIL.Address.updateContact(id, code, name, mail, type, groupid);
    }
}

/*
 * 初始化联系组
 */
function initContactGroupInfo() {
    $("#curContactGroupID").val("");
    $("#contactgroupname").val("");
}
/*
 * 保存联系组
 */
function saveContactGroup() {
    var name = $("#contactgroupname").val();
    var id = $("#curContactGroupID").val()
    if (name == "") {
        sysmsg("请输入组名");
        return;
    }
    if (id == "") {
        MAIL.Address.addContactGroup(name);
    }
    else {

        MAIL.Address.updateContactGroup(id, name);
    }
}

/*
 * 选择 联系组
 */
function contactgroupclick($ele) {
    if ($ele.parent().parent().attr("id") == "addres_lookup") {
        //查看 
        var id = $ele.data("id");
        var name = $ele.data("name");
        if (id == "0") {
            MAIL.Address.getContact();
            $(".tool_delgroup").hide();
        }
        else {
            $("#curlookGroupID").val(id);
            $("#curlookGroupName").val(name);
            MAIL.Address.getContactByGroupID(id);
            $(".tool_delgroup").show();
        }
    }
    else {
        //移动
        var groupid = $ele.data("id");
        var ids = "";
        $(".mail-curshow").find(".mail-row").filter(".select").each(function () {
            var me = $(this);
            if (me.hasClass("select")) {
                var id = me.data("id");
                ids += id + ",";
            }
        })
        if (ids != "") {
            MAIL.Address.moveContact(ids, groupid);
        } else {
            sysmsg("请选择邮件");
        }
    }

}
/*
 * 联系组 鼠标经过
 */
function contactgroupover($ele) {
    $ele.addClass("hover");
}
/*
 * 联系组 鼠标离开
 */
function contactgroupout($ele) {
    $ele.removeClass("hover");
}

/*
 * 选择内部人员
 */
function openUserList(nametxt, codetxt) {
    strURL = "../users/SelectUsers.aspx?single=true&txtCode=" + codetxt + "&txtName=" + nametxt + "&mail=true";
    openNewDiv(strURL, 500, 475);
    $("#tmpdiv").css("z-index", "99999999");
}

//邮件夹编辑、删除图标显示
function flderitemover($ele) {
    $ele.find(".floder-editoricon").show();
    $ele.find(".floder-deleteicon").show();
    $ele.addClass("hover");
}
//邮件夹编辑、删除图标显示
function flderitemout($ele) {
    $ele.find(".floder-editoricon").hide();
    $ele.find(".floder-deleteicon").hide();
    $ele.removeClass("hover");
}
function flderoptionover($ele)
{
    $ele.addClass("hover");
}
function flderoptionout($ele) {
    $ele.removeClass("hover");
}
//编辑邮件夹
function editorflder($ele) {
    $("#curFolderID").val($ele.parent().data("id"));
    $.layer({
        type: 1,
        area: ['auto', 'auto'],
        shade: [0.2, '#000'],
        title: "添加邮件夹",
        border: [2, 1, '#E5E5E5'],
        page: { dom: '#folderInfo' }
    });
    $("#foldername").val($ele.parent().data("name")).focus();
}
//删除邮件夹
function deleteflder($ele) {
    var id = $ele.parent().data("id");
    layer.confirm("确定要删除此邮件夹吗？\n提示：邮件不会被删除", function () {
        MAIL.Receive.deleteMailFolder(id);
    })
}
    //搜索邮件
function searchMail(word) {
    $("#searchWord").text(word);
    MAIL.Receive.searchMail(word);
}


// 读取外部邮件
function readmailout($ele) {

    var id = $ele.data("id");
    var mid = $ele.data("mailid");
    var isread = $ele.data("isread");

    MAIL.Receive.getOutMailByID(mid, id);

    //$ele.removeClass("mail-cont-unread").addClass("mail-cont-read");
    //$ele.data("isread", "0");
    $(".recvoutinfo-sender-addrs").html("");//发件人
    $(".recvoutinfo-recver-addrs").html("");//收件人
    $(".recvoutinfo-copyer-addrs").html("");//抄送人
    $(".recvoutinfo-files").html("");//附件
    $(".recvoutinfo-txt").html("");//内容

    $("#curRecvOutID").val(id);
    $("#curRecvOutMailID").val(mid);
    var title = $ele.find(".row-title").text();
    $(".recvoutinfo-mailtitle").text(title);

    var preid = $ele.prev() != undefined ? $ele.prev().data("id") : "";
    preid = preid != undefined ? preid : "";
    var pretitle = $ele.prev() != undefined ? $ele.prev().find(".row-title").text() : "";
    var premailid = $ele.prev() != undefined ? $ele.prev().data("mailid") : "";
    premailid = premailid != undefined ? premailid : "";
    var preisread = $ele.prev() != undefined ? $ele.prev().data("isread") : "";
    var nextid = $ele.next() != undefined ? $ele.next().data("id") : "";
    nextid = nextid != undefined ? nextid : "";
    var nexttitle = $ele.next() != undefined ? $ele.next().find(".row-title").text() : "";
    var nextmailid = $ele.next() != undefined ? $ele.next().data("mailid") : "";
    nextmailid = nextmailid != undefined ? nextmailid : "";
    var nextisread = $ele.next() != undefined ? $ele.next().data("isread") : "";
    $("#mailrecvout_pre").data("id", preid).data("mailid", premailid).data("isread", preisread).attr("title", pretitle);
    $("#mailrecvout_next").data("id", nextid).data("mailid", nextmailid).data("isread", nextisread).attr("title", nexttitle);
    setdelbtn();
}

/*
 * 移动邮件夹
 */
function floditemclick($ele) {
    //发件箱 移动邮件夹
    var ids = "";
    var types = "";
    var flags = "";
    $(".mail-curshow").find(".mail-row").filter(".select").each(function () {
        var me = $(this);
        var id = me.data("id");
        var type = me.data("type");
        var flag = me.data("flag");
        ids += id + ",";
        types += type + ",";
        flags += flag + ",";
    })
    if (ids != "") {
        var folerid = $ele.data("id");
        MAIL.Receive.moveFolder(ids, types, flags, folerid);
    }

}
/*
 * 移动邮件夹项 鼠标经过
 */
function floditemover($ele){
    $ele.addClass("hover");
}

/*
 * 移动邮件夹 鼠标离开
 */
function floditemout($ele) {
    $ele.removeClass("hover");
}

/*
 * 阅读已发送外部邮件
 */
function readsendmailout($ele) {
    $(".sendinfo-sender-addrs").html("");//发件人
    $(".sendinfo-recver-addrs").html("");//收件人
    $(".sendinfo-copyer-addrs").html("");//抄送人
    $(".sendinfo-files").html("");//附件
    $(".sendinfo-txt").html("");//内容

    var id = $ele.data("id");
    var mailid = $ele.data("mailid");
    $("#curSendID").val(id);
    $("#curSendMailID").val(mailid);
    var title = $ele.find(".row-title").text();
    $(".sendinfo-mailtitle").text(title);
    //var mailid = $ele.data("mailid");
    var isread = $ele.data("isread");
    MAIL.Send.getOutSendMailByID(mailid, id);
    //MAIL.Send.getInMailInfo(id, mailid);
    //showCont($(".mail-sendinfo"));

    var preid = $ele.prev() != undefined ? $ele.prev().data("id") : "";
    preid = preid != undefined ? preid : "";
    var pretitle = $ele.prev() != undefined ? $ele.prev().find(".row-title").text() : "";
    var premailid = $ele.prev() != undefined ? $ele.prev().data("mailid") : "";
    premailid = premailid != undefined ? premailid : "";
    var preisread = $ele.prev() != undefined ? $ele.prev().data("isread") : "";
    var nextid = $ele.next() != undefined ? $ele.next().data("id") : "";
    nextid = nextid != undefined ? nextid : "";
    var nexttitle = $ele.next() != undefined ? $ele.next().find(".row-title").text() : "";
    var nextmailid = $ele.next() != undefined ? $ele.next().data("mailid") : "";
    nextmailid = nextmailid != undefined ? nextmailid : "";
    var nextisread = $ele.next() != undefined ? $ele.next().data("isread") : "";
    $("#mailsend_pre").data("id", preid).data("mailid", premailid).data("isread", preisread).attr("title", pretitle);
    $("#mailsend_next").data("id", nextid).data("mailid", nextmailid).data("isread", nextisread).attr("title", nexttitle);

    setdelbtn();
}

/*
 * 设置删除按钮 如果为回收箱 
 */
function setdelbtn() {
    if (getCurNavID() == "mailRecover") {
        $(".tool_deldetal").hide();
        $(".tool_delsendinfo").hide();
        $(".tool_deldetalout").hide();
    }
    else {
        $(".tool_deldetal").show();
        $(".tool_delsendinfo").show();
        $(".tool_deldetalout").show();
    }

}

/*
 * 上一封 下一封 获取邮件信息
 */
function readmailInfo(id) {
    var curNav = getCurNavID();
    var curele;
    switch (curNav) {
        case "mailRecover"://回收箱
            curele = $(".mail-recover").find(".mail-row[data-id='" + id + "']");
            break;
        case "mailOutRecv"://外部接收
            curele = $(".mail-recvout").find(".mail-row[data-id='" + id + "']");
            break;
        case "mailSearch"://搜索
            curele = $(".mail-searchinfo").find(".mail-row[data-id='" + id + "']");
            break;
        case "mailInSend"://内部发送
        case "mailOutSend"://外部发送
            curele = $(".mail-sendin").find(".mail-row[data-id='" + id + "']");
            break;
        case "mailUnread"://未读
        case "mailInRecv"://内部收件
            curele = $(".mail-recv").find(".mail-row[data-id='" + id + "']");
            break;
        default://邮件夹
            curele = $(".mail-recv").find(".mail-row[data-id='" + id + "']");
            break;
    }
    if (curele.length > 0)
    {
        var clickfun = curele.attr("onclick");
        switch (clickfun) {
            case "readmail($(this))":
                readmail(curele);
                break;
            case "readmailout($(this))":
                readmailout(curele);
                break;
            case "readsendmail($(this))":
                readsendmail(curele);
                break;
            case "readsendmailout($(this))":
                readsendmailout(curele);
                break;
            default:
                break;
        }
    }

}

/*
 * 标记星标或取消星标
 */
function markStar($ele) {
    var type="1";
    if ($ele.hasClass("active")) {
        $ele.removeClass("active");
        $ele.attr("title", "标记星标");
        type="0";
    }
    else {
        $ele.addClass("active");
        $ele.attr("title", "取消星标");
    }

    var $row = $ele.parent().parent();
    var id = $row.data("id");
    var flag = $row.data("flag");
    var mode = $row.data("type");
    MAIL.Receive.setStar(id, type, flag, mode);

    e = event || window.event;
    if (e.stopPropagation)
        e.stopPropagation();
    else
        e.cancelBubble = true;
}

///*
// * 设置页签标题
// */
//function setTabName() {
//    var tab = $(".tab-box-list", window.parent.document);
//    if (tab.length > 0) {
//        var tabName = tab.find(".active").children().eq(0).attr("title");
//        tabName = tabName.replace("！", "").replace("邮件信息:", "");
//        tabName = $.trim(tabName);
//        if ($(".mail-recv").data("type") == 0) {
//            var rows = $(".mail-recv").find(".mail-row");
//            if (rows.length > 0) {
//                var isread = true;
//                rows.each(function () {
//                    var title = $(this).find(".row-title").text();
//                    if (title == tabName) {
//                        isread = false;
//                    }
//                })
//                if (isread)
//                    tab.find(".active").children().eq(0).attr("title", "邮件中心").text("邮件中心");
//            } else {
//                tab.find(".active").children().eq(0).attr("title", "邮件中心").text("邮件中心");
//            }
//        }
//    }
//}

/*
*显示邮件详情
*/
function showDetails(type, id, mailid,title) {

    if (type == "1") {
        //内部邮件
        $(".recvinfo-sender-addrs").html("");//发件人
        $(".recvinfo-recver-addrs").html("");//收件人
        $(".recvinfo-copyer-addrs").html("");//抄送人
        $(".recvinfo-files").html("");//附件
        $(".recvinfo-txt").html("");//内容
        $(".recvinfo-mailtitle").text(title);
        $("#curRecvID").val(id);
        $("#curRecvMailID").val(mailid);
        MAIL.Receive.getInMailContent(id, mailid, "0");
        MAIL.Receive.getInMailInfo(id, mailid);
    } else {
        //外部邮件
        $(".recvoutinfo-sender-addrs").html("");//发件人
        $(".recvoutinfo-recver-addrs").html("");//收件人
        $(".recvoutinfo-copyer-addrs").html("");//抄送人
        $(".recvoutinfo-files").html("");//附件
        $(".recvoutinfo-txt").html("");//内容
        $(".recvoutinfo-mailtitle").text(title);
        $("#curRecvOutID").val(id);
        $("#curRecvOutMailID").val(mailid);
        MAIL.Receive.getOutMailByID(mailid, id);
    }

    showCont($(".mail-recvinfo"));

}

/*
*关闭模态窗口
*/
function closeModal() {
    window.parent.closeModel();
}