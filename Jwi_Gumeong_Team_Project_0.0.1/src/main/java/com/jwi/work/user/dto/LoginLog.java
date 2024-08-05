package com.jwi.work.user.dto;

import java.util.Date;

import lombok.Data;

@Data
public class LoginLog {
	
	private int loginKey;
	
	private int userKey;
	
	private int loginSuccess;
	
	private Date createdAt;
	
	private Date updatedAt;

}
