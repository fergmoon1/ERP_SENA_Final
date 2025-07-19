package com.empresa.erp.services;

import com.empresa.erp.models.EmpresaConfig;
import com.empresa.erp.repositories.EmpresaConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpresaConfigService {
    @Autowired
    private EmpresaConfigRepository repo;

    public EmpresaConfig getConfig() {
        List<EmpresaConfig> all = repo.findAll();
        return all.isEmpty() ? null : all.get(0);
    }

    public EmpresaConfig saveConfig(EmpresaConfig config) {
        List<EmpresaConfig> all = repo.findAll();
        if (!all.isEmpty()) {
            config.setId(all.get(0).getId());
        }
        return repo.save(config);
    }
} 