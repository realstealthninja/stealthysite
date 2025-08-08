package site.stealthy.backend.Blog;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import jakarta.websocket.server.PathParam;
import site.stealthy.backend.User.UserRepository;
import site.stealthy.backend.Utils.BlogDTO;

@RestController
@RequestMapping("/api/v1/")
public class BlogController {
    @Autowired
    ObjectMapper mapper;

    @Autowired
    BlogRepository blogRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/blogs/")
    public ResponseEntity<ObjectNode> listBlogs() {
        ObjectNode hello = mapper.createObjectNode();
        hello.put("hi", "hello");
        return (new ResponseEntity<ObjectNode>(hello, HttpStatus.OK));
    }

    @GetMapping("/blogs/{id}")
    public ResponseEntity<ObjectNode> getBlogbyId(@PathParam("id") Long id) {
        ObjectNode respObject = mapper.createObjectNode();
        Optional<Blog> blog = blogRepository.findBlogById(id);
        if (blog.isEmpty()) {
            respObject.put("error", "Could not find blog");
        } else {
            respObject.put("id", blog.get().getId());
            respObject.put("title", blog.get().getTitle());
        
            respObject.put("content", blog.get().getContent());
            respObject.put("author_id", blog.get().getAuthor().getId());
            respObject.put("created_on", blog.get().getCreatedOn().getTime());
        }

        return (new ResponseEntity<ObjectNode>(respObject, HttpStatus.OK));
    }


    @PostMapping("/blogs/create/")
    public ResponseEntity<ObjectNode> createBlog(@RequestBody BlogDTO blog) {
        return null;
    }

    @PutMapping("/blogs/edit/:id")
    public ResponseEntity<ObjectNode> editBlog() {
        return null;
    }
    
}
