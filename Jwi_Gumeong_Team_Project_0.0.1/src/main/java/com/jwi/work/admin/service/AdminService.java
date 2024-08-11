package com.jwi.work.admin.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.jwi.work.admin.util.JwtUtil;

@Service
public class AdminService {
	
	@Autowired
	SecurityService adminLoginService; 
	
	// Admin쪽으로 POST 요청 들어오면 처리
	@Autowired
	private AuthenticationManagerBuilder authenticationManagerBuilder;
	
	// 데이터베이스에 직접 insert 하는거보다 여기에서 인코딩 거치고 넣는게 더 나을듯?
	public String loginJWT(Map<String,String> data) {
		var authToken = new UsernamePasswordAuthenticationToken(
				data.get("adminName"), data.get("adminPassWord")
			);
		System.out.println(authToken);
		var auth = authenticationManagerBuilder.getObject().authenticate(authToken);
		SecurityContextHolder.getContext().setAuthentication(auth);
		//auth 변수 사용하고싶으면 이렇게 하면됨
		var jwt = JwtUtil.createToken(SecurityContextHolder.getContext().getAuthentication());
		
		return jwt;
	}
}
