package com.empresa.erp.controllers;

import com.empresa.erp.models.PasswordPolicy;
import com.empresa.erp.services.PasswordPolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/password-policy")
@CrossOrigin(origins = "*")
public class PasswordPolicyController {
    @Autowired
    private PasswordPolicyService service;

    @GetMapping
    public PasswordPolicy getPolicy() {
        return service.getPolicy();
    }

    @PutMapping
    public PasswordPolicy savePolicy(@RequestBody PasswordPolicy policy) {
        return service.savePolicy(policy);
    }
}