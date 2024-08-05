package com.jwi.work.channel.util;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.ServletContext;

@Component
public class FileManagerUtil {

	@Autowired
	private ServletContext servletContext;

	private static Logger logger = LoggerFactory.getLogger(FileManagerUtil.class);

	
	// 파일 해시값으로 변환하여 출력
	
	public String getHash(MultipartFile file)  throws IOException, NoSuchAlgorithmException  {

		return calculateFileHash(file);

	}

	
	private String calculateFileHash(MultipartFile file) throws IOException, NoSuchAlgorithmException {
		// 파일의 SHA-256 해시 값을 계산하여 16진수 문자열로 반환하는 메서드
		MessageDigest digest = MessageDigest.getInstance("SHA-256");

		// 파일의 바이트 배열을 입력으로 하여 SHA-256 해시 값을 계산
		byte[] hash = digest.digest(file.getBytes());

		// 해시 값을 16진수 문자열로 변환하기 위해 StringBuilder 사용
		// StringBuilder는 문자열을 생성한 후에도 그 내용을 쉽게 변경하거나 수정할수 있어서 사용함.
		// 장점 : 문자열을 직접 수정할수있어 메모리와 성능 절약가능
		StringBuilder hexString = new StringBuilder();

		// 해시 값의 각 바이트를 16진수로 변환하여 StringBuilder에 추가
		for (byte b : hash) {
			// 바이트 값을 16진수 문자열로 변환
			String hex = Integer.toHexString(0xff & b);
			// 변환된 문자열이 한 자리일 경우 앞에 '0' 을 추가하여 두자리로 만듦
			// .append() 은 문자열 앞에 특정값을 넣어줄수있다.
			if (hex.length() == 1)
				hexString.append('0');
			// 변환된 16진수 문자열을 StringBuilder에 추가
			hexString.append(hex);
		}
		return hexString.toString();
	}

	
	
	public String saveFile(MultipartFile file) {
		
		// 선택한 파일의 이름을 저장
		String originalFileName = file.getOriginalFilename();

		// 위에있는 originalFileName 의 파일 이름에서 파일 확장자만 가져온다
		String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
		// 저장될 파일 명
		String savedFileName = UUID.randomUUID() + extension; 
		
		
		String realPath = servletContext.getRealPath("/");
		
		String fileRoot = realPath + "resources/fileupload/";
		
		File directory = new File(fileRoot);
        // 디렉토리 존재 여부 체크
        if (!directory.exists()) {
            // 디렉토리 생성
            if (!directory.mkdirs()) {
                logger.error("saveFile : 디렉토리 생성 실패 - " + directory);
                return null;
            }
        }
		
		
//		String originalFileName = file.getOriginalFilename();	//오리지날 파일명 <- 요친구 날리고
//    	String extension = originalFileName.substring(originalFileName.lastIndexOf("."));	//파일 확장자 만 가져와서 
//     UUID.randomUUID() 랜덤으로다 돌리면 맥에서도 괜찮지않을까요?

		// 파일 저장
		String filePath = null;
		try {
			byte[] bytes = file.getBytes();

			filePath = fileRoot + savedFileName;
			Path path = Paths.get(filePath);
			Files.write(path, bytes);

		} catch (IOException e) {
			e.printStackTrace();
			logger.error("savefile : 파일 생성 실패 - " + filePath);
			return null;
		}

		return savedFileName;
	}


	// 파일 삭제 메소드
	public boolean removeFile(String filePath) { // /images/2_38239823/test.png

		String realPath = servletContext.getRealPath("/");
		
		String fileRoot = realPath + "resources/fileupload/";
		
		String realFilePath = fileRoot + filePath;
		Path path = Paths.get(realFilePath);

		// 파일이 존재하는지
		if (Files.exists(path)) {
			try {
				Files.delete(path);
			} catch (IOException e) {
				e.printStackTrace();
				return false;
			}
		}


		return true;
	}

}
