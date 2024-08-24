package com.jwi.work.center.inquiry.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jwi.work.center.inquiry.entity.Inquiry;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, Integer> {

	public List<Inquiry> findAllByUserKeyOrderByCreatedAtDesc(int userKey);
	
}
