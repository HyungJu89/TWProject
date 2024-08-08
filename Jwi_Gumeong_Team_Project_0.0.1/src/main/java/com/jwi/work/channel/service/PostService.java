package com.jwi.work.channel.service;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jwi.work.channel.dto.AnswerDto;
import com.jwi.work.channel.dto.ImageDto;
import com.jwi.work.channel.dto.PostCreateDto;
import com.jwi.work.channel.dto.PostDeleteDto;
import com.jwi.work.channel.dto.PostDto;
import com.jwi.work.channel.mapper.PostMapper;
import com.jwi.work.channel.util.FileManagerUtil;

@Service
public class PostService {

	@Autowired
	private PostMapper postMapper;

	@Autowired
	private FileManagerUtil fileManagerUtil;

	public AnswerDto<String> postCreate(int channelKey, int userKey, String content, List<MultipartFile> files) {

		AnswerDto<String> answer = new AnswerDto<>();
		ObjectMapper objectMapper = new ObjectMapper();

		String imageJson = null;

		try {

			PostCreateDto postCteateDto = new PostCreateDto();

			ArrayList<String> imgUrlList = new ArrayList<>();

			if (files == null) {
				files = Collections.emptyList();
			}

			if (!files.isEmpty()) {

				for (MultipartFile file : files) {

					String imageHash = fileManagerUtil.getHash(file);

					ImageDto image = postMapper.selectHash(imageHash);

					if (image == null || image.getReferenceCount() == 0) {

						image = new ImageDto();

						String imgUrl = fileManagerUtil.saveFile(file);

						image.setImageHash(imageHash);

						image.setImageUrl(imgUrl);

						imgUrlList.add(imgUrl);

						postMapper.insertImg(image);

					} else {

						imgUrlList.add(image.getImageUrl());

						postMapper.referenceUp(image.getImageKey());
					}
				}
				imageJson = objectMapper.writeValueAsString(imgUrlList);
			} else {
				imageJson = null;
			}

			postCteateDto.setImage(imageJson);
			postCteateDto.setChannelKey(channelKey);
			postCteateDto.setContent(content);
			postCteateDto.setUserKey(userKey);
			postMapper.postCreate(postCteateDto);
			answer.setSuccess(true);

		} catch (IOException | NoSuchAlgorithmException e) {
			e.printStackTrace();
			answer.setSuccess(false);
		}

		return answer;
	}

	public AnswerDto<String> postDelete(PostDeleteDto postDelete) {
		PostDto post = new PostDto();
		AnswerDto<String> anwer = new AnswerDto<>();
		
		post = postMapper.postInfo(postDelete.getPostKey());
		
		if(post.getUserKey() != postDelete.getUserKey()) {
			anwer.setMessage("글 작성자가 아닙니다.");
			anwer.setSuccess(false);
			return anwer;
		}
		
		
		if (!post.getImage().equals(null)) {
			ObjectMapper objectMapper = new ObjectMapper();
			List<String> imgUrlList;
			try {
			
				imgUrlList = objectMapper.readValue(post.getImage(), new TypeReference<List<String>>() {	});
			
			} catch (JsonProcessingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				anwer.setMessage("이미지 삭제 실패 1");
				anwer.setSuccess(false);
				return anwer;
			}

			for (String imgUrl : imgUrlList) {
				ImageDto image = new ImageDto();

				image = postMapper.selectUrl(imgUrl);

				if ((image.getReferenceCount() - 1) <= 0) {

					fileManagerUtil.removeFile(imgUrl);

					postMapper.deleteImg(image.getImageKey());
					
				} else {
					
					postMapper.referenceDown(image.getImageKey());
					
				}

			}

		}
		
		
		postMapper.deletePost(postDelete.getPostKey());
		// 0이면 delete되게

		return null;
	}

}
