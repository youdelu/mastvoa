function getDwUrl() {
    var path = "/";
    /**if (typeof window.top.rootPath != "undefined") {
        path = window.top.rootPath;
    }
    else {
        try {
            var myOpener = window.opener;
            if (typeof myOpener != "undefined") {
                if (typeof myOpener.top.rootPath != "undefined") {

                    path = myOpener.top.rootPath;

                }
            }
        } catch (e) {
        }
    }
	**/
    return path;
}
/*
 * 邮件中心数据交互
 */
var MAIL = MAIL = window["MAIL"] || {};



/*
 * 接收邮件
 */
MAIL.Receive = {
    //页面显示行数
    pagesize:15,
    //后台交互地址
    handleurl: getDwUrl() + "EmailCenter/Controller.ashx?action=receive",
    /**
    * 刷新
    * @method refresh
    */
    refresh:function(index){
        MAIL.Receive.getMailNum();
        if ($(".mail-recv").data("type") == "0") {
            this.getUnreadMail(index);
        }
        else if($(".mail-recv").data("type") == "1") {
            this.getInRecvMail(index);
        }
        else if ($(".mail-recv").data("type") == "2") {
            var folderid = $(".mailfolder").find(".item-file").filter(".select").data("id");
            this.getInFolderMail(folderid,index);
        }
        else if ($(".mail-recv").data("type") == "3") {
            this.getStarMail(index);
        }
       // sysmsg("已刷新");
    },
    /**
    * 获取邮件数量信息 未读邮件、草稿箱邮件、回收箱邮件
    * @method getMailNum
    */
    getMailNum: function () {
		/**
        $.ajax(
            {
                type: "GET",
                url:this.handleurl,
                data: {  option: "mailnum" },
                dataType: "json",
                success: function (d) {
                    var n_unread = d.n_unread;
                    var n_draft = d.n_draft;
                    var n_recover = d.n_recover;
                    $("#mailUnread").find("strong").text(n_unread != 0 ? "(" + n_unread + ")" : "");
                    $("#mailDraft").find("strong").text(n_draft != 0 ? "(" + n_draft + ")" : "");
                    $("#mailRecover").find("strong").text(n_recover != 0 ? "(" + n_recover + ")" : "");
                    if ($("#mailUnread").find("strong").text() == "") {
                        $("#isHaveUnread").val("0");
                    }
                    else {
                        $("#isHaveUnread").val("1");
                    }
                },
                error:function(xhr, textStatus, errorThrown){
                    console.log(textStatus + " " + xhr.status + " " + xhr.readyState);
                }
            });
			**/
    },
    /**
    * 获取邮件夹
    * @method getUnreadNum
    */
    getMailFolder: function () {
		/**
        $.ajax(
          {
              type: "GET",
              url: this.handleurl,
              data: {  option: "mailfolder" },
              dataType: "json",
              success: function (d) {
                  var menu_folder = "<div data-id='0' class='tool-menu-item' onclick='floditemclick($(this))' onmouseover='floditemover($(this))' onmouseout='floditemout($(this))' ><span>默认</span></div>";
                  if (d.status == "1") {
                      var data = d.data;
                      var folders = '<ul style="display:none;">';
                     
                      for (var i = 0; i < data.length; i++) {
                          var folder = "";
                          var id = data[i].id;
                          var name = data[i].foldname;
                          //folder = "<li><div class='mail-nav-item item-file' data-id='" + id + "' onclick='flderClick($(this))'>" + name + "</div></li>";
                          folder = '   <li>\
                                <div class="mail-nav-item item-file" onmouseover="flderitemover($(this))" onmouseout="flderitemout($(this))" onclick="flderClick($(this))" data-id="'+ id + '" data-name="' + name + '">\
                                    <div title="'+name+'" class="mail-floder-name">'+name+'</div>\
                                    <span class="floder-editoricon" onclick="editorflder($(this))" onmouseover="flderoptionover($(this))" onmouseout="flderoptionout($(this))" title="编辑邮件夹">编辑</span>\
                                    <span class="floder-deleteicon" onclick="deleteflder($(this))" onmouseover="flderoptionover($(this))" onmouseout="flderoptionout($(this))" title="删除邮件夹">删除</span>\
                                </div>\
                            </li>';
                          folders += folder;
                          menu_folder += "<div data-id='" + id + "' class='tool-menu-item' onclick='floditemclick($(this))' onmouseover='floditemover($(this))' onmouseout='floditemout($(this))' ><span>" + name + "</span></div>";
                      }
                      folders += "</ul>";
                      $("#floder-list").html(folders);
                      $(".mailfolder").find(".floder-icon").show();
                      $(".list-floders").html(menu_folder);
                  }
                  else {
                      $("#floder-list").html("");
                      $(".mailfolder").find(".floder-icon").hide();
                      $(".list-floders").html(menu_folder);
                  }
              },
              error: function (xhr, textStatus, errorThrown) {
                  console.log(textStatus + " " + xhr.status + " " + xhr.readyState);
              }
          });
		  **/
    },
    /**
    * 添加邮件夹
    * @method getUnreadNum
    */
    addMailFolder: function (name) {
        var params = { option: "addmailfolder", name: name };
        $.post(this.handleurl, params, function (d) {
            if (d.status == "1") {
                layer.closeAll();
                sysmsg("已添加");
                MAIL.Receive.getMailFolder();
            }
        })
    },
    /**
    * 删除邮件夹
    * @method getUnreadNum
    */
    deleteMailFolder: function (id) {
        var params = { option: "deltemailfolder", id: id };
        $.post(this.handleurl, params, function (d) {
            if (d.status == "1") {
                layer.closeAll();
                sysmsg("已删除");
                MAIL.Receive.getMailFolder();
                selectMenu($("#mailUnread"));//选择菜单
                MAIL.Receive.getUnreadMail();
            }
        })
    },
    /**
    * 修改邮件夹
   * @method getUnreadNum
   */
    updateMailFolder: function (id,name) {
        var params = { option: "updatemailfolder",id:id, name: name };
        $.post(this.handleurl, params, function (d) {
            if (d.status == "1") {
                layer.closeAll();
                sysmsg("已修改");
                MAIL.Receive.getMailFolder();
            }
        })
    },

    /*
     * 输出数据列表
     * @param---data 数据JSON对象
     * @param---mailtype 数据类型 1-接收邮件;2-发送邮件,3-回收箱邮件或邮件夹或搜索邮件
     * @param---option 操作类型: "draft"-草稿箱;
     */
    setDataList: function (data, mailtype, option) {
        var mailrows = "";
        for (var i = 0; i < data.length; i++) {
            var row = "";
            var id = data[i].id; //ID
            var mailid = data[i].mailid; //邮件ID
            var title = data[i].title; //邮件标题
            var showtitle = title;
            if (title == undefined || title == "") {
                showtitle = "[无主题]";
            }
            var recvtime = "";
            if (mailtype == "2") {
                recvtime = data[i].sendtime;//邮件接收时间
            }
            else {
                recvtime = data[i].recvtime;//邮件接收时间
            }
            recvtime = recvtime.replace(/\-/g, '/');//统一时间格式
            var date = new Date(recvtime);
            recvtime = date.format("yyyy-MM-dd hh:mm:ss");
            var isread = data[i].isread; //是否已读
            var havefile = data[i].havefile;//是否有附件
            var sendusercode = data[i].sendusercode; //发送账号或发送地址
            var sendusername = data[i].sendusername; //接收姓名或接收名称
            var istop = data[i].istop; //是否置顶
            var isurgent = data[i].isurgent; //是否紧急
            var type = data[i].type;//邮件类型 1-内部邮件;2-外部邮件
            var flag = data[i].flag;//邮件标志
            var isstar = data[i].isstar;//是否为星标邮件

            var classnames="mail-row ";
            var onclick = "";
            var col_flag = '';
            if (mailtype == "1") {
                //接收
                if (type == 1) {
                    classnames += "mail-typein ";
                    onclick = "readmail($(this))";
                    col_flag = '内部邮件';
                }
                else {
                    classnames += "mail-typeout ";
                    onclick = "readmailout($(this))";
                    col_flag = '外部邮件';
                }
                flag = "recv";
            }
            else if (mailtype == "2") {
                //发送
                sendusername = data[i].recvers; //接收者
                if (sendusername == "" || sendusername == null || sendusername == undefined)
                    sendusername = data[i].recversout;
                if (type == 1) {
                    classnames += "mail-typein ";
                    col_flag = '内部邮件';
                    if (option == "draft") {
                        onclick = "readdraftmail($(this))";
                    }
                    else {
                        onclick = "readsendmail($(this))";
                    }   
                }
                else {
                    classnames += "mail-typeout ";
                    onclick = "readsendmailout($(this))";
                    col_flag = '外部邮件';
                }
                flag = "send";
            }
            else {
                //回收箱 或邮件夹
                if (type == 1) {
                    classnames += "mail-typein ";
                    if (flag == "recv") {
                        onclick = "readmail($(this))";
                        col_flag = '内部接收';
                    }
                    else {
                        onclick = "readsendmail($(this))";
                        col_flag = '内部发送';
                        if (sendusername == "" || sendusername == null || sendusername == undefined)
                            sendusername = data[i].sendusernameout;
                    }
                }
                else {
                    classnames += "mail-typeout ";
                    if (flag == "recv") {
                        onclick = "readmailout($(this))";
                        col_flag = '外部接收';
                    }
                    else {
                        onclick = "readsendmailout($(this))";
                        col_flag = '外部发送';
                    }
                }
            }

            //是否已读
            if (isread == 0) {
                classnames += "mail-cont-unread";
            }
            else {
                classnames += "mail-cont-read";
            }


            row = '<div  class="' + classnames + '"  onclick="' + onclick + '" onmouseover="mailrowover($(this))" onmouseout="mailrowout($(this))" ';
            row+=' data-type="'+type+'" data-id="' + id + '" data-mailid="' + mailid + '" data-sendercode="' + sendusercode + '" data-sendername="' + sendusername + '" ';
            row+=' data-istop="' + istop + '" data-isread="' + isread + '" data-flag="'+flag+'">';
            row += '<div class="row-first" onclick="checkrowbyfirst($(this))"> <input type="checkbox" onclick="checkrow($(this))" class="mail-check" />';
            if (isurgent == 1) {
                row += '<span class="urgent-icon" title="紧急">!</span>';
            }
            row += '<span>' + sendusername + '</span></div>';
            row += '<div class="row-midd">';
            if (option == undefined) { //星标
                if (isstar == 1) {
                    row += '<div class="row-star active" title="取消星标" onclick="markStar($(this))"></div>';
                }
                else {
                    row += '<div class="row-star" title="标记星标" onclick="markStar($(this))"></div>';
                }
            }
            if (havefile == 1) { //附件
                row += '<div class="row-attaicon" title="此邮件包含附件"></div>';
            }
            row += '<div class="row-title">' + showtitle + '</div>';
            if (istop == "1") { //置顶
                row += ' <div class="row-icon" title="置顶">↑</div> ';
            } 
            row += ' <div class="row-flag">' + col_flag + '</div>';//邮件标签
            row += '</div><div class="row-last">';
            row += '<div class="row-date">' + recvtime + '</div></div></div>';
            mailrows += row;
        }
        return mailrows;
    },

    /**
    * 获取未读邮件
    * @method getUnreadMail
     */
    getUnreadMail: function (index,type) {
        var params;
        type = type != undefined ? type : "3";
        if (index != undefined) {
            params = {  option: "unreadmail", pagesize: this.pagesize,pageindex:index,type:type}
        }
        else {
            params = {  option: "unreadmail", pagesize: this.pagesize,type:type}
        }
		/**
        $.ajax(
           {
               type: "GET",
               url: this.handleurl,
               data: params,
               dataType: "json",
               success: function (d) {
                   layer.closeAll();
                   if (d.status == "1") {
                       var data = d.data;//内部邮件数据
                       var dataout = d.dataout;//外部邮件数据
                       var mailrows = "";
                       mailrows += MAIL.Receive.setDataList(data, "1");//获取内部邮件列表
                       $(".mail-rows").html("");
                       $(".mail-rows").html(mailrows);
                       $("#mailsrecv-page").show();
                       var totalrows = d.totalrows;//总记录数
                       var pages = d.pages;//页数
                       var curpage = d.curpage;//当前页
                       /*分页*/
					  /**
                       pager.init({
                           pagerid: 'mailsrecv-page',
                           //页码
                           pno: curpage,
                           //总页码
                           total: pages,
                           //总数据条数
                           totalRecords: totalrows
                       });
                       pager.generPageHtml();
                   }
                   else {
                       $(".mail-rows").html('<div style="text-align:center;height:50px;line-height:50px;"> <span>暂无未读邮件！</span></div>');
                       $("#mailsrecv-page").hide();
                   }
                   //setTabName();
                   MAIL.Receive.getMailNum();
               },
               error: function (xhr, textStatus, errorThrown) {
                   console.log(textStatus + " " + xhr.status + " " + xhr.readyState);
               }
           });
		   **/
    },
    /**
    * 获取内部邮件收件箱
    * @method getUnreadMail
    */
    getInRecvMail: function (index) {
        var params;
        if (index != undefined) {
            params = {  option: "inrecvmail", pagesize: this.pagesize, pageindex: index }
        }
        else {
            params = {  option: "inrecvmail", pagesize: this.pagesize }
        }
        $.ajax(
         {
          type: "GET",
          url: this.handleurl,
          data:params,
          dataType: "json",
          success: function (d) {
              if (d.status == "1") {
                  var data = d.data;
                  var mailrows = "";
                  mailrows = MAIL.Receive.setDataList(data, "1");//获取邮件列表
                  $(".mail-rows").html("");
                  $(".mail-rows").html(mailrows);
                  $("#mailsrecv-page").show();
                  if (index==undefined) {
                      var totalrows = d.totalrows;//总记录数
                      var pages = d.pages;//页数
                      /*分页*/
                      pager.init({
                          pagerid: 'mailsrecv-page',
                          //页码
                          pno: '1',
                          //总页码
                          total: pages,
                          //总数据条数
                          totalRecords: totalrows
                      });
                      pager.generPageHtml();
                  }
              }
              else {
                  $(".mail-rows").html('<div style="text-align:center;height:50px;line-height:50px;"> <span>暂无邮件！</span></div>');
                  $("#mailsrecv-page").hide();
              }
          },
          error: function (xhr, textStatus, errorThrown) {
              console.log(textStatus + " " + xhr.status + " " + xhr.readyState);
          }
    });
    },
    /**
    * 获取内部邮件 邮件夹收件箱
   * @method getUnreadMail
    */
    getInFolderMail: function (folderid,index) {
        var params;
        if (index != undefined) {
            params = {  option: "infoldermail", pagesize: this.pagesize, pageindex: index, folderid: folderid }
        }
        else {
            params = {  option: "infoldermail", pagesize: this.pagesize, folderid: folderid }
        }
        $.ajax(
         {
             type: "GET",
             url: this.handleurl,
             data: params,
             dataType: "json",
             success: function (d) {
                 if (d.status == "1") {
                     var data = d.data;
                     var mailrows = "";
                     mailrows = MAIL.Receive.setDataList(data, "3");//获取邮件列表
                     $(".mail-rows").html("");
                     $(".mail-rows").html(mailrows);
                     $("#mailsrecv-page").show();
                     if (index == undefined) {
                         var totalrows = d.totalrows;//总记录数
                         var pages = d.pages;//页数
                         /*分页*/
                         pager.init({
                             pagerid: 'mailsrecv-page',
                             //页码
                             pno: '1',
                             //总页码
                             total: pages,
                             //总数据条数
                             totalRecords: totalrows
                         });
                         pager.generPageHtml();
                     }
                 }
                 else {
                     $(".mail-rows").html('<div style="text-align:center;height:50px;line-height:50px;"> <span>暂无邮件！</span></div>');
                     $("#mailsrecv-page").hide();
                 }
             },
             error: function (xhr, textStatus, errorThrown) {
                 console.log(textStatus + " " + xhr.status + " " + xhr.readyState);
             }
         });
    },
    /**
    * 删除内部邮件
    * @method delInRecvMail
     */
    delInRecvMail: function (ids) {
        var params = {option:"delinrecvmail",ids:ids};
        $.post(this.handleurl, params, function (d) {
            if (d.status == "1") {
                sysmsg("邮件已移到回收箱");
                MAIL.Receive.refresh(pager.pno);
            }
            closeModal();
        })
    },
    /**
    * 删除外部邮件
    * @method delInRecvMail
    */
    delOutRecvMail: function (ids) {
        var params = { option: "deloutrecvmail", ids: ids };
        $.post(this.handleurl, params, function (d) {
            if (d.status == "1") {
                sysmsg("邮件已移到回收箱");
                MAIL.Receive.refresh(pager.pno);
                MAIL.Receive.getOutMailList(pager.pno);
            }
            closeModal();
        })
    },
     /**
     * 置顶内部邮件
     * @method setTop
     */
    setTop: function (ids,type,types) {
        var params = {  option: "settop", ids: ids ,type:type,types:types};
        $.post(this.handleurl, params, function (d) {
            if (d.status == "1") {
                MAIL.Receive.refresh(pager.pno);
                MAIL.Receive.getOutMailList(pager.pno);
                if (type == "1") {
                    sysmsg("邮件已置顶");
                }
                else {
                    sysmsg("邮件已取消置顶");
                }

            }
        })
    },
    /**
    * 已读内部邮件
    * @method setTop
    */
    setRead: function (ids,type,types) {
        var params = {  option: "setread", ids: ids ,type:type,types:types};
        $.post(this.handleurl, params, function (d) {
            if (d.status == "1") {
                MAIL.Receive.refresh(pager.pno);
                MAIL.Receive.getOutMailList(pager.pno);
            }
        })
    },

    /*
     * 设置星标标记
     * type: 0-取消;1-标记
     * flags: send-发送;recv-接收;
     * modes: 1-内部;2-外部
     */
    setStar: function (ids, type, flags, modes) {
        var params = { option: "setstar", ids: ids, type: type, flags: flags, modes: modes };
        $.post(this.handleurl, params, function (d) {
            if (d.status == "1") {
                MAIL.Receive.refresh(pager.pno);
                //MAIL.Receive.getOutMailList(pager.pno);
            }
        })
    },
    /*
     * 获取星标邮件
     */
    getStarMail: function (index) {

        if (index != undefined) {
            params = { option: "getstarmail", pagesize: this.pagesize, pageindex: index }
        }
        else {
            params = { option: "getstarmail", pagesize: this.pagesize }
        }
        $.post(this.handleurl, params, function (d) {
            layer.closeAll();
            if (d.status == "1") {
                var data = d.data;
                var mailrows = "";
                mailrows += MAIL.Receive.setDataList(data, "3");//获取星标邮件列表
                $(".mail-rows").html("");
                $(".mail-rows").html(mailrows);
                $("#mailsrecv-page").show();
                var totalrows = d.totalrows;//总记录数
                var pages = d.pages;//页数
                var curpage = d.curpage;//当前页
                /*分页*/
                pager.init({
                    pagerid: 'mailsrecv-page',
                    //页码
                    pno: curpage,
                    //总页码
                    total: pages,
                    //总数据条数
                    totalRecords: totalrows
                });
                pager.generPageHtml();
            }
            else {
                $(".mail-rows").html('<div style="text-align:center;height:50px;line-height:50px;"> <span>暂无星标邮件！</span></div>');
                $("#mailsrecv-page").hide();
            }
        })
    },
 
    /**
    * 移动邮件
    * @method setTop
    */
    moveFolder: function (ids,types,flags,folderid) {
        var params = {  option: "movefolder", ids:ids,folderid: folderid,types:types ,flags:flags};
        $.post(this.handleurl, params, function (d) {
            if (d.status == "1") {
                MAIL.Receive.refresh(pager.pno);
                sysmsg("邮件已转移");
                
                var curNav = getCurNavID();
                var curele;
                switch (curNav) {
                    case "mailOutRecv"://外部接收
                        MAIL.Receive.getOutMailList(pager.pno);
                        break;
                    case "mailInSend"://内部发送
                        MAIL.Send.getMailList(pager.pno);
                        break;
                    case "mailOutSend"://外部发送
                        MAIL.Send.getMailOutList(pager.pno);
                        break;
                    case "mailInRecv"://内部收件
                        break;
                    default://邮件夹
                        break;
                }
            }
        })
    },
    /**
   * 移动邮件 外部邮件
  * @method setTop
  */
    moveFolderOut: function (ids, folderid) {
        var params = { option: "movefolderout", ids: ids, folderid: folderid };
        $.post(this.handleurl, params, function (d) {
            if (d.status == "1") {
                sysmsg("邮件已转移");
            }
        })
    },
    /**
     * 获取内部邮件内容
     **/
    getInMailContent: function (id, mailid, isread) {
        var params = { option: "inmailcontent", id: id, mailid: mailid, isread: isread };
        $.post(this.handleurl, params, function (d) {
            $(".recvinfo-txt").html(d);
            MAIL.Receive.getMailNum();
        }, "html");
    },
    /**
    * 获取内部邮件详情
    **/
    getInMailInfo: function (id, mailid) {
        var params = { option: "inmailinfo", id: id, mailid: mailid };
        $.post(this.handleurl, params, function (d) {
            showCont($(".mail-recvinfo"));
            if (d.status == "1") {
                var sendercode = d.sendercode;//发送人
                var sendiscontact = d.sendiscontact == "" ? false : true;//发送人是否是联系人
                var sendername = d.sendername;
                var recvtime = d.recvtime;//接收时间
                var date = new Date(recvtime.replace(/\-/g, '/'));
                recvtime = date.format("yyyy-MM-dd hh:mm:ss");
                $(".recvinfo-date").text(recvtime);
                var recvers = d.recvers; //接收人
                var copyers = d.copyers; //抄送人
                var files = d.files; //附件

                //发送人
                if (sendercode != null) {
                    var sender = " <div class='recvinfo-addr-item' data-type='1' data-code='" + sendercode + "' data-address='' data-name='" + sendername + "' >\
                                            <div class='addr-item-cont'>" + sendername + "</div>";
                    if (!sendiscontact)
                    {
                        sender+="<div title='添加此联系人' onclick='addAddresser($(this))' class='addr-item-option'>+</div></div>";
                    }
                    $(".recvinfo-sender-addrs").html(sender);
                }
                //接收人
                if (recvers != null) {
                    var recveraddrs = "";
                    if (recvers.length > 0) {
                        for (var i = 0; i < recvers.length; i++) {
                            var name = recvers[i].username;
                            var code = recvers[i].usercode;
                            var address = recvers[i].emailaccount;
                            var iscontact = recvers[i].iscontact == "" ? false : true;
                            var address = recvers[i].emailaccount;
                            var type = recvers[i].mode;
                            if (type == undefined || type == "" || type == null) {
                                type = "1";
                            }
                            var classnames = "recvinfo-addr-item";
                            if (i > 9) {
                                //多于10个联系人就隐藏
                                classnames = "recvinfo-addr-item addr-item-display";
                            }
                            var recver = " <div class='" + classnames + "' data-type='"+type+"' data-code='" + code + "' data-address='" + address + "' data-name='" + name + "' >\
                                            <div class='addr-item-cont'>" + name + "</div>";
                            if(!iscontact)
                            {
                                recver+="<div title='添加此联系人' onclick='addAddresser($(this))' class='addr-item-option'>+</div>";
                            }
                            recver+="</div> ";
                            recveraddrs += recver;
                        }
                        if (recvers.length > 10) {
                            recveraddrs += " <div class='recvinfo-addr-display' onmouseover='addrDisplayOver($(this))'  onmouseout='addrDisplayOut($(this))' onclick='addrDisplayClick($(this))'\
                                             data-type='0'>显示所有</div>";
                        }
                        $(".recvinfo-recver-addrs").html(recveraddrs);
                    }
                }
                //抄送人
                if (copyers != null) {
                    var copyeraddrs = "";
                    if (copyers.length > 0) {
                        $(".recvinfo-row-copyer").show();
                        for (var i = 0; i < copyers.length; i++) {
                            var name = copyers[i].username;
                            var code = copyers[i].usercode;
                            var iscontact = copyers[i].iscontact == "" ? false : true;
                            var address = copyers[i].emailaccount;
                            var type = copyers[i].mode;
                            if (type == undefined || type == "" || type == null) {
                                type = "1";
                            }
                            var classnames = "recvinfo-addr-item";
                            if (i > 9) {
                                //多于10个联系人就隐藏
                                classnames = "recvinfo-addr-item addr-item-display";
                            }
                            var copyer = " <div class='" + classnames + "' data-type='" + type + "' data-code='" + code + "' data-address='" + address + "'  data-name='" + name + "' >\
                                            <div class='addr-item-cont'>" + name + "</div>";
                            if(!iscontact)
                            {
                                copyer += "<div title='添加此联系人' onclick='addAddresser($(this))' class='addr-item-option'>+</div>";
                            }
                            copyer += "</div>";
                            copyeraddrs += copyer;
                        }
                        if (copyers.length > 10) {
                            copyeraddrs += " <div class='recvinfo-addr-display' onmouseover='addrDisplayOver($(this))'  onmouseout='addrDisplayOut($(this))' onclick='addrDisplayClick($(this))'\
                                             data-type='0'>显示所有</div>";
                        }
                        $(".recvinfo-copyer-addrs").html(copyeraddrs);
                    } else {
                        $(".recvinfo-row-copyer").hide();
                    }
                }
                else {
                    $(".recvinfo-row-copyer").hide();
                }

                //附件
                if (files != null) {
                    var fileslist = "";
                    if (files.length > 0) {
                        fileslist += "<div class='attachment-nums'>(" + files.length + "个)</div>";
                        $(".recvinfo-row-files").show();
                        for (var i = 0; i < files.length; i++) {
                            var name = files[i].name;
                            var realname = files[i].realname;
                            var type = files[i].type;
                            var path = files[i].path;
                            //var no = i + 1;
                            var file = "<div class='recvinfo-file-item' title='点击下载文件' data-type='" + type + "' data-name='" + name + "' data-realname='" + realname + "' \
                            data-path='"+ path + "' onmouseover='recvfileOver($(this))'  onmouseout='recvfileOut($(this))' onclick='recvfileClick($(this))' > "+ realname + "</div>";
                            fileslist += file;
                        }
                        if (files.length > 1) {
                            fileslist += " <div class='recvinfo-addr-display' onmouseover='addrDisplayOver($(this))'  onmouseout='addrDisplayOut($(this))' onclick='addrDownClick($(this))'\
                                             data-type='0'>全部下载</div>";
                        }
                        $(".recvinfo-files").html(fileslist);
                    } else {
                        $(".recvinfo-row-files").hide();
                    }
                }
                else {
                    $(".recvinfo-row-files").hide();
                }
            }
            else {

            }
        }, "json");
    },

    /*
     * 下载附件文件
     */
    downFile: function (name, realname, type,path)
    {
        //方法一 无刷新
        var files = "<iframe src='../../FrmDownFile.aspx?strName=" + name + "&FileOraName=" + realname + "&FileType=" + type + "&FilePath="+path+"' style='display:none'></iframe>";
        $("#ifrfiles").append(files);
        //方法二
        // window.open("../FrmDownFile.aspx?strName=" + name + "&FileOraName=" + realname + "&FileType=" + type);

    },
    /*
     * 下载全部文件
     */
    downAllFile: function (mailid, title,type) {
        var files = "<iframe src='" + getDwUrl() + "EmailCenter/Controller.ashx?action=receive&option=downfile&mailid=" + mailid + "&title=" + title + "&type=" + type + "' style='display:none'></iframe>";
        $("#ifrfiles").append(files);
    },
    /*
     * 获取回收箱邮件
     */
    getRecoverMail:function(index,type){
        var params;
        type = type != undefined ? type : "3";
        if (index != undefined) {
            params = {  option: "recovermail", pagesize: this.pagesize, pageindex: index ,type:type}
        }
        else {
            params = { option: "recovermail", pagesize: this.pagesize ,type:type}
        }
        $.ajax(
         {
             type: "GET",
             url: this.handleurl,
             data:params,
             dataType: "json",
             success: function (d) {
                 if (d.status == "1") {
                     var data = d.data;
                     var mailrows = "";
                     mailrows = MAIL.Receive.setDataList(data, "3");
                     $(".recover-rows").html("");
                     $(".recover-rows").html(mailrows);
                     $("#mailsrecover-page").show();
                     if (index==undefined) {
                         var totalrows = d.totalrows;//总记录数
                         var pages = d.pages;//页数
                         var curpage = d.curpage;//当前页
                         /*分页*/
                         pager.init({
                             pagerid: 'mailsrecover-page',
                             //页码
                             pno: curpage,
                             //总页码
                             total: pages,
                             //总数据条数
                             totalRecords: totalrows
                         });
                         pager.generPageHtml();
                     }
                 }
                 else {
                     $(".recover-rows").html('<div style="text-align:center;height:50px;line-height:50px;"> <span>暂无邮件！</span></div>');
                     $("#mailsrecover-page").hide();
                 }
             },
             error: function (xhr, textStatus, errorThrown) {
                 console.log(textStatus + " " + xhr.status + " " + xhr.readyState);
             }
         });
    },

    /*
     * 还原邮件
     */
    restoreMail: function (ids, flags,modes)
    {
        var params = { option: "restoremail", ids: ids, flags: flags,modes:modes };
        $.post(this.handleurl, params, function (d) {
            if (d.status == "1") {
                MAIL.Receive.getRecoverMail();
                sysmsg("邮件已还原");
                MAIL.Receive.getMailNum();
            }
        })
    },
    /*
     * 删除邮件
     */
    deleteMail: function (ids, flags,modes)
    {
        var params = { option: "deletemail", ids: ids, flags: flags, modes: modes };
        layer.load("正在删除...");
        $.post(this.handleurl, params, function (d) {
            if (d.status == "1") {
                MAIL.Receive.getRecoverMail();
                sysmsg("邮件已删除",2);
                MAIL.Receive.getMailNum();
            }
        })
    },

    /*
     * 搜索邮件
     */
    searchMail: function (word,index) {
        var params;
        if (index != undefined) {
            params = { option: "searchmail", word:word, pagesize: this.pagesize, pageindex: index }
        }
        else {
            params = { option: "searchmail", word: word, pagesize: this.pagesize }
        }
        $.post(this.handleurl, params, function (d) {
            if (d.status == "1") {
                var data = d.data;
                var mailrows = "";
                mailrows = MAIL.Receive.setDataList(data, "3");

                $("#searchNum").text(d.totalrows);
                $(".search-rows").html("");
                $(".search-rows").html(mailrows);
                $("#mailssearch-page").show();
                if (index == undefined) {
                    var totalrows = d.totalrows;//总记录数
                    var pages = d.pages;//页数
                    var curpage = d.curpage;//当前页
                    /*分页*/
                    pager.init({
                        pagerid: 'mailssearch-page',
                        //页码
                        pno: curpage,
                        //总页码
                        total: pages,
                        //总数据条数
                        totalRecords: totalrows
                    });
                    pager.generPageHtml();
                }
            }
            else {
                $("#searchNum").text("0");
                $(".search-rows").html('<div style="text-align:center;height:50px;line-height:50px;"> <span>没有搜到相关结果！</span></div>');
                $("#mailssearch-page").hide();
            }
        }, "json");
    },

    /*
     * 自动更新外部邮箱邮件
     */
    autoRefreshOutMail: function () {
        if ($("#isrecving").val() == "0") {
            $("#isrecving").val("1");
            var params = { option: "receiveoutemail" };
            $.ajax({
                type: "post",
                url: this.handleurl,
                data:params,
                datatype: "json",
                success: function (d) {
                    $("#isrecving").val("0");
                    if (d.status == "1") {
                        sysmsg("已刷新", 2);
                        if (getCurNavID() == "mailUnread") {
                            MAIL.Receive.getUnreadMail();
                        } else {
                            MAIL.Receive.getOutMailList();
                        }

                    }
                },
                error: function (request, status, err) {
                    $("#isrecving").val("0");
                }
            })
        }   
    },

    /*
     * 更新外部邮箱邮件
     */
    refreshOutMail: function () {
        var layerid= layer.load("保存成功!系统正在获取外部邮件,第一次可能需要几分钟,请稍候...");
        var params = { option: "receiveoutemail" };
        $.ajax({
            type: "post",
            url: this.handleurl,
            data:params,
            datatype: "json",
            success: function (d) {
                if (d.status == "1") {
                    layer.closeAll();
                    selectMenu($("#mailUnread"));//选择菜单
                    showCont($(".mail-recv"));//显示内容
                    //MAIL.Receive.getOutMailList();
                    MAIL.Receive.getUnreadMail();
                    sysmsg("已获取外部邮件");
                }
                else {
                    layer.alert(d.msg, 3);
                }
            },
            error: function (request, status, err)
            {
                if (status == "timeout") {
                    layer.alert("由于邮件数量较多,系统将在后台继续为你收取邮件!");
                    MAIL.Receive.getOutMailList();
                } else {
                    layer.alert("已获取外部邮件信息!");
                    MAIL.Receive.getOutMailList();
                }
            }
        })
    },
    /*
    * 获取外部邮箱邮件列表
    */
    getOutMailList: function (index) {
        var params;
        if (index != undefined) {
            params = { option: "getoutmaillist", pagesize: this.pagesize, pageindex: index }
        }
        else {
            params = { option: "getoutmaillist", pagesize: this.pagesize }
        }
        $.post(this.handleurl, params, function (d) {
            if (d.status == "1") {
                if (d.status == "1") {
                    var data = d.data;
                    var mailrows = "";
                    var mailrows = "";
                    mailrows = MAIL.Receive.setDataList(data, "1");//获取邮件列表
                    $(".recvout-rows").html("");
                    $(".recvout-rows").html(mailrows);
                    $("#mailsrecvout-page").show();
                    if (index == undefined) {
                        var totalrows = d.totalrows;//总记录数
                        var pages = d.pages;//页数
                        /*分页*/
                        pager.init({
                            pagerid: 'mailsrecvout-page',
                            //页码
                            pno: '1',
                            //总页码
                            total: pages,
                            //总数据条数
                            totalRecords: totalrows
                        });
                        pager.generPageHtml();
                    }
                    MAIL.Receive.getMailNum();
                }
                else {
                    $(".recvout-rows").html('<div style="text-align:center;height:50px;line-height:50px;"> <span>暂无邮件！</span></div>');
                    $("#mailsrecvout-page").hide();
                }
            } else {
                $(".recvout-rows").html('<div style="text-align:center;height:50px;line-height:50px;"> <span>暂无邮件！</span></div>');
                $("#mailsrecvout-page").hide();
            }
        })

    },

    /*
     * 获取单条外部邮箱信息
     */
    getOutMailByID:function(mid,id)
    {
        var index = layer.load("获取邮件详情");
        var params = { option: "receiveoutemailbyid", mid: mid ,id:id};
        $.post(this.handleurl, params, function (d) {
            if (d.status == "1") {
                layer.closeAll();
                showCont($(".mail-recvoutinfo"));
                MAIL.Receive.getOutMailInfo(mid,id);
                MAIL.Receive.getOutMailContent(mid,id);
            }
            else {
                //$(".recvout_flag").text(d.msg);
                layer.alert(d.msg);
            }
        })
    },
    /*
     * 获取外部邮件详情
     */
    getOutMailInfo: function (mid,id) {
        var params = { option: "getoutmailinfo", mid: mid,id:id};
        $.post(this.handleurl, params, function (d) {
            if (d.status == "1") {
                var sendercode = d.sendercode;//发送人
                var sendiscontact = d.sendiscontact == "" ? false : true;//发送人是否是联系人
                var sendername = d.sendername;
                var recvtime = d.recvtime;//接收时间
                var date = new Date(recvtime.replace(/\-/g, '/'));
                recvtime = date.format("yyyy-MM-dd hh:mm:ss");
                $(".recvoutinfo-date").text(recvtime);
                var recvers = d.recvers; //接收人
                var copyers = d.copyers; //抄送人
                var files = d.files; //附件

                //发送人
                if (sendercode != null) {
                    var sender = " <div title='" + sendercode + "' class='recvinfo-addr-item' data-type='2' data-code='" + sendercode + "' data-mail='" + sendercode + "' data-address='" + sendercode + "' data-name='" + sendername + "' >\
                                            <div class='addr-item-cont'>" + sendername + "</div>";
                    if (!sendiscontact) {
                        sender += "<div title='添加此联系人' onclick='addAddresser($(this))' class='addr-item-option'>+</div></div>";
                    }
                    $(".recvoutinfo-sender-addrs").html(sender);
                }
                //接收人
                if (recvers != null) {
                    var recveraddrs = "";
                    if (recvers.length > 0) {
                        for (var i = 0; i < recvers.length; i++) {
                            var name = recvers[i].addressname;
                            var code = recvers[i].address;
                            //var address = recvers[i].emailaccount;
                            var iscontact = recvers[i].iscontact == "" ? false : true;

                            var classnames = "recvinfo-addr-item";
                            if (i > 9) {
                                //多于10个联系人就隐藏
                                classnames = "recvinfo-addr-item addr-item-display";
                            }
                            var recver = " <div  title='" + code + "' class='" + classnames + "' data-type='2' data-code='" + code + "' data-address='" + code + "' data-name='" + name + "' >\
                                            <div class='addr-item-cont'>" + name + "</div>";
                            if (!iscontact) {
                                recver += "<div title='添加此联系人' onclick='addAddresser($(this))' class='addr-item-option'>+</div>";
                            }
                            recver += "</div> ";
                            recveraddrs += recver;
                        }
                        if (recvers.length > 10) {
                            recveraddrs += " <div class='recvinfo-addr-display' onmouseover='addrDisplayOver($(this))'  onmouseout='addrDisplayOut($(this))' onclick='addrDisplayClick($(this))'\
                                             data-type='0'>显示所有</div>";
                        }
                        $(".recvoutinfo-recver-addrs").html(recveraddrs);
                    }
                }
                //抄送人
                if (copyers != null) {
                    var copyeraddrs = "";
                    if (copyers.length > 0) {
                        $(".recvoutinfo-row-copyer").show();
                        for (var i = 0; i < copyers.length; i++) {
                            var name = copyers[i].addressname;
                            var code = copyers[i].address;
                            var iscontact = copyers[i].iscontact == "" ? false : true;
                            var classnames = "recvinfo-addr-item";
                            if (i > 9) {
                                //多于10个联系人就隐藏
                                classnames = "recvinfo-addr-item addr-item-display";
                            }
                            var copyer = " <div  title='" + code + "' class='" + classnames + "' data-type='2' data-code='" + code + "' data-address='" + code + "'   data-name='" + name + "' >\
                                            <div class='addr-item-cont'>" + name + "</div>";
                            if (!iscontact) {
                                copyer += "<div title='添加此联系人' onclick='addAddresser($(this))' class='addr-item-option'>+</div>";
                            }
                            copyer += "</div>";
                            copyeraddrs += copyer;
                        }
                        if (copyers.length > 10) {
                            copyeraddrs += " <div class='recvinfo-addr-display' onmouseover='addrDisplayOver($(this))'  onmouseout='addrDisplayOut($(this))' onclick='addrDisplayClick($(this))'\
                                             data-type='0'>显示所有</div>";
                        }
                        $(".recvoutinfo-copyer-addrs").html(copyeraddrs);
                    } else {
                        $(".recvoutinfo-row-copyer").hide();
                    }
                }
                else {
                    $(".recvoutinfo-row-copyer").hide();
                }

                //附件
                if (files != null) {
                    var fileslist = "";
                    if (files.length > 0) {
                        fileslist += "<div class='attachment-nums'>(" + files.length + "个)</div>";
                        $(".recvoutinfo-row-files").show();
                        for (var i = 0; i < files.length; i++) {
                            var name = files[i].name;
                            var realname = files[i].realname;
                            var type = files[i].type;
                            var path = files[i].path;
                            //var no = i + 1;
                            var file = "<div class='recvinfo-file-item' title='点击下载文件' data-type='" + type + "' data-name='" + name + "' data-realname='" + realname + "' \
                            data-path='"+ path + "' onmouseover='recvfileOver($(this))'  onmouseout='recvfileOut($(this))' onclick='recvfileClick($(this))' > "+ realname + "</div>";
                            fileslist += file;
                        }
                        if (files.length > 1) {
                            fileslist += " <div class='recvinfo-addr-display' onmouseover='addrDisplayOver($(this))'  onmouseout='addrDisplayOut($(this))' onclick='addrDownClick($(this))'\
                                             data-type='0'>全部下载</div>";
                        }
                        $(".recvoutinfo-files").html(fileslist);
                    } else {
                        $(".recvoutinfo-row-files").hide();
                    }
                }
                else {
                    $(".recvoutinfo-row-files").hide();
                }
            }
            else {

            }
        }, "json");

    },
    /*
     * 获取外部邮件内容
     */
    getOutMailContent: function (mid,id) {
        var params = { option: "getoutmailcontent", mid: mid,id:id};
        $.post(this.handleurl, params, function (d) {
            $(".recvoutinfo-txt").html(d);
            $(".recvoutinfo-txt").find("style").remove();
        });
    }

}

