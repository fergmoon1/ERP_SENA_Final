package com.empresa.erp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.http.HttpMethod;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public RoleHierarchy roleHierarchy() {
        RoleHierarchyImpl roleHierarchy = new RoleHierarchyImpl();
        // ADMIN > SUPERVISOR > USER
        roleHierarchy.setHierarchy("ROLE_ADMIN > ROLE_SUPERVISOR \n ROLE_SUPERVISOR > ROLE_USER");
        return roleHierarchy;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll() // Permite login sin autenticación
                .requestMatchers("/api/productos/publicos/**").permitAll()
                .requestMatchers("/api/usuarios/**").hasRole("ADMIN")
                .requestMatchers("/api/reportes/**").hasAnyRole("ADMIN", "SUPERVISOR")
                .requestMatchers(HttpMethod.GET, "/api/productos/**").hasAnyRole("ADMIN", "USER", "SUPERVISOR")
                .requestMatchers(HttpMethod.POST, "/api/productos/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/productos/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/productos/**").hasRole("ADMIN")
                .anyRequest().authenticated() // El resto requiere autenticación
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
