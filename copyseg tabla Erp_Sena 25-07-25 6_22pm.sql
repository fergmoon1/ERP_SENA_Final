CREATE DATABASE  IF NOT EXISTS `erp_sena` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `erp_sena`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: erp_sena
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `audit_log`
--

DROP TABLE IF EXISTS `audit_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_log` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `accion` varchar(255) DEFAULT NULL,
  `detalle` varchar(1000) DEFAULT NULL,
  `fecha` datetime(6) DEFAULT NULL,
  `modulo` varchar(255) DEFAULT NULL,
  `severidad` varchar(255) DEFAULT NULL,
  `usuario` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_log`
--

LOCK TABLES `audit_log` WRITE;
/*!40000 ALTER TABLE `audit_log` DISABLE KEYS */;
INSERT INTO `audit_log` VALUES (1,'LOGIN','Login exitoso desde IP: 127.0.0.1','2025-07-19 19:27:48.274379','Autenticación','info','admin@erp.com'),(2,'LOGIN','Login exitoso desde IP: 127.0.0.1','2025-07-19 19:43:02.057880','Autenticación','info','admin@erp.com'),(3,'LOGOUT','Logout exitoso desde IP: 127.0.0.1','2025-07-21 16:14:55.801610','Autenticación','info','admin@erp.com'),(4,'LOGIN','Login exitoso desde IP: 127.0.0.1','2025-07-23 16:33:44.160474','Autenticación','info','admin@erp.com'),(5,'LOGIN','Login exitoso desde IP: 127.0.0.1','2025-07-23 16:40:21.317378','Autenticación','info','admin@erp.com'),(6,'LOGIN','Login exitoso desde IP: 127.0.0.1','2025-07-23 19:41:23.253686','Autenticación','info','admin@erp.com'),(7,'LOGOUT','Logout exitoso desde IP: 0:0:0:0:0:0:0:1','2025-07-23 20:06:59.987582','Autenticación','info','dim.dei@gmail.com'),(8,'LOGIN','Login exitoso desde IP: 127.0.0.1','2025-07-24 19:16:33.885486','Autenticación','info','admin@erp.com'),(9,'LOGIN','Login exitoso desde IP: 127.0.0.1','2025-07-25 06:10:22.177483','Autenticación','info','admin@erp.com'),(10,'LOGIN','Login exitoso desde IP: 127.0.0.1','2025-07-25 06:31:41.954767','Autenticación','info','admin@erp.com'),(11,'LOGIN','Login exitoso desde IP: 127.0.0.1','2025-07-25 09:14:58.090467','Autenticación','info','admin@erp.com'),(12,'LOGIN','Login exitoso desde IP: 127.0.0.1','2025-07-25 10:34:11.982761','Autenticación','info','admin@erp.com'),(13,'LOGIN','Login exitoso desde IP: 127.0.0.1','2025-07-25 11:32:50.551689','Autenticación','info','admin@erp.com'),(14,'LOGIN','Error de login desde IP: 127.0.0.1. Motivo: Usuario o contraseña incorrectos','2025-07-25 11:33:21.389476','Autenticación','critical','dim.dei@gmail.com'),(15,'LOGIN','Intento fallido de login (reCAPTCHA) desde IP: 127.0.0.1','2025-07-25 11:33:33.744462','Autenticación','warning','dim.dei@gmail.com'),(16,'LOGIN','Error de login desde IP: 127.0.0.1. Motivo: Usuario o contraseña incorrectos','2025-07-25 11:33:58.344555','Autenticación','critical','dim.dei@gmail.com'),(17,'LOGIN','Error de login desde IP: 127.0.0.1. Motivo: Usuario o contraseña incorrectos','2025-07-25 11:34:25.039360','Autenticación','critical','dim.dei@gmail.com'),(18,'LOGIN','Intento fallido de login (reCAPTCHA) desde IP: 127.0.0.1','2025-07-25 11:34:50.474083','Autenticación','warning','juana.perez@erp.com'),(19,'LOGIN','Login exitoso desde IP: 127.0.0.1','2025-07-25 11:35:25.046376','Autenticación','info','juana.perez@erp.com'),(20,'LOGIN','Login exitoso desde IP: 127.0.0.1','2025-07-25 11:35:48.093661','Autenticación','info','doug.jones@erp.com'),(21,'LOGIN','Login exitoso desde IP: 127.0.0.1','2025-07-25 11:36:11.901554','Autenticación','info','admin@erp.com'),(22,'LOGIN','Error de login desde IP: 127.0.0.1. Motivo: Usuario o contraseña incorrectos','2025-07-25 11:37:04.048472','Autenticación','critical','dim.dei@gmail.com'),(23,'LOGIN','Intento fallido de login (reCAPTCHA) desde IP: 127.0.0.1','2025-07-25 11:37:17.026584','Autenticación','warning','admin@erp.com'),(24,'LOGIN','Login exitoso desde IP: 127.0.0.1','2025-07-25 11:37:35.083234','Autenticación','info','admin@erp.com'),(25,'LOGIN','Login exitoso desde IP: 127.0.0.1','2025-07-25 11:54:09.426003','Autenticación','info','dim.dei@gmail.com'),(26,'LOGIN','Login exitoso desde IP: 127.0.0.1','2025-07-25 14:11:37.923196','Autenticación','info','admin@erp.com'),(27,'LOGIN','Login exitoso desde IP: 127.0.0.1','2025-07-25 15:17:01.673213','Autenticación','info','juana.perez@erp.com'),(28,'EDITAR','Producto editado: Impresora HP desde IP: 127.0.0.1','2025-07-25 15:27:13.197981','Productos','info','sistema'),(29,'CREAR','Producto creado: impresora hp desde IP: 127.0.0.1','2025-07-25 15:28:01.005254','Productos','info','sistema'),(30,'LOGIN','Login exitoso desde IP: 127.0.0.1','2025-07-25 15:30:34.079635','Autenticación','info','admin@erp.com'),(31,'CREAR','Producto creado: Impesora HP desde IP: 127.0.0.1','2025-07-25 15:31:17.797764','Productos','info','sistema'),(32,'CREAR','Producto creado: aaaaaaaaaaaaaaaaaaa desde IP: 127.0.0.1','2025-07-25 15:32:28.725320','Productos','info','sistema'),(33,'ELIMINAR','Producto eliminado: aaaaaaaaaaaaaaaaaaa desde IP: 127.0.0.1','2025-07-25 15:32:52.538831','Productos','warning','sistema'),(34,'EDITAR','Usuario editado desde IP: 127.0.0.1','2025-07-25 15:45:58.386130','Usuarios','info','admin@erp.com'),(35,'CREAR','Usuario creado desde IP: 127.0.0.1','2025-07-25 15:47:19.128720','Usuarios','info','ihogh@gmail.com'),(36,'ELIMINAR','Usuario eliminado desde IP: 127.0.0.1','2025-07-25 15:48:06.316154','Usuarios','warning','ihogh@gmail.com'),(37,'EDITAR','Usuario editado desde IP: 127.0.0.1','2025-07-25 15:49:46.856234','Usuarios','info','admin@erp.com'),(38,'LOGIN','Login exitoso desde IP: 127.0.0.1','2025-07-25 18:19:05.031591','Autenticación','info','admin@erp.com');
/*!40000 ALTER TABLE `audit_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) DEFAULT NULL,
  `correo` varchar(100) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `movil` varchar(20) DEFAULT NULL,
  `tel_trabajo` varchar(20) DEFAULT NULL,
  `web` varchar(100) DEFAULT NULL,
  `cargo` varchar(100) DEFAULT NULL,
  `nit` varchar(30) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `direccion_fiscal` varchar(255) DEFAULT NULL,
  `ciudad_fiscal` varchar(100) DEFAULT NULL,
  `provincia_fiscal` varchar(100) DEFAULT NULL,
  `pais_fiscal` varchar(100) DEFAULT NULL,
  `direccion_correspondencia` varchar(255) DEFAULT NULL,
  `ciudad_correspondencia` varchar(100) DEFAULT NULL,
  `provincia_correspondencia` varchar(100) DEFAULT NULL,
  `pais_correspondencia` varchar(100) DEFAULT NULL,
  `direccion_entrega` varchar(255) DEFAULT NULL,
  `ciudad_entrega` varchar(100) DEFAULT NULL,
  `provincia_entrega` varchar(100) DEFAULT NULL,
  `pais_entrega` varchar(100) DEFAULT NULL,
  `observaciones` text,
  `imagen_url` varchar(255) DEFAULT NULL,
  `fecha_creacion` date DEFAULT NULL,
  `etapa` varchar(32) DEFAULT 'nuevo',
  `direccion` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Teresa','García','teresa@email.com','3001112222','3101112222','6011112222','www.teresagarcia.com','Gerente','900123456','1985-03-15','Individual','Calle 1 #10-20','Bogotá','Cundinamarca','Colombia','Carrera 2 #20-30','Bogotá','Cundinamarca','Colombia','Avenida 3 #30-40','Bogotá','Cundinamarca','Colombia','Cliente importante, requiere seguimiento mensual.','/api/files/clientes/teresa.png','2025-07-17','nuevo',NULL,NULL),(2,'Juan','Moreno','juan@email.com','3002223333','3102223333','6012223333','www.juanmoreno.com','Director','800654321','1990-07-22','Empresa','Calle 2 #11-21','Medellín','Antioquia','Colombia','Carrera 3 #21-31','Medellín','Antioquia','Colombia','Avenida 4 #31-41','Medellín','Antioquia','Colombia','Pendiente de enviar documentos fiscales.','/api/files/clientes/juan.png','2025-07-17','espera',NULL,NULL),(3,'Andres','López','andres@email.com','3003334444','3103334444','6013334444','www.andressanchez.com','Jefe Compras','700987654','1982-11-05','Individual','Calle 3 #12-22','Cali','Valle','Colombia','Carrera 4 #22-32','Cali','Valle','Colombia','Avenida 5 #32-42','Cali','Valle','Colombia','Solicita cotización personalizada.','/api/files/clientes/andres.png','2025-07-17','asignado','Calle 50 #10-20, Bogotá D.C.',NULL),(4,'Camila','García','camila.rios@email.com','3001002001','3101002001','6011002001','www.camilarios.com','Analista','900100001','1992-04-10','Individual','Calle 10 #20-30','Bogotá','Cundinamarca','Colombia','Carrera 11 #21-31','Bogotá','Cundinamarca','Colombia','Avenida 12 #22-32','Bogotá','Cundinamarca','Colombia','Cliente frecuente, solicita reportes trimestrales.','/api/files/clientes/camila.png','2025-07-17','nuevo','Carrera 7 #45-67, Cali',NULL),(5,'Santiago','Hernández','santiago.mejia@email.com','3002003002','3102003002','6012003002','www.santiagomejia.com','Supervisor','900100002','1988-09-15','Individual','Calle 13 #23-33','Medellín','Antioquia','Colombia','Carrera 14 #24-34','Medellín','Antioquia','Colombia','Avenida 15 #25-35','Medellín','Antioquia','Colombia','Solicita cotización anual.','/api/files/clientes/santiago.png','2025-07-17','espera','Avenida 6 #23-45, Medellín',NULL),(6,'Valentina','Fernández','valentina.gomez@email.com','3003004003','3103004003','6013004003','www.valentinagomez.com','Gerente','900100003','1995-12-20','Individual','Calle 16 #26-36','Cali','Valle','Colombia','Carrera 17 #27-37','Cali','Valle','Colombia','Avenida 18 #28-38','Cali','Valle','Colombia','Pendiente de enviar documentos.','/api/files/clientes/valentina.png','2025-07-17','asignado','Calle 15 #8-90, Bucaramanga',NULL),(7,'Empresa Alfa','','contacto@alfa.com','6014005004','3104005004','6014005004','www.empresa-alfa.com','Director','800200001',NULL,'Empresa','Calle 19 #29-39','Barranquilla','Atlántico','Colombia','Carrera 20 #30-40','Barranquilla','Atlántico','Colombia','Avenida 21 #31-41','Barranquilla','Atlántico','Colombia','Empresa de tecnología.','/api/files/clientes/alfa.png',NULL,NULL,'Calle 1 # 12-35',NULL),(8,'Empresa Beta',NULL,'info@beta.com','6015006005','3105006005','6015006005','www.empresa-beta.com','Jefe Compras','800200002',NULL,'Empresa','Calle 22 #32-42','Cartagena','Bolívar','Colombia','Carrera 23 #33-43','Cartagena','Bolívar','Colombia','Avenida 24 #34-44','Cartagena','Bolívar','Colombia','Pendiente de validación fiscal.','/api/files/clientes/beta.png','2025-07-17','factura',NULL,NULL),(9,'Laura','Martínez','laura.martinez@email.com','3006007006','3106007006','6016007006','www.lauramartinez.com','Asistente','900100004','1993-07-11','Individual','Calle 25 #35-45','Pereira','Risaralda','Colombia','Carrera 26 #36-46','Pereira','Risaralda','Colombia','Avenida 27 #37-47','Pereira','Risaralda','Colombia','Cliente nuevo, requiere capacitación.','/api/files/clientes/laura.png','2025-07-17','nuevo',NULL,NULL),(10,'Carlos','Torres','carlos.torres@email.com','3007008007','3107008007','6017008007','www.carlostorres.com','Contador','900100005','1980-02-28','Individual','Calle 28 #38-48','Bucaramanga','Santander','Colombia','Carrera 29 #39-49','Bucaramanga','Santander','Colombia','Avenida 30 #40-50','Bucaramanga','Santander','Colombia','Solicita factura electrónica.','/api/files/clientes/carlos.png','2025-07-17','espera',NULL,NULL),(11,'Empresa Gamma',NULL,'ventas@gamma.com','6018009008','3108009008','6018009008','www.empresa-gamma.com','Gerente','800200003',NULL,'Empresa','Calle 31 #41-51','Manizales','Caldas','Colombia','Carrera 32 #42-52','Manizales','Caldas','Colombia','Avenida 33 #43-53','Manizales','Caldas','Colombia','Empresa de manufactura.','/api/files/clientes/gamma.png','2025-07-17','asignado',NULL,NULL),(12,'Diana','Ramírez','diana.ramirez@email.com','3009001009','3109001009','6019001009','www.dianaramirez.com','Analista','900100006','1991-10-05','Individual','Calle 34 #44-54','Santa Marta','Magdalena','Colombia','Carrera 35 #45-55','Santa Marta','Magdalena','Colombia','Avenida 36 #46-56','Santa Marta','Magdalena','Colombia','Cliente con historial de compras alto.','/api/files/clientes/diana.png','2025-07-17','progreso',NULL,NULL),(13,'Empresa Delta',NULL,'contacto@delta.com','6020001010','3120001010','6020001010','www.empresa-delta.com','Director','800200004',NULL,'Empresa','Calle 37 #47-57','Cúcuta','Norte de Santander','Colombia','Carrera 38 #48-58','Cúcuta','Norte de Santander','Colombia','Avenida 39 #49-59','Cúcuta','Norte de Santander','Colombia','Empresa de logística.','/api/files/clientes/delta.png','2025-07-17','factura',NULL,NULL),(14,'Felipe','García','felipe.garcia@email.com','3010002011','3110002011','6010002011','www.felipegarcia.com','Supervisor','900100007','1987-06-18','Individual','Calle 40 #50-60','Ibagué','Tolima','Colombia','Carrera 41 #51-61','Ibagué','Tolima','Colombia','Avenida 42 #52-62','Ibagué','Tolima','Colombia','Solicita soporte técnico.','/api/files/clientes/felipe.png','2025-07-17','nuevo',NULL,NULL),(15,'Empresa Epsilon',NULL,'info@epsilon.com','6021003012','3121003012','6021003012','www.empresa-epsilon.com','Jefe Compras','800200005',NULL,'Empresa','Calle 43 #53-63','Villavicencio','Meta','Colombia','Carrera 44 #54-64','Villavicencio','Meta','Colombia','Avenida 45 #55-65','Villavicencio','Meta','Colombia','Pendiente de visita comercial.','/api/files/clientes/epsilon.png','2025-07-17','espera',NULL,NULL),(16,'Natalia','Vargas','natalia.vargas@email.com','3012003013','3112003013','6012003013','www.nataliavargas.com','Asistente','900100008','1994-03-22','Individual','Calle 46 #56-66','Neiva','Huila','Colombia','Carrera 47 #57-67','Neiva','Huila','Colombia','Avenida 48 #58-68','Neiva','Huila','Colombia','Cliente potencial para nuevos productos.','/api/files/clientes/natalia.png','2025-07-17','asignado',NULL,NULL),(17,'Empresa Zeta',NULL,'ventas@zeta.com','6022004014','3122004014','6022004014','www.empresa-zeta.com','Gerente','800200006',NULL,'Empresa','Calle 49 #59-69','Pasto','Nariño','Colombia','Carrera 50 #60-70','Pasto','Nariño','Colombia','Avenida 51 #61-71','Pasto','Nariño','Colombia','Empresa de servicios.','/api/files/clientes/zeta.png','2025-07-17','progreso',NULL,NULL),(18,'Andrés','Pérez','andres.perez@email.com','3013004015','3113004015','6013004015','www.andresperez.com','Analista','900100009','1990-11-30','Individual','Calle 52 #62-72','Montería','Córdoba','Colombia','Carrera 53 #63-73','Montería','Córdoba','Colombia','Avenida 54 #64-74','Montería','Córdoba','Colombia','Solicita información de productos.','/api/files/clientes/andresp.png','2025-07-17','factura',NULL,NULL),(19,'Empresa Omega',NULL,'contacto@omega.com','6023005016','3123005016','6023005016','www.empresa-omega.com','Director','800200007',NULL,'Empresa','Calle 55 #65-75','Sincelejo','Sucre','Colombia','Carrera 56 #66-76','Sincelejo','Sucre','Colombia','Avenida 57 #67-77','Sincelejo','Sucre','Colombia','Empresa de alimentos.','/api/files/clientes/omega.png','2025-07-17','nuevo',NULL,NULL),(20,'Juliana','Suárez','juliana.suarez@email.com','3014005017','3114005017','6014005017','www.julianasuarez.com','Jefe Compras','900100010','1996-08-14','Individual','Calle 58 #68-78','Tunja','Boyacá','Colombia','Carrera 59 #69-79','Tunja','Boyacá','Colombia','Avenida 60 #70-80','Tunja','Boyacá','Colombia','Cliente nuevo, requiere asesoría.','/api/files/clientes/juliana.png','2025-07-17','espera',NULL,NULL),(21,'Empresa Sigma',NULL,'info@sigma.com','6024006018','3124006018','6024006018','www.empresa-sigma.com','Gerente','800200008',NULL,'Empresa','Calle 61 #71-81','Armenia','Quindío','Colombia','Carrera 62 #72-82','Armenia','Quindío','Colombia','Avenida 63 #73-83','Armenia','Quindío','Colombia','Empresa de consultoría.','/api/files/clientes/sigma.png','2025-07-17','asignado',NULL,NULL),(22,'Sebastián','Morales','sebastian.morales@email.com','3015006019','3115006019','6015006019','www.sebastianmorales.com','Supervisor','900100011','1989-05-25','Individual','Calle 64 #74-84','Popayán','Cauca','Colombia','Carrera 65 #75-85','Popayán','Cauca','Colombia','Avenida 66 #76-86','Popayán','Cauca','Colombia','Solicita visita técnica.','/api/files/clientes/sebastian.png','2025-07-17','progreso',NULL,NULL),(23,'Empresa Theta',NULL,'ventas@theta.com','6025007020','3125007020','6025007020','www.empresa-theta.com','Director','800200009',NULL,'Empresa','Calle 67 #77-87','Florencia','Caquetá','Colombia','Carrera 68 #78-88','Florencia','Caquetá','Colombia','Avenida 69 #79-89','Florencia','Caquetá','Colombia','Empresa de transporte.','/api/files/clientes/theta.png','2025-07-17','factura',NULL,NULL),(24,'María','López','maria.lopez@empresa.com','3001234567',NULL,NULL,NULL,NULL,'CC123456789',NULL,'Individual',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Calle 80 #12-34, Barranquilla',NULL),(25,'Carlos','Hernández','carlos.hernandez@tech.com','3109876543',NULL,NULL,NULL,NULL,'CC987654321',NULL,'Individual',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Carrera 7 #45-67, Bogotá D.C.',NULL),(26,'Ana','García','ana.garcia@consulting.com','3157894561',NULL,NULL,NULL,NULL,'CC456789123',NULL,'Individual',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Avenida 6 #23-45, Medellín',NULL),(27,'Luis','Fernández','luis.fernandez@logistics.com','3204567890',NULL,NULL,NULL,NULL,'CC789123456',NULL,'Individual',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Calle 15 #8-90, Cali',NULL),(28,'Patricia','Moreno','patricia.moreno@services.com','3256789012',NULL,NULL,NULL,NULL,'CC321654987',NULL,'Individual',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Carrera 20 #10-30, Bucaramanga',NULL),(29,'Roberto','Jiménez','roberto.jimenez@imports.com','3301234567',NULL,NULL,NULL,NULL,'CC654321987',NULL,'Individual',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Avenida 5 #67-89, Cartagena',NULL),(30,'Sofía','Torres','sofia.torres@exports.com','3359876543',NULL,NULL,NULL,NULL,'CC147258369',NULL,'Individual',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Calle 25 #15-67, Pereira',NULL),(31,'Diego','Ruiz','diego.ruiz@manufacturing.com','3404567890',NULL,NULL,NULL,NULL,'CC963852741',NULL,'Individual',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Carrera 12 #34-56, Manizales',NULL),(32,'Tecnología Avanzada S.A.','','contacto@tecnologiaavanzada.com','6012345678',NULL,NULL,NULL,NULL,'NIT900123456-7',NULL,'Empresa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Calle 100 #15-30, Bogotá D.C.',NULL),(33,'Importaciones Globales Ltda.','','info@importacionesglobales.com','6045678901',NULL,NULL,NULL,NULL,'NIT800987654-3',NULL,'Empresa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Carrera 50 #25-80, Medellín',NULL),(34,'Servicios Integrales SAS','','ventas@serviciosintegrales.com','6054321098',NULL,NULL,NULL,NULL,'NIT700456789-0',NULL,'Empresa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Avenida 4 #67-89, Cali',NULL),(35,'Distribuidora Nacional Express','','contacto@distribuidoranacional.com','6067890123',NULL,NULL,NULL,NULL,'NIT600678901-2',NULL,'Empresa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Calle 30 #45-67, Barranquilla',NULL),(36,'Comercializadora del Valle S.A.','','info@comercializadoravalle.com','6078901234',NULL,NULL,NULL,NULL,'NIT500890123-4',NULL,'Empresa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Carrera 15 #23-45, Cali',NULL),(37,'Tecnología y Sistemas Ltda.','','ventas@tecnologiaysistemas.com','6089012345',NULL,NULL,NULL,NULL,'NIT400567890-1',NULL,'Empresa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Avenida 6 #12-34, Medellín',NULL),(38,'Logística Express Colombia','','contacto@logisticaexpress.com','6090123456',NULL,NULL,NULL,NULL,'NIT300345678-9',NULL,'Empresa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Calle 80 #10-20, Bogotá D.C.',NULL),(39,'Consultores Asociados SAS','','info@consultoresasociados.com','6101234567',NULL,NULL,NULL,NULL,'NIT200234567-8',NULL,'Empresa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Carrera 7 #45-67, Bogotá D.C.',NULL),(40,'María','López','maria.lopez@empresa.com','3001234567',NULL,NULL,NULL,NULL,'CC123456789',NULL,'Individual',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Calle 80 #12-34, Barranquilla',NULL),(41,'Carlos','Hernández','carlos.hernandez@tech.com','3109876543',NULL,NULL,NULL,NULL,'CC987654321',NULL,'Individual',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Carrera 7 #45-67, Bogotá D.C.',NULL),(42,'Ana','García','ana.garcia@consulting.com','3157894561',NULL,NULL,NULL,NULL,'CC456789123',NULL,'Individual',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Avenida 6 #23-45, Medellín',NULL),(43,'Luis','Fernández','luis.fernandez@logistics.com','3204567890',NULL,NULL,NULL,NULL,'CC789123456',NULL,'Individual',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Calle 15 #8-90, Cali',NULL),(44,'Patricia','Moreno','patricia.moreno@services.com','3256789012',NULL,NULL,NULL,NULL,'CC321654987',NULL,'Individual',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Carrera 20 #10-30, Bucaramanga',NULL),(45,'Roberto','Jiménez','roberto.jimenez@imports.com','3301234567',NULL,NULL,NULL,NULL,'CC654321987',NULL,'Individual',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Avenida 5 #67-89, Cartagena',NULL),(46,'Sofía','Torres','sofia.torres@exports.com','3359876543',NULL,NULL,NULL,NULL,'CC147258369',NULL,'Individual',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Calle 25 #15-67, Pereira',NULL),(47,'Diego','Ruiz','diego.ruiz@manufacturing.com','3404567890',NULL,NULL,NULL,NULL,'CC963852741',NULL,'Individual',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Carrera 12 #34-56, Manizales',NULL),(48,'Tecnología Avanzada S.A.','','contacto@tecnologiaavanzada.com','6012345678',NULL,NULL,NULL,NULL,'NIT900123456-7',NULL,'Empresa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Calle 100 #15-30, Bogotá D.C.',NULL),(49,'Importaciones Globales Ltda.','','info@importacionesglobales.com','6045678901',NULL,NULL,NULL,NULL,'NIT800987654-3',NULL,'Empresa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Carrera 50 #25-80, Medellín',NULL),(50,'Servicios Integrales SAS','','ventas@serviciosintegrales.com','6054321098',NULL,NULL,NULL,NULL,'NIT700456789-0',NULL,'Empresa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Avenida 4 #67-89, Cali',NULL),(51,'Distribuidora Nacional Express','','contacto@distribuidoranacional.com','6067890123',NULL,NULL,NULL,NULL,'NIT600678901-2',NULL,'Empresa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Calle 30 #45-67, Barranquilla',NULL),(52,'Comercializadora del Valle S.A.','','info@comercializadoravalle.com','6078901234',NULL,NULL,NULL,NULL,'NIT500890123-4',NULL,'Empresa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Carrera 15 #23-45, Cali',NULL),(53,'Tecnología y Sistemas Ltda.','','ventas@tecnologiaysistemas.com','6089012345',NULL,NULL,NULL,NULL,'NIT400567890-1',NULL,'Empresa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Avenida 6 #12-34, Medellín',NULL),(54,'Logística Express Colombia','','contacto@logisticaexpress.com','6090123456',NULL,NULL,NULL,NULL,'NIT300345678-9',NULL,'Empresa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Calle 80 #10-20, Bogotá D.C.',NULL),(55,'Consultores Asociados SAS','','info@consultoresasociados.com','6101234567',NULL,NULL,NULL,NULL,'NIT200234567-8',NULL,'Empresa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuevo','Carrera 7 #45-67, Bogotá D.C.',NULL);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente_backup`
