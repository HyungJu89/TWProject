package com.jwi.work.api.chzzkApi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class ChannelApiInfoDto {
    @JsonProperty("channelId")
    private String channelId;

    @JsonProperty("channelName")
    private String channelName;

    @JsonProperty("channelImageUrl")
    private String channelImageUrl;

    @JsonProperty("verifiedMark")
    private boolean verifiedMark;

    @JsonProperty("channelType")
    private String channelType;

    @JsonProperty("channelDescription")
    private String channelDescription;

    @JsonProperty("followerCount")
    private int followerCount;

    @JsonProperty("openLive")
    private boolean openLive;

    @JsonProperty("subscriptionAvailability")
    private boolean subscriptionAvailability;

    @JsonProperty("subscriptionPaymentAvailability")
    private SubscriptionPaymentAvailabilityDto subscriptionPaymentAvailability;

    @JsonProperty("adMonetizationAvailability")
    private boolean adMonetizationAvailability;
}