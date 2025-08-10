package site.stealthy.backend.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByusername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByusername(String Username);
}
