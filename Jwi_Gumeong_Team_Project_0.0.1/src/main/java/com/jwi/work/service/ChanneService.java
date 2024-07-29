package com.jwi.work.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.api.chzzkApi.util.ChzzkAPIInfo;

@Service
public class ChanneService {
	
	@Autowired
	private ChzzkAPIInfo channerInfo;

	public Object chzzkLiveInfo(String channelId) {
		
		
		
		return channerInfo.chzzkLiveInfo(channelId);
		
	}

}
