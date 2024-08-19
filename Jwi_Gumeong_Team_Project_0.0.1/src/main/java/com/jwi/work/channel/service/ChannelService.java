package com.jwi.work.channel.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.channel.dto.AnswerDto;
import com.jwi.work.channel.dto.bodyDto.ChannelCreateDto;
import com.jwi.work.channel.dto.bodyDto.ChannelFavoriteDto;
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

	public AnswerDto<ChannelDto> channelGet(String sessionId,String channelId) {
		AnswerDto<ChannelDto> answer = new AnswerDto<ChannelDto>();
		System.out.println(channelMapper.channelGet(sessionId,channelId));
		try {
			if(channelMapper.channelCheck(channelId) == 1) {
				answer.setInfo(channelMapper.channelGet(sessionId,channelId));
				answer.setSuccess(true);
			}else {
				answer.setSuccess(false);
			}
		} catch (Exception e) {
			answer.setSuccess(false);
		}
		return answer;
	}
	
	  // 인기 게시판 BO
    public AnswerDto<List<ChannelDto>> HotBoardGet(String startTime, String endTime) {
        AnswerDto<List<ChannelDto>> answer = new AnswerDto<>();
        try {
            List<ChannelDto> channels = channelMapper.HotBoardGet(startTime, endTime);
            answer.setInfo(channels);
            answer.setMessage("Success");
            answer.setSuccess(true);
        } catch (Exception e) {
			e.printStackTrace();
            answer.setMessage("에러 ");
            answer.setSuccess(false);
        }
        return answer;
	}
    
	  // 추천 게시판 BO
    public AnswerDto<List<ChannelDto>> RandomBoard() {
    	AnswerDto<List<ChannelDto>> answer = new AnswerDto<>();
        try {
            List<ChannelDto> channels = channelMapper.RandomBoard();
            answer.setInfo(channels);
            answer.setMessage("Success");
            answer.setSuccess(true);
        } catch (Exception e) {
			e.printStackTrace();
            answer.setMessage("에러 ");
            answer.setSuccess(false);
        }
		return answer;
    }

    public void channelFavorite(ChannelFavoriteDto channelFavorite) {
		if(channelFavorite.isFavorite()) {
			channelMapper.favorite(channelFavorite);
		} else {
			channelMapper.unFavorite(channelFavorite);
		}
    }

}
