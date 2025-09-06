package site.stealthy.backend.Blog;

import java.util.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import site.stealthy.backend.User.User;

@Entity
@Table(name = "blogs")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;

    @ElementCollection
    private Set<String> tags;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdOn;
    @Temporal(TemporalType.TIMESTAMP)
    private Date editedOn;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @OneToMany
    private Set<Comment> comments;

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

    /** 
     * @return Date
     */
    public Date getCreatedOn() {
        return createdOn;
    }

    /** 
     * @param createdOn
     */
    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }

    /** 
     * @return Date
     */
    public Date getEditedOn() {
        return editedOn;
    }

    /** 
     * @param editedOn
     */
    public void setEditedOn(Date editedOn) {
        this.editedOn = editedOn;
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
     * @return Set<Comment>
     */
    public Set<Comment> getComments() {
        return comments;
    }

    /** 
     * @param comments
     */
    public void setComments(Set<Comment> comments) {
        this.comments = comments;
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

}
