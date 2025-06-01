package site.stealthy.backend;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class FrontendController {

    @GetMapping("/{path:[^\\.]*}")
    public String forwardToAngular() {
        return "forward:/";
    }

}
