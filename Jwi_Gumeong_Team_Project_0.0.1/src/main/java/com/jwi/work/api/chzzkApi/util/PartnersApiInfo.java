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
		//파트너스 api **수정 시 main.js import도 바꿔야함
//		API_URL = "https://api.chzzk.naver.com/service/v1/streamer-partners/recommended";
		//무작위 방송 api **수정 시 main.js import도 바꿔야함
		API_URL = "https://api.chzzk.naver.com/service/v1/home/recommendation-channels";
		
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
