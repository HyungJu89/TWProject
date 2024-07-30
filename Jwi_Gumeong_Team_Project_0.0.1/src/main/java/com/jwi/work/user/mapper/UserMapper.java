package com.jwi.work.user.mapper;

import com.jwi.work.user.dto.User;

public interface UserMapper{
	//회원가입
	public void register(User user);
	//이메일 중복검사
	public int emailTest(String email);
	//닉네임 중복검사
	public int nickNameTest(String nickName);
}

