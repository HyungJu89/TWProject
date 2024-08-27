package com.jwi.work.channel.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.alarm.dto.AlarmDto;
import com.jwi.work.alarm.mapper.AlarmMapper;
import com.jwi.work.channel.dto.bodyDto.CommentCreateDto;
import com.jwi.work.channel.dto.bodyDto.CommentDeleteDto;
import com.jwi.work.channel.dto.commentDto.CommentListDto;
import com.jwi.work.channel.mapper.CommentMapper;
import com.jwi.work.util.dto.AnswerDto;

@Service
public class CommentService {
	
	@Autowired
	private CommentMapper commentMapper;
	
	@Autowired
	private AlarmMapper alarmMapper;
	
	public AnswerDto<CommentListDto> commentSelect(String sessionId,int postKey,boolean isAsc){
		
		
		AnswerDto<CommentListDto> answer = new AnswerDto<>();
		
		CommentListDto commentListDto = new CommentListDto();
		try {
			answer.setMessage("댓글 확인중.");
			int commentCount = commentMapper.commentCount(postKey);
			if(commentCount == 0) {
				
				answer.setInfo(null);
				answer.setMessage("댓글이 없습니다.");
				answer.setSuccess(false);
				return answer;
			}
			commentListDto.setComment(commentMapper.commentSelect(sessionId,postKey,isAsc));
			commentListDto.setCommentCount(commentCount);
			answer.setInfo(commentListDto);
			answer.setMessage("null.");
			answer.setSuccess(true);
			
		} catch (Exception e) {
			
			answer.setSuccess(false);
			System.out.println("에러");
			e.printStackTrace();  // 예외의 스택 트레이스를 출력하여 오류의 원인 파악
			
		}
		
		
		return answer;
	}
	
	public AnswerDto<String> commentCreate(CommentCreateDto createDto){
		
		AnswerDto<String> answer = new AnswerDto<>();
		
		commentMapper.commentCreate(createDto);
		
		AlarmDto alarmDto = alarmMapper.getPostUserKey(createDto.getPostKey());
		
		int userKey = alarmMapper.getUserKey(createDto.getSessionId());
		
		if(alarmDto.getPostUserKey() != userKey) {
		alarmMapper.postAlarm(alarmDto);
		}
		answer.setSuccess(true);
		
		answer.setMessage("성공");
		
		return answer;
		
	}
	
	public AnswerDto<String> commentDelete(CommentDeleteDto createDto){
		AnswerDto<String> answer = new AnswerDto<>();
		
		answer.setMessage("성공");
		answer.setSuccess(true);
		return answer;
	}
	
//	public AnswerDto<String>commentUpdate(){
//		AnswerDto<String> answer = new AnswerDto<>();
//		
//		answer.setMessage("성공");
//		return answer;
//	}
		
}
