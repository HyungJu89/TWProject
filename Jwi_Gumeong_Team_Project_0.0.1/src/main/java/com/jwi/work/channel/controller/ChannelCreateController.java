package com.jwi.work.channel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.channel.dto.ChannelDto;
import com.jwi.work.channel.dto.ChannelIdDto;
import com.jwi.work.channel.service.CreateChannelService;

@RestController
@RequestMapping("/channel/*")
public class ChannelCreateController {

	@Autowired
	private CreateChannelService createChannelService;

	@PostMapping("/check")
	public boolean channelCheck(@RequestBody ChannelIdDto channelId) {
		
		return createChannelService.channelCheck(channelId.getChannelId());

	}

	@PostMapping("/create")
	public String channelCreate(@RequestBody ChannelDto channelCreate) {
		
		return createChannelService.channelCreate(channelCreate);

	}

}
