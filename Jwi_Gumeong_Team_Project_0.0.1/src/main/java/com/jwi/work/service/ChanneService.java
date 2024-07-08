package com.jwi.work.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.api.chzzk.ChzzkChannelInfo;

@Service
public class ChanneService {
	
	@Autowired
	private ChzzkChannelInfo channerInfo;

	public String chzzkLiveInfo(String channelId) {
		
		
		
		return channerInfo.chzzkLiveInfo(channelId);
		
	}

}
