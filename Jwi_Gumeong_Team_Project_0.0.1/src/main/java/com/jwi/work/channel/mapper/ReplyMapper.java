package com.jwi.work.channel.mapper;

import com.jwi.work.channel.dto.bodyDto.DeleteByUser;
import com.jwi.work.channel.dto.bodyDto.ReplyCreateDto;

public interface ReplyMapper {

	public void replyCreate(ReplyCreateDto createDto);
	
	public void replyDeleteByUser(DeleteByUser replyDelect);
	
}
