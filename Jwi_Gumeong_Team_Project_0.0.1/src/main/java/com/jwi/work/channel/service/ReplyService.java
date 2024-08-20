package com.jwi.work.channel.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.channel.dto.bodyDto.ReplyCreateDto;
import com.jwi.work.channel.dto.bodyDto.ReplyDeleteDto;
import com.jwi.work.channel.mapper.ReplyMapper;
import com.jwi.work.util.dto.AnswerDto;

@Service
public class ReplyService {

	@Autowired
	private ReplyMapper replyMapper;
	
	public AnswerDto<String> replyCreate(ReplyCreateDto createDto){
		AnswerDto<String> answer = new AnswerDto<>();
		replyMapper.replyCreate(createDto);
		answer.setMessage("성공");
		answer.setSuccess(true);
		return answer;
	}
	
	public AnswerDto<String> replyDelete(ReplyDeleteDto deleteDto){
		AnswerDto<String> answer = new AnswerDto<>();
		answer.setSuccess(true);
		answer.setMessage("성공");
		return answer;
	}
	
	
}
