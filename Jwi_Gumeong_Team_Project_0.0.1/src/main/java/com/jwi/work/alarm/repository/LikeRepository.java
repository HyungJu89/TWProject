package com.jwi.work.alarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jwi.work.alarm.entity.Like;
import com.jwi.work.alarm.entity.Post;
@Repository
public interface LikeRepository extends JpaRepository<Like, Integer> {
	public int countByPost(Post post);
}
