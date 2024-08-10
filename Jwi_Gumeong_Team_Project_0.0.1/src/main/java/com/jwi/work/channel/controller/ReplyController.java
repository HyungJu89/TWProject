package com.jwi.work.channel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.channel.dto.AnswerDto;
import com.jwi.work.channel.dto.bodyDto.ReplyCreateDto;
import com.jwi.work.channel.dto.bodyDto.ReplyDeleteDto;
import com.jwi.work.channel.service.ReplyService;

@RestController
@RequestMapping("/reply/*")
public class ReplyController {

	@Autowired
	private ReplyService replyservice;
	
@PostMapping("/create")
public AnswerDto<String> replyCreate(@RequestBody ReplyCreateDto createDto){
	return replyservice.replyCreate(createDto);
}

@PostMapping("/delete")
public AnswerDto<String> replyDelete(@RequestBody ReplyDeleteDto deleteDto){
	return replyservice.replyDelete(deleteDto);
}
	
}
