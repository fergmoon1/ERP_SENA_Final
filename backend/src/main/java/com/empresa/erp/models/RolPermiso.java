package com.empresa.erp.models;

import jakarta.persistence.*;

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"rol"})})
public class RolPermiso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String rol;
    private boolean ver;
    private boolean crear;
    private boolean editar;
    private boolean eliminar;
    private boolean aprobar;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }

    public boolean isVer() { return ver; }
    public void setVer(boolean ver) { this.ver = ver; }

    public boolean isCrear() { return crear; }
    public void setCrear(boolean crear) { this.crear = crear; }

    public boolean isEditar() { return editar; }
    public void setEditar(boolean editar) { this.editar = editar; }

    public boolean isEliminar() { return eliminar; }
    public void setEliminar(boolean eliminar) { this.eliminar = eliminar; }

    public boolean isAprobar() { return aprobar; }
    public void setAprobar(boolean aprobar) { this.aprobar = aprobar; }
} 