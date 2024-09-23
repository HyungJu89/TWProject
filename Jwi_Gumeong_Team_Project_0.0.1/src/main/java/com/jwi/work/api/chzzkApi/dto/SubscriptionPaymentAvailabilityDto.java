package com.jwi.work.api.chzzkApi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class SubscriptionPaymentAvailabilityDto {
    @JsonProperty("iapAvailability")
    private boolean iapAvailability;

    @JsonProperty("iabAvailability")
    private boolean iabAvailability;
}