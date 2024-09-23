package com.jwi.work.user.myPage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.user.dto.CheckDto;
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
	
	//이메일 테스트
	public boolean emailTest(User user) {
		User newUser = signInService.getUserInfo(user.getSessionId());
		// 이메일 유효성 검사
		if (newUser.getEmail().equals(user.getEmail())) {
			// 이메일 + 패스워드 유효성 검사
			if(userMapper.loginCheck(user) == 1) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	
	//정보수정 로그인 검증 전체 로직
	public CheckDto loginRetry(User user) {
    	//반환하기위한 객체 생성
    	CheckDto userCheck = new CheckDto();
    	User userInfo = new User();
    	userInfo.setSessionId(user.getSessionId());
    	//함수 매개변수 입력용 객체
    	if(user.getEmail() !=null) {
    		userInfo.setEmail(user.getEmail());
    	}
    	
    	if(user.getPw() !=null) {
    		userInfo.setPw(user.getPw());
    	}
    	
    	// 패스워드 입력 안할시에 널처리
    	if(emailTest(userInfo)) {
    		userCheck.setCheck(true);
    	} else {
        	userCheck.setCheck(false);
        	userCheck.setWarningMessage("현재 입력하신 이메일은 로그인하신 이메일과 일치하지 않거나 비밀번호가 다릅니다.");
    	}
    	return userCheck;
	}
	
	// 정보수정 전체 로직
	public CheckDto userEdit(User user) {
		// 반환하기위한 객체 생성
		CheckDto userCheck = new CheckDto();
		User newUser = signInService.getUserInfo(user.getSessionId());
		// 이메일 테스트 통과 못하면 false반환
		System.out.println(user);
		System.out.println(newUser);
		userCheck.setCheck(true);
		return userCheck;
	}
	
	//즐겨찾기 :: 현재 로그인된 유저키 기반으로 데이터 검색
	public List<FavoritesEntity> favoritesList(String sessionId){
		return favoritesRepository.findByUserConnectionSessionId(sessionId);
		
	}
	
}