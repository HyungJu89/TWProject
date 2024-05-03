package com.jwi.work.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.dto.userDto.UserDto;
import com.jwi.work.mapper.UserMapper;


@Service
public class UserService {
	@Autowired
	private UserMapper mapper;
	public void InsertUserData(String userName,String userEmail,String userPw,Character userGender,int userAge) {
		UserDto dto = new UserDto();
		dto.setUserName(userName);
		dto.setUserEmail(userEmail);
		dto.setUserPw(userPw);
		dto.setUserGender(userGender);
		dto.setUserAge(userAge);
		mapper.signUp(dto);
	}
	public boolean userCheck(String userEmail,String userPw) {
		UserDto dto = new UserDto();
		dto.setUserEmail(userEmail);
		dto.setUserPw(userPw);
		if(mapper.userCheck(dto) == 1) {
			return true;
		} else{
			return false;
		}
	}
}
