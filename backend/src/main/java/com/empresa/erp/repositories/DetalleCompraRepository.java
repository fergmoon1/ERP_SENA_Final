package com.empresa.erp.repositories;

import com.empresa.erp.models.DetalleCompra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetalleCompraRepository extends JpaRepository<DetalleCompra, Long> {
    
    // Buscar detalles por compra
    List<DetalleCompra> findByCompraId(Long compraId);
    
    // Buscar detalles por producto
    List<DetalleCompra> findByProductoId(Long productoId);
    
    // Buscar detalles por compra ordenados por ID
    List<DetalleCompra> findByCompraIdOrderById(Long compraId);
    
    // Contar detalles por compra
    long countByCompraId(Long compraId);
    
    // Contar detalles por producto
    long countByProductoId(Long productoId);
    
    // Buscar detalles por compra y producto
    List<DetalleCompra> findByCompraIdAndProductoId(Long compraId, Long productoId);
    
    // Buscar detalles con descuento mayor a 0
    List<DetalleCompra> findByDescuentoGreaterThan(Double descuento);
    
    // Buscar detalles por rango de precios
    List<DetalleCompra> findByPrecioUnitarioBetween(Double precioMin, Double precioMax);
    
    // Buscar detalles por cantidad mayor a un valor
    List<DetalleCompra> findByCantidadGreaterThan(Integer cantidad);
} 