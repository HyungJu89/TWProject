package com.jwi.work.alarm.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Data;

@Entity
@Data
@Table(name = "alarm")
public class Alarm {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int alarmKey;
	@Column(name = "userKey", nullable = false)
	private int userKey;
	@Column(name = "referenceUserKey", nullable = true)
	private int referenceUserKey;
	@Column(name = "referenceType", nullable = false, length = 50)
	private String referenceType;
	@Column(name = "referenceKey", nullable = false)
	private int referenceKey;
	@Column(name = "read", nullable = false)
	private int read;
	@Column(name = "createdAt", nullable = false)
    private LocalDateTime createdAt;  
    @Column(name = "updatedAt", nullable = false)
    private LocalDateTime updatedAt;
    @Column(name = "likeCount", nullable = true)    
    private Integer likeCount;
    
    @Transient
    private String subContent; 
    @Transient
    private String content;
    @Transient
    private int date;  // 제재 일수
    @Transient
    private String reason;  // 제재 사유
    @Transient
    private int reportedUserKey;  // 신고된 유저 키
    @Transient
    private String channelImageUrl;
    @Transient
    private String nickname;
    
    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
	
}
