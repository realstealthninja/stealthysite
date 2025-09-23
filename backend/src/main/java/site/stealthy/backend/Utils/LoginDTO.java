package site.stealthy.backend.Utils;


public class LoginDTO {
    private String username;

    private String password;


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

    /** 
     * @param username
     */
    public void setUsername(String username) {
        this.username = username;
    }


    /** 
     * @param password
     */
    public void setPassword(String password) {
        this.password = password;
    }


}
