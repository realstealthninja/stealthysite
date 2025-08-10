package site.stealthy.backend.Utils;

import java.util.Set;

public class BlogDTO {
    private String title;
    private Set<String> tags;
    private String content;

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public Set<String> getTags() {
        return tags;
    }
    public void setTags(Set<String> tags) {
        this.tags = tags;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
}
