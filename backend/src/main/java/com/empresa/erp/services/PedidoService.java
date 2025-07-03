package com.empresa.erp.services;

import com.empresa.erp.models.Cliente;
import com.empresa.erp.models.DetallePedido;
import com.empresa.erp.models.MovimientoInventario;
import com.empresa.erp.models.Pedido;
import com.empresa.erp.models.Producto;
import com.empresa.erp.models.CrearPedidoDTO;
import com.empresa.erp.models.DetallePedidoDTO;
import com.empresa.erp.repositories.ClienteRepository;
import com.empresa.erp.repositories.PedidoRepository;
import com.empresa.erp.repositories.ProductoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PedidoService {
    private final PedidoRepository pedidoRepository;
    private final ClienteRepository clienteRepository;
    private final ProductoRepository productoRepository;
    private final MovimientoInventarioService movimientoInventarioService;
    private final ValidacionService validacionService;

    public PedidoService(PedidoRepository pedidoRepository, 
                        ClienteRepository clienteRepository, 
                        ProductoRepository productoRepository,
                        MovimientoInventarioService movimientoInventarioService,
                        ValidacionService validacionService) {
        this.pedidoRepository = pedidoRepository;
        this.clienteRepository = clienteRepository;
        this.productoRepository = productoRepository;
        this.movimientoInventarioService = movimientoInventarioService;
        this.validacionService = validacionService;
    }

    public List<Pedido> findAll() {
        return pedidoRepository.findAll();
    }

    public Optional<Pedido> findById(Long id) {
        return pedidoRepository.findById(id);
    }

    @Transactional
    public Pedido save(Pedido pedido) {
        // Validaciones previas al procesamiento
        validacionService.validarPedido(pedido);
        validacionService.validarPedidoNoVacio(pedido);
        validacionService.validarStockSuficiente(pedido);

        Pedido pedidoParaGuardar;
        boolean esActualizacion = pedido.getId() != null;

        // Si es una ACTUALIZACIÓN, restaura el stock del pedido original y genera movimientos de reversión
        if (esActualizacion) {
            pedidoParaGuardar = pedidoRepository.findById(pedido.getId())
                    .orElseThrow(() -> new RuntimeException("Pedido a actualizar no encontrado con id: " + pedido.getId()));

            // Crea una copia de la lista de detalles viejos para iterar de forma segura
            List<DetallePedido> detallesViejos = new ArrayList<>(pedidoParaGuardar.getDetalles());
            
            // Devuelve el stock de los detalles antiguos y genera movimientos de reversión
            for (DetallePedido detalleViejo : detallesViejos) {
                Producto producto = detalleViejo.getProducto();
                Integer stockAnterior = producto.getStock();
                producto.setStock(producto.getStock() + detalleViejo.getCantidad());
                
                // Validar que el stock no sea negativo después de la reversión
                validacionService.validarStockNoNegativo(producto);
                
                // Generar movimiento de reversión (ENTRADA) para el pedido anterior
                MovimientoInventario movimientoReversion = new MovimientoInventario();
                movimientoReversion.setProducto(producto);
                movimientoReversion.setTipo(MovimientoInventario.TipoMovimiento.ENTRADA);
                movimientoReversion.setCantidad(detalleViejo.getCantidad());
                movimientoReversion.setStockAnterior(stockAnterior);
                movimientoReversion.setStockPosterior(producto.getStock());
                movimientoReversion.setMotivo("Reversión de pedido #" + pedido.getId() + " - Actualización");
                movimientoInventarioService.save(movimientoReversion);
            }
            
            // Ahora que el stock está restaurado, limpia la lista de detalles en la entidad
            pedidoParaGuardar.getDetalles().clear();
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

        // Crea una copia de los detalles entrantes para iterar sobre ella y evitar ConcurrentModificationException
        List<DetallePedido> detallesNuevos = new ArrayList<>(pedido.getDetalles());
        
        // Si es una creación, la lista original en el objeto "pedido" debe ser limpiada
        // para llenarla con las entidades procesadas y manejadas por JPA.
        if (!esActualizacion) {
            pedidoParaGuardar.getDetalles().clear();
        }

        // 2. Procesar nuevos detalles: validar, REDUCIR stock, calcular total y generar movimientos
        for (DetallePedido detalleNuevo : detallesNuevos) {
            Producto producto = productoRepository.findById(detalleNuevo.getProducto().getId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + detalleNuevo.getProducto().getId()));

            if (producto.getStock() < detalleNuevo.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para el producto: " + producto.getNombre());
            }

            Integer stockAnterior = producto.getStock();
            producto.setStock(producto.getStock() - detalleNuevo.getCantidad());
            
            // Validar que el stock no sea negativo después de la reducción
            validacionService.validarStockNoNegativo(producto);

            detalleNuevo.setProducto(producto);
            detalleNuevo.setPedido(pedidoParaGuardar);
            pedidoParaGuardar.getDetalles().add(detalleNuevo);

            totalCalculado += detalleNuevo.getPrecioUnitario() * detalleNuevo.getCantidad();
            
            // Generar movimiento de inventario (SALIDA) para el nuevo pedido
            MovimientoInventario movimientoSalida = new MovimientoInventario();
            movimientoSalida.setProducto(producto);
            movimientoSalida.setTipo(MovimientoInventario.TipoMovimiento.SALIDA);
            movimientoSalida.setCantidad(detalleNuevo.getCantidad());
            movimientoSalida.setStockAnterior(stockAnterior);
            movimientoSalida.setStockPosterior(producto.getStock());
            movimientoSalida.setMotivo("Pedido #" + (esActualizacion ? pedido.getId() : "NUEVO") + 
                                     " - Cliente: " + cliente.getNombre());
            movimientoInventarioService.save(movimientoSalida);
        }

        pedidoParaGuardar.setTotal(totalCalculado);
        pedidoParaGuardar.setFecha(LocalDate.now());
        pedidoParaGuardar.setEstado("PENDIENTE");

        Pedido pedidoGuardado = pedidoRepository.save(pedidoParaGuardar);

        // Se busca de nuevo para devolver el objeto completamente poblado por JPA
        return pedidoRepository.findById(pedidoGuardado.getId())
               .orElseThrow(() -> new RuntimeException("Error al recuperar el pedido recién guardado"));
    }

    @Transactional
    public void deleteById(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido a eliminar no encontrado con id: " + id));

        // Devolver el stock de los productos al inventario y generar movimientos de reversión
        for (DetallePedido detalle : pedido.getDetalles()) {
            Producto producto = detalle.getProducto();
            Integer stockAnterior = producto.getStock();
            producto.setStock(producto.getStock() + detalle.getCantidad());
            
            // Validar que el stock no sea negativo después de la restauración
            validacionService.validarStockNoNegativo(producto);
            
            // Generar movimiento de reversión (ENTRADA) para la eliminación del pedido
            MovimientoInventario movimientoReversion = new MovimientoInventario();
            movimientoReversion.setProducto(producto);
            movimientoReversion.setTipo(MovimientoInventario.TipoMovimiento.ENTRADA);
            movimientoReversion.setCantidad(detalle.getCantidad());
            movimientoReversion.setStockAnterior(stockAnterior);
            movimientoReversion.setStockPosterior(producto.getStock());
            movimientoReversion.setMotivo("Reversión de pedido #" + id + " - Eliminación");
            movimientoInventarioService.save(movimientoReversion);
        }

        // Eliminar el pedido
        pedidoRepository.delete(pedido);
    }

    @Transactional
    public Pedido saveFromDTO(CrearPedidoDTO dto) {
        // Crear el pedido desde el DTO
        Pedido pedido = new Pedido();
        
        // Buscar y asignar el cliente
        Cliente cliente = clienteRepository.findById(dto.getClienteId())
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado con id: " + dto.getClienteId()));
        pedido.setCliente(cliente);
        
        // Asignar la fecha del DTO si viene, si no la actual
        if (dto.getFecha() != null && !dto.getFecha().isEmpty()) {
            pedido.setFecha(LocalDate.parse(dto.getFecha()));
        } else {
            pedido.setFecha(LocalDate.now());
        }
        pedido.setEstado("PENDIENTE");
        
        // Crear los detalles del pedido
        List<DetallePedido> detalles = new ArrayList<>();
        for (DetallePedidoDTO detalleDTO : dto.getDetalles()) {
            DetallePedido detalle = new DetallePedido();
            
            // Buscar y asignar el producto
            Producto producto = productoRepository.findById(detalleDTO.getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + detalleDTO.getProductoId()));
            detalle.setProducto(producto);
            
            // Asignar cantidad y precio unitario
            detalle.setCantidad(detalleDTO.getCantidad());
            detalle.setPrecioUnitario(detalleDTO.getPrecioUnitario());
            
            // Asignar la referencia al pedido
            detalle.setPedido(pedido);
            
            detalles.add(detalle);
        }
        
        pedido.setDetalles(detalles);
        
        // Guardar usando el método existente
        return save(pedido);
    }

    public Map<String, Object> findAllWithFilters(String clienteId, String fecha, String estado, int pagina) {
        List<Pedido> todosLosPedidos = pedidoRepository.findAll();
        List<Pedido> pedidosFiltrados = new ArrayList<>();
        
        for (Pedido pedido : todosLosPedidos) {
            boolean cumpleFiltros = true;
            
            // Filtro por cliente
            if (clienteId != null && !clienteId.isEmpty()) {
                if (pedido.getCliente() == null || !pedido.getCliente().getId().toString().equals(clienteId)) {
                    cumpleFiltros = false;
                }
            }
            
            // Filtro por fecha
            if (fecha != null && !fecha.isEmpty()) {
                if (pedido.getFecha() == null || !pedido.getFecha().toString().equals(fecha)) {
                    cumpleFiltros = false;
                }
            }
            
            // Filtro por estado
            if (estado != null && !estado.isEmpty()) {
                if (pedido.getEstado() == null || !pedido.getEstado().equalsIgnoreCase(estado)) {
                    cumpleFiltros = false;
                }
            }
            
            if (cumpleFiltros) {
                pedidosFiltrados.add(pedido);
            }
        }
        
        // Paginación
        int elementosPorPagina = 10;
        int inicio = (pagina - 1) * elementosPorPagina;
        int fin = Math.min(inicio + elementosPorPagina, pedidosFiltrados.size());
        List<Pedido> paginaPedidos = (inicio >= pedidosFiltrados.size()) ? new ArrayList<>() : pedidosFiltrados.subList(inicio, fin);
        int totalPages = (int) Math.ceil((double) pedidosFiltrados.size() / elementosPorPagina);
        
        Map<String, Object> resultado = new HashMap<>();
        resultado.put("content", paginaPedidos);
        resultado.put("totalPages", totalPages == 0 ? 1 : totalPages);
        resultado.put("totalElements", pedidosFiltrados.size());
        return resultado;
    }
}