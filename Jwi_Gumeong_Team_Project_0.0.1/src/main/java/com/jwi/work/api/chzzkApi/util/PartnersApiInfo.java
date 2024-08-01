package com.jwi.work.api.chzzkApi.util;

import java.net.URI;
import java.net.URISyntaxException;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class PartnersApiInfo {
	//파트너스 API 정보 오브젝트로 정제 
	public Object PartnersLiveInfo() {
		String API_URL = null;
		API_URL = "https://api.chzzk.naver.com/service/v1/streamer-partners/recommended";
		
		RestTemplate restTemplate = new RestTemplate();					
		URI uri = null; 				
		try {	
			uri = new URI(API_URL);				
		} catch (URISyntaxException e) {					
			e.printStackTrace();				
		}
		
		Object channelInfo = restTemplate.getForObject(uri, Object.class); 	
		return channelInfo;
		
		
	};

}
