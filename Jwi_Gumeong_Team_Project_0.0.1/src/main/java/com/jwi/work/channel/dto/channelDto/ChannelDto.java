package com.jwi.work.channel.dto.channelDto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ChannelDto {

	private int channelKey;
	private String id;
	private String name;
	private String imageUrl;
	private int followerCount;
	private int favoriteCount;
	private boolean isFavorite;
	private LocalDateTime updatedAt;
	
}
