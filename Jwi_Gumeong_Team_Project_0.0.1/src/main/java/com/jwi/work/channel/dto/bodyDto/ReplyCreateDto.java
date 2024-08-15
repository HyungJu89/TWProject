package com.jwi.work.channel.dto.bodyDto;

import lombok.Data;

@Data
public class ReplyCreateDto {

	private int commentKey; 
	private int replyreplyKey;
	private int userKey;
	private String reply;
	
}
