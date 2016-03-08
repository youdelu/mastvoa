/// <reference path="../../Bootstrap/js/bootstrap.js" />
/// <reference path="../../Jquery/jquery.js" />

/**
 * 用途：弹出层插件，基于Bootstrap3封装
 * 作者：魏巍
 * 日期：2015-04-15
 * 修改：蒋政
 * 日期：2015-08-20
 * 版本：1.0
 */
; (function ($) {
    $.fn.SfDialog = function (options) {
        if (typeof options == "string") {
            return $.fn.SfDialog.methods[options](this);
        }

        options = options || {};
        var opts = $.extend({}, $.fn.SfDialog.defaults, options);

        var _dialog = CreateDialog(this, opts);
        return _dialog;
    }

    //定义默认属性
    $.fn.SfDialog.defaults = $.extend({}, {
        url: null,
        width: null,
        data: null,
        backdrop: 'static',//点击Dialog以外的区域是否要自动关闭？默认是static不关闭，设置成true为可关闭。
        keyboard: false,//键盘按ESC关闭Dialog。默认是false不关闭，设置成true为可关闭。
        loadSucceed: function () { }
    });

    //定义方法
    $.fn.SfDialog.methods = {
        close: function (_this) {//关闭窗口
            $(_this).modal("hide");
        }
    };

    function CreateDialog(target, opts) {
        var _html
        = ''
        + '<div class="dialog modal fade">'
        + '<div class="modal-dialog">'
        + '<div class="modal-content">'
        + '</div>'
        + '</div>'
        + '</div>'
        ;
        var $dlg = $(_html);

        if (opts.width !== null) {
            $('.modal-dialog', $dlg).width(opts.width + 'px');
        }


        $(target).append($dlg);
        if (opts.url !== null) {
            $.ajax({
                type: "post",
                async: false,
                url: opts.url,
                data: opts.data,
                cache: false,
                global: false, //屏蔽全局事件,防止启动BlockUI
                success: function (data) {
                    if (data.flag == -1) {
                        SfBug(data.data);
                    }
                    else {
                        $(".modal-content", $dlg).append(data);
                        $dlg.modal({
                            backdrop: opts.backdrop,
                            keyboard: opts.keyboard
                        });
                        //opts.loadSucceed();//2015-08-31 sjl 修改，兼容ie8
                        $dlg.on('shown.bs.modal', function () {
                            $(document).off('focusin.modal');
                            opts.loadSucceed();
                        });

                        $dlg.on('hidden.bs.modal', function () {
                            $dlg.remove();
                            $(".modal").css({ 'overflow-y': 'auto' });
                            $(".modal-open").css({ 'overflow': 'auto' });
                        });
                    }
                }
            });
        }
        return $dlg;
    }
})(jQuery);