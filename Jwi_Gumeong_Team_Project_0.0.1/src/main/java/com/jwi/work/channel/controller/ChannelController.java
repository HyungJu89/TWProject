package com.jwi.work.channel.controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.channel.dto.AnswerDto;
import com.jwi.work.channel.dto.bodyDto.ChannelCreateDto;
import com.jwi.work.channel.dto.channelDto.ChannelDto;
import com.jwi.work.channel.service.ChannelService;

@RestController
@RequestMapping("/channel/*")
public class ChannelController {

	@Autowired
	private ChannelService channelService;

	@GetMapping("/check")
	public boolean channelCheck(@RequestParam("channelId") String channelId) {

		return channelService.channelCheck(channelId);

	}

	@PostMapping("/create")
	public AnswerDto<String> channelCreate(@RequestBody ChannelCreateDto channelCreate) {

		return channelService.channelCreate(channelCreate);

	}
	
	@GetMapping("/get")
	public AnswerDto<ChannelDto> channelGet(@RequestParam("channelId") String channelId){
		
		return channelService.channelGet(channelId);
	}
	
	@GetMapping("/hotTen") //인기 게시판 10개
	public AnswerDto<List<ChannelDto>> getMethodName() {
		// 현재 시간 구하기
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        // 오늘 오후 5시 계산
        LocalDateTime today5pm = now.truncatedTo(ChronoUnit.HOURS).withHour(17);
        // 전날 오후 5시 계산
        LocalDateTime yesterday5pm = today5pm.minusDays(1);
        // 이틀전 오후 5시 계산
        LocalDateTime beforeyesterday5pm = today5pm.minusDays(2);
        
        LocalDateTime startTime;
        LocalDateTime endTime;
        if (now.isAfter(today5pm)) {
            // 오늘 오후 5시가 지났다면 오늘 오후 5시까지의 데이터 조회
            startTime = yesterday5pm;
            endTime = today5pm;
        } else {
            // 오늘 오후 5시가 지나지 않았다면, 어제 오후 5시부터 이틀전 5시까지 조회
            startTime = beforeyesterday5pm;
            endTime = yesterday5pm;
        }
        // 문자열 포맷팅
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String fStartTime = startTime.format(formatter);
        String fEndTime = endTime.format(formatter);
//			테스트용 더미
//        fStartTime = "2024-08-08 15:03:54";
//        fEndTime = "2024-08-14 15:03:54";
		return channelService.HotBoardGet(fStartTime, fEndTime);
	}
	
	

}
