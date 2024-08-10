package com.jwi.work.center.sanction.dto;

import java.util.Date;

import lombok.Data;

@Data
public class SanctionDTO {

    private int bannedKey;
    private int userKey;
    private String reason;
    private Date reasonDate;
    private int date;
    private String state;
    private String endDate;

    public SanctionDTO(int bannedKey, int userKey, String reason, Date reasonDate, int date, String state, String endDate) {
        this.bannedKey = bannedKey;
        this.userKey = userKey;
        this.reason = reason;
        this.reasonDate = reasonDate;
        this.date = date;
        this.state = state;
        this.endDate = endDate;
    }
}
