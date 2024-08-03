package com.jwi.work.center.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jwi.work.center.entity.Faq;

@Repository
public interface FaqRepository extends JpaRepository<Faq, Integer>{

}
