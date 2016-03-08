/**
 * 新闻详细信息
 */
$.ajaxSetup({ cache: false });
$(function () {
    //初始化详细信息
    SfDetail.init();
    if ($("#PlatForm").val() == "android" || $("#PlatForm").val() == "ios") {
        $(" .sf-newsdetails-left, .sf-turning-right,.switchBox,#figure,.sf-newsdetails-figuress,#commentList").hide();
        $(".sf-newsdetails-middle").css({ "padding-bottom": "15px" });
    }
});
$(window).resize(function () {
   // resizeWidow();
});
var SfDetail = {
    config: {
        code: "",
        data: null//详情页数据对象
    },
    init: function () {
        this.config.code = $("#NewCode").val();
        this.initValue();//加载数据
        this.bindEvent();
    },
    /**
     * 绑定事件
     */
    bindEvent: function () {
        var _this = this;
        var code = $("#NewCode").val();
        $('.switch-header').on('click', '.switch-btn', function (e) {
            var $this = $(this);
            var $ower = $("#figure");
            $ower.find(".pages").removeClass("show");
            $ower.find($this.data("target")).addClass("show");
            $this.siblings().removeClass('active');
            $this.addClass('active');
        });
        $(".sf-newsnotice-like").on("click", function () {
            GetParise($(this),code);
        });
        $(".sf-newsdetails-left .return").on("click", function () {
            //关闭详情页面
            if ($("#ishome").val() != "1") {
                parent.$('#dlg1').SfDialog2("close");
            }
            else {
                window.location.href = getPath() + "SpManager/Index";
            }
        });
        _this.bindUpDownPage();
    },
    bindUpDownPage: function () {
        //绑定下一篇
        $(".sf-turning-right").on("click", function () {
            var code = $("#NewCode").val();
            GetUp(code, 1);
        });
        //绑定上一篇
        $(".sf-turning-left").on("click", function () {
            var code = $("#NewCode").val();
            GetUp(code, -1);
        });
    },
    /**
     * 初始化数据
     */
    initValue: function () {
        var _this = this;
        var code = $("#NewCode").val();
        $.ajax({
            type: "post",
            url: getPath() + "SpManager/GetNewModel",
            data: { code: code },
            dataType: "json",
            success: function (data) {
               //console.log(data);
                if (data != "undefiend") {
                    $(".sf-newsdetails-title").text(data.Title); //标题
                    $(".sf-newsnotice-source").text(data.NewType == 1 ? "公告" : "新闻");//类型
                    $(".sf-newsnotice-author").text(data.SourceFrom == "" ? "" : data.SourceFrom.substr(0, 8));
                    $(".sf-newsnotice-time").text(data.CreateTime);
                    $(".sf-newsnotice-read").text(data.BrowseNo);
                    $(".sf-newsnotice-comment").text(data.CommentNo);
                    $(".like-text").text(data.PriaseNo);
                    $("#content").html(data.ContentHtml);
                    if (data.IsComment == 1) {
                        $(".sf-newsnotice-comment").parent().show();
                        if ($("#editor").html() == "") {
                            _this.createComment();//创建
                        }
                        if ($("#PlatForm").val() == "") {
                            $(".sf-newsdetails-figuress").show();
                            $("#commentList").show();
                        }
                        //绑定发布评论事件
                        $("#subComment").on("click", function () {
                            var ue = UE.getEditor("editor");
                            var text = ue.getContent();
                            var txt = ue.getContentTxt();
                            _this.submitComment(code, text);
                        });
                    }
                    else {
                        $(".sf-newsnotice-comment").parent().hide();
                        //deleteUEditor();
                        $(".sf-newsdetails-figuress").hide();
                        $("#commentList").hide();
                    }
                    //已阅人
                    var ReadList = data.UserReadList;
                    var $reader = $("#reader");
                    $reader.html("");
                    if (ReadList && ReadList.length > 0) {
                        $("#UserReadList").text(ReadList.length);
                        var _html = '';
                        for (var i = 0; i < ReadList.length; i++) {
                            var img = ReadList[i].PhotoUrl == "" ? "images/new/icons/BBS_Image.png" : ReadList[i].PhotoUrl.substr(1, ReadList[i].PhotoUrl.length);
                            var src = getPath() + img;
                            var name = ReadList[i].UserName;
                            _html += ' <li>\
                                            <div class="sf-newsdetails-portrait">\
                                                <img src="' + src + '">\
                                                <label>' + name + '</label>\
                                            </div>\
                                            </li>';
                        }
                        $reader.append(_html);
                    }
                   
                    //未阅人
                    var UserUnList = data.UserUnReadList;
                    var $noreader = $("#noreader");
                    $noreader.html("");
                    if (UserUnList && UserUnList.length > 0) {
                        $("#UserUnReadCnt").text(UserUnList.length);
                            var _html = '';
                            for (var i = 0; i < UserUnList.length; i++) {
                                var img = UserUnList[i].PhotoUrl == "" ? "images/new/icons/BBS_Image.png" : UserUnList[i].PhotoUrl.substr(1, UserUnList[i].PhotoUrl.length);
                                var src = getPath() + img;
                                var name = UserUnList[i].UserName;
                                _html += ' <li>\
                                            <div class="sf-newsdetails-portrait">\
                                                <img src="' + src + '">\
                                                <label>' + name + '</label>\
                                            </div>\
                                            </li>';
                            }
                            $noreader.append(_html);
                        }
                  
                    //片头图片
                    var owlImg = data.SpHeadFile;
                    var $owlImg = $("#owl-new");
                    $owlImg.html("").hide();
                    if (owlImg && owlImg.length > 0) {
                        $owlImg.show();
                        var _html = '';
                        for (var i = 0; i < owlImg.length; i++) {
                            var src = getPath() + "CsFile/Download?id=" + owlImg[i].FileSystemId;
                            var name = owlImg[i].FileComment;
                            _html += '<div class="item">\
                        <img src="' + src + '" /><b></b><span>' + name + '</span>\
                    </div>';
                        }
                        $owlImg.append(_html);
                        _this.owlCarousel();
                    }
                    $(".newPlayer").hide();
                    //片头视频
                    var newVedio = data.SpHeadVideoFile;
                    if (newVedio && newVedio.length > 0) {
                        $(".newPlayer").show();
                        var vedioId = newVedio[0].FileSystemId;
                        _this.player(vedioId);
                    }
                    //附件下载
                    var SpFileList = data.SpFileList;
                    var $filelist = $("#filelist");
                    $filelist.html("");
                    if (SpFileList && SpFileList.length > 0) {
                        var _html = ' <span class="glyphicon glyphicon-paperclip"></span>&nbsp;附件：';
                        for (var i = 0; i < SpFileList.length; i++) {
                            var file = SpFileList[i];
                            var downUrl = getPath() + "api/FileDownloadNew/" + file.FileSystemId;
                            _html += '<a href="' + downUrl + '" title="点击下载">' + file.OriginalName + '</a>';
                        }
                        $filelist.append(_html);
                    }
                    //评论列表
                    var commentsList = data.SpCommentList;
                    var $msglist = $("#commentList");
                    $msglist.html("");
                    if (commentsList && commentsList.length > 0) {
                        LoadComment(commentsList);//加载评论
                    }

                   // resizeWidow();
                }
            },
            error: function () {

            }
        });

    },
    /**
     * 滚动图片
     */
    owlCarousel: function () {
        $('#owl-new').data("owl-init", "");
        $('#owl-new').owlCarousel({
            responsive:true,
            items: 1,
            navigation: true,
            navigationText: ["上一个", "下一个"],
            autoPlay: true,
            stopOnHover: true
        }).hover(function () {
            $('.owl-buttons').show();
        }, function () {
            $('.owl-buttons').hide();
        });
    },
    /**
     * 播放视频
     * @param id
     */
    player: function (id) {
        $("#jquery_jplayer_1").jPlayer({
            ready: function () {
                $(this).jPlayer("setMedia", {
                    title: "新闻视频",//视频标题
                    m4v: getPath() + "CsFile/Download?id=" + id,
                    ogv: "",
                    webmv: "",
                    poster: getPath() + "CsFile/GetThumbnail?id=" + id//视频封面
                });
            },
            play: function () { // To avoid multiple jPlayers playing together.
                $(this).jPlayer("pauseOthers");
            },
            swfPath: getPath() + "Content/Tools/jPlayer/dist/jplayer/jquery.jplayer.swf",
            supplied: "webmv, ogv, m4v",
            globalVolume: true,
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            size: { width: "100%", height: "360px" },
            keyEnabled: true
        });
    },
    /**
     * 创建评论
     */
    createComment: function () {
        var comment = new baidu.editor.ui.Editor({
            //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
            toolbars: [
                ['emotion']
            ],
            //focus时自动清空初始化时的内容
            autoClearinitialContent: true,
            //关闭字数统计
            wordCount: false,
            //关闭elementPath
            elementPathEnabled: false,
            initialFrameHeight: 90,//默认的编辑区域高度
            // ,autoHeightEnabled:false
            //更多其他参数，请参考ueditor.config.js中的配置项
            emotionLocalization: true, //是否开启表情本地化，默认关闭。若要开启请确保emotion文件夹下包含官网提供的images表情文件夹
            scaleEnabled: false,
            enableAutoSave: false,
            maximumWords: 200,
            autoHeightEnabled: false,
            contextMenu: [] //去除右键菜单
        });
        comment.render('editor');
    },
    /**
     * 发布评论
     * @param code 新闻code
     * @param content 评论内容
     */
    submitComment: function (code, content) {
        var model = {
            code: code,
            content: content
        };
        $.ajax({
            url: getPath() + 'SpManager/SaveComments',
            type: "post",
            data: { model: escape(JSON.stringify(model)) },
            dataType: "json",
            beforeSend:function(){
                var html = UE.getEditor("editor").getContent();
                var text = UE.getEditor("editor").getContentTxt();
                if (html == "") {
                    layer.msg("评论内容不能为空");
                    return false;
                }
                if (html != "" && text.length > 200) {
                    layer.msg("评论内容文字不能超过200个字符");
                    return false;
                }
                return true;
            },
            success: function (d) {
                if (d.flag == "1") {
                    UE.getEditor("editor").setContent("");//清除评论框
                    $.ajax({
                        url: getPath() + 'SpManager/GetNewCommentsList',
                        type: "post",
                        data: { code: code },
                        dataType: "json",
                        success: function (list) {
                            if (list && list.length > 0) {
                                layer.msg("发表成功");
                                LoadComment(list);
                                $(".sf-newsnotice-comment").text(list.length);
                            }
                        }
                    });
                }
            },
            error: function () {
                layer.msg("异常");
            }
        });
    }
};
/**
 * 加载评论
 * @param commentList
 */
