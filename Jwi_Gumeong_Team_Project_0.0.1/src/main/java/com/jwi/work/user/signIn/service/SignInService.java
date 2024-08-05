package com.jwi.work.user.signIn.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.user.dto.LoginLog;
import com.jwi.work.user.dto.User;
import com.jwi.work.user.dto.UserConnection;
import com.jwi.work.user.mapper.UserMapper;

@Service
public class SignInService {

	@Autowired
	UserMapper userMapper;
	
	//로그인 유저정보확인
	public boolean loginTest(User user) {
		if(userMapper.loginCheck(user) == 1) {
			return true;
		}else if(userMapper.emailCheck(user.getEmail()) == 1 && userMapper.loginCheck(user) == 0) {
			return false;
		}
		else {
			return false;
		}		
	}
	//비밀번호 틀리면 로그 남기는 로직
	public int wrongCount(String email,boolean loginCheck) {
		
		if(emailCheck(email)) {
			if(loginCheck) {
				LoginLog userConnect = new LoginLog();
				userConnect.setUserKey(userMapper.getUserKey(email));
				userConnect.setLoginSuccess(0);
				userMapper.saveLog(userConnect);
			} else if(!loginCheck) {
				LoginLog userConnect = new LoginLog();
				userConnect.setUserKey(userMapper.getUserKey(email));
				userConnect.setLoginSuccess(1);
				userMapper.saveLog(userConnect);
			}
			return userMapper.wrongCount(userMapper.getUserKey(email));
		}
			
		return 0;
	}
	//이메일이 db에 있는지 없는지 체크
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
    public UserConnection getSessionId(String email) {
    	
    	String sessionId = UUID.randomUUID().toString().substring(0,20);
    	UserConnection userSession = new UserConnection();
    	//처음 발급 받을때
    	if(emailCheck(email)) {
    		userSession.setUserKey(userMapper.getUserKey(email));
    		userSession.setSessionId(sessionId);
    		userMapper.saveSession(userSession);
    		return userSession;
    	}
    	//만약 유저가 sessionId를 이미 발급 받았었다면
    	else if(emailCheck(email) && userMapper.sessionUserCheck(userMapper.getUserKey(email)) == 1) {
    		userSession.setUserKey(userMapper.getUserKey(email));
    		userSession.setSessionId(sessionId);
    		userMapper.updateSessionId(userSession);
    		return userSession;
    	}
    	else {
    		return userSession;
    	}
    	
    }
    //userKey로 유저정보 가져오기
    public User getUserInfo(int userKey) {
    	return userMapper.userInfo(userKey);
    }

	
}
