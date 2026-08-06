package site.stealthy.backend.Version;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.SpringVersion;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.node.ObjectNode;

@RestController
@RequestMapping("/v1/version")
public class VersionController {
    @Autowired
    ObjectMapper mapper;

    /**
     * @return ObjectNode
     */
    @GetMapping("spring")
    ObjectNode spring() {
        ObjectNode versionObject = mapper.createObjectNode();
        versionObject.put("name", "spring");
        versionObject.put("version", SpringVersion.getVersion());
        return versionObject;
    }

    /**
     * @return ObjectNode
     */
    @GetMapping("java")
    ObjectNode java() {
        ObjectNode versionObject = mapper.createObjectNode();
        versionObject.put("name", "java");
        versionObject.put("version", Runtime.version().toString());
        return versionObject;
    }

    /**
     * @return String
     */
    @GetMapping("postgresql")
    String postgresql() {
        return "";
    }
}
