package com.empresa.erp.services;

import com.empresa.erp.models.Cliente;
import com.empresa.erp.models.DetallePedido;
import com.empresa.erp.models.MovimientoInventario;
import com.empresa.erp.models.Pedido;
import com.empresa.erp.models.Producto;
import com.empresa.erp.repositories.ClienteRepository;
import com.empresa.erp.repositories.ProductoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.regex.Pattern;

@Service
public class ValidacionService {
    
    private final ClienteRepository clienteRepository;
    private final ProductoRepository productoRepository;
    
    // Patrones de validación
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");
    private static final Pattern PHONE_PATTERN = Pattern.compile("^[0-9]{7,15}$");
    private static final Pattern NAME_PATTERN = Pattern.compile("^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]{2,100}$");
    
    public ValidacionService(ClienteRepository clienteRepository, ProductoRepository productoRepository) {
        this.clienteRepository = clienteRepository;
        this.productoRepository = productoRepository;
    }
    
    // ===== VALIDACIONES DE CLIENTE =====
    
    /**
     * Valida los datos de un cliente
     */
    public void validarCliente(Cliente cliente) {
        List<String> errores = new java.util.ArrayList<>();
        
        // Validar nombre
        if (cliente.getNombre() == null || cliente.getNombre().trim().isEmpty()) {
            errores.add("El nombre del cliente es obligatorio");
        } else if (!NAME_PATTERN.matcher(cliente.getNombre()).matches()) {
            errores.add("El nombre del cliente debe contener solo letras y espacios (2-100 caracteres)");
        }
        
        // Validar correo si se proporciona
        if (cliente.getCorreo() != null && !cliente.getCorreo().trim().isEmpty()) {
            if (!EMAIL_PATTERN.matcher(cliente.getCorreo()).matches()) {
                errores.add("El formato del correo electrónico no es válido");
            }
        }
        
        // Validar teléfono si se proporciona
        if (cliente.getTelefono() != null && !cliente.getTelefono().trim().isEmpty()) {
            if (!PHONE_PATTERN.matcher(cliente.getTelefono()).matches()) {
                errores.add("El formato del teléfono no es válido (7-15 dígitos)");
            }
        }
        
        // Validar tipo
        if (cliente.getTipo() != null && !cliente.getTipo().trim().isEmpty()) {
            if (!cliente.getTipo().equals("Persona") && !cliente.getTipo().equals("Empresa")) {
                errores.add("El tipo de cliente debe ser 'Persona' o 'Empresa'");
            }
        }
        
        if (!errores.isEmpty()) {
            throw new RuntimeException("Errores de validación: " + String.join(", ", errores));
        }
    }
    
    /**
     * Valida que no exista un cliente con el mismo correo
     */
    public void validarCorreoUnico(Cliente cliente) {
        if (cliente.getCorreo() != null && !cliente.getCorreo().trim().isEmpty()) {
            List<Cliente> clientesExistentes = clienteRepository.findAll();
            for (Cliente existente : clientesExistentes) {
                if (!existente.getId().equals(cliente.getId()) && 
                    cliente.getCorreo().equalsIgnoreCase(existente.getCorreo())) {
                    throw new RuntimeException("Ya existe un cliente con el correo: " + cliente.getCorreo());
                }
            }
        }
    }
    
    // ===== VALIDACIONES DE PRODUCTO =====
    
    /**
     * Valida los datos de un producto
     */
    public void validarProducto(Producto producto) {
        List<String> errores = new java.util.ArrayList<>();
        
        // Validar nombre
        if (producto.getNombre() == null || producto.getNombre().trim().isEmpty()) {
            errores.add("El nombre del producto es obligatorio");
        } else if (producto.getNombre().length() < 2 || producto.getNombre().length() > 100) {
            errores.add("El nombre del producto debe tener entre 2 y 100 caracteres");
        }
        
        // Validar descripción
        if (producto.getDescripcion() != null && producto.getDescripcion().length() > 500) {
            errores.add("La descripción del producto no puede exceder 500 caracteres");
        }
        
        // Validar precio
        if (producto.getPrecio() == null || producto.getPrecio() <= 0) {
            errores.add("El precio del producto debe ser mayor a 0");
        }
        
        // Validar stock
        if (producto.getStock() == null || producto.getStock() < 0) {
            errores.add("El stock del producto no puede ser negativo");
        }
        
        if (!errores.isEmpty()) {
            throw new RuntimeException("Errores de validación: " + String.join(", ", errores));
        }
    }
    
    /**
     * Valida que no exista un producto con el mismo nombre
     */
    public void validarNombreProductoUnico(Producto producto) {
        List<Producto> productosExistentes = productoRepository.findAll();
        for (Producto existente : productosExistentes) {
            if (!existente.getId().equals(producto.getId()) && 
                producto.getNombre().equalsIgnoreCase(existente.getNombre())) {
                throw new RuntimeException("Ya existe un producto con el nombre: " + producto.getNombre());
            }
        }
    }
    
