package com.empresa.erp.usuario;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import com.empresa.erp.models.Usuario;
import com.empresa.erp.repositories.UsuarioRepository;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class UsuarioRepositoryTest {

    @Autowired
    private UsuarioRepository repository;

    @Test
    void guardaYEncuentraUsuario() {
        Usuario u = new Usuario();
        u.setNombre("Luis");
        u.setCorreo("luis@test.com");
        u.setPassword("12345");

        repository.save(u);

        List<Usuario> lista = repository.findAll();
        assertThat(lista).isNotEmpty();
        assertThat(lista.get(0).getCorreo()).isEqualTo("luis@test.com");
    }
}
