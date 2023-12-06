package com.typeshift.api.models.DTOs.authentication.in;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LogInForm {
  @NotNull
  private String username;

  @NotNull
  private String password;
}
