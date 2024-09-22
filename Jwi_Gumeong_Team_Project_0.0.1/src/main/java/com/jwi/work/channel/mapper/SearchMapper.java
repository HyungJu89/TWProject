package com.jwi.work.channel.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.jwi.work.channel.dto.channelDto.ChannelDto;
import com.jwi.work.channel.dto.postDto.PostDto;

public interface SearchMapper {

	
	
public int searchChannelCount(@Param("search") String search);

public List<ChannelDto> searchChannelList(@Param("sessionId") String sessionId,@Param("search") String search,@Param("offset") int offset,@Param("limit") int limit);



public int searchPostCount(@Param("search") String search);

public List<PostDto> searchPostList(@Param("sessionId") String sessionId,@Param("search") String search,@Param("offset") int offset,@Param("limit") int limit);

public int searchRecommendedCount();

public List<PostDto> searchRecommended(@Param("sessionId") String sessionId,@Param("offset") int offset,@Param("limit") int limit);

public int searchFavoritesPostCount(@Param("sessionId") String sessionId);

public List<PostDto> searchFavoritesPost(@Param("sessionId") String sessionId,@Param("offset") int offset,@Param("limit") int limit);

public int searchAllTopicCount();

public List<PostDto> searchAllTopic(@Param("sessionId") String sessionId,@Param("offset") int offset,@Param("limit") int limit);

//내 게시글 숫자
public int myPostCount (@Param("sessionId")String sessionId);


//내 게시글 리스트
public List<PostDto> postMyPost(@Param("sessionId")String sessionId,@Param("offset") int offset,@Param("limit") int limit);

}
