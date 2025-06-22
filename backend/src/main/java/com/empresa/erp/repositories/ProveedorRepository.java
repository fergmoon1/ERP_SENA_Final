package com.empresa.erp.repositories;

import com.empresa.erp.models.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {
    
    // Buscar proveedores activos
    List<Proveedor> findByActivoTrue();
    
    // Buscar proveedores por tipo
    List<Proveedor> findByTipo(String tipo);
    
    // Buscar proveedores activos por tipo
    List<Proveedor> findByActivoTrueAndTipo(String tipo);
    
    // Buscar por nombre (ignorando mayúsculas/minúsculas)
    List<Proveedor> findByNombreContainingIgnoreCase(String nombre);
    
    // Buscar por NIT
    Optional<Proveedor> findByNit(String nit);
    
    // Buscar por correo
    Optional<Proveedor> findByCorreo(String correo);
    
    // Buscar por correo ignorando mayúsculas/minúsculas
    Optional<Proveedor> findByCorreoIgnoreCase(String correo);
    
    // Contar proveedores activos
    long countByActivoTrue();
    
    // Contar proveedores por tipo
    long countByTipo(String tipo);
    
    // Buscar proveedores que contengan el nombre o correo
    List<Proveedor> findByNombreContainingIgnoreCaseOrCorreoContainingIgnoreCase(String nombre, String correo);
} 