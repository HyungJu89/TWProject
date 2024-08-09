package com.jwi.work.center.sanction.service;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.jwi.work.center.sanction.dto.SanctionDTO;
import com.jwi.work.center.sanction.repository.SanctionRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class SanctionService {

    private SanctionRepository sanctionRepository;
    
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
}

