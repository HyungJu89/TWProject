package com.jwi.work.channel.dto.postDto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class CommentDto{
	private int commentKey;
	private String nickName;
	private String comment;
	private String state;
	private int replyCount;
	private List<ReplyDto> replys;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}