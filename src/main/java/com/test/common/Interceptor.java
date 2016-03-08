package com.test.common;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.test.entity.User;
import com.test.util.Ht;

public class Interceptor extends HandlerInterceptorAdapter {
	private final Logger log = LoggerFactory.getLogger(Interceptor.class);

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		String requestUri = request.getRequestURI();
		String contextPath = request.getContextPath();
		String url = requestUri.substring(contextPath.length());

		log.info("requestUri:" + requestUri);
		log.info("contextPath:" + contextPath);
		log.info("url:" + url);
		User user = (User) request.getSession().getAttribute("user");
		if (user != null) {
				return true;
		} 
		if(url.contains("menu")||url.contains("system")||url.contains("backend")||url.contains("frontend")||url.contains("rbac")){
			Ht.p(response, "<script>var winObj = window.open('/demo/login.do?type=mini','newwindow','height=372,width=382,top=280,left=700,toolbar=no,menubar=no,scrollbars=no,resizable=no, location=no,status=no');var loop = setInterval(function() {if(winObj.closed) {clearInterval(loop);location.reload(); } }, 500); </script><h1>您长时间未操作或系统已重启，会话已过期，请重新登录系统！</h1>");
		}else{
			Ht.p(response, "<script>location.href=\"/demo/login.do\"</script>");
		}
		return false;
	}

	/**
	 * 在业务处理器处理请求执行完成后,生成视图之前执行的动作 可在modelAndView中加入数据，比如当前时间
	 */
	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		if (modelAndView != null) { 
		}
	}

	/**
	 * 在DispatcherServlet完全处理完请求后被调用,可用于清理资源等
	 * 
	 * 当有拦截器抛出异常时,会从当前拦截器往回执行所有的拦截器的afterCompletion()
	 */
	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
	}

}
