package com.jwi.work.channel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.channel.dto.bodyDto.CommentCreateDto;
import com.jwi.work.channel.dto.bodyDto.CommentDeleteDto;
import com.jwi.work.channel.dto.bodyDto.DelectByUser;
import com.jwi.work.channel.dto.commentDto.CommentListDto;
import com.jwi.work.channel.service.CommentService;
import com.jwi.work.util.dto.AnswerDto;

@RestController
@RequestMapping("/comment/*")
public class CommentController {
	
	@Autowired
	private CommentService commentService;
	
	@GetMapping("/select")
	public AnswerDto<CommentListDto> commentSelect(
			@RequestParam(value = "sessionId", defaultValue = "") String sessionId,
			@RequestParam(value = "postKey", defaultValue = "0") int postKey,
			@RequestParam(value = "isAsc", defaultValue = "false")boolean isAsc
			){
        return commentService.commentSelect(sessionId,postKey,isAsc);
	}
	
	@PostMapping("/create")
	public AnswerDto<String> commentCreate(@RequestBody CommentCreateDto createDto){
		
		return commentService.commentCreate(createDto);
	}
	@PostMapping("/deleteByUser")
	public AnswerDto<String> commentDeleteByUser(@RequestBody DelectByUser commentDelete){
		return commentService.commentDeleteByUser(commentDelete);
	}
	
	@PostMapping("/delete")	
	public AnswerDto<String> commentDelete(@RequestBody CommentDeleteDto createDto){
		return commentService.commentDelete(createDto);
	}
//	
//	@PostMapping(/update)
//	public AnswerDto<String> commentUpdate(@RequestBody commentCreateDto updateDto)
//	
//	
	
}
