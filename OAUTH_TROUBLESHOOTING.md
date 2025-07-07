# Solución de Problemas de OAuth2 - ERP SENA

## Problemas Identificados

### 1. Error 401 en endpoints de prueba
- **Problema**: Los endpoints `/api/test/**` devuelven 401 Unauthorized
- **Causa**: El JwtAuthenticationFilter no excluye correctamente las rutas de prueba
- **Solución**: Ya corregido en el código

### 2. OAuth2 no funciona correctamente
- **Problema**: El login con Google OAuth no redirige correctamente
- **Posibles causas**:
  - Credenciales de Google OAuth incorrectas
  - URLs de redirección mal configuradas
  - Configuración en Google Cloud Console incompleta

## Configuración de Google OAuth

### Credenciales Actuales
```
Client ID: 1020550477577-p2agvl0se7daqnfv9k0vijg05fs1ol0d.apps.googleusercontent.com
Client Secret: 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
Redirect URI: http://localhost:8081/login/oauth2/code/google
```

### Pasos para Verificar en Google Cloud Console

1. **Ir a Google Cloud Console**
   - URL: https://console.cloud.google.com/
   - Proyecto: ERP-SENA

2. **Verificar APIs Habilitadas**
   - Google+ API
   - Google OAuth2 API
   - Google Identity API

3. **Verificar Credenciales OAuth2**
   - Ir a "APIs & Services" > "Credentials"
   - Verificar que el Client ID y Client Secret coincidan
   - Verificar que las URLs de redirección autorizadas incluyan:
     - `http://localhost:8081/login/oauth2/code/google`
     - `http://localhost:3001/dashboard`

4. **Verificar Dominios Autorizados**
   - Agregar `localhost` a los dominios autorizados
   - Agregar `localhost:8081` y `localhost:3001` si es necesario

### URLs de Redirección Autorizadas
```
http://localhost:8081/login/oauth2/code/google
http://localhost:3001/dashboard
http://localhost:3001/login
```

### Orígenes JavaScript Autorizados
```
http://localhost:3001
http://localhost:8081
```

## Pruebas de Diagnóstico

### 1. Probar endpoint de salud
```bash
curl http://localhost:8081/api/test/health
```

### 2. Probar estado de OAuth
```bash
curl http://localhost:8081/api/test/oauth-status
```

### 3. Probar redirección OAuth
1. Ir a: http://localhost:3001/login
2. Completar reCAPTCHA
3. Hacer clic en "Iniciar sesión con Google"
4. Verificar que redirija a Google
5. Verificar que después de autenticarse redirija correctamente

## Logs de Debug

### Backend
Los logs de debug están habilitados en `application.properties`:
```
logging.level.org.springframework.security=DEBUG
logging.level.org.springframework.security.oauth2=DEBUG
logging.level.org.springframework.web=DEBUG
```

### Frontend
Verificar en la consola del navegador:
- Errores de red
- Errores de JavaScript
- Redirecciones fallidas

## Soluciones Comunes

### 1. Si OAuth redirige a error
- Verificar que las credenciales sean correctas
- Verificar que las URLs de redirección estén autorizadas
- Verificar que las APIs estén habilitadas

### 2. Si el frontend no recibe tokens
- Verificar que el backend esté ejecutándose en puerto 8081
- Verificar que el frontend esté ejecutándose en puerto 3001
- Verificar la configuración CORS

### 3. Si hay errores de CORS
- Verificar la configuración CORS en SecurityConfig
- Verificar que los orígenes estén permitidos

## Comandos para Reiniciar Servicios

### Backend
```bash
cd backend
mvn spring-boot:run
```

### Frontend
```bash
cd frontend-erp
npm start
```

## Verificación Final

1. Backend ejecutándose en puerto 8081
2. Frontend ejecutándose en puerto 3001
3. Base de datos MySQL ejecutándose
4. Credenciales de Google OAuth configuradas correctamente
5. URLs de redirección autorizadas en Google Cloud Console 