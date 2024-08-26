package com.jwi.work.util.dto;

import lombok.Data;

@Data
public class PagingDto {

	private int pageCount;
	
	private int offset;
	
	private int limit;

	private int pageLimit;
	
	private boolean pageUp = true;
	
	private boolean pagingBut = true;
	
}
