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
import com.jwi.work.user.repository.UserRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class SanctionService {

    private SanctionRepository sanctionRepository;
    private UserRepository userRepository;
    
    public List<SanctionDTO> getList(int userKey) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy.MM.dd");

        return sanctionRepository.findByUserKey(userKey)
                 .stream()
                 .map(sanction -> {
                     String formattedEndDate = dateFormat.format(sanction.getEndDate()); // 포맷팅
                     return new SanctionDTO(
                         sanction.getBannedKey(),
                         sanction.getUserKey(),
                         sanction.getReason(),
                         sanction.getReasonDate(),
                         sanction.getDate(),
                         sanction.getState(),
                         formattedEndDate // 밴 종료날짜
                     );
                 })
                 .collect(Collectors.toList());
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
}

