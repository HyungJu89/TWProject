package com.jwi.work.user.signIn.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.user.dto.Banned;
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
    public boolean isBanned(String email) {
    	// 유저 키값 구하기
    	int userKey = Integer.parseInt(userMapper.getUserKey(email));
    	// 밴 목록에 있는지 확인
    	Banned banUser = userMapper.getBannedUser(userKey);
    	
    	// null 이면
    	if(banUser == null) {
    		return false;
    	} else {
    		// 날짜 포멧
    		SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
    		// 오늘 날짜
    		Date today = new Date();
    		// 밴 시작 날짜
        	Date bannedDate = banUser.getReasonDate();
        	// 날짜 String 으로 변경후 int로 다시 변경
        	int strToday = Integer.parseInt(format.format(today));
        	int banStartDate = Integer.parseInt(format.format(bannedDate));
        	// 정지 일수
        	int plusDay = banUser.getDate();
        	// 밴 시작일 + 정지일수가 오늘보다 전이면
        	if(banStartDate + plusDay < strToday) {
        		return false;
        	}
            return true;
    	}
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
    	
    	int userKey = Integer.parseInt(userMapper.getUserKey(email));
    	User oneUserInfo = userMapper.getUserInfo(userKey);
    	String state = oneUserInfo.getState();
    	//이메일 체크처리
    	if(emailCheck(email)) {
    		// 밴 체크 -- 안재원
    		if(state.equals("deactivate")) {
    			if (isBanned(email)) {
        			// 유저 키값 구하기
        			// 밴 목록에 있는지 확인
        	    	Banned banUser = userMapper.getBannedUser(userKey);
                    userCheck.setCheck(false);
                    userCheck.setReason(banUser.getReason());
                    return userCheck;
        		} else {
        			userCheck.setCheck(false);
                    userCheck.setState("비활성화된 계정");
                    return userCheck;
        		}
    		} else if(state.equals("secession")) {
    			userCheck.setCheck(false);
                userCheck.setState("탈퇴한 계정");
                return userCheck;
    		}
    		//로그인 체크처리
    		if(loginTest(userInfo)) {
				LoginLog userConnect = new LoginLog();
				userConnect.setUserKey(userMapper.getUserKey(email));
				userConnect.setLoginSuccess(0);
				userMapper.saveLog(userConnect);
				userCheck.setCheck(true);
				userCheck.setWarningMessage("");
    	    	userCheck.setWrongCount(count);
    	    	userCheck.setUserKey(userMapper.getUserKey(email));
	    	//로그인 체크처리 예외
	    	}else {
    			LoginLog userConnect = new LoginLog();
    			userConnect.setUserKey(userMapper.getUserKey(email));
    			userConnect.setLoginSuccess(1);
    			userMapper.saveLog(userConnect);
    			//유저 틀린 비밀번호 횟수 + 1해서 테이블에 업데이트하기
    			//유저 틀린 비밀번호 횟수 가져와서 userCheck에 저장하기
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
