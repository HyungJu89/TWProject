package com.jwi.work.service;

import com.jwi.work.dto.adminDto.AdminDto;
import com.jwi.work.dto.loginDto.LoginDto;

public interface AdminService {

	public AdminDto adminLogin(LoginDto login);
	
}
