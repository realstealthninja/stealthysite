package site.stealthy.backend.Blog;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import site.stealthy.backend.User.User;
import site.stealthy.backend.User.UserRepository;

@RestController
@RequestMapping("/api/v1/blogs")
public class BlogController {
    @Autowired
    ObjectMapper mapper;

    @Autowired
    BlogRepository blogRepository;

    @Autowired
    UserRepository userRepository;

    /** 
     * @return ResponseEntity<ObjectNode>
     */
    @GetMapping("/")
    public ResponseEntity<ObjectNode> listBlogs() {
        ObjectNode ret = mapper.createObjectNode();
        Optional<Set<Blog>> blogs = blogRepository.getAllBlogs();
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
    public ResponseEntity<ObjectNode> getBlogbyId(@PathVariable("id") Long id) {
        ObjectNode respObject = mapper.createObjectNode();
        Optional<Blog> blog = blogRepository.findById(id);
        if (blog.isEmpty()) {
            respObject.put("error", "Could not find blog");
        } else {
            respObject = mapper.convertValue(blog, ObjectNode.class);
        }

        return (new ResponseEntity<ObjectNode>(respObject, HttpStatus.OK));
    }

    /** 
     * @param blog
     * @return ResponseEntity<ObjectNode>
     */
    @PostMapping("/create/")
    public ResponseEntity<ObjectNode> createBlog(@RequestBody ObjectNode blog) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Blog resBlog = mapper.convertValue(blog, Blog.class);
        resBlog.setAuthor(user);
        blogRepository.save(resBlog);
        blogRepository.flush();
        return (new ResponseEntity<ObjectNode>(mapper.convertValue(resBlog, ObjectNode.class),
                HttpStatus.OK));
    }

    /** 
     * @return ResponseEntity<ObjectNode>
     */
    @PutMapping("/edit/{id}")
    public ResponseEntity<ObjectNode> editBlog() {
        return null;
    }

}
