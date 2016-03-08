 function compLogin(){
	  i=101;
	  $("#loginbtn span").text("登录");
	  $("#loginbtn div").css("width","0px");
  }
  function SetProgress(progress) { 
		if (progress)
			$("#loginbtn > div").css("width", String(progress) + "%");
	}
	var i = 0; 
	function doProgress() { 
	if(i==100){
		$("#loginbtn span").text("登录成功");
	}
	if (i <= 100) { 
		setTimeout("doProgress()", 30); 
		SetProgress(i); 
		i++; 
	} 
} 
//设置Cookie
	function setCookie(cookieName, cookieValue, seconds, path, domain, secure) {
		if(localStorage) {
			localStorage.setItem(cookieName,cookieValue);
		} else {
			var expires = new Date();
			expires.setTime(expires.getTime() + seconds);
			document.cookie = escape(cookieName) + '=' + escape(cookieValue)
				+ (expires ? '; expires=' + expires.toGMTString() : '')
				+ (path ? '; path=' + path : '/')
				+ (domain ? '; domain=' + domain : '')
				+ (secure ? '; secure' : '');
		}		
	}

	//获取Cookie
	function getCookie(name) {
		if(localStorage) {
			return localStorage.getItem(name);
		} else {
			var cookie_start = document.cookie.indexOf(name);
			var cookie_end = document.cookie.indexOf(";", cookie_start);
			return cookie_start == -1 ? '' : decodeURI(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
		}
	}
