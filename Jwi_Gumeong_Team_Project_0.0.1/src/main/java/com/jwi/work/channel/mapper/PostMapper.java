package com.jwi.work.channel.mapper;

import org.apache.ibatis.annotations.Param;

import com.jwi.work.channel.dto.ImageDto;
import com.jwi.work.channel.dto.PostCreateDto;
import com.jwi.work.channel.dto.PostDto;

public interface PostMapper {

	public ImageDto selectHash(@Param("imageHash") String imageHash);
	
	public void postCreate(PostCreateDto postCreate);
	
	public void insertImg(ImageDto imageDto);

	public void referenceUp(@Param("imageKey") int imageKey);
	
	public void referenceDown(@Param("imageKey") int imageKey);
	
	public void deleteImg(@Param("imageKey") int imageKey);
	
	public PostDto postInfo(@Param("postKey")int postKey);
	
	public ImageDto selectUrl(@Param("imageUrl") String imageUrl);
	 
	public void postDelete(@Param("postKey")int postKey); 
}