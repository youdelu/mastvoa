Date.prototype.format = function (fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份         
		"d+": this.getDate(), //日         
		"h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
		"H+": this.getHours(), //小时         
		"m+": this.getMinutes(), //分         
		"s+": this.getSeconds(), //秒         
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度         
		"S": this.getMilliseconds() //毫秒         
	};
	var week = {
		"1": "一",
		"2": "二",
		"3": "三",
		"4": "四",
		"5": "五",
		"6": "六",
		"0": "日"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + week[this.getDay() + ""]);
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}
/*************************************************************
 * 	将时间转换成时间戳
 *  例如：2011-03-16 16:50:43
 *************************************************************/
function transdate(endTime) {
    var date = new Date();
    date.setFullYear(endTime.substring(0, 4));
    date.setMonth(endTime.substring(5, 7) - 1);
    date.setDate(endTime.substring(8, 10));
    date.setHours(endTime.substring(11, 13));
    date.setMinutes(endTime.substring(14, 16));
    date.setSeconds(endTime.substring(17, 19));
    return Date.parse(date) / 1000;
}
/*************************************************************
 * 	时间格式化
 *	thisTime：当前时间戳
 *	passTime：创建时间戳
 *************************************************************/
function timeFormat(thisTime, passTime) {
     //console.log(thisTime+"aa")
     //console.log(passTime+"bb");

    var start = transdate(thisTime);
    var pass = transdate(passTime);
    var dTime = parseInt((start - pass) / 60);
    var year = 518400
    var month = 43200;
    var day = 1440;
    var hours = 60;
    var str = '';

    if (dTime > year) {
        var time = parseInt(dTime / year);
        str = passTime;
    } else if (dTime > month) {
        var time = parseInt(dTime / month);
        str = time + '个月前';
    } else if (dTime > day) {
        var time = parseInt(dTime / day);
        str = time + '天前';
    } else if (dTime > hours) {
        var time = parseInt(dTime / hours);
        str = time + '小时前';
    } else {
        str = dTime + '分钟前';
    }
    if (dTime <= 0) {
        str = '刚刚';
    };
    return str;
}