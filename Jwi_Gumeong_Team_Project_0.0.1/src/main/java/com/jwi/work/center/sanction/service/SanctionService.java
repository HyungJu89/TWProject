package com.jwi.work.center.sanction.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.jwi.work.center.sanction.dto.SanctionDTO;
import com.jwi.work.center.sanction.entity.Sanction;
import com.jwi.work.center.sanction.repository.SanctionRepository;
import com.jwi.work.user.entity.UserEntity;
import com.jwi.work.user.mapper.UserMapper;
import com.jwi.work.user.repository.UserRepository;
import com.jwi.work.util.PagingUtil;
import com.jwi.work.util.dto.PagingDto;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class SanctionService {

    private SanctionRepository sanctionRepository;
    private UserRepository userRepository;
    private UserMapper userMapper;
    private PagingUtil pagingUtil;
    
    public List<SanctionDTO> getPagedList(int userKey, int page, int limitPage, PagingDto pagingDto) {
        
    	// 페이지가 0 이하일 경우 1로 설정
        if (page <= 0) {
            page = 1;
        }
        
    	List<Sanction> sanctions = sanctionRepository.findByUserKey(userKey);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy.MM.dd");

        // 페이징 처리
        PagingDto paging = pagingUtil.paging(page, sanctions.size(), limitPage);
        
        List<SanctionDTO> pagedSanctions = sanctions.stream()
                .skip(paging.getOffset())
                .limit(paging.getLimit())
                .map(sanction -> {
                    String formattedEndDate = dateFormat.format(sanction.getEndDate());
                    return new SanctionDTO(
                        sanction.getBannedKey(),
                        sanction.getUserKey(),
                        sanction.getReason(),
                        sanction.getReasonDate(),
                        sanction.getDate(),
                        sanction.getState(),
                        formattedEndDate
                    );
                })
                .collect(Collectors.toList());
        
        // 페이징 설정
        pagingDto.setPageCount(paging.getPageCount());
        pagingDto.setOffset(paging.getOffset());
        pagingDto.setLimit(paging.getLimit());
        pagingDto.setPageLimit(paging.getPageLimit());
        pagingDto.setPageUp(paging.isPageUp());
        pagingDto.setPagingBut(paging.isPagingBut());

        return pagedSanctions;
    }
    
    // 매일 자정에 상태를 체크하고 업데이트
    @Scheduled(cron = "0 0 0 * * ?")
    public void updateBannedUsers() {
        Date currentDate = new Date();
        // 활성화 상태인 모든 밴 목록을 가져옴
        List<Sanction> sanctions = sanctionRepository.findByState("activate");

        // 밴 종료일이 현재 날짜보다 이전인 경우 필터링
        sanctions = sanctions.stream()
                .filter(sanction -> sanction.getEndDate().before(currentDate))
                .collect(Collectors.toList());

        for (Sanction sanction : sanctions) {
            // UserEntity를 가져오는 부분 수정
            UserEntity user = userRepository.findById(sanction.getUserKey()).orElse(null);
            if (user != null) {
                // 유저 상태를 activate로 변경
                user.setState("activate");
                userRepository.save(user);
                // 밴 상태를 deactivate로 변경
                sanction.setState("deactivate");
                sanctionRepository.save(sanction);
            }
        }
    }
    
    public String bannedUserNick(int userKey) {
    	return userMapper.getNickName(userKey);
    }
}

