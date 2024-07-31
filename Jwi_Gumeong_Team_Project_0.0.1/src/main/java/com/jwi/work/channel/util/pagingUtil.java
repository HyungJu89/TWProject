package com.jwi.work.channel.util;

import com.jwi.work.channel.dto.PagingDto;

public class PagingUtil {


	
	
	
	public int paging(int page,int count,int LIMIT_PAGE) {
		

		
		// 버그로 인해 혹은 맨앞 으로 가기 버튼 등을 통해 page 가 1 이하로 내려갈때 정정해주는역할
		if(page <= 0) {
			page = 1;
		}
		// 전체 post 갯수에서 나올수 있는 페이지 수 계산 
		int pagingCount = count % LIMIT_PAGE == 0 ? count / LIMIT_PAGE : (count / LIMIT_PAGE)+1;
		
		
		// 현재 페이지가 전체 패이지의 수를 넘으면 현재 페이지의 숫자를 전체 패이지의 숫자로 정정해서 초과하지않게
		if (page >= pagingCount) {
			page = pagingCount;
		}



		// 페이징처리에 필요한 시작 offset 설정
		return (page -1) * LIMIT_PAGE; 
		
	}
	
}
