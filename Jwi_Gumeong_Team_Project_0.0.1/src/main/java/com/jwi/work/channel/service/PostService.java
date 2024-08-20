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
import com.jwi.work.channel.dto.SearchDto;
import com.jwi.work.channel.dto.bodyDto.PostDeleteDto;
import com.jwi.work.channel.dto.bodyDto.PostLikeDto;
import com.jwi.work.channel.dto.postDto.PostDto;
import com.jwi.work.channel.dto.sqlDto.ImageInfoDto;
import com.jwi.work.channel.dto.sqlDto.PostInfoDto;
import com.jwi.work.channel.mapper.PostMapper;
import com.jwi.work.util.FileManagerUtil;
import com.jwi.work.util.PagingUtil;

@Service
public class PostService {

	@Autowired
	private PostMapper postMapper;

	@Autowired
	private FileManagerUtil fileManagerUtil;
	
	private PagingUtil pagingUtil = new PagingUtil();
	
	public SearchDto<List<PostDto>> postSelect(String sessionId,int channelKey,int page){
		// 한페이지에 나올 개시글 숫자
		final int LIMIT_PAGE = 10;

		SearchDto<List<PostDto>> postSelect = new SearchDto<>();

		// 게시글 숫자
		int postCount = postMapper.postCount(channelKey);

		// 게시글이 없을때 바로 리턴시켜줌
		if (postCount == 0) {
			postSelect.setSuccess(false);

			return postSelect;
		}
		
		// 게시글이 있기떄문에 true로 변경
		postSelect.setSuccess(true);

		// 게시글 페이징 처장
		postSelect.setPaging(pagingUtil.paging(page, postCount, LIMIT_PAGE));
		
		// 게시글 불러오기, 채널키로 해당 채널에 있는 게시글들을 불러오고 LIMIT로 게시글을 몇개 가져올껀지 지정
			List<PostDto> posts = postMapper.postList(sessionId,channelKey,postSelect.getPaging().getOffset(),postSelect.getPaging().getLimit());
			
			// return 해줘야할 객체에 담아줌
			postSelect.setSearch(posts);

		return postSelect;
	}
	
	
	public AnswerDto<String> postCreate(int channelKey, String sessionId, String content, List<MultipartFile> files) {
		// 리턴용 객체
		AnswerDto<String> answer = new AnswerDto<>();
		// List<image> 를 JSON 형식으로 사용하기위해 변경
		ObjectMapper objectMapper = new ObjectMapper();

		// 객체 초기화 시켜줌
		String imageJson = null;

		try {
			System.out.println(sessionId);
			int userKey = postMapper.userKey(sessionId);
			// 리스트로 뽑아야하기에 생성
			if(userKey == 0) {
				answer.setMessage("로그인되어있지않습니다.");
				return answer;
			}
			ArrayList<String> imgUrlList = new ArrayList<>();
			// 이미지 파일 첨부가 되어있지않으면 에러가 발생하지않게 비워줌
			if (files == null) {
				files = Collections.emptyList();
			}
			// 파일이 있을때 들어가고 없을땐 else 로 빠짐
			if (!files.isEmpty()) {
				
				// 첨부되어있는 파일 갯수만큼 반복
				for (MultipartFile file : files) {

					// 이미지 파일을 hash 값으로 변환, 
					// 변환하는 이유는 이미지 파일이 똑같다면 hash 값이 동일하게 출력되는대 그걸이용하여 해당 이미지가 서버에  존재하는지 확인해주기위해서
					String imageHash = fileManagerUtil.getHash(file);

					// 해시값으로 이미지 파일 검색
					ImageInfoDto image = postMapper.selectHash(imageHash);
					
					// 이미지 파일이 출력되지않았다면 중복되는 이미지가 없기때문에 이미지 저장
					if (image == null || image.getReferenceCount() == 0) {
						// 이미지를 새로 초기화시켜주고
						image = new ImageInfoDto();
						// 이미지 저장 및 저장된 위치 출력해줌
						String imgUrl = fileManagerUtil.saveFile(file);
						// List 에 url 넣어줌
						imgUrlList.add(imgUrl);
						// image 정보를 DB에 저장
						postMapper.insertImg(imageHash , imgUrl);

					} else {
						// 해시값으로 출력된 이미지가 있을때 List에 출력된 이미지의 url을 넣고
						imgUrlList.add(image.getImageUrl());
						// DB에 이미지의 사용횟수를 넣어준다
						postMapper.referenceUp(image.getImageKey());
					}
				}
				// 이미지 URL 이 들어있는 LIST를 Json 으로 변환하여 문자열로만들어줌
				imageJson = objectMapper.writeValueAsString(imgUrlList);
			} else {
				// 이미지 파일이 존재하지않기때문에 null로 만들어줌
				imageJson = null;
			}
			// DB에 게시글 정보 저장
			postMapper.postCreate(userKey,channelKey,content,imageJson);
			
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
		// postKey로 개시글 조회
		post = postMapper.postInfo(postDelete.getPostKey());

		
		
		// image에 정보가 들어있는지 안들어있는지 확인
		if (post.getImage() != (null)) {
			// 들어있을때 json 문자열인 image 를 List로 변환
			ObjectMapper objectMapper = new ObjectMapper();
			List<String> imgUrlList;
			try {
			
				imgUrlList = objectMapper.readValue(post.getImage(), new TypeReference<List<String>>() {	});
			
			} catch (JsonProcessingException e) {
				
				// json 변환도중 실패할수도있으니 예외처리
				e.printStackTrace();
				anwer.setMessage("이미지 삭제 실패 1");
				anwer.setSuccess(false);
				return anwer;
			}
			///List로 뽑힌 이미지의 정보를 토대로 DB의 image 에 조회
			for (String imgUrl : imgUrlList) {

				ImageInfoDto image = new ImageInfoDto();
				// 이미지 URL로 이미지 출력
				image = postMapper.selectUrl(imgUrl);
				// DB에 ReferenceCount 칼럼은 이미지가 몇번 사용되었는지 표현을 한것. post가 삭제될것이니 ReferenceCount를 1낮춰야하는대 1을 낮추고 0이된다면
				// 이 이미지파일은 더이상 참조하는곳이 없기때문에 image 에서 delete 를 해도된다.
				if ((image.getReferenceCount() - 1) <= 0) {
					// 파일 삭제
					fileManagerUtil.removeFile(imgUrl);
					// DB에 저장되어있는 이미지 정보 삭제
					postMapper.deleteImg(image.getImageKey());
					
				} else {
					// 만약 1이상일때는 ReferenceCount 만 1낮춰준다.
					postMapper.referenceDown(image.getImageKey());
					
				}

			}

		}
		
		// post 는 delete해준다
		postMapper.postDelete(postDelete.getPostKey());
		anwer.setSuccess(true);

		return anwer;
	}
	
	
	public void postLike(PostLikeDto likeDto) {

		if(likeDto.isLike()) {
			postMapper.likeUp(likeDto);
		} else {
			postMapper.likeDown(likeDto);
		}
		
		
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
