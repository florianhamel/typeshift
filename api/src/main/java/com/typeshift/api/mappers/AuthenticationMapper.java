package com.typeshift.api.mappers;

import com.typeshift.api.models.Authentication.LogInDTO;
import com.typeshift.api.models.User.User;
import org.springframework.stereotype.Component;


@Component
public class AuthenticationMapper implements Mapper<User, LogInDTO> {
  @Override
  public LogInDTO map(User user) {
    return LogInDTO.builder()
      .username(user.getUsername())
      .email(user.getEmail())
      .firstname(user.getFirstname())
      .lastname(user.getLastname())
      .build();
  }
}
