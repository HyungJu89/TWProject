package com.jwi.work.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.api.chzzk.ChzzkChannelInfo;
import com.jwi.work.dto.api.chzzkApi.ResponseDto;
import com.jwi.work.dto.channel.createChannelDto;
import com.jwi.work.mapper.ChannelMapper;

@Service
public class ChannelCreateService {

	@Autowired
	private ChzzkChannelInfo channerInfo;
	
	@Autowired
	private ChannelMapper mapper;
	
	
	public Object createSearch(String channelId) {
		
		return channerInfo.chzzkChannelInfo(channelId);
		
	}
	
	
	public boolean createChannel(createChannelDto channelDto) {
		
		if(mapper.createChannelCheck(channelDto.getChannelId())== 0) {
			mapper.createChannel(channelDto);
			return true;
		}
	return false;
	
	}
	
}