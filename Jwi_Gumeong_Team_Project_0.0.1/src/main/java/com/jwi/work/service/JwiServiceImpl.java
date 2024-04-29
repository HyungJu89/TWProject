package com.jwi.work.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.jwi.work.mapper.JwiMapper;

@Service
@Primary
public class JwiServiceImpl implements JwiService{
	@Autowired
	private JwiMapper mapper;
//	public String test() {
		
//		return mapper.test();
		
//	}




}
