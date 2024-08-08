package com.jwi.work.channel.service;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jwi.work.channel.dto.AnswerDto;
import com.jwi.work.channel.dto.ImageDto;
import com.jwi.work.channel.dto.PostCreateDto;
import com.jwi.work.channel.dto.PostDeleteDto;
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

		
		
		
		
		return null;
	}

}
