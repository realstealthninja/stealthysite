package site.stealthy.backend.User;

import site.stealthy.backend.Role.Role;
import site.stealthy.backend.Role.RoleRepository;
import site.stealthy.backend.Utils.LoginDTO;
import site.stealthy.backend.Utils.RegisterDTO;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class UserController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RoleRepository RoleRepository;

    private PasswordEncoder passwordEncoder;

    UserController() {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @PostMapping(
        path="/users/register",
        consumes = "application/json")
    ResponseEntity<?> registerUser(
        @RequestBody RegisterDTO registerDto
    ) {
        if(userRepository.existsByusername(registerDto.getUsername())) {
            return new ResponseEntity<>("Username already exists", HttpStatus.BAD_REQUEST);
        }

        User user = new User(
            registerDto.getUsername(),
            registerDto.getFirstname(),
            registerDto.getLastname(),
            passwordEncoder.encode(registerDto.getPassword()),
            false,
            false
        );
        
        Role roles = RoleRepository.findByName("USER").get();
        user.setRoles(Collections.singleton(roles));

        userRepository.save(user);

        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }

    @PostMapping(
        path = "/users/login",
        consumes = "application/json"
    )
    public ResponseEntity<String> authenticateUser(@RequestBody LoginDTO loginDTO) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginDTO.getUsername(), loginDTO.getPassword()
            )
        );

        System.out.println("user login attempt");

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new ResponseEntity<>("User sign in successful", HttpStatus.OK);
    }
}
