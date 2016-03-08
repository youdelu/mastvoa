//阻止滚动条冒泡事件
(function ($) {
    $.fn.preventScroll = function () {
        var _this = this.get(0);
        if (navigator.userAgent.toLowerCase().indexOf("firefox") >-1) {
            _this.addEventListener('DOMMouseScroll', function (e) {
                _this.scrollTop += e.detail > 0 ? 60 : -60;
                e.preventDefault();
            }, false);
        } else {
            _this.onmousewheel = function (e) {
                e = e || window.event;
                _this.scrollTop += e.wheelDelta > 0 ? -60 : 60;
                e.returnValue = false;
                try {
                    e.preventDefault();
                } catch (ee) {

                }
            };
        }
        return this;
    };
})(jQuery);