function LoadComment(list) {
    var $msglist = $("#commentList");
    $msglist.html("");
    var _html = '';
    for (var i = 0; i < list.length; i++) {
        var img = list[i].PhotoUrl == "" ? "images/new/icons/BBS_Image.png" : list[i].PhotoUrl.substr(1, list[i].PhotoUrl.length);
        var src = getPath() + img;
        var name = list[i].UserName;
        var time = $.timeago(ChangeDateTimeFormat(list[i].CreateTime));
        _html += '<div class="sf-newsdetails-comt">\
                    <span class="sf-newsdetails-comt-portrait">\
                        <img src="' + src + '" />\
                    </span>\
                    <div class="sf-newsdetails-ate">\
                        <div class="sf-newsdetails-comt-time"><label class="sf-color-tt">' + name + '</label><label class="sf-color-time">' + time + '</label></div>\
                        <div class="sf-newsdetails-describe">' + list[i].CommentHtml + '</div>\
                    </div>\
                </div>';
    }
    $msglist.append(_html);
}
/**
 * 清除编辑器
 */
function deleteUEditor() {
    if ($("#editor").length > 0) { UE.getEditor("editor").destroy(); };//清除编辑器 UE.getEditor("container").destroy();
}
/**
 * 上一篇、下一篇
 * @param code 新闻code
 * @param type -1上一篇 1下一篇
 */
