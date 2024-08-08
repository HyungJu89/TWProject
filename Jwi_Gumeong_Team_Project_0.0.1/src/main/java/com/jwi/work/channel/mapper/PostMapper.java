package com.jwi.work.channel.mapper;

import org.apache.ibatis.annotations.Param;

import com.jwi.work.channel.dto.ImageDto;
import com.jwi.work.channel.dto.PostCreateDto;

public interface PostMapper {

	public ImageDto selectHash(@Param("imageHash") String imageHash);
	
	public void postCreate(PostCreateDto postCreate);
	
	public void insertImg(ImageDto imageDto);

	public void referenceUp(@Param("imageKey") int imageKey);
	
	public void referenceDown(@Param("imageKey") int imageKey);
}