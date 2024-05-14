package com.jwi.work.mapper;

import com.jwi.work.dto.channel.createChannelDto;

public interface ChannelMapper {



	public int createChannelCheck(String channelId);
	public void createChannel(createChannelDto channelDto);
	
}
