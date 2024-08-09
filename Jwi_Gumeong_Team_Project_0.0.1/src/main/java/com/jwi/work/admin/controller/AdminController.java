package com.jwi.work.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.admin.entity.Admin;
import com.jwi.work.admin.service.AdminLoginService;

@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	AdminLoginService adminLoginService; 
	
	@PostMapping("/login")
	public ResponseEntity<?> adminLogin(@RequestBody Admin loginRequest){
		
		System.out.println("여기옴?");
		System.out.println(loginRequest.getId());
		adminLoginService.loginJWT(loginRequest.getId());
		return ResponseEntity.ok(adminLoginService.loadUserByUsername(loginRequest.getId()));
	}
	
}
