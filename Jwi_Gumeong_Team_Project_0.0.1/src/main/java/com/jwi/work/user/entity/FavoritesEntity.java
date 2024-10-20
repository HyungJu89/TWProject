package com.jwi.work.user.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "favorites")
public class FavoritesEntity {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int favoritesKey;
    
    // 넌 이제부터 유저키야 알았지?
    @ManyToOne
    @JoinColumn(name = "userKey", nullable = true)
    private UserConnectionEntity userConnection;
	
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

	public int getChannelKey() {
		return channelKey;
	}

	public UserConnectionEntity getUserConnection() {
		return userConnection;
	}

	public void setUserConnection(UserConnectionEntity userConnection) {
		this.userConnection = userConnection;
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
