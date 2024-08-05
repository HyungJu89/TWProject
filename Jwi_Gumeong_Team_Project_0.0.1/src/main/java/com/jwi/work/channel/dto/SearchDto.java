package com.jwi.work.channel.dto;

import java.util.List;

import lombok.Data;

@Data
// SearchDto<T> 는 제네릭 클랙스라고하며 검색결과의 타입을 나타낸다.
public class SearchDto<T> {

	private boolean searchSuccess;
	
	private List<T> search;

	private PagingDto paging;
}
