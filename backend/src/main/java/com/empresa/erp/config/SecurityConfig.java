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
import com.empresa.erp.config.RateLimitFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.core.Authentication;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.ServletException;
import java.io.IOException;
import com.empresa.erp.services.AuthService;
import com.empresa.erp.services.UsuarioService;
import com.empresa.erp.models.Usuario;
import java.util.Map;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpSession;
import org.springframework.core.annotation.Order;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.access.AccessDeniedHandlerImpl;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.http.HttpStatus;
import jakarta.servlet.http.Cookie;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private RateLimitFilter rateLimitFilter;

    @Autowired
    private AuthService authService;

    @Autowired
    private UsuarioService usuarioService;

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
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/").permitAll()
                .requestMatchers("/api").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/oauth2/**").permitAll()
                .requestMatchers("/login/oauth2/code/**").permitAll()
                .requestMatchers("/oauth/**").permitAll()
                .requestMatchers("/api/test/**").permitAll()
                .requestMatchers("/api/files/**").permitAll() // <-- permite imágenes públicas
                .requestMatchers("/api/compras/test").permitAll() // <-- endpoint de prueba público
                .requestMatchers("/api/compras/test-simple").permitAll() // <-- endpoint de prueba simple
                .requestMatchers("/api/compras/diagnostico").permitAll() // <-- endpoint de diagnóstico público
                .requestMatchers("/api/compras/demo").permitAll() // <-- endpoint demo completamente público
                .requestMatchers("/api/compras/public").authenticated() // <-- endpoint público temporal
                .requestMatchers("/api/usuarios/**").hasRole("ADMIN")
                .requestMatchers("/api/reportes/**").hasAnyRole("ADMIN", "SUPERVISOR")
                .requestMatchers(HttpMethod.GET, "/api/productos/**").hasAnyRole("ADMIN", "SUPERVISOR", "USER")
                .requestMatchers(HttpMethod.POST, "/api/productos/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/productos/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/productos/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/clientes/**").hasAnyRole("ADMIN", "SUPERVISOR", "USER")
                .requestMatchers(HttpMethod.POST, "/api/clientes/**").hasAnyRole("ADMIN", "SUPERVISOR")
                .requestMatchers(HttpMethod.PUT, "/api/clientes/**").hasAnyRole("ADMIN", "SUPERVISOR")
                .requestMatchers(HttpMethod.DELETE, "/api/clientes/**").hasAnyRole("ADMIN", "SUPERVISOR")
                .requestMatchers(HttpMethod.GET, "/api/pedidos/**").hasAnyRole("ADMIN", "SUPERVISOR", "USER")
                .requestMatchers(HttpMethod.POST, "/api/pedidos/**").hasAnyRole("ADMIN", "SUPERVISOR")
                .requestMatchers(HttpMethod.PUT, "/api/pedidos/**").hasAnyRole("ADMIN", "SUPERVISOR")
                .requestMatchers(HttpMethod.DELETE, "/api/pedidos/**").hasAnyRole("ADMIN", "SUPERVISOR")
                .requestMatchers(HttpMethod.GET, "/api/proveedores/**").hasAnyRole("ADMIN", "SUPERVISOR")
                .requestMatchers(HttpMethod.POST, "/api/proveedores/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/proveedores/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/proveedores/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/compras/**").hasAnyRole("ADMIN", "SUPERVISOR")
                .requestMatchers(HttpMethod.POST, "/api/compras/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/compras/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/compras/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/movimientos-inventario/**").hasAnyRole("ADMIN", "SUPERVISOR")
                .requestMatchers(HttpMethod.POST, "/api/movimientos-inventario/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/movimientos-inventario/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/movimientos-inventario/**").hasRole("ADMIN")
                .requestMatchers("/api/auth/login", "/api/auth/refresh", "/api/auth/verify-recaptcha").permitAll()
                .requestMatchers("/api/auth/me").authenticated()
                .anyRequest().authenticated()
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessHandler((request, response, authentication) -> {
                    // Invalida la sesión
                    if (request.getSession(false) != null) {
                        request.getSession(false).invalidate();
                    }
                    // Borra la cookie JSESSIONID
                    jakarta.servlet.http.Cookie cookie = new jakarta.servlet.http.Cookie("JSESSIONID", null);
                    cookie.setPath("/");
                    cookie.setHttpOnly(true);
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);

                    response.setStatus(HttpStatus.OK.value());
                    response.setContentType("application/json");
                    response.getWriter().write("{\"message\": \"Logout exitoso\"}");
                })
            )
            .oauth2Login(oauth2 -> oauth2
                .successHandler(oAuth2SuccessHandler())
                .failureUrl("http://localhost:3001/login?error=oauth_failed")
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(rateLimitFilter, JwtAuthenticationFilter.class)
            .exceptionHandling(exception -> exception
                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                .accessDeniedHandler((request, response, accessDeniedException) -> {
                    response.setStatus(HttpStatus.FORBIDDEN.value());
                    response.setContentType("application/json");
                    response.getWriter().write("{\"error\": \"Forbidden\"}");
                })
            );
        return http.build();
    }

    @Bean
    public SecurityFilterChain oauth2FilterChain(HttpSecurity http) throws Exception {
        http
            .securityMatcher("/oauth2/**", "/login/oauth2/**")
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()
            )
            .oauth2Login(oauth2 -> oauth2
                .successHandler(oAuth2SuccessHandler())
                .failureUrl("http://localhost:3001/login?error=oauth_failed")
            );
        
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:3001"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public AuthenticationSuccessHandler oAuth2SuccessHandler() {
        return new AuthenticationSuccessHandler() {
            @Override
            public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
                System.out.println("=== OAuth2 Success Handler Called ===");
                System.out.println("Authentication type: " + authentication.getClass().getSimpleName());
                
                if (authentication instanceof OAuth2AuthenticationToken oauthToken) {
                    OAuth2User oauth2User = oauthToken.getPrincipal();
                    String email = oauth2User.getAttribute("email");
                    String nombre = oauth2User.getAttribute("name");
                    
                    System.out.println("OAuth2 User Email: " + email);
                    System.out.println("OAuth2 User Name: " + nombre);
                    
                    Usuario usuario = usuarioService.findAll().stream()
                        .filter(u -> u.getCorreo().equalsIgnoreCase(email))
                        .findFirst()
                        .orElseGet(() -> {
                            System.out.println("Creating new user for email: " + email);
                            Usuario nuevo = new Usuario();
                            nuevo.setCorreo(email);
                            nuevo.setNombre(nombre);
                            nuevo.setRol("USER");
                            nuevo.setPassword("");
                            return usuarioService.save(nuevo);
                        });
                    
                    System.out.println("User found/created: " + usuario.getCorreo() + " with role: " + usuario.getRol());
                    
                    Map<String, String> tokens = authService.generateTokens(usuario);
                    String jwt = tokens.get("token");
                    String refreshToken = tokens.get("refreshToken");
                    
                    System.out.println("JWT generated: " + (jwt != null ? "YES" : "NO"));
                    System.out.println("RefreshToken generated: " + (refreshToken != null ? "YES" : "NO"));
                    
                    String redirectUrl = "http://localhost:3001/dashboard?token=" + jwt + "&refreshToken=" + refreshToken;
                    System.out.println("Redirecting to: " + redirectUrl);
                    
                    response.sendRedirect(redirectUrl);
                } else {
                    System.out.println("Authentication is not OAuth2AuthenticationToken: " + authentication.getClass().getName());
                    response.sendRedirect("http://localhost:3001/login?error=oauth_failed");
                }
            }
        };
    }
}
