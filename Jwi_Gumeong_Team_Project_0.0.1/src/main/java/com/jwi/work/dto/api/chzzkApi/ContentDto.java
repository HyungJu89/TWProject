package com.jwi.work.dto.api.chzzkApi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ContentDto {
    @JsonProperty("channelId")
    private String channelId;

    @JsonProperty("channelName")
    private String channelName;

    @JsonProperty("channelImageUrl")
    private String channelImageUrl;

    @JsonProperty("verifiedMark")
    private Boolean verifiedMark;

    @JsonProperty("channelType")
    private String channelType;

    @JsonProperty("channelDescription")
    private String channelDescription;

    @JsonProperty("followerCount")
    private Integer followerCount;

    @JsonProperty("openLive")
    private Boolean openLive;

    @JsonProperty("subscriptionAvailability")
    private Boolean subscriptionAvailability;

    @JsonProperty("subscriptionPaymentAvailability")
    private SubscriptionPaymentAvailabilityDto subscriptionPaymentAvailability;
}