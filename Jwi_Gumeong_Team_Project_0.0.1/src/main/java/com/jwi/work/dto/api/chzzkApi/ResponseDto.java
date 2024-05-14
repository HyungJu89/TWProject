package com.jwi.work.dto.api.chzzkApi;

import lombok.Data;

@Data
public class ResponseDto {
	private Integer code;
	private Object message;
	private ContentDto content;
}