function GetUp(code, type) {
    if ($("#editor").html() != "") {
        UE.getEditor("editor").setContent("");//清除编辑器
    }
    //上下页根据查询条件（下期优化）
    $.ajax({
        url: getPath() + 'SpManager/GetNewCode',
        type: "post",
        data: { code: code, type: type },
        dataType: "json",
        success: function (d) {
            if (d.flag == "1") {
               $("#NewCode").val(d.data);
               SfDetail.initValue();
            }
            else {
                if (type == 1) {
                    layer.msg("没有了");
                }
                else {
                    layer.msg("已是第一篇");
                }
            }

        }
    });
}

/**
 * 点赞
 * @param code 新闻code
 */
function GetParise(ele,code) {

    $.ajax({
        url: getPath() + 'SpManager/SaveParise',
        type: "post",
        data: { code: code },
        dataType: "json",
        success: function (d) {
            if (d.flag == "1") {
                if (ele.attr("title") == "点赞") {
                    ele.attr("title", "取消点赞");
                }
                else {
                    ele.attr("title", "点赞");
                }
                $(".like-text").text(d.data);
            }
        }
    });
}

/**
 * 更新屏幕布局
 */
function resizeWidow() {
    var goReturn = $(".sf-newsdetails-left a");
    var left = 100;
    var $parent = $(".sf-home-desk", parent.document);
    if ($parent.find(".sf-home-desk").length > 0) {
        var $sfHome=$(".sf-home-desk").offset();
         left = $sfHome.left;
    }
    var top = $(".sf-newsnotice-source").offset().top;
    goReturn.css({ "left": left, "top": top });
}