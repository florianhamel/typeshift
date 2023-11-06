package com.typeshift.api.models.DTOs.authentication.in;

import lombok.Data;

@Data
public class LogInForm {
  private String username;
  private String password;
}
