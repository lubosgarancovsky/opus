package io.github.lubosgarancovsky.Opus.utils;
import io.github.lubosgarancovsky.Opus.api.model.User;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.*;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtUtil {

    private final String SECRET = "AwmEKuBjGAMorU_^eyA)SAD6*DdRW.8*m'kMBu=AQdcS8`K|kTDvzr*0)fVlTp~";
    private final String REFRESH_SECRET = "ltRkDGlmT1cc9R0C2eMt08G&c59JNAu]NJ#>@7SI$_%`t%f~eLIF:%RKW[%Vb^B";
    private final int EXPIRATION_TIME = /*5*/ 1000;
    private final int REFRESH_EXPIRATION_TIME = 120;


    public String extractSubject(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String extractSubject(HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        return this.extractSubject(authHeader.substring(7));
    }


    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(User user) {
        Map<String, Object> claims = this.getUserClaims(user);
        return generateToken(user, claims, this.EXPIRATION_TIME);
    }

    public String generateRefreshToken(User user) {
        Map<String, Object> claims = this.getUserClaims(user);
        claims.put("isRefreshToken", true);
        return generateToken(user, claims, this.REFRESH_EXPIRATION_TIME);
    }

    public String generateToken(User user, Map<String, Object> claims, int expirationTime) {
        return Jwts
                .builder()
                .claims(claims)
                .subject(user.getId())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expirationTime * 1000L * 60))
                .signWith(this.getSigningKey())
                .compact();
    }

    public boolean isTokenValid(String token, User user) {
        final String subject = extractSubject(token);
        return (subject.equals(user.getId()) && !isTokenExpired(token));

    }

    public boolean isTokenExpired(String token) {
        return this.extractClaim(token, Claims::getExpiration).before(new Date());
    }

    private Map<String, Object> getUserClaims(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("firstName", user.getFirstName());
        claims.put("lastName", user.getLastName());
        claims.put("displayName", user.getDisplayName());
        claims.put("email", user.getEmail());
        claims.put("createdAt", user.getCreatedAt().toString());
        return claims;
    }


    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith((SecretKey) this.getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private Key getSigningKey() {
        byte[] keyBytes = this.SECRET.getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
