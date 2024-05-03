package com.jwi.work.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

//운영자는 URL /admin/**
//관리자 URL /manager/**
//유저 URL /user/**
//로그인페이지 URL  /login

@Controller
public class HomeController {

	@GetMapping("/")
	public String board(Model model) {
		
		
	return "home";
	}

	

}
