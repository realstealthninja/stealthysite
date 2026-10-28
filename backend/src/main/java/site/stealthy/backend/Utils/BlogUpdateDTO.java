package site.stealthy.backend.Utils;

import java.util.Set;

public record BlogUpdateDTO(String title, Set<String> tags, String content) {

}
