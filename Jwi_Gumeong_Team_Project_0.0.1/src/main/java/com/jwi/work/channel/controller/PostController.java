package com.jwi.work.channel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jwi.work.channel.dto.AnswerDto;
import com.jwi.work.channel.service.PostService;

@RestController
@RequestMapping("/post/*")
public class PostController {

	@Autowired
	private PostService postService;
	
	@PostMapping("/create")
	public AnswerDto<String> postCreate(
			@RequestParam("channelKey") int channelKey,
			@RequestParam("userKey") int userKey,
            @RequestParam("content") String content,
            @RequestParam(value = "files", required = false) List<MultipartFile> files
			) {
		
		return postService.postCreate(channelKey,userKey,content,files);
		
	}
	
	
	
	
}
