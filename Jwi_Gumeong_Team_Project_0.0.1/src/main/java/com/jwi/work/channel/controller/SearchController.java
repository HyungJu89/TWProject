package com.jwi.work.channel.controller;

import java.io.Console;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.channel.dto.channelDto.ChannelDto;
import com.jwi.work.channel.dto.postDto.PostDto;
import com.jwi.work.channel.service.SearchService;
import com.jwi.work.util.dto.SearchDto;

@RestController
@RequestMapping("/search/*")
public class SearchController {

	@Autowired
	private SearchService searchService;


	
	@GetMapping("/channel")
	public SearchDto<List<ChannelDto>> searchChannelList(
			@RequestParam(value = "sessionId", defaultValue = "") String sessionId,
			@RequestParam(value = "search", defaultValue = "") String search,
			@RequestParam(value = "page", defaultValue = "1") int page) {
		return searchService.searchChannel(sessionId,search, page);
		
	}

	@GetMapping("/post")
	public SearchDto<List<PostDto>> searchPost(
			@RequestParam(value = "sessionId", defaultValue = "") String sessionId,
			@RequestParam(value = "search", defaultValue = "") String search,
			@RequestParam(value = "page", defaultValue = "1") int page) {

		return searchService.searchPost(sessionId,search, page);
		
	}
	
	@GetMapping("/recommended")
	public SearchDto<List<PostDto>> searchRecommended(@RequestParam(value = "sessionId", defaultValue = "") String sessionId,@RequestParam(value = "page", defaultValue = "1") int page){
		return searchService.searchRecommended(sessionId,page);
	}

	@GetMapping("/favorites")
	public SearchDto<List<PostDto>> searchFavorites(@RequestParam(value = "sessionId", defaultValue = "") String sessionId,@RequestParam(value = "page", defaultValue = "1") int page){

		return searchService.searchFavorites(sessionId,page);
	}
	@GetMapping("/allTopic")
	public SearchDto<List<PostDto>> searchAllTopic(@RequestParam(value = "sessionId", defaultValue = "") String sessionId,@RequestParam(value = "page", defaultValue = "1") int page){
		return searchService.searchAllTopic(sessionId,page);
	}
	
	
}
