package com.typeshift.api.models.DTOs.typing.in;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TypingSession {
  @NotNull
  private Integer wpm;

  @NotNull
  private Integer accuracy;

  @NotNull
  private String type;

  @Size(max = 64)
  private String label;
}
