package com.empresa.erp.producto;

import com.empresa.erp.models.Producto;
import com.empresa.erp.repositories.ProductoRepository;
import com.empresa.erp.services.ProductoService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductoServiceTest {

    @Mock
    private ProductoRepository repository;

    @InjectMocks
    private ProductoService service;

    @Test
    void creaProducto_ok() {
        Producto p = new Producto();
        p.setNombre("Teclado Mecánico");
        p.setDescripcion("Teclado RGB para gaming");
        p.setPrecio(89.99);
        p.setStock(15);

        when(repository.save(any(Producto.class))).thenAnswer(inv -> {
            Producto saved = inv.getArgument(0);
            saved.setId(1L); // simula que DB asigna un ID
            return saved;
        });

        Producto creado = service.save(p);

        assertThat(creado.getId()).isEqualTo(1L);
        assertThat(creado.getNombre()).isEqualTo("Teclado Mecánico");
        assertThat(creado.getPrecio()).isEqualTo(89.99);
        verify(repository).save(any(Producto.class));
    }

    @Test
    void buscaProducto_existente() {
        Producto p = new Producto();
        p.setId(99L);
        p.setNombre("Monitor 24 pulgadas");
        p.setPrecio(299.99);
        p.setStock(5);

        when(repository.findById(99L)).thenReturn(Optional.of(p));

        Optional<Producto> encontrado = service.findById(99L);

        assertThat(encontrado).isPresent();
        assertThat(encontrado.get().getNombre()).isEqualTo("Monitor 24 pulgadas");
        assertThat(encontrado.get().getPrecio()).isEqualTo(299.99);
    }

    @Test
    void listaTodosLosProductos() {
        Producto p1 = new Producto();
        p1.setId(1L);
        p1.setNombre("Producto 1");
        p1.setPrecio(10.0);

        Producto p2 = new Producto();
        p2.setId(2L);
        p2.setNombre("Producto 2");
        p2.setPrecio(20.0);

        when(repository.findAll()).thenReturn(List.of(p1, p2));

        List<Producto> productos = service.findAll();

        assertThat(productos).hasSize(2);
        assertThat(productos.get(0).getNombre()).isEqualTo("Producto 1");
        assertThat(productos.get(1).getNombre()).isEqualTo("Producto 2");
    }

    @Test
    void eliminaProducto() {
        service.deleteById(1L);
        verify(repository).deleteById(1L);
    }
}
