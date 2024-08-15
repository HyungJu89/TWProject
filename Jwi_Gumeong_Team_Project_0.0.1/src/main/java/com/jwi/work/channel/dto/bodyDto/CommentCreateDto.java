package com.jwi.work.channel.dto.bodyDto;

import lombok.Data;

@Data
public class CommentCreateDto {
	
	private int userKey;
	private int postKey;
	private String comment;
	
}
