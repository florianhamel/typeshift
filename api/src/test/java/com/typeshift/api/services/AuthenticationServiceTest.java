package com.typeshift.api.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Slf4j
@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {
  @InjectMocks
  AuthenticationService authenticationService;

  @Mock
  AuthenticationManager authenticationManager;

  @Test
  void should_nothing() {
    // GIVEN
//    when(authenticationManager.authenticate(any())).thenReturn(new MockAuthentication("Hello"));

    // WHEN
//    var dto = authenticationService.authenticate();

    // THEN
  }

  @RequiredArgsConstructor
  class MockAuthentication implements Authentication {
    private final String name;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
      return null;
    }

    @Override
    public Object getCredentials() {
      return null;
    }

    @Override
    public Object getDetails() {
      return null;
    }

    @Override
    public Object getPrincipal() {
      return null;
    }

    @Override
    public boolean isAuthenticated() {
      return false;
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {

    }

    @Override
    public String getName() {
      return name;
    }
  }
}