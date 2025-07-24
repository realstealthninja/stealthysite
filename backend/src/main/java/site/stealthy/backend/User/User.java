package site.stealthy.backend.User;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import site.stealthy.backend.Role.Role;

@Entity 
@Table(
    name = "users",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"username"})
    }
)
public class User implements UserDetails {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String username;
    private String firstname;


    private String email;
    private String lastname;
    private String password;

    private boolean approved = false;
    private boolean blogger = false;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
                                    inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Set<Role> roles;

    public User() {}

    public User (
        String username,
        String firstname,
        String lastname,
        String password,
        
        boolean approved,
        boolean blogger
    ) {
        this.username = username;
        this.password = password;

        this.firstname = firstname;
        this.lastname = lastname;
    }


    public long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }


    public void setUsername(String username) {
        this.username = username;
    }


    public String getFirstname() {
        return firstname;
    }


    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }


    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }


    public String getLastname() {
        return lastname;
    }


    public void setLastname(String lastname) {
        this.lastname = lastname;
    }


    public String getPassword() {
        return password;
    }


    public void setPassword(String password) {
        this.password = password;
    }


    public boolean isApproved() {
        return approved;
    }


    public void setApproved(boolean approved) {
        this.approved = approved;
    }


    public boolean isBlogger() {
        return blogger;
    }


    public void setBlogger(boolean blogger) {
        this.blogger = blogger;
    }


    public Set<Role> getRoles() {
        return roles;
    }


    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.getRoles()
            .stream()
            .map(
                (role) -> new SimpleGrantedAuthority(role.getName())
            ).collect(
                Collectors.toSet()
            );
    }

}
