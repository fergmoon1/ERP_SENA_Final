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
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `correo` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `fecha_creacion` date DEFAULT NULL,
  `etapa` varchar(32) DEFAULT 'nuevo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'ventas@distribuidoraxyz.com','Calle 80 #12-34, Barranquilla','Distribuidora XYZ Ltda','6012345678','Empresa','2024-06-01','nuevo'),(2,'stock_client@gmail.com','Calle 20 #13-45, Medellin','Cliente Stock-Test','6644578','Individual','2024-06-01','espera'),(3,'cliente1@correo.com','Calle 50 #10-20, Bogotá','Cliente Ejemplo 1','3001112233','Individual','2024-06-01','asignado'),(4,'empresa2@correo.com','Carrera 7 #45-67, Cali','Empresa Ejemplo 2','3202223344','Empresa','2024-06-01','progreso'),(5,'clienteadmin@erp.com','Call 1 # 12-34','Cliente Admin','123456789','Individual',NULL,'factura'),(6,'clientesupervisor@erp.com',NULL,'Cliente Supervisor','987654321',NULL,'2024-06-01','nuevo'),(17,'cliente@test.com','Calle Test 123','Cliente Test','3001234567','Individual','2025-07-07','espera'),(26,'teresa@email.com','Calle 1','Teresa','3001112222','Individual','2025-07-17','nuevo'),(27,'juan@email.com','Calle 2','Juan Moreno','3002223333','Empresa','2025-07-17','espera'),(28,'andres@email.com','Calle 3','Andres Sanchez','3003334444','Individual','2025-07-17','asignado'),(29,'maria@email.com','Calle 4','Maria Lopez','3004445555','Empresa','2025-07-17','progreso'),(30,'jorge@email.com','Calle 5','Jorge Andrade','3005556666','Individual','2025-07-17','factura');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
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
  `descuento_total` decimal(10,2) DEFAULT '0.00',
  `iva` double DEFAULT NULL,
  `total` double DEFAULT NULL,
  `observaciones` text,
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` bigint DEFAULT NULL,
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
INSERT INTO `compra` VALUES (1,1,'2024-07-01','FAC-006-2024','RECIBIDA',1000,50.00,190,1140,'Compra de teclados','2025-06-29 19:13:33','2025-06-29 19:13:33',NULL),(2,3,'2024-07-02','FAC-007-2024','PENDIENTE',2000,100.00,380,2280,'Compra de impresoras','2025-06-29 19:13:33','2025-06-29 19:13:33',NULL),(3,1,'2024-06-27','FAC-001','PENDIENTE',80000,0.00,15200,95200,'Compra de prueba automatizada','2025-06-30 17:11:06','2025-06-30 17:11:06',NULL),(4,1,'2024-06-27','FAC-001','PENDIENTE',80000,0.00,15200,95200,'Compra de prueba automatizada','2025-06-30 18:32:21','2025-06-30 18:32:21',NULL),(5,1,'2024-06-27','FAC-001','PENDIENTE',80000,0.00,15200,95200,'Compra de prueba automatizada','2025-06-30 18:33:39','2025-06-30 18:33:39',NULL),(6,1,'2024-06-27','FAC-001','PENDIENTE',80000,0.00,15200,95200,'Compra de prueba automatizada','2025-06-30 18:44:50','2025-06-30 18:44:50',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_compra`
--

