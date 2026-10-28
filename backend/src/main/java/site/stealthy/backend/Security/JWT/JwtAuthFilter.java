package site.stealthy.backend.Security.JWT;

import java.io.IOException;
import java.util.Optional;

import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import site.stealthy.backend.User.User;
import site.stealthy.backend.User.UserService;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private UserService userService;

    /**
     * @param request
     * @param response
     * @param filterChain
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        logger.trace("Performing JWT filter");
        String authstring = request.getHeader("Authorization");
        String token = null;
        Optional<User> user = Optional.empty();

        if (authstring != null && authstring.startsWith("Bearer ")) {
            logger.trace("User has authorization header");
            token = authstring.substring(7);
            user = jwtUtil.extractUser(token, userService);
        }
        if (user.isPresent() && SecurityContextHolder.getContext().getAuthentication() == null) {
            logger.trace("User is present, loading user details");
            UserDetails userDetails = userService.loadUserByUsername(user.get().getUsername());

            if (jwtUtil.verifyToken(token, userService)) {
                logger.trace("User JWT Verified, Changing security context");
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }

}
