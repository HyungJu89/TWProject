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
		System.out.print(channelId);
		return service.createSearch("0b33823ac81de48d5b78a38cdbc0ab94");
	}


	
	
	@GetMapping("/live/{channelId}")
	public Object searchChanner(@PathVariable("channelId") String channelId) {
		
		return channeService.chzzkLiveInfo("0b33823ac81de48d5b78a38cdbc0ab94");
	}
	
	
	
	@PostMapping("/create")
	public boolean createChannerProcess(@RequestBody createChannelDto channelInfo) {

		return service.createChannel(channelInfo);
	}
	
}
