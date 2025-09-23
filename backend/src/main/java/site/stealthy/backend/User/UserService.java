package site.stealthy.backend.User;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    /** 
     * @param user
     * @return User
     */
    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    /** 
     * @param username
     * @return Optional<User>
     */
    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByusername(username);
    }
    
    /** 
     * @param email
     * @return Optional<User>
     */
    public Optional<User> findUserbyEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /** 
     * @param username
     * @return UserDetails
     * @throws UsernameNotFoundException
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByusername(
            username
        ).orElseThrow(
            () ->  
            new UsernameNotFoundException("user not found" + username)
        );
        
        Set<GrantedAuthority> authorities = user.getRoles()
            .stream()
            .map(
                (role) -> new SimpleGrantedAuthority(role.getName())
            ).collect(
                Collectors.toSet()
            );

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .authorities(authorities)
                .build();
    }

    /** 
     * @param email
     * @return UserDetails
     * @throws UsernameNotFoundException
     */
    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException{
        User user = userRepository.findByEmail(email).orElseThrow(
            () ->
            new UsernameNotFoundException("Email not found " + email)
        );

        Set<GrantedAuthority> authorities = user.getRoles()
            .stream()
            .map(
                (role) -> new SimpleGrantedAuthority(role.getName())
            ).collect(
                Collectors.toSet()
            );
        
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .authorities(authorities)
                .build();
    }
}
