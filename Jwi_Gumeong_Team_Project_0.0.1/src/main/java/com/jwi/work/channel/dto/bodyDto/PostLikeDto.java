package com.jwi.work.channel.dto.bodyDto;

import lombok.Data;

@Data
public class PostLikeDto {
	
	private boolean like;
	private String sessionId;
	private int postKey;
	
}
