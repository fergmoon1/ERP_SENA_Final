package com.empresa.erp.models;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "compra")
public class Compra {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "proveedor_id", nullable = false)
    private Proveedor proveedor;
    
    @Column(nullable = false)
    private LocalDate fecha;
    
    @Column(length = 50)
    private String numeroFactura; // Número de factura del proveedor
    
    @Column(length = 20)
    private String estado; // "PENDIENTE", "RECIBIDA", "CANCELADA"
    
    @Column
    private Double subtotal = 0.0;
    
    @Column
    private Double iva = 0.0;
    
    @Column
    private Double total = 0.0;
    
    @Column(length = 500)
    private String observaciones;
    
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario; // Usuario que registra la compra
    
    // Relación con detalles de compra
    @OneToMany(mappedBy = "compra", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<DetalleCompra> detalles = new ArrayList<>();
    
    // Constructor por defecto
    public Compra() {}
    
    // Constructor con parámetros básicos
    public Compra(Proveedor proveedor, LocalDate fecha, String numeroFactura) {
        this.proveedor = proveedor;
        this.fecha = fecha;
        this.numeroFactura = numeroFactura;
        this.estado = "PENDIENTE";
        this.subtotal = 0.0;
        this.iva = 0.0;
        this.total = 0.0;
    }
    
    // Constructor completo
    public Compra(Proveedor proveedor, LocalDate fecha, String numeroFactura, 
                  String estado, Double subtotal, Double iva, Double total, 
                  String observaciones, Usuario usuario) {
        this.proveedor = proveedor;
        this.fecha = fecha;
        this.numeroFactura = numeroFactura;
        this.estado = estado;
        this.subtotal = subtotal;
        this.iva = iva;
        this.total = total;
        this.observaciones = observaciones;
        this.usuario = usuario;
    }
    
    // Métodos para manejar detalles
    public void agregarDetalle(DetalleCompra detalle) {
        detalles.add(detalle);
        detalle.setCompra(this);
        calcularTotales();
    }
    
    public void removerDetalle(DetalleCompra detalle) {
        detalles.remove(detalle);
        detalle.setCompra(null);
        calcularTotales();
    }
    
    public void calcularTotales() {
        this.subtotal = detalles.stream()
                .mapToDouble(d -> d.getPrecioUnitario() * d.getCantidad())
                .sum();
        
        this.iva = subtotal * 0.19; // 19% IVA
        this.total = subtotal + iva;
    }
    
    // Getters y Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Proveedor getProveedor() {
        return proveedor;
    }
    
    public void setProveedor(Proveedor proveedor) {
        this.proveedor = proveedor;
    }
    
    public LocalDate getFecha() {
        return fecha;
    }
    
    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }
    
    public String getNumeroFactura() {
        return numeroFactura;
    }
    
    public void setNumeroFactura(String numeroFactura) {
        this.numeroFactura = numeroFactura;
    }
    
    public String getEstado() {
        return estado;
    }
    
    public void setEstado(String estado) {
        this.estado = estado;
    }
    
    public Double getSubtotal() {
        return subtotal;
    }
    
    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }
    
    public Double getIva() {
        return iva;
    }
    
    public void setIva(Double iva) {
        this.iva = iva;
    }
    
    public Double getTotal() {
        return total;
    }
    
    public void setTotal(Double total) {
        this.total = total;
    }
    
    public String getObservaciones() {
        return observaciones;
    }
    
    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
    
    public Usuario getUsuario() {
        return usuario;
    }
    
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    
    public List<DetalleCompra> getDetalles() {
        return detalles;
    }
    
    public void setDetalles(List<DetalleCompra> detalles) {
        this.detalles = detalles;
        if (detalles != null) {
            detalles.forEach(detalle -> detalle.setCompra(this));
        }
        calcularTotales();
    }
} 