package com.jwi.work.user.myPage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.user.dto.CheckDto;
import com.jwi.work.user.dto.User;
import com.jwi.work.user.myPage.service.MyPageService;

@RestController
@RequestMapping("/myPage/*")
public class MyPageController {
	@Autowired
	private MyPageService myPageService;
	
	//로그인체크
	@PostMapping("/loginRetry")
	public CheckDto loginRetry(@RequestBody User userData) {
		System.out.println(userData);
		return myPageService.loginRetry(userData);
	}
}
