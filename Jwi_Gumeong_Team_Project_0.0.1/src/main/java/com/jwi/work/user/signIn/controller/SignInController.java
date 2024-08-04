package com.jwi.work.user.signIn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.user.dto.User;
import com.jwi.work.user.signIn.service.SignInService;

@RestController
@RequestMapping("/signIn/*")
public class SignInController {
	
	@Autowired
	private SignInService signInService;
	//유저정보 확인 로직
	@GetMapping("/userCheck")
	public boolean userCheck(@RequestParam("email") String email,@RequestParam("pw") String pw) {
		User userData = new User();
		userData.setEmail(email);
		userData.setPw(pw);
		return signInService.loginTest(userData);
		
	}
	//밴 정보 확인 로직
	@GetMapping("/banCheck")
	public boolean banCheck(@RequestParam("email") String email) {
		return signInService.isEmailBanned(email);
		
	}
	//sessionId 발급
	@GetMapping("/getSessionId")
	public String getSessionId(@RequestParam("email") String email) {
		return signInService.getSessionId(email);
	}
	//sessioinId 확인 후 유저정보 넘기기
	@GetMapping("/checkSessionId")
	public User checkSessionId(@RequestParam("sessionId") String sessionId) {
		System.out.println("들어옴");
		return signInService.getUserInfo(sessionId);
	}
}
