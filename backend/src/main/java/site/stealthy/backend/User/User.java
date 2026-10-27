package site.stealthy.backend.User;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import site.stealthy.backend.Blog.Blog;
import site.stealthy.backend.Blog.Comment;
import site.stealthy.backend.Role.Role;

/* @formatter:off */
@Entity 
@Table(
    name = "users",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"username"})
    }
)
@JsonIgnoreProperties(
    value = {
        "email",
        "password",
        "approved",
        "authorities",
        "accountNonExpired",
        "enabled",
        "credentialsNonExpired",
        "accountNonLocked",
    }
)
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
/* @formatter:on */
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String username;

    private String email;

    private String password;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(columnDefinition = "BYTEA")
    @JsonIgnore
    private byte[] avatar;

    @JsonManagedReference
    @OneToMany(mappedBy = "author")
    @JsonIdentityReference(alwaysAsId = true)
    private Set<Blog> blogs;

    @OneToMany(mappedBy = "author")
    private Set<Comment> comments;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Set<Role> roles;

    @CreationTimestamp
    private LocalDateTime createdOn;

    @UpdateTimestamp
    private LocalDateTime editedOn;

    public User() {}

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    /**
     * @return Collection<? extends GrantedAuthority>
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.getRoles().stream().map((role) -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toSet());
    }

    /**
     * @return string
     */
    public String getId() {
        return id;
    }

    /**
     * @return String
     */
    public String getUsername() {
        return username;
    }

    /**
     * @param username
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * @return String
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email
     */
    public void setEmail(String email) {
        this.email = email;
    }

    public String getBio() {
        return bio;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    /**
     * @return String
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * @return Set<Role>
     */
    public Set<Role> getRoles() {
        return roles;
    }

    /**
     * @param roles
     */
    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    /**
     * @return Set<Blog>
     */
    public Set<Blog> getBlogs() {
        return blogs;
    }

    /**
     * @param blogs
     */
    public void setBlogs(Set<Blog> blogs) {
        this.blogs = blogs;
    }

    public byte[] getAvatar() {
        return avatar;
    }

    public void setAvatar(byte[] avatar) {
        this.avatar = avatar;
    }

    public LocalDateTime getCreatedOn() {
        return createdOn;
    }

    public LocalDateTime getEditedOn() {
        return editedOn;
    }

}
