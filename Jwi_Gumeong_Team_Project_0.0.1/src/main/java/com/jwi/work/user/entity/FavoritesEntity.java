package com.jwi.work.user.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "favorites")
public class FavoritesEntity {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int favoritesKey;
    
	@Column(name = "userKey", nullable = true)
	private int userKey;
	
	@Column(name = "channelKey", nullable = true)
	private int channelKey;
	
	@Column(name = "createdAt", nullable = true)
	private LocalDateTime createdAt;
	
	@Column(name = "updatedAt", nullable = true)
	private LocalDateTime updatedAt;

	public int getFavoritesKey() {
		return favoritesKey;
	}

	public void setFavoritesKey(int favoritesKey) {
		this.favoritesKey = favoritesKey;
	}

	public int getUserKey() {
		return userKey;
	}

	public void setUserKey(int userKey) {
		this.userKey = userKey;
	}

	public int getChannelKey() {
		return channelKey;
	}

	public void setChannelKey(int channelKey) {
		this.channelKey = channelKey;
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
