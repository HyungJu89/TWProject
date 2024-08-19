package com.jwi.work.channel.dto.bodyDto;

import lombok.Data;

@Data
public class CommentCreateDto {
	
	private String sessionId;
	private int postKey;
	private String comment;
	
}
