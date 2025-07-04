package com.empresa.erp.services;

import com.empresa.erp.models.PasswordPolicy;
import com.empresa.erp.repositories.PasswordPolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PasswordPolicyService {
    @Autowired
    private PasswordPolicyRepository repo;

    public PasswordPolicy getPolicy() {
        List<PasswordPolicy> all = repo.findAll();
        return all.isEmpty() ? null : all.get(0);
    }

    public PasswordPolicy savePolicy(PasswordPolicy policy) {
        // Si ya existe, actualiza; si no, crea
        List<PasswordPolicy> all = repo.findAll();
        if (!all.isEmpty()) {
            policy.setId(all.get(0).getId());
        }
        return repo.save(policy);
    }
}