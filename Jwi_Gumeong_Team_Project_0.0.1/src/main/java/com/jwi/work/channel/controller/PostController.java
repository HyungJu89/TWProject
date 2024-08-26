package com.jwi.work.channel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jwi.work.channel.dto.bodyDto.PostDeleteDto;
import com.jwi.work.channel.dto.bodyDto.PostLikeDto;
import com.jwi.work.channel.dto.postDto.PostDto;
import com.jwi.work.channel.service.PostService;
import com.jwi.work.util.dto.AnswerDto;
import com.jwi.work.util.dto.SearchDto;

@RestController
@RequestMapping("/post/*")
public class PostController {

	@Autowired
	private PostService postService;
	
	@GetMapping("/select")
	public SearchDto<List<PostDto>> postSelect(@RequestParam(value = "sessionId", defaultValue = "") String sessionId,@RequestParam("channelKey") int channelKey,@RequestParam("page")int page){
		if (sessionId.isEmpty()) {
	        sessionId = null;
	    }
		return postService.postSelect(sessionId,channelKey,page);
	}
	
	
	@PostMapping("/create")
	public AnswerDto<String> postCreate(
			@RequestParam("channelKey") int channelKey,
			@RequestParam("sessionId") String sessionId,
            @RequestParam("content") String content,
            @RequestParam(value = "files", required = false) List<MultipartFile> files
			) {
		
		return postService.postCreate(channelKey,sessionId,content,files);
		
	}
	
	@PostMapping("/delete")
	public AnswerDto<String> postDelete(@RequestBody PostDeleteDto deleteDto	){
		return postService.postDelete(deleteDto);
	}
	
	@PostMapping("/like")
	public void postLike(@RequestBody PostLikeDto likeDto) {
		postService.postLike(likeDto);
	}
	
	/*
	 * @PostMapping("/update") public AnswerDto<String> postUpdate(
	 * 
	 * @RequestParam("postKey") int postKey,
	 * 
	 * @RequestParam("userKey") int userKey,
	 * 
	 * @RequestParam("content") String content,
	 * 
	 * @RequestParam(value = "files", required = false) List<MultipartFile> files ){
	 * return postService.postUpdate(postKey,userKey,content,files); }
	 */
	
	
}
