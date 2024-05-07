package com.jwi.work.mapper;

import com.jwi.work.dto.adminDto.AdminDto;
import com.jwi.work.dto.loginDto.LoginDto;

public interface AdminMapper {
	

	
	public int adminLoginCount(LoginDto login);
	
	
	public AdminDto adminLogin(LoginDto login);
	
	
}
