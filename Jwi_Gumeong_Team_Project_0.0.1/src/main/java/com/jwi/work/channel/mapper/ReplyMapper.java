package com.jwi.work.channel.mapper;

import com.jwi.work.channel.dto.bodyDto.DelectByUser;
import com.jwi.work.channel.dto.bodyDto.ReplyCreateDto;

public interface ReplyMapper {

	public void replyCreate(ReplyCreateDto createDto);
	
	public void replyDeleteByUser(DelectByUser replyDelect);
	
}
