package com.typeshift.api.models.DTOs.authentication.out;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LogInDTO {
  private String username;
  private String email;
  private String firstname;
  private String lastname;
  private Long expiration;
}
