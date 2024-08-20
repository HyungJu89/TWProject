package com.jwi.work.center.sanction.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jwi.work.center.sanction.entity.Sanction;

@Repository
public interface SanctionRepository extends JpaRepository<Sanction, Integer>{
	// 유저 키로 밴 목록 불러오기
	public List<Sanction> findByUserKey(@Param("userKey") int userKey);
	// 밴 종료인지 확인
	List<Sanction> findByState(String state);
	
}
