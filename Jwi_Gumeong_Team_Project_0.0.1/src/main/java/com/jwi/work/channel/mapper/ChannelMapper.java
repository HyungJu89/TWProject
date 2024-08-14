package com.jwi.work.channel.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.jwi.work.channel.dto.bodyDto.ChannelCreateDto;
import com.jwi.work.channel.dto.channelDto.ChannelDto;


public interface ChannelMapper {

	public int channelCheck(@Param("channelId") String channelId);
	
	public void channelCreate(ChannelCreateDto channelCreate);
	
	public ChannelDto channelGet(@Param("channelId")String channelId);
	
    // 시간 범위 내에서 데이터 가져오기
    List<ChannelDto> HotBoardGet(
        @Param("startTime") String startTime,
        @Param("endTime") String endTime);
}
