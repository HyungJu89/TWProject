package com.jwi.work.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jwi.work.user.entity.FavoritesEntity;

@Repository
public interface FavoritesRepository extends JpaRepository<FavoritesEntity, Integer> {
	List<FavoritesEntity> findByUserConnectionSessionId(String sessionId);
}