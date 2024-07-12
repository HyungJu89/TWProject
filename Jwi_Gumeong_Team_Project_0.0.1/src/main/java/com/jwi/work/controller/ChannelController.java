package com.jwi.work.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/channel/*")
public class ChannelController {

	@GetMapping("/search")
	public String searchChanner() {
		
		return null;
	}
	
	
	@GetMapping("/postList/{channelId}")
	public String joinChanner(@PathVariable("channelId") String channelId) {
		
		
		System.out.println(channelId);
		
		return "channel/postList";
	}
	

	
}
