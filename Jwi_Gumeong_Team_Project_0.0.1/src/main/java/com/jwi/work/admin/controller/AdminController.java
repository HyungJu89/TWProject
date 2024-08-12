package com.jwi.work.admin.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.admin.service.AdminService;
import com.jwi.work.admin.service.SecurityService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	SecurityService adminLoginService; 
	
	@Autowired
	AdminService adminService;
	
	// 로그인시 작동
	@PostMapping("/login")
	public String adminLogin(@RequestBody Map<String,String> data , HttpServletResponse response){
		// 쿠키설정
		var cookie = new Cookie("jwt" , adminService.loginJWT(data));
		cookie.setMaxAge(10);
		// 쿠키를 외부로 조작하는걸 힘들게 만들어줌
		cookie.setHttpOnly(true);
		cookie.setPath("/");
		response.addCookie(cookie);
		return adminService.loginJWT(data);
	}
	// 처음에 코드 입력하게 한 다음에 그거 필터 통해서 내부 코드랑 비교하고 jwt 발급하는것도 괜찮은 방법일꺼같다.
	// 그러면 첫 코드 + 로그인시 코드 2중 필터이기떄문에 안전할꺼같음
	@GetMapping("/")
	public boolean adminMain(@RequestBody String data) {
		
		return true;
	}
}