package site.stealthy.backend.Security.JWT;

import java.util.Date;
import java.util.Optional;

import javax.crypto.SecretKey;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import site.stealthy.backend.User.User;
import site.stealthy.backend.User.UserService;

@Component
public class JWTUtil {

    private SecretKey secretKey;

    JWTUtil() {
        secretKey = Jwts.SIG.HS256.key().build();
    }

    public String generateToken(User user) throws IllegalArgumentException, JwtException {
        Date issueDate = new Date();
        Date expiryDate = new Date(
            issueDate.getTime()
            + 1000 // conversion to seconds
            * 60 // seconds to minutes
            * 60 // mintues to hours
            * 24 // hours to days
            * 7 
        );

        return Jwts.builder()
                   .subject(user.getUsername())
                   .issuedAt(issueDate)
                   .expiration(expiryDate)
                   .issuer("stealthy.site")
                   .signWith(secretKey)
                   .compact(); 
    }

    public Jws<Claims> extractClaims(String token) throws JwtException {
        return Jwts.parser().verifyWith(secretKey).build().parse(token).accept(Jws.CLAIMS);
    }

    public Optional<User> extractUser(String token, UserService userService)  {
        Jws<Claims> claims = null;

        try {
            claims = extractClaims(token);
        } catch (JwtException e) {
            return null;
        }

        
        return userService.findUserbyEmail(
            claims.getPayload().getSubject()
        );
    }


    public boolean verifyToken(String tokenString, UserService userService) {
        Jws<Claims> claims = null;

        try {
            claims = extractClaims(tokenString);
        } catch (JwtException e) {
            // if it throws an error just discard
            return false;
        }

        // impossible scenario
        if (claims == null) {
            return false;
        }


        String subject = claims.getPayload().getSubject();
        String issuer = claims.getPayload().getIssuer();
        Date expiryDate = claims.getPayload().getExpiration();

        Optional<User> user = userService.findUserbyEmail(subject);
        
        if (user.isEmpty()) {
            return false;
        }

        return (
            (subject.compareTo(user.get().getEmail()) == 0)  // is the same email
            &&
            (issuer.compareTo("stealthy.site") == 0) // same issuer
            &&
            (expiryDate.before(new Date())) // before expiry date
        );

    }
}