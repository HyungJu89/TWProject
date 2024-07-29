package com.jwi.work.user.signUp.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.user.dto.User;
import com.jwi.work.user.signUp.service.SignUpService;

@RestController
@RequestMapping("/signUp")
public class SignUpController {
	
	@Autowired
	private SignUpService signUpService;

    @GetMapping("/register")
    public boolean getUsersInfo(@RequestBody User userData) {
       return true;	
    }
}
	