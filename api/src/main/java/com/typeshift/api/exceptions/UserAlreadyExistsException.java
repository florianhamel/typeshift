package com.typeshift.api.exceptions;

import org.springframework.security.core.AuthenticationException;

public class UserAlreadyExistsException extends AuthenticationException {
  public UserAlreadyExistsException(String message) {
    super(message);
  }
}
