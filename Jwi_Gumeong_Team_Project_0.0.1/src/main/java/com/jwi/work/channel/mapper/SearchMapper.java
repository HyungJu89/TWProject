package com.jwi.work.channel.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.jwi.work.channel.dto.channelDto.ChannelDto;
import com.jwi.work.channel.dto.postDto.PostDto;

public interface SearchMapper {

	
	
public int searchChannelCount(@Param("search") String search);

public List<ChannelDto> searchChannelList(@Param("search") String search,@Param("offset") int offset,@Param("limit") int limit);



public int searchPostCount(@Param("search") String search);

public List<PostDto> searchPostList(@Param("search") String search,@Param("offset") int offset,@Param("limit") int limit);

public int searchRecommendedCount();

public List<PostDto> searchRecommended(@Param("offset") int offset,@Param("limit") int limit);

public int searchFavoritesPostCount();

public List<PostDto> searchFavoritesPost(@Param("sessionId") String sessionId,@Param("offset") int offset,@Param("limit") int limit);

public int searchAllTopicCount();

public List<PostDto> searchAllTopic(@Param("offset") int offset,@Param("limit") int limit);

}
