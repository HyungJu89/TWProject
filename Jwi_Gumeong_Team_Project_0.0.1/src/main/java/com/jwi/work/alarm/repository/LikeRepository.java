package com.jwi.work.alarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jwi.work.alarm.entity.Like;
import com.jwi.work.alarm.entity.Post;

public interface LikeRepository extends JpaRepository<Like, Integer> {
	public int countByPost(Post post);
}
