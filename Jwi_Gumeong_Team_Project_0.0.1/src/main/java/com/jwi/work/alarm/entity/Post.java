package com.jwi.work.alarm.entity;

import java.time.LocalDateTime;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int postKey;
    @ManyToOne
    @JoinColumn(name = "userKey", nullable = false)
    private User user;
    @ManyToOne
    @JoinColumn(name = "channelKey", nullable = false)
    private Channel channel;
    @Column(name = "content", nullable = false, length = 300)
    private String content;
    @Column(name = "image")
    private String image;
    @Column(name = "state", nullable = false, length = 50)
    private String state = "common";
    @Column(name = "createdAt", nullable = false)
    private LocalDateTime createdAt;
    @Column(name = "updatedAt", nullable = false)
    private LocalDateTime updatedAt;
    @OneToMany(mappedBy = "post")
    private Set<Like> likes;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
}
