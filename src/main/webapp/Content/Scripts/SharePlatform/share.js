/****
* ***新闻公告页面
* 
***create：2015-1
* 10
***/
$.ajaxSetup({ cache: false });
$(function () {
    //初始化
    SP.init();
});
var SP = {
    config: {
        isopen: false//默认关闭新建页面
    },
    /**
     * 页面加载绑定
     */
    init: function () {
        InitLeftList("click");//默认按浏览次数排名
        //绑定新建按钮
        $("#btn_AddNews").on("click", function () {
            SP.openNews();
        });
        //绑定查询按钮
        $("#new_query_btn").on("click", function () {
            if ($("#isManager").val() != "1" && $("#lbtnViewImg").hasClass('active')) {
                InitImgNewList();//图文查询
            }
            else {
                queryReport();//默认dtgrid查询
            }
        });
        //切换新闻类别查询
        $("#new_query_type").on("change", function () {
            queryReport();
        });
        //切换状态查询
        $("#new_query_status").on("change", function () {
            queryReport();
        });
        //绑定左边列表事件
        $("#leftDropMenu li").on("click", function () {
            InitLeftList($(this).find('a').data("type"));
        });
        if ($("#isManager").val() != "1") {
            InitImgNewList();//加载图片新闻列表
            $("#changeList span").on("click", function () {
                $(".sp-table").hide();
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
                $($(this).data("for")).show();
            });
        }
        else {
            $("#viewTxt").show();
            $("#spImgList").hide();
        }
    },
    /**
     * 打开新建窗口时绑定
     */
    bindEvevts:function(){
        var _this = this;
        //选择是否
        $("#istop span,#ismsg span").on("click", function () {
            var _this = $(this);
            _this.siblings().removeClass("sf-whether-yes");
            _this.addClass("sf-whether-yes");
        });
        $(".sf-accessory-pic-top").on("mouseenter", function () {
            var _this = $(this);
            _this.children().show();
            _this.find("span").click(function () {
                _this.parent().hide();
            })
        }).mouseleave(function () {
            $(this).children().hide();
        });
        //日期选择 生效日期
        $("#effective_starttime").find("#effective-start-time").click(function () {
            WdatePicker({ autoPickDate: true, isShowClear: true, dateFmt: 'yyyy-MM-dd', maxDate: '#F{$dp.$D(\'expiration-end-time\')}' });
        });
        //日期选择 失效日期
        $("#expiration_endtime").find("#expiration-end-time").click(function () {
            WdatePicker({ autoPickDate: true, isShowClear: true, dateFmt: 'yyyy-MM-dd', minDate: '#F{$dp.$D(\'effective-start-time\')}' });
        });
        //绑定发布范围
        $(".sf-compile-range").on("click", function () {
            getUser("spRangeCode", "spRangeName", false, false, "getRangeUser");
        });
        /**是否显示片头上传功能**/
        $("input[name=LayType]").on("change",function(){
            if ($(this).is(":checked")) {
                if ($(this).val() == "1") {
                    $("#LayUpload").show();
                    var uploaderVedio = createUploader(107101, "FileVideo", "<i class=\"pt-video\"></i>", "mp4", "video", $("#videoList"));//片头视频
                    var uploaderPic = createUploader(107101, "FileImg", "<i class=\"pt-img\"></i>", "gif,jpg,jpeg,png,bmp", "image", $("#img-list"));//片头图片
                    $("[data-toggle='tooltip']").tooltip();
                }
                else {
                    var msg = "视频";
                    var isgo = true;
                    if ($("#videoList").find("li").length > 0) {
                        msg = "视频";
                        isgo = false;
                    }
                    if ($("#img-list").find("li").length>0) {
                        msg = "图片";
                        isgo = false;
                    }
                    if (!isgo) {
                        layer.confirm("已存在片头" + msg + "，确定离开吗?",{
                            btn: ['残忍离开', '继续编辑']
                        }, function (index) {
                                layer.close();
                                $("#videoList").html("");
                                $("#img-list").html("");
                                $("#LayUpload").hide();

                            },function () {
                                $("input[name=LayType]").removeAttr("checked");
                                $("#videohive").prop("checked", "checked");
                                layer.close();
                            });
                    }
                    else {
                        $("#LayUpload").hide();
                    }
                }
            }
        });
        //关闭侧页
        $(".side-close").on("click", function () {
            _this.closeSidepage();
        });
        //全屏/还原侧页
        $(".side-fullscreen").click(function () {
            var me = $(this);
            if (me.data('type') == "0") {
                $(".edit-content").removeClass("col-md-10").addClass("col-md-8");
                $("#Title").parent().removeClass("col-md-9").addClass("col-md-7");
                 $("#newsFrm").find(".col-md-4").addClass("col-md-2");

                $("#sidepage").animate({ width: "100%" }, "fast", function () {
                    me.find(".glyphicon").removeClass("glyphicon-fullscreen").addClass("glyphicon-resize-small");
                    me.data("type", "1").find("span").attr("title", "还原");
                    if ($(".slimScrollDiv").length > 0) {
                        $(".slimScrollDiv,.slimScroll-wrap").css("width", "100%");
                    }
                });
            }
            else {
                $(".edit-content").removeClass("col-md-8").addClass("col-md-10");
                $("#Title").parent().removeClass("col-md-7").addClass("col-md-9");
                $("#newsFrm").find(".col-md-4").removeClass("col-md-2");
                $("#sidepage").animate({ right: "0", width: "780px" }, "fast", function () {
                    me.find(".glyphicon").removeClass("glyphicon-resize-small").addClass("glyphicon-fullscreen");
                    me.data("type", "0").find("span").attr("title", "全屏");
                    if ($(".slimScrollDiv").length > 0) {
                        $(".slimScrollDiv,.slimScroll-wrap").css("width", "780px");
                    }
                });
            }
        });
        //移动到选择范围上
        bindMoveView();
        //创建上传控件
        var uploaderFile = createUploader(107101, "file_upload", "<span class=\"sf-upload-all\">上传附件</span>", "*", "file", $("#fileList"));
        //创建编辑器
         var ue = createUEditor();

        //绑定屏幕可是区域点击事件
         $(".sp-container").on("click", function () {
             var iptNum = $("#sidepage").find('input').length;
             if (iptNum > 0) {
                 layer.confirm("正在编辑内容，确定离开吗?", {
                     time: 0,
                     btn: ['残忍离开', '继续编辑']
                 }, function (index) {
                     layer.close(index);
                     _this.closeSidepage();
                 }, function (index) {
                     layer.close(index);
                 });
             }
         });


        //绑定发布事件
        $("#AddForm").on("click", function () {
            var newCode = $("#NewCode").val();
            if (newCode == "") {
                _this.SaveNews("SaveAdd",2); //新增
            }
            else {
                _this.SaveNews("SaveEdit",2);//修改
            }
        });
        //绑定暂存事件
        $("#HoldSave").on("click", function () {
            var newCode = $("#NewCode").val();
            if (newCode == "") {
                _this.SaveNews("SaveAdd", 0); //暂存新增
            }
            else {
                _this.SaveNews("SaveEdit", 0);//暂存修改
            }
        });
        //绑定保存事件
        $("#SaveForm").on("click", function () {
            var newCode = $("#NewCode").val();
            if (newCode == "") {
                _this.SaveNews("SaveAdd", 1); //新增
            }
            else {
                _this.SaveNews("SaveEdit", 1);//修改
            }
        });
        //审核
        $("#CheckForm li").on("click", function () {
            var newCode = $("#NewCode").val();
            var status = $(this).find("a").data("status");
            if (newCode != "") {
                checkForm(newCode, status);
            }
            else {
                layer.msg("还未保存，不能审核");
            }
        });
        var $input = $("#newsFrm").find("input");
        $input.on("blur", function () {
            if ($.trim($(this).val())!="") {
                validateSuccess($(this));
            }
        });
    },
    //打开新建
    openNews: function () {
        var _this = this;
        $("#sidepage").html("<div class='sidepage-load'></div>");
        $("#sidepage").show().animate({ right: 0 }, "fast", function () {
            $.ajax({
                url: getPath() + "SpManager/Add",
                success: function (d) {
                    $("#sidepage").html(d);
                    slimScroll();//滚动条美化
                    SP.config.isopen = true;
                    SP.bindEvevts();
                },
                error: function (xhr, err, msg) {
                }
            })

        });
    },
    //保存/发布
    SaveNews: function (action,status) {
        /**
         * 表单验证
         */
        var _this = this;
        function isok() {
            var $form = $("#newsFrm");
            var isok = true;
            //$form.find(".form-group").each(function () {
            //    var $label = $(this).find("label");
            //    var err = $label.text().substr(1);
            //    if ($label.find('span').hasClass('red')) {
            //        if ($(this).find("input").val() == "") {
            //            validateError($label, err + "不能为空");
            //            isok = false;
            //        }
            //        else {
            //            validateSuccess($label);
            //            isok = true;
            //        }
            //    }
            //});
            var $label = $("#Title").parent().parent().find("label");
            if ($.trim($("#Title").val()) == "") {
                isok = false;
                validateError($label, "标题不能为空");
            }
            else {
                validateSuccess($label);
                isok = true;
            }
            if ($("#videohive").is(":checked")) {
                if ($("#videoList").html() == "" && $("#img-list").html() == "") {
                    isok = false;
                    layer.msg("片头不能为空");
                }
            }
            if ($(".sf-compile-list").find("span").length==0) {
                isok = false;
                layer.msg("发布范围不能为空");
            }
            if ($("#newsFrm").find(".progress-bar").length > 0) {
                isok = false;
                layer.msg("附件还未上传成功，暂不能保存");
            }
            return isok;
        }
        if (isok()) {
            var newObj = createModal(status);//生成modal
            $.ajax({
                url: getPath() + "SpManager/" + action,
                type: "POST",
                dataType:"JSON",
                data: { model: escape(JSON.stringify(newObj)) },
                success: function (d) {
                  // console.log(d);
                    if (d.flag == "1") {
                        var msg = "发布成功";
                        if (status==0) {
                            msg = "暂存成功";
                        }
                        _this.closeSidepage();
                        layer.msg(msg);
                        refreshGrid();
                    }
                    else {
                        layer.msg("修改失败");
                    }
                },
                error: function () {

                }
            });
        }
        else {
            return;
        }

    },
    //关闭侧页
    closeSidepage: function () {
        SP.config.isopen = false;
        deleteUEditor();//清除编辑器
        $("#sidepage").animate({ right: "-780px", width: "780px" }, "fast", function () {
            $(this).html("");
        });
    }
};