    // ===== VALIDACIONES DE PEDIDO =====
    
    /**
     * Valida los datos de un pedido
     */
    public void validarPedido(Pedido pedido) {
        List<String> errores = new java.util.ArrayList<>();
        
        // Validar cliente
        if (pedido.getCliente() == null || pedido.getCliente().getId() == null) {
            errores.add("El cliente del pedido es obligatorio");
        } else {
            if (!clienteRepository.existsById(pedido.getCliente().getId())) {
                errores.add("El cliente especificado no existe");
            }
        }
        
        // Validar detalles
        if (pedido.getDetalles() == null || pedido.getDetalles().isEmpty()) {
            errores.add("El pedido debe tener al menos un detalle");
        } else {
            for (int i = 0; i < pedido.getDetalles().size(); i++) {
                DetallePedido detalle = pedido.getDetalles().get(i);
                errores.addAll(validarDetallePedido(detalle, i + 1));
            }
        }
        
        // Validar fecha
        if (pedido.getFecha() == null) {
            errores.add("La fecha del pedido es obligatoria");
        } else if (pedido.getFecha().isAfter(LocalDate.now())) {
            errores.add("La fecha del pedido no puede ser futura");
        }
        
        if (!errores.isEmpty()) {
            throw new RuntimeException("Errores de validación: " + String.join(", ", errores));
        }
    }
    
    /**
     * Valida un detalle de pedido específico
     */
    private List<String> validarDetallePedido(DetallePedido detalle, int numeroDetalle) {
        List<String> errores = new java.util.ArrayList<>();
        
        // Validar producto
        if (detalle.getProducto() == null || detalle.getProducto().getId() == null) {
            errores.add("Detalle " + numeroDetalle + ": El producto es obligatorio");
        } else {
            if (!productoRepository.existsById(detalle.getProducto().getId())) {
                errores.add("Detalle " + numeroDetalle + ": El producto especificado no existe");
            }
        }
        
        // Validar cantidad
        if (detalle.getCantidad() == null || detalle.getCantidad() <= 0) {
            errores.add("Detalle " + numeroDetalle + ": La cantidad debe ser mayor a 0");
        }
        
        return errores;
    }
    
    // ===== VALIDACIONES DE MOVIMIENTO DE INVENTARIO =====
    
    /**
     * Valida los datos de un movimiento de inventario
     */
    public void validarMovimientoInventario(MovimientoInventario movimiento) {
        List<String> errores = new java.util.ArrayList<>();
        
        // Validar producto
        if (movimiento.getProducto() == null || movimiento.getProducto().getId() == null) {
            errores.add("El producto del movimiento es obligatorio");
        } else {
            if (!productoRepository.existsById(movimiento.getProducto().getId())) {
                errores.add("El producto especificado no existe");
            }
        }
        
        // Validar tipo
        if (movimiento.getTipo() == null) {
            errores.add("El tipo de movimiento es obligatorio");
        }
        
        // Validar cantidad
        if (movimiento.getCantidad() == null || movimiento.getCantidad() <= 0) {
            errores.add("La cantidad del movimiento debe ser mayor a 0");
        }
        
        // Validar motivo
        if (movimiento.getMotivo() != null && movimiento.getMotivo().length() > 500) {
            errores.add("El motivo del movimiento no puede exceder 500 caracteres");
        }
        
        if (!errores.isEmpty()) {
            throw new RuntimeException("Errores de validación: " + String.join(", ", errores));
        }
    }
    
    // ===== VALIDACIONES DE NEGOCIO =====
    
    /**
     * Valida que haya suficiente stock para un pedido
     */
    public void validarStockSuficiente(Pedido pedido) {
        for (DetallePedido detalle : pedido.getDetalles()) {
            if (detalle.getProducto() != null && detalle.getProducto().getId() != null) {
                Producto producto = productoRepository.findById(detalle.getProducto().getId())
                        .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
                
                if (producto.getStock() < detalle.getCantidad()) {
                    throw new RuntimeException("Stock insuficiente para el producto '" + 
                                             producto.getNombre() + "'. Stock disponible: " + 
                                             producto.getStock() + ", Cantidad solicitada: " + 
                                             detalle.getCantidad());
                }
            }
        }
    }
    
    /**
     * Valida que un pedido no esté vacío
     */
    public void validarPedidoNoVacio(Pedido pedido) {
        if (pedido.getDetalles() == null || pedido.getDetalles().isEmpty()) {
            throw new RuntimeException("El pedido debe contener al menos un producto");
        }
    }
    
    /**
     * Valida que un producto no tenga stock negativo después de una operación
     */
    public void validarStockNoNegativo(Producto producto) {
        if (producto.getStock() < 0) {
            throw new RuntimeException("El stock del producto '" + producto.getNombre() + 
                                     "' no puede ser negativo. Stock actual: " + producto.getStock());
        }
    }
} 