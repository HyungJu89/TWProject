package com.jwi.work.channel.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.alarm.dto.AlarmDto;
import com.jwi.work.alarm.mapper.AlarmMapper;
import com.jwi.work.channel.dto.bodyDto.DelectByUser;
import com.jwi.work.channel.dto.bodyDto.ReplyCreateDto;
import com.jwi.work.channel.dto.bodyDto.ReplyDeleteDto;
import com.jwi.work.channel.mapper.ReplyMapper;
import com.jwi.work.util.dto.AnswerDto;

@Service
public class ReplyService {

	@Autowired
	private ReplyMapper replyMapper;
	
	@Autowired
	private AlarmMapper alarmMapper;
	
	public AnswerDto<String> replyCreate(ReplyCreateDto createDto){
		
		AnswerDto<String> answer = new AnswerDto<>();
		
		replyMapper.replyCreate(createDto);
		
		
		int userKey = alarmMapper.getUserKey(createDto.getSessionId());
		if(createDto.getReplyreplyKey() == 0) {
			
		AlarmDto alarmDto = alarmMapper.getCommentUserKey(createDto.getCommentKey());
		
		alarmDto.setUserKey(userKey);
		
			if(userKey != alarmDto.getPostUserKey()) {
				alarmMapper.postAlarm(alarmDto);
			}
			
			if(userKey != alarmDto.getCommentUserKey()) {
				alarmMapper.commentAlarm(alarmDto);
			}
	
		
		
		} else {

		AlarmDto alarmDto = alarmMapper.getReplyUserKey(createDto.getReplyreplyKey());
		alarmDto.setUserKey(userKey);
		
		if(userKey != alarmDto.getPostUserKey()) {
			alarmMapper.postAlarm(alarmDto);
		}
		
		if(userKey != alarmDto.getCommentUserKey()) {
			alarmMapper.commentAlarm(alarmDto);
		}
		
		if(userKey != alarmDto.getReplyUserKey()) {
			alarmMapper.replyAlarm(alarmDto);
		}

		
		}
		
		answer.setMessage("성공");
		
		answer.setSuccess(true);
		
		return answer;
	}
	
	
	public AnswerDto<String> replyDeleteByUser(DelectByUser replyDelete){
		
		AnswerDto<String> anwer = new AnswerDto<>();
		try {
			replyMapper.replyDeleteByUser(replyDelete);
			anwer.setSuccess(true);
		}catch (Exception e) {
			anwer.setSuccess(false);
		}
		return anwer;
		
	}
	
	public AnswerDto<String> replyDelete(ReplyDeleteDto deleteDto){
		AnswerDto<String> answer = new AnswerDto<>();
		answer.setSuccess(true);
		answer.setMessage("성공");
		return answer;
	}
	
	
}
