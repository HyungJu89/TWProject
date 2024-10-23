package com.jwi.work.user.signIn.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

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
	
	//비밀번호 제한용 변수 및 로직
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    public void resetWrongCountAfterDelay(String userKey) {
        scheduler.schedule(() -> {
            resetWrongCount(userKey);
        }, 5, TimeUnit.MINUTES);
    }

    private void resetWrongCount(String userKey) {
        User user = new User();
        user.setUserKey(userKey);
        user.setPwWrong(0); // 틀린 비밀번호 횟수를 0으로 초기화
        userMapper.updatePwWrong(user);
    }
    // 여기까지 비밀번호 제한용 변수 및 로직
    
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
		Integer result = userMapper.emailCheck(email);
		if (result == null || result == 0) {
		    // email이 없거나 결과가 null일 때 처리
		    return false;
		} else {
			return true;
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

    	
    	
    	//이메일 체크처리
    	if(emailCheck(email)) {
    		// 유저 키값 구하기
    		int userKey = Integer.parseInt(userMapper.getUserKey(email));
    		//비밀번호 틀린 횟수 구하는 변수 만들기
    		int count = userMapper.wrongCount(userMapper.getUserKey(email));
    		User oneUserInfo = userMapper.getUserInfo(userKey);
    		String state = oneUserInfo.getState();
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
                    userCheck.setState("비활성화된 계정입니다.");
                    return userCheck;
        		}
    		} else if(state.equals("secession")) {
    			userCheck.setCheck(false);
                userCheck.setState("탈퇴한 계정입니다.");
                
                return userCheck;
    		}
    		//로그인 체크처리
    		if(loginTest(userInfo)) {
    			if(count<5) {
    				LoginLog userConnect = new LoginLog();
    				userConnect.setUserKey(userMapper.getUserKey(email));
    				userConnect.setLoginSuccess(0);
    				userMapper.saveLog(userConnect);
    				userCheck.setCheck(true);
    				userCheck.setWarningMessage("");
    				userCheck.setWrongCount(count);
    				userCheck.setUserKey(userMapper.getUserKey(email));
    			}else {
    				userCheck.setCheck(false);
    				userCheck.setWarningMessage("비밀번호를 5회 이상 틀리셨습니다. 5분후에 다시 로그인 해주세요.");
    				userCheck.setWrongCount(count);
    				userCheck.setUserKey(userMapper.getUserKey(email));
    				 resetWrongCountAfterDelay(userMapper.getUserKey(email));
    			}
    				
	    	//로그인 체크처리 예외
	    	}else {
	    		if(count<5) {
	    			System.out.println(count);
	    			User wrongPw = new User();
	    			wrongPw.setUserKey((userMapper.getUserKey(email)));
	    			wrongPw.setPwWrong(count+1);
	    			userMapper.updatePwWrong(wrongPw);
	    			LoginLog userConnect = new LoginLog();
	    			userConnect.setUserKey(userMapper.getUserKey(email));
	    			userConnect.setLoginSuccess(1);
	    			userMapper.saveLog(userConnect);
	    			//유저 틀린 비밀번호 횟수 + 1해서 테이블에 업데이트하기
	    			//유저 틀린 비밀번호 횟수 가져와서 userCheck에 저장하기
	    			userCheck.setCheck(false);
	    			userCheck.setWarningMessage("비밀번호가 일치하지 않습니다.");
	    			userCheck.setWrongCount(count + 1);
	    		}else {
    				userCheck.setCheck(false);
    				userCheck.setWarningMessage("비밀번호를 5회 이상 틀리셨습니다. 5분후에 다시 로그인 해주세요.");
    				userCheck.setWrongCount(count);
    				userCheck.setUserKey(userMapper.getUserKey(email));
    				 resetWrongCountAfterDelay(userMapper.getUserKey(email));
	    		}
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
