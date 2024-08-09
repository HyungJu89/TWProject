package com.jwi.work.center.faq.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jwi.work.center.faq.entity.Faq;

@Repository
public interface FaqRepository extends JpaRepository<Faq, Integer>{

}
