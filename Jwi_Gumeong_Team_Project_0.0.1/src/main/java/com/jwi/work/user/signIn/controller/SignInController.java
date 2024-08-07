package com.jwi.work.user.signIn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.user.dto.CheckDto;
import com.jwi.work.user.dto.User;
import com.jwi.work.user.dto.UserConnection;
import com.jwi.work.user.signIn.service.SignInService;

@RestController
@RequestMapping("/signIn/*")
public class SignInController {
	
	@Autowired
	private SignInService signInService;
	
	//sessionId 발급
	@GetMapping("/getSessionId")
	public UserConnection getSessionId(@RequestParam("email") String email) {
		return signInService.getSessionId(email);
	}
	//sessioinId 확인 후 유저정보 넘기기
	@GetMapping("/checkSessionId")
	public User checkSessionId(@RequestParam("sessionId") String sessionId) {
		System.out.println(sessionId);
		return signInService.getUserInfo(sessionId);
	}
	
	//로그인체크
	@PostMapping("/loginCheck")
	public CheckDto loginCheck(@RequestBody User userData) {
		return signInService.helpLogin(userData.getEmail(),userData.getPw());
	}
}
