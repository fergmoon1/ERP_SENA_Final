package com.empresa.erp.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/indicadores")
public class IndicadoresController {
    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping
    public Map<String, Object> getIndicadores() {
        Map<String, Object> indicadores = new HashMap<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate hoy = LocalDate.now();
        // Simulación de histórico y variación para cada indicador
        // Puedes reemplazar estos valores por los reales de la API si lo deseas
        indicadores.put("USD/COP", Map.of(
            "valor", 4100.0,
            "anterior", 4080.0,
            "variacion", ((4100.0-4080.0)/4080.0)*100,
            "fecha", hoy.format(formatter),
            "historico", new double[]{4050, 4060, 4070, 4080, 4090, 4100, 4100}
        ));
        indicadores.put("USD/EUR", Map.of(
            "valor", 0.92,
            "anterior", 0.91,
            "variacion", ((0.92-0.91)/0.91)*100,
            "fecha", hoy.format(formatter),
            "historico", new double[]{0.90, 0.91, 0.91, 0.91, 0.92, 0.92, 0.92}
        ));
        indicadores.put("EUR/COP", Map.of(
            "valor", 4450.0,
            "anterior", 4440.0,
            "variacion", ((4450.0-4440.0)/4440.0)*100,
            "fecha", hoy.format(formatter),
            "historico", new double[]{4400, 4410, 4420, 4430, 4440, 4450, 4450}
        ));
        indicadores.put("PetroleoBrent", Map.of(
            "valor", 82.15,
            "anterior", 81.50,
            "variacion", ((82.15-81.50)/81.50)*100,
            "fecha", hoy.format(formatter),
            "historico", new double[]{80.0, 80.5, 81.0, 81.5, 82.0, 82.15, 82.15}
        ));
        indicadores.put("Cafe", Map.of(
            "valor", 1.85,
            "anterior", 1.80,
            "variacion", ((1.85-1.80)/1.80)*100,
            "fecha", hoy.format(formatter),
            "historico", new double[]{1.75, 1.78, 1.80, 1.82, 1.83, 1.85, 1.85}
        ));
        indicadores.put("Oro", Map.of(
            "valor", 2320.50,
            "anterior", 2310.00,
            "variacion", ((2320.50-2310.00)/2310.00)*100,
            "fecha", hoy.format(formatter),
            "historico", new double[]{2300, 2305, 2310, 2315, 2320, 2320.5, 2320.5}
        ));
        indicadores.put("Bitcoin", Map.of(
            "valor", 65000.0,
            "anterior", 64500.0,
            "variacion", ((65000.0-64500.0)/64500.0)*100,
            "fecha", hoy.format(formatter),
            "historico", new double[]{63000, 63500, 64000, 64500, 64800, 65000, 65000}
        ));
        indicadores.put("IPC_Colombia", Map.of(
            "valor", 13.34,
            "anterior", 13.30,
            "variacion", ((13.34-13.30)/13.30)*100,
            "fecha", hoy.format(formatter),
            "historico", new double[]{13.10, 13.15, 13.20, 13.25, 13.30, 13.34, 13.34}
        ));
        indicadores.put("SP500", Map.of(
            "valor", 5200.12,
            "anterior", 5180.00,
            "variacion", ((5200.12-5180.00)/5180.00)*100,
            "fecha", hoy.format(formatter),
            "historico", new double[]{5100, 5120, 5150, 5170, 5180, 5200.12, 5200.12}
        ));
        indicadores.put("DowJones", Map.of(
            "valor", 39000.45,
            "anterior", 38900.00,
            "variacion", ((39000.45-38900.00)/38900.00)*100,
            "fecha", hoy.format(formatter),
            "historico", new double[]{38700, 38800, 38850, 38900, 38950, 39000.45, 39000.45}
        ));
        indicadores.put("TasaInteresColombia", Map.of(
            "valor", 13.25,
            "anterior", 13.20,
            "variacion", ((13.25-13.20)/13.20)*100,
            "fecha", hoy.format(formatter),
            "historico", new double[]{13.0, 13.05, 13.10, 13.15, 13.20, 13.25, 13.25}
        ));
        return indicadores;
    }
} 