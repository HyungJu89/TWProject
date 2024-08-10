package com.jwi.work.channel.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.channel.dto.AnswerDto;
import com.jwi.work.channel.dto.bodyDto.CommentCreateDto;
import com.jwi.work.channel.dto.bodyDto.CommentDeleteDto;
import com.jwi.work.channel.dto.commentDto.CommentDto;
import com.jwi.work.channel.mapper.CommentMapper;

@Service
public class CommentService {
	
	@Autowired
	private CommentMapper commentMapper;
	
	public AnswerDto<List<CommentDto>> commentSelect(int postKey,boolean isAsc){
		
		
		AnswerDto<List<CommentDto>> answer = new AnswerDto<>();
		
		try {
			answer.setMessage("게시글 확인중.");
			
			if(commentMapper.commentCount(postKey) == 0) {
				
				answer.setInfo(null);
				answer.setMessage("게시글이 없습니다.");
				answer.setSuccess(true);
				
			}
			
			answer.setInfo(commentMapper.commentSelect(postKey,isAsc));
			answer.setMessage("null.");
			answer.setSuccess(true);
			
		} catch (Exception e) {
			
			answer.setSuccess(false);
			
		}
		
		
		return answer;
	}
	
	public AnswerDto<String> commentCreate(CommentCreateDto createDto){
		AnswerDto<String> answer = new AnswerDto<>();
		commentMapper.commentCreate(createDto);
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
