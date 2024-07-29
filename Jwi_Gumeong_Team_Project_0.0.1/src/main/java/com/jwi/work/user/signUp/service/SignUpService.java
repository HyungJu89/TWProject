package com.jwi.work.user.signUp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.jwi.work.user.signUp.entity.User;
import com.jwi.work.user.signUp.repository.UserRepository;

@Service
public class SignUpService {
    
    @Autowired
    private UserRepository userRepository;
    
    public void saveUser(User user) {
        userRepository.save(user);
    }
}