package com.empresa.erp.models;

import java.time.LocalDate;
import java.util.List;

public class CrearPedidoDTO {
    private Long clienteId;
    private LocalDate fechaPedido;
    private String estado;
    private List<DetallePedidoDTO> detalles;

    // Constructores
    public CrearPedidoDTO() {}

    public CrearPedidoDTO(Long clienteId, LocalDate fechaPedido, String estado, List<DetallePedidoDTO> detalles) {
        this.clienteId = clienteId;
        this.fechaPedido = fechaPedido;
        this.estado = estado;
        this.detalles = detalles;
    }

    // Getters y Setters
    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public LocalDate getFechaPedido() {
        return fechaPedido;
    }

    public void setFechaPedido(LocalDate fechaPedido) {
        this.fechaPedido = fechaPedido;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public List<DetallePedidoDTO> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetallePedidoDTO> detalles) {
        this.detalles = detalles;
    }
} 