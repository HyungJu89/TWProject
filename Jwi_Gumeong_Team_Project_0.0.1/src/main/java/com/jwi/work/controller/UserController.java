package com.jwi.work.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
<<<<<<< HEAD

import com.jwi.work.service.JwiService;

//운영자는 URL /admin/**
//관리자 URL /manager/**
//유저 URL /user/**
//로그인페이지 URL  /login

=======
import org.springframework.web.bind.annotation.RequestParam;

import com.jwi.work.mapper.UserMapper;
import com.jwi.work.service.UserService;
>>>>>>> 38e516743c7173d2627abf51c8f8fa7a9f277373

@Controller
@RequestMapping("/user/*")
public class UserController {
	@Autowired
<<<<<<< HEAD
	private JwiService service;
<<<<<<<< HEAD:Jwi_Gumeong_Team_Project_0.0.1/src/main/java/com/jwi/work/controller/UserController.java
	@GetMapping("/signUp")
	public void signUp(Model model) {
========
	@PostMapping("/SignUp")
	public String SignUp(Model model) {
		return null;
		
	}
	@GetMapping("/SignUp")
	public void SignUp() {
>>>>>>>> 38e516743c7173d2627abf51c8f8fa7a9f277373:Jwi_Gumeong_Team_Project_0.0.1/src/main/java/com/jwi/work/controller/JwiController.java

	}
	@GetMapping("/signUpProc")
	public void signUpProc(Model model) {
		
	}


}
 
=======
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
	
}
>>>>>>> 38e516743c7173d2627abf51c8f8fa7a9f277373
