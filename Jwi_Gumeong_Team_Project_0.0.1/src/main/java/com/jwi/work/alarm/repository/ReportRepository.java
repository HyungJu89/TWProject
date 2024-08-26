package com.jwi.work.alarm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jwi.work.alarm.entity.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {
    // 신고당한 유저의 userKey를 기준으로 조회
    List<Report> findByReportUserUserKey(int userKey);

    // 신고한 유저의 userKey를 기준으로 조회
    List<Report> findByUserUserKey(int userKey);
}