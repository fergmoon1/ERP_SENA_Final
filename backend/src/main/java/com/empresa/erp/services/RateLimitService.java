package com.empresa.erp.services;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.BucketConfiguration;
import io.github.bucket4j.Refill;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimitService {
    
    private final Map<String, Bucket> loginBuckets = new ConcurrentHashMap<>();
    private final Map<String, Bucket> generalBuckets = new ConcurrentHashMap<>();
    
    /**
     * Verifica si se permite el acceso para login (5 intentos por minuto)
     */
    public boolean allowLogin(String ipAddress) {
        Bucket bucket = loginBuckets.computeIfAbsent(ipAddress, this::createLoginBucket);
        return bucket.tryConsume(1);
    }
    
    /**
     * Verifica si se permite el acceso para endpoints generales (100 peticiones por minuto)
     */
    public boolean allowGeneralAccess(String ipAddress) {
        Bucket bucket = generalBuckets.computeIfAbsent(ipAddress, this::createGeneralBucket);
        return bucket.tryConsume(1);
    }
    
    /**
     * Obtiene el tiempo restante hasta el próximo intento permitido para login
     */
    public long getLoginWaitTime(String ipAddress) {
        Bucket bucket = loginBuckets.get(ipAddress);
        if (bucket != null) {
            return bucket.getAvailableTokens();
        }
        return 0;
    }
    
    /**
     * Crea un bucket para login con límite de 5 intentos por minuto
     */
    private Bucket createLoginBucket(String ipAddress) {
        Bandwidth limit = Bandwidth.classic(5, Refill.greedy(5, Duration.ofMinutes(1)));
        return Bucket.builder()
                .addLimit(limit)
                .build();
    }
    
    /**
     * Crea un bucket para acceso general con límite de 100 peticiones por minuto
     */
    private Bucket createGeneralBucket(String ipAddress) {
        Bandwidth limit = Bandwidth.classic(100, Refill.greedy(100, Duration.ofMinutes(1)));
        return Bucket.builder()
                .addLimit(limit)
                .build();
    }
} 