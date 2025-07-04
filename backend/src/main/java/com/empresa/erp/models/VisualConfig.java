package com.empresa.erp.models;

import jakarta.persistence.*;

@Entity
public class VisualConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String logoUrl; // URL o base64 del logo
    private String colorPrimario;
    private String colorSecundario;
    private String tema;
    private String formatoFecha;
    private String formatoHora;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }

    public String getColorPrimario() { return colorPrimario; }
    public void setColorPrimario(String colorPrimario) { this.colorPrimario = colorPrimario; }

    public String getColorSecundario() { return colorSecundario; }
    public void setColorSecundario(String colorSecundario) { this.colorSecundario = colorSecundario; }

    public String getTema() { return tema; }
    public void setTema(String tema) { this.tema = tema; }

    public String getFormatoFecha() { return formatoFecha; }
    public void setFormatoFecha(String formatoFecha) { this.formatoFecha = formatoFecha; }

    public String getFormatoHora() { return formatoHora; }
    public void setFormatoHora(String formatoHora) { this.formatoHora = formatoHora; }
} 