package com.jwi.work.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

<<<<<<< HEAD
=======
//운영자는 URL /admin/**
//관리자 URL /manager/**
//유저 URL /user/**
//로그인페이지 URL  /login

import org.springframework.web.bind.annotation.RequestParam;

>>>>>>> a67a9b07998486457d1c6559176d840e7a96d098
import com.jwi.work.mapper.UserMapper;
import com.jwi.work.service.UserService;

@Controller
@RequestMapping("/user/*")
public class UserController {
	@Autowired
<<<<<<< HEAD
=======

>>>>>>> a67a9b07998486457d1c6559176d840e7a96d098
	private UserService service;
	private UserMapper mapper;
	@PostMapping("/signUp")
	public String signUp(@RequestParam("userName") String userName,@RequestParam("userEmail") String userEmail,@RequestParam("userPw") String userPw,@RequestParam("userGender") Character userGender,@RequestParam("userAge") int userAge, Model model) {
		service.InsertUserData(userName,userEmail,userPw,userGender,userAge);
		return "home";
		
	}
	@GetMapping("/signUp")
	public void signUp() {

	}
	@PostMapping("/login")
	public String login(@RequestParam("userEmail") String userEmail,@RequestParam("userPw") String userPw, Model model) {
		if(service.userCheck(userEmail, userPw)) {
			return"mainPage";
		}else {
			return"home";
		}
		
	}
	@GetMapping("/login")
	public void login() {
		
	}
	
<<<<<<< HEAD
}
=======
}
>>>>>>> a67a9b07998486457d1c6559176d840e7a96d098