//创建编辑器
function createUEditor() {
    var ue = UM.createEditor("container", {
        //toolbars: [
        //    ['fullscreen', 'source', 'undo', 'redo', 'bold', 'indent', 'italic', 'underline', 'strikethrough', 'subscript', 'fontborder', 'superscript', 'formatmatch',
        //     'pasteplain', 'selectall', 'horizontal', 'unlink', 'inserttitle', 'cleardoc', 'fontfamily', 'fontsize', 'paragraph', 'simpleupload', 'insertimage', 'link', 'emotion', 'map',
        //      'justifyleft', 'justifyright', 'justifycenter', 'justifyjustify', 'forecolor', 'backcolor', 'rowspacingtop', 'lineheight', 'template'
        //    ]],
        toolbar: [
            'source','fontfamily', 'fontsize', 'bold', 'strikethrough', 'forecolor', 'insertorderedlist', 'insertunorderedlist',
           'image', 'justifyleft', 'justifyright', 'justifycenter', 'justifyjustify', 'link', 'unlink', 'fullscreen', 'cleardoc'
        ],
        initialFrameWidth: "100%",
        initialFrameHeight: 300,
        maximumWords:8000,
        autoFloatEnabled:false
    });
    //ue.addListener("fullScreenChanged", function (type,mode) {//增加全屏监听事件
    //    alert(mode);
    //});
    ue.setWidth("100%");
    return ue;
}
/**
 * 绑定移动到选择发布范围控件上
 */
