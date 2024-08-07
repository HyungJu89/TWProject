package com.jwi.work.user.dto;

import java.util.Date;

import lombok.Data;

@Data
public class User {
	
	private int userKey;

    private String email;

    private String pw;

    private String nickName;

    private String gender;
    
    private String birthday;
    
    private String state;
    
    private String sessionId;
    
    private Date createdAt;
    
    private Date updatedAt;

}