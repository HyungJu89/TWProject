package com.jwi.work.user.signIn.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.user.dto.User;
import com.jwi.work.user.mapper.UserMapper;

@Service
public class SignInService {

	@Autowired
	UserMapper userMapper;
	
	//로그인 유저정보확인
	public boolean loginTest(User user) {
		if(userMapper.loginCheck(user) == 1) {
			return true;
		}else {
			return false;
		}
		
	}
	
}
