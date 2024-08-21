package com.jwi.work.alarm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.alarm.entity.Alarm;
import com.jwi.work.alarm.entity.Banned;
import com.jwi.work.alarm.entity.User;
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
	            case "comment":
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
	                    User reportUser = report.getReportUser();
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
}
