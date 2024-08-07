package com.jwi.work.admin.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name="admin")
public class admin {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int adminKey;
	
	@Column(name = "id", nullable = true, length = 30)
	private String id;
	
	@Column(name = "pw", nullable = true, length = 30)
	private String pw;
	
	@Column(name = "state", nullable = true, length = 30)
	private String state;
	
	@Column(name = "createdAt")
    private LocalDateTime createdAt;
	
    @Column(name = "updatedAt")
    private LocalDateTime updatedAt;
	
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

	public int getAdminKey() {
		return adminKey;
	}

	public void setAdminKey(int adminKey) {
		this.adminKey = adminKey;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPw() {
		return pw;
	}

	public void setPw(String pw) {
		this.pw = pw;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
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
