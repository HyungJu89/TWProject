package com.jwi.work.user.signUp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jwi.work.user.signUp.entity.User;
@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
}
