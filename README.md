# ERP SENA - Sistema de Gestión Empresarial

## Descripción
Sistema ERP (Enterprise Resource Planning) desarrollado para gestionar procesos empresariales, incluyendo gestión de usuarios, inventario, pedidos, productos y más.

## Estructura del Proyecto
El proyecto está dividido en dos componentes principales:

### Frontend (`frontend-erp/`)
- Desarrollado con React.js
- Estructura de componentes reutilizables
- Gestión de estado con Redux/Context API
- Estilos modularizados con CSS

### Backend (`backend/`)
- Desarrollado con Spring Boot (Java)
- Arquitectura REST
- Seguridad con Spring Security
- Base de datos MySQL

## Requisitos Previos
- Node.js (v14 o superior)
- Java JDK 11 o superior
- MySQL 8.0 o superior
- Maven

## Instalación y Configuración

### Backend
1. Navegar al directorio backend:
```bash
cd backend
```

2. Instalar dependencias con Maven:
```bash
mvn clean install
```

3. Configurar la base de datos:
- Crear una base de datos MySQL
- Configurar las credenciales en `application.properties`

4. Ejecutar el servidor:
```bash
mvn spring-boot:run
```

### Frontend
1. Navegar al directorio frontend:
```bash
cd frontend-erp
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar la aplicación:
```bash
npm start
```

## Arquitectura y Capas

### Capa de Presentación (Frontend)
- **Componentes**: React.js
- **Estilos**: CSS Modules
- **Estado**: Redux/Context API
- **Routing**: React Router
- **Comunicación**: Axios para peticiones HTTP

### Capa de Negocio (Backend)
- **Framework**: Spring Boot
- **Seguridad**: Spring Security, JWT
- **API**: REST Controllers
- **Servicios**: Business Logic
- **DTO**: Data Transfer Objects

### Capa de Datos
- **ORM**: JPA/Hibernate
- **Base de datos**: MySQL
- **Repositorios**: Spring Data JPA

## Seguridad
- Autenticación basada en JWT
- Roles y permisos de usuario
- Encriptación de contraseñas
- Validación de tokens
- Protección contra CSRF
- Headers de seguridad HTTP

## Mapa de Navegación
- **Login** `/login`
- **Dashboard** `/dashboard`
- **Usuarios** `/usuarios`
- **Productos** `/productos`
- **Inventario** `/inventario`
- **Pedidos** `/pedidos`
- **Reportes** `/reportes`
- **Configuración** `/configuracion`

## Metodología de Desarrollo
- Metodología Ágil (Scrum)
- Control de versiones con Git
- Pruebas automatizadas con Postman
- Desarrollo basado en componentes
- Integración continua

## Librerías Principales

### Frontend
- React.js
- React Router
- Axios
- Material-UI/Bootstrap
- Redux/Context API
- React Icons
- Moment.js

### Backend
- Spring Boot
- Spring Security
- Spring Data JPA
- Lombok
- JWT
- Jackson
- MySQL Connector

## Control de Versiones
El proyecto utiliza Git como sistema de control de versiones. Se recomienda seguir las siguientes convenciones para commits:

- feat: Nuevas características
- fix: Corrección de errores
- docs: Documentación
- style: Cambios de estilo
- refactor: Refactorización de código
- test: Añadir o modificar pruebas

## Pruebas
- Pruebas unitarias con JUnit
- Pruebas de integración
- Colecciones de Postman para pruebas de API
- Pruebas end-to-end

## Componentes Reutilizables
- Formularios genéricos
- Tablas de datos
- Componentes de navegación
- Modales
- Componentes de carga
- Notificaciones
- Validadores

## Soporte y Contacto
Para soporte técnico o consultas, contactar al equipo de desarrollo a través del sistema de issues de Git.

## Licencia
Proyecto desarrollado para SENA. Todos los derechos reservados.
