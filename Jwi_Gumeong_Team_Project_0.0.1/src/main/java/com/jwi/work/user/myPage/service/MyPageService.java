package com.jwi.work.user.myPage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.user.dto.CheckDto;
import com.jwi.work.user.dto.User;
import com.jwi.work.user.mapper.UserMapper;
import com.jwi.work.user.signIn.service.SignInService;
import com.jwi.work.user.signUp.service.SignUpService;

@Service
public class MyPageService {

	@Autowired
	UserMapper userMapper;
	//로그인 테스트
	@Autowired
	SignInService signInService;
	
	public boolean loginTest(User user) {
		if(userMapper.loginCheck(user) == 1) {
			return true;
		}
		else {
			return false;
		}		
	}
	//이메일 테스트
	public boolean emailTest(User user) {
		User newUser = signInService.getUserInfo(user.getSessionId());
		if (user.getEmail().equals(newUser.getEmail())) {
			return true;
		}else {
			return false;
		}
	}
	
	//정보수정 로그인 검증 전체 로직
	public CheckDto loginRetry(User user) {
    	//반환하기위한 객체 생성
    	CheckDto userCheck = new CheckDto();
    	//함수 매개변수 입력용 객체
    	User userInfo = new User();
    	userInfo.setEmail(user.getEmail());
    	userInfo.setPw(user.getPw());
    	userInfo.setSessionId(user.getSessionId());
    	if(emailTest(userInfo)) {
    		if(loginTest(userInfo)) {
    			userCheck.setCheck(true);
    			userCheck.setWarningMessage("");
    		}else {
    			userCheck.setCheck(false);
    			userCheck.setWarningMessage("비밀번호가 일치하지 않습니다.");
    		}
    	}else {
        	userCheck.setCheck(false);
        	userCheck.setWarningMessage("현재 입력하신 이메일은 로그인하신 이메일과 일치하지 않습니다.");
    	}
    	return userCheck;
	}
}
