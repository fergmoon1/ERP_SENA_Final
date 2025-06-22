package com.empresa.erp.controllers;

import com.empresa.erp.models.Compra;
import com.empresa.erp.services.CompraService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/compras")
@CrossOrigin(origins = "*")
public class CompraController {
    
    private final CompraService compraService;
    
    public CompraController(CompraService compraService) {
        this.compraService = compraService;
    }
    
    // GET /api/compras - Obtener todas las compras
    @GetMapping
    public ResponseEntity<List<Compra>> getAllCompras() {
        List<Compra> compras = compraService.findAll();
        return ResponseEntity.ok(compras);
    }
    
    // GET /api/compras/{id} - Obtener compra por ID
    @GetMapping("/{id}")
    public ResponseEntity<Compra> getCompraById(@PathVariable Long id) {
        Optional<Compra> compra = compraService.findById(id);
        return compra.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // GET /api/compras/proveedor/{proveedorId} - Obtener compras por proveedor
    @GetMapping("/proveedor/{proveedorId}")
    public ResponseEntity<List<Compra>> getComprasByProveedor(@PathVariable Long proveedorId) {
        List<Compra> compras = compraService.findByProveedorId(proveedorId);
        return ResponseEntity.ok(compras);
    }
    
    // GET /api/compras/estado/{estado} - Obtener compras por estado
    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Compra>> getComprasByEstado(@PathVariable String estado) {
        List<Compra> compras = compraService.findByEstado(estado);
        return ResponseEntity.ok(compras);
    }
    
    // GET /api/compras/pendientes - Obtener compras pendientes
    @GetMapping("/pendientes")
    public ResponseEntity<List<Compra>> getComprasPendientes() {
        List<Compra> compras = compraService.findPendientes();
        return ResponseEntity.ok(compras);
    }
    
    // GET /api/compras/fecha - Obtener compras por rango de fechas
    @GetMapping("/fecha")
    public ResponseEntity<List<Compra>> getComprasByFecha(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {
        List<Compra> compras = compraService.findByFechaBetween(fechaInicio, fechaFin);
        return ResponseEntity.ok(compras);
    }
    
    // GET /api/compras/proveedor/{proveedorId}/estado/{estado} - Obtener compras por proveedor y estado
    @GetMapping("/proveedor/{proveedorId}/estado/{estado}")
    public ResponseEntity<List<Compra>> getComprasByProveedorAndEstado(
            @PathVariable Long proveedorId, @PathVariable String estado) {
        List<Compra> compras = compraService.findByProveedorIdAndEstado(proveedorId, estado);
        return ResponseEntity.ok(compras);
    }
    
    // GET /api/compras/buscar/factura/{numeroFactura} - Buscar por número de factura
    @GetMapping("/buscar/factura/{numeroFactura}")
    public ResponseEntity<List<Compra>> searchByNumeroFactura(@PathVariable String numeroFactura) {
        List<Compra> compras = compraService.findByNumeroFactura(numeroFactura);
        return ResponseEntity.ok(compras);
    }
    
    // GET /api/compras/estadisticas/count-estado/{estado} - Contar compras por estado
    @GetMapping("/estadisticas/count-estado/{estado}")
    public ResponseEntity<Long> countByEstado(@PathVariable String estado) {
        long count = compraService.countByEstado(estado);
        return ResponseEntity.ok(count);
    }
    
    // GET /api/compras/estadisticas/count-proveedor/{proveedorId} - Contar compras por proveedor
    @GetMapping("/estadisticas/count-proveedor/{proveedorId}")
    public ResponseEntity<Long> countByProveedor(@PathVariable Long proveedorId) {
        long count = compraService.countByProveedorId(proveedorId);
        return ResponseEntity.ok(count);
    }
    
    // POST /api/compras - Crear nueva compra
    @PostMapping
    public ResponseEntity<Compra> createCompra(@RequestBody Compra compra) {
        try {
            // Establecer estado inicial como PENDIENTE si no se especifica
            if (compra.getEstado() == null || compra.getEstado().trim().isEmpty()) {
                compra.setEstado("PENDIENTE");
            }
            
            Compra nuevaCompra = compraService.save(compra);
            return ResponseEntity.ok(nuevaCompra);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // PUT /api/compras/{id} - Actualizar compra existente
    @PutMapping("/{id}")
    public ResponseEntity<Compra> updateCompra(@PathVariable Long id, @RequestBody Compra compra) {
        try {
            compra.setId(id);
            Compra compraActualizada = compraService.save(compra);
            return ResponseEntity.ok(compraActualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // DELETE /api/compras/{id} - Eliminar compra
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompra(@PathVariable Long id) {
        try {
            compraService.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // PUT /api/compras/{id}/recibir - Recibir compra (cambiar estado a RECIBIDA y actualizar inventario)
    @PutMapping("/{id}/recibir")
    public ResponseEntity<Compra> recibirCompra(@PathVariable Long id) {
        try {
            Compra compraRecibida = compraService.recibirCompra(id);
            return ResponseEntity.ok(compraRecibida);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // PUT /api/compras/{id}/cancelar - Cancelar compra
    @PutMapping("/{id}/cancelar")
    public ResponseEntity<Compra> cancelarCompra(@PathVariable Long id) {
        try {
            Compra compraCancelada = compraService.cancelarCompra(id);
            return ResponseEntity.ok(compraCancelada);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
} 