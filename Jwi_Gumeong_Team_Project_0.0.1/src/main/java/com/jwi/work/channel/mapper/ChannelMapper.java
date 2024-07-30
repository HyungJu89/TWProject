package com.jwi.work.channel.mapper;

import com.jwi.work.channel.dto.ChannelDto;

public interface ChannelMapper {

	public int channelCheck(String channelId);
	
	public void channelCreate(ChannelDto channelCreate);
}
