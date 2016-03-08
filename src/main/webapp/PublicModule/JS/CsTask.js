function resizeDoByWidth() {
    resizeData();
}
function resizeData() {
    csTask.ReSizeInfo();
    csTask.Grid.columns[11].maxLength = csTask.sizeInfo.titleCount;
    csTask.Pager.pageSize = csTask.sizeInfo.listCount;
    csTask.PageNext(1);
  
}
var csTask = {
    backTab: "undo",
    Pager: {},
    Grid: {},
    getQueryStringByName: function (name) {
        var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (result == null || result.length < 1) {
            return "";
        }
        return result[1];
    },
    ReSizeInfo: function () {
       
        var sizeInfo = {listHeight:0, listCount: 0, titleCount: 0, titleWidth: 0 };
        if (parent.homeCommon) {;
            var box = parent.homeCommon.GetBox("/Task/Task.aspx");
            var blockH = 38 + 38 + 34, lineH = 38;
            //List行数计算
            sizeInfo.listHeight = box.height() - blockH;
            sizeInfo.listCount = parseInt(sizeInfo.listHeight / lineH);
            //标题字数计算
            sizeInfo.titleWidth = box.width() * 0.4;
            sizeInfo.titleCount = parseInt(sizeInfo.titleWidth / 10);
        }
        this.sizeInfo = sizeInfo;
        //下限验证
        sizeInfo.listCount--;
        if (sizeInfo.listCount < 1) sizeInfo.listCount = 1;
    },
    JumpInside: function () {
        var _this = this;
        var _click = _this.getQueryStringByName("click");
        var jump = _this.getQueryStringByName("jump")
        _this.Inside = _click != "" ? true : false;
        _this.Jtab = _click;

        if (jump != "")
        {//标题跳转
            _this.Inside = true;
            _this.Jtab = "1";
            $("#searchControls").show();
        }
        if (!_this.Inside) return;
        _this.sizeInfo.titleCount = 50;
        _this.sizeInfo.listCount = 20;
        $("#taskwarp").css("padding-top", "0px");

        if (jump != "") return;
        //更改Tab显示
        $("#undo").removeClass("undo_sel");
        if (_click == "2") {
          //  _this.Pager.Status = 2;
            _this.backTab = "do";
            $("#do").addClass("do_sel");

        }
        else {
          //  _this.Pager.Status = 3;
            _this.backTab = "send"
            $("#send").addClass("send_sel");
        };
    },
    Init: function (opt) {
        var _this = this;   
       
        if (opt && opt.url) _this.reurl = opt.url;
        _this.ReSizeInfo();
        _this.JumpInside();
        //tab
         _this.tanIdx = _this.Jtab != "" ? _this.Jtab : 1;

         $("#tabPanel a").click(function () {
             _this.Pager.CountWhere = "";
            _this.SetTab(_this, this);
            _this.SwapGrid(this.id);
        });
        //search
        $("#btnSearch").click(function () { _this.Search(); });
        //date

        //grid
        var grid = {
            id: "gridCon",
            url: _this.reurl,
            pageSize: _this.sizeInfo.listCount,
            pageWhere: { Status: _this.tanIdx },
            rowClick: function (row) { _this.openWindow(row); },
            pointer:true,
            columns:[
                { id: 'Id', title: '编号', type: 'string', hide: true },
                { id: 'RelatedNo', title: '关联编号', type: 'string', hide: true },
                { id: 'Url', title: '跳转地址', type: 'string', hide: true },
                { id: 'UrlArgs', title: '编号', type: 'string', hide: true },
                { id: 'Displayargs', title: '弹窗参数', type: 'string', hide: true },
                { id: 'TransferKey', title: '待办类型', type: 'string', hide: true },
                { id: 'Status', title: '状态值', type: 'string', hide: true },
                { id: 'ActorUser', title: '处理人', type: 'string', hide: true },
               
                { id: 'TypeName', title: '类型名称', type: 'string', hide: true },
                { id: 'StatusDcr', title: '状态', type: 'string', width: 80, hide: true },
                { id: 'Title', title: '标题', type: 'string', maxLength: _this.sizeInfo.titleCount, width: _this.sizeInfo.titleWidth},
                { id: 'ReceiveTime', title: '接收时间', type: 'date', width: 150, autoTitle: true },                
                { id: 'HandleTime', title: '处理时间', type: 'date', width: 150, hide: true },
                { id: 'InitiatorName', title: '来自', type: 'string', width: 150, hide: false }
            ]
        }
        _this.InitGrid(grid);
        //cbox
        $("#cbs .sp").change(function () {
            _this.Search();
        });
        //countStr
        $(".clbl").click(function () {
            var cur = this.id.split('_');
            _this.Pager.CountWhere = this.id;
            var elem = document.getElementById(cur[0]); // $("#" + cur[0]);
            _this.SetTab(_this, elem);
            _this.SwapGrid(cur[0]);
           
        });
    },
    openWindow: function (db) {
        var _this = this;
        db.reload = function () { _this.PageNext(_this.Pager.nowPage) };
        parent.homeCommon.OpenTask(db);
       
    },
    GetCountInfo: function () {
        var _this = this;
        var param = { url: 'TaskAction.ashx?action=CountInfo', data: {} };
        param.callback = function (countInfo) {

            for (var i = 0; i < 8; i++) {
                var elem = $("#ct" + i);
                if (elem.length < 1) continue;
                elem.html(countInfo[i]);
            }
        };
        _this.GetAjax(param);

    },
    SetTab: function (_this,elem) {
        if (_this.backTab != null) {
            $("#" + _this.backTab).removeClass(_this.backTab + "_sel");
        }
        $(elem).addClass(elem.id + "_sel");
        _this.backTab = elem.id;
        //判断数据行选中时是否加手势 
        _this.Grid.pointer = elem.id == "send" ? false : true;
        //判断状态切换时是否显示处理时间
        _this.Grid.columns[12].hide = elem.id == "undo" ? true : false;
        //判断状态切换是否显示发送人
        _this.Grid.columns[13].hide = elem.id == "undo" ? false : true;
    },
    SwapGrid: function (type) {
        var _this = this;
        if (type == "undo")_this.tanIdx = 1;
        if (type == "do")_this.tanIdx = 2;
        if (type == "send") _this.tanIdx = 3;
        _this.Pager.nowPage = 1;
        _this.Search();
    },
    InitGrid: function (opt) {
        var _this = this;
        _this.Grid.First = false;
        _this.Grid.Url = opt.url;
        _this.Grid.pointer = opt.pointer;
        _this.Grid.rowClick = opt.rowClick;
        _this.Grid.columns = opt.columns;
        _this.InitGridTmp(opt.id);
        
        _this.Pager = opt.pageWhere || {};
        _this.Pager.pageSize = opt.pageSize;
        _this.Pager.nowPage = 1;
        _this.GridAjax();
    },
    InitGridTmp: function (conID) {
        var tmp =$( ' <div class="task-grid" > <div style=" width:100%;">' +
                  ' <table cellpadding="0" cellspacing="0"> <thead> </thead><tbody></tbody></table></div>'+
                  '<div class="foot"><div class="pageinfo">' +
                  '<div id="taskfoot_lbl"></div>' +
                  '<a class="btn btn-default  btn-xs e-page-turning  " href="javascript:void(0);"  title="上一页" id="taskfoot_back" ><i class="glyphicon glyphicon-menu-left" ></i></a>' +
                  '<a class="btn btn-default  btn-xs e-page-turning  " href="javascript:void(0);"  title="下一页" id="taskfoot_next"><i class="glyphicon glyphicon-menu-right"></i></a>' +
                  '</div></div></div>');
        $("#" + conID).append(tmp);
        var Grid = this.Grid;
        Grid.columnTmp = $(tmp.find("thead"));
        Grid.rowsTmp = $(tmp.find("tbody"));
        Grid.lable = $("#taskfoot_lbl");
        Grid.back = $("#taskfoot_back");
        Grid.next = $("#taskfoot_next");
    },
    InitColumnTmp: function (columns) {
        var _this = this;
        _this.Grid.columnTmp.html("");
        var tr = $("<tr></tr>");
        $.each(columns, function (idx, c) {
            if (c.hide && c.hide == true) return true;            
            var td = $("<td>" + c.title + "</td>");
            if (c.autoTitle) _this.autoTitle = td;
            if (c.width) td.width(c.width);
            tr.append(td);
        });
        _this.Grid.columnTmp.append(tr);
    },
    InitRows: function () {
        var _this = this;
        _this.InitColumnTmp(_this.Grid.columns);
        _this.Grid.rowsTmp.html("");
        _this.Grid.lable.html("");
        if (_this.Grid.data == null) return;
        $.each(_this.Grid.data, function (idx, row) {
            var tr = $("<tr></tr>");
            //绑定行单击事件
            if (_this.Grid.rowClick) tr.click(function () { _this.Grid.rowClick(row); });

            $.each(_this.Grid.columns, function (idx, c) {
                //隐藏跳过
                if (c.hide && c.hide == true) return true;
                var cellCon = row[c.id];
                //最大长度处理
                if (c.maxLength) {
                    cellCon = _this.FliterStr(cellCon);
                    cellCon = cellCon.length > c.maxLength ?
                        '<a title="' + cellCon + '">' + cellCon.substring(0, c.maxLength) + "…</a>" : cellCon;
                }              
                var td = $("<td>" + cellCon + "</td>");
                //是否加手势
                //if (_this.Grid.pointer) 
                td.css("cursor", "pointer");

                tr.append(td);
            });
            _this.Grid.rowsTmp.append(tr);
        });
    },
    FliterStr:function(con){
        con = con.replace(/<\/?[^>]*>/g, '');//去除HTML TAG
        con = con.replace(/[|]*/g, '');
        con = con.replace(/:/g, "：");
        con = con.replace("等待您的处理", "");

        return con;
    },
    IsMessage: function (db) {
        return db.TransferKey.indexOf('Mg') > -1 || db.IsMessage == "true";
    },
    InitPageInfo: function () {
        var _this = this;
        var lbl ='<span>'+ _this.Pager.nowPage + "</span>/<span>" + _this.Pager.pageCount+"</span>";
        _this.Grid.lable.append(lbl);
        //事件只初始化一次
        if (_this.Grid.First) return;
        _this.Grid.back.click(function () {
            _this.PageNext(_this.Pager.nowPage - 1);
        });
        _this.Grid.next.click(function () {
            _this.PageNext(_this.Pager.nowPage + 1);
        });
    },
    PageNext: function (pageIndex) {
        var _this = this, pager = _this.Pager;
        //分页界限限制
        if (pageIndex < 1 || pageIndex > pager.pageCount) return;
        pager.nowPage = pageIndex;
        _this.GridAjax();
      
    },
    GetAjax: function (param) {
		/**
        $.ajax({
            type: "Post",
            url: param.url,
            data: param.data,
            dataType: "json",
            success: function (result) {
                param.callback(result);
            }
        });
		**/
    },
    GridAjax: function (_url) {
        var _this = this;    
        var param = { url: _this.Grid.Url, data: {} };
        param.data.CsTaskWhere = JSON.stringify(this.Pager);
        param.callback = function (_pager) {          
            _this.Pager.pageSize = _pager.pageSize;
            _this.Pager.nowPage = _pager.nowPage;
            _this.Pager.pageCount = _pager.pageCount;
            _this.Pager.recordCount = _pager.recordCount;
            _this.Grid.data = _pager.exhibitDatas;
            _this.InitRows();
            _this.InitPageInfo();
            _this.Grid.First = true;

            var autoTitle = _this.tanIdx == "3" ? "发送时间" : "接收时间";
            _this.autoTitle.html(autoTitle);
            if (_this.Inside) return;
         
            if (_pager.pageCount <= 1) {
                $(".pageinfo").hide();
            }
            else {
                $(".pageinfo").show();
            }
        };
        _this.GetAjax(param);
        _this.GetCountInfo();
    },
    Search: function () {
        var _this = this;
        _this.Pager.Status = _this.tanIdx;
        _this.Pager.Warning = _this.GetCheckVal();
        _this.Pager.TypeID = $("#tasktypes").val();
        _this.Pager.Categories = $("#strkey").val();
        _this.Pager.StartTime=$("#startDate").val();
        _this.Pager.EndTime= $("#endDate").val();
        _this.GridAjax();
    },
    GetCheckVal: function () {
        var result = "";
        $('input[name="cbstatus"]:checked').each(function (idx, c) {
            result += c.value+",";
        });
        return result==""? "":result.substring(0,result.length-1);
    }

};