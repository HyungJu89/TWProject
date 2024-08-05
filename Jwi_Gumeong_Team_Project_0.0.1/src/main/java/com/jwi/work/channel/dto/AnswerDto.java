package com.jwi.work.channel.dto;

import lombok.Data;

@Data
public class AnswerDto {

	private boolean createSuccess;
	
	private String message = null;
	
	private String navigate = null;
	
}
