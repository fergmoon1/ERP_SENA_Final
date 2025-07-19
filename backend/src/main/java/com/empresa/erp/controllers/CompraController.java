package com.empresa.erp.controllers;

import com.empresa.erp.models.Compra;
import com.empresa.erp.services.CompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/compras")
@CrossOrigin(origins = "*")
public class CompraController {
    @Autowired
    private CompraService compraService;

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