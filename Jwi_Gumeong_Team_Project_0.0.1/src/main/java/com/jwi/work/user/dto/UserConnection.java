package com.jwi.work.user.dto;

import java.util.Date;

import lombok.Data;

@Data
public class UserConnection {
	
	private int userKey;
	
	private String sessionId;
	
	private Date createdAt;
	
	private Date updatedAt;
}
