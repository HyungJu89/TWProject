package com.jwi.work.channel.service;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jwi.work.channel.dto.AnswerDto;
import com.jwi.work.channel.dto.ImageDto;
import com.jwi.work.channel.dto.PostCreateDto;
import com.jwi.work.channel.mapper.PostMapper;
import com.jwi.work.channel.util.FileManagerUtil;

@Service
public class PostService {

	@Autowired
	private PostMapper postMapper;

	@Autowired
	private FileManagerUtil fileManagerUtil;

	public AnswerDto postCreate(int channelKey,  int userKey, String content,List<MultipartFile> files) {

		AnswerDto answer = new AnswerDto();
		
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			
			PostCreateDto postCteateDto = new PostCreateDto();
			
			ArrayList<String> imgUrlList = new ArrayList<>();
			
			for (MultipartFile file : files) {

				ImageDto imageDto = new ImageDto();

				String imageHash = fileManagerUtil.getHash(file);

				String image = postMapper.selectHash(imageHash);

				imageDto.setImageHash(imageHash);

				if (image.equals("0")) {

					String imgUrl = fileManagerUtil.saveFile(file);

					imageDto.setImageHash(imageHash);
					imageDto.setImageUrl(imgUrl);

					imgUrlList.add(imgUrl);

				} else {

					imgUrlList.add(image);

				}

			}
			
            String imageJson = objectMapper.writeValueAsString(imgUrlList);
            
            
			postCteateDto.setImage(imageJson);
			
			postCteateDto.setChannelKey(channelKey);
			
			postCteateDto.setContent(content);
			
			postCteateDto.setUserKey(userKey);
			
			postMapper.postCreate(postCteateDto);
			
			answer.setCreateSuccess(true);
			
		} catch (IOException | NoSuchAlgorithmException e) {
			e.printStackTrace();
			answer.setCreateSuccess(false);
		}
		
		return answer;
	}
	
	

}
