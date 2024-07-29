package com.jwi.work.api.chzzkApi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.api.chzzkApi.util.ChzzkChannelInfo;

@Service
public class ChzzkApiService {

	@Autowired
	private ChzzkChannelInfo channelInfo;


	public Object chzzkChannelInfo(String channelId) {
		
		
		return channelInfo.chzzkChannelInfo(channelId);
		
		
	}
	
	
	public Object chzzkLiveInfo(String channelId) {
		
		return channelInfo.chzzkLiveInfo(channelId);
		
		
	}
	
	
}