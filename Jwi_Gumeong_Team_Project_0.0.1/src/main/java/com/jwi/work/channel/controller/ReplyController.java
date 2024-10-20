package com.jwi.work.channel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.channel.dto.bodyDto.DeleteByUser;
import com.jwi.work.channel.dto.bodyDto.ReplyCreateDto;
import com.jwi.work.channel.dto.bodyDto.ReplyDeleteDto;
import com.jwi.work.channel.service.ReplyService;
import com.jwi.work.util.dto.AnswerDto;

@RestController
@RequestMapping("/reply/*")
public class ReplyController {

	@Autowired
	private ReplyService replyservice;
	
@PostMapping("/create")
public AnswerDto<String> replyCreate(@RequestBody ReplyCreateDto createDto){
	System.out.println(createDto);
	return replyservice.replyCreate(createDto);
}

@PostMapping("/delete")
public AnswerDto<String> replyDelete(@RequestBody ReplyDeleteDto deleteDto){
	return replyservice.replyDelete(deleteDto);
}

@PostMapping("/deleteByUser")
public AnswerDto<String> replyDeleteByUser(@RequestBody DeleteByUser replyDelete){

	return replyservice.replyDeleteByUser(replyDelete);
}
	
}
