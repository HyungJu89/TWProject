package com.jwi.work.channel.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.channel.dto.ChannelCreateDto;
import com.jwi.work.channel.mapper.ChannelMapper;

@Service
public class CreateChannelService {

	@Autowired
	private ChannelMapper channelMapper;

	public boolean channelCheck(String channelId) {
		// 채널 생성이 안되어있으면 true 가 리턴이 된다.
		return channelMapper.channelCheck(channelId) == 0;

	}

	public String channelCreate(ChannelCreateDto channelCreate) {
		// 최종 중복체크
		if (channelMapper.channelCheck(channelCreate.getId()) == 0) {
			channelMapper.channelCreate(channelCreate);
		}

		return "/channel/" + channelCreate.getId();

	}

}
