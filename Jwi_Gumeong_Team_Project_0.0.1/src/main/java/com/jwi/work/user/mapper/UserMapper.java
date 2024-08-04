package com.jwi.work.user.mapper;

import java.util.ArrayList;

import com.jwi.work.user.dto.User;

public interface UserMapper{
	//여기부터 회원가입
		//회원가입
		public void register(User user);
		//이메일 중복검사
		public int emailTest(String email);
		//닉네임 중복검사
		public int nickNameTest(String nickName);
	//여기부터 로그인
		//로그인 유저정보 검사
		public int loginCheck(User user);
		//벤 된 사람 체크
		public ArrayList<String> banEmailList();
		//이메일 체크
		public int emailCheck(String email);
		//sessionId 발급 및 저장
		public void updateSessionId(User user);
		//sessonId로 유저확인
		public User userInfo(String sessionId);
}

