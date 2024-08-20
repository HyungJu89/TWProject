package com.jwi.work.center.sanction.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.center.sanction.dto.SanctionDTO;
import com.jwi.work.center.sanction.service.SanctionService;
import com.jwi.work.channel.dto.PagingDto;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/sanction")
public class SanctionRestController {

	private SanctionService sanctionService;
	
	@PostMapping("/list")
    public Map<String, Object> getBannedlist(@RequestParam("userKey") int userKey,
                                             @RequestParam("page") int page,
                                             @RequestParam("limitPage") int limitPage) {
        PagingDto pagingDto = new PagingDto();
        List<SanctionDTO> sanctions = sanctionService.getPagedList(userKey, page, limitPage, pagingDto);
        
        Map<String, Object> result = new HashMap<>();
        if (!sanctions.isEmpty()) {
            result.put("result", "success");
            result.put("sanctionList", sanctions);
            result.put("paging", pagingDto);  // 페이징 추가
        } else {
            result.put("result", "fail");
        }
        
        return result;
    }
	
	@PostMapping("/user")
	public Map<String, String> getBannedUserNickname(@RequestParam("userKey") int userKey) {
		String nickName = sanctionService.bannedUserNick(userKey);
		
		Map<String, String> result = new HashMap<>();
		if(nickName != null) {
			result.put("result", "success");
			result.put("nickName", nickName);
		} else {
			result.put("result", "fail");
		}
		
		return result;
	}
}
