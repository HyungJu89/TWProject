package com.jwi.work.user.signUp.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.user.dto.User;
import com.jwi.work.user.signUp.service.SignUpService;

@RestController
@RequestMapping("/signUp/*")
public class SignUpController {
	
	@Autowired
	private SignUpService signUpService;
	//회원가입 데이터 입력로직
    @PostMapping("/register")
    public void getUsersInfo(@RequestBody User userData) {
    	signUpService.saveUser(userData);
    }
    //이메일 중복검사 로직
    @GetMapping("/emailTest")
    public boolean emailTest(@RequestParam("email") String email) {
    	System.out.println("컨트롤러 들어옴");
    	return signUpService.emailTest(email);
    }
    //닉네임 중복검사 로직
    @GetMapping("/nickNameTest")
    public boolean nickNameTest(@RequestParam("nickName") String nickName) {
    	return signUpService.nickNameTest(nickName);
    }
}
	