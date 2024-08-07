package com.jwi.work.user.info.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.user.mapper.UserMapper;

@Service
public class UserService {
	
	@Autowired
	private UserMapper userMapper;
	
	public int selectUserKey(String sessionId) {
		return userMapper.getUserKeyBySessionId(sessionId);
	}

}
