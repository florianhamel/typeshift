package com.typeshift.api.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Arrays;
import java.util.Date;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;

@Slf4j
@Service
@Getter
public class JwtService {
  @Value("${application.security.jwt.secret-key}")
  private String secretKey;

  @Value("${application.security.jwt.expiration}")
  private long jwtExpiration;

  public String extractJwtToken(HttpServletRequest request, String cookieName) {
    var jwtCookie = extractJwtCookie(request, cookieName);
    return Optional.ofNullable(jwtCookie)
      .map(Cookie::getValue)
      .orElse(null);
  }

  public String extractUsername(String jwtToken) {
    return extractClaim(jwtToken, Claims::getSubject);
  }

  public Date extractExpiration(String jwtToken) {
    return extractClaim(jwtToken, Claims::getExpiration);
  }

  public String generateJwtToken(Authentication authentication) {
    return Jwts.builder()
      .claims(null)
      .subject(authentication.getName())
      .expiration(Date.from(Instant.ofEpochMilli(Instant.now().toEpochMilli() + jwtExpiration)))
      .signWith(getSignInKey())
      .compact();
  }

  public ResponseCookie generateJwtCookie(String jwtToken) {
    return ResponseCookie.from("JWT_COOKIE", jwtToken)
      .path("/")
      .httpOnly(true)
      .sameSite("Strict")
      .maxAge(jwtExpiration)
      .build();
  }

  public boolean isTokenExpired(String jwtToken) {
    try {
      this.extractClaims(jwtToken);
      return false;
    } catch (JwtException ex) {
      return true;
    }
  }

  private Cookie extractJwtCookie(HttpServletRequest request, String name) {
    var cookies = request.getCookies();
    if (Objects.nonNull(cookies)) {
      return Arrays.stream(request.getCookies())
        .filter(cookie -> cookie.getName().equals(name))
        .findFirst()
        .orElse(null);
    }
    return null;
  }

  private <T> T extractClaim(String jwtToken, Function<Claims, T> claimResolver) {
    var claims = extractClaims(jwtToken);
    return claimResolver.apply(claims);
  }

  private Claims extractClaims(String jwtToken) {
    return Jwts.parser()
      .verifyWith(getSignInKey())
      .build()
      .parseSignedClaims(jwtToken)
      .getPayload();
  }

  private SecretKey getSignInKey() {
    byte[] keyBytes = Decoders.BASE64.decode(secretKey);
    return Keys.hmacShaKeyFor(keyBytes);
  }

//  public void tmp() {
//    SecretKey key = Jwts.SIG.HS256.key().build();
//    String secretString = Encoders.BASE64.encode(key.getEncoded());
//    System.out.println("secretString: " + secretString);
//  }
}
