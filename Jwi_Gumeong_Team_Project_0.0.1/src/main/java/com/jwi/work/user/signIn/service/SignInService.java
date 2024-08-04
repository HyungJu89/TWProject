package com.jwi.work.user.signIn.service;

import java.util.UUID;

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
	public boolean emailCheck(String email) {
		if(userMapper.emailCheck(email) == 1) {
			return true;
		}else {
			return false;
		}
	}
	//밴 유저정보 확인
    public boolean isEmailBanned(String email) {
        return userMapper.banEmailList().contains(email);
    }
    //유저 세션아이디 발급
    public String getSessionId(String email) {
    	
    	String sessionId = UUID.randomUUID().toString().substring(0,20);
    	User userSession = new User();
    	userSession.setEmail(email);
    	userSession.setSessionId(sessionId);
    	if(emailCheck(email)) {
    		userMapper.updateSessionId(userSession);
    		return sessionId;
    	}else {
    		return "";
    	}
    	
    }
    public User getUserInfo(String sessionId) {
    	return userMapper.userInfo(sessionId);
    }

	
}
