package com.jwi.work.center.sanction.entity;

import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="bannedLog")
public class SanctionLog {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	public int bannedLogKey;
	
	@Column(name = "bannedKey", nullable = false)
	public int bannedKey;
	
	@Column(name = "userKey", nullable = false)
	public int userKey;
	
	@Column(name = "adminKey", nullable = false)
	public int adminKey;
	
	@Column(name = "reason", nullable = false)
	public String reason;
	
	@Column(name = "reasonDate", nullable = false)
	public String reasonDate;
	
	@Column(name = "date", nullable = false)
	public int date;
	
	@Column(name = "state", nullable = false)
	public String state;
	
	@Column(name = "createdAt", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updatedAt", nullable = false)
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

	public int getBannedLogKey() {
		return bannedLogKey;
	}

	public void setBannedLogKey(int bannedLogKey) {
		this.bannedLogKey = bannedLogKey;
	}

	public int getBannedKey() {
		return bannedKey;
	}

	public void setBannedKey(int bannedKey) {
		this.bannedKey = bannedKey;
	}

	public int getUserKey() {
		return userKey;
	}

	public void setUserKey(int userKey) {
		this.userKey = userKey;
	}

	public int getAdminKey() {
		return adminKey;
	}

	public void setAdminKey(int adminKey) {
		this.adminKey = adminKey;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getReasonDate() {
		return reasonDate;
	}

	public void setReasonDate(String reasonDate) {
		this.reasonDate = reasonDate;
	}

	public int getDate() {
		return date;
	}

	public void setDate(int date) {
		this.date = date;
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