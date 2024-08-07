package com.jwi.work.user.dto;

import lombok.Data;

@Data
public class User {
	
	private String userKey;

    private String email;

    private String pw;

    private String nickName;

    private String gender;
    
    private String birthday;
    
    private String state;
    
    private String sessionId;

}