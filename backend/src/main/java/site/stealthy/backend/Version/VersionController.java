package site.stealthy.backend.Version;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.SpringVersion;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@RestController
@RequestMapping("/api/v1/version")
public class VersionController {
    @Autowired
    ObjectMapper mapper;

    
    @GetMapping("spring")
    ObjectNode spring() {
        ObjectNode versionObject = mapper.createObjectNode();
        versionObject.put("name", "spring");
        versionObject.put("version", SpringVersion.getVersion());
        return versionObject;
    }

    @GetMapping("java")
    ObjectNode java() {
        ObjectNode versionObject = mapper.createObjectNode();
        versionObject.put("name", "java");
        versionObject.put("version", Runtime.version().toString());
        return versionObject;
    }

    @GetMapping("postgresql")
    String postgresql() {
        return "";
    }
}
