package com.jwi.work.channel.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.jwi.work.channel.dto.postDto.PostDto;
import com.jwi.work.channel.dto.sqlDto.ImageInfoDto;
import com.jwi.work.channel.dto.sqlDto.PostInfoDto;

public interface PostMapper {

	public int postCount (@Param("channelKey")int channelKey);
	
	public List<PostDto> postList(@Param("channelKey")int channelKey,@Param("offset") int offset,@Param("limit") int limit);
	
	public ImageInfoDto selectHash(@Param("imageHash") String imageHash);
	
	public ImageInfoDto selectUrl(@Param("imageUrl") String imageUrl);
	
	public void postCreate(@Param("userKey") int userKey,@Param("channelKey") int channelKey,@Param("content") String content,@Param("imageJson") String imageJson);
	
	public void insertImg(@Param("imageHash")String imageHash ,@Param("imageUrl") String imageUrl);

	public void referenceUp(@Param("imageKey") int imageKey);
	
	public void referenceDown(@Param("imageKey") int imageKey);
	
	public void deleteImg(@Param("imageKey") int imageKey);
	
	public PostInfoDto postInfo(@Param("postKey")int postKey);
	

	 
	public void postDelete(@Param("postKey")int postKey); 
	
//	public void postUpdate(@Param("postKey")int postKey,@Param("content")String content,@Param("image")String image);
}