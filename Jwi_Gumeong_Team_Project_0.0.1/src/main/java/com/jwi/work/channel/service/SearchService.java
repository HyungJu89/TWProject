package com.jwi.work.channel.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.channel.mapper.SearchMapper;
import com.jwi.work.channel.util.PagingUtil;

@Service
public class SearchService {

	private final int LIMIT_PAGE = 80;
	
	@Autowired
	private SearchMapper searchMapper; 
	
	private PagingUtil pagingUtil = new PagingUtil();
	
	public Object searchChannel(String search, int page){
		
		// 검색된 채널의 갯수
		int channelCount = searchMapper.searchChannelCount(search);
		
		// 몇번째 있는 채널부터 가져올껀지 정한다.
		int offset = pagingUtil.paging(page, channelCount,LIMIT_PAGE);
		
		// Math.min 함수는 괄호 안에 있는 두 수 중에 작은 값을 가진 숫자가 뽑힌다.
		// 전체 페이지에서 offset 의 값을 뺀값과 페이징의 기준이 되는 LIMIT 값 중에 더 작은 값이 출력된다
		int limit = Math.min(LIMIT_PAGE, channelCount - offset);
		
		//채널의 갯수리턴
		return searchMapper.searchChannel(search, offset, limit);
		
	}
	
	public Object searchPost(String search, int page) {
		
		int postCount = searchMapper.searchPostCount(search);
		
		int offset = pagingUtil.paging(page, postCount,LIMIT_PAGE);
		
		int limit = Math.min(LIMIT_PAGE, postCount - offset);
		
		return searchMapper.searchPost(search, offset, limit);
		
	}
	
	
}
