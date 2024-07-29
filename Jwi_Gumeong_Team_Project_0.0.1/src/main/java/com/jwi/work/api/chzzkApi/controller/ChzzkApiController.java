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
			//@RequestBody createChannelDto channelId
			//channelId.setChannelId();
			System.out.print(channelId);
			return ChzzkApiService.chzzkChannelInfo("0b33823ac81de48d5b78a38cdbc0ab94");
		}


		
		
		@GetMapping("/live/{channelId}")
		public Object searchChanner(@PathVariable("channelId") String channelId) {
			
			return ChzzkApiService.chzzkLiveInfo("0b33823ac81de48d5b78a38cdbc0ab94");
		}
		
	
}
