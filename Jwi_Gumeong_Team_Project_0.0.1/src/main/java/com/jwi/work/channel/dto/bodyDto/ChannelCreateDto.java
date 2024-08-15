package com.jwi.work.channel.dto.bodyDto;

import lombok.Data;

@Data
public class ChannelCreateDto {

	private String id;

	private String name;

	private String imageUrl;

	private int followerCount;

}
