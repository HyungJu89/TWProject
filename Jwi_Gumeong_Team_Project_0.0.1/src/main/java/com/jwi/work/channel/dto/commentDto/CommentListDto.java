package com.jwi.work.channel.dto.commentDto;

import java.util.List;

import lombok.Data;

@Data
public class CommentListDto {

	private List<CommentDto> comment;
	private int commentCount;
	
}
