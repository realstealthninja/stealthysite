package site.stealthy.backend.Blog;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.stereotype.Repository;

import site.stealthy.backend.User.User;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    Optional<Set<Blog>> findBlogsByAuthor(User user);
    Optional<Set<Blog>> findBlogsByTags(Set<String> tags);

    @NativeQuery("SELECT * FROM blogs ORDER BY created_on DESC;")
    Optional<Set<Blog>> getAllBlogs();
}
