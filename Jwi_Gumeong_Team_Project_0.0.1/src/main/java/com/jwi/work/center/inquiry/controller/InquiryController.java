package com.jwi.work.center.inquiry.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jwi.work.center.inquiry.entity.Inquiry;
import com.jwi.work.center.inquiry.entity.InquiryResponse;
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
                                             // required = false 파라미터 넘길 때 널값 가능 안할 시 Bad Request
                                             @RequestParam(value = "files" , required = false) List<MultipartFile> files) {

        String result = inquiryService.createInquiry(userKey, title, category, details, files);
        
        Map<String, Object> response = new HashMap<>();
        response.put("result", result);
        return response;
    }
    
    @PostMapping("/list")
	public Map<String, Object> selectInquiry(@RequestParam("userKey") int userKey) {
    	
    	List<Inquiry> list = inquiryService.selectInquiry(userKey);
    	
    	Map<String,Object> result = new HashMap<>();
    	
    	if(list != null) {
    		result.put("result", "success");
    		result.put("inquiryList", list);
    	} else {
    		result.put("result", "fail");
    	}
    	
    	return result;
	}
    
    @PostMapping("/response")
    public Map<String, Object> selectResponse(@RequestParam("inquiryKey") int inquiryKey) {
    	InquiryResponse response = inquiryService.selectResponse(inquiryKey);
    	
    	Map<String,Object> result = new HashMap<>();
    	
    	if(response != null) {
    		result.put("result", "success");
    		result.put("response", response);
    	} else {
    		result.put("result", "fail");
    	}
    	
    	return result;
    }
}

