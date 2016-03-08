/**
 * @功能描述：封装一个弹出层插件基于Bootstrap3封装(这是一个嵌入IFrame的弹出层)
 * @前置插件：Bootstrap3
 * @开 发 者：魏巍
 * @开发日期：2015-12-23
 * @version 1.0
 */
; (function ($) {
    $.fn.SfDialog2 = function (options) {
        if (typeof options == "string") {
            return $.fn.SfDialog2.methods[options](this);
        }

        options = options || {};
        var opts = $.extend({}, $.fn.SfDialog2.defaults, options);

        var _dialog = CreateDialog(this, opts);
        return _dialog;
    }

    //定义默认属性
    $.fn.SfDialog2.defaults = $.extend({}, {
        id: null,
        url: null,
        width: null,
        height: null,
        data: null,
        backdrop: 'static',//点击Dialog以外的区域是否要自动关闭？默认是static不关闭，设置成true为可关闭。
        keyboard: false,//键盘按ESC关闭Dialog。默认是false不关闭，设置成true为可关闭。
        loadSucceed: function () { }
    });

    //定义方法
    $.fn.SfDialog2.methods = {
        close: function (_this) {//关闭窗口
            $(_this).modal("hide");
        }
    };

    function CreateDialog(target, opts) {
        var _html
        = ''
        + '<div id="dlg1" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog">'
        + '<div class="modal-dialog modal-lg">'
        + '<div class="modal-content">'
        + '<iframe height="100%" width="100%" frameborder="0"></iframe>'
        + '</div>'
        + '</div>'
        + '</div>'
        ;
        var $dlg = $(_html);

        if (opts.id !== null) {
            $dlg.attr('id', opts.id);
        }

        if (opts.width !== null) {
            $('.modal-content', $dlg).width(opts.width + 'px');
        }

        if (opts.height !== null) {
            $('.modal-content', $dlg).height(opts.height + 'px');
        }

        $(target).append($dlg);

        if (opts.url !== null) {
            $('iframe', $dlg).attr('src', opts.url);
            $dlg.modal({
                backdrop: opts.backdrop,
                keyboard: opts.keyboard
            });

            $dlg.on('hidden.bs.modal', function () {
                $dlg.remove();
                $(".modal").css({ 'overflow-y': 'auto' });
                $(".modal-open").css({ 'overflow': 'auto' });
            });
        }

        return $dlg;
    }
})(jQuery);