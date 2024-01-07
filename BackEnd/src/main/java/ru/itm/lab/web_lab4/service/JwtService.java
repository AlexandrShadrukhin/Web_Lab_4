package ru.itm.lab.web_lab4.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import ru.itm.lab.web_lab4.entity.User;

import javax.xml.crypto.Data;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    private static final String openSesame = "ra+z8sR8I4g09gPU0tlj1pPpFIxBDCnV9ONLzU1QVY+aOJhk+TGY8/QTzMC6IrVwYfZZ4WqQvsyiqvEApq5S5kE2ND9fCBIPxb4ibz7K/4/GEBO2mHvkwn6f21ExqSi1grRulTSNuQ68cewHvneskT8A8FlVnMYf2w4X4BaUx5I0aA0DVS6s0KBhCyfm+wVe6tnuXbDPETUfMgufw/6dB0F5ZMoFjNoozTZ24jfwUnceEeMleMVyZGu/JKTKG2btIaUHgMRwVcmkGBxOpr292kUPX2cby3F3rxY9SBWO2+m6bHewN2sPmaREUuO8Zc/aw3SyGvmtjWHQbkevpaq3fr6U28B5PYlIRo3xQyahUwE=";
    public String extractUsername(String token){
        return extractClaim(token,Claims->Claims.get("username",String.class));
    }
    public String extractUserId(String token){return extractClaim(token,Claims::getSubject);}
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    public String generateToken(UserDetails userDetails){
        return generateToken(new HashMap<>(), userDetails);
    }
    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        final String id = extractUserId(token);
        System.out.printf(token, username,id);
        return  username.equals(userDetails.getUsername()) && ! isTokenExpired(token);
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    private Date extractExpiration(String token){
        return extractClaim(token,Claims::getExpiration);
    }

    public String generateToken(Map<String,Object> extraClaims,
                                UserDetails userDetails){
        extraClaims.put("username", userDetails.getUsername());
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(((User) userDetails).getId().toString())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+ 1000 * 60 * 24))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    private Key getSignInKey(){
        byte[]  keyBytes = Decoders.BASE64.decode(openSesame);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
