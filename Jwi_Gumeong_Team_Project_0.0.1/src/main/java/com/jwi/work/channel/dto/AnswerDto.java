package com.jwi.work.channel.dto;

import lombok.Data;

@Data
public class AnswerDto<T> {

	private boolean success;
	
	private String message = null;
	
	private T info ;
	
	private String navigate = null;
	
}
