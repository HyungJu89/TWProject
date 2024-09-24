package com.jwi.work.channel.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.jwi.work.channel.dto.bodyDto.ChannelCreateDto;
import com.jwi.work.channel.dto.bodyDto.ChannelFavoriteDto;
import com.jwi.work.channel.dto.channelDto.ChannelDto;


public interface ChannelMapper {

	public int channelCheck(@Param("channelId") String channelId);
	
	public void channelCreate(ChannelCreateDto channelCreate);
	
	public ChannelDto channelGet(@Param("sessionId")String sessionId,@Param("channelId")String channelId);
	
	public void followerCountUpdate(@Param("followerCount")int followerCount,@Param("channelKey")int channelKey);
	
    // 시간 범위 내에서 데이터 가져오기
	public List<ChannelDto> HotBoardGet(
        @Param("startTime") String startTime,
        @Param("endTime") String endTime);
    
    //무작위 10개 가져오기
	public List<ChannelDto> RandomBoard();
    
    
    public void favorite(ChannelFavoriteDto channelFavorite);

    public void unFavorite(ChannelFavoriteDto channelFavorite);
    
    
    
}
