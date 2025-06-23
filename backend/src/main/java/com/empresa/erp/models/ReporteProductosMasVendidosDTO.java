package com.empresa.erp.models;

public class ReporteProductosMasVendidosDTO {
    private Long productoId;
    private String nombre;
    private Integer cantidadVendida;
    private Double totalVentas;

    public ReporteProductosMasVendidosDTO(Long productoId, String nombre, Integer cantidadVendida, Double totalVentas) {
        this.productoId = productoId;
        this.nombre = nombre;
        this.cantidadVendida = cantidadVendida;
        this.totalVentas = totalVentas;
    }

    public Long getProductoId() { return productoId; }
    public void setProductoId(Long productoId) { this.productoId = productoId; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public Integer getCantidadVendida() { return cantidadVendida; }
    public void setCantidadVendida(Integer cantidadVendida) { this.cantidadVendida = cantidadVendida; }
    public Double getTotalVentas() { return totalVentas; }
    public void setTotalVentas(Double totalVentas) { this.totalVentas = totalVentas; }
} 