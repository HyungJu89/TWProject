package com.jwi.work.channel.dto.commentDto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ReplyDto{
	private int replyKey;
	private int commentKey;
	private String nickName;
	private String replyNickName;
	private String reply;
	private String state;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}
