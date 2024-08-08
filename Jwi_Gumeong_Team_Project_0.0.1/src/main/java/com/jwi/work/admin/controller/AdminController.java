package com.jwi.work.admin.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.admin.entity.LoginRequest;

@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@PostMapping("/login")
	public ResponseEntity<?> adminLogin(@RequestBody LoginRequest loginRequest){
		
		System.out.println(loginRequest.getUsername());
		
		return ResponseEntity.ok(loginRequest);
	}
	
}
