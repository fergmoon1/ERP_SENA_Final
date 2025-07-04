package com.empresa.erp.models;

import jakarta.persistence.*;

@Entity
public class PasswordPolicy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int minLength;
    private boolean requireUpper;
    private boolean requireLower;
    private boolean requireNumber;
    private boolean requireSymbol;
    private int expireDays;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public int getMinLength() { return minLength; }
    public void setMinLength(int minLength) { this.minLength = minLength; }

    public boolean isRequireUpper() { return requireUpper; }
    public void setRequireUpper(boolean requireUpper) { this.requireUpper = requireUpper; }

    public boolean isRequireLower() { return requireLower; }
    public void setRequireLower(boolean requireLower) { this.requireLower = requireLower; }

    public boolean isRequireNumber() { return requireNumber; }
    public void setRequireNumber(boolean requireNumber) { this.requireNumber = requireNumber; }

    public boolean isRequireSymbol() { return requireSymbol; }
    public void setRequireSymbol(boolean requireSymbol) { this.requireSymbol = requireSymbol; }

    public int getExpireDays() { return expireDays; }
    public void setExpireDays(int expireDays) { this.expireDays = expireDays; }
}