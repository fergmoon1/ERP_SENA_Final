package com.empresa.erp.services;

import com.empresa.erp.models.MovimientoInventario;
import com.empresa.erp.models.Pedido;
import com.empresa.erp.models.Producto;
import com.empresa.erp.repositories.MovimientoInventarioRepository;
import com.empresa.erp.repositories.PedidoRepository;
import com.empresa.erp.repositories.ProductoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ReporteService {
    
    private final ProductoRepository productoRepository;
    private final PedidoRepository pedidoRepository;
    private final MovimientoInventarioRepository movimientoInventarioRepository;
    
    public ReporteService(ProductoRepository productoRepository,
                         PedidoRepository pedidoRepository,
                         MovimientoInventarioRepository movimientoInventarioRepository) {
        this.productoRepository = productoRepository;
        this.pedidoRepository = pedidoRepository;
        this.movimientoInventarioRepository = movimientoInventarioRepository;
    }
    
    // ===== REPORTES DE INVENTARIO =====
    
    /**
     * Obtiene el estado actual del inventario con información detallada
     */
    public List<Map<String, Object>> getEstadoInventario() {
        List<Producto> productos = productoRepository.findAll();
        List<Map<String, Object>> estadoInventario = new ArrayList<>();
        
        for (Producto producto : productos) {
            Map<String, Object> info = new HashMap<>();
            info.put("id", producto.getId());
            info.put("nombre", producto.getNombre());
            info.put("stockActual", producto.getStock());
            info.put("precio", producto.getPrecio());
            info.put("valorTotal", producto.getStock() * producto.getPrecio());
            
            // Calcular valor total del inventario
            estadoInventario.add(info);
        }
        
        return estadoInventario;
    }
    
    /**
     * Obtiene productos con stock bajo (menos de 5 unidades)
     */
    public List<Map<String, Object>> getProductosStockBajo(int stockMinimo) {
        List<Producto> productos = productoRepository.findAll();
        return productos.stream()
                .filter(p -> p.getStock() <= stockMinimo)
                .map(p -> {
                    Map<String, Object> info = new HashMap<>();
                    info.put("id", p.getId());
                    info.put("nombre", p.getNombre());
                    info.put("stockActual", p.getStock());
                    info.put("stockMinimo", stockMinimo);
                    info.put("necesitaReposicion", stockMinimo - p.getStock());
                    return info;
                })
                .collect(Collectors.toList());
    }
    
    /**
     * Obtiene el historial de movimientos de un producto con resumen
     */
    public Map<String, Object> getHistorialProducto(Long productoId) {
        List<MovimientoInventario> movimientos = movimientoInventarioRepository.findByProductoIdOrderByFechaDesc(productoId);
        Optional<Producto> productoOpt = productoRepository.findById(productoId);
        
        if (productoOpt.isEmpty()) {
            throw new RuntimeException("Producto no encontrado con id: " + productoId);
        }
        
        Producto producto = productoOpt.get();
        
        // Calcular estadísticas
        int totalEntradas = 0;
        int totalSalidas = 0;
        double valorEntradas = 0;
        double valorSalidas = 0;
        
        for (MovimientoInventario movimiento : movimientos) {
            if (movimiento.getTipo() == MovimientoInventario.TipoMovimiento.ENTRADA) {
                totalEntradas += movimiento.getCantidad();
                valorEntradas += movimiento.getCantidad() * producto.getPrecio();
            } else if (movimiento.getTipo() == MovimientoInventario.TipoMovimiento.SALIDA) {
                totalSalidas += movimiento.getCantidad();
                valorSalidas += movimiento.getCantidad() * producto.getPrecio();
            }
        }
        
        Map<String, Object> resultado = new HashMap<>();
        resultado.put("producto", producto);
        resultado.put("movimientos", movimientos);
        resultado.put("totalEntradas", totalEntradas);
        resultado.put("totalSalidas", totalSalidas);
        resultado.put("valorEntradas", valorEntradas);
        resultado.put("valorSalidas", valorSalidas);
        resultado.put("rotacion", totalSalidas > 0 ? (double) totalSalidas / producto.getStock() : 0);
        
        return resultado;
    }
    
    // ===== REPORTES DE VENTAS =====
    
    /**
     * Obtiene resumen de ventas por período
     */
    public Map<String, Object> getResumenVentas(LocalDateTime fechaInicio, LocalDateTime fechaFin) {
        List<Pedido> pedidos = pedidoRepository.findAll();
        
        // Filtrar pedidos por fecha
        List<Pedido> pedidosFiltrados = pedidos.stream()
                .filter(p -> p.getFecha() != null && 
                           p.getFecha().atStartOfDay().isAfter(fechaInicio) && 
                           p.getFecha().atStartOfDay().isBefore(fechaFin))
                .collect(Collectors.toList());
        
        // Calcular estadísticas
        int totalPedidos = pedidosFiltrados.size();
        double totalVentas = pedidosFiltrados.stream().mapToDouble(Pedido::getTotal).sum();
        double promedioVenta = totalPedidos > 0 ? totalVentas / totalPedidos : 0;
        
        // Productos más vendidos
        Map<Long, Integer> productosVendidos = new HashMap<>();
        for (Pedido pedido : pedidosFiltrados) {
            for (var detalle : pedido.getDetalles()) {
                Long productoId = detalle.getProducto().getId();
                productosVendidos.merge(productoId, detalle.getCantidad(), Integer::sum);
            }
        }
        
        Map<String, Object> resultado = new HashMap<>();
        resultado.put("fechaInicio", fechaInicio);
        resultado.put("fechaFin", fechaFin);
        resultado.put("totalPedidos", totalPedidos);
        resultado.put("totalVentas", totalVentas);
        resultado.put("promedioVenta", promedioVenta);
        resultado.put("productosVendidos", productosVendidos);
        resultado.put("pedidos", pedidosFiltrados);
        
        return resultado;
    }
    
    /**
     * Obtiene los productos más vendidos
     */
    public List<Map<String, Object>> getProductosMasVendidos(int limite) {
        List<Pedido> pedidos = pedidoRepository.findAll();
        Map<Long, Integer> productosVendidos = new HashMap<>();
        
        // Contar ventas por producto
        for (Pedido pedido : pedidos) {
            for (var detalle : pedido.getDetalles()) {
                Long productoId = detalle.getProducto().getId();
                productosVendidos.merge(productoId, detalle.getCantidad(), Integer::sum);
            }
        }
        
        // Ordenar por cantidad vendida y obtener los top
        return productosVendidos.entrySet().stream()
                .sorted(Map.Entry.<Long, Integer>comparingByValue().reversed())
                .limit(limite)
                .map(entry -> {
                    Optional<Producto> productoOpt = productoRepository.findById(entry.getKey());
                    Map<String, Object> info = new HashMap<>();
                    if (productoOpt.isPresent()) {
                        Producto producto = productoOpt.get();
                        info.put("id", producto.getId());
                        info.put("nombre", producto.getNombre());
                        info.put("cantidadVendida", entry.getValue());
                        info.put("valorVendido", entry.getValue() * producto.getPrecio());
                    }
                    return info;
                })
                .collect(Collectors.toList());
    }
    
    // ===== REPORTES DE MOVIMIENTOS =====
    
    /**
     * Obtiene resumen de movimientos por tipo
     */
    public Map<String, Object> getResumenMovimientos(LocalDateTime fechaInicio, LocalDateTime fechaFin) {
        List<MovimientoInventario> movimientos = movimientoInventarioRepository.findByFechaBetweenOrderByFechaDesc(fechaInicio, fechaFin);
        
        Map<MovimientoInventario.TipoMovimiento, Integer> resumenPorTipo = new HashMap<>();
        Map<Long, Integer> resumenPorProducto = new HashMap<>();
        
        for (MovimientoInventario movimiento : movimientos) {
            // Contar por tipo
            resumenPorTipo.merge(movimiento.getTipo(), movimiento.getCantidad(), Integer::sum);
            
            // Contar por producto
            Long productoId = movimiento.getProducto().getId();
            resumenPorProducto.merge(productoId, movimiento.getCantidad(), Integer::sum);
        }
        
        Map<String, Object> resultado = new HashMap<>();
        resultado.put("fechaInicio", fechaInicio);
        resultado.put("fechaFin", fechaFin);
        resultado.put("totalMovimientos", movimientos.size());
        resultado.put("resumenPorTipo", resumenPorTipo);
        resultado.put("resumenPorProducto", resumenPorProducto);
        resultado.put("movimientos", movimientos);
        
        return resultado;
    }
    
    // ===== REPORTES GENERALES =====
    
    /**
     * Obtiene dashboard con estadísticas generales
     */
    public Map<String, Object> getDashboard() {
        List<Producto> productos = productoRepository.findAll();
        List<Pedido> pedidos = pedidoRepository.findAll();
        List<MovimientoInventario> movimientos = movimientoInventarioRepository.findAll();
        
        // Estadísticas de productos
        int totalProductos = productos.size();
        int productosSinStock = (int) productos.stream().filter(p -> p.getStock() == 0).count();
        int productosStockBajo = (int) productos.stream().filter(p -> p.getStock() <= 5).count();
        double valorTotalInventario = productos.stream().mapToDouble(p -> p.getStock() * p.getPrecio()).sum();
        
        // Estadísticas de ventas
        int totalPedidos = pedidos.size();
        double totalVentas = pedidos.stream().mapToDouble(Pedido::getTotal).sum();
        double promedioVenta = totalPedidos > 0 ? totalVentas / totalPedidos : 0;
        
        // Estadísticas de movimientos
        int totalMovimientos = movimientos.size();
        int movimientosHoy = (int) movimientos.stream()
                .filter(m -> m.getFecha().toLocalDate().equals(LocalDateTime.now().toLocalDate()))
                .count();
        
        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("productos", Map.of(
            "total", totalProductos,
            "sinStock", productosSinStock,
            "stockBajo", productosStockBajo,
            "valorTotal", valorTotalInventario
        ));
        
        dashboard.put("ventas", Map.of(
            "totalPedidos", totalPedidos,
            "totalVentas", totalVentas,
            "promedioVenta", promedioVenta
        ));
        
        dashboard.put("movimientos", Map.of(
            "total", totalMovimientos,
            "hoy", movimientosHoy
        ));
        
        return dashboard;
    }
} 