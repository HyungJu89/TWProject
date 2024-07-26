package com.jwi.work.dto.security;

import lombok.Data;

@Data
public class UserSecurityDto {

	private String role;
	private String password;
	private String username;
	
	public UserSecurityDto(String role,String userName,String password) {
		this.role = role;
		this.username = userName;
		this.password = password;	
	}
	
}
