package com.jwi.work.user.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Param;

import com.jwi.work.user.dto.LoginLog;
import com.jwi.work.user.dto.User;
import com.jwi.work.user.dto.UserConnection;

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
		//userKey 받아오기
		public String getUserKey(String email);
		//sessionId테이블에서 userKey 받아오기
		public String getSessionUser(String sessionId);
		//loginLog 테이블에 저장
		public void saveLog(LoginLog loginLog);
		//session ticket 발급테이블에 저장
		public void saveSession(UserConnection userConnection);
		//새로 로그인했을 때 새로 sessionId 발급 및 저장
		public void updateSessionId(UserConnection userConnection);
		//session 아이디 체크
		public int sessionUserCheck(String userKey);
		//비밀번호 틀린횟수 받아오기
		public int wrongCount(String userKey);
		//비밀번호 틀린횟수 받아오기2
		public ArrayList<Integer> wrongList(String userKey);
		//sessionId 발급 및 저장
		public void updateSessionId(User user);
		//sessonId로 유저확인
		public User userInfo(String sessionId);
		// 로그인 후 키값 찾아오기
		public int getUserKeyBySessionId(@Param("sessionId") String sessionId);
	//여기부터 비번찾기
		public void updatePw(User user);
}

