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
import com.jwi.work.user.mapper.UserMapper;

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
	@Autowired
	private UserMapper userMapper;

    // TODO 내가 제재 당한 알림 추가
    
    public List<Alarm> selectAlarm(int userKey) {
        List<Alarm> alarms = alarmRepository.findByUserKey(userKey);

        for (Alarm alarm : alarms) {
            switch (alarm.getReferenceType()) {
	            case "post":
	            	postRepository.findById(alarm.getReferenceKey()).ifPresent(post -> {
	                    // 게시글 작성자의 정보 가져오기
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
                        UserAlarmEntity reportUser = report.getReportUser();  // 신고당한 유저(B)
                        UserAlarmEntity reportingUser = report.getUser();  // 신고한 유저(A)
                        Banned banned = bannedRepository.findByUser(reportUser);

                        if (banned != null) {
                            // 신고 처리 후 제재를 받은 유저의 정보
                            alarm.setNickname(reportUser.getNickName()); // 제재 받은 유저 (B)
                            alarm.setDate(banned.getDate()); // 제재 기간
                            alarm.setReason(banned.getReason()); // 제재 이유
                            // 신고자 (A)에게 알림을 보냄
                            alarm.setContent("당신의 선함으로 " + reportUser.getNickName() + "님이 제재를 받았어요!");
                            alarm.setSubContent("신고내용: " + report.getCategory() + ", 대상자가 이용정지를 받았습니다.");
                        }
                    });
                    break;
	            default:
	                break;
            }
        }
        return alarms;
    }
    
    public void createReportAlarm(int userKey, int reportedUserKey, String category) {
        // 신고한 유저에게 알림을 보냄
        Alarm alarm = new Alarm();
        alarm.setUserKey(userKey); // 신고한 유저
        alarm.setReferenceType("system");
        alarm.setReferenceKey(reportedUserKey); // 신고당한 유저 키
        alarm.setContent("당신의 선함으로 " + getNickname(reportedUserKey) + "님이 제재를 받았어요!");
        alarm.setSubContent("신고내용: " + category + ", 대상자가 이용정지를 받았습니다.");
        alarm.setReferenceUserKey(reportedUserKey); // 신고당한 유저 키를 referenceUserKey에 저장

        alarmRepository.save(alarm);
    }

    // 신고당한 유저의 닉네임을 가져오는 메서드
    private String getNickname(int userKey) {
        return userMapper.getNickName(userKey); // 유저의 닉네임을 반환
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
