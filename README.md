| **Endpoint**    | `POST http://localhost:8081/api/auth/login`           |
|-----------------|------------------------------------------------------|
| **Body Data**   | JSON con credenciales válidas                        |
| **Header**      | `Content-Type: application/json`                     |

> 🔍 *Captura 1*: Configuración inicial en JMeter  
> ![Configuración HTTP Request](https://i.imgur.com/7jK9X2L.png)  
> *Fuente: Captura de pantalla del entorno de JMeter*

---

### ⚠️ Error Inicial: `429 Too Many Requests`

Al ejecutar la prueba, obtuvimos el siguiente error:

```json
{"error":"Demasiados intentos de login. Intente nuevamente en 1 minuto."}
```

❌ **¿Por qué ocurrió?**

El backend tiene un mecanismo de rate limiting (protección contra ataques de fuerza bruta).  
Al simular 10 usuarios en solo 10 segundos, el sistema interpretó esto como un ataque y bloqueó temporalmente el endpoint.

---

🔧 **Depuración y Solución**

Para resolver este problema, ajustamos la configuración de JMeter:

1. **Reducción de la tasa de solicitudes**
   - Cambiamos Ramp-Up Period a 60 segundos.
   - Aumentamos el Constant Timer a 5000 ms (5 segundos entre cada solicitud).

2. **Ajuste de usuarios**
   - Redujimos de 10 a 5 usuarios para evitar sobrecargar el sistema.

3. **Verificación de credenciales**
   - Confirmamos que el usuario admin@erp.com existe en la base de datos.
   - Validamos que la contraseña sea correcta (Admin1234*).