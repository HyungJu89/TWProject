package com.jwi.work.dto.channel;

import lombok.Data;

@Data
public class createChannelDto {

	private String channelId;
	private String channelName;
	private String channelImageUrl;
	private int followerCount;
	
}
