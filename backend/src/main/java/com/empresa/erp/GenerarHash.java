package com.empresa.erp;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GenerarHash {
    public static void main(String[] args) {
        String hash = new BCryptPasswordEncoder().encode("1234");
        System.out.println(hash);
        System.out.println(new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder().matches("1234", "$2a$10$HzUnILP.0ib3.rszmAnhWeKUhPt35HB0.0Z65ouFLcFirtwKFLAOq"));
    }
}
