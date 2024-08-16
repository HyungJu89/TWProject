package com.jwi.work.channel.dto.bodyDto;

import lombok.Data;

@Data
public class ReplyDeleteDto {
	private String sessionId;
	private int replyKey;
}
