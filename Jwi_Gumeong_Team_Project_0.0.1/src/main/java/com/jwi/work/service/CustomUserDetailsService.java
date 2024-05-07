package com.jwi.work.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.jwi.work.dto.adminDto.AdminDto;
import com.jwi.work.dto.security.CustomUserDetails;
import com.jwi.work.dto.security.UserSecurityDto;
import com.jwi.work.mapper.SecurityMapper;

@Service
public class CustomUserDetailsService implements UserDetailsService{

	@Autowired
	private SecurityMapper mapper;
	
	@Override
	public UserDetails loadUserByUsername(String adminId) throws UsernameNotFoundException{
	
		
		
		if(mapper.lodeAdminCount(adminId) == 1) {
			
			AdminDto admin = mapper.lodeAdminInfo(adminId);
			
			if(admin.getAdminAuthorityl() > 0) {
				UserSecurityDto adminrDatea = new UserSecurityDto("ADMIN",admin.getAdminId(),admin.getAdminPw());
				
				return new CustomUserDetails(adminrDatea);
				

			}
			
			
			
			
		}
		
		
		return null;
		
	}
	
}
