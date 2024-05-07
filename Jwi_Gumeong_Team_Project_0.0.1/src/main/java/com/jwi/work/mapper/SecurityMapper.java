package com.jwi.work.mapper;

import com.jwi.work.dto.adminDto.AdminDto;

public interface SecurityMapper {

	
	//---------시큐리티용----------------------
	
		public int lodeAdminCount(String adminId);
		
		public AdminDto lodeAdminInfo(String adminId);

		
	//===================================	
	
}
