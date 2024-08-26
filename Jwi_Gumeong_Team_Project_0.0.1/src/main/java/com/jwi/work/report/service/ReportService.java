package com.jwi.work.report.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.report.dto.bodyDto.ReportDto;
import com.jwi.work.report.mapper.ReportMapper;
import com.jwi.work.util.dto.AnswerDto;

@Service
public class ReportService {

	@Autowired
	private ReportMapper reportMapper;
	
	public AnswerDto<String> reportSubmit(ReportDto reportDto){
		
		AnswerDto<String> answerDto = new AnswerDto<>();
		
		if(reportDto.getReferenceType().equals("post") || reportDto.getReferenceType().equals("comment") || reportDto.getReferenceType().equals("reply")) {
			reportMapper.reportSubmit(reportDto);
			answerDto.setSuccess(true);
			answerDto.setMessage("신고완료");
		} else {
			answerDto.setSuccess(false);
			answerDto.setMessage("올바르지않은 신고입니다.");
		}
		
		
		return answerDto;
	}
	
	
	
	
}
