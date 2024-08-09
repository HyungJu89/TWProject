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
import com.jwi.work.channel.dto.postDto.PostDto;
import com.jwi.work.channel.dto.sqlDto.PostInfoDto;
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
		PostInfoDto post = new PostInfoDto();
		
		AnswerDto<String> anwer = new AnswerDto<>();
		
		post = postMapper.postInfo(postDelete.getPostKey());
		
		if(post.getUserKey() != postDelete.getUserKey()) {
			anwer.setMessage("글 작성자가 아닙니다.");
			anwer.setSuccess(false);
			return anwer;
		}
		
		
		if (post.getImage() != (null)) {
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
		
		
		postMapper.postDelete(postDelete.getPostKey());
		// 0이면 delete되게

		return anwer;
	}
	
//	public AnswerDto<String> postUpdate(int postKey,int userKey,String content,List<MultipartFile>files) {
//		//업데이트 로직은 기존에 post에 이미지가 있다면 우선적으로 전부 삭제하고 이미지를 select 를 해주면된다.
//		// 먼저 기존에 있던 게시글의 정보를 불러오고
//		PostDto post = new PostDto();
//		AnswerDto<String> anwer = new AnswerDto<>();
//		post = postMapper.postInfo(postKey);
//		
//    // 지금 접속되있는 유저와 게시글의 유저와 정보가 일치하는지 확인
//		if(post.getUserKey() != userKey) {
//			anwer.setMessage("글 작성자가 아닙니다.");
//			anwer.setSuccess(false);
//			return anwer;
//		}
//		
//		
//		
//		AnswerDto<String> answer = new AnswerDto<>();
//		ObjectMapper objectMapper = new ObjectMapper();
//		String imageJson = null;
//
//		try {
//         
//			ArrayList<String> imgUrlList = new ArrayList<>();
//
//			// 첨부된 파일이 없을땐 리스트를 비워버린다
//			if (files == null) {
//				files = Collections.emptyList();
//			}
//
//			answer.setMessage("첨부 파일검사");
//			// 파일이 비어있는지 검사하고 파일 정보가 들어있으면 들어간다
//			if (!files.isEmpty()) {
//          // 향상포문으로 FILES 를 풀어주고 이미지를 해시로 풀어준다
//				for (MultipartFile file : files) {
//
//					String imageHash = fileManagerUtil.getHash(file);
//
//					ImageDto image = postMapper.selectHash(imageHash);
//
//					if (image == null || image.getReferenceCount() == 0) {
//					// 해시로 image 를 검색했을때 값이 나오지않았다면 이미지를 생성시키고 이미지테이블에 값을 저장하고 리스트에 첨부
//						image = new ImageDto();
//
//						String imgUrl = fileManagerUtil.saveFile(file);
//
//						image.setImageHash(imageHash);
//
//						image.setImageUrl(imgUrl);
//
//						imgUrlList.add(imgUrl);
//
//						postMapper.insertImg(image);
//					
//					} else {
//                      // 이미지를 검색했을때 값이 나오면 이미지의 URL 만 가져오고 List에 첨부
//						imgUrlList.add(image.getImageUrl());
//
//						postMapper.referenceUp(image.getImageKey());
//					}
//				}
//            // 이미지 List를 Json으로 변환한다
//				imageJson = objectMapper.writeValueAsString(imgUrlList);
//			} else {
//            // 첨부 이미지가 없을때
//				imageJson = null;
//			}
//
//
//			answer.setMessage("이미지 검사");
//			// 위 처리가 완료된후 기존에 있던 post 이미지의 데이터를 바탕으로 처리
//			if (post.getImage() != (null)) {
//          // image 값이 있을때 들어간다
//				List<String> imgUrlListDelect = null;
//
//			//json 값을 List로 변환시켜줌
//			imgUrlListDelect = objectMapper.readValue(post.getImage(), new TypeReference<List<String>>() {	});
//				
//
//
//	
//			answer.setMessage("이미지 삭제중");
//			// 향상 포문을 사용해서 List 를 풀어주고			
//			for (String imgUrl : imgUrlListDelect) {
//			
//					ImageDto image = new ImageDto();
//
//					image = postMapper.selectUrl(imgUrl);
//					// referenceCount 값 - 1 이 1 이상일땐 update를 사용해서 1씩 낮춰주고 0이하일땐 delete 및 파일 삭제를 해준다.
//					if ((image.getReferenceCount() - 1) <= 0) {
//
//						fileManagerUtil.removeFile(imgUrl);
//
//						postMapper.deleteImg(image.getImageKey());
//						
//					} else {
//						
//						postMapper.referenceDown(image.getImageKey());
//						
//					}
//
//				}
//
//			}
//			
//			//위 처리가 완료된후 업데이트해준다.
//			postMapper.postUpdate(postKey,content,imageJson);
//			answer.setSuccess(true);
//			answer.setMessage(null);
//			
//		} catch (IOException | NoSuchAlgorithmException e) {
//			e.printStackTrace();
//			answer.setSuccess(false);
//		}
//		
//
//		return anwer;
//		
//		
//		
//	
//	}
}
