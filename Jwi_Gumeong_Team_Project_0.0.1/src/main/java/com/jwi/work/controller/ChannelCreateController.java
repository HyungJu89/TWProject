package com.jwi.work.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.jwi.work.dto.api.chzzkApi.ContentDto;
import com.jwi.work.dto.api.chzzkApi.ResponseDto;
import com.jwi.work.dto.channel.createChannelDto;
import com.jwi.work.service.ChannelCreateService;

import lombok.AllArgsConstructor;


@Controller
@RequestMapping("/channel/*")
@AllArgsConstructor
public class ChannelCreateController {

	private ChannelCreateService service;
	
	@GetMapping("/channelCreate")
	public String createChanner() {
		
		
		
		
			
		return "channel/channelCreate";
	}
	
	
}