/*
 * 发送邮件
 */
MAIL.Send = {
    //页面显示行数
    pagesize: 15,
    //后台交互地址
    handleurl: getDwUrl() + "EmailCenter/Controller.ashx?action=send",

    /**
   * 刷新
   * @method refresh
   * type:0-草稿箱;1-已发送
   */
    refresh: function (type,mode) {
        MAIL.Receive.getMailNum();
        if (type == "0") {
            MAIL.Send.getDraftMailList(pager.pno);
        }
        else {
            if (mode == "in") {
                MAIL.Send.getMailList(pager.pno);
            }
            else {
                MAIL.Send.getMailOutList(pager.pno);
            }
         
        }
        //sysmsg("已刷新");
    },
    /*
     * 发送邮件或存草稿
    */
    sendMail: function (sendinfo, sendcontent,type) {
        var index;
        if (type == "0") {
            index = layer.load("正在保存邮件...");
        }
        else {
            index = layer.load("正在发送邮件...");
        }
        sendinfo = escape(sendinfo);
        sendcontent = escape(sendcontent);
        var params = { option: "sendmail", sendinfo: sendinfo, sendcontent: sendcontent }
        $.post(this.handleurl, params, function (d) {
            layer.close(index);
            if (type == "0") {
                if (d.status == "1") {
                    sysmsg("邮件已保存至草稿箱!", 2);
                    $("#draftMailID").val(d.mailid);
                } else {
                    sysmsg("邮件保存失败!",2);
                }
            }else {
                if (d.status == "1") {
                    if (d.instatus == "1" && d.outstatus == "1") {
                        sysmsg("邮件发送成功!", 2);
                    } else {
                        if (d.outstatus == "0"&&d.instatus=="1") {
                            layer.alert("外部邮件发送失败,原因可能是未绑定外部邮箱或网络异常!");
                        }
                        else if (d.outstatus == "0" && d.instatus == "0") {
                            sysmsg("邮件发送失败!", 2);
                        }
                    }
                    clearSendInfo();
                } else {
                    sysmsg("邮件发送失败!",2);
                }
            }
            MAIL.Receive.getMailNum();
        }, "json").error(function () {
            layer.close(index);
            layer.alert("邮件发送失败！登录已超时，请刷新页面重新操作！");
        });
    },
    /*
     * 获取内部已发送邮件列表
    */
    getMailList: function (index) {
        var params;
        if (index != undefined) {
            params = { option: "maillist", pagesize: this.pagesize, pageindex: index }
        }
        else {
            params = { option: "maillist", pagesize: this.pagesize }
        }
        $.ajax(
         {
             type: "GET",
             url: this.handleurl,
             data: params,
             dataType: "json",
             success: function (d) {
                 if (d.status == "1") {
                     var data = d.data;
                     var mailrows = "";
                     var mailrows = "";
                     mailrows = MAIL.Receive.setDataList(data, "2");//获取邮件列表
                     $(".mailsendin-rows").html("");
                     $(".mailsendin-rows").html(mailrows);
                     $("#mailssendin-page").show();
                     if (index == undefined) {
                         var totalrows = d.totalrows;//总记录数
                         var pages = d.pages;//页数
                         var curpage = d.curpage;//当前页
                         /*分页*/
                         pager.init({
                             pagerid: 'mailssendin-page',
                             //页码
                             pno: curpage,
                             //总页码
                             total: pages,
                             //总数据条数
                             totalRecords: totalrows
                         });
                         pager.generPageHtml();
                     }
                 }
                 else {
                     $(".mailsendin-rows").html('<div style="text-align:center;height:50px;line-height:50px;"> <span>暂无邮件！</span></div>');
                     $("#mailssendin-page").hide();
                 }
             },
             error: function (xhr, textStatus, errorThrown) {
                 console.log(textStatus + " " + xhr.status + " " + xhr.readyState);
             }
         });
    },
    /*
     * 获取外部已发送邮件列表
    */
    getMailOutList: function (index) {
        var params;
        if (index != undefined) {
            params = { option: "mailoutlist", pagesize: this.pagesize, pageindex: index }
        }
        else {
            params = { option: "mailoutlist", pagesize: this.pagesize }
        }
        $.ajax(
         {
             type: "GET",
             url: this.handleurl,
             data: params,
             dataType: "json",
             success: function (d) {
                 if (d.status == "1") {
                     var data = d.data;
                     var mailrows = "";
                     var mailrows = "";
                     mailrows = MAIL.Receive.setDataList(data, "2");//获取邮件列表
                     $(".mailsendin-rows").html("");
                     $(".mailsendin-rows").html(mailrows);
                     $("#mailssendin-page").show();
                     if (index == undefined) {
                         var totalrows = d.totalrows;//总记录数
                         var pages = d.pages;//页数
                         var curpage = d.curpage;//当前页
                         /*分页*/
                         pager.init({
                             pagerid: 'mailssendin-page',
                             //页码
                             pno: curpage,
                             //总页码
                             total: pages,
                             //总数据条数
                             totalRecords: totalrows
                         });
                         pager.generPageHtml();
                     }
                 }
                 else {
                     $(".mailsendin-rows").html('<div style="text-align:center;height:50px;line-height:50px;"> <span>暂无邮件！</span></div>');
                     $("#mailssendin-page").hide();
                 }
             },
             error: function (xhr, textStatus, errorThrown) {
                 console.log(textStatus + " " + xhr.status + " " + xhr.readyState);
             }
         });
    },
    /*
    * 获取草稿箱邮件列表
    */
    getDraftMailList: function (index) {
        var params;
        if (index != undefined) {
            params = { option: "draftmaillist", pagesize: this.pagesize, pageindex: index }
        }
        else {
            params = { option: "draftmaillist", pagesize: this.pagesize }
        }
        $.ajax(
         {
             type: "GET",
             url: this.handleurl,
             data: params,
             dataType: "json",
             success: function (d) {
                 if (d.status == "1") {
                     var data = d.data;
                     var mailrows = "";
                     mailrows = MAIL.Receive.setDataList(data, "2","draft");//获取邮件列表
                     $(".maildraft-rows").html("");
                     $(".maildraft-rows").html(mailrows);
                     $("#mailsdraft-page").show();
                     if (index == undefined) {
                         var totalrows = d.totalrows;//总记录数
                         var pages = d.pages;//页数
                         var curpage = d.curpage;//当前页
                         /*分页*/
                         pager.init({
                             pagerid: 'mailsdraft-page',
                             //页码
                             pno: curpage,
                             //总页码
                             total: pages,
                             //总数据条数
                             totalRecords: totalrows
                         });
                         pager.generPageHtml();
                     }
                 }
                 else {
                     $(".maildraft-rows").html('<div style="text-align:center;height:50px;line-height:50px;"> <span>暂无邮件！</span></div>');
                     $("#mailsdraft-page").hide();
                 }
             },
             error: function (xhr, textStatus, errorThrown) {
                 console.log(textStatus + " " + xhr.status + " " + xhr.readyState);
             }
         });
    },

    /*
     * 删除邮件
     * type:0-草稿箱;1-已发送
     */
    deleteMail: function (ids,type,mode) {
        var params = { option: "deletemail", ids: ids ,type:type};
        $.post(this.handleurl, params, function (d) {
            if (d.status == "1") {
                if (type != "0") {
                    sysmsg("邮件已移到回收箱");
                    MAIL.Send.refresh(type, mode);

                }
                else {
                    sysmsg("草稿已删除");
                    MAIL.Send.refresh("0");
                }
            }
            MAIL.Receive.getMailNum();
        })
    },
    /**
    * 移动邮件
    * @method setTop
    */
    moveFolder: function (ids, types,folderid) {
        var params = { option: "movefolder", ids: ids, types:types,folderid: folderid };
        $.post(this.handleurl, params, function (d) {
            if (d.status == "1") {
                sysmsg("邮件已转移");
            }
        })
    },

    /**
    * 获取内部邮件内容
    **/
    getInMailContent: function (id, mailid, isread) {
        var params = { option: "inmailcontent", id: id, mailid: mailid, isread: isread };
        $.post(MAIL.Receive.handleurl, params, function (d) {
            $(".sendinfo-txt").html(d);
            $(".sendinfo-txt").find("style").remove();
            $(".netease-attDown").remove();
        }, "html");
    },
    /**
    * 获取内部邮件详情
    **/
    getInMailInfo: function (id, mailid) {
        var params = { option: "inmailinfo", id: id, mailid: mailid };
        $.post(MAIL.Receive.handleurl, params, function (d) {
            if (d.status == "1") {
                var sendercode = d.sendercode;//发送人
                var sendername = d.sendername;
                var recvtime = d.recvtime;//接收时间
                var date = new Date(recvtime.replace(/\-/g, '/'));
                recvtime = date.format("yyyy-MM-dd hh:mm:ss");
                $(".sendinfo-date").text(recvtime);
                var recvers = d.recvers; //接收人
                var copyers = d.copyers; //抄送人
                var bccers = d.bccers;//密送人
                var files = d.files; //附件
                //发送人
                if (sendercode != null) {
                    var sender = " <div class='recvinfo-addr-item' data-type='1' data-code='" + sendercode + "' data-address='' data-name='" + sendername + "' >\
                                            <div class='addr-item-cont'>" + sendername + "</div>\
                                            </div>";
                    $(".sendinfo-sender-addrs").html(sender);
                }
                //接收人
                if (recvers != null) {
                    var recveraddrs = "";
                    if (recvers.length > 0) {
                        for (var i = 0; i < recvers.length; i++) {
                            var name = recvers[i].username;
                            var code = recvers[i].usercode;
                            var address = recvers[i].emailaccount;
                            var type = recvers[i].mode;
                            if (type == undefined || type == "" || type == null) {
                                type = "1";
                            }
                            var classnames = "recvinfo-addr-item";
                            if (i > 9) {
                                //多于10个联系人就隐藏
                                classnames = "recvinfo-addr-item addr-item-display";
                            }
                            var recver = " <div class='" + classnames + "' data-type='"+type+"' data-code='" + code + "' data-address='" + address + "' data-name='" + name + "' >\
                                            <div class='addr-item-cont'>" + name + "</div>\
                                           </div>";
                            recveraddrs += recver;
                        }
                        if (recvers.length > 10) {
                            recveraddrs += " <div class='recvinfo-addr-display' onmouseover='addrDisplayOver($(this))'  onmouseout='addrDisplayOut($(this))' onclick='addrDisplayClick($(this))'\
                                             data-type='0'>显示所有</div>";
                        }
                        $(".sendinfo-recver-addrs").html(recveraddrs);
                    }
                }
                //抄送人
                if (copyers != null) {
                    var copyeraddrs = "";
                    var bcceraddrs = "";
                    if (copyers.length > 0) {
                        $(".sendinfo-row-copyer").show();
                        for (var i = 0; i < copyers.length; i++) {
                            var name = copyers[i].username;
                            var code = copyers[i].usercode;
                            var address = copyers[i].emailaccount;
                            var type = copyers[i].mode;
                            if (type == undefined || type == "" || type == null) {
                                type = "1";
                            }
                            var classnames = "recvinfo-addr-item";
                            if (i > 9) {
                                //多于10个联系人就隐藏
                                classnames = "recvinfo-addr-item addr-item-display";
                            }
                            var copyer = " <div class='" + classnames + "' data-type='" + type + "' data-code='" + code + "' data-address='" + address + "'  data-name='" + name + "' >\
                                            <div class='addr-item-cont'>" + name + "</div>\
                                           </div>";
                            copyeraddrs += copyer;
                        }
                        if (copyers.length > 10) {
                            copyeraddrs += " <div class='recvinfo-addr-display' onmouseover='addrDisplayOver($(this))'  onmouseout='addrDisplayOut($(this))' onclick='addrDisplayClick($(this))'\
                                             data-type='0'>显示所有</div>";
                        }
                        $(".sendinfo-copyer-addrs").html(copyeraddrs);

                    } else {
                        $(".sendinfo-row-copyer").hide();
                    }
                }
                else {
                    $(".sendinfo-row-copyer").hide();
                }
                //密送人
                if (bccers != null) {
                    var beraddrs = "";
                    var bcceraddrs = "";
                    if (bccers.length > 0) {
                        $(".sendinfo-row-bccer").show();
                        for (var i = 0; i < bccers.length; i++) {
                            var name = bccers[i].username;
                            var code = bccers[i].usercode;
                            var address = bccers[i].emailaccount;
                            var type = bccers[i].mode;
                            if (type == undefined || type == "" || type == null) {
                                type = "1";
                            }
                            var classnames = "recvinfo-addr-item";
                            if (i > 9) {
                                //多于10个联系人就隐藏
                                classnames = "recvinfo-addr-item addr-item-display";
                            }
                            var bccer = " <div class='" + classnames + "' data-type='" + type + "' data-code='" + code + "' data-address='" + address + "'  data-name='" + name + "' >\
                                            <div class='addr-item-cont'>" + name + "</div>\
                                           </div>";
                            bcceraddrs += bccer;
                        }
                        if (bccers.length > 10) {
                            bcceraddrs += " <div class='recvinfo-addr-display' onmouseover='addrDisplayOver($(this))'  onmouseout='addrDisplayOut($(this))' onclick='addrDisplayClick($(this))'\
                                             data-type='0'>显示所有</div>";
                        }
                        $(".sendinfo-bccer-addrs").html(bcceraddrs);

                    } else {
                        $(".sendinfo-row-bccer").hide();
                    }
                }
                else {
                    $(".sendinfo-row-bccer").hide();
                }
                //附件
                if (files != null) {
                    var fileslist = "";
                    if (files.length > 0) {
                        fileslist += "<div class='attachment-nums'>(" + files.length + "个)</div>";
                        $(".sendinfo-row-files").show();
                        for (var i = 0; i < files.length; i++) {
                            var name = files[i].name;
                            var realname = files[i].realname;
                            var type = files[i].type;
                            var path = files[i].path;
                            var no = i + 1;
                            var file = "<div class='recvinfo-file-item' title='点击下载文件' data-type='" + type + "' data-name='" + name + "' data-realname='" + realname + "' \
                            data-path='"+ path + "' onmouseover='recvfileOver($(this))'  onmouseout='recvfileOut($(this))' onclick='recvfileClick($(this))' > " + realname + "</div>";
                            fileslist += file;
                        }
                        if (files.length > 1) {
                            fileslist += " <div class='recvinfo-addr-display' onmouseover='addrDisplayOver($(this))'  onmouseout='addrDisplayOut($(this))' onclick='addrDownClick($(this))'\
                                             data-type='0'>全部下载</div>";
                        }
                        $(".sendinfo-files").html(fileslist);
                    } else {
                        $(".sendinfo-row-files").hide();
                    }
                }
                else {
                    $(".sendinfo-row-files").hide();
                }
            }
            else {

            }
        }, "json");
    },
    /**
    * 获取可编辑的邮件内容
     **/
    getMailEditorContent: function (id, mailid, isread) {
        var params = { option: "inmailcontent", id: id, mailid: mailid, isread: isread };
        $.post(MAIL.Receive.handleurl, params, function (d) {
            UE.getEditor("editor").setContent(d);
            //防止邮件内容错乱 
            var style = "<style>.ueditor-emailcenter table { margin-bottom:0; border-collapse: separate;display: table;border-style:none;}.ueditor-emailcenter td,.ueditor-emailcenter th{padding:0;border:none;}</style>";
            $(".edui-editor-iframeholder iframe")[0].contentWindow.document.body.innerHTML = style  + "<div class='ueditor-emailcenter'>" + d + "</div>";

        }, "html");
    },
    /**
    * 获取可编辑的邮件详情
    **/
    getMailEditorInfo: function (id, mailid) {
        var params = { option: "inmailinfo", id: id, mailid: mailid };
        $.post(MAIL.Receive.handleurl, params, function (d) {
            if (d.status == "1") {
                var sendercode = d.sendercode;//发送人
                var sendername = d.sendername;
                var recvtime = d.recvtime;//接收时间
                var date = new Date(recvtime.replace(/\-/g, '/'));
                recvtime = date.format("yyyy-MM-dd hh:mm:ss");
                $(".sendinfo-date").text(recvtime);
                var recvers = d.recvers; //接收人
                var copyers = d.copyers; //抄送人
                var bccers = d.bccers;//密送人
                var files = d.files; //附件
                var issingle = d.issingle;//是否单独发送
                var title = unescape(d.title);//标题
                var isurgent = d.isurgent;//是否紧急
                var isreceipt = d.isreceipt;//是否已读回执
                var ismsgtip = d.ismsgtip;//是否短信提醒

                //主题
                $(".input-theme").val(title);
                //接收人
                if (recvers != null) {
                    if (recvers.length > 0) {
                        var html = MAIL.Send.setAddress(recvers);
                        if (issingle == "0") {
                            $(".input-send").find(".input-txt").before($(html));
                            MAIL.Send.clearAddress($(".input-send"));
                        }
                        else {
                            $(".input-groupsend").find(".input-txt").before($(html));
                            $(".toolr-groupsend").click();
                            MAIL.Send.clearAddress($(".input-groupsend"));
                        }
                    }
                }
                //抄送人
                if (copyers != null) {
                    if (copyers.length > 0) {
                        var html = MAIL.Send.setAddress(copyers);
                        $(".input-copysend").find(".input-txt").before($(html));
                        $(".toolr-copysend").click();
                        MAIL.Send.clearAddress($(".input-copysend"));
                    }
                }
                //密送人
                if (bccers != null) {
                    if (bccers.length > 0) {
                        if (bccers.length > 0) {
                            var html = MAIL.Send.setAddress(bccers);
                            $(".input-bccsend").find(".input-txt").before($(html));
                            $(".toolr-bccsend").click();
                            MAIL.Send.clearAddress($(".input-bccsend"));
                        }
                    }
                }
                //附件
                if (files != null) {
                    var fileslist = "";
                    if (files.length > 0) {
                        for (var i = 0; i < files.length; i++) {
                            var name = files[i].name;
                            var realname = files[i].realname;
                            var type = files[i].type;
                            var path = files[i].path;
                            var size = files[i].size;
                            var size_b = Math.round(size * 1024 * 1024);
                            var size_show = "";
                            if (size < 1) {
                                size_show = Math.round(size * 1024) + "KB";
                            }
                            else {
                                size_show = Math.round(size*100)/100 + "MB";
                            }
                            var id = "Draft_" + i;
                            var file = '<div class="uploadify-queue-item" id="' + id + '"  data-type="' + type + '" data-size="' + size_b + '" data-iscomplete="1" ';
                            file += 'data-realname="'+realname+'" data-newname="'+name+'">	<div title="删除" class="cancel">';
                            file += '<a  href="javascript:deleteAtta(\''+id+'\')">X</a> </div>';
                            file += '<span class="fileName">' + realname + '</span>(' + size_show + ')<span></span><span class="data"> - 上传成功</span>	';
                            file += ' <div class="uploadify-progress">';
                            file+=' <div class="uploadify-progress-bar" style="width: 100%;"><!--Progress Bar--></div>';
                            file += '  </div></div>';
                            fileslist += file;
                            swfuploadify = $("#uploadify").data('uploadify');
                            $("#uploadify").uploadify('settings', 'uploadLimit', swfuploadify.settings.uploadLimit - 1); //附件上传数量限制
                        }
                        $(".uploadify-queue").html(fileslist);
                    }
                }
                //是否紧急发送
                if (isurgent == "1") {
                    $("#option-urgent").prop("checked", true);
                }
                //是否已读回执
                if (isreceipt == "1") {
                    $("#option-receipt").prop("checked", true);
                }
                //是否紧急发送
                if (ismsgtip != "0") {
                    $("#option-msg").prop("checked", true);
                    $("#option-msgmain").removeAttr("disabled");
                    $("#option-msgall").removeAttr("disabled");
                    if (ismsgtip == "1") {
                        $("#option-msgmain").prop("checked", true);
                    }
                    else {
                        $("#option-msgall").prop("checked", true);
                    }
                   
                }

            }
            else {
            }
        }, "json");
    },

    /**
    * 获取外部已发送可编辑的邮件内容
    **/
     getOutSendMailEditorContent: function (id, mailid, isread) {
        var params = { option: "getoutsendmailcontent", id: id, mid: mailid, isread: isread };
        $.post(MAIL.Receive.handleurl, params, function (d) {

            //UE.getEditor("editor").setContent(d);
            //防止邮件内容错乱 
            var style = "<style>.ueditor-emailcenter table { margin-bottom:0; border-collapse: separate;display: table;border-style:none;}.ueditor-emailcenter td,.ueditor-emailcenter th{padding:0;border:none;}</style>";
            $(".edui-editor-iframeholder iframe")[0].contentWindow.document.body.innerHTML = style  + "<div class='ueditor-emailcenter'>" + d + "</div>";

        }, "html");
    },
    /**
    * 获取外部已发送可编辑的邮件详情
    **/
    getOutSendMailEditorInfo: function (id, mailid) {
        var params = { option: "getoutsendmailinfo", id: id, mid: mailid };
        $.post(MAIL.Receive.handleurl, params, function (d) {
            if (d.status == "1") {
                var sendercode = d.sendercode;//发送人
                var sendername = d.sendername;
                var recvtime = d.recvtime;//接收时间
                var date = new Date(recvtime.replace(/\-/g, '/'));
                recvtime = date.format("yyyy-MM-dd hh:mm:ss");
                $(".sendinfo-date").text(recvtime);
                var recvers = d.recvers; //接收人
                var copyers = d.copyers; //抄送人
                var bccers = d.bccers;//密送人
                var files = d.files; //附件
                var issingle = d.issingle;//是否单独发送
                var title = unescape(d.title);//标题
                var isurgent = d.isurgent;//是否紧急
                var isreceipt = d.isreceipt;//是否已读回执
                var ismsgtip = d.ismsgtip;//是否短信提醒

                //主题
                $(".input-theme").val(title);
                //接收人
                if (recvers != null) {
                    if (recvers.length > 0) {
                        var html = MAIL.Send.setAddress(recvers);
                        if (issingle == "0") {
                            $(".input-send").find(".input-txt").before($(html));
                            MAIL.Send.clearAddress($(".input-send"));
                        }
                        else {
                            $(".input-groupsend").find(".input-txt").before($(html));
                            $(".toolr-groupsend").click();
                            MAIL.Send.clearAddress($(".input-groupsend"));
                        }
                    }
                }
                //抄送人
                if (copyers != null) {
                    if (copyers.length > 0) {
                        var html = MAIL.Send.setAddress(copyers);
                        $(".input-copysend").find(".input-txt").before($(html));
                        $(".toolr-copysend").click();
                        MAIL.Send.clearAddress($(".input-copysend"));
                    }
                }
                //密送人
                if (bccers != null) {
                    if (bccers.length > 0) {
                        if (bccers.length > 0) {
                            var html = MAIL.Send.setAddress(bccers);
                            $(".input-bccsend").find(".input-txt").before($(html));
                            $(".toolr-bccsend").click();
                            MAIL.Send.clearAddress($(".input-bccsend"));
                        }
                    }
                }
                //附件
                if (files != null) {
                    var fileslist = "";
                    if (files.length > 0) {
                        for (var i = 0; i < files.length; i++) {
                            var name = files[i].name;
                            var realname = files[i].realname;
                            var type = files[i].type;
                            var path = files[i].path;
                            var size = files[i].size;
                            var size_b = Math.round(size * 1024 * 1024);
                            var size_show = "";
                            if (size < 1) {
                                size_show = Math.round(size * 1024) + "KB";
                            }
                            else {
                                size_show = Math.round(size * 100) / 100 + "MB";
                            }
                            var id = "Draft_" + i;
                            var file = '<div class="uploadify-queue-item" id="' + id + '"  data-type="' + type + '" data-size="' + size_b + '" data-iscomplete="1" ';
                            file += 'data-realname="' + realname + '" data-newname="' + name + '">	<div title="删除" class="cancel">';
                            file += '<a  href="javascript:deleteAtta(\'' + id + '\')">X</a> </div>';
                            file += '<span class="fileName">' + realname + '</span>(' + size_show + ')<span></span><span class="data"> - 上传成功</span>	';
                            file += ' <div class="uploadify-progress">';
                            file += ' <div class="uploadify-progress-bar" style="width: 100%;"><!--Progress Bar--></div>';
                            file += '  </div></div>';
                            fileslist += file;
                            swfuploadify = $("#uploadify").data('uploadify');
                            $("#uploadify").uploadify('settings', 'uploadLimit', swfuploadify.settings.uploadLimit - 1); //附件上传数量限制
                        }
                        $(".uploadify-queue").html(fileslist);
                    }
                }
                //是否紧急发送
                if (isurgent == "1") {
                    $("#option-urgent").prop("checked", true);
                }
                //是否已读回执
                if (isreceipt == "1") {
                    $("#option-receipt").prop("checked", true);
                }
                //是否紧急发送
                if (ismsgtip != "0") {
                    $("#option-msg").prop("checked", true);
                    $("#option-msgmain").removeAttr("disabled");
                    $("#option-msgall").removeAttr("disabled");
                    if (ismsgtip == "1") {
                        $("#option-msgmain").prop("checked", true);
                    }
                    else {
                        $("#option-msgall").prop("checked", true);
                    }

                }

            }
            else {
            }
        }, "json");
    },
    /*
     * 设置邮件地址 
     */
    setAddress: function (addrs,mailtype) {
        var addrshtml = "";
        for (var i = 0; i < addrs.length; i++) {
            var name, code, mail, mailname, type, addrtype,mode;
            if (mailtype == "2") {
                //外部邮件
                name = addrs[i].addressname;
                code = addrs[i].address;
                mail = addrs[i].address;
                mailname = addrs[i].addressname;
                mode ="2";//地址类型0-内部;1-内外;2-外部;
                addrtype == "";
                type = "2";
            }
            else {
                 name = addrs[i].username;
                 code = addrs[i].usercode;
                 mail = addrs[i].emailaccount;
                 mailname = addrs[i].emailrealname;
                 mode = addrs[i].mode;//地址类型0-内部;1-内外;2-外部;
                 addrtype = addrs[i].addrtype;
                 type = "0";
            }
            mode = mode == "" ? "0" : mode;
            var typehtml = "";

            if (addrtype == "in") { //内部地址
                if (mode == "1") {
                    //有外部地址人员的内部地址
                    typehtml += ' <div class="send-address-type">';
                    typehtml += '<div class="send-type-item send-type-in select" title="发送内部邮件" onclick="selSendType($(this))">内</div>';
                    typehtml += '<div class="send-type-item send-type-out " title="发送外部邮件" onclick="selSendType($(this))">外</div>';
                    typehtml += '</div>'
                    type = "1";
                } else if (mode == "2") {
                    //有外部地址人员的内、外部地址
                    typehtml += ' <div class="send-address-type">';
                    typehtml += '<div class="send-type-item send-type-in select" title="发送内部邮件" onclick="selSendType($(this))">内</div>';
                    typehtml += '<div class="send-type-item send-type-out select" title="发送外部邮件" onclick="selSendType($(this))">外</div>';
                    typehtml += '</div>'
                    type = "1";
                }
            }
            else if (addrtype == "out") { //外部地址
                if (mode == "1") {
                    //内部人员的外部地址
                    typehtml += ' <div class="send-address-type">';
                    typehtml += '<div class="send-type-item send-type-in " title="发送内部邮件" onclick="selSendType($(this))">内</div>';
                    typehtml += '<div class="send-type-item send-type-out select" title="发送外部邮件" onclick="selSendType($(this))">外</div>';
                    typehtml += '</div>'
                    type = "1";
                }
                else {
                    type = "2";
                }
            }

            addrshtml += ' <div class="send-address" onclick="insertaddr($(this))" \
                            data-id="" data-name="' + name + '" data-code="' + code + '" data-mail="' + mail + '" data-adrrtype="'+addrtype+'"\
                            data-mailname="' + mailname + '" data-type="' + type + '" title="' + mail + '"><div class="send-address-cont">' + name + '\
                            </div>'+ typehtml + '<div title="删除" class="send-address-del" onclick="delmailaddr($(this))">×</div></div>';
        }
        return addrshtml;
    },

    /*
     * 消除重复收件人信息
     */
    clearAddress: function ($ele) {
        $ele.find(".send-address").each(function () {
            var type = $(this).data("type");
            if (type == "1") {
                var mail = $(this).data("mail");
                var $addr = $ele.find(".send-address[data-mail='" + mail + "']");
                if ($addr.length > 1) {
                    $ele.find(".send-address[data-mail='" + mail + "'][data-adrrtype='out']").remove();
                }
            }
        })
    },
    /*
     * 回复邮件 回复全部或转发邮件
     * type:1-回复;2-回复所有;3-转发
     */
    replyMailInfo:function(id,mailid,type){
        var params = { option: "inmailinfo", id: id, mailid: mailid };
        $.post(MAIL.Receive.handleurl, params, function (d) {
            if (d.status == "1") {
                var sendercode = d.sendercode;//发送人
                var sendername = d.sendername;
                var recvtime = d.recvtime;//接收时间
                var date = new Date(recvtime.replace(/\-/g, '/'));
                recvtime = date.format("yyyy-MM-dd hh:mm:ss");
                $(".sendinfo-date").text(recvtime);
                var recvers = d.recvers; //接收人
                var copyers = d.copyers; //抄送人
                var title = unescape(d.title);//标题
                //主题
                $(".input-theme").val(title);
                switch (type)
                {
                    case "1"://回复
                        //主题
                        $(".input-theme").val("回复："+title);
                        // 发送人
                        var pars = { option: "useraddress", code: sendercode };
                        $.post(MAIL.Send.handleurl, pars, function (d) {
                            var senders = d.data;
                            var html = MAIL.Send.setAddress(senders);
                            $(".input-send").find(".input-txt").before($(html));
                        }, "json");
                        //邮件正文
                        var paramsss = { option: "inmailcontent", id: id, mailid: mailid, isread: "1" };
                        $.post(MAIL.Receive.handleurl, paramsss, function (d) {
                            var header = "<p><br /><br /><br />"
                            header += "在" + recvtime + ", " + sendername + "写道：<br/>";
                            header += "<br/><br/></p>";
                            // UE.getEditor("editor").setContent(header + d);
                            //防止邮件内容错乱 
                            var style = "<style>.ueditor-emailcenter table { margin-bottom:0; border-collapse: separate;display: table;border-style:none;}.ueditor-emailcenter td,.ueditor-emailcenter th{padding:0;border:none;}</style>";
                            $(".edui-editor-iframeholder iframe")[0].contentWindow.document.body.innerHTML = style + header + "<div class='ueditor-emailcenter'>" + d + "</div>";
                        }, "html");
                        break;
                    case "2"://回复全部
                        //主题
                        $(".input-theme").val("回复：" + title);
                        //发送人
                        var par = { option: "useraddress", code: sendercode };
                        $.post(MAIL.Send.handleurl, par, function (d) {
                            var senders = d.data;
                            var html = MAIL.Send.setAddress(senders);
                            $(".input-send").find(".input-txt").before($(html));
                        }, "json");
                        //接收人
                        if (recvers != null) {
                            if (recvers.length > 0) {
                                var html = MAIL.Send.setAddress(recvers);
                                $(".input-send").find(".input-txt").before($(html));
                            }
                        }
                        //抄送人
                        if (copyers != null) {
                            if (copyers.length > 0) {
                                var html = MAIL.Send.setAddress(copyers);
                                $(".input-copysend").find(".input-txt").before($(html));
                                $(".toolr-copysend").click();
                            }
                        }
                        //邮件正文
                        var paramss = { option: "inmailcontent", id: id, mailid: mailid, isread: "1" };
                        $.post(MAIL.Receive.handleurl, paramss, function (d) {
                            var header = "<p><br /><br /><br />"
                            header += "在"+recvtime+", "+ sendername + "写道：<br/>";
                            header += "<br/><br/></p>";
                            //UE.getEditor("editor").setContent(header + d);
                            //防止邮件内容错乱 
                            var style = "<style>.ueditor-emailcenter table { margin-bottom:0; border-collapse: separate;display: table;border-style:none;}.ueditor-emailcenter td,.ueditor-emailcenter th{padding:0;border:none;}</style>";
                            $(".edui-editor-iframeholder iframe")[0].contentWindow.document.body.innerHTML = style + header + "<div class='ueditor-emailcenter'>" + d + "</div>";
                        }, "html");
                        break;
                    case "3"://转发
                        //主题
                        $(".input-theme").val("转发：" + title);
                        //邮件正文
                        var paramss = { option: "inmailcontent", id: id, mailid: mailid, isread: "1" };
                        $.post(MAIL.Receive.handleurl, paramss, function (d) {
                            var recvnames = "";
                            for (var i = 0; i < recvers.length; i++) {
                                recvnames += recvers[i].username + ",";
                            }
                            if (recvnames.length > 0) {
                                recvnames = recvnames.substring(0, recvnames.length - 1);
                            } 
                            var copynames = "";
                            for (var i = 0; i < copyers.length; i++) {
                                copynames += copyers[i].username + ",";
                            }
                            if (copynames.length > 0) {
                                copynames = copynames.substring(0, copynames.length - 1);
                            }

                            var header = "<p><br /><br />"
                            header += "------------转发邮件----------<br/>";
                            header += "发件人：" + sendername + "<br/>";
                            header += "收件人：" + recvnames + "<br/>";
                            if (copynames.length > 0) {
                                header += "抄送人：" + copynames + "<br/>";
                            }
                            header += "发送日期："+recvtime+"<br/>";
                            header += "主题：" + title + "<br/>";
                            header += "<br/><br/></p>";

                            // UE.getEditor("editor").setContent(header + d);
                            //防止邮件内容错乱 
                            var style = "<style>.ueditor-emailcenter table { margin-bottom:0; border-collapse: separate;display: table;border-style:none;}.ueditor-emailcenter td,.ueditor-emailcenter th{padding:0;border:none;}</style>";
                            $(".edui-editor-iframeholder iframe")[0].contentWindow.document.body.innerHTML = style + header + "<div class='ueditor-emailcenter'>" + d + "</div>";

                        }, "html");
                        //邮件附件
                        $.post(MAIL.Receive.handleurl, { mailid: mailid, option: "getattachments" }, function (d) {
                            if (d.status == "1") {
                                var files = d.files;
                                //附件
                                if (files != null) {
                                    var fileslist = "";
                                    if (files.length > 0) {
                                        for (var i = 0; i < files.length; i++) {
                                            var name = files[i].name;
                                            var realname = files[i].realname;
                                            var type = files[i].type;
                                            var path = files[i].path;
                                            var size = files[i].size;
                                            var size_b = Math.round(size * 1024 * 1024);
                                            var size_show = "";
                                            if (size < 1) {
                                                size_show = Math.round(size * 1024) + "KB";
                                            }
                                            else {
                                                size_show = Math.round(size * 100) / 100 + "MB";
                                            }
                                            var id = "Draft_" + i;
                                            var file = '<div class="uploadify-queue-item" id="' + id + '"  data-type="' + type + '" data-size="' + size_b + '" data-iscomplete="1" ';
                                            file += 'data-realname="' + realname + '" data-newname="' + name + '">	<div title="删除" class="cancel">';
                                            file += '<a  href="javascript:deleteAtta(\'' + id + '\')">X</a> </div>';
                                            file += '<span class="fileName">' + realname + '</span>(' + size_show + ')<span></span><span class="data"> - 上传成功</span>	';
                                            file += ' <div class="uploadify-progress">';
                                            file += ' <div class="uploadify-progress-bar" style="width: 100%;"><!--Progress Bar--></div>';
                                            file += '  </div></div>';
                                            fileslist += file;
                                            swfuploadify = $("#uploadify").data('uploadify');
                                            $("#uploadify").uploadify('settings', 'uploadLimit', swfuploadify.settings.uploadLimit - 1); //附件上传数量限制
                                        }
                                        $(".uploadify-queue").html(fileslist);
                                    }
                                }
                            }
                        })
                        break;
                    default:
                        break;
                }

            }
            else {
            }
        }, "json");
    },

    /*
     * 回复外部邮件 回复全部或转发邮件
     */
    replyMailOutInfo: function (id, mailid, type) {
        var params = { option: "getoutmailinfo",id:id, mid: mailid };
        $.post(MAIL.Receive.handleurl, params, function (d) {
            if (d.status == "1") {
                var sendercode = d.sendercode;//发送人
                var sendiscontact = d.sendiscontact == "" ? false : true;//发送人是否是联系人
                var sendername = d.sendername;
                var recvtime = d.recvtime;//接收时间
                var date = new Date(recvtime.replace(/\-/g, '/'));
                recvtime = date.format("yyyy-MM-dd hh:mm:ss");
                $(".recvinfo-date").text(recvtime);
                var recvers = d.recvers; //接收人
                var copyers = d.copyers; //抄送人
                var files = d.files; //附件
                var title = unescape(d.title);//标题
                var senders = [{  addressname: sendername, address: sendercode,  mode: "2" }];
                //主题
                $(".input-theme").val(title);
                switch (type) {
                    case "1"://回复
                        //主题
                        $(".input-theme").val("回复："+title);
                        // 发送人
                         var html = MAIL.Send.setAddress(senders,"2");
                        $(".input-send").find(".input-txt").before($(html));
                        //邮件正文
                        var paramsss = { option: "getoutmailcontent", id: id, mid: mailid, isread: "1" };
                        $.post(MAIL.Receive.handleurl, paramsss, function (d) {
                            var header = "<p><br /><br /><br />"
                            header += "在" + recvtime + ", " + sendername + "写道：<br/>";
                            header += "</p>";
                            //UE.getEditor("editor").setContent(header);

                            //防止邮件内容错乱 
                            var style = "<style>.ueditor-emailcenter table { margin-bottom:0; border-collapse: separate;display: table;border-style:none;}.ueditor-emailcenter td,.ueditor-emailcenter th{padding:0;border:none;}</style>";
                            $(".edui-editor-iframeholder iframe")[0].contentWindow.document.body.innerHTML = style + header + "<div class='ueditor-emailcenter'>" + d + "</div>";

                        }, "html");
                        break;
                    case "2"://回复全部
                        //主题
                        $(".input-theme").val("回复：" + title);
                        // 发送人
                        var html = MAIL.Send.setAddress(senders,"2");
                        $(".input-send").find(".input-txt").before($(html));
                        //接收人
                        if (recvers != null) {
                            if (recvers.length > 0) {
                                var html = MAIL.Send.setAddress(recvers,"2");
                                $(".input-send").find(".input-txt").before($(html));
                            }
                        }
                        //抄送人
                        if (copyers != null) {
                            if (copyers.length > 0) {
                                var html = MAIL.Send.setAddress(copyers, "2");
                                $(".input-copysend").find(".input-txt").before($(html));
                                $(".toolr-copysend").click();
                            }
                        }
                        //邮件正文
                        var paramss = { option: "getoutmailcontent", id: id, mid: mailid, isread: "1" };
                        $.post(MAIL.Receive.handleurl, paramss, function (d) {
                            var header = "<p><br /><br /><br />"
                            header += "在" + recvtime + ", " + sendername + "写道：<br/>";
                            header += "<br/><br/></p>";
                            //UE.getEditor("editor").setContent(header + d);
                            //防止邮件内容错乱 
                            var style = "<style>.ueditor-emailcenter table { margin-bottom:0; border-collapse: separate;display: table;border-style:none;}.ueditor-emailcenter td,.ueditor-emailcenter th{padding:0;border:none;}</style>";
                            $(".edui-editor-iframeholder iframe")[0].contentWindow.document.body.innerHTML = style + header + "<div class='ueditor-emailcenter'>" + d + "</div>";

                        }, "html");
                        break;
                    case "3"://转发
                        //主题
                        $(".input-theme").val("转发：" + title);
                        //邮件正文
                        var paramss = { option: "getoutmailcontent", id: id, mid: mailid, isread: "1" };
                        $.post(MAIL.Receive.handleurl, paramss, function (d) {
                            var recvnames = "";
                            for (var i = 0; i < recvers.length; i++) {
                                recvnames += recvers[i].username + ",";
                            }
                            if (recvnames.length > 0) {
                                recvnames = recvnames.substring(0, recvnames.length - 1);
                            }
                            var copynames = "";
                            for (var i = 0; i < copyers.length; i++) {
                                copynames += copyers[i].username + ",";
                            }
                            if (copynames.length > 0) {
                                copynames = copynames.substring(0, copynames.length - 1);
                            }

                            var header = "<p><br /><br />"
                            header += "------------转发邮件----------<br/>";
                            header += "发件人：" + sendername + "<br/>";
                            header += "收件人：" + recvnames + "<br/>";
                            if (copynames.length > 0) {
                                header += "抄送人：" + copynames + "<br/>";
                            }
                            header += "发送日期：" + recvtime + "<br/>";
                            header += "主题：" + title + "<br/>";
                            header += "<br/><br/></p>";

                            //UE.getEditor("editor").setContent(header + d);
                            //防止邮件内容错乱 
                            var style = "<style>.ueditor-emailcenter table { margin-bottom:0; border-collapse: separate;display: table;border-style:none;}.ueditor-emailcenter td,.ueditor-emailcenter th{padding:0;border:none;}</style>";
                            $(".edui-editor-iframeholder iframe")[0].contentWindow.document.body.innerHTML = style + header + "<div class='ueditor-emailcenter'>" + d + "</div>";

                        }, "html");
                        //邮件附件
                        $.post(MAIL.Receive.handleurl, { mailid: mailid, option: "getattachments" }, function (d) {
                            if (d.status == "1") {
                                var files = d.files;
                                //附件
                                if (files != null) {
                                    var fileslist = "";
                                    if (files.length > 0) {
                                        for (var i = 0; i < files.length; i++) {
                                            var name = files[i].name;
                                            var realname = files[i].realname;
                                            var type = files[i].type;
                                            var path = files[i].path;
                                            var size = files[i].size;
                                            var size_b = Math.round(size * 1024 * 1024);
                                            var size_show = "";
                                            if (size < 1) {
                                                size_show = Math.round(size * 1024) + "KB";
                                            }
                                            else {
                                                size_show = Math.round(size * 100) / 100 + "MB";
                                            }
                                            var id = "Draft_" + i;
                                            var file = '<div class="uploadify-queue-item" id="' + id + '"  data-type="' + type + '" data-size="' + size_b + '" data-iscomplete="1" ';
                                            file += 'data-realname="' + realname + '" data-newname="' + name + '">	<div title="删除" class="cancel">';
                                            file += '<a  href="javascript:deleteAtta(\'' + id + '\')">X</a> </div>';
                                            file += '<span class="fileName">' + realname + '</span>(' + size_show + ')<span></span><span class="data"> - 上传成功</span>	';
                                            file += ' <div class="uploadify-progress">';
                                            file += ' <div class="uploadify-progress-bar" style="width: 100%;"><!--Progress Bar--></div>';
                                            file += '  </div></div>';
                                            fileslist += file;
                                            swfuploadify = $("#uploadify").data('uploadify');
                                            $("#uploadify").uploadify('settings', 'uploadLimit', swfuploadify.settings.uploadLimit - 1); //附件上传数量限制
                                        }
                                        $(".uploadify-queue").html(fileslist);
                                    }
                                }
                            }
                        })
                        break;
                    default:
                        break;
                }

            }
            else {

            }
        }, "json");
    },

    /*
    * 获取外部已发送邮件信息
    */
    getOutSendMailByID: function (mid, id) {
        var index = layer.load("获取邮件详情");
        var params = { option: "getoutsendmailbyid", mid: mid, id: id };
        $.post(MAIL.Receive.handleurl, params, function (d) {
            if (d.status == "1") {
                layer.closeAll();
                showCont($(".mail-sendinfo"));
                MAIL.Send.getOutSendMailInfo(mid, id);
                MAIL.Send.getOutSendMailContent(mid, id);
            }
            else {
                //$(".recvout_flag").text(d.msg);
                layer.alert(d.msg);
            }
        })
    },
      /*
    * 获取外部已发送邮件详细信息
    */
     getOutSendMailInfo: function (mid, id) {
        var params = { option: "getoutsendmailinfo", mid: mid, id: id };
        $.post(MAIL.Receive.handleurl, params, function (d) {
            if (d.status == "1") {
                var sendercode = d.sendercode;//发送人
                var sendername = d.sendername;
                var recvtime = d.recvtime;//接收时间
                var date = new Date(recvtime.replace(/\-/g, '/'));
                recvtime = date.format("yyyy-MM-dd hh:mm:ss");
                $(".sendinfo-date").text(recvtime);
                var recvers = d.recvers; //接收人
                var copyers = d.copyers; //抄送人
                var bccers = d.bccers;//密送人
                var files = d.files; //附件
                //发送人
                if (sendercode != null) {
                    var sender = " <div class='recvinfo-addr-item' data-type='1' data-code='" + sendercode + "' data-address='' data-name='" + sendercode + "' >\
                                            <div class='addr-item-cont'>" + sendercode + "</div>\
                                            </div>";
                    $(".sendinfo-sender-addrs").html(sender);
                }
                //接收人
                if (recvers != null) {
                    var recveraddrs = "";
                    if (recvers.length > 0) {
                        for (var i = 0; i < recvers.length; i++) {
                            var name = recvers[i].username;
                            var code = recvers[i].usercode;
                            var address = recvers[i].emailaccount;
                            var type = recvers[i].mode;
                            if (type == undefined || type == "" || type == null) {
                                type = "1";
                            }
                            var classnames = "recvinfo-addr-item";
                            if (i > 9) {
                                //多于10个联系人就隐藏
                                classnames = "recvinfo-addr-item addr-item-display";
                            }
                            var recver = " <div class='" + classnames + "' data-type='" + type + "' data-code='" + code + "' data-address='" + address + "' data-name='" + name + "' >\
                                            <div class='addr-item-cont'>" + name + "</div>\
                                           </div>";
                            recveraddrs += recver;
                        }
                        if (recvers.length > 10) {
                            recveraddrs += " <div class='recvinfo-addr-display' onmouseover='addrDisplayOver($(this))'  onmouseout='addrDisplayOut($(this))' onclick='addrDisplayClick($(this))'\
                                             data-type='0'>显示所有</div>";
                        }
                        $(".sendinfo-recver-addrs").html(recveraddrs);
                    }
                }
                //抄送人
                if (copyers != null) {
                    var copyeraddrs = "";
                    var bcceraddrs = "";
                    if (copyers.length > 0) {
                        $(".sendinfo-row-copyer").show();
                        for (var i = 0; i < copyers.length; i++) {
                            var name = copyers[i].username;
                            var code = copyers[i].usercode;
                            var address = copyers[i].emailaccount;
                            var type = copyers[i].mode;
                            if (type == undefined || type == "" || type == null) {
                                type = "1";
                            }
                            var classnames = "recvinfo-addr-item";
                            if (i > 9) {
                                //多于10个联系人就隐藏
                                classnames = "recvinfo-addr-item addr-item-display";
                            }
                            var copyer = " <div class='" + classnames + "' data-type='" + type + "' data-code='" + code + "' data-address='" + address + "'  data-name='" + name + "' >\
                                            <div class='addr-item-cont'>" + name + "</div>\
                                           </div>";
                            copyeraddrs += copyer;
                        }
                        if (copyers.length > 10) {
                            copyeraddrs += " <div class='recvinfo-addr-display' onmouseover='addrDisplayOver($(this))'  onmouseout='addrDisplayOut($(this))' onclick='addrDisplayClick($(this))'\
                                             data-type='0'>显示所有</div>";
                        }
                        $(".sendinfo-copyer-addrs").html(copyeraddrs);

                    } else {
                        $(".sendinfo-row-copyer").hide();
                    }
                }
                else {
                    $(".sendinfo-row-copyer").hide();
                }
                //密送人
                if (bccers != null) {
                    var beraddrs = "";
                    var bcceraddrs = "";
                    if (bccers.length > 0) {
                        $(".sendinfo-row-bccer").show();
                        for (var i = 0; i < bccers.length; i++) {
                            var name = bccers[i].username;
                            var code = bccers[i].usercode;
                            var address = bccers[i].emailaccount;
                            var type = bccers[i].mode;
                            if (type == undefined || type == "" || type == null) {
                                type = "1";
                            }
                            var classnames = "recvinfo-addr-item";
                            if (i > 9) {
                                //多于10个联系人就隐藏
                                classnames = "recvinfo-addr-item addr-item-display";
                            }
                            var bccer = " <div class='" + classnames + "' data-type='" + type + "' data-code='" + code + "' data-address='" + address + "'  data-name='" + name + "' >\
                                            <div class='addr-item-cont'>" + name + "</div>\
                                           </div>";
                            bcceraddrs += bccer;
                        }
                        if (bccers.length > 10) {
                            bcceraddrs += " <div class='recvinfo-addr-display' onmouseover='addrDisplayOver($(this))'  onmouseout='addrDisplayOut($(this))' onclick='addrDisplayClick($(this))'\
                                             data-type='0'>显示所有</div>";
                        }
                        $(".sendinfo-bccer-addrs").html(bcceraddrs);

                    } else {
                        $(".sendinfo-row-bccer").hide();
                    }
                }
                else {
                    $(".sendinfo-row-bccer").hide();
                }
                //附件
                if (files != null) {
                    var fileslist = "";
                    if (files.length > 0) {
                        fileslist += "<div class='attachment-nums'>(" + files.length + "个)</div>";
                        $(".sendinfo-row-files").show();
                        for (var i = 0; i < files.length; i++) {
                            var name = files[i].name;
                            var realname = files[i].realname;
                            var type = files[i].type;
                            var path = files[i].path;
                            var no = i + 1;
                            var file = "<div class='recvinfo-file-item' title='点击下载文件' data-type='" + type + "' data-name='" + name + "' data-realname='" + realname + "' \
                            data-path='"+ path + "' onmouseover='recvfileOver($(this))'  onmouseout='recvfileOut($(this))' onclick='recvfileClick($(this))' > " + realname + "</div>";
                            fileslist += file;
                        }
                        if (files.length > 1) {
                            fileslist += " <div class='recvinfo-addr-display' onmouseover='addrDisplayOver($(this))'  onmouseout='addrDisplayOut($(this))' onclick='addrDownClick($(this))'\
                                             data-type='0'>全部下载</div>";
                        }
                        $(".sendinfo-files").html(fileslist);
                    } else {
                        $(".sendinfo-row-files").hide();
                    }
                }
                else {
                    $(".sendinfo-row-files").hide();
                }
            }
            else {

            }
        }, "json");

    },
    /*
     * 获取外部已发送邮件正文信息
     */
     getOutSendMailContent: function (mid, id) {
        var params = { option: "getoutsendmailcontent", mid: mid, id: id };
        $.post(MAIL.Receive.handleurl, params, function (d) {
            $(".sendinfo-txt").html(d);
            $(".sendinfo-txt").find("style").remove();
            $(".netease-attDown").remove();
        });
    }

}

