package com.typeshift.api.models.Authentication;

import lombok.Data;

@Data
public class SignInForm {
  private String email;
  private String username;
  private String password;
  private String firstname;
  private String lastname;
}
