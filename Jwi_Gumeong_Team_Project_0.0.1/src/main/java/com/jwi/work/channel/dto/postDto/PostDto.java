package com.jwi.work.channel.dto.postDto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class PostDto {
	
	private int postKey;
	private String nickName;
	private String content;
	private String image;
	private String state;
	private int likeCount;
	private int commentCount;
	private List<CommentDto> comments;
	private PostChannelDto postChannel;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;

}