package com.empresa.erp.services;

import com.empresa.erp.models.Compra;
import com.empresa.erp.models.DetalleCompra;
import com.empresa.erp.repositories.CompraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CompraService {
    @Autowired
    private CompraRepository compraRepository;

    public List<Compra> findAll() {
        return compraRepository.findAll();
    }

    public Optional<Compra> findById(Long id) {
        return compraRepository.findById(id);
    }

    public Compra save(Compra compra) {
        if (compra.getDetalles() != null) {
            double subtotal = 0.0;
            double descuentoTotal = 0.0;
            
            for (DetalleCompra d : compra.getDetalles()) {
                d.setCompra(compra);
                if (d.getCantidad() != null && d.getPrecioUnitario() != null) {
                    double descuento = d.getDescuento() != null ? d.getDescuento() : 0.0;
                    d.setSubtotal((d.getCantidad() * d.getPrecioUnitario()) - descuento);
                    subtotal += (d.getCantidad() * d.getPrecioUnitario());
                    descuentoTotal += descuento;
                }
            }
            
            compra.setSubtotal(subtotal);
            compra.setDescuentoTotal(descuentoTotal);
            
            // Calcular IVA (19% en Colombia)
            double iva = subtotal * 0.19;
            compra.setIva(iva);
            
            // Calcular total
            compra.setTotal(subtotal - descuentoTotal + iva);
        }
        
        // Establecer fechas si no están definidas
        if (compra.getFechaRegistro() == null) {
            compra.setFechaRegistro(LocalDateTime.now());
        }
        compra.setFechaActualizacion(LocalDateTime.now());
        
        // Establecer estado por defecto si no está definido
        if (compra.getEstado() == null) {
            compra.setEstado("PENDIENTE");
        }
        
        return compraRepository.save(compra);
    }

    public void deleteById(Long id) {
        compraRepository.deleteById(id);
    }
} 