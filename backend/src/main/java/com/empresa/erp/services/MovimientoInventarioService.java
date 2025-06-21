package com.empresa.erp.services;

import com.empresa.erp.models.MovimientoInventario;
import com.empresa.erp.models.Producto;
import com.empresa.erp.models.Usuario;
import com.empresa.erp.repositories.MovimientoInventarioRepository;
import com.empresa.erp.repositories.ProductoRepository;
import com.empresa.erp.repositories.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MovimientoInventarioService {
    
    private final MovimientoInventarioRepository movimientoInventarioRepository;
    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;
    
    public MovimientoInventarioService(MovimientoInventarioRepository movimientoInventarioRepository,
                                      ProductoRepository productoRepository,
                                      UsuarioRepository usuarioRepository) {
        this.movimientoInventarioRepository = movimientoInventarioRepository;
        this.productoRepository = productoRepository;
        this.usuarioRepository = usuarioRepository;
    }
    
    public List<MovimientoInventario> findAll() {
        return movimientoInventarioRepository.findAll();
    }
    
    public Optional<MovimientoInventario> findById(Long id) {
        return movimientoInventarioRepository.findById(id);
    }
    
    public List<MovimientoInventario> findByProductoId(Long productoId) {
        return movimientoInventarioRepository.findByProductoIdOrderByFechaDesc(productoId);
    }
    
    public List<MovimientoInventario> findByTipo(MovimientoInventario.TipoMovimiento tipo) {
        return movimientoInventarioRepository.findByTipoOrderByFechaDesc(tipo);
    }
    
    public List<MovimientoInventario> findByFechaBetween(LocalDateTime fechaInicio, LocalDateTime fechaFin) {
        return movimientoInventarioRepository.findByFechaBetweenOrderByFechaDesc(fechaInicio, fechaFin);
    }
    
    public List<MovimientoInventario> findByProductoIdAndFechaBetween(Long productoId, LocalDateTime fechaInicio, LocalDateTime fechaFin) {
        return movimientoInventarioRepository.findByProductoIdAndFechaBetweenOrderByFechaDesc(productoId, fechaInicio, fechaFin);
    }
    
    @Transactional
    public MovimientoInventario save(MovimientoInventario movimiento) {
        // Validar que el producto existe
        Producto producto = productoRepository.findById(movimiento.getProducto().getId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + movimiento.getProducto().getId()));
        
        // Validar que el usuario existe (si se proporciona)
        Usuario usuario = null;
        if (movimiento.getUsuario() != null && movimiento.getUsuario().getId() != null) {
            usuario = usuarioRepository.findById(movimiento.getUsuario().getId())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + movimiento.getUsuario().getId()));
        }
        
        // Obtener stock actual del producto
        Integer stockActual = producto.getStock();
        movimiento.setStockAnterior(stockActual);
        
        // Calcular nuevo stock según el tipo de movimiento
        Integer nuevoStock;
        switch (movimiento.getTipo()) {
            case ENTRADA:
                nuevoStock = stockActual + movimiento.getCantidad();
                break;
            case SALIDA:
                if (stockActual < movimiento.getCantidad()) {
                    throw new RuntimeException("Stock insuficiente para el producto: " + producto.getNombre() + 
                                             ". Stock actual: " + stockActual + ", Cantidad solicitada: " + movimiento.getCantidad());
                }
                nuevoStock = stockActual - movimiento.getCantidad();
                break;
            case AJUSTE:
                nuevoStock = movimiento.getCantidad(); // En ajuste, la cantidad es el nuevo stock
                break;
            default:
                throw new RuntimeException("Tipo de movimiento no válido: " + movimiento.getTipo());
        }
        
        // Validar que el stock no sea negativo
        if (nuevoStock < 0) {
            throw new RuntimeException("El stock no puede ser negativo. Stock resultante: " + nuevoStock);
        }
        
        // Actualizar stock del producto
        producto.setStock(nuevoStock);
        productoRepository.save(producto);
        
        // Configurar el movimiento
        movimiento.setStockPosterior(nuevoStock);
        movimiento.setProducto(producto);
        movimiento.setUsuario(usuario);
        movimiento.setFecha(LocalDateTime.now());
        
        // Guardar el movimiento
        MovimientoInventario movimientoGuardado = movimientoInventarioRepository.save(movimiento);
        
        // Buscar de nuevo para devolver el objeto completamente poblado
        return movimientoInventarioRepository.findById(movimientoGuardado.getId())
                .orElseThrow(() -> new RuntimeException("Error al recuperar el movimiento recién guardado"));
    }
    
    @Transactional
    public void deleteById(Long id) {
        MovimientoInventario movimiento = movimientoInventarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movimiento a eliminar no encontrado con id: " + id));
        
        // Revertir el stock del producto
        Producto producto = movimiento.getProducto();
        Integer stockActual = producto.getStock();
        
        // Calcular stock anterior según el tipo de movimiento
        Integer stockAnterior;
        switch (movimiento.getTipo()) {
            case ENTRADA:
                stockAnterior = stockActual - movimiento.getCantidad();
                break;
            case SALIDA:
                stockAnterior = stockActual + movimiento.getCantidad();
                break;
            case AJUSTE:
                stockAnterior = movimiento.getStockAnterior();
                break;
            default:
                throw new RuntimeException("Tipo de movimiento no válido: " + movimiento.getTipo());
        }
        
        // Validar que el stock anterior no sea negativo
        if (stockAnterior < 0) {
            throw new RuntimeException("No se puede eliminar el movimiento. El stock anterior sería negativo: " + stockAnterior);
        }
        
        // Restaurar stock anterior
        producto.setStock(stockAnterior);
        productoRepository.save(producto);
        
        // Eliminar el movimiento
        movimientoInventarioRepository.delete(movimiento);
    }
    
    // Método para obtener el historial de movimientos de un producto
    public List<MovimientoInventario> getHistorialProducto(Long productoId) {
        return movimientoInventarioRepository.findByProductoIdOrderByFechaDesc(productoId);
    }
    
    // Método para obtener el último movimiento de un producto
    public Optional<MovimientoInventario> getUltimoMovimientoProducto(Long productoId) {
        return Optional.ofNullable(movimientoInventarioRepository.findFirstByProductoIdOrderByFechaDesc(productoId));
    }
} 