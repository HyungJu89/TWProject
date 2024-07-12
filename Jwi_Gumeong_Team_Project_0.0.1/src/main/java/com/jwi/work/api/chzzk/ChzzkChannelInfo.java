package com.jwi.work.api.chzzk;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.jwi.work.dto.api.chzzkApi.ResponseDto;

@Service
public class ChzzkChannelInfo {
	
	public ResponseDto chzzkChannelInfo(String channelId) {
		
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
							
		ResponseDto channelInfo = restTemplate.getForObject(uri, ResponseDto.class); 	
		System.out.println(API_URL);
		System.out.println(channelInfo);
		
		return channelInfo;
	}
	
//	public void homeShortInfoApi(String gridX,String gridY,SqlData sql) {
//		String API_URI = 
//				HOME_SHORT_INFO_URL + "getVilageFcst?serviceKey=" +
//				API_KEY + "&pageNo=1&numOfRows=1000&dataType=json&base_date="+
//				work.nowDateShort()+"&base_time=0500&nx="+gridX+"&ny="+gridY;
//		HttpHeaders headers = new HttpHeaders();
//		headers.setContentType(MediaType.APPLICATION_JSON);
//		headers.set(work.METHOD, work.FORM);
//		RestTemplate restTemplate = new RestTemplate();
//		HttpEntity<String> entity = new HttpEntity<>(headers);
//		URI uri = null;
//		try {
//			uri = new URI(API_URI);
//		} catch (URISyntaxException e) {
//			e.printStackTrace();
//		}
//		checkCode = restTemplate.exchange(uri, HttpMethod.GET, entity, ShortWeather.class).getBody();
//		ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);
//		
//		sql.setJsonData(response.getBody());
//		mapper.insertSqlData(sql);
//		if(checkCode.getResponse().getHeader().getResultCode().equals("00")) {
//		} else {
//			System.out.println("응답코드 에러 인서트 실패");
//		}
//	}
	
}
