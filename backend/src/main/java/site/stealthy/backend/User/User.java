package site.stealthy.backend.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String username;
    private String firstname;
    private String lastname;
    private String password;


    long getId() {
        return id;
    }

    void setId(long id) {
        this.id = id;
    }

    @Column(unique=true)
    String getUsername() {
        return this.username;
    }

    void setUsername(String username) {
        this.username = username;
    }

    String getPassword() {
        return this.password;
    }

    void setPassword(String password) {
        this.password = password;
    }

    String getFirstname() {
        return this.firstname;
    }

    void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    String getLastname() {
        return this.lastname;
    }

    void setLastname(String lastname) {
        this.lastname = lastname;
    }

}
