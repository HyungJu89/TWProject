package com.jwi.work.user.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "userConnection")
public class UserConnectionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userKey;
	@Column(name = "sessionId", nullable = false,  length = 30)
    private String sessionId;
	@Column(name = "createdAt", nullable = false)
    private LocalDateTime createdAt;
	@Column(name = "updatedAt", nullable = false)
    private LocalDateTime updatedAt;
	
	public int getUserKey() {
		return userKey;
	}
	public void setUserKey(int userKey) {
		this.userKey = userKey;
	}
	public String getSessionId() {
		return sessionId;
	}
	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}
	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
}