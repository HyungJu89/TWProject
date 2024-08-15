package com.jwi.work.channel.dto;

import lombok.Data;

@Data
// SearchDto<T> 는 제네릭 클랙스라고하며 검색결과의 타입을 나타낸다.
// 간단하게 API 요청 할때 CODE 나오고 Mage 나오고 그거랑 똑같이 만들어주는느낌?
public class SearchDto<T> {

	private boolean success;
	
	private T search;

	private String url;
	
	private PagingDto paging;
}