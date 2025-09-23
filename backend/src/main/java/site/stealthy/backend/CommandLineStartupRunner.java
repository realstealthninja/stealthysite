package site.stealthy.backend;

import site.stealthy.backend.Role.Role;
import site.stealthy.backend.Role.RoleRepository;
import site.stealthy.backend.User.User;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import site.stealthy.backend.User.UserService;

@Component
public class CommandLineStartupRunner implements CommandLineRunner {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserService userService;

    @Value("${PGADMIN_DEFAULT_PASSWORD}")
    private String password;

    @Value("${PGADMIN_DEFAULT_EMAIL}")
    private String email;

    /** 
     * @param args
     * @throws Exception
     */
    @Override
    public void run(String... args) throws Exception {
        // create roles

        Role user = new Role();
        user.setName("USER");
        if (roleRepository.findByName(user.getName()).isEmpty()) {
            roleRepository.save(user);
        }

        Role blogger = new Role();
        blogger.setName("BLOGGER");
        if (roleRepository.findByName(blogger.getName()).isEmpty()) {
            roleRepository.save(blogger);
        }

        Role admin = new Role();
        admin.setName("ADMIN");
        if (roleRepository.findByName(admin.getName()).isEmpty()) {
            admin = roleRepository.saveAndFlush(admin);
        }

        roleRepository.flush();

        String username = "stealthninja";
        if (userService.findUserByUsername(username).isEmpty()) {

            User admin_user = new User(username, null, null, password);
            admin_user.setEmail(email);

            Role adminRole = roleRepository.findByName("ADMIN").get();
            admin_user.setRoles(Collections.singleton(adminRole));

            userService.saveUser(admin_user);
        }

    }

}
