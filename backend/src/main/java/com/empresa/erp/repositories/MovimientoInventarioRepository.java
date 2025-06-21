package com.empresa.erp.repositories;

import com.empresa.erp.models.MovimientoInventario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MovimientoInventarioRepository extends JpaRepository<MovimientoInventario, Long> {
    
    // Buscar movimientos por producto
    List<MovimientoInventario> findByProductoIdOrderByFechaDesc(Long productoId);
    
    // Buscar movimientos por tipo
    List<MovimientoInventario> findByTipoOrderByFechaDesc(MovimientoInventario.TipoMovimiento tipo);
    
    // Buscar movimientos por rango de fechas
    List<MovimientoInventario> findByFechaBetweenOrderByFechaDesc(LocalDateTime fechaInicio, LocalDateTime fechaFin);
    
    // Buscar movimientos por producto y rango de fechas
    List<MovimientoInventario> findByProductoIdAndFechaBetweenOrderByFechaDesc(
        Long productoId, LocalDateTime fechaInicio, LocalDateTime fechaFin);
    
    // Buscar movimientos por usuario
    List<MovimientoInventario> findByUsuarioIdOrderByFechaDesc(Long usuarioId);
    
    // Contar movimientos por producto
    long countByProductoId(Long productoId);
    
    // Obtener el último movimiento de un producto
    MovimientoInventario findFirstByProductoIdOrderByFechaDesc(Long productoId);
} 