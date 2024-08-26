package com.jwi.work.user.myPage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.jwi.work.user.dto.CheckDto;
import com.jwi.work.user.dto.Favorites;
import com.jwi.work.user.dto.User;
import com.jwi.work.user.entity.FavoritesEntity;
import com.jwi.work.user.mapper.UserMapper;
import com.jwi.work.user.repository.FavoritesRepository;
import com.jwi.work.user.signIn.service.SignInService;

@Service
public class MyPageService {

	@Autowired
	UserMapper userMapper;
	//로그인 테스트
	@Autowired
	SignInService signInService;
	@Autowired
	private FavoritesRepository favoritesRepository; //즐겨찾기 레파
	
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
    	if(user.getEmail() !=null) {
    		userInfo.setEmail(user.getEmail());
    	}
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
	
	//즐겨찾기 :: 현재 로그인된 유저키 기반으로 데이터 검색
	public List<FavoritesEntity> favoritesList(int userKey){
		return favoritesRepository.findByUserKey(userKey);
		
	}
//	//정보수정 처리 로직
//	public CheckDto edit(User user) {
//    	//반환하기위한 객체 생성
//    	CheckDto userCheck = new CheckDto();
//    	//함수 매개변수 입력용 객체
//    	User userInfo = new User();
//    	if(user.getPw() != null) {    		
//    		userInfo.setPw(user.getPw());
//    	}
//    	if(user.getNickName() != null) {	
//    		if (userMapper.nickNameTest(user.getNickName()) == 1) {
//    			userCheck.setCheck(false);
//    			userCheck.setWarningMessage("이미 존재하는 닉네임 입니다.");
//    		}
//    	}
//	}
}
