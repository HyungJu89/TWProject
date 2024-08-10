package com.jwi.work.user.dto;

import java.util.Date;

import lombok.Data;

@Data
public class Banned {

	private int bannedKey;
	private int userKey;
	private String reason;
	private Date reasonDate;
	private int date;
	private String state;
	private Date createdAt;
	private Date updatedAt;
	
}
