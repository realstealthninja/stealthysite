package site.stealthy.backend;


import org.springframework.core.SpringVersion;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/version")
public class VersionController {

    @GetMapping("spring")
    String spring() {
        return SpringVersion.getVersion();
    }
}
