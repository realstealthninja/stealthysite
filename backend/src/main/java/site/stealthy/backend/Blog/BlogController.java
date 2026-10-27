package site.stealthy.backend.Blog;

import java.io.IOException;
import java.util.Optional;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.node.ArrayNode;
import tools.jackson.databind.node.ObjectNode;

import jakarta.annotation.Nonnull;
import jakarta.websocket.server.PathParam;
import site.stealthy.backend.Role.Role;
import site.stealthy.backend.Role.RoleRepository;
import site.stealthy.backend.User.User;
import site.stealthy.backend.User.UserRepository;
import site.stealthy.backend.Utils.BlogDTO;
import site.stealthy.backend.Utils.BlogUpdateDTO;

@RestController
@RequestMapping("/v1/blogs")
public class BlogController {
    @Autowired
    ObjectMapper mapper;

    @Autowired
    BlogRepository blogRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    private Log logger = LogFactory.getLog(BlogController.class.getName());

    /**
     * @return ResponseEntity<ObjectNode>
     */
    @GetMapping("/")
    public ResponseEntity<?> listBlogs(@PathParam("by") Optional<String> author) {
        ObjectNode ret = mapper.createObjectNode();
        Optional<Set<Blog>> blogs;

        if (author.isEmpty()) {
            blogs = blogRepository.getAllBlogs();
        } else {
            Optional<User> authorUser = userRepository.findByusername(author.get());
            if (authorUser.isEmpty()) {
                ret.putArray("blogs");
                return ResponseEntity.ok(ret);
            } else {
                blogs = blogRepository.findBlogsByAuthor(authorUser.get());
            }
        }

        if (blogs.isEmpty()) {
            ret.putArray("blogs");
            return (new ResponseEntity<ObjectNode>(ret, HttpStatus.OK));
        }

        ArrayNode blogarr = ret.putArray("blogs");

        for (Blog blog : blogs.get()) {
            blogarr.add(mapper.convertValue(blog, ObjectNode.class));
        }

        return (new ResponseEntity<ObjectNode>(ret, HttpStatus.OK));
    }

    /**
     * @param id
     * @return ResponseEntity<ObjectNode>
     */
    @GetMapping("/{id}")
    public ResponseEntity<ObjectNode> getBlogbyId(@Nonnull @PathVariable("id") String id) {
        ObjectNode respObject = mapper.createObjectNode();
        Optional<Blog> blog = blogRepository.findById(id);
        if (blog.isEmpty()) {
            respObject.put("error", "Could not find blog");
        } else {
            respObject = mapper.convertValue(blog, ObjectNode.class);
        }

        return (new ResponseEntity<ObjectNode>(respObject, HttpStatus.OK));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBlog(@PathVariable("id") String id) {
        Optional<Blog> blog = blogRepository.findById(id);
        org.springframework.security.core.userdetails.User userdet = (org.springframework.security.core.userdetails.User) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        Optional<User> useropt = userRepository.findByusername(userdet.getUsername());
        User user = useropt.get();

        if (blog.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        if (blog.get().getAuthor().getId() != user.getId()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        blogRepository.delete(blog.get());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> putBlog(@PathVariable("id") String id,
            @RequestBody BlogUpdateDTO components) {
        Optional<Blog> blog = blogRepository.findById(id);
        org.springframework.security.core.userdetails.User userdet = (org.springframework.security.core.userdetails.User) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        Optional<User> useropt = userRepository.findByusername(userdet.getUsername());
        User user = useropt.get();

        if (blog.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        if (blog.get().getAuthor().getId() != user.getId()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        blog.get().setTitle(components.title());
        blog.get().setTags(components.tags());
        blog.get().setContent(components.content());

        blogRepository.save(blog.get());
        return ResponseEntity.ok(blog.get());
    }

    /**
     * @param blog
     * @return ResponseEntity<?>
     */
    @PostMapping("/new")
    public ResponseEntity<?> createBlog(@RequestPart("header") BlogDTO header,
            @RequestPart("content") MultipartFile body) {
        org.springframework.security.core.userdetails.User userdet = (org.springframework.security.core.userdetails.User) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        Optional<User> useropt = userRepository.findByusername(userdet.getUsername());
        User user = useropt.get();

        Optional<Role> blogger = roleRepository.findByName("ROLE_BLOGGER");
        Optional<Role> admin = roleRepository.findByName("ROLE_ADMIN");

        if (blogger.isEmpty() || admin.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }

        if (!user.getRoles().contains(blogger.get()) && !user.getRoles().contains(admin.get())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        if (!body.getContentType().contentEquals(MediaType.TEXT_MARKDOWN_VALUE)) {
            return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).build();
        }

        Blog blog = new Blog();
        blog.setTitle(header.title());
        blog.setTags(header.tags());
        blog.setAuthor(user);
        logger.trace("Written header of blog");

        try {
            String content = new String(body.getInputStream().readAllBytes());
            blog.setContent(content);
        } catch (IOException e) {
            logger.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }

        blogRepository.save(blog);

        return ResponseEntity.ok(blog);
    }
}
