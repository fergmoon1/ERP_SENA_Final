package com.empresa.erp.producto;

import com.empresa.erp.models.Producto;
import com.empresa.erp.services.ProductoService;
import com.empresa.erp.services.AuditLogService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductoControllerTest {

    @Mock
    private ProductoService service;

    @Mock
    private AuditLogService auditLogService;

    @Mock
    private HttpServletRequest request;

    private com.empresa.erp.controllers.ProductoController controller;

    @Test
    void listaProductos_ok() {
        controller = new com.empresa.erp.controllers.ProductoController(service);
        // Inyectar manualmente el AuditLogService usando reflection
        try {
            java.lang.reflect.Field field = controller.getClass().getDeclaredField("auditLogService");
            field.setAccessible(true);
            field.set(controller, auditLogService);
        } catch (Exception e) {
            // Si falla la inyección, continuar sin auditoría
        }

        Producto p = new Producto();
        p.setId(1L);
        p.setNombre("Laptop Gaming");
        p.setPrecio(1200.0);
        p.setStock(8);

        when(service.findAll()).thenReturn(List.of(p));

        List<Producto> resultado = controller.getAll();

        assertThat(resultado).isNotEmpty();
        assertThat(resultado.get(0).getNombre()).isEqualTo("Laptop Gaming");
        assertThat(resultado.get(0).getPrecio()).isEqualTo(1200.0);
    }

    @Test
    void buscaProductoPorId_ok() {
        controller = new com.empresa.erp.controllers.ProductoController(service);
        try {
            java.lang.reflect.Field field = controller.getClass().getDeclaredField("auditLogService");
            field.setAccessible(true);
            field.set(controller, auditLogService);
        } catch (Exception e) {}

        Producto p = new Producto();
        p.setId(5L);
        p.setNombre("Tablet Samsung");
        p.setPrecio(450.0);

        when(service.findById(5L)).thenReturn(Optional.of(p));

        Optional<Producto> resultado = controller.getById(5L);

        assertThat(resultado).isPresent();
        assertThat(resultado.get().getNombre()).isEqualTo("Tablet Samsung");
        assertThat(resultado.get().getPrecio()).isEqualTo(450.0);
    }

    @Test
    void creaProducto_ok() {
        controller = new com.empresa.erp.controllers.ProductoController(service);
        try {
            java.lang.reflect.Field field = controller.getClass().getDeclaredField("auditLogService");
            field.setAccessible(true);
            field.set(controller, auditLogService);
        } catch (Exception e) {}

        Producto p = new Producto();
        p.setNombre("Smartphone");
        p.setDescripcion("Teléfono inteligente");
        p.setPrecio(800.0);
        p.setStock(20);

        Producto creado = new Producto();
        creado.setId(1L);
        creado.setNombre("Smartphone");
        creado.setDescripcion("Teléfono inteligente");
        creado.setPrecio(800.0);
        creado.setStock(20);

        when(service.save(any(Producto.class))).thenReturn(creado);
        when(request.getRemoteAddr()).thenReturn("127.0.0.1");

        Producto resultado = controller.create(p, request);

        assertThat(resultado.getId()).isEqualTo(1L);
        assertThat(resultado.getNombre()).isEqualTo("Smartphone");
        verify(service).save(any(Producto.class));
        verify(auditLogService).save(any());
    }

    @Test
    void actualizaProducto_ok() {
        controller = new com.empresa.erp.controllers.ProductoController(service);
        try {
            java.lang.reflect.Field field = controller.getClass().getDeclaredField("auditLogService");
            field.setAccessible(true);
            field.set(controller, auditLogService);
        } catch (Exception e) {}

        Producto p = new Producto();
        p.setNombre("Laptop Actualizada");
        p.setPrecio(1500.0);

        Producto actualizado = new Producto();
        actualizado.setId(2L);
        actualizado.setNombre("Laptop Actualizada");
        actualizado.setPrecio(1500.0);

        when(service.save(any(Producto.class))).thenReturn(actualizado);
        when(request.getRemoteAddr()).thenReturn("127.0.0.1");

        Producto resultado = controller.update(2L, p, request);

        assertThat(resultado.getId()).isEqualTo(2L);
        assertThat(resultado.getNombre()).isEqualTo("Laptop Actualizada");
        verify(service).save(any(Producto.class));
        verify(auditLogService).save(any());
    }

    @Test
    void eliminaProducto_ok() {
        controller = new com.empresa.erp.controllers.ProductoController(service);
        try {
            java.lang.reflect.Field field = controller.getClass().getDeclaredField("auditLogService");
            field.setAccessible(true);
            field.set(controller, auditLogService);
        } catch (Exception e) {}

        Producto p = new Producto();
        p.setId(3L);
        p.setNombre("Producto a eliminar");

        when(service.findById(3L)).thenReturn(Optional.of(p));
        when(request.getRemoteAddr()).thenReturn("127.0.0.1");

        controller.delete(3L, request);

        verify(service).deleteById(3L);
        verify(auditLogService).save(any());
    }
}
