package site.stealthy.backend.User;

import site.stealthy.backend.Role.Role;
import site.stealthy.backend.Role.RoleRepository;
import site.stealthy.backend.Security.JWT.JWTUtil;
import site.stealthy.backend.Utils.LoginDTO;
import site.stealthy.backend.Utils.RegisterDTO;

import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@RestController
@RequestMapping("/api/v1")
public class UserController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUtil jwtUtil;
    
    @Autowired
    private RoleRepository RoleRepository;

    @Autowired
    private ObjectMapper mapper;

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
            passwordEncoder.encode(registerDto.getPassword())
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
    public ResponseEntity<ObjectNode> authenticateUser(@RequestBody LoginDTO loginDTO) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginDTO.getUsername(), loginDTO.getPassword()
            )
        );

        Optional<User> user = userRepository.findByusername(loginDTO.getUsername());

        ObjectNode respNode = mapper.createObjectNode();

        if (user.isEmpty()) {
            respNode.put("error", "user not found");
            return new ResponseEntity<>(respNode, HttpStatus.OK);
        }


        if (authentication.isAuthenticated()) {
            respNode.put("jwt", jwtUtil.generateToken(user.get()));
            
            return new ResponseEntity<ObjectNode>(respNode, HttpStatus.OK);
        }
        respNode.put("error", "Internal Server error");

        return new ResponseEntity<>(respNode, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
