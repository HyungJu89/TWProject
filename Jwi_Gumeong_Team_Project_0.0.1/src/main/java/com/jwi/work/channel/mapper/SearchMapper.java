package com.jwi.work.channel.mapper;

public interface SearchMapper {

public int searchChannelCount(String search);

public Object searchChannel(String search,int offset,int limit);

public int searchPostCount(String search);

public Object  searchPost(String search,int offset,int limit);


}
