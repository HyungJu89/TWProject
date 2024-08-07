package com.jwi.work.channel.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.channel.dto.AnswerDto;
import com.jwi.work.channel.dto.ChannelCreateDto;
import com.jwi.work.channel.dto.ChannelDto;
import com.jwi.work.channel.mapper.ChannelMapper;

@Service
public class ChannelService {

	@Autowired
	private ChannelMapper channelMapper;

	public boolean channelCheck(String channelId) {
		// 채널 생성이 안되어있으면 true 가 리턴이 된다.
		return channelMapper.channelCheck(channelId) == 0;

	}

	public AnswerDto<String> channelCreate(ChannelCreateDto channelCreate) {
		// 최종 중복체크
		AnswerDto<String> answer = new AnswerDto<String>();

		try {

			if (channelMapper.channelCheck(channelCreate.getId()) == 0) {

				channelMapper.channelCreate(channelCreate);

				answer.setSuccess(true);

			} else {

				answer.setSuccess(false);

			}

		} catch (Exception e) {

			answer.setSuccess(false);

			answer.setNavigate("/");

		}

		answer.setNavigate("/channel/" + channelCreate.getId());

		return answer;

	}

	public AnswerDto<ChannelDto> channelGet(String channelId) {
		AnswerDto<ChannelDto> answer = new AnswerDto<ChannelDto>();
		try {
			if(channelMapper.channelCheck(channelId) == 1) {
				
			answer.setInfo(channelMapper.channelGet(channelId));
			
			answer.setSuccess(true);
			}else {
				answer.setSuccess(false);
			}
		} catch (Exception e) {

			answer.setSuccess(false);

		}

		return answer;
	}

}
