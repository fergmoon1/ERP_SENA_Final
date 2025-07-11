package com.empresa.erp.services;

import com.empresa.erp.models.Usuario;
import com.empresa.erp.repositories.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.empresa.erp.services.PasswordPolicyService;
import com.empresa.erp.models.PasswordPolicy;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordPolicyService passwordPolicyService;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordPolicyService passwordPolicyService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordPolicyService = passwordPolicyService;
    }

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> findById(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario save(Usuario usuario) {
        // Si es un usuario nuevo, ponerlo activo por defecto
        if (usuario.getId() == null) {
            usuario.setActivo(true);
        }
        // Validar política de contraseña si es nuevo o si cambia la contraseña
        if (usuario.getPassword() != null) {
            PasswordPolicy policy = passwordPolicyService.getPolicy();
            if (policy != null && !validatePasswordPolicy(usuario.getPassword(), policy)) {
                throw new RuntimeException("La contraseña no cumple con la política de seguridad establecida.");
            }
            // Encriptar la contraseña si no está encriptada (opcional: puedes mejorar esta lógica)
            if (!usuario.getPassword().startsWith("$2a$")) { // BCrypt hash
                BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
                usuario.setPassword(encoder.encode(usuario.getPassword()));
            }
        }
        return usuarioRepository.save(usuario);
    }

    public void deleteById(Long id) {
        usuarioRepository.deleteById(id);
    }

    public void updatePassword(Long id, String newPassword) {
        // Validar política de contraseña
        PasswordPolicy policy = passwordPolicyService.getPolicy();
        if (policy != null && !validatePasswordPolicy(newPassword, policy)) {
            throw new RuntimeException("La contraseña no cumple con la política de seguridad establecida.");
        }
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            usuario.setPassword(encoder.encode(newPassword));
            usuarioRepository.save(usuario);
        } else {
            throw new RuntimeException("Usuario no encontrado");
        }
    }

    private boolean validatePasswordPolicy(String password, PasswordPolicy policy) {
        if (password.length() < policy.getMinLength()) return false;
        if (policy.isRequireUpper() && !password.matches(".*[A-Z].*")) return false;
        if (policy.isRequireLower() && !password.matches(".*[a-z].*")) return false;
        if (policy.isRequireNumber() && !password.matches(".*[0-9].*")) return false;
        if (policy.isRequireSymbol() && !password.matches(".*[^a-zA-Z0-9].*")) return false;
        return true;
    }
}
