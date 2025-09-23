package site.stealthy.backend.Utils;

public class RegisterDTO {
    private String firstname;
    /** 
     * @return String
     */
    public String getFirstname() {
        return firstname;
    }


    /** 
     * @param firstname
     */
    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }


    /** 
     * @return String
     */
    public String getLastname() {
        return lastname;
    }


    /** 
     * @param lastname
     */
    public void setLastname(String lastname) {
        this.lastname = lastname;
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


    /** 
     * @param password
     */
    public void setPassword(String password) {
        this.password = password;
    }


    /** 
     * @param username
     */
    public void setUsername(String username) {
        this.username = username;
    }


    private String lastname;
    private String email;
    private String password;
    private String username;

    /** 
     * @return String
     */
    public String getUsername() {
        return this.username;
    }


    /** 
     * @return String
     */
    public String getPassword() {
        return this.password;
    }
}
