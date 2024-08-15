package com.jwi.work.center.faq.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="faq")
public class Faq {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	public int key;
	
	@Column(name = "title", nullable = false, length = 32)
	public String title;
	
	@Column(name = "content", nullable = false)
	public String content;
	
	@Column(name = "category", nullable = false, length = 32)
	public String category;
	
	@Column(name = "imagePath", nullable = true, length = 256)
	public String imagePath;
	
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
}
