package com.jwi.work.alarm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.alarm.entity.Alarm;
import com.jwi.work.alarm.repository.AlarmRepository;
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
    private ReplyRepository replyRepository; // 대댓글 나중에 머지 후 추가
    @Autowired
    private InquiryAlarmRepository inquiryRepository;
    @Autowired
    private ReportRepository reportRepository;

    public List<Alarm> selectAlarm(int userKey) {
        List<Alarm> alarms = alarmRepository.findByUserKey(userKey);

        for (Alarm alarm : alarms) {
            switch (alarm.getReferenceType()) {
                case "post":
                    // 댓글
                    postRepository.findById(alarm.getReferenceKey()).ifPresent(post -> {
                        alarm.setContent(post.getContent());
                        alarm.setChannelImageUrl(post.getChannel().getImageUrl());
                        alarm.setNickname(post.getUser().getNickName());
                    });
                    break;
                case "comment":
                    // 대댓글
                    commentRepository.findById(alarm.getReferenceKey()).ifPresent(comment -> {
                        postRepository.findById(comment.getPost().getPostKey()).ifPresent(parentPost -> {
                            alarm.setContent(parentPost.getContent());
                            alarm.setChannelImageUrl(parentPost.getChannel().getImageUrl());
                            alarm.setNickname(comment.getUser().getNickName());
                        });
                    });
                    break;
                case "like":
                    // 좋아요
                    postRepository.findById(alarm.getReferenceKey()).ifPresent(likedPost -> {
                        alarm.setContent(likedPost.getContent());
                        alarm.setChannelImageUrl(likedPost.getChannel().getImageUrl());
                        alarm.setNickname(likedPost.getUser().getNickName());
                    });
                    break;
                case "inquiry":
                    // 문의
                    inquiryRepository.findById(alarm.getReferenceKey()).ifPresent(inquiry -> {
                        alarm.setContent(inquiry.getTitle());
                        alarm.setNickname(inquiry.getUser().getNickName());
                    });
                    break;
                case "system":
                    // 신고 내역
                    reportRepository.findById(alarm.getReferenceKey()).ifPresent(report -> {
                        alarm.setContent(report.getContent());
                        alarm.setNickname(report.getUser().getNickName());
                    });
                    break;
                default:
                    break;
            }
        }

        return alarms;
    }
}
