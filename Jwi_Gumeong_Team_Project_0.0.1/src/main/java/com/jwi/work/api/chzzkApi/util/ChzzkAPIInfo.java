package com.jwi.work.api.chzzkApi.util;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.jwi.work.api.chzzkApi.dto.ApiResponseDto;
import com.jwi.work.api.chzzkApi.dto.ChannelApiInfoDto;

@Service
public class ChzzkAPIInfo {

	public Object chzzkChannelInfo(String channelId) {

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

		Object channelInfo = restTemplate.getForObject(uri, Object.class);

		return channelInfo;
	}

	public Object chzzkLiveInfo(String channelId) {
		String API_URL = null;
		try {
			String encodedChanneId = URLEncoder.encode(channelId, "UTF-8");

			API_URL = "https://api.chzzk.naver.com/service/v1/channels/" + encodedChanneId
					+ "/data?fields=banners,topExposedVideos,missionDonationChannelHomeExposure";
		} catch (UnsupportedEncodingException e1) {
		}

		RestTemplate restTemplate = new RestTemplate();
		URI uri = null;
		try {
			uri = new URI(API_URL);
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}

		Object channelInfo = restTemplate.getForObject(uri, Object.class);
		return channelInfo;
	}
	
	
	public ApiResponseDto channelApiInfoGet(String channelId) {
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
		

		ApiResponseDto channelInfo = restTemplate.getForObject(uri, ApiResponseDto.class);

		return channelInfo;

	}

}
