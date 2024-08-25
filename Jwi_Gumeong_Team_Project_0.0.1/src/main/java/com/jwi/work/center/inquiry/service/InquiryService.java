package com.jwi.work.center.inquiry.service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.jwi.work.center.inquiry.entity.Inquiry;
import com.jwi.work.center.inquiry.entity.InquiryResponse;
import com.jwi.work.center.inquiry.repository.InquiryRepository;
import com.jwi.work.center.inquiry.repository.InquiryResponseRepository;
import com.jwi.work.util.FileManagerUtil;

@Service
public class InquiryService {

    @Autowired
    private FileManagerUtil fileManagerUtil;
    @Autowired
    private InquiryRepository inquiryRepository;
    @Autowired
    private InquiryResponseRepository responseRepository;

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy년 M월 d일");
    
    public String createInquiry(int userKey, String title, String category, String details, List<MultipartFile> files) {
        try {
            List<String> fileUrls = new ArrayList<>();
            // 이미지가 null이 아니고 비어 있지 않을 때만 처리
            if (files != null && !files.isEmpty()) {
                for (MultipartFile file : files) {
                    String savedFileName = fileManagerUtil.saveFile(file);
                    if (savedFileName != null) {
                        fileUrls.add(savedFileName);
                    }
                }
            }

            Inquiry inquiry = new Inquiry(userKey, title, category, details, String.join(",", fileUrls));
            inquiryRepository.save(inquiry);

            return "success";

        } catch (Exception e) {
            return "fail";
        }
    }
    
    public List<Inquiry> selectInquiry(int userKey) {
    	return inquiryRepository.findAllByUserKeyOrderByCreatedAtDesc(userKey);
    }
    
    public InquiryResponse selectResponse(int inquiryKey) {
        InquiryResponse response = responseRepository.findByInquiryKey(inquiryKey);

        if (response != null) {
            String formattedDate = response.getCreatedAt().format(formatter);
            response.setFormattedCreatedAt(formattedDate);
        }

        return response;
    }
}
