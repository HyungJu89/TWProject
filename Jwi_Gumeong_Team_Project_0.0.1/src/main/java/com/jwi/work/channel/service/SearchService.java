package com.jwi.work.channel.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.channel.dto.channelDto.ChannelDto;
import com.jwi.work.channel.dto.postDto.PostDto;
import com.jwi.work.channel.mapper.SearchMapper;
import com.jwi.work.util.PagingUtil;
import com.jwi.work.util.dto.SearchDto;

@Service
public class SearchService {

	@Autowired
	private SearchMapper searchMapper;

	private PagingUtil pagingUtil = new PagingUtil();

	public SearchDto<List<ChannelDto>> searchChannel(String sessionId,String search, int page) {

		final int LIMIT_PAGE = 8;

		SearchDto<List<ChannelDto>> searchChannel = new SearchDto<>();

		// 검색된 채널의 갯수
		int channelCount = searchMapper.searchChannelCount(search);

		// 검색 결과가 없을때 표시할 부분
		if (channelCount == 0) {
			searchChannel.setSuccess(true);
			// searchChannel값을 바로 리턴시킨다.
			return searchChannel;
		}
		// Count가 0이 아니기때문에 빠져나왔으니 검색결과 있음
		searchChannel.setSuccess(true);

		searchChannel.setPaging(pagingUtil.paging(page, channelCount, LIMIT_PAGE));

		// 채널의 갯수리턴
		List<ChannelDto> channels = searchMapper.searchChannelList(sessionId,search, searchChannel.getPaging().getOffset(),
				searchChannel.getPaging().getLimit());

		searchChannel.setSearch(channels);

		return searchChannel;

	}

	public SearchDto<List<PostDto>> searchPost(String sessionId,String search, int page) {

		final int LIMIT_PAGE = 10;

		SearchDto<List<PostDto>> searchPost = new SearchDto<>();

		// 검색된 개시글 갯수



		int postCount = searchMapper.searchPostCount(search);

		if (postCount == 0) {
			searchPost.setSuccess(true);

			return searchPost;
		}
		
		searchPost.setSuccess(true);

		searchPost.setPaging(pagingUtil.paging(page, postCount, LIMIT_PAGE));
		

			List<PostDto> posts = searchMapper.searchPostList(sessionId,search, searchPost.getPaging().getOffset(),searchPost.getPaging().getLimit());
			
			searchPost.setSearch(posts);

		return searchPost;

	}
	 
	public SearchDto<List<PostDto>> searchRecommended(String sessionId,int page){
		final int LIMIT_PAGE = 10;
		
		SearchDto<List<PostDto>> searchPost = new SearchDto<>();
		
		int postCount = searchMapper.searchAllTopicCount();
		
		if (postCount == 0) {
			searchPost.setSuccess(true);

			return searchPost;
		}
		
		searchPost.setSuccess(true);

		searchPost.setPaging(pagingUtil.paging(page, postCount, LIMIT_PAGE));
		
		List<PostDto> posts = searchMapper.searchRecommended(sessionId,searchPost.getPaging().getOffset(),searchPost.getPaging().getLimit());
		
		searchPost.setSearch(posts);

		return searchPost;
	}
	
	public SearchDto<List<PostDto>> searchFavorites(String sessionId,int page){

		final int LIMIT_PAGE = 10;

		SearchDto<List<PostDto>> searchPost = new SearchDto<>();
		
		int postCount = searchMapper.searchFavoritesPostCount(sessionId);
		if (postCount == 0) {
			searchPost.setSuccess(true);
			return searchPost;
		}
		searchPost.setSuccess(true);
		searchPost.setPaging(pagingUtil.paging(page, postCount, LIMIT_PAGE));
		List<PostDto> posts = searchMapper.searchFavoritesPost(sessionId,searchPost.getPaging().getOffset(),searchPost.getPaging().getLimit());
		searchPost.setSearch(posts);

		return searchPost;
	}
	
	public SearchDto<List<PostDto>> searchAllTopic(String sessionId,int page){
		
		final int LIMIT_PAGE = 10;
		
		SearchDto<List<PostDto>> searchPost = new SearchDto<>();
		
		int postCount = searchMapper.searchAllTopicCount();
		
		if (postCount == 0) {
			searchPost.setSuccess(true);

			return searchPost;
		}
		
		searchPost.setSuccess(true);

		searchPost.setPaging(pagingUtil.paging(page, postCount, LIMIT_PAGE));
		
		List<PostDto> posts = searchMapper.searchAllTopic(sessionId,searchPost.getPaging().getOffset(),searchPost.getPaging().getLimit());
		
		searchPost.setSearch(posts);

		return searchPost;

	}

}
