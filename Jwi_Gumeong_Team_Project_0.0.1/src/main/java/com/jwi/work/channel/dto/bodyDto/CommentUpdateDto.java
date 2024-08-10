package com.jwi.work.channel.dto.bodyDto;

import lombok.Data;

@Data
public class CommentUpdateDto {
	private int commentKey;
	private int userKey;
	private String comment;
	
}
