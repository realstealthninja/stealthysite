package site.stealthy.backend.Security;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatterBuilder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.Formatter;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import site.stealthy.backend.Security.JWT.JwtAuthFilter;
import site.stealthy.backend.User.UserService;
import tools.jackson.databind.ext.javatime.deser.LocalDateTimeDeserializer;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    /**
     * @return PasswordEncoder
     */
    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * @return AuthenticationManager
     */
    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(
                userService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());

        ProviderManager providerManager = new ProviderManager(authenticationProvider);
        providerManager.setEraseCredentialsAfterAuthentication(false);

        return providerManager;

    }

    @Bean
    public RoleHierarchy roleHierarchy() {
        String hierarchy = "ROLE_ADMIN > ROLE_BLOGGER \n ROLE_BLOGGER > ROLE_USER";
        return RoleHierarchyImpl.fromHierarchy(hierarchy);
    }

    /**
     * @param httpSecurity
     * @return SecurityFilterChain
     * @throws Exception
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {

        return httpSecurity.cors(Customizer.withDefaults())
                .csrf(csrf -> csrf
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                        .csrfTokenRequestHandler(new AngularCsrfTokenRequestHandler()))

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/v1/users/login").permitAll()

                        .requestMatchers(HttpMethod.PATCH, "/v1/users/{id}/avatar").authenticated()
                        .requestMatchers(HttpMethod.PATCH, "/v1/users/{id}").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/v1/users/bio").authenticated()
                        .requestMatchers(HttpMethod.GET, "/v1/users/me").authenticated()
                        .requestMatchers(HttpMethod.POST, "/v1/blogs/new").hasRole("BLOGGER")
                        .requestMatchers(HttpMethod.PUT, "/v1/blogs/{id}").hasRole("BLOGGER")
                        .requestMatchers(HttpMethod.DELETE, "/v1/blogs/{id}").hasRole("BLOGGER")

                        .requestMatchers("/**").permitAll()

                ).httpBasic(http -> http.disable())
                .logout((logout) -> logout.logoutUrl("/v1/users/logout")
                        .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler()))
                .addFilterAfter(jwtAuthFilter, LogoutFilter.class).build();
    }

}