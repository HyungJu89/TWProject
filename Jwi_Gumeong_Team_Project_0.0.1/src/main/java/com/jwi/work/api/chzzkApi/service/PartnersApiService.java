package com.jwi.work.api.chzzkApi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.api.chzzkApi.util.PartnersApiInfo;

@Service
public class PartnersApiService {
	
	@Autowired
	private PartnersApiInfo PartnersInfo;


	public Object PartnersLiveInfo() {
		
		
		return PartnersInfo.PartnersLiveInfo();
		
		
	}
	
	
}
