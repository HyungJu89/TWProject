package com.jwi.work.channel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jwi.work.channel.entity.ChannelEntity;

import java.util.List;


@Repository
public interface ChannelRepository extends JpaRepository<ChannelEntity, Integer> {
	public List<ChannelEntity> findByChannelKey(int channelKey);
}
