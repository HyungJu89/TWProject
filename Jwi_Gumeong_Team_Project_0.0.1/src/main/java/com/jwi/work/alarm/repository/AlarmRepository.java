package com.jwi.work.alarm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jwi.work.alarm.entity.Alarm;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm, String>{

	public List<Alarm> findByUserKey(int userKey);
}
