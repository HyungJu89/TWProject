package com.jwi.work.center.sanction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jwi.work.center.sanction.entity.SanctionLog;

@Repository
public interface SanctionLogRepository extends JpaRepository<SanctionLog, Integer>{
	
}