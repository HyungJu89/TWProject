package com.jwi.work.user.entity;

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
	private String userKey;
	
	@Column(name = "channelKey", nullable = true)
	private String channelKey;
	
	@Column(name = "createdAt", nullable = true)
	private String createdAt;
	
	@Column(name = "updatedAt", nullable = true)
	private String updatedAt;

}
