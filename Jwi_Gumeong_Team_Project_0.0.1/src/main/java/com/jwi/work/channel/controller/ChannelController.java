package com.jwi.work.channel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.channel.dto.bodyDto.ChannelCreateDto;
import com.jwi.work.channel.dto.bodyDto.ChannelFavoriteDto;
import com.jwi.work.channel.dto.channelDto.ChannelDto;
import com.jwi.work.channel.entity.ChannelEntity;
import com.jwi.work.channel.service.ChannelService;
import com.jwi.work.util.dto.AnswerDto;

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
	public AnswerDto<ChannelDto> channelGet(@RequestParam(value = "sessionId", defaultValue = "") String sessionId,@RequestParam("channelId") String channelId){
 
		   // sessionId가 빈 문자열이면 null로 변환
	    if (sessionId.isEmpty()) {
	        sessionId = null;
	    }
		
		return channelService.channelGet(sessionId,channelId);
	}
	
	@GetMapping("/hotTen") //인기 게시판 10개
	public AnswerDto<List<ChannelDto>> hotTen() {
		return channelService.HotBoardGet();
	}
	
	@GetMapping("/randomBoard") //무작위 추천 게시판
	public AnswerDto<List<ChannelDto>> randomBoard() {
		return channelService.RandomBoard();
	}
	
	@GetMapping("/findKey") //채널 key값으로 검색
	public List<ChannelEntity> findKey(@RequestParam("channelKey") int channelKey) {
        return channelService.findKey(channelKey);
	}

	@PostMapping("/favorite")
	public void channelFavorite(@RequestBody ChannelFavoriteDto channelFavorite) {
		channelService.channelFavorite(channelFavorite);
		
	}
	
}
