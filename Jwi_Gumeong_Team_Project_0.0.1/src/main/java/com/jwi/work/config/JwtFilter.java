package com.jwi.work.config;

import java.io.IOException;
import java.util.Arrays;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.jwi.work.admin.util.JwtUtil;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// OncePerRequestFilter 1회만 실행됨
public class JwtFilter extends OncePerRequestFilter {

	// 필터코드 
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		Cookie[] cookies = request.getCookies();
		if (cookies == null) {
			System.out.println("쿠키가 없습니다!");
			filterChain.doFilter(request, response);
			return;
		}

		var jwtCookie = "";
		for (int i = 0; i < cookies.length; i++) {
			if (cookies[i].getName().equals("jwt")) {
				jwtCookie = cookies[i].getValue();
			}
		}
		
		Claims claim;
		
	    try {
	      claim = JwtUtil.extractToken(jwtCookie);
	    } catch (Exception e) {
	    	System.out.println("jwt가 변조되었거나 비정상적입니다!");
	      filterChain.doFilter(request, response);
	      return;
	    }
	    
	    var authToken = new UsernamePasswordAuthenticationToken(claim,null);
	    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	    SecurityContextHolder.getContext().setAuthentication(authToken);
	    
	    // 이제 여기에서 로그인 후처리 코드 하면될듯?
	    
		filterChain.doFilter(request, response);
	}
}