package com.jwi.work.user.pwInquiry.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.user.dto.User;
import com.jwi.work.user.mapper.UserMapper;

@Service
public class PwInquiryService {

	@Autowired
	UserMapper userMapper;
	
	public String pwIssued(String email) {
		String pw = UUID.randomUUID().toString().replaceAll("-", "").substring(0,10);
		User pwfixedUser = new User();
		pwfixedUser.setEmail(email);
		pwfixedUser.setPw(pw);
		userMapper.updatePw(pwfixedUser);
		return pw;
	}
}
