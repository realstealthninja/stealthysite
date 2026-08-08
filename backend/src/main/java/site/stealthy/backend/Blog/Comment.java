package site.stealthy.backend.Blog;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import site.stealthy.backend.User.User;

@Entity
@Table(name = "comments")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Comment {
    @Id
    private long id;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User author;
    private String body;

    @ManyToOne
    private Blog blog;

    @ManyToOne
    private Comment parent;

    private LocalDateTime createdOn;

    private LocalDateTime editedOn;

    /**
     * @return long
     */
    public long getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(long id) {
        this.id = id;
    }

    /**
     * @return User
     */
    public User getAuthor() {
        return author;
    }

    /**
     * @param author
     */
    public void setAuthor(User author) {
        this.author = author;
    }

    /**
     * @return String
     */
    public String getBody() {
        return body;
    }

    /**
     * @param body
     */
    public void setBody(String body) {
        this.body = body;
    }

    /**
     * @return Blog
     */
    public Blog getBlog() {
        return blog;
    }

    /**
     * @param blog
     */
    public void setBlog(Blog blog) {
        this.blog = blog;
    }

    /**
     * @return LocalDateTime
     */
    public LocalDateTime getCreatedOn() {
        return createdOn;
    }

    /**
     * @param createdOn
     */
    public void setCreatedOn(LocalDateTime createdOn) {
        this.createdOn = createdOn;
    }

    /**
     * @return LocalDateTime
     */
    public LocalDateTime getEditedOn() {
        return editedOn;
    }

    /**
     * @param editedOn
     */
    public void setEditedOn(LocalDateTime editedOn) {
        this.editedOn = editedOn;
    }

}
