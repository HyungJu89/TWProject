package com.jwi.work.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jwi.work.dto.loginDto.LoginDto;
import com.jwi.work.service.AdminService;

import lombok.AllArgsConstructor;

//운영자는 URL /admin/**
//관리자 URL /manager/**
//유저 URL /user/**
//로그인페이지 URL  /login

@Controller
@RequestMapping("/admin/*")
public class AdminController {
	

	

	@GetMapping("/login")
	public String adminLogin() {
		return "admin/login";
	}
	
	@PostMapping("/login")
	public String adminLoginProc(LoginDto login) {

		
		
		
		return "";
	}
	
	
	@GetMapping("/home")
	public String adminHome() {
		
		return "admin/home";
	}
}
