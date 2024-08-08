package com.jwi.work.channel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.channel.dto.AnswerDto;
import com.jwi.work.channel.dto.ChannelCreateDto;
import com.jwi.work.channel.dto.ChannelDto;
import com.jwi.work.channel.service.ChannelService;

@RestController
@RequestMapping("/channel/*")
public class ChannelController {

	@Autowired
	private ChannelService channelService;

	@GetMapping("/check")
	public boolean channelCheck(@RequestParam("channelId") String channelId) {

		return channelService.channelCheck(channelId);

	}

	@PostMapping("/create")
	public AnswerDto<String> channelCreate(@RequestBody ChannelCreateDto channelCreate) {

		return channelService.channelCreate(channelCreate);

	}
	
	@GetMapping("/get")
	public AnswerDto<ChannelDto> channelGet(@RequestParam("channelId") String channelId){
		
		System.out.println(channelService.channelGet(channelId));
		return channelService.channelGet(channelId);
	}
	
	

}
