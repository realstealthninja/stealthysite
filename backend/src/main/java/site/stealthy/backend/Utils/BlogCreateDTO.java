package site.stealthy.backend.Utils;

import java.util.Set;

public record BlogCreateDTO(String title, Set<String> tags) {}
