package com.empresa.erp.services;

import com.empresa.erp.models.MovimientoInventario;
import com.empresa.erp.models.Pedido;
import com.empresa.erp.models.Producto;
import com.empresa.erp.models.ReporteVentasPorClienteDTO;
import com.empresa.erp.models.Cliente;
import com.empresa.erp.models.ReporteProductosMasVendidosDTO;
import com.empresa.erp.models.ReporteStockBajoDTO;
import com.empresa.erp.repositories.MovimientoInventarioRepository;
import com.empresa.erp.repositories.PedidoRepository;
import com.empresa.erp.repositories.ProductoRepository;
import com.empresa.erp.repositories.ClienteRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ReporteService {
    
    private final ProductoRepository productoRepository;
    private final PedidoRepository pedidoRepository;
    private final MovimientoInventarioRepository movimientoInventarioRepository;
    private final ClienteRepository clienteRepository;
    
    public ReporteService(ProductoRepository productoRepository,
                         PedidoRepository pedidoRepository,
                         MovimientoInventarioRepository movimientoInventarioRepository,
                         ClienteRepository clienteRepository) {
        this.productoRepository = productoRepository;
        this.pedidoRepository = pedidoRepository;
        this.movimientoInventarioRepository = movimientoInventarioRepository;
        this.clienteRepository = clienteRepository;
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
                        Double precio = producto.getPrecio() != null ? producto.getPrecio() : 0.0;
                        info.put("precio", precio);
                        double ingreso = entry.getValue() * precio;
                        info.put("valorVendido", ingreso);
                        info.put("ingreso", ingreso);
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
        Map<String, Object> dashboard = new HashMap<>();
        // Totales
        int totalClientes = clienteRepository.findAll().size();
        int totalProductos = productoRepository.findAll().size();
        List<Pedido> pedidos = pedidoRepository.findAll();
        int totalPedidos = pedidos.size();
        double totalVentas = pedidos.stream().mapToDouble(p -> p.getTotal() != null ? p.getTotal() : 0.0).sum();
        dashboard.put("totalClientes", totalClientes);
        dashboard.put("totalProductos", totalProductos);
        dashboard.put("totalPedidos", totalPedidos);
        dashboard.put("totalVentas", totalVentas);

        // Producto más vendido
        Map<Long, Integer> ventasPorProducto = new HashMap<>();
        for (Pedido pedido : pedidos) {
            if (pedido.getDetalles() == null) continue;
            for (var detalle : pedido.getDetalles()) {
                if (detalle.getProducto() == null) continue;
                ventasPorProducto.put(
                    detalle.getProducto().getId(),
                    ventasPorProducto.getOrDefault(detalle.getProducto().getId(), 0) + (detalle.getCantidad() != null ? detalle.getCantidad() : 0)
                );
            }
        }
        Producto productoMasVendido = null;
        int maxCantidad = 0;
        for (var entry : ventasPorProducto.entrySet()) {
            if (entry.getValue() > maxCantidad) {
                maxCantidad = entry.getValue();
                productoMasVendido = productoRepository.findById(entry.getKey()).orElse(null);
            }
        }
        if (productoMasVendido != null) {
            Map<String, Object> prod = new HashMap<>();
            prod.put("productoId", productoMasVendido.getId());
            prod.put("nombre", productoMasVendido.getNombre());
            prod.put("cantidadVendida", maxCantidad);
            dashboard.put("productoMasVendido", prod);
        }

        // Cliente con más compras
        Map<Long, Double> comprasPorCliente = new HashMap<>();
        for (Pedido pedido : pedidos) {
            if (pedido.getCliente() == null) continue;
            comprasPorCliente.put(
                pedido.getCliente().getId(),
                comprasPorCliente.getOrDefault(pedido.getCliente().getId(), 0.0) + (pedido.getTotal() != null ? pedido.getTotal() : 0.0)
            );
        }
        Cliente clienteTop = null;
        double maxCompras = 0.0;
        for (var entry : comprasPorCliente.entrySet()) {
            if (entry.getValue() > maxCompras) {
                maxCompras = entry.getValue();
                clienteTop = clienteRepository.findById(entry.getKey()).orElse(null);
            }
        }
        if (clienteTop != null) {
            Map<String, Object> cli = new HashMap<>();
            cli.put("clienteId", clienteTop.getId());
            cli.put("nombre", clienteTop.getNombre());
            cli.put("totalCompras", maxCompras);
            dashboard.put("clienteTop", cli);
        }

        // Agrupar pedidos por estado
        Map<String, Long> agrupados = pedidos.stream()
            .filter(p -> p.getEstado() != null)
            .collect(java.util.stream.Collectors.groupingBy(Pedido::getEstado, java.util.stream.Collectors.counting()));
        java.util.List<java.util.Map<String, Object>> pedidosPorEstado = new java.util.ArrayList<>();
        java.util.Map<String, String> colores = java.util.Map.of(
            "Pendiente", "yellow",
            "Enviado", "blue",
            "Entregado", "green",
            "Cancelado", "red"
        );
        for (java.util.Map.Entry<String, Long> entry : agrupados.entrySet()) {
            java.util.Map<String, Object> obj = new java.util.HashMap<>();
            obj.put("estado", entry.getKey());
            obj.put("cantidad", entry.getValue());
            obj.put("color", colores.getOrDefault(entry.getKey(), "gray"));
            pedidosPorEstado.add(obj);
        }
        dashboard.put("pedidosPorEstado", pedidosPorEstado);

        // === VENTAS DEL MES ===
        java.time.LocalDate primerDiaMes = java.time.LocalDate.now().withDayOfMonth(1);
        java.time.LocalDate ultimoDiaMes = java.time.LocalDate.now().withDayOfMonth(java.time.LocalDate.now().lengthOfMonth());
        double ventasMes = pedidos.stream()
            .filter(p -> p.getFecha() != null && !p.getFecha().isBefore(primerDiaMes) && !p.getFecha().isAfter(ultimoDiaMes))
            .mapToDouble(p -> p.getTotal() != null ? p.getTotal() : 0.0)
            .sum();
        dashboard.put("ventasMes", ventasMes);

        // === PEDIDOS PENDIENTES ===
        long pedidosPendientes = pedidos.stream()
            .filter(p -> "Pendiente".equalsIgnoreCase(p.getEstado()))
            .count();
        dashboard.put("pedidosPendientes", pedidosPendientes);

        // === ALERTAS DE STOCK ===
        long alertasStock = productoRepository.findAll().stream()
            .filter(p -> p.getStock() != null && p.getStock() <= 5)
            .count();
        dashboard.put("alertasStock", alertasStock);

        // === CLIENTES NUEVOS DEL MES ===
        long clientesNuevos = clienteRepository.findAll().stream()
            .filter(c -> c.getFechaCreacion() != null &&
                !c.getFechaCreacion().isBefore(primerDiaMes) && !c.getFechaCreacion().isAfter(ultimoDiaMes))
            .count();
        dashboard.put("clientesNuevos", clientesNuevos);

        return dashboard;
    }

    public List<ReporteVentasPorClienteDTO> obtenerVentasPorCliente() {
        List<Pedido> pedidos = pedidoRepository.findAll();
        Map<Long, ReporteVentasPorClienteDTO> reporte = new HashMap<>();

        for (Pedido pedido : pedidos) {
            Cliente cliente = pedido.getCliente();
            if (cliente == null) continue;
            ReporteVentasPorClienteDTO dto = reporte.get(cliente.getId());
            if (dto == null) {
                dto = new ReporteVentasPorClienteDTO(
                    cliente.getId(),
                    cliente.getNombre(),
                    pedido.getTotal() != null ? pedido.getTotal() : 0.0,
                    1L
                );
            } else {
                dto.setTotalVentas(dto.getTotalVentas() + (pedido.getTotal() != null ? pedido.getTotal() : 0.0));
                dto.setCantidadPedidos(dto.getCantidadPedidos() + 1);
            }
            reporte.put(cliente.getId(), dto);
        }
        return new ArrayList<>(reporte.values());
    }

    public List<ReporteProductosMasVendidosDTO> obtenerProductosMasVendidos() {
        Map<Long, ReporteProductosMasVendidosDTO> reporte = new HashMap<>();
        List<Pedido> pedidos = pedidoRepository.findAll();
        for (Pedido pedido : pedidos) {
            if (pedido.getDetalles() == null) continue;
            for (var detalle : pedido.getDetalles()) {
                if (detalle.getProducto() == null) continue;
                Long productoId = detalle.getProducto().getId();
                String nombre = detalle.getProducto().getNombre();
                Integer cantidad = detalle.getCantidad() != null ? detalle.getCantidad() : 0;
                Double total = detalle.getPrecioUnitario() != null ? detalle.getPrecioUnitario() * cantidad : 0.0;
                ReporteProductosMasVendidosDTO dto = reporte.get(productoId);
                if (dto == null) {
                    dto = new ReporteProductosMasVendidosDTO(productoId, nombre, cantidad, total);
                } else {
                    dto.setCantidadVendida(dto.getCantidadVendida() + cantidad);
                    dto.setTotalVentas(dto.getTotalVentas() + total);
                }
                reporte.put(productoId, dto);
            }
        }
        // Ordenar por cantidad vendida descendente
        return reporte.values().stream()
                .sorted((a, b) -> b.getCantidadVendida().compareTo(a.getCantidadVendida()))
                .toList();
    }

    public List<ReporteStockBajoDTO> obtenerProductosStockBajo(int umbral) {
        List<ReporteStockBajoDTO> resultado = new ArrayList<>();
        List<Producto> productos = productoRepository.findAll();
        for (Producto producto : productos) {
            if (producto.getStock() != null && producto.getStock() <= umbral) {
                resultado.add(new ReporteStockBajoDTO(
                    producto.getId(),
                    producto.getNombre(),
                    producto.getStock()
                ));
            }
        }
        return resultado;
    }

    public List<Pedido> obtenerPedidosPorFecha(LocalDate desde, LocalDate hasta) {
        return pedidoRepository.findAll().stream()
            .filter(p -> p.getFecha() != null && !p.getFecha().isBefore(desde) && !p.getFecha().isAfter(hasta))
            .collect(Collectors.toList());
    }

    public Map<String, Object> obtenerResumenVentas(LocalDate desde, LocalDate hasta) {
        List<Pedido> pedidos = pedidoRepository.findAll().stream()
            .filter(p -> p.getFecha() != null && !p.getFecha().isBefore(desde) && !p.getFecha().isAfter(hasta))
            .collect(Collectors.toList());

        double totalVentas = pedidos.stream().mapToDouble(p -> p.getTotal() != null ? p.getTotal() : 0.0).sum();
        int totalPedidos = pedidos.size();
        double promedioPorPedido = totalPedidos > 0 ? totalVentas / totalPedidos : 0.0;

        Map<String, Object> resumen = new HashMap<>();
        resumen.put("totalPedidos", totalPedidos);
        resumen.put("totalVentas", totalVentas);
        resumen.put("promedioPorPedido", promedioPorPedido);
        return resumen;
    }

    // ===== INGRESOS POR MES =====
    public List<Map<String, Object>> getIngresosPorMes() {
        List<Pedido> pedidos = pedidoRepository.findAll();
        Map<String, Double> ingresosPorMes = new HashMap<>();
        for (Pedido pedido : pedidos) {
            if (pedido.getFecha() == null || pedido.getTotal() == null) continue;
            String mes = pedido.getFecha().getYear() + "-" + String.format("%02d", pedido.getFecha().getMonthValue());
            ingresosPorMes.put(mes, ingresosPorMes.getOrDefault(mes, 0.0) + pedido.getTotal());
        }
        List<Map<String, Object>> resultado = new ArrayList<>();
        ingresosPorMes.entrySet().stream()
            .sorted(Map.Entry.comparingByKey())
            .forEach(entry -> {
                Map<String, Object> obj = new HashMap<>();
                obj.put("mes", entry.getKey());
                obj.put("ingreso", entry.getValue());
                resultado.add(obj);
            });
        return resultado;
    }

    // ===== CLIENTES NUEVOS POR MES =====
    public List<Map<String, Object>> getClientesNuevosPorMes() {
        List<com.empresa.erp.models.Cliente> clientes = clienteRepository.findAll();
        Map<String, Long> clientesPorMes = new java.util.HashMap<>();
        for (com.empresa.erp.models.Cliente cliente : clientes) {
            if (cliente.getFechaCreacion() == null) continue;
            String mes = cliente.getFechaCreacion().getYear() + "-" + String.format("%02d", cliente.getFechaCreacion().getMonthValue());
            clientesPorMes.put(mes, clientesPorMes.getOrDefault(mes, 0L) + 1);
        }
        List<Map<String, Object>> resultado = new java.util.ArrayList<>();
        clientesPorMes.entrySet().stream()
            .sorted(java.util.Map.Entry.comparingByKey())
            .forEach(entry -> {
                Map<String, Object> obj = new java.util.HashMap<>();
                obj.put("mes", entry.getKey());
                obj.put("cantidad", entry.getValue());
                resultado.add(obj);
            });
        return resultado;
    }

    // ===== PEDIDOS POR ESTADO =====
    public List<Map<String, Object>> getPedidosPorEstado() {
        List<Pedido> pedidos = pedidoRepository.findAll();
        Map<String, Long> agrupados = pedidos.stream()
            .filter(p -> p.getEstado() != null)
            .collect(java.util.stream.Collectors.groupingBy(Pedido::getEstado, java.util.stream.Collectors.counting()));
        
        List<Map<String, Object>> pedidosPorEstado = new java.util.ArrayList<>();
        java.util.Map<String, String> colores = java.util.Map.of(
            "Pendiente", "yellow",
            "Enviado", "blue",
            "Entregado", "green",
            "Cancelado", "red"
        );
        
        for (java.util.Map.Entry<String, Long> entry : agrupados.entrySet()) {
            Map<String, Object> obj = new java.util.HashMap<>();
            obj.put("estado", entry.getKey());
            obj.put("cantidad", entry.getValue());
            obj.put("color", colores.getOrDefault(entry.getKey(), "gray"));
            pedidosPorEstado.add(obj);
        }
        
        return pedidosPorEstado;
    }
} 