package com.jwi.work.channel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.channel.dto.ChannelDto;
import com.jwi.work.channel.dto.PostDto;
import com.jwi.work.channel.dto.SearchDto;
import com.jwi.work.channel.service.SearchService;

@RestController
@RequestMapping("/search/*")
public class SearchController {

	@Autowired
	private SearchService searchService;

	@GetMapping("/channel")
	public SearchDto<ChannelDto> searchChannel(
			@RequestParam(value = "search", defaultValue = "") String search,
			@RequestParam(value = "page", defaultValue = "1") int page) {
		
		System.out.println(search + "" + page);
		System.out.println(searchService.searchChannel(search, page));
		return searchService.searchChannel(search, page);

	}

	@GetMapping("/post")
	public SearchDto<PostDto> searchPost(
			@RequestParam(value = "search", defaultValue = "") String search,
			@RequestParam(value = "page", defaultValue = "1") int page) {

		return searchService.searchPost(search, page);

	}

}
