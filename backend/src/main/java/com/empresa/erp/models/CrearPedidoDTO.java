package com.empresa.erp.models;

import java.util.List;

public class CrearPedidoDTO {
    private Long clienteId;
    private List<DetallePedidoDTO> detalles;
    private String fecha;
    
    // Constructor por defecto
    public CrearPedidoDTO() {}
    
    // Constructor con parámetros
    public CrearPedidoDTO(Long clienteId, List<DetallePedidoDTO> detalles) {
        this.clienteId = clienteId;
        this.detalles = detalles;
    }
    
    // Getters y Setters
    public Long getClienteId() {
        return clienteId;
    }
    
    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }
    
    public List<DetallePedidoDTO> getDetalles() {
        return detalles;
    }
    
    public void setDetalles(List<DetallePedidoDTO> detalles) {
        this.detalles = detalles;
    }
    
    public String getFecha() {
        return fecha;
    }
    
    public void setFecha(String fecha) {
        this.fecha = fecha;
    }
} 