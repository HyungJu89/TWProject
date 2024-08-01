package com.jwi.work.channel.mapper;

import org.apache.ibatis.annotations.Param;

import com.jwi.work.channel.dto.ChannelCreateDto;


public interface ChannelMapper {

	public int channelCheck(@Param("channelId") String channelId);
	
	public void channelCreate(ChannelCreateDto channelCreate);
}
