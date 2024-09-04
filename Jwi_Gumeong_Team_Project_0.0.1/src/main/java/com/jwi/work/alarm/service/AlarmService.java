package com.jwi.work.alarm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.alarm.entity.Alarm;
import com.jwi.work.alarm.entity.Banned;
import com.jwi.work.alarm.entity.UserAlarmEntity;
import com.jwi.work.alarm.mapper.AlarmMapper;
import com.jwi.work.alarm.repository.AlarmRepository;
import com.jwi.work.alarm.repository.BannedRepository;
import com.jwi.work.alarm.repository.CommentRepository;
import com.jwi.work.alarm.repository.InquiryAlarmRepository;
import com.jwi.work.alarm.repository.PostRepository;
import com.jwi.work.alarm.repository.ReplyRepository;
import com.jwi.work.alarm.repository.ReportRepository;

@Service
public class AlarmService {

	@Autowired
	private AlarmRepository alarmRepository;
	@Autowired
	private AlarmMapper alarmMapper;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private ReplyRepository replyRepository; // 댓글,대댓글 머지 후 자세하게
    @Autowired
    private InquiryAlarmRepository inquiryRepository;
    @Autowired
    private ReportRepository reportRepository;
    @Autowired
    private BannedRepository bannedRepository;

    // TODO 내가 제재 당한 알림 추가
    
    public List<Alarm> selectAlarm(int userKey) {
        List<Alarm> alarms = alarmRepository.findByUserKey(userKey);

        for (Alarm alarm : alarms) {
            switch (alarm.getReferenceType()) {
	            case "post":
	                postRepository.findById(alarm.getReferenceKey()).ifPresent(post -> {
	                    alarm.setContent(post.getContent());
	                    alarm.setChannelImageUrl(post.getChannel().getImageUrl());
	                    alarm.setNickname(post.getUser().getNickName());
	                });
	                break;
	            case "like":
	                // 좋아요 알림
	                postRepository.findById(alarm.getReferenceKey()).ifPresent(likedPost -> {
	                    int likeCount = likedPost.getLikes().size();
	                    if (likeCount == 10 || likeCount == 50 || likeCount == 100 || likeCount == 500 || likeCount == 1000) {
	                        alarm.setContent(likedPost.getContent());
	                        alarm.setChannelImageUrl(likedPost.getChannel().getImageUrl());
	                        alarm.setNickname(likedPost.getUser().getNickName());
	                    }
	                });
	                break;
	            case "inquiry":
	                // 문의 답변 알림
	                inquiryRepository.findById(alarm.getReferenceKey()).ifPresent(inquiry -> {
	                    alarm.setContent("문의하신 내용을 답변 받았습니다.");
	                });
	                break;
	            case "system":
	                // 신고 처리 결과 알림
	                reportRepository.findById(alarm.getReferenceKey()).ifPresent(report -> {
	                	UserAlarmEntity reportUser = report.getReportUser();
	                    Banned banned = bannedRepository.findByUser(reportUser);
	                    if (banned != null) {
	                        alarm.setNickname(reportUser.getNickName());
	                        alarm.setDate(banned.getDate());
	                        alarm.setReason(banned.getReason());
	                        alarm.setContent(report.getContent());
	                        alarm.setReportedUserKey(reportUser.getUserKey());
	                    }
	                });
	                break;
	            default:
	                break;
            }
        }

        return alarms;
    }
    
    public int deleteAlarm(int notificationId) {
    	// 알람이 데이터 베이스에 있는지 확인
    	if (alarmRepository.existsById(notificationId)) {
    		// 있으면 삭제
    		// deleteById 가 void 타입이므로 int로 선언해서 return이 불가능
            alarmRepository.deleteById(notificationId);
            return 1;
        } else {
            return 0;
        }
    }
    
    public int updateAlarm(int notificationId) {
    	return alarmMapper.readUpdateAlarm(notificationId);
    }
    
    public int updateAllAlarm(int userKey) {
    	return alarmMapper.readAllUpdateAlarm(userKey);
    }
    
    public int deleteAllAlaram(int userKey) {
    	return alarmMapper.deleteAllAlarm(userKey);
    }
}
