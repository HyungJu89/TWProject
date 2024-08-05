package com.jwi.work.channel.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.jwi.work.channel.dto.ChannelDto;
import com.jwi.work.channel.dto.PostDto;

public interface SearchMapper {

public int searchChannelCount(@Param("search") String search);

public List<ChannelDto> searchChannel(@Param("search") String search,@Param("offset") int offset,@Param("limit") int limit);

public int searchPostCount(@Param("search") String search);

public List<PostDto> searchPost(@Param("search") String search,@Param("offset") int offset,@Param("limit") int limit);


}
