package com.jwi.work.report.dto.bodyDto;

import lombok.Data;

@Data
public class ReportDto {

	private String sessionId;
	private String referenceType;
	private int referenceKey;
	private String category;
	private String content;
	
}
