package com.jwi.work.channel.dto;

import java.util.List;

import lombok.Data;

@Data
public class PostCreateDto {

	private int userKey;
	private int channelKey;
	private String content;
	private String image;
	
}
