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
import com.jwi.work.channel.service.CreateChannelService;

@RestController
@RequestMapping("/channel/*")
public class ChannelCreateController {

	@Autowired
	private CreateChannelService createChannelService;

	@GetMapping("/check")
	public boolean channelCheck(@RequestParam("channelId") String channelId) {

		return createChannelService.channelCheck(channelId);

	}

	@PostMapping("/create")
	public AnswerDto channelCreate(@RequestBody ChannelCreateDto channelCreate) {

		return createChannelService.channelCreate(channelCreate);

	}

}
