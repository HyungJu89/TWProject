package com.jwi.work.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.dto.api.chzzkApi.ResponseDto;
import com.jwi.work.dto.channel.createChannelDto;
import com.jwi.work.service.ChannelCreateService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/channelRest/*")
@AllArgsConstructor
// 리턴 전용 컨트롤러 @ResponseBody <<이거랑 똑같음 || RestController = Controller + ResponseBody
public class ChannelRestController {

	private ChannelCreateService service;
	
	
	
	@PostMapping("/search")
	public ResponseDto channelCreateRest(@RequestBody createChannelDto channelId) {

		return service.createSearch(channelId.getChannelId());
	}
	
	@PostMapping("/create")
	public boolean createChannerProcess(@RequestBody createChannelDto channelInfo) {

		return service.createChannel(channelInfo);
	}
	
}
