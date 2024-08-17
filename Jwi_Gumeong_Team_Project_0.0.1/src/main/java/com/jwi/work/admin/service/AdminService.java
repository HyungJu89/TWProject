package com.jwi.work.admin.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.jwi.work.admin.util.JwtUtil;
import com.jwi.work.center.inquiry.entity.Inquiry;
import com.jwi.work.center.inquiry.entity.InquiryResponse;
import com.jwi.work.center.inquiry.ropository.InquiryRepository;
import com.jwi.work.center.inquiry.ropository.InquiryResponseRepository;
import com.jwi.work.user.dto.User;
import com.jwi.work.user.mapper.UserMapper;

@Service
public class AdminService {
	
	// Admin쪽으로 POST 요청 들어오면 처리
	@Autowired
	private AuthenticationManagerBuilder authenticationManagerBuilder;
	
	@Autowired
	private UserMapper userMapper;
	
	@Autowired
	private InquiryRepository inquiryRepository;
	
	@Autowired
	private InquiryResponseRepository inquiryResponseRepository; 
	
	// 데이터베이스에 직접 insert 하는거보다 여기에서 인코딩 거치고 넣는게 더 나을듯?
	public String loginJWT(Map<String,String> data) {
		// authToken 열어서 넣을수 있는 정보를 넣는다.
		var authToken = new UsernamePasswordAuthenticationToken(
				data.get("adminName"), data.get("adminPassWord")
			);
			
		// 정보 허가를 위해서 어센틱케이션에 정보를 넣는다.
		var auth = authenticationManagerBuilder.getObject().authenticate(authToken);
		SecurityContextHolder.getContext().setAuthentication(auth);
		
		//auth 변수 사용하고싶으면 이렇게 하면됨
		var jwt = JwtUtil.createToken(SecurityContextHolder.getContext().getAuthentication());
		
		return jwt;
	}
	
	public List<User> findAllUsers(){
		return userMapper.getAllUser();
	}
	
    public List<Inquiry> selectInquiry() {
    	return inquiryRepository.findAll();
    }
    
    public List<InquiryResponse> selectInquiryResponse() {
    	return inquiryResponseRepository.findAll();
    }
	
}