package com.jwi.work.center.inquiry.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.jwi.work.center.inquiry.entity.Inquiry;
import com.jwi.work.center.inquiry.ropository.InquiryRepository;
import com.jwi.work.util.FileManagerUtil;

@Service
public class InquiryService {

    @Autowired
    private FileManagerUtil fileManagerUtil;

    @Autowired
    private InquiryRepository inquiryRepository;

    public String createInquiry(int userKey, String title, String category, String details, List<MultipartFile> files) {
        try {
            List<String> fileUrls = new ArrayList<>();
            for (MultipartFile file : files) {
                String savedFileName = fileManagerUtil.saveFile(file);
                if (savedFileName != null) {
                    fileUrls.add(savedFileName);
                }
            }

            Inquiry inquiry = new Inquiry(userKey, title, category, details, String.join(",", fileUrls));
            inquiryRepository.save(inquiry);

            return "success";

        } catch (Exception e) {
            return "fail";
        }
    }
}
