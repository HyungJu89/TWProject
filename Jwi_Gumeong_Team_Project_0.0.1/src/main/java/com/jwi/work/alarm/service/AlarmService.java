package com.jwi.work.alarm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.alarm.entity.Alarm;
import com.jwi.work.alarm.entity.Banned;
import com.jwi.work.alarm.entity.Channel;
import com.jwi.work.alarm.entity.Comment;
import com.jwi.work.alarm.entity.InquiryAlarm;
import com.jwi.work.alarm.entity.Post;
import com.jwi.work.alarm.mapper.AlarmMapper;
import com.jwi.work.alarm.repository.AlarmRepository;
import com.jwi.work.alarm.repository.BannedRepository;
import com.jwi.work.alarm.repository.CommentRepository;
import com.jwi.work.alarm.repository.InquiryAlarmRepository;
import com.jwi.work.alarm.repository.PostRepository;
import com.jwi.work.center.sanction.entity.Sanction;
import com.jwi.work.user.entity.UserEntity;
import com.jwi.work.user.repository.UserRepository;

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
    private InquiryAlarmRepository inquiryRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private BannedRepository bannedRepository;

    public List<Alarm> selectAlarm(int userKey) {
        List<Alarm> alarms = alarmRepository.findByUserKey(userKey);

        for (Alarm alarm : alarms) {
            switch (alarm.getReferenceType()) {
	            case "post":
	            	// 댓글 알림
	            	postNotification(alarm);
	            	break;
	            case "comment":
	            	// 대댓글 알림
	            	commentNotification(alarm);
	            	break;
	            case "like_10":
	            case "like_50":
	            case "like_100":
	                // 좋아요 알림
	            	likeNotification(alarm);
	                break;
	            case "inquiry":
	                // 문의 답변 알림
	            	inquiryNotification(alarm);
	                break;
	            case "system":
	            	// 신고 처리 결과 알림
	            	systemNotification(alarm);
                    break;
	            default:
	                break;
            }
        }
        return alarms;
    }
    
    // Post 알림
    private void postNotification(Alarm alarm) {
        Optional<Post> postOpt = postRepository.findById(alarm.getReferenceKey());
        if (postOpt.isPresent()) {
            Post post = postOpt.get();
            alarm.setContent(post.getContent());  // 게시글 내용을 content에 저장
            
            // Post에서 Channel 객체를 가져와 channelImageUrl에 설정
            Channel channel = post.getChannel();
            if (channel != null && channel.getImageUrl() != null) {
                alarm.setChannelImageUrl(channel.getImageUrl());
            }
        }

        // referenceUserKey로 유저의 닉네임 가져오기
        Optional<UserEntity> userOpt = userRepository.findById(alarm.getReferenceUserKey());
        if (userOpt.isPresent()) {
            UserEntity user = userOpt.get();
            alarm.setNickname(user.getNickName());  // 댓글을 쓴 사람의 닉네임
        }
    }

    // Comment 알림
    private void commentNotification(Alarm alarm) {
        Optional<Comment> commentOpt = commentRepository.findById(alarm.getReferenceKey());
        if (commentOpt.isPresent()) {
            Comment comment = commentOpt.get();
            
            // 댓글이 달린 게시글을 조회하여 제목 저장
            Post post = comment.getPost();
            alarm.setContent(post.getContent());  // 댓글이 달린 게시글의 제목을 content에 저장
            
            // Post에서 Channel 객체를 가져와 channelImageUrl에 설정
            Channel channel = post.getChannel();
            if (channel != null && channel.getImageUrl() != null) {
                alarm.setChannelImageUrl(channel.getImageUrl());
            }
        }

        // referenceUserKey로 유저의 닉네임 가져오기
        Optional<UserEntity> userOpt = userRepository.findById(alarm.getReferenceUserKey());
        if (userOpt.isPresent()) {
            UserEntity user = userOpt.get();
            alarm.setNickname(user.getNickName());  // 댓글을 쓴 사람의 닉네임
        }
    }
    
    // Like 알림
    private void likeNotification(Alarm alarm) {
        Optional<Post> postOpt = postRepository.findById(alarm.getReferenceKey());
        
        if (postOpt.isPresent()) {
            Post post = postOpt.get();
            alarm.setContent(post.getContent()); // 게시글 내용을 알림 content에 설정
            
            // 현재 좋아요 알림의 threshold (10, 50, 100)에 맞는 subContent 설정
            String threshold = alarm.getReferenceType().replace("like_", "");
            alarm.setSubContent(threshold); // 좋아요 개수 알림을 subContent로 설정
            
            // Post에서 Channel 객체를 가져와 channelImageUrl에 설정
            Channel channel = post.getChannel();
            if (channel != null && channel.getImageUrl() != null) {
                alarm.setChannelImageUrl(channel.getImageUrl());
            }
        }
    }

    
    // Inquiry 알림
    private void inquiryNotification(Alarm alarm) {
    	Optional<InquiryAlarm> inquiryOpt = inquiryRepository.findById(alarm.getReferenceKey());
        
        if (inquiryOpt.isPresent()) {
            InquiryAlarm inquiry = inquiryOpt.get();
            
            // 해당 문의를 한 유저에게 알림 생성
            int userKey = inquiry.getUser().getUserKey();
            
            // 알람 생성
            Alarm inquiryAlarm = new Alarm();
            inquiryAlarm.setUserKey(userKey);  // 알림을 받을 유저
            inquiryAlarm.setReferenceType("inquiry");  // 알림 타입을 "inquiry"로 설정
            inquiryAlarm.setReferenceKey(alarm.getReferenceKey());  // 문의 ID를 참조키로 설정
            inquiryAlarm.setRead(0);  // 알림을 읽지 않은 상태로 설정
            alarmRepository.save(inquiryAlarm);
        }
    }
    
    // 신고 처리 결과 알림
    private void systemNotification(Alarm alarm) {
        // 신고한 유저의 알림
        if (alarm.getReferenceUserKey() > 0) {
            Optional<UserEntity> reportedUserOpt = userRepository.findById(alarm.getReferenceUserKey());
            if (reportedUserOpt.isPresent()) {
                UserEntity reportedUser = reportedUserOpt.get();
                alarm.setNickname(reportedUser.getNickName());  // 제재 받은 유저의 닉네임
                // 제재 사유 및 일수를 저장
                Optional<Banned> bannedOpt = bannedRepository.findById(alarm.getReferenceKey());
                if (bannedOpt.isPresent()) {
                	
                	Banned banned = bannedOpt.get();
                    alarm.setReason(banned.getReason());   // 제재 사유 저장
                    alarm.setDate(banned.getDate());       // 제재 일수 저장
                }
            }
        }
    }

    // 안 읽은 알람
    public int unreadAlarms(int userKey) {
        return alarmRepository.countByUserKeyAndRead(userKey, 0);
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
