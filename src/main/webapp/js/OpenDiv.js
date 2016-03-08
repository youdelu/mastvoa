var docEle = function () {
    return document.getElementById(arguments[0]) || false;
}
function openNewDiv(url,width,height,noclose,title) {
    var _id = "tmpdiv";
    var _dragId = "selectTitle";
    //var m = "mask";
    if (docEle(_id)) document.body.removeChild(docEle(_id));
    // if (docEle(m)) document.removeChild(docEle(m));
    var divHeight = 475;
    var divWidth = 700;
    
    if (typeof width!="undefined") {
        divWidth = width;
    }
    var mytitle = "";

    if (typeof height != "undefined") {
        divHeight = height;
        if (height == 475 ) {
            mytitle = "&emsp;人员选择";
        }       
    }

    var closeTxt = '<td width="20%" align="right" onclick="document.body.removeChild(docEle(\'' + _id + '\'))" style="cursor: pointer;color:red;font-weight:bold;padding-right:10px;">×</td>';
    if (typeof noclose != "undefined"&&noclose==1) {
        closeTxt = '<td></td>';
    }
    
    if (typeof title != "undefined") {
        mytitle = title;
    }
   
    var newDiv = document.createElement("div");
    newDiv.id = _id;
    var positionType = "fixed";
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf("isoffice") > -1 || /(iPhone|Android|iPad)/i.test(userAgent) )  //修复手机端放大选人操作无效
    {
        positionType = "absolute";
    }
    newDiv.style.position = positionType;
    newDiv.style.zIndex = "99999999";
    newDiv.style.width = divWidth + "px";
    newDiv.style.height = divHeight + "px";
    var bodyWidth = document.body.clientWidth;
    var bodyHeight = document.body.clientHeight;
    //var bodyScrollTop=document.body.scrollTop;
    //var bodyScrollLeft= document.body.scrollLeft;
    if (document.documentElement.clientHeight) {
        bodyWidth = document.documentElement.clientWidth;
        bodyHeight = document.documentElement.clientHeight;
        //bodyScrollTop=document.documentElement.scrollTop;
       // bodyScrollLeft=document.documentElement.scrollLeft;
    }
    var top = (bodyHeight - divHeight) / 2;//+ bodyScrollTop;
    newDiv.style.top = top < 0 ? "0px" : top+"px";
    var left = (bodyWidth - divWidth) / 2;//+ bodyScrollLeft;
    newDiv.style.left = left < 0 ? "0px" : left + "px";
   
    newDiv.style.backgroundColor = "white";
    //屏幕居中  
    //newDiv.style.background = "EEEEEE";
    //newDiv.style.border = "1px solid #ccc";
   // newDiv.style.padding = "5px";
    newDiv.innerHTML = '<table style="width: 100%; height: 100%;border:#e0e0e0 1px solid;"  cellpadding="0" cellspacing="0">' +
                '<tbody><tr>'+
                   ' <td height="25px" style="background-color:#e2e0e1;">' +
                       ' <table width="100%" border="0" cellspacing="0" cellpadding="0">'+
                            '<tbody><tr >' +
                                '<td width="79%" id="' + _dragId + '" style="cursor: move;font-family:\'Microsoft YaHei\', \'宋体\',arial, serif;font-size:14px " align="left">' +
                                  '  <strong>'+mytitle+'</strong></td>' +closeTxt+
                           ' </tr>'+
                       ' </tbody></table>'+
                    '</td>'+
               ' </tr>'+
               ' <tr>'+
                   ' <td>'+
                   ' <iframe frameborder=0 width="' + divWidth + '" height="' + (divHeight-25 ) + '" marginheight=0 marginwidth=0 scrolling=auto src="' + url + ' "></iframe>' +
                  '  </td>'+
              '  </tr>'+
              '</tbody></table><iframe frameborder=0 scrolling=no style="background-color:transparent; position: absolute; z-index: -1; width: 100%; height: 100%; top: 0;left:0;"></iframe>';
    document.body.appendChild(newDiv);
    dragDiv(docEle(_id), docEle("selectTitle"));
    //mask图层  
    //var newMask = document.createElement("div");
    //newMask.id = m;
    //newMask.style.position = "absolute";
    //newMask.style.zIndex = "1";
    //newMask.style.width = document.body.scrollWidth + "px";
    //newMask.style.height = document.body.scrollHeight + "px";
    //newMask.style.top = "0px";
    //newMask.style.left = "0px";
    //newMask.style.background = "#000";
    //newMask.style.filter = "alpha(opacity=40)";
    //newMask.style.opacity = "0.40";
    //document.body.appendChild(newMask);
    //docutmentwww.codefans.net  
    //关闭mask和新图层  
    /*var newA = document.createElement("a");
    newA.href = "#";
    newA.innerHTML = "关闭";
    newA.id = "tmpClose";
    newA.onclick = function () {
       alert( window.parent.document.getElementsByTagName("body")[0].innerHTML);
       // document.body.removeChild(docEle(_id));
        //document.body.removeChild(docEle(m));
        return false;
    }
    newDiv.appendChild(newA);*/
}

function dragDiv(o, ot) {
    ot.onmousedown = function (a) {
        var d = document; if (!a) a = window.event;
        var x = a.layerX ? a.layerX : a.offsetX, y = a.layerY ? a.layerY : a.offsetY;
        if (ot.setCapture)
            o.setCapture();
        else if (window.captureEvents)
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        d.onmousemove = function (a) {
            if (!a) a = window.event;

            if (!a.pageX) a.pageX = a.clientX;
            if (!a.pageY) a.pageY = a.clientY;           

            var bodyWidth = document.body.clientWidth;
            var bodyHeight = document.body.clientHeight;
            if (document.documentElement.clientHeight) {
                bodyWidth = document.documentElement.clientWidth;
                bodyHeight = document.documentElement.clientHeight;
            }
           
            var divObj = o;
            var maxRight = bodyWidth - divObj.clientWidth;
            var maxTop = bodyHeight - divObj.clientHeight;

            var tx = a.pageX - x, ty = a.pageY - y;         
            if (tx < 0) {
                tx = 0;
            }
            else if (tx > maxRight) {
                tx = maxRight;
            }

            if (ty < 0) {
                ty = 0;
            }
            else if (ty > maxTop) {
                ty = maxTop;
            }        
            o.style.left = tx+"px";
            o.style.top = ty + "px";
        };
        d.onmouseup = function () {
            if (o.releaseCapture)
                o.releaseCapture();
            else if (window.captureEvents)
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            d.onmousemove = null;
            d.onmouseup = null;           
        };
    };
}