function bindMoveView() {
    $(".sf-compile-list span").on("mouseenter", function () {
        $(this).siblings().find('i').hide();
        $(this).find('i').show().on("click", function () {
            $(this).parent().remove();
            var code = "";
            var name = "";
            $(".sf-compile-list span").each(function () {
                code += $(this).data("code")+",";
                name += $(this).data("name") + ",";
            });
            $("#spRangeName").val(name.substr(0,name.length-1));
            $("#spRangeCode").val(code.substr(0, code.length - 1));
        });
    }).on("mouseleave", function () { $(this).find('i').hide(); });
}
//清除编辑器
function deleteUEditor() {
    if ($("#container").length > 0) { UM.delEditor("container"); };//清除编辑器 UE.getEditor("container").destroy();
    $("#sidepage").removeClass("sidepage-google-fullscreen");//兼容google浏览器 全屏
}
/**
*创建上传控件 返回uploader
**/
function createUploader(directoryId,objId,text,ext,filetype,upLoadElem) {
    /***文件上传***/
    var uploader_options= {
            swf: getPath() + 'Content/Tools/Webuploader/Uploader.swf',//swf文件路径
            server: getPath() + 'CsFile/Upload',//服务端路径
            pick: {
                id: $("#" + objId), //选择文件的按钮容器,按钮ID也可以是Class、dom节点
                innerHTML: text, //按钮文字
                multiple: true //是否允许同时选择多个文件
            },//上传按钮
            accept: {
                title: filetype,
                extensions: ext
            },
            fileSingleSizeLimit: 1024 * 1024 * 1024 * 1,//单个文件上传大小限制 1G
            multiple: true,        //是否开起同时选择多个文件能力。
            auto: false,           //不需要手动调用上传，有文件选择即开始上传。
            prepareNextFile: true, //是否允许在文件传输时提前把下一个文件准备好。
            chunked: false,        //是否要分片处理大文件上传。
            threads: 3,            //上传并发数。允许同时最大上传进程数。
            method: "POST",        //文件上传方式，POST或者GET
            formData: {
                directoryId: directoryId,        // 目录编号
                filecustomId: "",           // 文件上传编号 用户自定义 
                openType: "10",             // 开放类型：10.完全公开；20.授权访问；30.私密；
                iscontentencryption: false, // 是否对文件内容加密
                viewpassword: "",           // 阅读密码
                readerlist: "",             // 阅读者列表，多个以逗号分隔
                editorlist: "",             // 编辑者列表，UserSystemId列表，多个以逗号分隔
                deletelist: ""              // 删除者列表，UserSystemId列表，多个以逗号分隔
            },
            compress: false,  //图片是否压缩
            duplicate: true  //是否允许文件重复
        }
  
    var uploader = new WebUploader.Uploader(uploader_options);

    uploader.on('filesQueued', function (files) {
        /// <summary>
        /// 文件选择后处理 
        /// </summary>
        /// <param name="files">文件列表</param>
        /// <returns type=""></returns>
        var totalSize = 0,
            contentHtml = '',
            uploadElem = upLoadElem;
        for (var f = 0; f < files.length; f++) {
            totalSize += files[f].size;
            var size = files[f].size;
            if (size < 1024) {
                size = size + "B";

            } else if (size < 1024 * 1024) {
                size = (size / 1024).toFixed(2) + "K";
            }
            else if (size < 1024 * 1024 * 1024) {
                size = (size / (1024 * 1024)).toFixed(2) + "M";
            }
            else {
                size = (size / (1024 * 1024 * 1024)).toFixed(2) + "G";
            }

            var isExt = false;
            var fileExt = files[f].ext;
            var extArr = new Array("aac", "ai", "aiff", "asp", "avi", "bmp", "c", "cpp", "css", "dat", "dmg", "doc", "docx"
                                    , "dot", "dotx", "dwg", "dxf", "epx", "exe", "flv", "gif", "h", "html", "ics", "iso"
                                    , "java", "jpg", "key", "m4v", "mid", "mov", "mp3", "mp4", "mpg", "odp", "ods", "odt"
                                    , "otp", "ots", "ott", "pdf", "php", "png", "pps", "ppt", "psd", "py", "qt", "rar", "rb"
                                    , "rtf", "sql", "tga", "tgz", "tiff", "txt", "wav", "xls", "xlsx", "xml", "yml", "zip");

            for (var i = 0; i < extArr.length; i++) {
                if (extArr[i] == fileExt) {
                    isExt = true;
                }
            }

            if (!isExt) { fileExt = "defaultext" };
            switch (filetype) {
                case "video":
                    contentHtml += '  <li id="' + files[f].id + '">\
                                                   <input type="hidden" class="file-system-id" />\
                                           <div id="jp_container_1" class="jp-video" role="application" aria-label="media player">\
                                                <a class="file-delete"  title="删除附件" href="javascript:"></a>\
	                                            <div class="jp-type-single">\
		                                            <div id="jquery_jplayer_1" class="jp-jplayer"></div>\
		                                                <div class="jp-gui">\
			                                                <div class="jp-video-play">\
				                                                <button class="jp-video-play-icon" role="button" tabindex="0">play</button>\
			                                                </div>\
	                                                        <div class="jp-interface">\
				                                                        <div class="jp-progress">\
					                                                        <div class="jp-seek-bar">\
						                                                        <div class="jp-play-bar"></div>\
					                                                        </div>\
				                                                        </div>\
				                                                        <div class="jp-current-time" role="timer" aria-label="time">&nbsp;</div>\
				                                                        <div class="jp-duration" role="timer" aria-label="duration">&nbsp;</div>\
				                                                        <div class="jp-controls-holder">\
					                                                        <div class="jp-controls">\
						                                                        <button class="jp-play" role="button" tabindex="0">play</button>\
						                                                        <button class="jp-stop" role="button" tabindex="0">stop</button>\
					                                                        </div>\
					                                                        <div class="jp-volume-controls">\
						                                                        <button class="jp-mute" role="button" tabindex="0">mute</button>\
						                                                        <button class="jp-volume-max" role="button" tabindex="0">max volume</button>\
						                                                        <div class="jp-volume-bar">\
							                                                        <div class="jp-volume-bar-value"></div>\
						                                                        </div>\
					                                                        </div>\
					                                                        <div class="jp-toggles">\
						                                                        <button class="jp-repeat" role="button" tabindex="0">repeat</button>\
						                                                        <button class="jp-full-screen" role="button" tabindex="0">full screen</button>\
					                                                        </div>\
				                                                        </div>\
                                                           </div>\
                                                </div>\
                                                 <div class="uploading">\
                                                <div class="progress">\
                                                    <div class="progress-bar progress-bar-striped" role="progressbar" aria-valuemax="100" aria-valuenow="0">0%</div>\
                                                </div>\
                                            </div>\
                                                </div>\
                                                </div>\
                                        </li>';
                    break;
                case "image":
                    contentHtml += ' <li class="tile" data-force="' + f + '" title="点击拖动排序">\
                            <div class="sf-accessory-pic"  id="' + files[f].id + '" >\
                              <a class="file-delete"  title="删除附件" href="javascript:"></a>\
                              <input type="hidden" class="file-system-id" />\
                                 <img src="' + getPath() + 'Content/Images/FileTypeIcon/' + fileExt + '.png" style="width:48px;height:48px;" />\
                                <div class="sf-accessory-pic-top">\
                                </div>\
                                <div class="sf-accessory-pic-bottom">\
                                    <div class="sf-accessory-pic-bottom-1"></div>\
                                    <span class="sf-accessory-pic-data">' + unescape(files[f].name) + '</span>\
                                    <button type="button" class="sf-accessory-pic-alter sf-alter-bt">\
                                        <span class="glyphicon glyphicon-pencil sf-color-white" aria-hidden="true"></span>\
                                    </button>\
                                </div>\
                                <div contenteditable="true" class="sf-accessory-pic-txt"></div>\
<div class="uploading">\
                                                <div class="progress">\
                                                    <div class="progress-bar progress-bar-striped" role="progressbar" aria-valuemax="100" aria-valuenow="0">0%</div>\
                                                </div>\
                                            </div>\
                            </div>\
                        </li>';
                    break;
                case "file":
                    contentHtml += '<li data-type="2"><div id="' + files[f].id + '" data-id="' + files[f].id + '" class="upload-info">\
                                            <img class="thumbnail-img" src="' + getPath() + 'Content/Styles/Default/Images/filebg.png"/>\
                                            <a class="file-delete"  title="删除附件" href="javascript:"></a>\
                                            <div class="upload-name">\
<div class="name-bg"></div>\
                                                <div class="name" title="' + unescape(files[f].name) + '">' + unescape(files[f].name) + '</div>\
                                            </div>\
                                            <div class="uploading">\
                                                <div class="progress">\
                                                    <div class="progress-bar progress-bar-striped" role="progressbar" aria-valuemax="100" aria-valuenow="0">0%</div>\
                                                </div>\
                                                <div class="cancel">取消</div>\
                                            </div>\
                                            <div class="ext"></div>\
                                        <input type="hidden" class="file-system-id" name="fileIds" /></div></li>';
                    break;
            }
        }

        //判断是否可上传文件
        $.ajax({
            url: getPath() + 'CsFile/Check',
            type: 'POST',
            dataType: 'JSON',
            data: { size: totalSize },
            success: function (data) {
                if (data.flag === 1) {
                    //允许上传
                    if (filetype == "video") {
                        $("#video-wrap").show();//有内容时才显示
                    }
                    if (filetype == "image") {
                        $("#img-wrap").show();//有内容时才显示
                    }
                    //填充页面
                    uploadElem.prepend(contentHtml);
                    //注册取消上传事件
                    $(".file-upload-item .file-upload-cancel").on("click", function () {
                        var fileID = $(this).parent().parent().attr("id");
                        uploader.cancelFile(fileID);
                        $(this).parent().parent().parent().fadeOut().remove();
                    });
                    //注册删除上传事件
                    $(".file-upload-item .file-upload-delete").on("click", function () {
                        var $item = $(this).parent().parent();
                        var id = $item.find(".file-system-id").val();
                        $.ajax({
                            url: getPath() + 'CsFile/Delete',
                            type: "post",
                            data: { id: id },
                            dataType: "json",
                            success: function (d) {
                                if (d.flag == "1") {
                                    $item.fadeOut().remove();
                                    deleteAttachment(id);
                                }
                            }
                        })
                    });
                    var $uploadContainer = $("#fileList");
                    $("#fileList,#videoList,#img-list").on("click", ".cancel", function () {
                        var $parent = $(this).parent().parent().parent();
                        uploader.cancelFile($parent.data("id"));
                        $parent.fadeOut().remove();
                    }).on("click", ".file-delete", function () {//注册删除上传事件
                        var $parent = $(this).parent().parent();
                        var id = $parent.find(".file-system-id").val();
                        if (id != "") {
                            $.ajax({
                                url: getPath()+'CsFile/Delete',
                                type: "post",
                                data: { id: id },
                                dataType: "json",
                                success: function (d) {
                                    if (d.flag == "1") {
                                        $parent.fadeOut().remove();
                                        deleteAttachment(id);
                                    }
                                }
                            });
                        }
                        else {
                            $parent.fadeOut().remove();
                        }
                    }).on("mouseenter", "li", function () {//鼠标移入上传的文件显示删除按钮
                        $(this).find(".file-delete").show();
                    }).on("mouseleave", "li", function () {//鼠标移出上传的文件隐藏删除按钮
                        $(this).find(".file-delete").hide();
                    });

                    if (filetype == "image") {
                        //注册编辑描述事件
                        $("#img-list .sf-alter-bt").on("click", function () {
                            var _this = $(this);
                            _this.parent().parent().find(".sf-accessory-pic-txt").show().focus();
                        });
                        $(".sf-accessory-pic-txt").blur(function () {
                            $(this).hide();
                            var txt = $(this).text();
                            txt = txt.substring(0, 30);
                            $(this).text(txt);
                            $(this).parent().find(".sf-accessory-pic-data").text(txt);
                        });
                        //拖拽功能
                        moveFile("img-list");
                    }
                   
                    //开始上传
                    uploader.upload();
                } else {
                    //不允许上传
                   layer.msg(data.msg);
                    uploader.cancelFile(file);//取消上传
                }
            },
            error: function (xhr, status, msg) {
                layer.msg(msg);
            }
        });

    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {
        var $li = $('#' + file.id).find(".progress-bar");
        var per = (percentage * 100).toFixed(0);
        $li.css("width", per + "%").text(per + "%");
    });

    //接收服务端返回数据  返回值为true 触发'uploadSuccess'事件 否则为'uploadError'事件
    uploader.on('uploadAccept', function (obj, respose) {
        // alert(type);
        if (respose.flag == "1") {
            var data = respose.data;
            var id = data.id; //文件ID
            $("#" + obj.file.id).find(".file-system-id").val(id);
            var $file = $("#" + obj.file.id);
            if (data.isthumb) {
                setTimeout(function () {
                    switch (filetype) {
                        case "video":
                            $("#jquery_jplayer_1").jPlayer({
                                ready: function () {
                                    $(this).jPlayer("setMedia", {
                                        title: "新闻片头视频",
                                        m4v: getPath() + "CsFile/Download?id=" + id,
                                        //ogv: "Content/Styles/Default/oa.ogg",
                                        poster: getPath() + "CsFile/GetThumbnail?id=" + id
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
                                size: { width: "100%", height: "270px" },
                                keyEnabled: false
                            });
                            break;
                        case "image":
                            var $img = $file.find("img");
                            $img.attr("src", getPath() + "CsFile/GetThumbnail?id=" + id);
                            $img.css("width", 165).css("height", 84).addClass("thumb");
                            break;
                        case "file":
                            $file.find(".thumbnail-img").attr("src", getPath() + "CsFile/GetThumbnail?id=" + id);
                            break;
                        default:

                    }

                }, 500);
            }
            else {
                $file.find(".ext").text(obj.file.ext);
            }
            return true;
        }
        else {
            return false;
        }
    });

    //上传失败触发
    uploader.on('uploadError', function (file) {
        $("#" + file.id).find(".dw-file-progress").fadeOut().remove();
        $('#' + file.id).find('.file-upload-status').show().text('上传失败');
    });

    //上传成功触发
    uploader.on('uploadSuccess', function (file) {
       $("#" + file.id).find(".dw-file-progress").fadeOut().remove();
        $('#' + file.id).find('.file-upload-status').show().text('已上传');
        $('#' + file.id).find(".file-upload-cancel").remove();
        $('#' + file.id).find(".file-upload-delete").show();
        $('#' + file.id).find(".uploading").remove();
       
    });
    //操作错误事件
    uploader.on('error', function (type) {
        switch (type) {
            case "F_EXCEED_SIZE": //单个文件大小超出限制
                layer.msg("文件大小超出系统上传最大限制!");
                break;
            case "Q_EXCEED_NUM_LIMIT": //文件数量超出限制
                break;
            case "Q_EXCEED_SIZE_LIMIT"://所有文件大小总量超出限制                   
                break;
            case "Q_TYPE_DENIED"://文件类型有误
                var msg = "文件类型有误";
                if (filetype == "video") {
                    msg = "请上传后缀为.mp4的视频文件";
                }
                layer.msg(msg);
                break;
            default:
                break;
        }
    })

    return uploader;
}

/**
 * 创建 编辑页面的文件列表
 * @param files 附件内容
*  @param type 附件类型
*  @param objlist 附件存储对象
 */
function createEditFileList(files, type, objlist) {
    var $list = objlist;
    for (var j = 0; j < files.length; j++) {
        var file = files[j];
        var size = file.Size;
        var fileName = file.FileComment;
        var fileCode = file.FileCode;
        var fileSysId = file.FileSystemId;
        if (size < 1024) {
            size = size + "B";

        } else if (size < 1024 * 1024) {
            size = (size / 1024).toFixed(2) + "K";
        }
        else if (size < 1024 * 1024 * 1024) {
            size = (size / (1024 * 1024)).toFixed(2) + "M";
        }
        else {
            size = (size / (1024 * 1024 * 1024)).toFixed(2) + "G";
        }

        var isExt = false;
        var fileExt = file.Extension;
        var extArr = new Array("aac", "ai", "aiff", "asp", "avi", "bmp", "c", "cpp", "css", "dat", "dmg", "doc", "docx", "dot", "dotx", "dwg", "dxf", "epx", "exe", "flv", "gif", "h", "html", "ics", "iso", "java", "jpg", "key", "m4v", "mid", "mov", "mp3", "mp4", "mpg", "odp", "ods", "odt", "otp", "ots", "ott", "pdf", "php", "png", "pps", "ppt", "psd", "py", "qt", "rar", "rb", "rtf", "sql", "tga", "tgz", "tiff", "txt", "wav", "xls", "xlsx", "xml", "yml", "zip")
        for (var i = 0; i < extArr.length; i++) {
            if (extArr[i] == fileExt) {
                isExt = true;
            }
        }
        if (!isExt) { fileExt = "defaultext" };

        var src = getPath() + "Content/Images/FileTypeIcon/" + fileExt + ".png";


        var imgW = 48;
        var imgH = 48;
        if (file.IsThumbnail) {
            src = getPath() + "CsFile/GetThumbnail?id=" + file.FileSystemId;
        }
        var contentHtml = '';
        switch (type) {
            case "video":
                contentHtml = '  <li id="' + fileCode + '">\
                                                   <input type="hidden" class="file-system-id" value="' + fileSysId + '"/>\
                                           <div id="jp_container_1" class="jp-video" role="application" aria-label="media player">\
                                                <a class="file-delete"  title="删除附件" href="javascript:"></a>\
	                                            <div class="jp-type-single">\
		                                            <div id="jquery_jplayer_1" class="jp-jplayer"></div>\
		                                                <div class="jp-gui">\
			                                                <div class="jp-video-play">\
				                                                <button class="jp-video-play-icon" role="button" tabindex="0">play</button>\
			                                                </div>\
	                                                        <div class="jp-interface">\
				                                                        <div class="jp-progress">\
					                                                        <div class="jp-seek-bar">\
						                                                        <div class="jp-play-bar"></div>\
					                                                        </div>\
				                                                        </div>\
				                                                        <div class="jp-current-time" role="timer" aria-label="time">&nbsp;</div>\
				                                                        <div class="jp-duration" role="timer" aria-label="duration">&nbsp;</div>\
				                                                        <div class="jp-controls-holder">\
					                                                        <div class="jp-controls">\
						                                                        <button class="jp-play" role="button" tabindex="0">play</button>\
						                                                        <button class="jp-stop" role="button" tabindex="0">stop</button>\
					                                                        </div>\
					                                                        <div class="jp-volume-controls">\
						                                                        <button class="jp-mute" role="button" tabindex="0">mute</button>\
						                                                        <button class="jp-volume-max" role="button" tabindex="0">max volume</button>\
						                                                        <div class="jp-volume-bar">\
							                                                        <div class="jp-volume-bar-value"></div>\
						                                                        </div>\
					                                                        </div>\
					                                                        <div class="jp-toggles">\
						                                                        <button class="jp-repeat" role="button" tabindex="0">repeat</button>\
						                                                        <button class="jp-full-screen" role="button" tabindex="0">full screen</button>\
					                                                        </div>\
				                                                        </div>\
                                                        </div>\
                                                </div>\
                                            </div></div>\
                                        </li>';
                break;
            case "image":
                imgH = 84;
                imgW = 165;
                contentHtml = ' <li class="tile" data-force="' + j + '" title="点击拖动排序">\
                            <div class="sf-accessory-pic"  id="' + fileCode + '" >\
                            <a class="file-delete"  title="删除附件" href="javascript:"></a>\
                              <input type="hidden" class="file-system-id"  value="' + fileSysId + '" />\
                                     <img src="' + src + '"  width="' + imgW + '" height="' + imgH + '"  />\
                                <div class="sf-accessory-pic-top">\
                                </div>\
                                <div class="sf-accessory-pic-bottom">\
                                    <div class="sf-accessory-pic-bottom-1"></div>\
                                    <span class="sf-accessory-pic-data">' + fileName + '</span>\
                                    <button type="button" class="sf-accessory-pic-alter sf-alter-bt">\
                                        <span class="glyphicon glyphicon-pencil sf-color-white" aria-hidden="true"></span>\
                                    </button>\
                                </div>\
                                <div contenteditable="true" class="sf-accessory-pic-txt" data-length="20"></div>\
                            </div>\
                        </li>';
                break;
            case "file":
                imgH = 80;
                imgW = 120;
                fileName = file.OriginalName;
                var ext = "";
                if (!file.IsThumbnail) {
                    src = getPath() + "Content/Styles/Default/Images/filebg.png";
                    ext = fileExt;
                }
                contentHtml = '<li data-type="2"><div id="' + fileSysId + '"  data-id="' + fileSysId + '" class="upload-info">\
                                            <img class="thumbnail-img" src="' + src + '" height="' + imgH + '" width="'+imgW+'"/>\
                                            <a class="file-delete"  title="删除附件" href="javascript:"></a>\
                                            <div class="upload-name">\
                                            <div class="name-bg"></div>\
                                                <div class="name" title="' + unescape(fileName) + '">' + unescape(fileName) + '</div>\
                                            </div>\
                                            <div class="ext">' + ext + '</div>\
                                        <input type="hidden" class="file-system-id" name="fileIds" value="' + fileSysId + '"/></div></li>';
                break;
        }
        $(contentHtml).appendTo($list);
    }
    //注册取消上传事件
    $(".file-upload-item .file-upload-cancel").on("click", function () {
        uploader.cancelFile(file);
        $(this).parent().parent().fadeOut().remove();
    });
    //注册删除上传事件
    $(".file-upload-item .file-upload-delete").on("click", function () {
        var $item = $(this).parent().parent();
        var id = $item.find(".file-system-id").val();
        $.ajax({
            url: getPath() + 'CsFile/Delete',
            type: "post",
            data: { id: id },
            dataType: "json",
            success: function (d) {
                if (d.flag == "1") {
                    $item.fadeOut().remove();
                    deleteAttachment(id);
                }
            }
        })
    });
    var $uploadContainer = $("#fileList");
    $("#fileList,#videoList,#img-list").on("click", ".cancel", function () {
        var $parent = $(this).parent().parent().parent();
        uploader.cancelFile($parent.data("id"));
        $parent.fadeOut().remove();
    }).on("click", ".file-delete", function () {//注册删除上传事件
        var $parent = $(this).parent().parent();
        var id = $parent.find(".file-system-id").val();
        if (id != "") {
            $.ajax({
                url: getPath() + 'CsFile/Delete',
                type: "post",
                data: { id: id },
                dataType: "json",
                success: function (d) {
                    if (d.flag == "1") {
                        $parent.fadeOut().remove();
                        deleteAttachment(id);
                    }
                }
            });
        }
        else {
            $parent.fadeOut().remove();
        }
    }).on("mouseenter", "li", function () {//鼠标移入上传的文件显示删除按钮
        $(this).find(".file-delete").show();
    }).on("mouseleave", "li", function () {//鼠标移出上传的文件隐藏删除按钮
        $(this).find(".file-delete").hide();
    });

    if (type == "image") {
        //注册编辑描述事件
        $("#img-list .sf-alter-bt").on("click", function () {
            var _this = $(this);
            _this.parent().parent().find(".sf-accessory-pic-txt").show().focus();
        });
        $(".sf-accessory-pic-txt").blur(function () {
            $(this).hide();
            var txt = $(this).text();
            txt = txt.substring(0, 30);
            $(this).text(txt);
            $(this).parent().find(".sf-accessory-pic-data").text(txt);
        });
        //拖拽功能
        moveFile("img-list");
    }
    if (type == "video") {//加载视频
        $("#jquery_jplayer_1").jPlayer({
            ready: function () {
                $(this).jPlayer("setMedia", {
                    title: "新闻片头视频",
                    m4v: getPath() + "CsFile/Download?id=" + fileSysId,
                    poster: getPath() + "CsFile/GetThumbnail?id=" + fileSysId
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
            size: { width: "100%", height: "270px" },
            keyEnabled: true
        });
    }

}
//删除附件
function deleteAttachment(id) {
    $.ajax({
        url: getPath() + 'DwPlanMy/DeleteAttachment',
        type: "post",
        data: { id: id },
        dataType: "json",
        success: function (d) {
            if (d.flag == "1") {

            }
        }
    });
}
/// <summary>
/// 表单错误验证
/// </summary>
function validateError($ele, errmsg) {

    if ($ele.closest(".form-group").hasClass("has-error")) return;
    $ele.closest(".form-group").addClass("has-error");
    $ele.parent('div').append("<i class='help-block error-icon'></i>");
    $ele.parent('div').children('div').append("<span class='help-block error-msg'>" + errmsg + "</span>");
}
//验证成功
function validateSuccess($ele) {
    $ele.closest(".form-group").removeClass("has-error");
    $ele.closest(".form-group").find(".error-msg").remove();
    $ele.closest(".form-group").find(".error-icon").remove();
}
/**
 * 获取新闻对象
 * @param status 状态0：暂存：1：审核中；2：直接发布
 */
function createModal(status) {

    var news = {};
    var newCode = $("#NewCode").val();
    var newtype = $("input[name='NewType']:checked").val();//新闻类型
    var source = $("#SourceFrom").val();//新闻来源
    var istop = $("#top-yes").hasClass("sf-whether-yes") ? "1" : "0";//是否置顶
    var ismsg = $("#msg-yes").hasClass("sf-whether-yes") ? "1" : "0";//是否评论
    var effectDate = $("#effective-start-time").val() == "" ? null : $("#effective-start-time").val();//生效日期
    var invalidTime = $("#expiration-end-time").val() == "" ? null : $("#expiration-end-time").val();//失效日期
    var title = $("#Title").val();//标题
    //发布范围
    var ViewRange = new Array();
    var $compilelist = $(".sf-compile-list").find("span");
    if ($compilelist.length > 0) {
        $compilelist.each(function (i) {
            var code = $(this).data("code");
            var name = $(this).data("name");
            var type = $(this).data("type");//判断是选择的部门，还是单个人
            var compile = { code: code, name: name, TypeNo: type };
            ViewRange.push(compile);
        });
    }
    //布局
    var layType = $("input[name='LayType']:checked").val();//布局
    if (layType != "0") {
        //片头附件
        var Attachments = new Array();
        var $videoList = $("#videoList").find("li");
        if ($videoList.length > 0) {
            $videoList.each(function (i) {
                var attcode = $(this).find(".file-system-id").val();
                var attdesc = "新闻片头视频";
                var attsort = i;
                var type = 0;
                var files = { AttachmentCodes: attcode, AttachmentDesc: attdesc, AttachmentSortNo: attsort, AttachmentType: type };
                Attachments.push(files);
            });
        }
        var $imgList = $("#img-list").find("li");
        if ($imgList.length > 0) {
            $imgList.each(function (i) {
                var attcode = $(this).find(".file-system-id").val();
                var attdesc = $(this).find(".sf-accessory-pic-data").text();
                var attsort = i;
                var type = 1;
                var files = { AttachmentCodes: attcode, AttachmentDesc: attdesc, AttachmentSortNo: attsort, AttachmentType: type };
                Attachments.push(files);
            });
        }
    }
    var contentText = UM.getEditor("container").getContentTxt();//获取内容UE.getEditor
    var contentHtml = UM.getEditor("container").getContent();//获取内容html
   // console.log(contentHtml);

    //上传附件
    var fileArr = new Array();
    var $fileList = $("#fileList").find("li");
    if ($fileList.length > 0) {
        $fileList.each(function (i) {
            var code = $(this).find(".file-system-id").val();
            var type = $(this).data("type");
            var files = { FileCodes: code, FileType: type };
            fileArr.push(files);
        });
    }
    news = {
        spnews: {
            NewCode:newCode,
            NewType: newtype,         //新闻类型 0：新闻 1公告
            Title: title,                       //标题
            SourceFrom: source,        //新闻来源
            IsTop: istop,                    //是否置顶
            IsComment: ismsg,          //是否评论
            EffectDate: effectDate,      //生效日期
            InvalidTime: invalidTime,  //失效日期
            ContentHtml: contentHtml,//内容html
            ContentText: contentText, //内容
            LayType: layType,            //布局
            NewStatus: status                  //新闻公告状态0：暂存：1：审核中；2：直接发布
        },
        ViewRange: ViewRange,   //发布范围
        SpHeadFile: Attachments,//片头附件
        SpNewsFile:fileArr          //上传附件
    }
    return news;
}
//拖拽排序上传图片
function moveFile(eleId) {
    var container = document.getElementById(eleId);
    var sort = new Sortable(container);
}

//dtGrid移动行事件
function actionbarMouseOver() {
    $(this).prev().css("backgroundColor", "#F7F7F7");
    $(this).prev().children().addClass("grid-columnstyle-noborder");
}
//dtGrid移出行事件
function actionbarMouseOut() {
    $(this).prev().css("backgroundColor", "transparent");
    $(this).prev().children().removeClass("grid-columnstyle-noborder");
}
/**
 * 选择发布范围（回调）
 */
function getRangeUser() {
    var $codeEle = $("#spRangeCode");
    var $nameEle = $("#spRangeName");
    var codes = $codeEle.val().split(',');
    var names = $nameEle.val().split(',');
    var type = 1;//0：部门，1个人
    var _html = '';
    if (codes.length > 0) {
        $(".sf-compile-list").html("");
        for (var i = 0; i < codes.length; i++) {
            if (names[i]=="所有人员") {
                type = -1;
            }
            _html += ' <span data-code="' + codes[i] + '" data-name="' + names[i] + '" data-type="' + type + '">' + names[i] + '<i class="glyphicon glyphicon-remove"></i></span>';
        }
        $(".sf-compile-list").append(_html);
        //移动到选择范围上
        bindMoveView();
    }
}
/**
 * 选人
 * @param usercodeId
 * @param usernameEleId
 * @param isSingle
 * @param isRight
 * @param callbackName
 * @param selectType
 */
function getUser(usercodeId, usernameEleId, isSingle, isRight, callbackName) {
    /// <summary>
    /// 选人
    /// </summary>
    /// <param name="usercodeId">用户代码input控件id</param>
    /// <param name="usernameEleId">用户名input控件id</param>
    /// <param name="isSingle">是否为单选</param>
    /// <param name="isRight">是否职能范围内选人</param>
    /// <param name="showall">显示所有人员</param>
    /// <param name="callbackName">回调</param>
    var strURL = getPath() + "users/SelectUsers.aspx?single=" + isSingle + "&userright=" + isRight
        + "&txtCode=" + usercodeId + "&txtName=" + usernameEleId + "&callback=" + callbackName + "&showall=true";
    openNewDiv(strURL, 600, 550, 1);
}
/**
 * 打开详情页面
 * @param newCode
 */
function openDetail(newCode) {
    //var iptNum = $("#sidepage").find('input').length;
    //if (iptNum > 0) {
    //    return;
    //}
    //else {
    //    window.location.href = getPath() + "SpManager/Detail?code=" + newCode+"&v="+Math.random();
    //}
    var bodyWidth = document.body.clientWidth-200;
    var bodyHeight = document.body.clientHeight - 30;
    var url = getPath() + "SpManager/Detail?code=" + newCode + "&v=" + Math.random();
    $('body').SfDialog2({
        id: 'dlg1',
        url: url,
        backdrop:true,
        width: bodyWidth,
        height: 750
    });
    $(".modal-lg").css({ "width": bodyWidth + "px" });
}
/**
 * 编辑新闻
 * @param newCode
 */
function editNew(newCode) {
    deleteUEditor();//清除编辑器
    $("#sidepage").html("<div class='sidepage-load'></div>");
    $("#sidepage").show().animate({ right: 0 }, "fast", function () {
        $.ajax({
            url: getPath() + "SpManager/Add",
            success: function (d) {
                $("#sidepage").html(d);
                SP.bindEvevts();
                SP.config.isopen = true;
                slimScroll();//滚动条美化
                $.ajax({
                    type: "post",
                    url: getPath() + "SpManager/GetNewModel",
                    data: { code: newCode },
                    dataType: "json",
                    success: function (data) {
                        //console.log(data);
                        $("#NewCode").val(newCode);
                        $("#Title").val(data.Title);
                        $("#SourceFrom").val(data.SourceFrom);
                        var um = UM.getEditor("container");
                        um.setContent(data.ContentHtml);
                        $(".NewType[value='" + data.NewType + "']").prop("checked", true);//新闻公告类型
                        $(".LayType[value='" + data.LayType + "']").prop("checked", true);//布局
                        data.IsTop == 1 ? $("#istop span").removeClass("sf-whether-yes").eq(0).addClass("sf-whether-yes") : $("#istop span").removeClass("sf-whether-yes").eq(1).addClass("sf-whether-yes");
                        data.IsComment == 1 ? $("#ismsg span").removeClass("sf-whether-yes").eq(0).addClass("sf-whether-yes") : $("#ismsg span").removeClass("sf-whether-yes").eq(1).addClass("sf-whether-yes");
                        $("#effective-start-time").val(data.EffectDate == null ? "" : data.EffectDate);
                        $("#expiration-end-time").val(data.InvalidTime == null ? "" : data.InvalidTime);
                        if (data.LayType == 1) {
                            $("#LayUpload").show();
                            var uploaderVedio = createUploader(107101, "FileVideo", "<i class=\"pt-video\"></i>", "mp4", "video", $("#videoList"));//片头视频
                            var uploaderPic = createUploader(107101, "FileImg", "<i class=\"pt-img\"></i>", "gif,jpg,jpeg,png,bmp", "image", $("#img-list"));//片头图片
                        }
                        var ViewRanges = data.ViewRange;//发布范围
                            if (ViewRanges&&ViewRanges.length > 0) {
                                //console.log("发布范围");
                                //console.log(ViewRanges);
                                //$(".sf-compile-list").html("");
                                var contentHtml = '';
                                var code = "";
                                var name = "";
                                $(".sf-compile-list").html("");
                                for (var i = 0; i < ViewRanges.length; i++) {
                                    var view = ViewRanges[i];
                                    code += view.ViewCode + ",";
                                    name += view.ViewName + ",";
                                    contentHtml += ' <span data-code="' + view.ViewCode + '" data-name="' + view.ViewName + '" data-type="' + view.TypeNo + '">' + view.ViewName + '<i class="glyphicon glyphicon-remove"></i></span>';
                                }
                                $("#spRangeCode").val(code.substring(0, code.length-1));
                                $("#spRangeName").val(name.substring(0, name.length - 1));
                                $(".sf-compile-list").append(contentHtml);
                                //移动到选择范围上
                                bindMoveView();
                            }
                     
                        var SpHeadFiles = data.SpHeadFile;//片头图片
                        if (SpHeadFiles && SpHeadFiles.length > 0) {
                            $("#img-wrap").show();//有内容时才显示
                            createEditFileList(SpHeadFiles, "image", $("#img-list"));
                        }
                        var SpHeadVideoFiles = data.SpHeadVideoFile;//片头视频
                        if (SpHeadVideoFiles && SpHeadVideoFiles.length > 0) {
                            $("#LayUpload").show();
                            $("#video-wrap").show();//有内容时才显示
                            createEditFileList(SpHeadVideoFiles, "video", $("#videoList"));
                        }
                        var SpFileLists = data.SpFileList;
                        if (SpFileLists && SpFileLists.length > 0) {
                            createEditFileList(SpFileLists, "file", $("#fileList"));//下载附件
                        }
                    }
                });
            },
            error: function (xhr, err, msg) {
                //加载异常
            }
        })

    });

}
/**
 * 删除新闻
 * @param newCode
 */
function delNew(newCode) {
    layer.msg("确定要删除吗?", {
        time: 0,
        btn: ['确定', '取消'],
        yes: function (index) {
            layer.close(index);
            $.ajax({
                url: getPath() + 'SpManager/Delete',
                type: "post",
                data: { code: newCode },
                dataType: "json",
                success: function (d) {
                    if (d.flag == "1") {
                        refreshGrid();
                        InitLeftList("click");//更新左边数据
                    }
                    else {
                        layer.msg("删除异常");
                    }
                }
            });
        },
        no: function (index) {
            layer.close(index);
        }
    });
    
}
/**
 * 置顶方法
 * @param newCode
 */
function topNew(newCode,istop) {
    var top = istop == "1" ? 0 : 1;
    $.ajax({
        url: getPath() + 'SpManager/UpdateTop',
        type: "post",
        data: { code: newCode, top: top },
        dataType: "json",
        success: function (d) {
            if (d.flag == "1") {
                refreshGrid();
            }
        }
    });
}
/**
 * 审核
 * @param newCode
 */
function flowNew(newCode) {

}
/**
 * 审核通过新闻
 * @param newCode
 */
function checkForm(newCode,status) {
    $.ajax({
        url: getPath() + 'SpManager/UpdateStatus',
        type: "post",
        data: { code: newCode, status: status },
        dataType: "json",
        success: function (d) {
            if (d.flag == "1") {
                if (status == "2") {
                    layer.msg("审核通过");
                }
                if (status == "3") {
                    layer.msg("审核不通过");
                }
                SP.closeSidepage();
                refreshGrid();
            }
        }
    });
}
/**
 * //美化滚动条
 */
function slimScroll() {
    $(".slimScroll-wrap").slimScroll({
        width: $("#sidepage").width()-4,
        height: "100%",
        railVisible: true,
        size: "10px",
        railColor: "#333"
    });
}
/**
 * 刷新
 */
function refreshGrid() {
    //console.log(grid_dw_plan);
    if (grid_dw_plan) {
        grid_dw_plan.parameters = getQueryParam();
        grid_dw_plan.reload(true);
    }
}

    /**
     * 获取查询条件
     */
    function getQueryParam() {
        var newtype = $("#new_query_type").val();
        var status = $("#new_query_status").val();
        var startTime = $("#report_query_starttime").find("input").val();
        var endTime = $("#report_query_endtime").find("input").val();
        var title = $("#new_query_title").val();
        parameters = {
            //isquery: true,
            newtype: newtype,
            nStatus: status,
            startTime: startTime,
            endTime: endTime,
            keywords: title
        }
        return parameters;
    }
    /**
     * 查询
     */
    function queryReport() {
        refreshGrid();
    }
    /**
     * 根据点击量和评论多少排名
     * @param type
     */
    function InitLeftList(type) {
        $(".left-menu-name span").text(type == "click" ? "浏览排名" : "评论排名");
        var action=type=="click"?"GetBroweList":"GetCommentsNoList";
        var url = getPath() + "SpManager/" + action;
        $.ajax({
            url: url,
            type:"post",
            dataType:"json",
            success:function(data){
                var _html = '';
                if (data.length > 0) {
                    var $list = $("#leftNewList");
                    $list.html("");
                    for (var i = 0; i < data.length; i++) {
                        var d=data[i];
                        var className = " sf-newslist-ranking-num-1";
                        if (i>2) {
                            className = " sf-newslist-ranking-num-2";
                        }
                        if (i<10) {
                            _html += ' <li data-code="' + d.NewCode + '">\
                                <a href="javascript:void(0)">\
                                    <span class="sf-newslist-ranking-num ' + className + '">'+String(i+1)+'</span>\
                                    <span class="sf-newslist-ranking-title" title="' + d.Title + '">' + d.Title + '</span>\
                                </a>\
                            </li>';
                        }
                    }
                    $list.append(_html);
                    if ($list.find('li').length) {
                        var $li = $list.find('li');
                        $li.on("click", function (e) {
                            var code = $(this).data("code");
                            if (!SP.config.isopen) {
                                openDetail(code);
                            }
                            else {
                               //
                            }
                        });
                    }
                }
            }
        });
    }
    /**
     * （非管理员）加载数据\图文查询
     */
    function InitImgNewList() {
        var parmes = createPagerparmes();
        $.ajax({
            url: getPath() + "SpManager/GetList?isManager=" + $("#isManager").val(),
            type: "post",
            dataType: "json",
            data: { parmes: escape(JSON.stringify(parmes)) },
            success: function (data) {
                if (data != "undefiend") {
                    //console.log(data);
                    var pager = {
                        isSuccess: data.isSuccess, //是否成功
                        nowPage: data.nowPage,       //当前页
                        pageCount: data.pageCount,     //当前查询的记录总数
                        pageSize: data.pageSize,    //页面显示多少条
                        recordCount: data.recordCount,   //当前查询的记录总数
                        startRecord: data.startRecord    //开始的记录号
                    };
                    createPagination(pager);//加载分页
                    var list = data.exhibitDatas;//要分页的数据
                    createImgView(list);//加载图文新闻列表
                }
          
                
            },
            error:function(){
        
            }
        });
    }
    /**
     * 加载图文列表
     * @param dataList
     */
    function createImgView(dataList) {
        var $contain = $("#spImgList ul");
        $contain.html("");
        var _html = '';
        if (dataList && dataList.length > 0) {
            for (var i = 0; i < dataList.length; i++) {
                var d = dataList[i];
                var imgSrc = "";
                if (d.SpNewHeadFile.length > 0) {
                    imgSrc = getPath() + "CsFile/GetThumbnail?id=" + d.SpNewHeadFile[0].FileSystemId;
                }
                else {
                    imgSrc = getPath() + "Content/Styles/Default/Images/default_news.png";
                }
                //var img = getPath() + "CsFile/GetThumbnail?id=" + d.
                _html += ' <li class="col-md-3 dw-embed-right-row">\
                        <div class="details">';
                if (d.IsTop == 1) {
                    _html += '<div class="top-txt">顶</div>';
                }
                var remarkClass = "remarkh";
                //新闻详细链接
                //var href = getPath() + "SpManager/Detail?code=" + d.NewCode+"&v="+Math.random();
                if (imgSrc != "") {
                    remarkClass = "remark";
                    _html += "<div class=\"pic\"><a href=\"javascript:void(0)\" onclick=\"openDetail('" + d.NewCode + "')\"><img src='" + imgSrc + "' /></a></div>";
                }

                _html += "<h1><a href=\"javascript:void(0)\" onclick=\"openDetail('" + d.NewCode + "')\">" + d.Title + "</a></h1>";
                _html += ' <div class="' + remarkClass + '">' + d.ContentText + '</div>\
                            <div class="foot">\
                                <div class="from">\
                                    <p>\
                                        <span class="time">' + d.CreateTime.substr(0, 10).replace(/T/, ' ') + '</span>\
                                    </p>\
                                </div>\
                                <div class="view-icon">\
                                    <i class="sf-small-menu sf-td-like" title="点赞次数"></i><span>' + d.PriaseNo + '</span>\
                                    <i class="sf-small-menu sf-td-comment" title="评论次数"></i><span>' + d.CommentNo + '</span>\
                                    <i class="sf-small-menu sf-td-view" title="预览次数"></i><span>' + d.BrowseNo + '</span>\
                                </div>\
                            </div>\
                        </div>\
                    </li>';
            }
        }
        $contain.append(_html);
    }
    /**
     * 创建分页查询
     */
    function createPagerparmes() {
        var nowPage = 1;
        var pageSize = 12;
        if ($("#img-list-toolbar").find('.numpagesize').length>0) {
            nowPage = $("#img-list-toolbar").find('.numpagesize').val() == "" ? 1 : $("#img-list-toolbar").find('.numpagesize').val();
        }
        if ($("#img-list-toolbar").find('select').length>0) {
            pageSize = $("#img-list-toolbar").find('select').val() == "" ? 12 : $("#img-list-toolbar").find('select').val();
        }
        var parmes = {
            parameters: getQueryParam(),
            nowPage: nowPage,
            pageSize: pageSize
        };
        return parmes;
    }
    /**
     * 加载分页
     * @param pager
     */
    function createPagination(pager) {
        var $page = $("#img-list-toolbar");
        $page.html("");
        var nowPage = pager.nowPage;
        var pageSize = pager.pageSize;
        var recordCount = pager.recordCount;
        var totalPage = Math.ceil(recordCount / pageSize);
        var _pageHtml = '<div class="first-page" title="首页"><i class="page-icon first-icon"></i></div>\
                    <div class="pre-page" title="上一页"><i class="page-icon pre-icon"></i></div>\
                    <div>第<input type="text" class="numpagesize" value="' + nowPage + '" />页，共' + totalPage + '页</div>\
                    <div class="next-page" title="下一页"><i class="page-icon next-icon"></i></div>\
                    <div class="last-page" title="尾页"><i class="page-icon last-icon"></i></div>\
                    <div>每页</div>\
                    <div class="paginal">\
                        <select id="iptPageSize">\
                            <option value="12">12</option>\
                            <option value="24">24</option>\
                            <option value="50">50</option>\
                            <option value="100">100</option>\
                        </select>\
                    </div>\
                    <div>条，共' + recordCount + '条</div>';
        $page.append(_pageHtml);
        $page.find('select').val(pageSize);
        //绑定事件 首页
        $page.find(".first-page").on("click", function () {
            $page.find('.numpagesize').val(1);
            InitImgNewList();
        });
        //上一页
        $page.find(".pre-page").on("click", function () {
            var num = $page.find('.numpagesize').val();
            var pagesize =num=="1"?1: parseInt(num) - 1;
            $page.find('.numpagesize').val(pagesize);
            InitImgNewList();
        });
        //下一页
        $page.find(".next-page").on("click", function () {
            var num = $page.find('.numpagesize').val();
            var pagesize = num == totalPage ? totalPage : parseInt(num) + 1;
            $page.find('.numpagesize').val(pagesize);
            InitImgNewList();
        });
        //末页页
        $page.find(".last-page").on("click", function () {
            $page.find('.numpagesize').val(totalPage);
            InitImgNewList();
        });
        //下拉框选择分页
        $page.find('select').on("change", function () {
            InitImgNewList();
        });
        $page.find('.numpagesize').on("blur", function () {
            var num = $page.find('.numpagesize').val();
            if (parseInt(num) > totalPage) {
                $page.find('.numpagesize').val(totalPage);
            }
            InitImgNewList();
        });
        $page.find('.numpagesize').keyup(function () {
            var tmptxt = $(this).val();
            $(this).val(tmptxt.replace(/\D|^0/g, ''));
        }).bind("paste", function () {
            var tmptxt = $(this).val();
            $(this).val(tmptxt.replace(/\D|^0/g, ''));
        });
    }
    /**
    * 预览
    */
    function Preview() {
        $('body').SfDialog({
            url: getPath()+'SpManager/PreView',
            width: 1000,
            backdrop:true,
            loadSucceed: function () {
                var um = UM.getEditor("container");
                $(".sf-newsdetails-title").text($("#Title").val());
                $("#content").html(um.getContent());
                var newtype = $("input[name='NewType']:checked").val();//新闻类型
                var source = $("#SourceFrom").val();//新闻来源
                $(".sf-newsnotice-source").text(newtype == 1 ? "公告" : "新闻");//类型
                $(".sf-newsnotice-author").text(source);
                $(".sf-newsnotice-read").text(0);
                $(".sf-newsnotice-comment").text(0);
                $(".like-text").text(0);
                var $videoList = $("#videoList");
                if ($videoList.find("li").length>0) {
                    $(".newPlayer").show();
                    var vedioId = $videoList.find("li:eq(0)").find(".file-system-id").val();
                    player(vedioId);//播放
                }
                var $imglist=$("#img-list");
                if ($imglist.find("li").length > 0) {
                    var $owlImg = $("#owl-new");
                    var _html = '';
                    $imglist.find("li").each(function () {
                        var elem = $(this);
                        var id = elem.find(".file-system-id").val();
                        var name = elem.find(".sf-accessory-pic-data").text();
                        var src = getPath() + "CsFile/Download?id=" + id;
                        _html += '<div class="item">\
                        <img src="' + src + '" /><b></b><span>' + name + '</span>\
                    </div>';
                    });
                    $owlImg.append(_html);
                    owlCarousel();
                }
            }
        });
    }
    /**
        * 播放视频
        * @param id
        */
    function player(id) {
        $("#jquery_jplayer_2").jPlayer({
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
    }
    /**
     * 滚动图片
     */
    function owlCarousel() {
        $('#owl-new').owlCarousel({
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
    }
    /**
     * 更新屏幕布局
     */
    function resizeWidow() {

    }