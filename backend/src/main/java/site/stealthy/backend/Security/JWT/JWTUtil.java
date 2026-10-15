package site.stealthy.backend.Security.JWT;

import java.util.Date;
import java.util.Optional;

import javax.crypto.SecretKey;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import site.stealthy.backend.Security.KeyStore.KeyStore;
import site.stealthy.backend.Security.KeyStore.KeyStoreRepository;
import site.stealthy.backend.User.User;
import site.stealthy.backend.User.UserService;

@Component
public class JWTUtil {
    private Log logger = LogFactory.getLog(JWTUtil.class.getName());
    private SecretKey secretKey;

    @Autowired
    JWTUtil(KeyStoreRepository keyStoreRepository) {
        var key = keyStoreRepository.findByName("JWT Signing Key");

        if (key.isEmpty()) {
            secretKey = Jwts.SIG.HS256.key().build();
            KeyStore keyStore = new KeyStore("JWT Signing Key", secretKey);
            keyStoreRepository.save(keyStore);
        } else {
            secretKey = key.get().asSecretKey();
        }
    }

    /**
     * @param user
     * @return String
     * @throws IllegalArgumentException
     * @throws JwtException
     */
    public String generateToken(User user) throws IllegalArgumentException, JwtException {
        Date issueDate = new Date();
        Date expiryDate = new Date(issueDate.getTime() + 1000 // conversion to seconds
                * 60 // seconds to minutes
                * 60 // minutes to hours
                * 24 // hours to days
                * 7);

        return Jwts.builder().subject(user.getId()).issuedAt(issueDate).expiration(expiryDate)
                .issuer("stealthy.site").signWith(secretKey).compact();
    }

    /**
     * @param token
     * @return Jws<Claims>
     * @throws JwtException
     */
    public Jws<Claims> extractClaims(String token) throws JwtException {
        return Jwts.parser().verifyWith(secretKey).build().parse(token).accept(Jws.CLAIMS);
    }

    /**
     * @param token
     * @param userService
     * @return Optional<User>
     */
    public Optional<User> extractUser(String token, UserService userService) {
        Jws<Claims> claims = null;

        try {
            claims = extractClaims(token);
        } catch (JwtException e) {
            logger.error(e.getMessage());
            return Optional.empty();
        }

        return userService.findUserbyId(claims.getPayload().getSubject());
    }

    /**
     * @param tokenString
     * @param userService
     * @return boolean
     */
    public boolean verifyToken(String tokenString, UserService userService) {
        Jws<Claims> claims = null;
        try {
            claims = extractClaims(tokenString);
        } catch (JwtException e) {
            // if it throws an error just discard
            logger.error(e.getMessage());
            return false;
        }

        // impossible scenario
        if (claims == null) {
            return false;
        }

        String subject = claims.getPayload().getSubject();
        String issuer = claims.getPayload().getIssuer();
        Date expiryDate = claims.getPayload().getExpiration();

        Optional<User> user = userService.findUserbyId(subject);

        if (user.isEmpty()) {
            return false;
        }

        return ((subject.compareTo(user.get().getId()) == 0) // is the same email
                && (issuer.compareTo("stealthy.site") == 0) // same issuer
                && (expiryDate.after(new Date())) // before expiry date
        );

    }
}