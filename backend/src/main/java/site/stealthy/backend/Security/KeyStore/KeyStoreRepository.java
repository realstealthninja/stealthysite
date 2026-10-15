package site.stealthy.backend.Security.KeyStore;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KeyStoreRepository extends JpaRepository<KeyStore, Long> {
    Optional<KeyStore> findByName(String name);
}
