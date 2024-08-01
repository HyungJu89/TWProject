package com.jwi.work.channel.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.channel.dto.ChannelDto;
import com.jwi.work.channel.dto.PostDto;
import com.jwi.work.channel.dto.SearchDto;
import com.jwi.work.channel.mapper.SearchMapper;
import com.jwi.work.channel.util.PagingUtil;

@Service
public class SearchService {

	
	
	@Autowired
	private SearchMapper searchMapper; 
	
	private PagingUtil pagingUtil = new PagingUtil();
	
	public SearchDto<ChannelDto> searchChannel(String search, int page){
		
		final int LIMIT_PAGE = 8;
		
		SearchDto<ChannelDto> searchChannel = new SearchDto<>();
		
		// 검색된 채널의 갯수
		int channelCount = searchMapper.searchChannelCount(search);
		
		//검색 결과가 없을때 표시할 부분
		if(channelCount == 0) {
			// Count 가 0 일땐 검색이 안된것이니 false 로 설정
			searchChannel.setSearchSuccess(false);
			// searchChannel값을 바로 리턴시킨다.
			return searchChannel; 
		}
		// Count가 0이 아니기때문에 빠져나왔으니 검색결과 있음
		searchChannel.setSearchSuccess(true);
		
		searchChannel.setPaging(pagingUtil.paging(page, channelCount,LIMIT_PAGE)); 

		//채널의 갯수리턴
		List<ChannelDto> channels = searchMapper.searchChannel(search, searchChannel.getPaging().getOffset(),searchChannel.getPaging().getLimit());
		
		searchChannel.setSearch(channels);
		
		return searchChannel;
		
	}
	
	public SearchDto<PostDto> searchPost(String search, int page) {
		
		final int LIMIT_PAGE = 10;
		
		SearchDto<PostDto> searchPost = new SearchDto<>();
		
		//검색된 개시글 갯수
		int postCount = searchMapper.searchPostCount(search);
		
		if(postCount == 0) {
			searchPost.setSearchSuccess(false);
			
			return searchPost; 
		}
		searchPost.setSearchSuccess(true);
		
		searchPost.setPaging(pagingUtil.paging(page, postCount,LIMIT_PAGE)); 
		
		List<PostDto> posts = searchMapper.searchPost(search, searchPost.getPaging().getOffset(),searchPost.getPaging().getLimit());
		
		searchPost.setSearch(posts);
		
		return searchPost;
		
	}
	
	
}
