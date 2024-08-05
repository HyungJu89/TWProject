package com.jwi.work.channel.dto;

import java.time.LocalDateTime;

import lombok.Data;
@Data
public class PostDto {

	private int postKey;
	private int userKey;
	private int channelKey;
	private String content;
	private String image;
	private String state;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	
}
