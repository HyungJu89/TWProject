package com.jwi.work.alarm.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "report")
public class Report {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reportKey;

    @ManyToOne
    @JoinColumn(name = "reportUserKey", nullable = false)
    private User reportUser; // 신고당한 유저

    @ManyToOne
    @JoinColumn(name = "userKey", nullable = false)
    private User user; // 신고한 유저

    @Column(name = "referenceType", nullable = false, length = 50)
    private String referenceType;

    @Column(name = "referenceKey", nullable = false)
    private int referenceKey;

    @Column(name = "category", nullable = false, length = 32)
    private String category;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "state", nullable = false, length = 50)
    private String state = "unprocessed";

    @Column(name = "createdAt", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updatedAt", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public int getReportUserKey() {
        return reportUser.getUserKey();
    }

	public int getReportKey() {
		return reportKey;
	}

	public void setReportKey(int reportKey) {
		this.reportKey = reportKey;
	}

	public User getReportUser() {
		return reportUser;
	}

	public void setReportUser(User reportUser) {
		this.reportUser = reportUser;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getReferenceType() {
		return referenceType;
	}

	public void setReferenceType(String referenceType) {
		this.referenceType = referenceType;
	}

	public int getReferenceKey() {
		return referenceKey;
	}

	public void setReferenceKey(int referenceKey) {
		this.referenceKey = referenceKey;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
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