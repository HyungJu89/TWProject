package com.jwi.work.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.dto.channel.createChannelDto;
import com.jwi.work.service.ChanneService;
import com.jwi.work.service.ChannelCreateService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/channelRest/*")
@AllArgsConstructor
// 리턴 전용 컨트롤러 @ResponseBody <<이거랑 똑같음 || RestController = Controller + ResponseBody
public class ChannelRestController {

	private ChannelCreateService service;
	
	private ChanneService channeService;
	
	@GetMapping("/search/{channelId}")
	public Object channelCreateRest(@PathVariable("channelId") String channelId) {
		//@RequestBody createChannelDto channelId
		//channelId.setChannelId();
		return service.createSearch("b2665a30ba249486bf2c134973cfc7a2");
	}


	
	
	@GetMapping("/live/{channelId}")
	public Object searchChanner(@PathVariable("channelId") String channelId) {
		
		return channeService.chzzkLiveInfo("b2665a30ba249486bf2c134973cfc7a2");
	}
	
	
	
	@PostMapping("/create")
	public boolean createChannerProcess(@RequestBody createChannelDto channelInfo) {

		return service.createChannel(channelInfo);
	}
	
}
