package com.jwi.work.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.dto.adminDto.AdminDto;
import com.jwi.work.dto.loginDto.LoginDto;
import com.jwi.work.mapper.AdminMapper;

@Service
public class AdminService {

	@Autowired
	private AdminMapper mapper;
	AdminDto admin;

	public AdminDto adminLogin(LoginDto login) {
		if (mapper.adminLoginCount(login) > 0) {
			mapper.adminLogin(login);
			if (admin.getAdminAuthorityl() > 0) {
				admin.setRole("ADMIN");
			} else {
				admin.setRole("NONE");

			}
		} else {

		}
		System.out.println(admin.getRole());
		return admin;
	}

}
