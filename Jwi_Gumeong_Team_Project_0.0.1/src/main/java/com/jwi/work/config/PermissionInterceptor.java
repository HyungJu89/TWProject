/*
 * package com.jwi.work.config;
 * 
 * import java.io.IOException;
 * 
 * import org.springframework.stereotype.Component; import
 * org.springframework.web.servlet.HandlerInterceptor; import
 * org.springframework.web.servlet.ModelAndView;
 * 
 * import jakarta.servlet.http.HttpServletRequest; import
 * jakarta.servlet.http.HttpServletResponse; import
 * jakarta.servlet.http.HttpSession;
 * 
 * @Component public class PermissionInterceptor implements HandlerInterceptor {
 * 
 * @Override public boolean preHandle(HttpServletRequest request,
 * HttpServletResponse response, Object handler) throws IOException {
 * 
 * HttpSession session = request.getSession(); Integer userId = (Integer)
 * session.getAttribute("userId"); Integer role = (Integer)
 * session.getAttribute("userRole");
 * 
 * // /user/signin/view String uri = request.getRequestURI();
 * 
 * // 로그인이 되어 있는 경우 if (userId != null) { // 회원가입 페이지, 로그인 페이지를 접근할 경우 // user 로
 * 시작하는 페이지 접근할 경우 if (uri.startsWith("/user")) { // 메인 화면으로 이동
 * response.sendRedirect("/destination/main/view"); return false; } // 관리자 권한이
 * 없을 경우 if (role != 0) { // 관리자 페이지에 접근할 경우 if (uri.startsWith("/admin")) { //
 * 메인페이지로 이동 response.sendRedirect("/destination/main/view"); return false; } }
 * } else { // 로그인이 되어 있지 않은 경우 // user로 시작하지 않는 페이지에 접근할 경우 if
 * (!uri.startsWith("/user")) { // 로그인 페이지로 이동
 * response.sendRedirect("/user/signin/view"); return false; } } return true; }
 * 
 * @Override public void postHandle(HttpServletRequest request,
 * HttpServletResponse response, Object handler, ModelAndView modelAndView) { }
 * 
 * @Override public void afterCompletion(HttpServletRequest request,
 * HttpServletResponse response, Object handler, Exception ex) { } }
 */