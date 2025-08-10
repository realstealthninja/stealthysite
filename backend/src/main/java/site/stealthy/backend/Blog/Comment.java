package site.stealthy.backend.Blog;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import site.stealthy.backend.User.User;

@Entity
@Table(name = "comments")
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
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

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdOn;

    @Temporal(TemporalType.TIMESTAMP)
    private Date editedOn;

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public User getAuthor() {
        return author;
    }
    public void setAuthor(User author) {
        this.author = author;
    }
    public String getBody() {
        return body;
    }
    public void setBody(String body) {
        this.body = body;
    }
    public Blog getBlog() {
        return blog;
    }
    public void setBlog(Blog blog) {
        this.blog = blog;
    }
    public Date getCreatedOn() {
        return createdOn;
    }
    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }
    public Date getEditedOn() {
        return editedOn;
    }
    public void setEditedOn(Date editedOn) {
        this.editedOn = editedOn;
    }

}
