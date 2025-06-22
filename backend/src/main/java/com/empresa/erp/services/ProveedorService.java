package com.empresa.erp.services;

import com.empresa.erp.models.Proveedor;
import com.empresa.erp.repositories.ProveedorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProveedorService {
    
    private final ProveedorRepository proveedorRepository;
    private final ValidacionService validacionService;
    
    public ProveedorService(ProveedorRepository proveedorRepository, ValidacionService validacionService) {
        this.proveedorRepository = proveedorRepository;
        this.validacionService = validacionService;
    }
    
    public List<Proveedor> findAll() {
        return proveedorRepository.findAll();
    }
    
    public List<Proveedor> findAllActivos() {
        return proveedorRepository.findByActivoTrue();
    }
    
    public Optional<Proveedor> findById(Long id) {
        return proveedorRepository.findById(id);
    }
    
    public List<Proveedor> findByTipo(String tipo) {
        return proveedorRepository.findByTipo(tipo);
    }
    
    public List<Proveedor> findByNombreContaining(String nombre) {
        return proveedorRepository.findByNombreContainingIgnoreCase(nombre);
    }
    
    public Optional<Proveedor> findByNit(String nit) {
        return proveedorRepository.findByNit(nit);
    }
    
    public Optional<Proveedor> findByCorreo(String correo) {
        return proveedorRepository.findByCorreoIgnoreCase(correo);
    }
    
    public List<Proveedor> searchByNombreOrCorreo(String termino) {
        return proveedorRepository.findByNombreContainingIgnoreCaseOrCorreoContainingIgnoreCase(termino, termino);
    }
    
    public long countActivos() {
        return proveedorRepository.countByActivoTrue();
    }
    
    public long countByTipo(String tipo) {
        return proveedorRepository.countByTipo(tipo);
    }
    
    public Proveedor save(Proveedor proveedor) {
        // Validar datos del proveedor
        validacionService.validarProveedor(proveedor);
        
        // Validar NIT único si se proporciona
        if (proveedor.getNit() != null && !proveedor.getNit().trim().isEmpty()) {
            validacionService.validarNitUnico(proveedor);
        }
        
        // Validar correo único si se proporciona
        if (proveedor.getCorreo() != null && !proveedor.getCorreo().trim().isEmpty()) {
            validacionService.validarCorreoProveedorUnico(proveedor);
        }
        
        // Si es nuevo proveedor, establecer como activo
        if (proveedor.getId() == null) {
            proveedor.setActivo(true);
        }
        
        Proveedor proveedorGuardado = proveedorRepository.save(proveedor);
        
        // Buscar de nuevo para devolver el objeto completamente poblado
        return proveedorRepository.findById(proveedorGuardado.getId())
                .orElseThrow(() -> new RuntimeException("Error al recuperar el proveedor recién guardado"));
    }
    
    public void deleteById(Long id) {
        Proveedor proveedor = proveedorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proveedor a eliminar no encontrado con id: " + id));
        
        // En lugar de eliminar físicamente, marcar como inactivo
        proveedor.setActivo(false);
        proveedorRepository.save(proveedor);
    }
    
    public void activarProveedor(Long id) {
        Proveedor proveedor = proveedorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proveedor no encontrado con id: " + id));
        
        proveedor.setActivo(true);
        proveedorRepository.save(proveedor);
    }
    
    public void desactivarProveedor(Long id) {
        Proveedor proveedor = proveedorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proveedor no encontrado con id: " + id));
        
        proveedor.setActivo(false);
        proveedorRepository.save(proveedor);
    }
    
    // Método para obtener proveedores por tipo específico
    public List<Proveedor> getProveedoresPorTipo(String tipo) {
        return proveedorRepository.findByActivoTrueAndTipo(tipo);
    }
    
    // Método para buscar proveedores que suministren un producto específico
    // (esto se puede expandir cuando tengamos la relación producto-proveedor)
    public List<Proveedor> getProveedoresActivos() {
        return proveedorRepository.findByActivoTrue();
    }
} 