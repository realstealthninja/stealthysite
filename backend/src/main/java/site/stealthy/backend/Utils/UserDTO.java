package site.stealthy.backend.Utils;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record UserDTO(String username, String password, String bio) {}
