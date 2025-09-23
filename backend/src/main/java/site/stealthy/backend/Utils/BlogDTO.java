package site.stealthy.backend.Utils;

import java.util.Set;

public class BlogDTO {
    private String title;
    private Set<String> tags;
    private String content;

    /** 
     * @return String
     */
    public String getTitle() {
        return title;
    }
    /** 
     * @param title
     */
    public void setTitle(String title) {
        this.title = title;
    }
    /** 
     * @return Set<String>
     */
    public Set<String> getTags() {
        return tags;
    }
    /** 
     * @param tags
     */
    public void setTags(Set<String> tags) {
        this.tags = tags;
    }
    /** 
     * @return String
     */
    public String getContent() {
        return content;
    }
    /** 
     * @param content
     */
    public void setContent(String content) {
        this.content = content;
    }
}