/*
 * 通讯录
 */
MAIL.Address = {
    //页面显示行数
    pagesize: 15,
    //后台交互地址
    handleurl: getDwUrl() + "EmailCenter/Controller.ashx?action=address",
    
    refresh: function () {
        $(".mails-check").prop("checked", false);
        var groupid=$("#curlookGroupID").val() ;
        if (groupid== "0"||groupid=="") {
            MAIL.Address.getContact(pager.pno);
        }
        else {
            MAIL.Address.getContactByGroupID(groupid,pager.pno);
        }
    },
    /*
     * 获取匹配的联系人
     */
    getMatchAddrs: function ($ele) {
        var txt = $.trim($ele.val());
        var params = { option: "matchaddrs", txt: txt };
        if (txt != "" && txt != undefined) {
           /** 
		   $.post(this.handleurl, params, function (d) {
                if (d.status == "1") {
                    var datas = d.data;
                    if (datas.length > 0) {
                        var rows = "";
                        for (var i = 0; i < datas.length; i++) {
                            var usercode = datas[i].usercode;
                            var username = datas[i].username;
                            var deptname = datas[i].deptname;
                            var worker = datas[i].worker;
                            var mail = datas[i].mail;
                            var mailname = datas[i].mailname;
                            var type = datas[i].type;
                            var classnames = "match-row";
                            if (i == 0) {
                                classnames = "match-row active";
                            }
                            var row = "<li class='" + classnames + "' data-id='' data-usercode='"+usercode+"' \
                                  data-username='" + username + "' data-mail='" + mail + "' data-mailname='"+mailname+"' data-type='"+type+"' \
                                  onclick='matchRowClick($(this))' onmouseover='matchRowOver($(this))'> \
                                  <span class='match-item match-name'>"+ username + "</span> \
                                  <span class='match-item match-addr'>"+ deptname + "-" + worker + "</span> \
                                  </li>";
                            rows += row;
                        }
                        $ele.parent().next().find("ul").html(rows).end().show();
                    }
                }
                else {
                    $ele.parent().next().find("ul").html("").end().hide();
                }
            }, "json");
			**/
        }
        else {
            $ele.parent().next().find("ul").html("").end().hide();
        }
    },
    
    /*
     * 获取部门信息
     */
    getAllDeptInfo: function ()
    {
        var params={option:"alldeptinfo"};
		/**
        $.post(this.handleurl, params, function (d) {
            if (d.status == "1") {
                var data=d.data;
                if(data.length>0)
                {
                    for (var i = 0; i < data.length; i++)
                    {
                        var id = d.id;
                        var name = d.name;
                        var num = d.num;
                    }
                }
            }
            else {

            }
        },"json");
		**/
    },

    /*
     * 新增联系人
     */
    addContact: function (code,name,mail,mailtype,groupid) {
        var param = { option: "addcontact", code: code, name: name, mail: mail, mailtype: mailtype, groupid: groupid };
		/**
        $.post(this.handleurl, param, function (d) {
            if (d.status == "1") {
                layer.closeAll();
                sysmsg("添加成功");
                MAIL.Address.refresh();
                if (mailtype == "1") {
                    $(".recvinfo-addr-item[data-code='" + code + "']").find(".addr-item-option").remove();
                }
                else {
                    $(".recvinfo-addr-item[data-address='" + mail + "']").find(".addr-item-option").remove();
                }
            }
            else {
                sysmsg("添加失败");
            }
        });
		**/
    },
    /*
     * 修改联系人
    */
     updateContact: function (id,code, name, mail, mailtype, groupid) {
         var param = { option: "updatecontact", id: id, code: code, name: name, mail: mail, mailtype: mailtype, groupid: groupid };
		 /**
        $.post(this.handleurl, param, function (d) {
            if (d.status == "1") {
                layer.closeAll();
                sysmsg("已修改");
                MAIL.Address.refresh();
            }
            else {
                sysmsg("修改失败");
            }
        });
		**/
    },
    /*
    * 删除联系人
     */
     deleteContact: function (ids) {
         var param = { option: "deletecontact",ids:ids };
		 /**
        $.post(this.handleurl, param, function (d) {
            if (d.status == "1") {
                sysmsg("已删除");
                MAIL.Address.refresh();
            }
            else {
                sysmsg("删除失败");
            }
        });
		**/
     },

    /*
    * 获取联系人
    */
     getContact: function (index) {
         var params;
         if (index != undefined) {
             params = { option: "getcontact",  pagesize: this.pagesize, pageindex: index }
         }
         else {
             params = { option: "getcontact",  pagesize: this.pagesize }
         }
		 /**
         $.post(this.handleurl, params, function (d) {
             if (d.status == "1") {
                 var datas = d.data;
                 if (datas.length > 0)
                 {
                     var mailrows = "";
                     for (var i = 0; i < datas.length; i++)
                     {
                         var id = datas[i].id;
                         var code = datas[i].code;
                         var name = datas[i].name;
                         var mail = datas[i].mail;
                         var mailshow = mail == "" ? "&nbsp" : mail;
                         var mailtype = datas[i].mailtype;
                         var groupid = datas[i].groupid;
                         var groupname = datas[i].groupname;

                         var row = ' <div  class="mail-row addres-row" onclick="editorcontact($(this))" onmouseover="mailrowover($(this))" onmouseout="mailrowout($(this))" data-id="'+id+'" data-groupid="'+groupid+'" data-name="'+name+'" data-code="'+code+'" data-type="'+mailtype+'" data-mail="'+mail+'" > \
                                     <div class="row-first"> \
                                        <input type="checkbox" onclick="checkrow($(this))" class="mail-check" />   \
                                         <span>'+name+'</span> \
                                          </div> \
                                        <div class="row-midd"> \
                                             <div class="row-header-col">' + mailshow + '</div> \
                                             <div class="row-header-col">'+groupname+'</div> \
                                          </div>  \
                                          <div class="row-last"> \
                                          </div> \
                                       </div> ';
                         mailrows += row;
                     }
                     $(".contact-rows").html("");
                     $(".contact-rows").html(mailrows);
                     $("#contact-page").show();

                     if (index==undefined) {
                         var totalrows = d.totalrows;//总记录数
                         var pages = d.pages;//页数
                         var curpage = d.curpage;//当前页
                         /*分页*/
						 /**
                         pager.init({
                             pagerid: 'contact-page',
                             //页码
                             pno: curpage,
                             //总页码
                             total: pages,
                             //总数据条数
                             totalRecords: totalrows
                         });
                         pager.generPageHtml();
                     }
                 }
                 else {
                     $(".contact-rows").html('<div style="text-align:center;height:50px;line-height:50px;"> <span>暂无联系人！</span></div>');
                     $("#contact-page").hide();
                 }
             }
             else {
                 $(".contact-rows").html('<div style="text-align:center;height:50px;line-height:50px;"> <span>暂无联系人！</span></div>');
                 $("#contact-page").hide();
             }
         });
		 **/
     },

    /*
    * 移动联系组
    */
     moveContact: function (ids,groupid) {
         var param = { option: "movecontactgroup", ids: ids, groupid: groupid };
         $.post(this.handleurl, param, function (d) {
             if (d.status == "1") {
                 sysmsg("移动完成");
                 MAIL.Address.refresh();
             }
             else {
                 sysmsg("移动失败");
             }
         });
     },
      /*
      * 根据分组获取联系人
      */
     getContactByGroupID: function (groupid,index) {
         var params;
         if (index != undefined) {
             params = { option: "getcontactbygroupid", groupid:groupid, pagesize: this.pagesize, pageindex: index }
         }
         else {
             params = { option: "getcontactbygroupid", groupid:groupid, pagesize: this.pagesize }
         }
         $.post(this.handleurl, params, function (d) {
             if (d.status == "1") {
                 var datas = d.data;
                 if (datas.length > 0) {
                     var mailrows = "";
                     for (var i = 0; i < datas.length; i++) {
                         var id = datas[i].id;
                         var code = datas[i].code;
                         var name = datas[i].name;
                         var mail = datas[i].mail;
                         var mailshow = mail == "" ? "&nbsp" : mail;
                         var mailtype = datas[i].mailtyp;
                         var groupid = datas[i].groupid;
                         var groupname = datas[i].groupname;

                         var row = ' <div  class="mail-row addres-row" onclick="editorcontact($(this))" onmouseover="mailrowover($(this))" onmouseout="mailrowout($(this))" data-id="' + id + '" data-groupid="' + groupid + '" data-name="' + name + '" data-code="' + code + '" data-type="' + mailtype + '" data-mail="' + mail + '" > \
                                     <div class="row-first"> \
                                        <input type="checkbox" onclick="checkrow($(this))" class="mail-check" />   \
                                         <span>'+ name + '</span> \
                                          </div> \
                                        <div class="row-midd"> \
                                             <div class="row-header-col">' + mailshow + '</div> \
                                          <div class="row-header-col">'+ groupname + '</div> \
                                          </div>  \
                                          <div class="row-last"> \
                                          </div> \
                                       </div> ';
                         mailrows += row;
                     }
                     $(".contact-rows").html("");
                     $(".contact-rows").html(mailrows);
                     $("#contact-page").show();

                     if (index == undefined) {
                         var totalrows = d.totalrows;//总记录数
                         var pages = d.pages;//页数
                         var curpage = d.curpage;//当前页
                         /*分页*/
                         pager.init({
                             pagerid: 'contact-page',
                             //页码
                             pno: curpage,
                             //总页码
                             total: pages,
                             //总数据条数
                             totalRecords: totalrows
                         });
                         pager.generPageHtml();
                     }
                 }
                 else {
                     $(".contact-rows").html('<div style="text-align:center;height:50px;line-height:50px;"> <span>暂无联系人！</span></div>');
                     $("#contact-page").hide();
                 }
             }
             else {
                 $(".contact-rows").html('<div style="text-align:center;height:50px;line-height:50px;"> <span>暂无联系人！</span></div>');
                 $("#contact-page").hide();
             }
         });
     },
    /*
    * 新增联系组
    */
     addContactGroup: function (name) {
         var param = { option: "addcontactgroup", name: name };
         $.post(this.handleurl, param, function (d) {
             if (d.status == "1") {
                 layer.closeAll();
                 MAIL.Address.getContactGroup();
                 sysmsg("添加成功");
             }
             else {
                 sysmsg("添加失败");
             }
         });
     },
    /*
     * 修改联系组
    */
     updateContactGroup: function (id,  name) {
         var param = { option: "updatecontactgroup", id: id, name: name };
         $.post(this.handleurl, param, function (d) {
             if (d.status == "1") {
                 layer.closeAll();
                 sysmsg("已修改");
                 MAIL.Address.refresh();
                 MAIL.Address.getContactGroup();
             }
             else {
                 sysmsg("修改失败");
             }
         });
     },
    /*
    * 删除联系组
     */
     deleteContactGroup: function (id) {
         var param = { option: "deletecontactgroup", id: id };
         $.post(this.handleurl, param, function (d) {
             if (d.status == "1") {
                 sysmsg("已删除");
                 $("#curlookGroupID").val("0");
                 MAIL.Address.refresh();
                 MAIL.Address.getContactGroup();
                 $("#addres_editorgroup").hide();
                 $("#addres_delgroup").hide();
             }
             else {
                 sysmsg("删除失败");
             }
         });
     },

    /*
    * 获取联系组
    */
     getContactGroup: function () {
         params = { option: "getcontactgroup" }
         $.post(this.handleurl, params, function (d) {
             $("#curlookGroupID").val("0");
             if (d.status == "1") {
                 var datas = d.data;
                 var rows = "";
                 var selrows = '<option value="0"></option>';
                 if (datas.length > 0) {
                     var mailrows = "";
                     for (var i = 0; i < datas.length; i++) {
                         var id = datas[i].id;
                         var name = datas[i].name;

                         var row = ' <div data-id="' + id + '" data-name="' + name + '" onclick="contactgroupclick($(this))" onmouseover="contactgroupover($(this))" onmouseout="contactgroupout($(this))" class="tool-menu-item"><span>' + name + '</span></div> ';
                         rows += row;
                         var selrow = '<option value="' + id + '">' + name + '</option>';
                         selrows += selrow;
                     }
                     $("#addres_lookup").find(".tool-menu").html('<div class="arrow-up arrow-up-lookgroup"></div><div data-id="0" data-name="" onclick="contactgroupclick($(this))" onmouseover="contactgroupover($(this))" onmouseout="contactgroupout($(this))" class="tool-menu-item"><span>所有联系人</span></div>' + rows);
                     // $("#addres_move").find(".tool-menu").html('<div data-id="0" data-name="" onclick="contactgroupclick($(this))" onmouseover="contactgroupover($(this))" onmouseout="contactgroupout($(this))" class="tool-menu-item"><span>所有联系人</span></div><div class="arrow-up arrow-up-lookgroup"></div>' + rows);
                     $("#contactInfo").find("#contactgroups").html(selrows);
                 }
                 else {
                     $("#addres_lookup").find(".tool-menu").html('<div class="arrow-up arrow-up-lookgroup"></div><div data-id="0" data-name="" onclick="contactgroupclick($(this))" onmouseover="contactgroupover($(this))" onmouseout="contactgroupout($(this))" class="tool-menu-item"><span>所有联系人</span></div>');
                     $("#contactInfo").find("#contactgroups").html(selrows);
                 }
             }
             else {
                 $("#addres_lookup").find(".tool-menu").html('<div class="arrow-up arrow-up-lookgroup"></div><div data-id="0" data-name="" onclick="contactgroupclick($(this))" onmouseover="contactgroupover($(this))" onmouseout="contactgroupout($(this))" class="tool-menu-item"><span>所有联系人</span></div>');
                 $("#contactInfo").find("#contactgroups").html(selrows);
             }
         });
     },
     /*
      * 获取通讯联系组
      */
     getAddressGroup: function () {
         params = { option: "getaddressgroup" };
         $.post(this.handleurl, params, function (d) {
             if (d == "") {
                 $(".addresses-groups").find("ul").hide().end().find(".addr-icon").hide();
             }
             else {
                 $(".addresses-groups").find("ul").show().html(d).end().find(".addr-icon").show();
             }
         });
     },
     /*
      * 获取最近联系人
      */
     getRecentContact: function () {
         params = { option: "getrecentcontact" };
         $.post(this.handleurl, params, function (d) {
             if (d == "") {
                 $(".addresses-nearly").find("ul").hide().end().find(".addr-icon").hide();
             }
             else {
                 $(".addresses-nearly").find("ul").show().html(d).end().find(".addr-icon").show();
             }
         });
     }



}

Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day 
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds() //millisecond 
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}