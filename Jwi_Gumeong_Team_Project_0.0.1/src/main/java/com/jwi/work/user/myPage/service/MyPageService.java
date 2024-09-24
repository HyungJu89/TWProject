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
	
	/**** TODO ****
	 * 	1. 로그만들어서 언제 바꿨는지 남겨놔야함
	 *  2. 남겨서 어따쓰냐? n일 전 비밀번호 변경되었음 정보가 나오면 좋음
	 *	3. 비밀번호 변경 후 이메일로 변경되었다고 쏘기도 가능
	 **** 닉네임 변경 이력?
	 *	1. 자주 바뀌게 하면 안되서 최소 한달 후 바꿀 수 있게? 를 위한 장치
	 *	ㅇㅈㅇ : 로그로 그 사람 접속로그 비번변경 로그 닉네임 변경로그 넣어주면 좋을듯
	 *	ㅊㅈㅇ : 나중에 마이페이지에서 접속로그 보여줘도 좋겠다
	 */
	
	// 정보수정 비밀번호 로직
	public CheckDto userEditPw(User user) {
		// 반환하기위한 객체 생성
		CheckDto userCheck = new CheckDto();
		User newUser = signInService.getUserInfo(user.getSessionId());
		user.setEmail(newUser.getEmail());
		// 패스워드 입력이 없을시 
		if(user.getPw() == "") {
			user.setPw(null);
		}
		if(user.getNickName() == "") {
			user.setNickName(null);
		}
		if(user.getPw() != null) {
			userMapper.updatePw(user);
		}
		userCheck.setWarningMessage("패스워드 수정 완료");
		userCheck.setCheck(true);
		return userCheck;
	}
	
	// 정보수정 닉네임 로직
	public CheckDto userEditNickName(User user) {
		// 반환하기위한 객체 생성
		CheckDto userCheck = new CheckDto();
		User newUser = signInService.getUserInfo(user.getSessionId());
		user.setEmail(newUser.getEmail());
		// 패스워드 입력이 없을시 
		if(user.getPw() == "") {
			user.setPw(null);
		}
		// 닉네임 입력이 없을시
		if(user.getNickName() == "") {
			user.setNickName(null);
		}
		if(user.getNickName() != null) {
			userMapper.updateNickName(user);
		}
		userCheck.setWarningMessage("닉네임 수정 완료");
		userCheck.setCheck(true);
		return userCheck;
	}
	
	// 정보수정 전체 로직
	public CheckDto userEditAll(User user) {
		// 반환하기위한 객체 생성
		CheckDto userCheck = new CheckDto();
		User newUser = signInService.getUserInfo(user.getSessionId());
		user.setEmail(newUser.getEmail());
		// 패스워드 입력이 없을시 
		if(user.getPw() == "") {
			user.setPw(null);
		}
		
		// 닉네임 입력이 없을시
		if(user.getNickName() == "") {
			user.setNickName(null);
		}
		
		// 닉네임 입력이 없을시
		if(user.getNickName() != null && user.getPw() != null) {
			userMapper.updatePw(user);
			userMapper.updateNickName(user);
		}
		userCheck.setWarningMessage("닉네임,패스워드 수정 완료");
		userCheck.setCheck(true);
		return userCheck;
	}
	
	//즐겨찾기 :: 현재 로그인된 유저키 기반으로 데이터 검색
	public List<FavoritesEntity> favoritesList(String sessionId){
		return favoritesRepository.findByUserConnectionSessionId(sessionId);
		
	}
	
	//즐겨찾기 카운트 :: 변수된 채널 키 기반으로 검색
	public int favoritesCount(int channelKey) {
	    List<FavoritesEntity> favorites = favoritesRepository.findBychannelKey(channelKey);
	    return favorites.size();
    }
	
}