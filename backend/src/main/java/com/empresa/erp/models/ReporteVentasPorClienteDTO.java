package com.empresa.erp.models;

public class ReporteVentasPorClienteDTO {
    private Long clienteId;
    private String nombre;
    private Double totalVentas;
    private Long cantidadPedidos;

    public ReporteVentasPorClienteDTO(Long clienteId, String nombre, Double totalVentas, Long cantidadPedidos) {
        this.clienteId = clienteId;
        this.nombre = nombre;
        this.totalVentas = totalVentas;
        this.cantidadPedidos = cantidadPedidos;
    }

    public Long getClienteId() { return clienteId; }
    public void setClienteId(Long clienteId) { this.clienteId = clienteId; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public Double getTotalVentas() { return totalVentas; }
    public void setTotalVentas(Double totalVentas) { this.totalVentas = totalVentas; }
    public Long getCantidadPedidos() { return cantidadPedidos; }
    public void setCantidadPedidos(Long cantidadPedidos) { this.cantidadPedidos = cantidadPedidos; }
} 