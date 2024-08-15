package com.jwi.work.channel.dto.commentDto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class CommentDto{
	private int commentKey;
	private String nickName;
	private String comment;
	private String state;
	private List<ReplyDto> replys;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}