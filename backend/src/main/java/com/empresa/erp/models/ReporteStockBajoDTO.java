package com.empresa.erp.models;

public class ReporteStockBajoDTO {
    private Long productoId;
    private String nombre;
    private Integer stock;

    public ReporteStockBajoDTO(Long productoId, String nombre, Integer stock) {
        this.productoId = productoId;
        this.nombre = nombre;
        this.stock = stock;
    }

    public Long getProductoId() { return productoId; }
    public void setProductoId(Long productoId) { this.productoId = productoId; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
} 