LOCK TABLES `detalle_compra` WRITE;
/*!40000 ALTER TABLE `detalle_compra` DISABLE KEYS */;
INSERT INTO `detalle_compra` VALUES (1,1,4,10,40,0,400,NULL),(2,2,5,3,600,0,1800,NULL),(3,3,2,5,10000,0,50000,NULL),(4,3,3,2,15000,1000,29000,'Descuento especial'),(5,4,2,5,10000,0,50000,NULL),(6,4,3,2,15000,1000,29000,'Descuento especial'),(7,5,2,5,10000,0,50000,NULL),(8,5,3,2,15000,1000,29000,'Descuento especial'),(9,6,2,5,10000,0,50000,NULL),(10,6,3,2,15000,1000,29000,'Descuento especial');
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
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_pedido`
--

LOCK TABLES `detalle_pedido` WRITE;
/*!40000 ALTER TABLE `detalle_pedido` DISABLE KEYS */;
INSERT INTO `detalle_pedido` VALUES (3,2,3,4,NULL),(4,2,4,1,NULL),(5,3,5,2,NULL),(34,37,5,1,600),(35,38,3,1,50),(36,39,3,1,50),(61,46,1,2,10000),(62,46,2,1,5000),(63,57,1,10,150000),(64,57,1,2,150000),(65,57,5,2,1200000);
/*!40000 ALTER TABLE `detalle_pedido` ENABLE KEYS */;
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
  KEY `cliente_id` (`cliente_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`),
  CONSTRAINT `pedido_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (2,'2024-07-30',500,2,2,'Pendiente','Pendiente por confirmación'),(3,'2024-07-30',120,3,3,'Pendiente','Pendiente por validación de inventario'),(4,'2025-06-30',1200,1,1,'Pendiente','Pendiente por pago'),(5,'2025-06-30',1500,1,2,'Entregado','Pendiente por pago'),(6,'2025-06-30',0,1,1,'Pendiente','Pendiente por pago'),(7,'2025-06-30',0,1,2,'Pendiente','Pendiente por pago'),(8,'2025-06-30',0,1,1,'Pendiente','Pendiente por pago'),(9,'2025-06-30',0,1,2,'Pendiente','Pendiente por pago'),(10,'2025-06-30',0,1,1,'Pendiente','Pendiente por pago'),(11,'2025-06-30',0,1,2,'Pendiente','Pendiente por pago'),(12,'2024-06-01',10000,1,10,'Pendiente','Pendiente por pago'),(13,'2024-06-02',15000,1,10,'Enviado','Listo para envío'),(14,'2024-06-03',20000,2,10,'Entregado','Entregado al cliente'),(15,'2024-06-04',5000,2,10,'Cancelado','Cancelado por cliente'),(16,'2024-06-05',12000,3,10,'Pendiente','Pendiente por pago'),(17,'2025-07-02',12000,1,10,'Pendiente','Pendiente por pago'),(18,'2025-07-02',13500,2,10,'Pendiente','Pendiente por pago'),(19,'2025-07-02',9800,3,10,'Pendiente','Pendiente por pago'),(20,'2025-07-02',15000,3,10,'Pendiente','Pendiente por pago'),(21,'2025-07-02',11000,4,10,'Pendiente','Pendiente por pago'),(22,'2025-07-02',14500,1,10,'Pendiente','Pendiente por pago'),(23,'2025-07-02',16000,4,10,'Pendiente','Pendiente por pago'),(24,'2025-07-02',10500,4,10,'completado','Pedido completado y facturado'),(25,'2024-08-01',18000,2,10,'Pendiente','Pendiente por confirmación de pago'),(26,'2024-08-02',21000,3,10,'Enviado','Enviado por mensajería interna'),(27,'2024-08-03',25000,1,10,'Entregado','Entregado en oficina principal'),(28,'2024-08-04',9000,2,10,'Cancelado','Cancelado por falta de stock'),(29,'2024-08-05',19500,4,10,'completado','Pedido completado y entregado'),(30,'2024-08-06',17500,3,10,'Pendiente','Pendiente por aprobación de crédito'),(31,'2024-08-07',22000,1,10,'Enviado','Enviado a sucursal norte'),(32,'2024-08-08',16000,2,10,'Entregado','Entregado al cliente final'),(33,'2024-08-09',8000,4,10,'Cancelado','Cancelado por error en dirección'),(34,'2024-08-10',14000,1,10,'Pendiente','Pendiente por validación de inventario'),(35,'2025-07-03',0,1,1,'Pendiente','Pendiente por pago'),(36,'2024-07-01',15000,3,10,'Pendiente','Pedido de prueba insertado por script SQL'),(37,'2025-07-05',600,4,10,'Pendiente','Pedido recien realizado'),(38,'2025-07-05',50,1,10,'Pendiente','garantía'),(39,'2025-07-05',50,4,10,'Pendiente','fgh'),(46,'2025-07-08',25000,1,1,'Pendiente','Pendiente por pago'),(47,'2024-12-01',150,1,NULL,'Pendiente',NULL),(48,'2024-12-02',320.5,1,NULL,'Enviado',NULL),(49,'2024-12-03',450.75,1,NULL,'Entregado',NULL),(50,'2024-12-04',180.25,1,NULL,'Pendiente',NULL),(51,'2024-12-05',275,1,NULL,'Enviado',NULL),(52,'2024-12-06',390,1,NULL,'Entregado',NULL),(53,'2024-12-07',125.5,1,NULL,'Cancelado',NULL),(54,'2024-12-08',500,1,NULL,'Pendiente',NULL),(55,'2024-12-09',225.75,1,NULL,'Enviado',NULL),(56,'2024-12-10',350.25,1,NULL,'Entregado',NULL),(57,'2025-07-17',4200000,6,10,'Pendiente','compra reciente');
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Producto Actualizado','Actualización automatizada',150000,47,'/api/files/productos/ejemplo.png'),(2,'Producto de prueba 2','Descripción de prueba 2',180000,70,'/api/files/productos/ejemplo.png'),(3,'Producto para Prueba-1','Producto para probar la gestión de stock- Agregar producto- modulo Productos',45000,4,'/api/files/productos/ejemplo.png'),(4,'Teclado USB','Teclado estándar para PC',85000,22,'/api/files/productos/raton-y-teclado-inalambricos.jpg'),(5,'Impresora HP','Impresora multifuncional',1200000,16,'/api/files/productos/ejemplo.png'),(6,'Producto Temporal','Para pruebas DELETE',1,16,'/api/files/productos/ejemplo.png');
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
) ENGINE=InnoDB AUTO_INCREMENT=188 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_token`
--

LOCK TABLES `refresh_token` WRITE;
/*!40000 ALTER TABLE `refresh_token` DISABLE KEYS */;
INSERT INTO `refresh_token` VALUES (187,'cb1eb5b3-3609-4c34-baa4-6a264ef47a13',10,'2025-07-23 20:26:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'admin@erp.com','Juan López','$2a$12$UOUtsiSzhqfoawIkAgEVnO/19JcxLwiBgcso4hsfKjyz/vUjp0y8O','ADMIN',1,'/api/files/admin.png'),(2,'supervisor@erp.com','José Mattos','$$2a$12$acw1pyH7wtSI6zWI1BueSe1Yecr7nDmWxzPnLvrI4GHAqDlhmqIxW','SUPERVISOR',1,'/api/files/supervisor.png'),(3,'user@erp.com','María Bezos','$$2a$12$KtyGf1oIe.PZLzkbpURc3ebkU.Aj4ja6qldl3lNLoZF8QQDXcEsnW','USER',1,'/api/files/user.png'),(4,'ventas@erp.com','Carla Ousborne','$2a$10$HzUnILP.0ib3.rszmAnhWeKUhPt35HB0.0Z65ouFLcFirtwKFLAOq','VENDEDOR',1,'/api/files/ventas.png'),(5,'inventario@erp.com','Cintya Carson','$2a$10$HzUnILP.0ib3.rszmAnhWeKUhPt35HB0.0Z65ouFLcFirtwKFLAOq','INVENTARIO',1,'/api/files/inventario.png'),(6,'pepito.perez@erp.com','José Perez','nuevo123','USER',1,'/api/files/jose_perez.png'),(7,'Jhon.doe@erp.com','Jhon Doe','$2a$10$8XOAgVuh2130J0xpS1d0RumZB2GMqg5RkB31AAZEPcJt8.Dse1FnS','USER',1,'/api/files/jhon_doe.png'),(10,'dim.dei@gmail.com','Fernando Gómez','$2a$10$3oafoYXivuioHSDFGzHlRuMlzuSJDFW0M1rTyf040x8W2bInyAChq','ADMIN',1,'/api/files/Fg.png'),(27,'juana.perez@erp.com','Juana Pérez','$2a$10$jYn/6WIOP9PMDNdRX/UrOuwZbEpOG13bencVId0jcYoT1LbZsT9jG','ADMIN',1,'/api/files/foto01 mujer.png');
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

-- Dump completed on 2025-07-17 13:42:02
