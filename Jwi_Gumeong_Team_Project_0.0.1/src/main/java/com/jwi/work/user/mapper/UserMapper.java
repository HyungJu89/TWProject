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
}

