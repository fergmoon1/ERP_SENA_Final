package com.empresa.erp.controllers;

import com.empresa.erp.models.Proveedor;
import com.empresa.erp.services.ProveedorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/proveedores")
@CrossOrigin(origins = "*")
public class ProveedorController {
    
    private final ProveedorService proveedorService;
    
    public ProveedorController(ProveedorService proveedorService) {
        this.proveedorService = proveedorService;
    }
    
    // GET /api/proveedores - Obtener todos los proveedores
    @GetMapping
    public ResponseEntity<List<Proveedor>> getAllProveedores() {
        List<Proveedor> proveedores = proveedorService.findAll();
        return ResponseEntity.ok(proveedores);
    }
    
    // GET /api/proveedores/activos - Obtener solo proveedores activos
    @GetMapping("/activos")
    public ResponseEntity<List<Proveedor>> getProveedoresActivos() {
        List<Proveedor> proveedores = proveedorService.findAllActivos();
        return ResponseEntity.ok(proveedores);
    }
    
    // GET /api/proveedores/{id} - Obtener proveedor por ID
    @GetMapping("/{id}")
    public ResponseEntity<Proveedor> getProveedorById(@PathVariable Long id) {
        Optional<Proveedor> proveedor = proveedorService.findById(id);
        return proveedor.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // GET /api/proveedores/tipo/{tipo} - Obtener proveedores por tipo
    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<Proveedor>> getProveedoresByTipo(@PathVariable String tipo) {
        List<Proveedor> proveedores = proveedorService.findByTipo(tipo);
        return ResponseEntity.ok(proveedores);
    }
    
    // GET /api/proveedores/buscar/nombre/{nombre} - Buscar por nombre
    @GetMapping("/buscar/nombre/{nombre}")
    public ResponseEntity<List<Proveedor>> searchByNombre(@PathVariable String nombre) {
        List<Proveedor> proveedores = proveedorService.findByNombreContaining(nombre);
        return ResponseEntity.ok(proveedores);
    }
    
    // GET /api/proveedores/buscar/nit/{nit} - Buscar por NIT
    @GetMapping("/buscar/nit/{nit}")
    public ResponseEntity<Proveedor> getByNit(@PathVariable String nit) {
        Optional<Proveedor> proveedor = proveedorService.findByNit(nit);
        return proveedor.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // GET /api/proveedores/buscar/correo/{correo} - Buscar por correo
    @GetMapping("/buscar/correo/{correo}")
    public ResponseEntity<Proveedor> getByCorreo(@PathVariable String correo) {
        Optional<Proveedor> proveedor = proveedorService.findByCorreo(correo);
        return proveedor.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // GET /api/proveedores/buscar/{termino} - Búsqueda general
    @GetMapping("/buscar/{termino}")
    public ResponseEntity<List<Proveedor>> searchGeneral(@PathVariable String termino) {
        List<Proveedor> proveedores = proveedorService.searchByNombreOrCorreo(termino);
        return ResponseEntity.ok(proveedores);
    }
    
    // GET /api/proveedores/estadisticas/count-activos - Contar proveedores activos
    @GetMapping("/estadisticas/count-activos")
    public ResponseEntity<Long> countActivos() {
        long count = proveedorService.countActivos();
        return ResponseEntity.ok(count);
    }
    
    // GET /api/proveedores/estadisticas/count-tipo/{tipo} - Contar por tipo
    @GetMapping("/estadisticas/count-tipo/{tipo}")
    public ResponseEntity<Long> countByTipo(@PathVariable String tipo) {
        long count = proveedorService.countByTipo(tipo);
        return ResponseEntity.ok(count);
    }
    
    // POST /api/proveedores - Crear nuevo proveedor
    @PostMapping
    public ResponseEntity<Proveedor> createProveedor(@RequestBody Proveedor proveedor) {
        try {
            Proveedor nuevoProveedor = proveedorService.save(proveedor);
            return ResponseEntity.ok(nuevoProveedor);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // PUT /api/proveedores/{id} - Actualizar proveedor existente
    @PutMapping("/{id}")
    public ResponseEntity<Proveedor> updateProveedor(@PathVariable Long id, @RequestBody Proveedor proveedor) {
        try {
            proveedor.setId(id);
            Proveedor proveedorActualizado = proveedorService.save(proveedor);
            return ResponseEntity.ok(proveedorActualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // DELETE /api/proveedores/{id} - Eliminar proveedor (marcar como inactivo)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProveedor(@PathVariable Long id) {
        try {
            proveedorService.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // PUT /api/proveedores/{id}/activar - Activar proveedor
    @PutMapping("/{id}/activar")
    public ResponseEntity<Void> activarProveedor(@PathVariable Long id) {
        try {
            proveedorService.activarProveedor(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // PUT /api/proveedores/{id}/desactivar - Desactivar proveedor
    @PutMapping("/{id}/desactivar")
    public ResponseEntity<Void> desactivarProveedor(@PathVariable Long id) {
        try {
            proveedorService.desactivarProveedor(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
} 