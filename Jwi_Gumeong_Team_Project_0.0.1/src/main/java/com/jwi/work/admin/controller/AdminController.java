package com.jwi.work.admin.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.admin.service.SecurityService;
import com.jwi.work.admin.service.AdminService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	SecurityService adminLoginService; 
	
	@Autowired
	AdminService adminService;
	
	@PostMapping("/login")
	public String adminLogin(@RequestBody Map<String,String> data , HttpServletResponse response){
		var cookie = new Cookie("jwt" , adminService.loginJWT(data));
		cookie.setMaxAge(10);
		cookie.setHttpOnly(true);
		cookie.setPath("/");
		response.addCookie(cookie);
		return adminService.loginJWT(data);
	}
	
}