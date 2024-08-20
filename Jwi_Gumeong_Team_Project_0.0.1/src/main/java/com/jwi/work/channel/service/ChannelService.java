package com.jwi.work.channel.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
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
    public AnswerDto<List<ChannelDto>> HotBoardGet() {
        AnswerDto<List<ChannelDto>> answer = new AnswerDto<>();
        
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
        
        try {
            List<ChannelDto> channels = channelMapper.HotBoardGet(fStartTime, fEndTime);
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
