package com.empresa.erp;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GenerarHash {
    public static void main(String[] args) {
        String hash = new BCryptPasswordEncoder().encode("1234");
        System.out.println(hash);
    }
}
