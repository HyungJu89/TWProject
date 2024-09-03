package com.jwi.work.alarm.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.alarm.entity.Alarm;
import com.jwi.work.alarm.service.AlarmService;

@RestController
@RequestMapping("/alarm")
public class AlarmRestController {

	@Autowired
	private AlarmService alarmService;
	
	@PostMapping("/list")
	public Map<String, Object> findAlarm(@RequestParam("userKey") int userKey) {

		List<Alarm> list = alarmService.selectAlarm(userKey);
		Map<String, Object> result = new HashMap<>();
		
		if(list != null) {
			result.put("result", "success");
			result.put("list", list);
		} else {
			result.put("result", "fail");
		}
		
		 return result;
	}
	
	// 알림 삭제
	@PostMapping("/delete")
	public Map<String, String> deleteAlarm(@RequestParam("notificationId") int notificationId) {
		
		int num = alarmService.deleteAlarm(notificationId);
		Map<String, String> result = new HashMap<>();
		
		if(num == 1) {
			result.put("result", "success");
		} else {
			result.put("result", "fail");
		}
		
		return result;
	}
	
	@PostMapping("/read")
	public Map<String, String> updateAlarm(@RequestParam("notificationId") int notificationId) {
		
		int num = alarmService.updateAlarm(notificationId);
		Map<String, String> result = new HashMap<>();
		
		if(num == 1) {
			result.put("result", "success");
		} else {
			result.put("result", "fail");
		}
		
		return result;
	}
	
	@PostMapping("/read/all")
	public Map<String, String> updateAllAlarm(@RequestParam("userKey") int userKey) {
		int num = alarmService.updateAllAlarm(userKey);
		Map<String, String> result = new HashMap<>();
		
		if(num >= 1) {
			result.put("result", "success");
		} else {
			result.put("result", "fail");
		}
		
		return result;
	}
}
