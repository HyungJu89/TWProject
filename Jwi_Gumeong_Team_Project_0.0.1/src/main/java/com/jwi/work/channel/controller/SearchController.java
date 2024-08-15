package com.jwi.work.channel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.channel.dto.SearchDto;
import com.jwi.work.channel.dto.channelDto.ChannelDto;
import com.jwi.work.channel.dto.postDto.PostDto;
import com.jwi.work.channel.service.SearchService;

@RestController
@RequestMapping("/search/*")
public class SearchController {

	@Autowired
	private SearchService searchService;


	
	@GetMapping("/channel")
	public SearchDto<List<ChannelDto>> searchChannelList(
			@RequestParam(value = "search", defaultValue = "") String search,
			@RequestParam(value = "page", defaultValue = "1") int page) {
		return searchService.searchChannel(search, page);
		
	}

	@GetMapping("/post")
	public SearchDto<List<PostDto>> searchPost(
			@RequestParam(value = "search", defaultValue = "") String search,
			@RequestParam(value = "page", defaultValue = "1") int page) {

		return searchService.searchPost(search, page);
		
	}
	
	@GetMapping("/recommended")
	public SearchDto<List<PostDto>> searchRecommended(@RequestParam(value = "page", defaultValue = "1") int page){
		return searchService.searchRecommended(page);
	}
	
	@GetMapping("/allTopic")
	public SearchDto<List<PostDto>> searchAllTopic(@RequestParam(value = "page", defaultValue = "1") int page){
		
		return searchService.searchAllTopic(page);
	}
	
	
}
