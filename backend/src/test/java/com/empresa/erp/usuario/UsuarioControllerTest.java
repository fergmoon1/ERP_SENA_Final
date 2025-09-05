package com.empresa.erp.usuario;

import com.empresa.erp.models.Usuario;
import com.empresa.erp.services.UsuarioService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UsuarioControllerTest {

    @Mock
    private UsuarioService service;

    @InjectMocks
    private com.empresa.erp.controllers.UsuarioController controller;

    @Test
    void listaUsuarios_ok() {
        Usuario u = new Usuario();
        u.setId(1L);
        u.setNombre("Luis");
        u.setCorreo("luis@test.com");

        when(service.findAll()).thenReturn(List.of(u));

        List<Usuario> resultado = controller.getAll();

        assertThat(resultado).isNotEmpty();
        assertThat(resultado.get(0).getNombre()).isEqualTo("Luis");
        assertThat(resultado.get(0).getCorreo()).isEqualTo("luis@test.com");
    }
}

