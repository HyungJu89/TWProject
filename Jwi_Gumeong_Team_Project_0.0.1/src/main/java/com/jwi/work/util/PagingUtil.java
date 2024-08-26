package com.jwi.work.util;

import org.springframework.stereotype.Component;

import com.jwi.work.util.dto.PagingDto;

@Component
public class PagingUtil {
	
	public PagingDto paging(int page, int count, int limitPage) {
		PagingDto paging = new PagingDto();
		// 버그로 인해 혹은 맨앞 으로 가기 버튼 등을 통해 page 가 1 이하로 내려갈때 정정해주는역할
		if (page <= 0) {
			page = 1;
		}

		// 전체 페이지 수 계산 나머지가 있을때 올림처리하는 방식과 동일한 결과가 출력된다.
		int pageCount = (count + limitPage - 1) / limitPage;
		paging.setPageCount(pageCount);

		// pageCount가 0일 경우 처리 (여기 수정함)
		if (pageCount == 0) {
			pageCount = 1;
		}
		// 현재 페이지가 전체 페이지의 수를 넘으면 현재 페이지의 숫자를 전체 페이지의 숫자로 정정해서 초과하지않게
		if (page > pageCount) {
			page = pageCount;
		}

		paging.setPagingBut(pageCount > 1);

		int offset = (page - 1) * limitPage;
		// 음수로 뜨는거 처리
		if (offset < 0) {
			offset = 0;
		}
		paging.setOffset(offset);
		// 몇개의 아이템이 남아있는지
		int remainingPage = count - offset;
		paging.setPageLimit(limitPage);
		paging.setPageUp(limitPage < remainingPage);
		paging.setLimit(Math.min(limitPage, remainingPage));
		// 페이징처리에 필요한 시작 offset 설정
		return paging;
	}
}