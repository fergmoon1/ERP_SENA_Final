package com.empresa.erp.repositories;

import com.empresa.erp.models.DetallePedido;
import org.springframework.data.jpa.repository.JpaRepository;
 
public interface DetallePedidoRepository extends JpaRepository<DetallePedido, Long> {
} 