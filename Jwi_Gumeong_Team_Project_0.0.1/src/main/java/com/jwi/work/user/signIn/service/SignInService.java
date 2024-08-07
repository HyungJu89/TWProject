package com.jwi.work.user.signIn.service;

import java.util.ArrayList;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.user.dto.CheckDto;
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
		}
		else {
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
    
    
    // 로그인 전부 처리해보기
    public CheckDto helpLogin(String email,String pw) {
    	//로그인 체크를 위한 객체생성
    	User userInfo = new User();
    	userInfo.setEmail(email);
    	userInfo.setPw(pw);
    	
    	//반환하기위한 객체 생성
    	CheckDto userCheck = new CheckDto();

    	//비밀번호 틀린 횟수 구하는 변수 만들기
    	ArrayList<Integer> wrongList =  userMapper.wrongList(userMapper.getUserKey(email));
    	int count = (int) wrongList.stream().filter(num -> num == 1).count();
    	System.out.println(count);
    	
    	//이메일 체크처리
    	if(emailCheck(email)) {
    		//로그인 체크처리
    		if(loginTest(userInfo)) {
	    			if(isEmailBanned(email)) {	
	    				userCheck.setCheck(false);
	    				userCheck.setWarningMessage("해당 계정은 악의적인 글 작성과 과도한 친목주도로 인해 사용 정지 된 계정이에요.");
	    			}else {
	    				LoginLog userConnect = new LoginLog();
	    				userConnect.setUserKey(userMapper.getUserKey(email));
	    				userConnect.setLoginSuccess(0);
	    				userMapper.saveLog(userConnect);
	    				userCheck.setCheck(true);
	    				userCheck.setWarningMessage("");
		    	    	userCheck.setWrongCount(count);
		    	    	userCheck.setUserKey(userMapper.getUserKey(email));
	    			}
	    	//로그인 체크처리 예외
	    	}else {
	    			LoginLog userConnect = new LoginLog();
	    			userConnect.setUserKey(userMapper.getUserKey(email));
	    			userConnect.setLoginSuccess(1);
	    			userMapper.saveLog(userConnect);
	    			userCheck.setCheck(false);
	    			userCheck.setWarningMessage("비밀번호가 일치하지 않습니다.");
	    	    	userCheck.setWrongCount(count + 1);
	        	  }
    	//이메일 체크처리 예외
    	}else{
        	userCheck.setCheck(false);
        	userCheck.setWarningMessage("이 이메일은 없는 이메일입니다.");
    	}
		return userCheck;
    }
    
    //--------------------------------------------------------- 여기서부터 세션화 할거임---------------------------------------------------------------------
    
    //유저 세션아이디 발급
    public UserConnection getSessionId(String email) {
    	
    	String sessionId = UUID.randomUUID().toString().substring(0,20);
    	UserConnection userSession = new UserConnection();
    	//처음 발급 받을때
    	if(emailCheck(email) && userMapper.sessionUserCheck(userMapper.getUserKey(email)) == 0) {
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
    public User getUserInfo(String sessionId) {
    	return userMapper.userInfo(userMapper.getSessionUser(sessionId));
    }
	
}
