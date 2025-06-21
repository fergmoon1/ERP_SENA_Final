package com.empresa.erp.controllers;

import com.empresa.erp.models.MovimientoInventario;
import com.empresa.erp.services.MovimientoInventarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/movimientos-inventario")
@CrossOrigin(origins = "*")
public class MovimientoInventarioController {
    
    private final MovimientoInventarioService movimientoInventarioService;
    
    public MovimientoInventarioController(MovimientoInventarioService movimientoInventarioService) {
        this.movimientoInventarioService = movimientoInventarioService;
    }
    
    // GET - Obtener todos los movimientos
    @GetMapping
    public ResponseEntity<List<MovimientoInventario>> getAllMovimientos() {
        List<MovimientoInventario> movimientos = movimientoInventarioService.findAll();
        return ResponseEntity.ok(movimientos);
    }
    
    // GET - Obtener un movimiento por ID
    @GetMapping("/{id}")
    public ResponseEntity<MovimientoInventario> getMovimientoById(@PathVariable Long id) {
        Optional<MovimientoInventario> movimiento = movimientoInventarioService.findById(id);
        return movimiento.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // GET - Obtener movimientos por producto
    @GetMapping("/producto/{productoId}")
    public ResponseEntity<List<MovimientoInventario>> getMovimientosByProducto(@PathVariable Long productoId) {
        List<MovimientoInventario> movimientos = movimientoInventarioService.findByProductoId(productoId);
        return ResponseEntity.ok(movimientos);
    }
    
    // GET - Obtener movimientos por tipo
    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<MovimientoInventario>> getMovimientosByTipo(@PathVariable MovimientoInventario.TipoMovimiento tipo) {
        List<MovimientoInventario> movimientos = movimientoInventarioService.findByTipo(tipo);
        return ResponseEntity.ok(movimientos);
    }
    
    // GET - Obtener movimientos por rango de fechas
    @GetMapping("/fechas")
    public ResponseEntity<List<MovimientoInventario>> getMovimientosByFechaRange(
            @RequestParam LocalDateTime fechaInicio,
            @RequestParam LocalDateTime fechaFin) {
        List<MovimientoInventario> movimientos = movimientoInventarioService.findByFechaBetween(fechaInicio, fechaFin);
        return ResponseEntity.ok(movimientos);
    }
    
    // GET - Obtener movimientos por producto y rango de fechas
    @GetMapping("/producto/{productoId}/fechas")
    public ResponseEntity<List<MovimientoInventario>> getMovimientosByProductoAndFechaRange(
            @PathVariable Long productoId,
            @RequestParam LocalDateTime fechaInicio,
            @RequestParam LocalDateTime fechaFin) {
        List<MovimientoInventario> movimientos = movimientoInventarioService.findByProductoIdAndFechaBetween(productoId, fechaInicio, fechaFin);
        return ResponseEntity.ok(movimientos);
    }
    
    // GET - Obtener historial de un producto
    @GetMapping("/producto/{productoId}/historial")
    public ResponseEntity<List<MovimientoInventario>> getHistorialProducto(@PathVariable Long productoId) {
        List<MovimientoInventario> historial = movimientoInventarioService.getHistorialProducto(productoId);
        return ResponseEntity.ok(historial);
    }
    
    // GET - Obtener último movimiento de un producto
    @GetMapping("/producto/{productoId}/ultimo")
    public ResponseEntity<MovimientoInventario> getUltimoMovimientoProducto(@PathVariable Long productoId) {
        Optional<MovimientoInventario> ultimoMovimiento = movimientoInventarioService.getUltimoMovimientoProducto(productoId);
        return ultimoMovimiento.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // POST - Crear un nuevo movimiento
    @PostMapping
    public ResponseEntity<MovimientoInventario> createMovimiento(@RequestBody MovimientoInventario movimiento) {
        try {
            MovimientoInventario nuevoMovimiento = movimientoInventarioService.save(movimiento);
            return ResponseEntity.ok(nuevoMovimiento);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // PUT - Actualizar un movimiento existente
    @PutMapping("/{id}")
    public ResponseEntity<MovimientoInventario> updateMovimiento(@PathVariable Long id, @RequestBody MovimientoInventario movimiento) {
        try {
            movimiento.setId(id);
            MovimientoInventario movimientoActualizado = movimientoInventarioService.save(movimiento);
            return ResponseEntity.ok(movimientoActualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // DELETE - Eliminar un movimiento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovimiento(@PathVariable Long id) {
        try {
            movimientoInventarioService.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
} 