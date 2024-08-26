package com.jwi.work.user.dto;

import java.util.Date;

import lombok.Data;

@Data
public class Favorites {

    private Integer favoritesKey;
    private Integer userKey;
    private Integer channelKey;
    private Date createdAt;
    private Date updatedAt;
}
