package com.jwi.work.api.chzzkApi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class ApiResponseDto {
    @JsonProperty("code")
    private int code;

    @JsonProperty("message")
    private String message;

    @JsonProperty("content")
    private ChannelApiInfoDto content;  // 내부의 content 필드를 ChannelApiInfoDto로 매핑
}