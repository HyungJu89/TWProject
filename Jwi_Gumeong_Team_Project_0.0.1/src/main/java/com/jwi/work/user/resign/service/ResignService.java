package com.jwi.work.user.resign.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.user.mapper.UserMapper;

@Service
public class ResignService {

	@Autowired
	private UserMapper userMapper;
	
	public int resignUser(int userKey) {
		return userMapper.resignUser(userKey);
	}
	
}
