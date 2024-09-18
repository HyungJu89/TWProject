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
		if (newUser.getUserKey() == null) {
			return false;
		}else {
			return true;
		}
	}
	
	//정보수정 로그인 검증 전체 로직
	public CheckDto loginRetry(User user) {
    	//반환하기위한 객체 생성
    	CheckDto userCheck = new CheckDto();
    	//함수 매개변수 입력용 객체
    	User userInfo = new User();
    	System.out.println(user);
    	if(user.getEmail() !=null) {
    		userInfo.setEmail(user.getEmail());
    	}
    	// 패스워드 입력 안할시에 널처리
    	if(user.getPw().equals("")) {
    		user.setPw(null); 
    	}
    	if(user.getNickName().equals("")) {
    		user.setNickName(null);
    	}
    	userInfo.setPw(user.getPw());
    	userInfo.setNickName(user.getNickName());
    	userInfo.setSessionId(user.getSessionId());
    	if(emailTest(userInfo)) {
    		if(userInfo.getPw().equals(null)) {
    			// 비밀번호 변경이 아닐경우에 처리해야할 로직
    			System.out.println("패스워드 널임");
    		} else {
    			// 비밀번호 변경일 경우에 처리해야할 로직 여기에
    			if(!userInfo.getNickName().equals(null)) {
    				// 닉네임 변경로직
    				System.out.println("닉네임 널 아님");
    			}
    			System.out.println("패스워드 처리로직했씀");
    			// 비밀번호 변경로직
    		}
    		User newUser = signInService.getUserInfo(user.getSessionId());
    		System.out.println(newUser);
    	}else {
        	userCheck.setCheck(false);
        	userCheck.setWarningMessage("현재 입력하신 이메일은 로그인하신 이메일과 일치하지 않습니다.");
    	}
    	return userCheck;
	}
	
	//즐겨찾기 :: 현재 로그인된 유저키 기반으로 데이터 검색
	public List<FavoritesEntity> favoritesList(String sessionId){
		return favoritesRepository.findByUserConnectionSessionId(sessionId);
		
	}
	
//	public boolean loginTest(User user) {
//		if(userMapper.loginCheck(user) == 1) {
//			return true;
//		}
//		else {
//			return false;
//		}		
//	}
//	
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
