package com.typeshift.api.models.Authentication;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.Instant;

@Data
public class SignUpForm {
  @NotNull
  @Email
  private String email;

  @NotNull
  @Size(min = 3)
  @Size(max = 16)
  private String username;

  @NotNull
  @Size(min = 7)
  private String password;

  private String firstname;
  private String lastname;
  private Instant dob;
}
