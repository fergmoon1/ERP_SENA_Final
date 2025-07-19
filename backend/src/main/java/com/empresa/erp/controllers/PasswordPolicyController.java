package com.empresa.erp.controllers;

import com.empresa.erp.models.PasswordPolicy;
import com.empresa.erp.services.PasswordPolicyService;
import com.empresa.erp.services.AuditLogService;
import com.empresa.erp.models.AuditLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/password-policy")
@CrossOrigin(origins = "*")
public class PasswordPolicyController {
    @Autowired
    private PasswordPolicyService service;
    @Autowired
    private AuditLogService auditLogService;

    @GetMapping
    public PasswordPolicy getPolicy() {
        return service.getPolicy();
    }

    @PutMapping
    public PasswordPolicy savePolicy(@RequestBody PasswordPolicy policy, HttpServletRequest request) {
        PasswordPolicy updated = service.savePolicy(policy);
        auditLogService.save(new AuditLog(
            "sistema",
            "EDITAR", "PasswordPolicy",
            "Política de contraseñas editada desde IP: " + request.getRemoteAddr(),
            "info"
        ));
        return updated;
    }
}