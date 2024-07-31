package com.jwi.work.channel.util;

import com.jwi.work.channel.dto.PagingDto;

public class pagingUtil {

	private final int LIMIT_PAGE = 100;
	
	
	
	public PagingDto paging(int page,int postCount) {
		
		PagingDto paging = new PagingDto();
		
		// 버그로 인해 혹은 맨앞 으로 가기 버튼 등을 통해 page 가 1 이하로 내려갈때 정정해주는역할
		if(page <= 0) {
			page = 1;
		}
		// 전체 post 갯수에서 나올수 있는 페이지 수 계산 
		int pagingCount = postCount % LIMIT_PAGE == 0 ? postCount / LIMIT_PAGE : (postCount / LIMIT_PAGE)+1;
		
		
		// 현재 페이지가 전체 패이지의 수를 넘으면 현재 페이지의 숫자를 전체 패이지의 숫자로 정정해서 초과하지않게
		if (page >= pagingCount) {
			page = pagingCount;
		}

		// 페이징처리에 필요한 시작 offset 과 limit 를 설정
		int offset = (page -1) * LIMIT_PAGE;
		// Math.min 함수는 괄호 안에 있는 두 수 중에 작은 값을 가진 숫자가 뽑힌다.
		// 전체 페이지에서 offset 의 값을 뺀값과 페이징의 기준이 되는 LIMIT 값 중에 더 작은 값이 출력된다.
		int limit = Math.min(LIMIT_PAGE, postCount - offset);

		paging.setOffset(offset);
		paging.setLimit(limit);
		
		return paging; 
		
	}
	
}
