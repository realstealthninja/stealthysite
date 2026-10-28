package site.stealthy.backend;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import jakarta.transaction.Transactional;
import site.stealthy.backend.Role.Role;
import site.stealthy.backend.Role.RoleRepository;
import site.stealthy.backend.User.UserService;
import site.stealthy.backend.User.User;

@Component
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {
    boolean hasSetup = false;

    @Autowired
    private UserService userService;

    @Autowired
    private RoleRepository roleRepository;

    @Value("${SPRING_ADMIN_EMAIL}")
    private String email;

    @Value("${SPRING_ADMIN_USER}")
    private String username;

    @Value("${SPRING_ADMIN_PASSWORD}")
    private String password;

    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (hasSetup) {
            return;
        }
        Role administratorRole = createRoleIfNotExists("ROLE_ADMIN");
        createRoleIfNotExists("ROLE_BLOGGER");
        createRoleIfNotExists("ROLE_USER");

        createUserIfNotExists(username, email, password, administratorRole);
        hasSetup = true;
    }

    @Transactional
    private User createUserIfNotExists(String username2, String email2, String password2,
            Role administratorRole) {
        Optional<User> user = userService.findUserByUsername(username2);

        if (user.isEmpty()) {
            User user2 = new User(username2, password2);
            user2.setEmail(email2);
            user2.setRoles(Set.of(administratorRole));

            userService.saveUser(user2);
            return user2;
        }

        return user.get();
    }

    @Transactional
    private Role createRoleIfNotExists(String name) {
        Optional<Role> role = roleRepository.findByName(name);

        if (role.isEmpty()) {
            Role role2 = new Role();
            role2.setName(name);
            roleRepository.save(role2);
            roleRepository.flush();
            return role2;
        }

        return role.get();
    }

}
