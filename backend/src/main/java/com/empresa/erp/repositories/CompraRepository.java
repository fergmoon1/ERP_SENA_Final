package com.empresa.erp.repositories;

import com.empresa.erp.models.Compra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CompraRepository extends JpaRepository<Compra, Long> {
    
    // Buscar compras por proveedor
    List<Compra> findByProveedorIdOrderByFechaDesc(Long proveedorId);
    
    // Buscar compras por estado
    List<Compra> findByEstadoOrderByFechaDesc(String estado);
    
    // Buscar compras por rango de fechas
    List<Compra> findByFechaBetweenOrderByFechaDesc(LocalDate fechaInicio, LocalDate fechaFin);
    
    // Buscar compras por proveedor y estado
    List<Compra> findByProveedorIdAndEstadoOrderByFechaDesc(Long proveedorId, String estado);
    
    // Buscar compras por proveedor y rango de fechas
    List<Compra> findByProveedorIdAndFechaBetweenOrderByFechaDesc(Long proveedorId, LocalDate fechaInicio, LocalDate fechaFin);
    
    // Buscar compras por estado y rango de fechas
    List<Compra> findByEstadoAndFechaBetweenOrderByFechaDesc(String estado, LocalDate fechaInicio, LocalDate fechaFin);
    
    // Buscar compras por número de factura
    List<Compra> findByNumeroFacturaContainingIgnoreCase(String numeroFactura);
    
    // Buscar compras por usuario
    List<Compra> findByUsuarioIdOrderByFechaDesc(Long usuarioId);
    
    // Contar compras por estado
    long countByEstado(String estado);
    
    // Contar compras por proveedor
    long countByProveedorId(Long proveedorId);
    
    // Buscar compras pendientes
    List<Compra> findByEstadoOrderByFechaAsc(String estado);
    
    // Buscar la última compra de un proveedor
    Compra findFirstByProveedorIdOrderByFechaDesc(Long proveedorId);
} 