package site.stealthy.backend.Utils;

public class RegisterDTO {
    private String firstname;
    public String getFirstname() {
        return firstname;
    }


    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }


    public String getLastname() {
        return lastname;
    }


    public void setLastname(String lastname) {
        this.lastname = lastname;
    }


    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }


    public void setPassword(String password) {
        this.password = password;
    }


    public void setUsername(String username) {
        this.username = username;
    }


    private String lastname;
    private String email;
    private String password;
    private String username;

    public String getUsername() {
        return this.username;
    }


    public String getPassword() {
        return this.password;
    }
}
