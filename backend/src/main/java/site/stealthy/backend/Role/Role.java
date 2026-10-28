package site.stealthy.backend.Role;

import java.util.Collection;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import site.stealthy.backend.User.User;

@Entity
@Table(name = "roles", uniqueConstraints = { @UniqueConstraint(columnNames = "name") })
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private long id;

    @Column(length = 60, unique = true)
    private String name;

    @ManyToMany(mappedBy = "roles")
    private Collection<User> users;

    /**
     * @return String
     */
    public String getName() {
        return this.name;
    }

    /**
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }

    public boolean equals(final Object that) {
        if (this == that)
            return true;

        if (that == null || that.getClass() != this.getClass())
            return false;

        return ((Role) that).getId() == this.getId();
    }

    public long getId() {
        return id;
    }

    public int hashcode() {
        return Objects.hash(id, name);
    }

}
