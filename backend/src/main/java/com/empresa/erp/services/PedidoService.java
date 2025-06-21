package com.empresa.erp.services;

import com.empresa.erp.models.Cliente;
import com.empresa.erp.models.DetallePedido;
import com.empresa.erp.models.Pedido;
import com.empresa.erp.models.Producto;
import com.empresa.erp.repositories.ClienteRepository;
import com.empresa.erp.repositories.PedidoRepository;
import com.empresa.erp.repositories.ProductoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {
    private final PedidoRepository pedidoRepository;
    private final ClienteRepository clienteRepository;
    private final ProductoRepository productoRepository;

    public PedidoService(PedidoRepository pedidoRepository, ClienteRepository clienteRepository, ProductoRepository productoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.clienteRepository = clienteRepository;
        this.productoRepository = productoRepository;
    }

    public List<Pedido> findAll() {
        return pedidoRepository.findAll();
    }

    public Optional<Pedido> findById(Long id) {
        return pedidoRepository.findById(id);
    }

    @Transactional
    public Pedido save(Pedido pedido) {

        Pedido pedidoParaGuardar;

        // Si es una ACTUALIZACIÓN, restaura el stock del pedido original
        if (pedido.getId() != null) {
            pedidoParaGuardar = pedidoRepository.findById(pedido.getId())
                    .orElseThrow(() -> new RuntimeException("Pedido a actualizar no encontrado con id: " + pedido.getId()));

            // Devuelve el stock de los detalles antiguos
            for (DetallePedido detalleViejo : pedidoParaGuardar.getDetalles()) {
                Producto producto = detalleViejo.getProducto();
                producto.setStock(producto.getStock() + detalleViejo.getCantidad());
            }
            pedidoParaGuardar.getDetalles().clear(); // Limpia la lista de detalles para llenarla con los nuevos
        } else {
            // Si es una CREACIÓN, usa el objeto nuevo
            pedidoParaGuardar = pedido;
        }

        // --- Lógica común para CREAR y ACTUALIZAR ---

        // 1. Validar y adjuntar el cliente
        Cliente cliente = clienteRepository.findById(pedido.getCliente().getId())
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado con id: " + pedido.getCliente().getId()));
        pedidoParaGuardar.setCliente(cliente);

        double totalCalculado = 0.0;

        // 2. Procesar nuevos detalles: validar, REDUCIR stock y calcular total
        for (DetallePedido detalleNuevo : pedido.getDetalles()) {
            Producto producto = productoRepository.findById(detalleNuevo.getProducto().getId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + detalleNuevo.getProducto().getId()));

            if (producto.getStock() < detalleNuevo.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para el producto: " + producto.getNombre());
            }

            producto.setStock(producto.getStock() - detalleNuevo.getCantidad());

            detalleNuevo.setProducto(producto);
            detalleNuevo.setPedido(pedidoParaGuardar);
            pedidoParaGuardar.getDetalles().add(detalleNuevo);

            totalCalculado += producto.getPrecio() * detalleNuevo.getCantidad();
        }

        pedidoParaGuardar.setTotal(totalCalculado);
        pedidoParaGuardar.setFecha(pedido.getFecha());

        return pedidoRepository.save(pedidoParaGuardar);
    }

    @Transactional
    public void deleteById(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido a eliminar no encontrado con id: " + id));

        // Devolver el stock de los productos al inventario
        for (DetallePedido detalle : pedido.getDetalles()) {
            Producto producto = detalle.getProducto();
            producto.setStock(producto.getStock() + detalle.getCantidad());
        }

        // Eliminar el pedido
        pedidoRepository.delete(pedido);
    }
}