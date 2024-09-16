package com.jwi.work.alarm.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jwi.work.alarm.entity.InquiryAlarm;

@Repository
public interface InquiryAlarmRepository extends JpaRepository<InquiryAlarm, Integer> {
    public Optional<InquiryAlarm> findById(Integer id);
    
}