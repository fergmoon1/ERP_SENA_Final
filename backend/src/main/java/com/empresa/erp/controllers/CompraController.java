package com.empresa.erp.controllers;

import com.empresa.erp.models.Compra;
import com.empresa.erp.services.CompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/compras")
@CrossOrigin(origins = "*")
public class CompraController {
    @Autowired
    private CompraService compraService;

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Endpoint de compras funcionando correctamente");
    }

    @GetMapping("/diagnostico")
    public ResponseEntity<Map<String, Object>> diagnostico() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Compra> compras = compraService.findAll();
            response.put("totalCompras", compras.size());
            response.put("status", "success");
            response.put("message", "Diagnóstico completado");
            if (!compras.isEmpty()) {
                response.put("primeraCompra", Map.of(
                    "id", compras.get(0).getId(),
                    "fecha", compras.get(0).getFecha(),
                    "total", compras.get(0).getTotal()
                ));
            }
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", e.getMessage());
            response.put("totalCompras", 0);
        }
        return ResponseEntity.ok(response);
    }

    // Endpoint de prueba simple sin relaciones
    @GetMapping("/test-simple")
    public ResponseEntity<Map<String, Object>> testSimple() {
        Map<String, Object> response = new HashMap<>();
        try {
            response.put("status", "success");
            response.put("message", "Endpoint de prueba simple funcionando");
            response.put("timestamp", java.time.LocalDateTime.now().toString());
            response.put("totalCompras", 0);
            response.put("compras", List.of());
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", e.getMessage());
        }
        return ResponseEntity.ok(response);
    }

    // Endpoint completamente público para desarrollo
    @GetMapping("/demo")
    public ResponseEntity<Map<String, Object>> getDemo() {
        Map<String, Object> response = new HashMap<>();
        try {
            // Primero probar la conexión a la base de datos
            List<Compra> compras = compraService.findAll();
            
            // Convertir a una estructura más simple para evitar problemas de serialización
            List<Map<String, Object>> comprasSimplificadas = new ArrayList<>();
            
            for (Compra compra : compras) {
                Map<String, Object> compraMap = new HashMap<>();
                compraMap.put("id", compra.getId());
                compraMap.put("fecha", compra.getFecha() != null ? compra.getFecha().toString() : null);
                compraMap.put("numeroFactura", compra.getNumeroFactura());
                compraMap.put("estado", compra.getEstado());
                compraMap.put("subtotal", compra.getSubtotal());
                compraMap.put("descuentoTotal", compra.getDescuentoTotal());
                compraMap.put("iva", compra.getIva());
                compraMap.put("total", compra.getTotal());
                compraMap.put("observaciones", compra.getObservaciones());
                compraMap.put("usuario", compra.getUsuario());
                
                // Información del proveedor simplificada
                if (compra.getProveedor() != null) {
                    Map<String, Object> proveedorMap = new HashMap<>();
                    proveedorMap.put("id", compra.getProveedor().getId());
                    proveedorMap.put("nombre", compra.getProveedor().getNombre());
                    compraMap.put("proveedor", proveedorMap);
                }
                
                comprasSimplificadas.add(compraMap);
            }
            
            response.put("status", "success");
            response.put("message", "Datos de compras cargados correctamente");
            response.put("compras", comprasSimplificadas);
            response.put("total", compras.size());
            response.put("timestamp", java.time.LocalDateTime.now().toString());
            
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Error al cargar compras: " + e.getMessage());
            response.put("compras", List.of());
            response.put("total", 0);
            response.put("timestamp", java.time.LocalDateTime.now().toString());
            
            // Log del error para debugging
            System.err.println("Error en endpoint /demo: " + e.getMessage());
            e.printStackTrace();
        }
        return ResponseEntity.ok(response);
    }

    // Endpoint temporal para permitir acceso a todos los usuarios autenticados
    @GetMapping("/public")
    public ResponseEntity<Map<String, Object>> getAllPublic() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Compra> compras = compraService.findAll();
            response.put("compras", compras);
            response.put("total", compras.size());
            response.put("status", "success");
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", e.getMessage());
            response.put("compras", List.of());
            response.put("total", 0);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public List<Compra> getAll() {
        return compraService.findAll();
    }

    @GetMapping("/proveedor/{proveedorId}")
    public List<Compra> getByProveedor(@PathVariable Long proveedorId) {
        return compraService.findAll().stream()
            .filter(c -> c.getProveedor() != null && c.getProveedor().getId().equals(proveedorId))
            .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Compra> getById(@PathVariable Long id) {
        Optional<Compra> compra = compraService.findById(id);
        return compra.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Compra create(@RequestBody Compra compra) {
        return compraService.save(compra);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Compra> update(@PathVariable Long id, @RequestBody Compra compra) {
        compra.setId(id);
        Compra updated = compraService.save(compra);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        compraService.deleteById(id);
        return ResponseEntity.ok().build();
    }
} 