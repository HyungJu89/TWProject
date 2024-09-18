package com.jwi.work.alarm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jwi.work.alarm.entity.Alarm;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Integer>{

	public List<Alarm> findByUserKey(int userKey);
	
	// 좋아요 알림을 보냈는지 확인 하는 매소드
	boolean existsByUserKeyAndReferenceKeyAndReferenceTypeAndLikeCount(int userKey, int referenceKey, String referenceType, int likeCount);

}
