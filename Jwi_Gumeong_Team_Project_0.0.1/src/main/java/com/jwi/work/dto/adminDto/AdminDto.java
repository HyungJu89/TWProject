package com.jwi.work.dto.adminDto;

import lombok.Data;

@Data
public class AdminDto {

	private  String adminId;
	private String adminPw;
	private int adminAuthorityl;
	private String role;
	private String adminCreatedAt;
	private String adminLoginTime;
	private String adminUpdatedAt;


}
