package com.typeshift.api.mappers;

import com.typeshift.api.models.Authentication.AuthenticationDTO;
import com.typeshift.api.models.User.User;
import org.springframework.stereotype.Component;


@Component
public class AuthenticationMapper implements Mapper<User, AuthenticationDTO> {
  @Override
  public AuthenticationDTO map(User user) {
    return AuthenticationDTO.builder()
      .username(user.getUsername())
      .email(user.getEmail())
      .firstname(user.getFirstname())
      .lastname(user.getLastname())
      .build();
  }
}
