package com.empresa.erp.producto;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import com.empresa.erp.models.Producto;
import com.empresa.erp.repositories.ProductoRepository;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class ProductoRepositoryTest {

    @Autowired
    private ProductoRepository repository;

    @Test
    void guardaYEncuentraProducto() {
        Producto p = new Producto();
        p.setNombre("Laptop HP");
        p.setDescripcion("Laptop para oficina");
        p.setPrecio(1500.0);
        p.setStock(10);
        p.setImagenUrl("/imagenes/laptop.jpg");

        repository.save(p);

        List<Producto> lista = repository.findAll();
        assertThat(lista).isNotEmpty();
        assertThat(lista.get(0).getNombre()).isEqualTo("Laptop HP");
        assertThat(lista.get(0).getPrecio()).isEqualTo(1500.0);
        assertThat(lista.get(0).getStock()).isEqualTo(10);
    }

    @Test
    void buscaProductoPorId() {
        Producto p = new Producto();
        p.setNombre("Mouse Inalámbrico");
        p.setPrecio(25.99);
        p.setStock(50);

        Producto guardado = repository.save(p);
        
        var encontrado = repository.findById(guardado.getId());
        assertThat(encontrado).isPresent();
        assertThat(encontrado.get().getNombre()).isEqualTo("Mouse Inalámbrico");
        assertThat(encontrado.get().getPrecio()).isEqualTo(25.99);
    }
}
