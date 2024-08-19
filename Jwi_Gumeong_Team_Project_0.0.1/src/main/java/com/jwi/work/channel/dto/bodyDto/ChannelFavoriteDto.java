package com.jwi.work.channel.dto.bodyDto;

import lombok.Data;

@Data
public class ChannelFavoriteDto {
	
	private boolean favorite;
	private String sessionId;
	private int channelKey;

}
