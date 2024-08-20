package com.jwi.work.util;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import org.springframework.stereotype.Component;

@Component
public class NowDate {
	
	public Date nowDate() {
		LocalDateTime now = LocalDateTime.now();
	    
	    // 원하는 형식으로 포맷 지정하기
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
	    
	    // 날짜와 시간을 포맷에 맞춰 문자열로 변환하기
        String formattedDateTime = now.format(formatter);
        
        // LocalDateTime을 Instant로 변환
        Instant instant = now.atZone(ZoneId.systemDefault()).toInstant();
        
        // Instant를 Date로 변환
        Date date = Date.from(instant);
        
        System.out.println(date + formattedDateTime);
	    
	    return date;
	}
}
