package com.empresa.erp.controllers;

import com.empresa.erp.models.MovimientoInventario;
import com.empresa.erp.services.MovimientoInventarioService;
import com.empresa.erp.services.AuditLogService;
import com.empresa.erp.models.AuditLog;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.servlet.http.HttpServletRequest;
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
    @Autowired
    private AuditLogService auditLogService;
    
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
    public MovimientoInventario create(@RequestBody MovimientoInventario movimiento, HttpServletRequest request) {
        MovimientoInventario nuevo = movimientoInventarioService.save(movimiento);
        auditLogService.save(new AuditLog(
            "sistema",
            "CREAR", "Inventario",
            "Movimiento creado (ID: " + nuevo.getId() + ") desde IP: " + request.getRemoteAddr(),
            "info"
        ));
        return nuevo;
    }
    
    // PUT - Actualizar un movimiento existente
    @PutMapping("/{id}")
    public MovimientoInventario update(@PathVariable Long id, @RequestBody MovimientoInventario movimiento, HttpServletRequest request) {
        movimiento.setId(id);
        MovimientoInventario actualizado = movimientoInventarioService.save(movimiento);
        auditLogService.save(new AuditLog(
            "sistema",
            "EDITAR", "Inventario",
            "Movimiento editado (ID: " + actualizado.getId() + ") desde IP: " + request.getRemoteAddr(),
            "info"
        ));
        return actualizado;
    }
    
    // DELETE - Eliminar un movimiento
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, HttpServletRequest request) {
        movimientoInventarioService.deleteById(id);
        auditLogService.save(new AuditLog(
            "sistema",
            "ELIMINAR", "Inventario",
            "Movimiento eliminado (ID: " + id + ") desde IP: " + request.getRemoteAddr(),
            "warning"
        ));
    }
} 