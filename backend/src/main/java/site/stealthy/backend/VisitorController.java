package site.stealthy.backend;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class VisitorController {
    private AtomicLong visitorCount = new AtomicLong(0);

    @PostMapping("/visitor/new")
    public void new_visitor() {
        visitorCount.addAndGet(1);
    }

    @GetMapping("/visitor/count")
    public int get_visitor() {
        return visitorCount.intValue();
    }

}
