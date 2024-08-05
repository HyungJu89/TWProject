package com.jwi.work.channel.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ChannelDto {

	private int channelKey;
	private String id;
	private String name;
	private String imageUrl;
	private String followerCount;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private int favoriteCount;
	
}
