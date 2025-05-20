package site.stealthy.backend;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VisitorController {
    private AtomicLong visitorCount = new AtomicLong(0);

    @PostMapping("/api/visitor/new")
    public void new_visitor() {
    }

    @GetMapping("/api/visitor/count")
    public int get_visitor() {
        return visitorCount.intValue();
    }

}
