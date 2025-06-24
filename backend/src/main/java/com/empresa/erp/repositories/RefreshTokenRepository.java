package com.empresa.erp.repositories;

import com.empresa.erp.models.RefreshToken;
import com.empresa.erp.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    List<RefreshToken> findByUsuario(Usuario usuario);
    void deleteByUsuario(Usuario usuario);
} 