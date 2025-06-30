package com.empresa.erp.controllers;

import com.empresa.erp.models.ReporteVentasPorClienteDTO;
import com.empresa.erp.models.ReporteProductosMasVendidosDTO;
import com.empresa.erp.models.ReporteStockBajoDTO;
import com.empresa.erp.models.Pedido;
import com.empresa.erp.services.ReporteService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reportes")
@CrossOrigin(origins = "*")
public class ReporteController {
    
    private final ReporteService reporteService;
    
    public ReporteController(ReporteService reporteService) {
        this.reporteService = reporteService;
    }
    
    // ===== REPORTES DE INVENTARIO =====
    
    // GET - Estado actual del inventario
    @GetMapping("/inventario/estado")
    public ResponseEntity<List<Map<String, Object>>> getEstadoInventario() {
        try {
            List<Map<String, Object>> estado = reporteService.getEstadoInventario();
            return ResponseEntity.ok(estado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // GET - Productos con stock bajo
    @GetMapping("/inventario/stock-bajo")
    public ResponseEntity<List<Map<String, Object>>> getProductosStockBajo(
            @RequestParam(defaultValue = "5") int stockMinimo) {
        try {
            List<Map<String, Object>> productos = reporteService.getProductosStockBajo(stockMinimo);
            return ResponseEntity.ok(productos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // GET - Historial de un producto específico
    @GetMapping("/inventario/producto/{productoId}/historial")
    public ResponseEntity<Map<String, Object>> getHistorialProducto(@PathVariable Long productoId) {
        try {
            Map<String, Object> historial = reporteService.getHistorialProducto(productoId);
            return ResponseEntity.ok(historial);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // ===== REPORTES DE VENTAS =====
    
    // GET - Resumen de ventas por período
    @GetMapping("/ventas/resumen")
    public ResponseEntity<Map<String, Object>> getResumenVentas(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fechaInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fechaFin) {
        try {
            Map<String, Object> resumen = reporteService.getResumenVentas(fechaInicio, fechaFin);
            return ResponseEntity.ok(resumen);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // GET - Productos más vendidos
    @GetMapping("/ventas/productos-mas-vendidos")
    public ResponseEntity<List<Map<String, Object>>> getProductosMasVendidos(
            @RequestParam(defaultValue = "10") int limite) {
        try {
            List<Map<String, Object>> productos = reporteService.getProductosMasVendidos(limite);
            return ResponseEntity.ok(productos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // ===== REPORTES DE MOVIMIENTOS =====
    
    // GET - Resumen de movimientos por período
    @GetMapping("/movimientos/resumen")
    public ResponseEntity<Map<String, Object>> getResumenMovimientos(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fechaInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fechaFin) {
        try {
            Map<String, Object> resumen = reporteService.getResumenMovimientos(fechaInicio, fechaFin);
            return ResponseEntity.ok(resumen);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // ===== REPORTES GENERALES =====
    
    // GET - Dashboard con estadísticas generales
    @GetMapping("/dashboard")
    public Map<String, Object> dashboard() {
        return reporteService.getDashboard();
    }
    
    // GET - Reporte completo del sistema
    @GetMapping("/completo")
    public ResponseEntity<Map<String, Object>> getReporteCompleto(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fechaInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fechaFin) {
        try {
            Map<String, Object> reporteCompleto = new java.util.HashMap<>();
            
            // Dashboard general
            reporteCompleto.put("dashboard", reporteService.getDashboard());
            
            // Estado del inventario
            reporteCompleto.put("estadoInventario", reporteService.getEstadoInventario());
            
            // Productos con stock bajo
            reporteCompleto.put("productosStockBajo", reporteService.getProductosStockBajo(5));
            
            // Resumen de ventas
            reporteCompleto.put("resumenVentas", reporteService.getResumenVentas(fechaInicio, fechaFin));
            
            // Productos más vendidos
            reporteCompleto.put("productosMasVendidos", reporteService.getProductosMasVendidos(10));
            
            // Resumen de movimientos
            reporteCompleto.put("resumenMovimientos", reporteService.getResumenMovimientos(fechaInicio, fechaFin));
            
            return ResponseEntity.ok(reporteCompleto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/ventas-por-cliente")
    public List<ReporteVentasPorClienteDTO> ventasPorCliente() {
        return reporteService.obtenerVentasPorCliente();
    }

    @GetMapping("/productos-mas-vendidos")
    public List<ReporteProductosMasVendidosDTO> productosMasVendidos() {
        return reporteService.obtenerProductosMasVendidos();
    }

    @GetMapping("/stock-bajo")
    public List<ReporteStockBajoDTO> productosStockBajo(@RequestParam(defaultValue = "5") int umbral) {
        return reporteService.obtenerProductosStockBajo(umbral);
    }

    @GetMapping("/pedidos-por-fecha")
    public List<Pedido> pedidosPorFecha(
            @RequestParam("desde") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
            @RequestParam("hasta") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta) {
        return reporteService.obtenerPedidosPorFecha(desde, hasta);
    }

    @GetMapping("/ventas-resumen")
    public Map<String, Object> resumenVentas(
            @RequestParam("desde") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
            @RequestParam("hasta") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta) {
        return reporteService.obtenerResumenVentas(desde, hasta);
    }

    // GET - Ingresos por mes
    @GetMapping("/ingresos-por-mes")
    public List<Map<String, Object>> getIngresosPorMes() {
        return reporteService.getIngresosPorMes();
    }
} 