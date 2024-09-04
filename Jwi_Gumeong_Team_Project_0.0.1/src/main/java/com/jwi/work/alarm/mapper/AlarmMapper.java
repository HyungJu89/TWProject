package com.jwi.work.alarm.mapper;

import org.apache.ibatis.annotations.Param;

import com.jwi.work.alarm.dto.AlarmDto;

public interface AlarmMapper {

	public int getUserKey(@Param("sessionId")String sessionId);
	
	public void postAlarm(AlarmDto alarmDto);

	public void commentAlarm(AlarmDto alarmDto);

	public void replyAlarm(AlarmDto alarmDto);

	public AlarmDto getPostUserKey(@Param("postKey") int postKey);

	public AlarmDto getCommentUserKey(@Param("commentKey") int commentKey);

	public AlarmDto getReplyUserKey(@Param("replyKey") int replyKey);
	
	public int readUpdateAlarm(@Param("notificationId") int notificationId);
	
	public int readAllUpdateAlarm(@Param("userKey") int userKey);
	
	public int deleteAllAlarm(@Param("userKey") int userKey);
	
	
}
