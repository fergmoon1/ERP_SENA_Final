package com.empresa.erp.services;

import com.empresa.erp.models.Compra;
import com.empresa.erp.models.DetalleCompra;
import com.empresa.erp.repositories.CompraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
            double total = 0.0;
            for (DetalleCompra d : compra.getDetalles()) {
                d.setCompra(compra);
                if (d.getCantidad() != null && d.getPrecioUnitario() != null) {
                    d.setSubtotal(d.getCantidad() * d.getPrecioUnitario());
                    total += d.getSubtotal();
                }
            }
            compra.setTotal(total);
        }
        return compraRepository.save(compra);
    }

    public void deleteById(Long id) {
        compraRepository.deleteById(id);
    }
} 