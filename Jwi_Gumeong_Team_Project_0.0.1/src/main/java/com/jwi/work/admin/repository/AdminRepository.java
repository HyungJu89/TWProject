package com.jwi.work.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jwi.work.admin.entity.admin;

@Repository
public interface AdminRepository extends JpaRepository<admin, Integer>{
	
}
