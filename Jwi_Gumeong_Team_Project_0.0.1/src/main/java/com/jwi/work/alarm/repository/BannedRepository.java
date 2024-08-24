package com.jwi.work.alarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.jwi.work.alarm.entity.Banned;
import com.jwi.work.alarm.entity.User;

@Repository
public interface BannedRepository extends JpaRepository<Banned, Integer> {
    public Banned findByUser(User user); 
}