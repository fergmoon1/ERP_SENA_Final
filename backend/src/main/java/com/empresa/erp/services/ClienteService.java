package com.empresa.erp.services;

import com.empresa.erp.models.Cliente;
import com.empresa.erp.repositories.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {
    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> findById(Long id) {
        return clienteRepository.findById(id);
    }

    public Cliente save(Cliente cliente) {
        if (cliente.getTipo() == null ||
            !(cliente.getTipo().equalsIgnoreCase("Individual") || cliente.getTipo().equalsIgnoreCase("Empresa"))) {
            throw new IllegalArgumentException("El tipo de cliente solo puede ser 'Individual' o 'Empresa'.");
        }
        return clienteRepository.save(cliente);
    }

    public void deleteById(Long id) {
        clienteRepository.deleteById(id);
    }
}
