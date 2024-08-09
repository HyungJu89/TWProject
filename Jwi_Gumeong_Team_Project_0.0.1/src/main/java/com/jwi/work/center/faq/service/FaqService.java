package com.jwi.work.center.faq.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwi.work.center.faq.entity.Faq;
import com.jwi.work.center.faq.repository.FaqRepository;

@Service
public class FaqService {

	@Autowired
	private FaqRepository faqRepository;
	
	public List<Faq> findFaqList() {
		return faqRepository.findAll();
	}
}
