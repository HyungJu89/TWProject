package com.jwi.work.api.chzzkApi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.api.chzzkApi.service.ChzzkApiService;

import lombok.AllArgsConstructor;
@RestController
@RequestMapping("/channelAPI/*")
@AllArgsConstructor
// 리턴 전용 컨트롤러 @ResponseBody <<이거랑 똑같음 || RestController = Controller + ResponseBody
public class ChzzkApiController {

		
		private ChzzkApiService ChzzkApiService;
		
		@GetMapping("/search/{channelId}")
		public Object channelCreateRest(@PathVariable("channelId") String channelId) {
			
			if (ChzzkApiService.chzzkChannelInfo(channelId) == null) {
				System.out.println("데이터 오류");
			}else {
				System.out.println("채널 API 통과");
			}

			return ChzzkApiService.chzzkChannelInfo(channelId);
		}


		
		
		@GetMapping("/live/{channelId}")
		public Object searchChanner(@PathVariable("channelId") String channelId) {
			
			if (ChzzkApiService.chzzkChannelInfo(channelId) == null) {
				System.out.println("데이터 오류");
			}else {
				System.out.println("라이브 API 통과");
			}
			
			return ChzzkApiService.chzzkLiveInfo(channelId);
		}
		
	
}
