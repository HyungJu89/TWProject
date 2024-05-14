package com.jwi.work.dto.api.chzzkApi;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class SubscriptionPaymentAvailabilityDto {
	@JsonProperty("iapAvailability")
	private Boolean iapAvailability;
	 @JsonProperty("iabAvailability")
	private Boolean iabAvailability;
}