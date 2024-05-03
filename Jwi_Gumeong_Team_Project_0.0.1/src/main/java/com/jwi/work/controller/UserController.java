package com.jwi.work.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jwi.work.service.JwiService;

//운영자는 URL /admin/**
//관리자 URL /manager/**
//유저 URL /user/**
//로그인페이지 URL  /login


@Controller
@RequestMapping("/user/*")
public class UserController {
	@Autowired
	private JwiService service;
	@GetMapping("/signUp")
	public void signUp(Model model) {

	}
	@GetMapping("/signUpProc")
	public void signUpProc(Model model) {
		
	}


}
 