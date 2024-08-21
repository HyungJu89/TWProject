package com.jwi.work.report.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.report.dto.bodyDto.ReportDto;
import com.jwi.work.report.service.ReportService;
import com.jwi.work.util.dto.AnswerDto;


@RestController
@RequestMapping("/report/*")
public class ReportController {

	@Autowired
	private ReportService reportService;
	
	
	@PostMapping("/submit")
	public AnswerDto<String> reportSubmit(@RequestBody ReportDto reportDto){
		return reportService.reportSubmit(reportDto);
	}
	
	
}
