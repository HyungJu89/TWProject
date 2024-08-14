package com.jwi.work.center.inquiry.ropository;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;

import com.jwi.work.center.inquiry.entity.InquiryResponse;

public interface InquiryResponseRepository extends JpaRepository<InquiryResponse, Integer> {

	public InquiryResponse findByInquiryKey(@Param("inquiryKey") int inquiryKey);
}