--

DROP TABLE IF EXISTS `cliente_backup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente_backup` (
  `id` bigint NOT NULL DEFAULT '0',
  `correo` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `etapa` varchar(32) DEFAULT 'nuevo',
  `imagen_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente_backup`
--

LOCK TABLES `cliente_backup` WRITE;
/*!40000 ALTER TABLE `cliente_backup` DISABLE KEYS */;
INSERT INTO `cliente_backup` VALUES (1,'ventas@distribuidoraxyz.com','Calle 80 #12-34, Barranquilla','Distribuidora XYZ Ltda','6012345678','Empresa','2024-06-01 00:00:00','nuevo',NULL),(2,'stock_client@gmail.com','Calle 20 #13-45, Medellin','Cliente Stock-Test','6644578','Individual','2024-06-01 00:00:00','espera',NULL),(3,'cliente1@correo.com','Calle 50 #10-20, Bogotá','Cliente Ejemplo 1','3001112233','Individual','2024-06-01 00:00:00','asignado',NULL),(4,'empresa2@correo.com','Carrera 7 #45-67, Cali','Empresa Ejemplo 2','3202223344','Empresa','2024-06-01 00:00:00','progreso',NULL),(5,'clienteadmin@erp.com','Call 1 # 12-34','Cliente Admin','123456789','Individual',NULL,'factura',NULL),(6,'clientesupervisor@erp.com',NULL,'Cliente Supervisor','987654321',NULL,'2024-06-01 00:00:00','nuevo',NULL),(17,'cliente@test.com','Calle Test 123','Cliente Test','3001234567','Individual','2025-07-07 00:00:00','espera',NULL),(26,'teresa@email.com','Calle 1','Teresa','3001112222','Individual','2025-07-17 00:00:00','nuevo',NULL),(27,'juan@email.com','Calle 2','Juan Moreno','3002223333','Empresa','2025-07-17 00:00:00','espera',NULL),(28,'andres@email.com','Calle 3','Andres Sanchez','3003334444','Individual','2025-07-17 00:00:00','asignado',NULL),(29,'maria@email.com','Calle 4','Maria Lopez','3004445555','Empresa','2025-07-17 00:00:00','progreso',NULL),(30,'jorge@email.com','Calle 5','Jorge Andrade','3005556666','Individual','2025-07-17 00:00:00','factura',NULL);
/*!40000 ALTER TABLE `cliente_backup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compra` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `proveedor_id` bigint NOT NULL,
  `fecha` date NOT NULL,
  `numero_factura` varchar(50) DEFAULT NULL,
  `estado` varchar(20) DEFAULT 'PENDIENTE',
  `subtotal` double DEFAULT NULL,
  `descuento_total` double DEFAULT NULL,
  `iva` double DEFAULT NULL,
  `total` double DEFAULT NULL,
  `observaciones` text,
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` bigint DEFAULT NULL,
  `usuario` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `proveedor_id` (`proveedor_id`),
  KEY `FKk39qkguq7uka81tdyvhrkvppf` (`usuario_id`),
  CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedor` (`id`),
  CONSTRAINT `FKk39qkguq7uka81tdyvhrkvppf` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra`
--

LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
INSERT INTO `compra` VALUES (1,1,'2024-07-01',NULL,'PENDIENTE',12121210,0,2303029.9,14424239.9,NULL,'2025-07-25 20:34:46','2025-07-25 20:34:46',NULL,'klklkllklkklklklklk'),(2,3,'2024-07-02','FAC-007-2024','PENDIENTE',2000,100,380,2280,'Compra de impresoras','2025-06-29 19:13:33','2025-06-29 19:13:33',NULL,NULL),(3,1,'2024-06-27','FAC-001','PENDIENTE',80000,0,15200,95200,'Compra de prueba automatizada','2025-06-30 17:11:06','2025-06-30 17:11:06',NULL,NULL),(4,1,'2024-06-27','FAC-001','PENDIENTE',80000,0,15200,95200,'Compra de prueba automatizada','2025-06-30 18:32:21','2025-06-30 18:32:21',NULL,NULL),(5,1,'2024-06-27','FAC-001','PENDIENTE',80000,0,15200,95200,'Compra de prueba automatizada','2025-06-30 18:33:39','2025-06-30 18:33:39',NULL,NULL),(6,1,'2024-06-27','FAC-001','PENDIENTE',80000,0,15200,95200,'Compra de prueba automatizada','2025-06-30 18:44:50','2025-06-30 18:44:50',NULL,NULL);
/*!40000 ALTER TABLE `compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_compra`
--

DROP TABLE IF EXISTS `detalle_compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_compra` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `compra_id` bigint NOT NULL,
  `producto_id` bigint NOT NULL,
  `cantidad` int NOT NULL,
  `precio_unitario` double NOT NULL,
  `descuento` double DEFAULT NULL,
  `subtotal` double DEFAULT NULL,
  `observaciones` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `compra_id` (`compra_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `detalle_compra_ibfk_1` FOREIGN KEY (`compra_id`) REFERENCES `compra` (`id`) ON DELETE CASCADE,
  CONSTRAINT `detalle_compra_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_compra`
--

LOCK TABLES `detalle_compra` WRITE;
/*!40000 ALTER TABLE `detalle_compra` DISABLE KEYS */;
INSERT INTO `detalle_compra` VALUES (2,2,5,3,600,0,1800,NULL),(3,3,2,5,10000,0,50000,NULL),(4,3,3,2,15000,1000,29000,'Descuento especial'),(5,4,2,5,10000,0,50000,NULL),(6,4,3,2,15000,1000,29000,'Descuento especial'),(7,5,2,5,10000,0,50000,NULL),(8,5,3,2,15000,1000,29000,'Descuento especial'),(9,6,2,5,10000,0,50000,NULL),(10,6,3,2,15000,1000,29000,'Descuento especial'),(11,1,22,10,1212121,NULL,12121210,NULL);
/*!40000 ALTER TABLE `detalle_compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_pedido`
--

DROP TABLE IF EXISTS `detalle_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_pedido` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `pedido_id` bigint DEFAULT NULL,
  `producto_id` bigint DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `precio_unitario` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pedido_id` (`pedido_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedido` (`id`) ON DELETE CASCADE,
  CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_pedido`
--

LOCK TABLES `detalle_pedido` WRITE;
/*!40000 ALTER TABLE `detalle_pedido` DISABLE KEYS */;
INSERT INTO `detalle_pedido` VALUES (87,70,1,2,15000),(88,71,2,1,25000),(89,72,3,3,12000),(90,73,4,1,18000),(91,74,5,2,9500),(92,75,1,1,12000),(93,76,2,2,21000),(94,77,3,1,17500),(95,78,4,2,9900),(96,79,5,1,13500),(97,80,1,3,11000),(98,81,2,1,16000),(99,82,3,2,18500),(100,83,4,1,14200),(101,84,5,2,19800),(102,85,1,1,12050),(103,86,2,2,9900),(104,87,3,1,21000),(105,88,4,2,17500),(106,89,5,1,9900);
/*!40000 ALTER TABLE `detalle_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresa_config`
--

DROP TABLE IF EXISTS `empresa_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresa_config` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `direccion_empresa` varchar(255) DEFAULT NULL,
  `email_empresa` varchar(255) DEFAULT NULL,
  `horario_laboral` varchar(255) DEFAULT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `nombre_empresa` varchar(255) DEFAULT NULL,
  `sitio_web` varchar(255) DEFAULT NULL,
  `telefono_empresa` varchar(255) DEFAULT NULL,
  `zona_horaria` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa_config`
--

LOCK TABLES `empresa_config` WRITE;
/*!40000 ALTER TABLE `empresa_config` DISABLE KEYS */;
INSERT INTO `empresa_config` VALUES (1,'Cr 90 # 80 - 70','dim.dei@gmail.com','','a78e7500-48a4-44cc-86a6-4624baf8288c.jpg','Dimenzionar Diseño SAS','https://www.erp.com','313333333333','');
/*!40000 ALTER TABLE `empresa_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movimiento_inventario`
--

DROP TABLE IF EXISTS `movimiento_inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimiento_inventario` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `producto_id` bigint NOT NULL,
  `tipo` enum('ENTRADA','SALIDA','AJUSTE') NOT NULL,
  `cantidad` int NOT NULL,
  `stock_anterior` int NOT NULL,
  `stock_posterior` int NOT NULL,
  `fecha` datetime NOT NULL,
  `motivo` varchar(500) DEFAULT NULL,
  `usuario_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `producto_id` (`producto_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `movimiento_inventario_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`),
  CONSTRAINT `movimiento_inventario_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimiento_inventario`
--

LOCK TABLES `movimiento_inventario` WRITE;
/*!40000 ALTER TABLE `movimiento_inventario` DISABLE KEYS */;
INSERT INTO `movimiento_inventario` VALUES (1,1,'ENTRADA',10,0,10,'2024-07-01 09:00:00','Compra inicial',1),(2,2,'SALIDA',2,6,4,'2024-07-02 10:00:00','Venta a cliente',2),(3,4,'ENTRADA',5,10,15,'2024-07-03 11:00:00','Compra teclados',3),(8,2,'ENTRADA',10,6,16,'2025-06-29 14:16:15','Compra de inventario',NULL),(13,2,'ENTRADA',10,16,26,'2025-06-30 11:35:20','Compra de inventario',NULL),(14,2,'SALIDA',3,23,20,'2025-06-30 12:11:02','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(15,3,'SALIDA',1,9,8,'2025-06-30 12:11:02','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(16,2,'ENTRADA',3,23,26,'2025-06-30 12:11:03','Reversión de pedido #4 - Actualización',NULL),(17,3,'ENTRADA',1,9,10,'2025-06-30 12:11:03','Reversión de pedido #4 - Actualización',NULL),(18,2,'SALIDA',3,23,20,'2025-06-30 12:11:03','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(19,3,'SALIDA',1,9,8,'2025-06-30 12:11:03','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(20,2,'ENTRADA',3,23,26,'2025-06-30 12:11:03','Reversión de pedido #5 - Actualización',NULL),(21,3,'ENTRADA',1,9,10,'2025-06-30 12:11:03','Reversión de pedido #5 - Actualización',NULL),(22,2,'ENTRADA',10,26,36,'2025-06-30 12:11:05','Compra de inventario',NULL),(23,2,'SALIDA',3,33,30,'2025-06-30 13:32:18','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(24,3,'SALIDA',1,9,8,'2025-06-30 13:32:18','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(25,2,'ENTRADA',3,33,36,'2025-06-30 13:32:18','Reversión de pedido #6 - Actualización',NULL),(26,3,'ENTRADA',1,9,10,'2025-06-30 13:32:18','Reversión de pedido #6 - Actualización',NULL),(27,2,'SALIDA',3,33,30,'2025-06-30 13:32:18','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(28,3,'SALIDA',1,9,8,'2025-06-30 13:32:18','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(29,2,'ENTRADA',3,33,36,'2025-06-30 13:32:18','Reversión de pedido #7 - Actualización',NULL),(30,3,'ENTRADA',1,9,10,'2025-06-30 13:32:18','Reversión de pedido #7 - Actualización',NULL),(31,2,'ENTRADA',10,36,46,'2025-06-30 13:32:20','Compra de inventario',NULL),(32,2,'SALIDA',3,43,40,'2025-06-30 13:33:35','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(33,3,'SALIDA',1,9,8,'2025-06-30 13:33:35','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(34,2,'ENTRADA',3,43,46,'2025-06-30 13:33:35','Reversión de pedido #8 - Actualización',NULL),(35,3,'ENTRADA',1,9,10,'2025-06-30 13:33:35','Reversión de pedido #8 - Actualización',NULL),(36,2,'SALIDA',3,43,40,'2025-06-30 13:33:35','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(37,3,'SALIDA',1,9,8,'2025-06-30 13:33:35','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(38,2,'ENTRADA',3,43,46,'2025-06-30 13:33:35','Reversión de pedido #9 - Actualización',NULL),(39,3,'ENTRADA',1,9,10,'2025-06-30 13:33:35','Reversión de pedido #9 - Actualización',NULL),(40,2,'ENTRADA',10,46,56,'2025-06-30 13:33:39','Compra de inventario',NULL),(41,2,'SALIDA',3,53,50,'2025-06-30 13:44:46','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(42,3,'SALIDA',1,9,8,'2025-06-30 13:44:46','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(43,2,'ENTRADA',3,53,56,'2025-06-30 13:44:46','Reversión de pedido #10 - Actualización',NULL),(44,3,'ENTRADA',1,9,10,'2025-06-30 13:44:46','Reversión de pedido #10 - Actualización',NULL),(45,2,'SALIDA',3,53,50,'2025-06-30 13:44:46','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(46,3,'SALIDA',1,9,8,'2025-06-30 13:44:46','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(47,2,'ENTRADA',3,53,56,'2025-06-30 13:44:46','Reversión de pedido #11 - Actualización',NULL),(48,3,'ENTRADA',1,9,10,'2025-06-30 13:44:46','Reversión de pedido #11 - Actualización',NULL),(50,4,'SALIDA',1,14,13,'2025-07-02 19:11:53','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(51,4,'ENTRADA',1,14,15,'2025-07-02 19:11:53','Reversión de pedido #17 - Actualización',NULL),(52,4,'SALIDA',1,14,13,'2025-07-02 19:12:58','Pedido #NUEVO - Cliente: Cliente Stock-Test',NULL),(53,4,'ENTRADA',1,14,15,'2025-07-02 19:12:58','Reversión de pedido #18 - Actualización',NULL),(54,4,'SALIDA',1,14,13,'2025-07-02 19:26:35','Pedido #NUEVO - Cliente: Cliente Ejemplo 1',NULL),(55,4,'ENTRADA',1,14,15,'2025-07-02 19:26:35','Reversión de pedido #19 - Actualización',NULL),(56,2,'SALIDA',1,55,54,'2025-07-02 19:27:46','Pedido #NUEVO - Cliente: Cliente Ejemplo 1',NULL),(57,2,'ENTRADA',1,55,56,'2025-07-02 19:27:46','Reversión de pedido #20 - Actualización',NULL),(58,4,'SALIDA',1,14,13,'2025-07-02 19:38:27','Pedido #NUEVO - Cliente: Empresa Ejemplo 2',NULL),(59,4,'ENTRADA',1,14,15,'2025-07-02 19:38:27','Reversión de pedido #21 - Actualización',NULL),(60,1,'SALIDA',1,19,18,'2025-07-02 19:39:02','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(61,1,'ENTRADA',1,19,20,'2025-07-02 19:39:02','Reversión de pedido #22 - Actualización',NULL),(62,2,'SALIDA',1,55,54,'2025-07-02 19:39:32','Pedido #NUEVO - Cliente: Empresa Ejemplo 2',NULL),(63,2,'ENTRADA',1,55,56,'2025-07-02 19:39:32','Reversión de pedido #23 - Actualización',NULL),(64,2,'SALIDA',1,55,54,'2025-07-02 19:48:18','Pedido #NUEVO - Cliente: Empresa Ejemplo 2',NULL),(65,2,'ENTRADA',1,55,56,'2025-07-02 19:48:18','Reversión de pedido #24 - Actualización',NULL),(66,1,'SALIDA',2,18,16,'2025-07-03 17:53:07','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(67,2,'SALIDA',1,55,54,'2025-07-03 17:53:07','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(68,1,'ENTRADA',2,18,20,'2025-07-03 17:53:07','Reversión de pedido #35 - Actualización',NULL),(69,2,'ENTRADA',1,55,56,'2025-07-03 17:53:07','Reversión de pedido #35 - Actualización',NULL),(70,1,'ENTRADA',2,22,24,'2025-07-03 17:53:08','Reversión de pedido #1 - Eliminación',NULL),(71,2,'ENTRADA',1,57,58,'2025-07-03 17:53:08','Reversión de pedido #1 - Eliminación',NULL),(72,5,'SALIDA',1,4,3,'2025-07-05 18:34:59','Pedido #NUEVO - Cliente: Empresa Ejemplo 2',NULL),(73,3,'SALIDA',1,4,3,'2025-07-05 18:38:42','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(74,3,'SALIDA',1,2,1,'2025-07-05 18:43:50','Pedido #NUEVO - Cliente: Empresa Ejemplo 2',NULL),(75,1,'SALIDA',2,22,20,'2025-07-08 17:43:02','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(76,2,'SALIDA',1,57,56,'2025-07-08 17:43:02','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(77,1,'ENTRADA',2,22,24,'2025-07-08 17:43:05','Reversión de pedido #40 - Eliminación',NULL),(78,2,'ENTRADA',1,57,58,'2025-07-08 17:43:05','Reversión de pedido #40 - Eliminación',NULL),(79,1,'SALIDA',2,22,20,'2025-07-08 17:43:05','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(80,2,'SALIDA',1,57,56,'2025-07-08 17:43:05','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(81,1,'ENTRADA',2,22,24,'2025-07-08 17:43:07','Reversión de pedido #41 - Eliminación',NULL),(82,2,'ENTRADA',1,57,58,'2025-07-08 17:43:07','Reversión de pedido #41 - Eliminación',NULL),(83,1,'SALIDA',2,22,20,'2025-07-08 17:45:38','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(84,2,'SALIDA',1,57,56,'2025-07-08 17:45:38','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(85,1,'ENTRADA',2,22,24,'2025-07-08 17:45:40','Reversión de pedido #42 - Eliminación',NULL),(86,2,'ENTRADA',1,57,58,'2025-07-08 17:45:40','Reversión de pedido #42 - Eliminación',NULL),(87,1,'SALIDA',2,22,20,'2025-07-08 17:45:40','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(88,2,'SALIDA',1,57,56,'2025-07-08 17:45:40','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(89,1,'ENTRADA',2,22,24,'2025-07-08 17:45:43','Reversión de pedido #43 - Eliminación',NULL),(90,2,'ENTRADA',1,57,58,'2025-07-08 17:45:43','Reversión de pedido #43 - Eliminación',NULL),(91,1,'SALIDA',2,22,20,'2025-07-08 17:46:26','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(92,2,'SALIDA',1,57,56,'2025-07-08 17:46:26','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(93,1,'ENTRADA',2,22,24,'2025-07-08 17:46:27','Reversión de pedido #44 - Eliminación',NULL),(94,2,'ENTRADA',1,57,58,'2025-07-08 17:46:27','Reversión de pedido #44 - Eliminación',NULL),(95,1,'SALIDA',2,22,20,'2025-07-08 17:46:28','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(96,2,'SALIDA',1,57,56,'2025-07-08 17:46:28','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(97,1,'ENTRADA',2,22,24,'2025-07-08 17:46:29','Reversión de pedido #45 - Eliminación',NULL),(98,2,'ENTRADA',1,57,58,'2025-07-08 17:46:29','Reversión de pedido #45 - Eliminación',NULL),(99,1,'SALIDA',2,22,20,'2025-07-08 17:47:34','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(100,2,'SALIDA',1,57,56,'2025-07-08 17:47:34','Pedido #NUEVO - Cliente: Distribuidora XYZ Ltda',NULL),(104,5,'ENTRADA',3,3,6,'2025-07-14 15:33:41','Reposición rápida: compra',NULL),(105,3,'ENTRADA',5,1,6,'2025-07-14 15:34:02','Reposición rápida: compra 2',NULL),(106,6,'ENTRADA',1,1,2,'2025-07-14 15:53:20','Reposición rápida: compra',NULL),(107,1,'ENTRADA',20,50,70,'2025-07-14 19:09:07','Compras',NULL),(108,4,'ENTRADA',20,15,35,'2025-07-14 19:31:28','compra proveedor 1',NULL),(109,1,'ENTRADA',1,70,71,'2025-07-14 19:37:24','Devolución',NULL),(110,4,'SALIDA',1,35,34,'2025-07-14 19:40:34','venta ',NULL),(111,6,'AJUSTE',2,2,2,'2025-07-14 19:43:17','Devoluciones',NULL),(112,6,'ENTRADA',10,2,12,'2025-07-14 19:45:28','compras',NULL),(113,4,'SALIDA',20,34,14,'2025-07-14 19:45:48','ventas',NULL),(114,4,'SALIDA',10,14,4,'2025-07-14 19:49:31','ventas',NULL),(115,6,'SALIDA',10,12,2,'2025-07-14 19:53:44','cambio inventario',NULL),(116,2,'SALIDA',10,56,46,'2025-07-14 19:56:18','ventas',NULL),(117,2,'SALIDA',2,46,44,'2025-07-15 12:17:07','venta',NULL),(118,5,'ENTRADA',10,6,16,'2025-07-15 12:21:52','compras',NULL),(119,2,'ENTRADA',2,44,46,'2025-07-15 12:24:55','devolución',NULL),(120,5,'ENTRADA',10,16,26,'2025-07-15 12:27:32','compra proveedor 2',NULL),(121,4,'SALIDA',2,4,2,'2025-07-15 12:28:36','venta almacén 1',NULL),(122,6,'ENTRADA',1,2,3,'2025-07-15 12:30:03','garantía',NULL),(123,4,'ENTRADA',20,2,22,'2025-07-15 12:34:08','compras proveedor 2',NULL),(124,5,'ENTRADA',5,26,31,'2025-07-15 12:35:50','Compras proveedor 3',NULL),(125,3,'ENTRADA',1,6,7,'2025-07-15 12:38:53','prueba',NULL),(126,2,'ENTRADA',2,46,48,'2025-07-15 12:41:29','prueba2',NULL),(127,5,'SALIDA',1,31,30,'2025-07-15 12:44:00','venta almacen 10',NULL),(128,1,'SALIDA',2,71,69,'2025-07-15 12:55:08','reparación',NULL),(129,1,'ENTRADA',2,69,71,'2025-07-15 12:58:27','dg',NULL),(130,3,'SALIDA',5,7,2,'2025-07-15 13:00:36','Daños',NULL),(131,3,'ENTRADA',1,2,3,'2025-07-15 13:01:35','awreyerw',NULL),(132,6,'ENTRADA',1,3,4,'2025-07-15 13:07:43','ghfg',NULL),(133,3,'ENTRADA',1,3,4,'2025-07-15 13:09:57','Tests',NULL),(134,6,'ENTRADA',12,4,16,'2025-07-15 13:12:41','temporal',NULL),(135,2,'ENTRADA',12,48,60,'2025-07-15 13:16:59','xfgjkk',NULL),(136,2,'ENTRADA',10,60,70,'2025-07-15 13:19:12','trjsrjsryk',NULL),(137,5,'SALIDA',10,30,20,'2025-07-15 13:20:40','Promoción ventas',NULL),(138,1,'SALIDA',10,61,51,'2025-07-17 10:55:21','Pedido #NUEVO - Cliente: Cliente Supervisor',NULL),(139,1,'SALIDA',2,49,47,'2025-07-17 10:55:22','Pedido #NUEVO - Cliente: Cliente Supervisor',NULL),(140,5,'SALIDA',2,18,16,'2025-07-17 10:55:22','Pedido #NUEVO - Cliente: Cliente Supervisor',NULL);
/*!40000 ALTER TABLE `movimiento_inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificacion`
--

DROP TABLE IF EXISTS `notificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificacion` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `fecha_creacion` datetime(6) DEFAULT NULL,
  `leida` bit(1) NOT NULL,
  `mensaje` varchar(255) DEFAULT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `usuario_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5hnclv9lmmc1w4335x04warbm` (`usuario_id`),
  CONSTRAINT `FK5hnclv9lmmc1w4335x04warbm` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificacion`
--

LOCK TABLES `notificacion` WRITE;
/*!40000 ALTER TABLE `notificacion` DISABLE KEYS */;
INSERT INTO `notificacion` VALUES (1,'2025-07-04 17:41:40.000000',_binary '\0','El producto \"Laptop HP Pavilion\" tiene solo 3 unidades en stock. Se recomienda hacer un pedido urgente.','Stock bajo - Producto crítico',1),(2,'2025-07-04 18:41:40.000000',_binary '\0','Se ha registrado un nuevo pedido #PED-2024-001 por $2,500.00 del cliente Juan Pérez.','Nuevo pedido recibido',1),(3,'2025-07-04 19:11:40.000000',_binary '','El pago del pedido #PED-2023-089 ha sido confirmado. Monto: $1,200.00','Pago confirmado',1),(4,'2025-07-03 19:41:40.000000',_binary '','La información del proveedor \"Tecnología Avanzada S.A.\" ha sido actualizada exitosamente.','Proveedor actualizado',1),(5,'2025-07-04 13:41:40.000000',_binary '\0','El reporte de ventas del mes de enero está listo para revisión.','Reporte mensual disponible',1),(6,'2025-07-02 19:41:40.000000',_binary '','El sistema estará en mantenimiento el próximo domingo de 2:00 AM a 6:00 AM.','Mantenimiento programado',1),(7,'2025-07-04 18:56:40.000000',_binary '\0','Se ha registrado un nuevo usuario: María González (Vendedor)','Nuevo usuario registrado',1),(8,'2025-07-04 07:41:40.000000',_binary '','El backup automático de la base de datos se ha completado exitosamente.','Backup completado',1),(9,'2025-07-04 18:42:37.000000',_binary '\0','¡Felicitaciones! Has alcanzado tu meta de ventas del mes. Ventas totales: $15,000','Meta de ventas alcanzada',2),(10,'2025-07-04 16:42:37.000000',_binary '\0','El cliente VIP Carlos Rodríguez visitará la tienda mañana a las 10:00 AM.','Cliente VIP visitando',2),(11,'2025-07-03 19:42:37.000000',_binary '','El producto \"Mouse Gaming RGB\" se ha agotado. Hay 5 clientes en lista de espera.','Producto agotado',2),(12,'2025-07-04 15:42:37.000000',_binary '\0','Nueva capacitación sobre productos tecnológicos el próximo viernes a las 3:00 PM.','Capacitación programada',2),(13,'2025-07-04 19:12:44.000000',_binary '\0','El inventario físico del almacén principal ha sido completado. Diferencia: 2 productos.','Inventario físico completado',3),(14,'2025-07-04 17:42:44.000000',_binary '\0','Se detectaron 3 unidades del producto \"Batería Externa\" próximas a vencer (15 días).','Producto vencido detectado',3),(15,'2025-07-03 19:42:44.000000',_binary '','Se ha agregado el proveedor \"Electrónicos del Norte\" al sistema.','Nuevo proveedor agregado',3),(16,'2025-07-04 13:42:44.000000',_binary '','Se registró una salida de 50 unidades del producto \"Cable USB-C\" para el pedido #PED-2024-002.','Movimiento de inventario',3),(17,'2025-07-05 18:34:59.057350',_binary '\0','Se ha creado un nuevo pedido #37 para el cliente Empresa Ejemplo 2 por un total de $600,00','Nuevo Pedido Creado',10),(18,'2025-07-05 18:38:41.956452',_binary '\0','Se ha creado un nuevo pedido #38 para el cliente Distribuidora XYZ Ltda por un total de $50,00','Nuevo Pedido Creado',10),(19,'2025-07-05 18:43:50.083440',_binary '\0','Se ha creado un nuevo pedido #39 para el cliente Empresa Ejemplo 2 por un total de $50,00','Nuevo Pedido Creado',10),(20,'2025-07-07 17:07:08.702081',_binary '','Esta es una notificación de prueba','Notificación Test',1),(21,'2025-07-07 17:15:42.919664',_binary '','Esta es una notificación de prueba','Notificación Test',1),(22,'2025-07-07 17:18:49.580563',_binary '','Esta es una notificación de prueba','Notificación Test',1),(23,'2025-07-07 17:22:59.602334',_binary '','Esta es una notificación de prueba','Notificación Test',1),(24,'2025-07-07 17:40:59.129076',_binary '','Esta es una notificación de prueba','Notificación Test',1),(25,'2025-07-07 19:26:24.162093',_binary '','Esta es una notificación de prueba','Notificación Test',1),(26,'2025-07-07 19:43:13.175477',_binary '','Esta es una notificación de prueba','Notificación Test',1),(27,'2025-07-08 17:43:02.361047',_binary '\0','Se ha creado un nuevo pedido #40 para el cliente Distribuidora XYZ Ltda por un total de $25000,00','Nuevo Pedido Creado',1),(28,'2025-07-08 17:43:05.119453',_binary '\0','Se ha creado un nuevo pedido #41 para el cliente Distribuidora XYZ Ltda por un total de $25000,00','Nuevo Pedido Creado',2),(29,'2025-07-08 17:45:38.050864',_binary '\0','Se ha creado un nuevo pedido #42 para el cliente Distribuidora XYZ Ltda por un total de $25000,00','Nuevo Pedido Creado',1),(30,'2025-07-08 17:45:40.003820',_binary '\0','Se ha creado un nuevo pedido #43 para el cliente Distribuidora XYZ Ltda por un total de $25000,00','Nuevo Pedido Creado',2),(31,'2025-07-08 17:46:26.393872',_binary '\0','Se ha creado un nuevo pedido #44 para el cliente Distribuidora XYZ Ltda por un total de $25000,00','Nuevo Pedido Creado',1),(32,'2025-07-08 17:46:27.650590',_binary '\0','Se ha creado un nuevo pedido #45 para el cliente Distribuidora XYZ Ltda por un total de $25000,00','Nuevo Pedido Creado',2),(33,'2025-07-08 17:47:33.964767',_binary '\0','Se ha creado un nuevo pedido #46 para el cliente Distribuidora XYZ Ltda por un total de $25000,00','Nuevo Pedido Creado',1),(34,'2025-07-17 10:55:21.767386',_binary '\0','Se ha creado un nuevo pedido #57 para el cliente Cliente Supervisor por un total de $4200000,00','Nuevo Pedido Creado',10);
/*!40000 ALTER TABLE `notificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_policy`
--

DROP TABLE IF EXISTS `password_policy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_policy` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `expire_days` int NOT NULL,
  `min_length` int NOT NULL,
  `require_lower` bit(1) NOT NULL,
  `require_number` bit(1) NOT NULL,
  `require_symbol` bit(1) NOT NULL,
  `require_upper` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_policy`
--

LOCK TABLES `password_policy` WRITE;
/*!40000 ALTER TABLE `password_policy` DISABLE KEYS */;
INSERT INTO `password_policy` VALUES (1,0,6,_binary '',_binary '\0',_binary '\0',_binary '\0');
/*!40000 ALTER TABLE `password_policy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `total` double DEFAULT NULL,
  `cliente_id` bigint DEFAULT NULL,
  `usuario_id` bigint DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `motivo_estado` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `pedido_ibfk_1` (`cliente_id`),
  CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`),
  CONSTRAINT `pedido_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (70,'2024-07-20',150000,1,1,'Pendiente','Esperando confirmación de pago'),(71,'2024-07-21',250000,2,2,'Enviado','Enviado a dirección de entrega'),(72,'2024-07-22',180000,3,3,'Entregado','Entregado al cliente'),(73,'2024-07-23',95000,4,4,'Cancelado','Cancelado por el cliente'),(74,'2024-07-24',120000,5,5,'Pendiente','Pendiente por validación de inventario'),(75,'2024-07-25',210000,6,6,'Pendiente','Esperando pago'),(76,'2024-07-26',175000,7,7,'Enviado','Enviado a sucursal'),(77,'2024-07-27',99000,8,10,'Entregado','Entregado correctamente'),(78,'2024-07-28',135000,9,27,'Pendiente','Pendiente por inventario'),(79,'2024-07-29',110000,10,1,'Cancelado','Cancelado por cliente'),(80,'2024-07-30',160000,11,2,'Pendiente','Esperando confirmación'),(81,'2024-07-31',185000,12,3,'Entregado','Entregado sin novedades'),(82,'2024-08-01',142000,13,4,'Pendiente','Pendiente por pago'),(83,'2024-08-02',198000,14,5,'Enviado','Enviado a dirección alterna'),(84,'2024-08-03',120500,15,6,'Entregado','Entregado al cliente'),(85,'2024-08-04',99000,16,7,'Cancelado','Cancelado por falta de stock'),(86,'2024-08-05',210000,17,10,'Pendiente','Pendiente por aprobación'),(87,'2024-08-06',175000,18,27,'Enviado','Enviado a sucursal sur'),(88,'2024-08-07',99000,19,1,'Entregado','Entregado correctamente'),(89,'2024-08-08',135000,20,2,'Pendiente','Pendiente por inventario');
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Producto Actualizado','Actualización automatizada',150000,47,'/api/files/productos/ejemplo.png'),(2,'Producto de prueba 2','Descripción de prueba 2',180000,70,'/api/files/productos/ejemplo.png'),(3,'Producto para Prueba-1','Producto para probar la gestión de stock- Agregar producto- modulo Productos',45000,4,'/api/files/productos/ejemplo.png'),(4,'Teclado USB','Teclado estándar para PC',85000,22,'/api/files/productos/raton-y-teclado-inalambricos.jpg'),(5,'Impresora HP','Impresora multifuncional',1200000,16,NULL),(6,'Producto Temporal','Para pruebas DELETE',1,16,'/api/files/productos/ejemplo.png'),(22,'impresora hp','ggglgl',1500000,15,NULL),(23,'Impesora HP','dsgggd',1250000,16,NULL);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `telefono_contacto` varchar(15) DEFAULT NULL,
  `direccion` text,
  `tipo` varchar(20) DEFAULT NULL,
  `nit` varchar(20) DEFAULT NULL,
  `nombre_contacto` varchar(100) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT '1',
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `contacto` varchar(100) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` VALUES (1,'Distribuidora Nacional S.A.','contacto@distribuidoranacional.com','6012345678','3001234567','Calle 123 #45-67, Bogotá','Distribuidor','900123456-7','María González',1,'2025-06-29 19:09:34','2025-06-29 19:09:34',NULL,NULL),(2,'Fabricante Industrial Ltda.','ventas@fabricanteindustrial.com','6045678901','3109876543','Carrera 78 #90-12, Medellín','Fabricante','800987654-3','Carlos Rodríguez',1,'2025-06-29 19:09:34','2025-06-29 19:09:34',NULL,NULL),(3,'Importadora Global S.A.S.','info@importadoraglobal.com','6054321098','3204567890','Avenida 5 #23-45, Cali','Internacional','700456789-0','Ana Martínez',1,'2025-06-29 19:13:33','2025-06-29 19:13:33',NULL,NULL),(4,'Proveedor Local Express','ventas@proveedorexpress.com','6067890123','3156789012','Calle 10 #15-20, Barranquilla','Nacional','600678901-2','Luis Pérez',1,'2025-06-29 19:13:33','2025-06-29 19:13:33',NULL,NULL),(5,'Proveedor Admin','proveedor1751303464@erp.com','111111111',NULL,'Dirección Admin','Distribuidor','NIT1751303464',NULL,1,'2025-06-30 17:11:03','2025-06-30 17:11:03',NULL,NULL),(6,'Proveedor Admin','proveedor1751308339@erp.com','111111111',NULL,'Dirección Admin','Distribuidor','NIT1751308339',NULL,1,'2025-06-30 18:32:18','2025-06-30 18:32:18',NULL,NULL),(7,'Proveedor Admin','proveedor1751308416@erp.com','111111111',NULL,'Dirección Admin','Distribuidor','NIT1751308416',NULL,1,'2025-06-30 18:33:36','2025-06-30 18:33:36',NULL,NULL),(8,'Proveedor Admin','proveedor1751309087@erp.com','111111111',NULL,'Dirección Admin','Distribuidor','NIT1751309087',NULL,1,'2025-06-30 18:44:47','2025-06-30 18:44:47',NULL,NULL),(9,'Proveedor Test',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2025-07-08 20:34:53','2025-07-08 20:34:53',NULL,NULL),(10,'Proveedor Test','proveedor@test.com',NULL,NULL,NULL,NULL,NULL,NULL,1,'2025-07-08 20:36:03','2025-07-08 20:36:03',NULL,NULL),(11,'Proveedor Test',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2025-07-08 20:38:28','2025-07-08 20:38:28',NULL,NULL),(12,'Proveedor Test',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2025-07-08 20:41:18','2025-07-08 20:41:18',NULL,NULL),(13,'Proveedor Test',NULL,'3009876543',NULL,NULL,NULL,NULL,NULL,1,'2025-07-08 20:42:47','2025-07-08 20:42:47',NULL,NULL),(14,'Proveedor Test',NULL,'3009876543',NULL,'Calle Proveedor 456',NULL,NULL,NULL,1,'2025-07-08 20:43:16','2025-07-08 20:43:16',NULL,NULL),(15,'Proveedor Test',NULL,'3009876543',NULL,'Calle Proveedor 456',NULL,NULL,NULL,1,'2025-07-08 20:45:22','2025-07-08 20:45:22','Juan Perez',NULL),(16,'Proveedor Test',NULL,'3009876543','3001112233','Calle Proveedor 456',NULL,NULL,NULL,1,'2025-07-08 20:45:38','2025-07-08 20:45:38','Juan Perez',NULL),(17,'Proveedor Test',NULL,'3009876543','3001112233','Calle Proveedor 456',NULL,NULL,NULL,1,'2025-07-08 20:45:52','2025-07-08 20:45:52','Juan Perez','Proveedor de servicios de prueba'),(18,'Proveedor Test',NULL,'3009876543','3001112233','Calle Proveedor 456',NULL,NULL,NULL,1,'2025-07-08 20:46:10','2025-07-08 20:46:10','Juan Perez','Proveedor de servicios de prueba'),(19,'Proveedor Test',NULL,'3009876543','3001112233','Calle Proveedor 456',NULL,NULL,NULL,1,'2025-07-08 20:46:47','2025-07-08 20:46:47','Juan Perez','Proveedor de servicios de prueba'),(20,'Proveedor Test',NULL,'3009876543','3001112233','Calle Proveedor 456',NULL,NULL,NULL,1,'2025-07-08 20:47:58','2025-07-08 20:47:58','Juan Perez','Proveedor de servicios de prueba'),(21,'Proveedor Test',NULL,'3009876543','3001112233','Calle Proveedor 456',NULL,NULL,NULL,1,'2025-07-08 20:56:23','2025-07-08 20:56:23','Juan Perez','Proveedor de servicios de prueba'),(22,'Proveedor Test',NULL,'3009876543','3001112233','Calle Proveedor 456',NULL,NULL,NULL,1,'2025-07-08 20:57:32','2025-07-08 20:57:32','Juan Perez','Proveedor de servicios de prueba'),(23,'Proveedor Test',NULL,'3009876543','3001112233','Calle Proveedor 456',NULL,NULL,NULL,0,'2025-07-08 21:54:20','2025-07-08 21:54:21','Juan Perez','Proveedor de servicios de prueba'),(24,'Proveedor Test',NULL,'3009876543','3001112233','Calle Proveedor 456',NULL,NULL,NULL,0,'2025-07-08 21:56:06','2025-07-08 21:56:07','Juan Perez','Proveedor de servicios de prueba'),(25,'Proveedor Test',NULL,'3009876543','3001112233','Calle Proveedor 456',NULL,NULL,NULL,0,'2025-07-08 21:56:50','2025-07-08 21:56:51','Juan Perez','Proveedor de servicios de prueba'),(26,'Proveedor Test',NULL,'3009876543','3001112233','Calle Proveedor 456',NULL,NULL,NULL,0,'2025-07-08 21:58:01','2025-07-08 21:58:02','Juan Perez','Proveedor de servicios de prueba'),(27,'Proveedor Test',NULL,'3009876543','3001112233','Calle Proveedor 456',NULL,NULL,NULL,0,'2025-07-08 21:58:33','2025-07-08 21:58:34','Juan Perez','Proveedor de servicios de prueba'),(28,'Proveedor Test',NULL,'3009876543','3001112233','Calle Proveedor 456',NULL,NULL,NULL,0,'2025-07-08 22:08:15','2025-07-08 22:08:16','Juan Perez','Proveedor de servicios de prueba'),(29,'Proveedor Test',NULL,'3009876543','3001112233','Calle Proveedor 456',NULL,NULL,NULL,0,'2025-07-08 22:16:23','2025-07-08 22:16:25','Juan Perez','Proveedor de servicios de prueba'),(30,'Proveedor Test',NULL,'3009876543','3001112233','Calle Proveedor 456',NULL,NULL,NULL,0,'2025-07-08 22:18:36','2025-07-08 22:18:37','Juan Perez','Proveedor de servicios de prueba');
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_token`
--

DROP TABLE IF EXISTS `refresh_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_token` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `usuario_id` bigint DEFAULT NULL,
  `expiry_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `refresh_token_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=232 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_token`
--

LOCK TABLES `refresh_token` WRITE;
/*!40000 ALTER TABLE `refresh_token` DISABLE KEYS */;
INSERT INTO `refresh_token` VALUES (213,'89116386-332f-4bfe-8152-927873b75d96',32,'2025-08-01 11:35:48'),(227,'a3026958-4f49-4c0e-b0d3-6624476a356c',27,'2025-08-01 15:17:02'),(230,'dbac3895-0d22-466c-acf2-f137af2d336f',10,'2025-08-01 18:13:25'),(231,'0fd92696-9aa9-49d8-8ece-89a43de38ec6',1,'2025-08-01 18:19:05');
/*!40000 ALTER TABLE `refresh_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol_permiso`
--

DROP TABLE IF EXISTS `rol_permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol_permiso` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `aprobar` bit(1) NOT NULL,
  `crear` bit(1) NOT NULL,
  `editar` bit(1) NOT NULL,
  `eliminar` bit(1) NOT NULL,
  `rol` varchar(255) DEFAULT NULL,
  `ver` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKg70o85j597p5dkwqfsyyk6mn6` (`rol`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol_permiso`
--

LOCK TABLES `rol_permiso` WRITE;
/*!40000 ALTER TABLE `rol_permiso` DISABLE KEYS */;
INSERT INTO `rol_permiso` VALUES (1,_binary '',_binary '',_binary '',_binary '','Admin',_binary ''),(3,_binary '\0',_binary '',_binary '',_binary '\0','Usuario',_binary ''),(5,_binary '',_binary '\0',_binary '',_binary '\0','Supervisor',_binary '');
/*!40000 ALTER TABLE `rol_permiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `correo` varchar(255) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(255) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'admin@erp.com','Juan López EE:','$2a$10$fgNZK4UXVB87WOsRN1OxZOJpwx8uuIf3QqtVZYyaMtruE2TEzJFQC','ADMIN',1,'admin.png'),(2,'supervisor@erp.com','José Mattos','$$2a$12$acw1pyH7wtSI6zWI1BueSe1Yecr7nDmWxzPnLvrI4GHAqDlhmqIxW','SUPERVISOR',1,'supervisor.png'),(3,'user@erp.com','María Bezos','$$2a$12$KtyGf1oIe.PZLzkbpURc3ebkU.Aj4ja6qldl3lNLoZF8QQDXcEsnW','USER',1,'user.png'),(4,'ventas@erp.com','Carla Ousborne','$2a$10$HzUnILP.0ib3.rszmAnhWeKUhPt35HB0.0Z65ouFLcFirtwKFLAOq','VENDEDOR',1,'ventas.png'),(5,'inventario@erp.com','Cintya Carson','$2a$10$HzUnILP.0ib3.rszmAnhWeKUhPt35HB0.0Z65ouFLcFirtwKFLAOq','INVENTARIO',1,'inventario.png'),(6,'pepito.perez@erp.com','José Perez','nuevo123','USER',1,'jose_perez.png'),(7,'Jhon.doe@erp.com','Jhon Doe','$2a$10$8XOAgVuh2130J0xpS1d0RumZB2GMqg5RkB31AAZEPcJt8.Dse1FnS','USER',1,'jhon_doe.png'),(10,'dim.dei@gmail.com','Fernando Gómez','$2a$12$co0VtGB4QJWc1caRKxw9zO4J.dj6ZsmgPliS8FNjnulkpkc3XgXpi','ADMIN',1,'Fg.png'),(27,'juana.perez@erp.com','Juana Pérez','$2a$10$jYn/6WIOP9PMDNdRX/UrOuwZbEpOG13bencVId0jcYoT1LbZsT9jG','ADMIN',1,'foto01 mujer.png'),(31,'karla.rodriguez@erp.com','Karla Rodríguez','$2a$10$NVa0acq/zRmjv5pNwyT9MunUmBaq7Jx5uX2EY0lXQfSJBTqVTchCS','Usuario',1,'usuario_32846650-afd3-44fc-8def-2f3fed936bd7.png'),(32,'doug.jones@erp.com','Douglas Jones','$2a$10$OxcA0j4FR2BjmKZs1RcccutVkPUXj.1rxO/jJ3zjxqbverqCEP0Ci','Usuario',1,'usuario_413e9af8-5f03-4c99-9947-071f45ba7161.png');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visual_config`
--

DROP TABLE IF EXISTS `visual_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visual_config` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `color_primario` varchar(255) DEFAULT NULL,
  `color_secundario` varchar(255) DEFAULT NULL,
  `formato_fecha` varchar(255) DEFAULT NULL,
  `formato_hora` varchar(255) DEFAULT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `tema` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visual_config`
--

LOCK TABLES `visual_config` WRITE;
/*!40000 ALTER TABLE `visual_config` DISABLE KEYS */;
/*!40000 ALTER TABLE `visual_config` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-25 18:23:58
