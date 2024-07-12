package com.jwi.work.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jwi.work.service.ChanneService;

import lombok.AllArgsConstructor;


@Controller
@RequestMapping("/channel/*")
@AllArgsConstructor
public class ChannelController {


	
	@GetMapping("/postList/{channelId}")
	public Object joinChanner(@PathVariable("channelId") String channelId) {
		

		
		return "channel/postList";
	}
	

	
}
