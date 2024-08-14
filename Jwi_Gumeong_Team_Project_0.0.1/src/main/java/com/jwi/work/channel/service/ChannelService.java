package com.jwi.work.channel.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.channel.dto.AnswerDto;
import com.jwi.work.channel.dto.bodyDto.ChannelCreateDto;
import com.jwi.work.channel.dto.channelDto.ChannelDto;
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
	
	  // 인기 게시판 BO -- 채널명, 채널 아이콘만 필요
    public AnswerDto<List<ChannelDto>> HotBoardGet(String startTime, String endTime) {
        AnswerDto<List<ChannelDto>> answer = new AnswerDto<>();
        
        try {
            // DAO를 통해 데이터 가져오기
            List<ChannelDto> channels = channelMapper.HotBoardGet(startTime, endTime);
            
            // 결과를 AnswerDto에 설정
            answer.setInfo(channels);
            answer.setMessage("Success");
            answer.setSuccess(true);
        } catch (Exception e) {
            // 오류 발생 시 처리
            answer.setMessage("에러에요: " + e.getMessage());
            answer.setSuccess(false);
        }
        
        return answer;
	}

}
