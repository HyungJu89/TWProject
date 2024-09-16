package com.jwi.work.channel.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.jwi.work.channel.dto.bodyDto.DelectByUser;
import com.jwi.work.channel.dto.bodyDto.PostLikeDto;
import com.jwi.work.channel.dto.postDto.PostDto;
import com.jwi.work.channel.dto.sqlDto.ImageInfoDto;
import com.jwi.work.channel.dto.sqlDto.PostInfoDto;

public interface PostMapper {

	// 게시글 숫자
	public int postCount (@Param("channelKey")int channelKey);
	
	// 게시글 리스트 뽑아줌
	public List<PostDto> postList(@Param("sessionId")String sessionId,@Param("channelKey")int channelKey,@Param("offset") int offset,@Param("limit") int limit);
	
	// 해시값 검색하여 이미지 데이터뽑아오기
	public ImageInfoDto selectHash(@Param("imageHash") String imageHash);
	
	// URL로 검색해서 이미지 데이터 뽑아오기
	public ImageInfoDto selectUrl(@Param("imageUrl") String imageUrl);
	
	// 게시글 생성
	public void postCreate(@Param("userKey") int userKey,@Param("channelKey") int channelKey,@Param("content") String content,@Param("imageJson") String imageJson);
	
	// 새로운 이미지로 게시글 작성시 이미지 삽입
	public void insertImg(@Param("imageHash")String imageHash ,@Param("imageUrl") String imageUrl);

	// 중복된 이미지로 게시글 작성시 이미지 count +1
	public void referenceUp(@Param("imageKey") int imageKey);
	
	// 게시글 삭제시 할때 게시글에 있던 이미지들 count -1
	public void referenceDown(@Param("imageKey") int imageKey);
	
	// 이미지 count 가 0이 되면 delete
	public void deleteImg(@Param("imageKey") int imageKey);
	
	// 게시글 키로 게시글 하나 출력 
	public PostInfoDto postInfo(@Param("postKey")int postKey);
	
	// 유저가 게시글을 삭제
	public void postDeleteByUser(DelectByUser postDelete);
	
	// 게시글 삭제
	public void postDelete(@Param("postKey")int postKey); 
	
	// 유저키 출력
	public int  userKey(@Param("sessionId")String sessionId);

	// Like Up
	
	public void likeUp(PostLikeDto likeDto);
	// Like down
	public void  likeDown(PostLikeDto likeDto);
	
//	public void postUpdate(@Param("postKey")int postKey,@Param("content")String content,@Param("image")String image);
}