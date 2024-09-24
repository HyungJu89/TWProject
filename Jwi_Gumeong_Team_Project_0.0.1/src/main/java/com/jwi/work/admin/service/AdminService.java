package com.jwi.work.admin.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.jwi.work.admin.util.JwtUtil;
import com.jwi.work.alarm.entity.Alarm;
import com.jwi.work.alarm.entity.Report;
import com.jwi.work.alarm.entity.UserAlarmEntity;
import com.jwi.work.alarm.repository.AlarmRepository;
import com.jwi.work.alarm.repository.ReportRepository;
import com.jwi.work.center.inquiry.entity.Inquiry;
import com.jwi.work.center.inquiry.entity.InquiryResponse;
import com.jwi.work.center.inquiry.repository.InquiryRepository;
import com.jwi.work.center.inquiry.repository.InquiryResponseRepository;
import com.jwi.work.center.sanction.entity.Sanction;
import com.jwi.work.center.sanction.entity.SanctionLog;
import com.jwi.work.center.sanction.repository.SanctionLogRepository;
import com.jwi.work.center.sanction.repository.SanctionRepository;
import com.jwi.work.user.dto.User;
import com.jwi.work.user.mapper.UserMapper;
import com.jwi.work.util.FileManagerUtil;
import com.jwi.work.util.NowDate;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AdminService {
	
	// @Autowired << Bean 자동으로 돌려줌 ㅅㄱ
	
    /** 
     * TODO : 
     * 먼저 데이터 찾은다음에 있으면 전환 없으면 생성으로 하면 되려나? // 
     * 로그 만들어야됨 / 로그 테이블 , JPA 엔티티는 만들었음
     * 로그 다함 이제 페이징 처리 하고 다른걸로 넘어가면될듯 신고기능을 빨리 받아야지 연결할수있음.
     **/
	
	// Admin쪽으로 POST 요청 들어오면 처리
	@Autowired
	private AuthenticationManagerBuilder authenticationManagerBuilder;
	@Autowired
	private UserMapper userMapper;
	@Autowired
	private InquiryRepository inquiryRepository;
	@Autowired
	private InquiryResponseRepository inquiryResponseRepository; 
	@Autowired
	private SanctionRepository sanctionRepository;
	@Autowired
	private SanctionLogRepository sanctionLogRepository;
	@Autowired
	private ReportRepository reportRepository;
	@Autowired
	private NowDate dateCal;
	@Autowired
    private FileManagerUtil fileManagerUtil;
	@Autowired
	private AlarmRepository alarmRepository;
	
	// 데이터베이스에 직접 insert 하는거보다 여기에서 인코딩 거치고 넣는게 더 나을듯?
	public String loginJWT(Map<String,String> data) {
		// authToken 열어서 넣을수 있는 정보를 넣는다.
		var authToken = new UsernamePasswordAuthenticationToken(
				data.get("adminName"), data.get("adminPassWord")
			);
		// 정보 허가를 위해서 어센틱케이션에 정보를 넣는다.
		var auth = authenticationManagerBuilder.getObject().authenticate(authToken);
		SecurityContextHolder.getContext().setAuthentication(auth);
		
		//auth 변수 사용하고싶으면 이렇게 하면됨
		var jwt = JwtUtil.createToken(SecurityContextHolder.getContext().getAuthentication());
		
		// 로그인 로그도 여기에 남겨야할꺼같다.
		return jwt;
	}
	
	public List<User> findAllUsers(){
		// 형주가 작성한 userMapper(myBatis) 문법에 따라 Mapping처리한걸 Get함
		return userMapper.getAllUser();
	}
	
    public List<Inquiry> selectInquiry() {
    	// 재원이 형이 작성한 inquiryRepository(JPA) 문법에 따라 .findAll()을 호출
    	return inquiryRepository.findAll();
    }
    
    public List<InquiryResponse> selectInquiryResponse() {
    	// 재원이 형이 작성한 inquiryResponseRepository(JPA) 문법에 따라 .findAll()을 호출
    	return inquiryResponseRepository.findAll();
    }
    
    public List<Sanction> selectSanction(){
    	// 재원이 형이 작성한 sanctionRepository(JPA) 문법에 따라 .findAll()을 호출
    	return sanctionRepository.findAll();
    }
    
    public List<Report> selectReport(){
    	return reportRepository.findAll();
    }
    // 유저 밴하는 기능
    public void banndUser(Map<String,String> userData) {
    	// JPA 연결되어있는 리파지토리에서 JPA 문법을 이용해 매핑처리해둔 findByUserKey를 호출후 찾은 경우
    	// List<Sanction> 형태로 저장
    	// Integer.parseInt = 문자열을 정수로 전환
    	// userData.get("userKey") HashMap 마냥 Map 자료형으로 저장되어있는 userKey 키값의 벨류를 호출
    	UserAlarmEntity users = new UserAlarmEntity();
    	users.setUserKey(Integer.parseInt(userData.get("userKey")));
    	List<Sanction> sanctions = sanctionRepository.findByUserKey(Integer.parseInt(userData.get("userKey")));
    	List<Report> report = reportRepository.findByReportUserUserKey(Integer.parseInt(userData.get("userKey")));
    	Sanction sanction = new Sanction();
    	SanctionLog sanctionLog = new SanctionLog();
    	int bannedKey = 0;
    	// .get("adminName", String.class)
    	// 재원이형 여기서 알람리파지토리.save 하면됨!!!
    	// 비어있는경우 insert문 작동
    	
	    if (sanctions.isEmpty()) {
	    	//유저 비활성화로 전환 (밴)
	    	sanction.setReasonDate(dateCal.nowDate());
            sanction.setReason(userData.get("reason"));
            sanction.setUserKey(Integer.parseInt(userData.get("userKey")));
            sanction.setState("activate");
            sanction.setDate(Integer.parseInt(userData.get("date")));
            Sanction savedSanction = sanctionRepository.save(sanction);
            bannedKey = savedSanction.getBannedKey();
            sanctionLog.setBannedKey(bannedKey);
        // 비어있지 않는경우 update 문 작동
	    } else {
	    	System.out.println(" 이미 밴 되어있는 유저입니다 업데이트문으로 바꿈" + userData);
	    	for (Sanction sanctionR : sanctions) {
	    		sanctionR.setReasonDate(dateCal.nowDate());
	            sanctionR.setReason(userData.get("reason"));
	            sanctionR.setDate(Integer.parseInt(userData.get("date")));
	    		sanctionR.setState("activate");
	    		sanctionLog.setBannedKey(sanctionR.getBannedKey());
	            sanctionRepository.save(sanctionR);
	    	}
	    }
	    
	    for(Report reports : report) {
			// 이게 신고게시글 신고한놈의 User.UserKey 부분
//	    		System.out.println(reports.getUser().getUserKey());
    		reports.setState("process");
    		reportRepository.save(reports);
    		
    		// 신고한 유저에게 알림 추가
            Alarm reportUserAlarm = new Alarm();
            reportUserAlarm.setUserKey(reports.getUser().getUserKey()); // 신고한 유저
            reportUserAlarm.setReferenceType("system");
            reportUserAlarm.setReferenceKey(bannedKey);  // 신고 참조
            reportUserAlarm.setReferenceUserKey(reports.getReportUser().getUserKey()); // 제재 받은 유저 키
            reportUserAlarm.setReason(reports.getCategory()); // 신고 사유
            alarmRepository.save(reportUserAlarm);
    	}
	    // 중요한점 JPA에선 .save << 이 함수가 update / insert 다 사용할수있음.
	    // 얘가 똑똑해서 알아서 구분함
	    userMapper.updateDeAct(Integer.parseInt(userData.get("userKey")));
	    // 어드민키 jwt 활용해서 가져올 예정 임시로 1번 고정
	    // 로그 관련 게터세터
	    sanctionLog.setAdminKey(1);
	    sanctionLog.setReasonDate(dateCal.nowDateString());
	    sanctionLog.setUserKey(Integer.parseInt(userData.get("userKey")));
	    sanctionLog.setReason(userData.get("reason"));
	    sanctionLog.setDate(Integer.parseInt(userData.get("date")));
	    sanctionLog.setState("activate");
	    sanctionLogRepository.save(sanctionLog);
    } 
    
    // 유저 밴 되돌리기 기능
    public void revertBan(int userKey) {
    	// 밴 기록이 있을경우에만 작동 
    	List<Sanction> sanctions = sanctionRepository.findByUserKey(userKey);
    	SanctionLog sanctionLog = new SanctionLog();
	    if (!sanctions.isEmpty()) {
	    	// 유저 활성화로 전환
	    	userMapper.updateAct(userKey);
	        for (Sanction sanction : sanctions) {
	        	
	        	// sanction 설정
	            sanction.setState("deactivate");
	            sanctionRepository.save(sanction);
	            
	            // sanctionLog 설정
	    	    sanctionLog.setAdminKey(1);
	    	    sanctionLog.setReasonDate(dateCal.nowDateString());
	    	    sanctionLog.setUserKey(sanction.getUserKey());
	    	    sanctionLog.setReason(sanction.getReason());
	    	    sanctionLog.setDate(sanction.getDate());
	    	    sanctionLog.setBannedKey(sanction.getBannedKey());
	    	    sanctionLog.setState("deactivate");
	    	    sanctionLogRepository.save(sanctionLog);
	        }
	    } else {
	        System.out.println(" ㅋㅋ 없는데 왜찾음 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ" + userKey);
	    }
    }
    
	public String createInquiryResponse(int inquiryKey, String responseText, List<MultipartFile> files) {
		try {
			List<String> fileUrls = new ArrayList<>();
			// 이미지가 null이 아니고 비어 있지 않을 때만 처리
			if (files != null && !files.isEmpty()) {
				for (MultipartFile file : files) {
					String savedFileName = fileManagerUtil.saveFile(file);
					if (savedFileName != null) {
						fileUrls.add(savedFileName);
					}
				}
			}
			int adminKey = 1;
			String title = "임시";
			// 어드민 키 아직 못받아와서 하드코딩 했음
			InquiryResponse inquiryResponse = new InquiryResponse();
			inquiryResponse.setInquiryKey(inquiryKey);
			inquiryResponse.setAdminKey(adminKey);
			inquiryResponse.setTitle(title);
			inquiryResponse.setResponseText(responseText);
			inquiryResponse.setImage(String.join(",", fileUrls));
			inquiryResponseRepository.save(inquiryResponse);
			
			return "success";

		} catch (Exception e) {
			return "fail";
		}
	}
    
}