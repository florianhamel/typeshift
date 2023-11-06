package com.typeshift.api.models.DTOs.authentication.out;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SignUpDTO {
  private String email;
  private String username;
}
