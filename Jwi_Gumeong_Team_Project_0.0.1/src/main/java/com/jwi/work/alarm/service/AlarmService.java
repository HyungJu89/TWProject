package com.jwi.work.alarm.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jwi.work.alarm.entity.Alarm;
import com.jwi.work.alarm.repository.AlarmRepository;

import lombok.NoArgsConstructor;

@NoArgsConstructor
@Service
public class AlarmService {

	private AlarmRepository alarmRepository;
	
	public List<Alarm> selectAlarm(int userKey) {
		return alarmRepository.findByUserKey(userKey);
	}
}
