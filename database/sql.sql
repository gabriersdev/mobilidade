CREATE DATABASE IF NOT EXISTS `bus_system`
/*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */
/*!80016 DEFAULT ENCRYPTION='N' */
;
USE `bus_system`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bus_system
-- ------------------------------------------------------
-- Server version	8.0.30
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
z
/*!50503 SET NAMES utf8 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;
--
-- Table structure for table `companies`
--
DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `companies` (
  `company_id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) NOT NULL,
  `contact` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `companies`
--
LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */
;
/*!40000 ALTER TABLE `companies` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `day_types`
--
DROP TABLE IF EXISTS `day_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `day_types` (
  `day_type_id` int NOT NULL AUTO_INCREMENT,
  `day_type_name` varchar(50) NOT NULL,
  PRIMARY KEY (`day_type_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `day_types`
--
LOCK TABLES `day_types` WRITE;
/*!40000 ALTER TABLE `day_types` DISABLE KEYS */
;
/*!40000 ALTER TABLE `day_types` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `departure_points`
--
DROP TABLE IF EXISTS `departure_points`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `departure_points` (
  `departure_point_id` int NOT NULL AUTO_INCREMENT,
  `line_id` int DEFAULT NULL,
  `point_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `observations` text,
  PRIMARY KEY (`departure_point_id`),
  KEY `line_id` (`line_id`),
  CONSTRAINT `departure_points_ibfk_1` FOREIGN KEY (`line_id`) REFERENCES `lines` (`line_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `departure_points`
--
LOCK TABLES `departure_points` WRITE;
/*!40000 ALTER TABLE `departure_points` DISABLE KEYS */
;
/*!40000 ALTER TABLE `departure_points` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `departure_times`
--
DROP TABLE IF EXISTS `departure_times`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `departure_times` (
  `schedule_id` int NOT NULL AUTO_INCREMENT,
  `line_id` int DEFAULT NULL,
  `departure_time` time NOT NULL,
  `direction` varchar(50) NOT NULL COMMENT '''Outbound'' or ''Inbound'' (Ida ou Volta)',
  `day_type_id` int DEFAULT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `line_id` (`line_id`),
  KEY `day_type_id` (`day_type_id`),
  CONSTRAINT `departure_times_ibfk_1` FOREIGN KEY (`line_id`) REFERENCES `lines` (`line_id`),
  CONSTRAINT `departure_times_ibfk_2` FOREIGN KEY (`day_type_id`) REFERENCES `day_types` (`day_type_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `departure_times`
--
LOCK TABLES `departure_times` WRITE;
/*!40000 ALTER TABLE `departure_times` DISABLE KEYS */
;
/*!40000 ALTER TABLE `departure_times` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `departure_times_observations`
--
DROP TABLE IF EXISTS `departure_times_observations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `departure_times_observations` (
  `departure_time_id` int NOT NULL,
  `observation_id` int NOT NULL,
  KEY `fk_departure_times_observations_departures_times_idx` (`departure_time_id`),
  KEY `departure_times_observations_observations_idx` (`observation_id`),
  CONSTRAINT `departure_times_observations_observations` FOREIGN KEY (`observation_id`) REFERENCES `observations` (`observation_id`),
  CONSTRAINT `fk_departure_times_observations_departures_times` FOREIGN KEY (`departure_time_id`) REFERENCES `departure_times` (`schedule_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `departure_times_observations`
--
LOCK TABLES `departure_times_observations` WRITE;
/*!40000 ALTER TABLE `departure_times_observations` DISABLE KEYS */
;
/*!40000 ALTER TABLE `departure_times_observations` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `lines`
--
DROP TABLE IF EXISTS `lines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `lines` (
  `line_id` int NOT NULL AUTO_INCREMENT,
  `line_name` varchar(255) NOT NULL,
  `departure_location` varchar(255) NOT NULL,
  `destination_location` varchar(255) NOT NULL,
  `fare` decimal(5, 2) NOT NULL,
  `company_id` int DEFAULT NULL,
  `system_id` int DEFAULT NULL,
  `mode` varchar(50) DEFAULT NULL COMMENT 'Tipo de ônibus (ex: articulado, convencional)',
  `is_public` tinyint(1) DEFAULT NULL COMMENT 'Se é transporte público ou privado',
  `has_integration` tinyint(1) DEFAULT NULL COMMENT 'Se possui integração com outras linhas',
  `observations` text,
  `type` int DEFAULT NULL COMMENT 'Tipo da linha (1 - Coletivo Urbano; 2 - Executivo Urbano; 3 - Executivo Rodoviário; 4 - Coletivo Rodoviário',
  PRIMARY KEY (`line_id`),
  KEY `company_id` (`company_id`),
  KEY `system_id` (`system_id`),
  CONSTRAINT `lines_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`),
  CONSTRAINT `lines_ibfk_2` FOREIGN KEY (`system_id`) REFERENCES `systems` (`system_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `lines`
--
LOCK TABLES `lines` WRITE;
/*!40000 ALTER TABLE `lines` DISABLE KEYS */
;
/*!40000 ALTER TABLE `lines` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `observations`
--
DROP TABLE IF EXISTS `observations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `observations` (
  `observation_id` int NOT NULL AUTO_INCREMENT,
  `observation_name` varchar(30) NOT NULL,
  `observation_abrev` varchar(5) NOT NULL,
  PRIMARY KEY (`observation_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'Observações para caracterizar os horários de partidas';
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `observations`
--
LOCK TABLES `observations` WRITE;
/*!40000 ALTER TABLE `observations` DISABLE KEYS */
;
/*!40000 ALTER TABLE `observations` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `recharge_points`
--
DROP TABLE IF EXISTS `recharge_points`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `recharge_points` (
  `recharge_point_id` int NOT NULL AUTO_INCREMENT,
  `system_id` int DEFAULT NULL,
  `point_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`recharge_point_id`),
  KEY `system_id` (`system_id`),
  CONSTRAINT `recharge_points_ibfk_1` FOREIGN KEY (`system_id`) REFERENCES `systems` (`system_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `recharge_points`
--
LOCK TABLES `recharge_points` WRITE;
/*!40000 ALTER TABLE `recharge_points` DISABLE KEYS */
;
/*!40000 ALTER TABLE `recharge_points` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `systems`
--
DROP TABLE IF EXISTS `systems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `systems` (
  `system_id` int NOT NULL AUTO_INCREMENT,
  `system_name` varchar(255) NOT NULL,
  PRIMARY KEY (`system_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'Bus system table (e.g., municipal, intercity)';
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `systems`
--
LOCK TABLES `systems` WRITE;
/*!40000 ALTER TABLE `systems` DISABLE KEYS */
;
INSERT INTO `systems`
VALUES (1, 'Municipal'),
  (2, 'Intermunicipal'),
  (3, 'Metropolitano');
/*!40000 ALTER TABLE `systems` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Dumping events for database 'bus_system'
--
--
-- Dumping routines for database 'bus_system'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;