package com.jwi.work.user.dto;

import lombok.Data;

@Data
public class CheckDto {

	private boolean check;
	
	private String warningMessage;
	
	private int wrongCount;
	
	private String userKey;
}
