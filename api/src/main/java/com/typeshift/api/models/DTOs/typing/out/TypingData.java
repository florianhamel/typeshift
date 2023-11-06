package com.typeshift.api.models.DTOs.typing.out;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TypingData {
  private Integer wpmMean;
  private Integer accuracyMean;
  private Integer sessionCount;
}
