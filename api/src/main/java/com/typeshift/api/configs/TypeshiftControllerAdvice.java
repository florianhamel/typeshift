package com.typeshift.api.configs;

import com.typeshift.api.exceptions.UserAlreadyExistsException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class TypeshiftControllerAdvice {

  @ExceptionHandler(value = UserAlreadyExistsException.class)
  @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
  @ResponseBody
  public ErrorResponse usernameAlreadyExistsException(UserAlreadyExistsException ex) {
    log.warn(ex.getMessage());
    return ErrorResponse.create(ex, HttpStatus.NOT_ACCEPTABLE, ex.getMessage());
  }
}
