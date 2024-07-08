package com.jwi.work.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jwi.work.dto.api.chzzkLiveApi.chzzkLiveApiDto;
import com.jwi.work.service.ChanneService;

import lombok.AllArgsConstructor;


@Controller
@RequestMapping("/channel/*")
@AllArgsConstructor
public class ChannelController {

	private ChanneService channeService;
	
	
	@GetMapping("/search")
	public String searchChanner() {
		
		return channeService.chzzkLiveInfo("0dad8baf12a436f722faa8e5001c5011");
	}
	
	
	@GetMapping("/postList/{channelId}")
	public String joinChanner(@PathVariable("channelId") String channelId) {
		

		
		return "channel/postList";
	}
	

	
}
