package com.typeshift.api.configs;

import com.typeshift.api.services.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@Component
public class TypeshiftJwtFilter extends OncePerRequestFilter {
  private final UserDetailsService userDetailsService;
  private final JwtService jwtService;

  @Override
  protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
    log.info("---> TypeshiftJwtFilter <---");
    var jwtToken = jwtService.extractJwtToken(request, "JWT_COOKIE");
    if (Objects.nonNull(jwtToken)) {
      if (jwtService.isTokenExpired(jwtToken)) {
        log.info("Token [EXPIRED]");
        filterChain.doFilter(request, response);
        return;
      }
      log.info("Token [VALID]");
      log.info("Expires: " + jwtService.extractExpiration(jwtToken).toString());
      var username = jwtService.extractUsername(jwtToken);
      updateSecurityContext(username, request);
    } else {
      log.info("Token [NO_TOKEN]");
    }
    filterChain.doFilter(request, response);
  }

  private void updateSecurityContext(String username, HttpServletRequest request) {
    var userDetails = userDetailsService.loadUserByUsername(username);
    var securityToken = new UsernamePasswordAuthenticationToken(
      userDetails,
      null,
      userDetails.getAuthorities()
    );
    securityToken.setDetails(
      new WebAuthenticationDetailsSource().buildDetails(request)
    );
    SecurityContextHolder.getContext().setAuthentication(securityToken);
  }
}
