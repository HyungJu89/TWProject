package com.jwi.work.channel.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.jwi.work.channel.dto.bodyDto.CommentCreateDto;
import com.jwi.work.channel.dto.commentDto.CommentDto;

public interface CommentMapper {

	public int commentCount(@Param("postKey")int postKey);
	
	public List<CommentDto> commentSelect(@Param("postKey") int postKey,@Param("isAsc")boolean isAsc);
	
	public void commentCreate(CommentCreateDto createDto);
	
}
