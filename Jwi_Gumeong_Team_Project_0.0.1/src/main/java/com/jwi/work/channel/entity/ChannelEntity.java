package com.jwi.work.channel.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "channel")
public class ChannelEntity {
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "channelKey")
	    private Integer channelKey;

	    @Column(name = "id", nullable = false, length = 32)
	    private String id;

	    @Column(name = "name", nullable = false, length = 255)
	    private String name;

	    @Lob
	    @Column(name = "imageUrl", nullable = false)
	    private String imageUrl;

	    @Column(name = "followerCount", nullable = false)
	    private Integer followerCount;

	    @Column(name = "createdAt", nullable = false, updatable = false)
	    private LocalDateTime createdAt;

	    @Column(name = "updatedAt", nullable = false)
	    private LocalDateTime updatedAt;

		public Integer getChannelKey() {
			return channelKey;
		}

		public void setChannelKey(Integer channelKey) {
			this.channelKey = channelKey;
		}

		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getImageUrl() {
			return imageUrl;
		}

		public void setImageUrl(String imageUrl) {
			this.imageUrl = imageUrl;
		}

		public Integer getFollowerCount() {
			return followerCount;
		}

		public void setFollowerCount(Integer followerCount) {
			this.followerCount = followerCount;
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
