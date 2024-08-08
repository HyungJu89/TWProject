package com.jwi.work.channel.dto;

import lombok.Data;

@Data
public class ImageDto {

	private int imageKey;
	private String imageUrl;
	private String imageHash;
	private int referenceCount;
	private String createdAt;
	
}
