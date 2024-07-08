package com.jwi.work.api.chzzk;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.jwi.work.dto.api.chzzkApi.ResponseDto;
import com.jwi.work.dto.api.chzzkLiveApi.chzzkLiveApiDto;

@Service
public class ChzzkChannelInfo {
	
	public String chzzkChannelInfo(String channelId) {
		
		String API_URL = "https://api.chzzk.naver.com/service/v1/channels/";
		
		try {
			String encodedChanneId = URLEncoder.encode(channelId, "UTF-8");
			API_URL = API_URL + encodedChanneId;
			
			
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}
		
		RestTemplate restTemplate = new RestTemplate();					
		URI uri = null; 				
		try {	
			uri = new URI(API_URL);				
		} catch (URISyntaxException e) {					
			e.printStackTrace();				
		}
							
		String channelInfo = restTemplate.getForObject(uri, String.class); 	
		System.out.println(API_URL);
		System.out.println(channelInfo);
		
		return channelInfo;
	}
	
	
	
	
	
	public String chzzkLiveInfo(String channelId) {
		String API_URL = null;
		try {
			String encodedChanneId = URLEncoder.encode(channelId, "UTF-8");
			API_URL = "https://api.chzzk.naver.com/service/v1/channels/"+ encodedChanneId+"/data?fields=banners,topExposedVideos,missionDonationChannelHomeExposure";
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}
		
		
		
		RestTemplate restTemplate = new RestTemplate();					
		URI uri = null; 				
		try {	
			uri = new URI(API_URL);				
		} catch (URISyntaxException e) {					
			e.printStackTrace();				
		}
							
		String channelInfo = restTemplate.getForObject(uri, String.class); 	
		System.out.println(API_URL);
		System.out.println(channelInfo);
		
		return channelInfo;
	}
}
