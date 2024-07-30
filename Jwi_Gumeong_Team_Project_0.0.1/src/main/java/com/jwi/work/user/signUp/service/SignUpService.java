package com.jwi.work.user.signUp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.user.dto.User;
import com.jwi.work.user.mapper.UserMapper;

@Service
public class SignUpService {
    
	@Autowired
	UserMapper userMapper;
	
	//회원가입
    public void saveUser(User user) {
    	userMapper.register(user);
    }
    
    // 이메일 중복검사
    public boolean emailTest(String email) {
    	if(userMapper.emailTest(email) == 0) {
    		return true;
    	}else {
    		return false;
    	}
    }
    
    // 닉네임 중복검사
    public boolean nickNameTest(String nickName) {
    	if(userMapper.nickNameTest(nickName) == 0) {
    		return true;
    	}else {
    		return false;
    	}
    }
    
}	