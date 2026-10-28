package site.stealthy.backend.Security.KeyStore;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class KeyStore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String algorithm;

    private String name;

    @Column(columnDefinition = "bytea", nullable = false)
    private byte[] encoded;

    public KeyStore() {}

    public KeyStore(String name, SecretKey key) {
        this.name = name;
        algorithm = key.getAlgorithm();
        encoded = key.getEncoded();
    }

    public SecretKey asSecretKey() {
        return new SecretKeySpec(encoded, algorithm);
    }

    public long getId() {
        return id;
    }

    public String getAlgorithm() {
        return algorithm;
    }

    public void setAlgorithm(String algorithm) {
        this.algorithm = algorithm;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getEncoded() {
        return encoded;
    }

    public void setEncoded(byte[] encoding) {
        this.encoded = encoding;
    }

}
