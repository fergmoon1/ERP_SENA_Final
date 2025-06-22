package com.empresa.erp.services;

import com.empresa.erp.models.Compra;
import com.empresa.erp.models.DetalleCompra;
import com.empresa.erp.models.MovimientoInventario;
import com.empresa.erp.models.Producto;
import com.empresa.erp.repositories.CompraRepository;
import com.empresa.erp.repositories.ProductoRepository;
import com.empresa.erp.repositories.ProveedorRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CompraService {
    
    private final CompraRepository compraRepository;
    private final ProveedorRepository proveedorRepository;
    private final ProductoRepository productoRepository;
    private final MovimientoInventarioService movimientoInventarioService;
    private final ValidacionService validacionService;
    
    public CompraService(CompraRepository compraRepository,
                        ProveedorRepository proveedorRepository,
                        ProductoRepository productoRepository,
                        MovimientoInventarioService movimientoInventarioService,
                        ValidacionService validacionService) {
        this.compraRepository = compraRepository;
        this.proveedorRepository = proveedorRepository;
        this.productoRepository = productoRepository;
        this.movimientoInventarioService = movimientoInventarioService;
        this.validacionService = validacionService;
    }
    
    public List<Compra> findAll() {
        return compraRepository.findAll();
    }
    
    public Optional<Compra> findById(Long id) {
        return compraRepository.findById(id);
    }
    
    public List<Compra> findByProveedorId(Long proveedorId) {
        return compraRepository.findByProveedorIdOrderByFechaDesc(proveedorId);
    }
    
    public List<Compra> findByEstado(String estado) {
        return compraRepository.findByEstadoOrderByFechaDesc(estado);
    }
    
    public List<Compra> findByFechaBetween(LocalDate fechaInicio, LocalDate fechaFin) {
        return compraRepository.findByFechaBetweenOrderByFechaDesc(fechaInicio, fechaFin);
    }
    
    public List<Compra> findByProveedorIdAndEstado(Long proveedorId, String estado) {
        return compraRepository.findByProveedorIdAndEstadoOrderByFechaDesc(proveedorId, estado);
    }
    
    public List<Compra> findByNumeroFactura(String numeroFactura) {
        return compraRepository.findByNumeroFacturaContainingIgnoreCase(numeroFactura);
    }
    
    public long countByEstado(String estado) {
        return compraRepository.countByEstado(estado);
    }
    
    public long countByProveedorId(Long proveedorId) {
        return compraRepository.countByProveedorId(proveedorId);
    }
    
    public List<Compra> findPendientes() {
        return compraRepository.findByEstadoOrderByFechaAsc("PENDIENTE");
    }
    
    @Transactional
    public Compra save(Compra compra) {
        // Validar datos de la compra
        validacionService.validarCompra(compra);
        
        // Validar que el proveedor existe y está activo
        var proveedor = proveedorRepository.findById(compra.getProveedor().getId())
                .orElseThrow(() -> new RuntimeException("Proveedor no encontrado con id: " + compra.getProveedor().getId()));
        
        if (!proveedor.getActivo()) {
            throw new RuntimeException("No se puede crear una compra con un proveedor inactivo");
        }
        
        compra.setProveedor(proveedor);
        
        // Si es una actualización, manejar la reversión de movimientos si es necesario
        boolean esActualizacion = compra.getId() != null;
        String estadoAnterior = null;
        
        if (esActualizacion) {
            Compra compraExistente = compraRepository.findById(compra.getId())
                    .orElseThrow(() -> new RuntimeException("Compra a actualizar no encontrada con id: " + compra.getId()));
            
            estadoAnterior = compraExistente.getEstado();
            
            // Si la compra estaba RECIBIDA y ahora cambia a PENDIENTE, revertir movimientos
            if ("RECIBIDA".equals(estadoAnterior) && "PENDIENTE".equals(compra.getEstado())) {
                revertirMovimientosCompra(compraExistente);
            }
        }
        
        // Calcular totales
        compra.calcularTotales();
        
        // Guardar la compra
        Compra compraGuardada = compraRepository.save(compra);
        
        // Si la compra está RECIBIDA, generar movimientos de inventario
        if ("RECIBIDA".equals(compra.getEstado())) {
            generarMovimientosInventario(compraGuardada);
        }
        
        // Buscar de nuevo para devolver el objeto completamente poblado
        return compraRepository.findById(compraGuardada.getId())
                .orElseThrow(() -> new RuntimeException("Error al recuperar la compra recién guardada"));
    }
    
    @Transactional
    public void deleteById(Long id) {
        Compra compra = compraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compra a eliminar no encontrada con id: " + id));
        
        // Si la compra estaba RECIBIDA, revertir los movimientos de inventario
        if ("RECIBIDA".equals(compra.getEstado())) {
            revertirMovimientosCompra(compra);
        }
        
        // Eliminar la compra
        compraRepository.delete(compra);
    }
    
    @Transactional
    public Compra recibirCompra(Long id) {
        Compra compra = compraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compra no encontrada con id: " + id));
        
        if (!"PENDIENTE".equals(compra.getEstado())) {
            throw new RuntimeException("Solo se pueden recibir compras en estado PENDIENTE");
        }
        
        compra.setEstado("RECIBIDA");
        Compra compraActualizada = compraRepository.save(compra);
        
        // Generar movimientos de inventario
        generarMovimientosInventario(compraActualizada);
        
        return compraActualizada;
    }
    
    @Transactional
    public Compra cancelarCompra(Long id) {
        Compra compra = compraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compra no encontrada con id: " + id));
        
        if ("RECIBIDA".equals(compra.getEstado())) {
            throw new RuntimeException("No se puede cancelar una compra ya recibida");
        }
        
        compra.setEstado("CANCELADA");
        return compraRepository.save(compra);
    }
    
    // Método privado para generar movimientos de inventario
    private void generarMovimientosInventario(Compra compra) {
        for (DetalleCompra detalle : compra.getDetalles()) {
            Producto producto = detalle.getProducto();
            Integer stockAnterior = producto.getStock();
            
            // Actualizar stock del producto
            producto.setStock(stockAnterior + detalle.getCantidad());
            productoRepository.save(producto);
            
            // Generar movimiento de ENTRADA
            MovimientoInventario movimiento = new MovimientoInventario();
            movimiento.setProducto(producto);
            movimiento.setTipo(MovimientoInventario.TipoMovimiento.ENTRADA);
            movimiento.setCantidad(detalle.getCantidad());
            movimiento.setStockAnterior(stockAnterior);
            movimiento.setStockPosterior(producto.getStock());
            movimiento.setMotivo("Compra #" + compra.getId() + " - Factura: " + compra.getNumeroFactura() + 
                               " - Proveedor: " + compra.getProveedor().getNombre());
            
            movimientoInventarioService.save(movimiento);
        }
    }
    
    // Método privado para revertir movimientos de inventario
    private void revertirMovimientosCompra(Compra compra) {
        for (DetalleCompra detalle : compra.getDetalles()) {
            Producto producto = detalle.getProducto();
            Integer stockAnterior = producto.getStock();
            
            // Revertir stock del producto
            producto.setStock(stockAnterior - detalle.getCantidad());
            productoRepository.save(producto);
            
            // Generar movimiento de SALIDA para revertir
            MovimientoInventario movimiento = new MovimientoInventario();
            movimiento.setProducto(producto);
            movimiento.setTipo(MovimientoInventario.TipoMovimiento.SALIDA);
            movimiento.setCantidad(detalle.getCantidad());
            movimiento.setStockAnterior(stockAnterior);
            movimiento.setStockPosterior(producto.getStock());
            movimiento.setMotivo("Reversión de Compra #" + compra.getId() + " - Factura: " + compra.getNumeroFactura());
            
            movimientoInventarioService.save(movimiento);
        }
    }
} 