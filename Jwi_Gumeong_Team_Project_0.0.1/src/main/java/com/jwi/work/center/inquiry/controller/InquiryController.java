package com.jwi.work.center.inquiry.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jwi.work.center.inquiry.service.InquiryService;

@RestController
@RequestMapping("/inquiry")
public class InquiryController {

    @Autowired
    private InquiryService inquiryService;

    @PostMapping("/create")
    public Map<String, Object> createInquiry(@RequestParam("userKey") int userKey,
                                             @RequestParam("title") String title,
                                             @RequestParam("category") String category,
                                             @RequestParam("details") String details,
                                             @RequestParam("files") List<MultipartFile> files) {

        String result = inquiryService.createInquiry(userKey, title, category, details, files);
        
        Map<String, Object> response = new HashMap<>();
        response.put("result", result);
        return response;
    }
}

