package com.jwi.work.alarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jwi.work.alarm.entity.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {
	
}