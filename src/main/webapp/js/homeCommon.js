var homeCommon = {
    Init: function () {
        var _this = this;
        //初始化工作台模太框
        _this.InitTaskModal();
    },
    TaskModal: {},
    ModalDraggable: function ()
    {

    },
    InitTaskModal: function ()
    {
        var _this = this;
        var modalTmp = '<div class="modal fade" id="mod_task_run" tabindex="-1" role="dialog"  data-backdrop="static" aria-labelledby="taskmodal" >' +
                      '<div class="modal-dialog" role="document" id="mod_task_dialog" style="margin-top:90px;">' +
                          '<div class="modal-content" id="mod_task_content">' +
                              '<div class="modal-header" style="padding:8px; background:#f5f5f5;">' +
                                 ' <button type="button" class="close"  aria-label="close" data-dismiss="modal" title="关闭" style="font-size: 30px;margin-top: -12px;" >' +
                                     ' <span class="glyphicon glyphicon-remove" aria-hidden="true" ></span>' +
                                 ' </button>' +
                                  '<h4 id="mod_task_title" >待办工作</h4>' +
                              '</div>' +
                              '<div class="modal-body" style="padding:8px;white-space: normal;word-break: break-all;" id="ifrm_task_run" >' +
                              '</div>' +
                              '<div id="task_ze" style="width:97%; height:100%;position: absolute;top: 36px;left: 0; display:none;" > </div>' +
                         ' </div>' +
                     ' </div>' +
                   '</div>';
        $("body").append(modalTmp);
      
        _this.TaskModal.Modal = $("#mod_task_run");
        _this.TaskModal.Dialog = $("#mod_task_dialog");
        _this.TaskModal.ContentElem = $("#mod_task_content");
        _this.TaskModal.TitleElem = $("#mod_task_title");
        _this.TaskModal.BodyElem = $("#ifrm_task_run");
        _this.TaskModal.ZeElem = $("#task_ze")
        _this.TaskModal.show = function () { _this.TaskModal.Modal.modal('show');};
        _this.TaskModal.hide = function () { _this.TaskModal.Modal.modal('hide'); };
        //模态框打开显示后触发该事件
        //shown.bs.modal

        //模态框关闭时触发该事件
        _this.TaskModal.onClosed = function () { };
        _this.TaskModal.Modal.on("hide.bs.modal", function () {
            _this.TaskModal.onClosed();
            _this.TaskModal.ZeElem.hide();
        });
       
        //莫态框
        _this.TaskModal.open = function (opt) {
            //设置宽度
            if (opt.width) {
                _this.TaskModal.Dialog.width(opt.width);
                _this.TaskModal.ContentElem.width(opt.width-10);
                _this.TaskModal.BodyElem.width(opt.width - 20);
            }
            //设置高度
            if (opt.height) _this.TaskModal.BodyElem.height(opt.height);
            //设置标题
            if (opt.title) _this.TaskModal.TitleElem.html(opt.title);
            //添加主体内容
            if (opt.body) {
                _this.TaskModal.BodyElem.html("");
                _this.TaskModal.BodyElem.append(opt.body);
            }
            //关闭后触发的事件
            if (opt.onClosed) _this.TaskModal.onClosed = opt.onClosed;

            _this.TaskModal.show();
        }
    },
    OnDisabled: function (db) {
        //已办状态,有权限的不能操作，开启遮挡
        if (db.TaskType == 2&& db.Disabled) {
            _this.TaskModal.ZeElem.show();
        }
        //已办状态,有权限的不能操作，开启遮挡
        if (db.TaskType == 3 && db.Disabled) {
            _this.TaskModal.ZeElem.show();
        }
    },
    GetTaskTitle: function (db) {
        if (db.TransferKey.indexOf('Mg') > -1) return "消息查看";
        if (db.TaskType == 1) return "待办工作";
        if (db.TaskType == 2) return "已办工作";
        if (db.TaskType == 3) return "已发工作";

        return "待办工作";
    },
    GetBox: function (url) {
        var box = {};
        $("[name='ifrmod']").each(function () {
            if (this.src.indexOf(url) > -1) {
                box = $(this);
                return true;
            }
        });
        return box;
    },
    LocationUrl: function (url)
    {    
        if (url.indexOf("") == 0) {
            url = url.substring(3, url.length);
        }

        if (url.indexOf("/") == 0){
            url = url.substring(1, url.length);
        }

        return "http://"+window.location.host+ SF.util.getPath()+ url;
    },
    OpenTask: function (db) {

        var _this = homeCommon;
        var opt = _this.GetTaskSize(db.Displayargs);
        opt.title = _this.GetTaskTitle(db);
        opt.body = db.TransferKey.indexOf('Mg') > -1 || db.IsMessage == "true" ? _this.TaskConMsg(db, opt) : _this.TaskConTask(db);
        opt.onClosed = function ()
        {   //刷新待办工作数据
            if (db.reload) { db.reload() };
            SF.msg.getTaskMsg.inIt();
            _this.TaskModal.onClosed = function () { };
        }
        homeCommon.TaskModal.open(opt);
        _this.OnDisabled(db);        
    },
    TaskConTask: function (db) {
        if (db.Url == "") return "<b style='color:red;' >没有待办工作访问地址</b>";
        var _url = homeCommon.ChanceUrl(db, false); //db.UrlArgs != "" ? db.Url + "?" + db.UrlArgs : db.Url;
        return '<iframe  style=" width:100%; height:100%;" frameborder="0" src="  ' + homeCommon.LocationUrl(_url) + '" ></iframe>';
    },
    TaskConMsg: function (db, opt) {
        if (db.Status == 1 && db.TaskType==1) { homeCommon.UpdateMsg(db.Id); }
        var mgs = ["Mg_Nomal", "Mg_Important", "Mg_System"];
        //查看跳转类型的消息
        if (db.UrlArgs != "" && mgs.indexOf(db.TransferKey) < 0) {
            var _url = homeCommon.ChanceUrl(db, true);//db.IsMessage == "true" ? db.Url + "?" + db.UrlArgs : db.UrlArgs;
            return '<iframe  style=" width:100%; height:100%;" frameborder="0" src="  ' + homeCommon.LocationUrl(_url) + '" ></iframe>';
        }
        //文字类消息
        opt.width = 400;
        opt.height = 200;
        return '<span>' + db.Title + '</span>';
    },
    ChanceUrl: function (db, IsMsg) {
        var result = "";

        if (IsMsg) {
            result = db.IsMessage == "true" ? db.Url + "?" + db.UrlArgs : db.UrlArgs;
        } else {
            //非待办状态，地址要换成查看地址,如果没有查看地址就使用待办地址。
            var _url = db.TaskType == 1 ? db.Url :
                       db.ViewUrl == "" ? db.Url : db.ViewUrl;

            result = db.UrlArgs != "" ? db.Url + "?" + db.UrlArgs : _url;
        }
        return result;
    },
    UpdateMsg: function (msgID) {
     //消息更新为已读
        if (msgID == "") return;
		/**
        $.ajax({
            type: "POST",
            url: 'PublicModule/Task/TaskAction.ashx?action=UpdateMsg&Id='+msgID,
            data: { },
            dataType: "json",
            success: function (result) {
            }
        });
		**/
    },
    BroweSize: { w: window.innerWidth  ,h:window.innerHeight},
    GetTaskSize: function (ars) {
        
        var _size = { width: this.BroweSize.w * 0.8, height: this.BroweSize.h*0.7 };
        if (ars) {
            var ary = ars.split(',');
            _size.width = ary[0];
            _size.height = ary[1];
        }
        return _size;
    }


}