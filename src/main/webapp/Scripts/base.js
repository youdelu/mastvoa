function loadCss(path) {
    //var head = document.getElementsByTagName("head")[0];
    //var link = document.createElement("link");
    //link.href = path;
    //link.rel = "stylesheet";
    //link.type = "text/css";
    //head.appendChild(link);
    document.write("<link href='"+path+"' rel='stylesheet' type='text/css'>");
};
function getCookie(name) {
    /// <summary>
    /// 获取cookie值
    /// </summary>
    /// <param name="name"></param>
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function loadScript(path, charset) {
    if (typeof charset == "undefined") {
        charset = "";
    }
    else {
        charset = "charset='" + charset + "'";
    }
    document.write("<script src='" + path + "' type='text/javascript' " + charset + "></script>");
};
if (typeof isLoadBaseJs == "undefined") {
    var js = document.scripts, jsPath = js[js.length - 1].src;
    var path = jsPath.substring(0, jsPath.lastIndexOf("/") + 1).toLowerCase().replace("/scripts",'');
    isLoadBaseJs = 1;
    // var path = "/";
    //if (typeof window.top.rootPath != "undefined") {
    //    path = window.top.rootPath;
    //}
    //else {
    //    try {
    //        var myOpener = window.opener;
    //        if (typeof myOpener != "undefined" && myOpener!=null) {
    //            if (typeof myOpener.top.rootPath != "undefined") {
    //                path = myOpener.top.rootPath;
    //            }
    //        }
    //    } catch (e) {
    //    }
    //}
    loadCss(path + "Skins/Common/bootstrap.min.css");
    loadCss(path + "Skins/Common/main.min.css");
    loadCss(path + "Skins/Common/base.css");
    loadCss(path + "js/layer/skin/layer.css");
    
     var  skinId = getCookie("SKINID");
        switch (skinId) {
            case "1":
                loadCss(path + "Skins/Grey/Style.css");
                break;
            case "2":
                loadCss(path + "Skins/Blue/Style.css");
                break;
            case "3":
                loadCss(path + "Skins/Dark/Style.css");
                break;
            case "4":
                loadCss(path + "Skins/Purple/Style.css");
                break;
            case "5":
                loadCss(path + "Skins/Pink/Style.css");
                break;
            case "6":
                loadCss(path + "Skins/Yellow/Style.css");
                break;
            default:
                loadCss(path + "Skins/Dark/Style.css");
        }
    var browserVersion = navigator.appVersion;
    var isIE8 = (browserVersion.indexOf("MSIE 8") > -1 || browserVersion.indexOf("MSIE 7") > -1);
    if (isIE8) {
        loadCss(path + "Skins/Common/ie8checkbox.css");
        loadScript(path + "Scripts/html5shiv.min.js");
        loadScript(path + "Scripts/respond.min.js");
    }
    else if (navigator.userAgent.indexOf("isoffice")>-1)    //手机端
    {
        loadCss(path + "Skins/Common/ie8checkbox.css");
    }
    loadScript(path + "js/jquery.js");
    loadScript(path + "Scripts/select2/select2.js", "UTF-8");
    loadScript(path + "Scripts/bootstrap.min.js");
    loadScript(path + "js/FixTitle.js");
    loadScript(path + "js/layer/layer.min.js");
    loadScript(path + "Attendance/Js/layer.js");
    loadScript(path + "Scripts/pageinit.js");
    //fix layer.path in ie 8
    if (isIE8) {
        loadScript(path + "js/layer/ie8path.js");
    }
}

