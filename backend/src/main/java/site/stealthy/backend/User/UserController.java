package site.stealthy.backend.User;

import site.stealthy.backend.Role.Role;
import site.stealthy.backend.Role.RoleRepository;
import site.stealthy.backend.Security.JWT.JWTUtil;
import site.stealthy.backend.Utils.UserCreateDTO;
import site.stealthy.backend.Utils.UserLoginDTO;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.node.ObjectNode;

@RestController
@RequestMapping("/v1/users")
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

    @GetMapping("/{id}")
    ResponseEntity<ObjectNode> getUser(@PathVariable("id") String id) {
        ObjectNode respObject = mapper.createObjectNode();

        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            respObject = mapper.convertValue(user.get(), ObjectNode.class);
        } else {
            respObject.put("error", "Could not find user");
        }

        return new ResponseEntity<>(respObject, HttpStatus.OK);
    }

    @GetMapping("/")
    ResponseEntity<ObjectNode> findUser(@RequestParam("username") String username) {
        Optional<User> user = userRepository.findByusername(username);
        ObjectNode respObjectNode = mapper.createObjectNode();

        if (user.isPresent()) {
            respObjectNode = mapper.convertValue(user.get(), ObjectNode.class);
        } else {
            respObjectNode.put("error", "Could not find user.");
            return new ResponseEntity<>(respObjectNode, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(respObjectNode, HttpStatus.OK);
    }

    @GetMapping("/{id}/avatar")
    ResponseEntity<byte[]> getAvatar(@PathVariable("id") String id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG)
                    .body(user.get().getAvatar());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/me")
    ResponseEntity<ObjectNode> getMe(@CurrentSecurityContext SecurityContext context) {
        User user = (User) context.getAuthentication().getPrincipal();
        ObjectNode respObjectNode = mapper.convertValue(user, ObjectNode.class);
        return ResponseEntity.ok(respObjectNode);
    }

    @PutMapping(path = "/avatar")
    ResponseEntity<?> setAvatar(@RequestParam("avatar") MultipartFile file) {
        org.springframework.security.core.userdetails.User userdet = (org.springframework.security.core.userdetails.User) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        if (!file.getContentType().contentEquals(MediaType.IMAGE_PNG_VALUE)) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_CONTENT)
                    .body(file.getContentType());
        }

        if (file.getSize() > 5_000_000) {
            return new ResponseEntity<>(HttpStatus.CONTENT_TOO_LARGE);
        }

        Optional<User> useropt = userRepository.findByusername(userdet.getUsername());

        if (useropt.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        User user = useropt.get();

        try {
            user.setAvatar(file.getBytes());
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }

        userRepository.save(user);

        return ResponseEntity.ok().build();

    }

    /**
     * @param registerDto
     * @return ResponseEntity<?>
     */
    @PostMapping(path = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<?> registerUser(@RequestBody UserCreateDTO registerDto) {
        if (userRepository.existsByusername(registerDto.username())) {
            return new ResponseEntity<>("Username already exists", HttpStatus.BAD_REQUEST);
        }

        User user = new User(registerDto.username(),
                passwordEncoder.encode(registerDto.password()));

        Role roles = RoleRepository.findByName("USER").get();
        user.setRoles(Collections.singleton(roles));

        userRepository.save(user);

        return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
    }

    /**
     * @param loginDTO
     * @return ResponseEntity<ObjectNode>
     */
    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ObjectNode> authenticateUser(@RequestBody UserLoginDTO loginDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.username(), loginDTO.password()));

        Optional<User> user = userRepository.findByusername(loginDTO.username());

        ObjectNode respNode = mapper.createObjectNode();

        if (user.isEmpty()) {
            respNode.put("error", "user not found");
            return new ResponseEntity<>(respNode, HttpStatus.OK);
        }

        if (authentication.isAuthenticated()) {
            respNode.put("jwt", jwtUtil.generateToken(user.get()));
            respNode.put("id", user.get().getId());

            return new ResponseEntity<ObjectNode>(respNode, HttpStatus.OK);
        }
        respNode.put("error", "Internal Server error");

        return new ResponseEntity<>(respNode, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
