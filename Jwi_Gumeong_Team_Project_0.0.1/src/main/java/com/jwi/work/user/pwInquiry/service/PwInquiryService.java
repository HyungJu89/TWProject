package com.jwi.work.user.pwInquiry.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.jwi.work.user.dto.User;
import com.jwi.work.user.mapper.UserMapper;
import com.jwi.work.user.signUp.service.EmailService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PwInquiryService {

	//Autowired로 불러왔어야 할 애들
	UserMapper userMapper;
	EmailService emailService;
	
	public String pwIssued(String email) {
		String pw = UUID.randomUUID().toString().replaceAll("-", "").substring(0,10);
		User pwfixedUser = new User();
		pwfixedUser.setEmail(email);
		pwfixedUser.setPw(pw);
		userMapper.updatePw(pwfixedUser);
		emailService.EmailCheck3(email, pw);
		return pw;
	}
}
