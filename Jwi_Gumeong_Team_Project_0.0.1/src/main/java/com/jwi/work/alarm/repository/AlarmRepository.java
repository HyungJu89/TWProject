package com.jwi.work.alarm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jwi.work.alarm.entity.Alarm;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Integer>{

	public List<Alarm> findByUserKey(int userKey);
	
	boolean existsByReferenceKeyAndReferenceTypeAndUserKey(int referenceKey, String referenceType, int userKey);
	
	// 안 읽은 알람 개수를 반환 메소드
    public int countByUserKeyAndRead(int userKey, int read);
}
