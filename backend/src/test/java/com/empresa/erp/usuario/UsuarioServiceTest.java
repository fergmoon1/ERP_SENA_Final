package com.empresa.erp.usuario;

import com.empresa.erp.models.Usuario;
import com.empresa.erp.repositories.UsuarioRepository;
import com.empresa.erp.services.UsuarioService;
import com.empresa.erp.services.PasswordPolicyService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    @Mock
    private UsuarioRepository repository;

    @Mock
    private PasswordPolicyService passwordPolicyService;

    @InjectMocks
    private UsuarioService service;

    @Test
    void creaUsuario_ok() {
        Usuario u = new Usuario();
        u.setNombre("Admin");
        u.setCorreo("admin@test.com");
        u.setPassword("secreta");

        when(passwordPolicyService.getPolicy()).thenReturn(null); // Sin política de contraseña
        when(repository.save(any(Usuario.class))).thenAnswer(inv -> {
            Usuario saved = inv.getArgument(0);
            saved.setId(1L); // simula que DB asigna un ID
            return saved;
        });

        Usuario creado = service.save(u);

        assertThat(creado.getId()).isEqualTo(1L);
        assertThat(creado.getCorreo()).isEqualTo("admin@test.com");
        verify(repository).save(any(Usuario.class));
    }

    @Test
    void buscaUsuario_existente() {
        Usuario u = new Usuario();
        u.setId(99L);
        u.setNombre("Prueba");
        u.setCorreo("prueba@test.com");

        when(repository.findById(99L)).thenReturn(Optional.of(u));

        Optional<Usuario> encontrado = service.findById(99L);

        assertThat(encontrado).isPresent();
        assertThat(encontrado.get().getNombre()).isEqualTo("Prueba");
        assertThat(encontrado.get().getCorreo()).isEqualTo("prueba@test.com");
    }
}

