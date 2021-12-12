package com.jee.backend.utils;

import com.jee.backend.model.User;
import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {


    public String generateJwtToken(Authentication authentication) {

        User userPrincipal = (User) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + 36000))
                .signWith(SignatureAlgorithm.HS512, "jwtSecret")
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey("jwtSecret").parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey("jwtSecret").parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            System.out.println("Invalid JWT signature: {}" + e.getMessage());
        } catch (MalformedJwtException e) {
            System.out.println("Invalid JWT signature: {}" + e.getMessage());
        } catch (ExpiredJwtException e) {
            System.out.println("Invalid JWT signature: {}" + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.out.println("Invalid JWT signature: {}" + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("Invalid JWT signature: {}" + e.getMessage());
        }

        return false;
    }

}
