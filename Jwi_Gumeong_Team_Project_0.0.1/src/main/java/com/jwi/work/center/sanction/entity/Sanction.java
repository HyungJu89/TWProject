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

@Data
@Entity
@Table(name="banned")
public class Sanction {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	public int bannedKey;
	
	@Column(name = "userKey", nullable = false)
	public int userKey;
	
	@Column(name = "reason", nullable = false)
	public String reason;
	
	@Column(name = "reasonDate", nullable = false)
	public Date reasonDate;
	
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
    
    public Date getEndDate() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(reasonDate);
        calendar.add(Calendar.DATE, date); // 시작일로부터 date만큼 일수를 더함
        return calendar.getTime();
    }
}
