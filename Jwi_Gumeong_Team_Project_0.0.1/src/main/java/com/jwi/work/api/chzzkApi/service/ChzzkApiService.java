package com.jwi.work.api.chzzkApi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.api.chzzkApi.util.ChzzkAPIInfo;

@Service
public class ChzzkApiService {

	@Autowired
	private ChzzkAPIInfo channelInfo;


	public Object chzzkChannelInfo(String channelId) {
		
		
		return channelInfo.chzzkChannelInfo(channelId);
		
		
	}
	
	
	public Object chzzkLiveInfo(String channelId) {
		System.out.println("라이브 api 오류 체크용");
		System.out.println(channelInfo.chzzkLiveInfo(channelId));
		return channelInfo.chzzkLiveInfo(channelId);
		
		
	}
	
	
}