CREATE DATABASE  IF NOT EXISTS `bus_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bus_system`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: bus_system
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `bus_logs`
--

DROP TABLE IF EXISTS `bus_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bus_logs` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `log_timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `origin` varchar(30) DEFAULT NULL,
  `table_name` varchar(30) DEFAULT NULL,
  `event_type` varchar(50) DEFAULT NULL,
  `event_details` text,
  `user_id` int DEFAULT NULL,
  `os` varchar(255) DEFAULT NULL,
  `browser` varchar(255) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `company_id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) NOT NULL,
  `contact` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `day_types`
--

DROP TABLE IF EXISTS `day_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `day_types` (
  `day_type_id` int NOT NULL AUTO_INCREMENT,
  `day_type_name` varchar(50) NOT NULL,
  PRIMARY KEY (`day_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `departure_points`
--

DROP TABLE IF EXISTS `departure_points`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departure_points` (
  `departure_point_id` int NOT NULL AUTO_INCREMENT,
  `line_id` int DEFAULT NULL,
  `point_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `observations` text,
  PRIMARY KEY (`departure_point_id`),
  KEY `line_id` (`line_id`),
  CONSTRAINT `departure_points_ibfk_1` FOREIGN KEY (`line_id`) REFERENCES `lines` (`line_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `departure_times`
--

DROP TABLE IF EXISTS `departure_times`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `departure_times_observations`
--

DROP TABLE IF EXISTS `departure_times_observations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departure_times_observations` (
  `departure_time_id` int NOT NULL,
  `observation_id` int NOT NULL,
  KEY `fk_departure_times_observations_departures_times_idx` (`departure_time_id`),
  KEY `departure_times_observations_observations_idx` (`observation_id`),
  CONSTRAINT `departure_times_observations_observations` FOREIGN KEY (`observation_id`) REFERENCES `observations` (`observation_id`),
  CONSTRAINT `fk_departure_times_observations_departures_times` FOREIGN KEY (`departure_time_id`) REFERENCES `departure_times` (`schedule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lines`
--

DROP TABLE IF EXISTS `lines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lines` (
  `line_id` int NOT NULL AUTO_INCREMENT,
  `line_number` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `line_name` varchar(255) NOT NULL,
  `departure_location` varchar(255) NOT NULL,
  `destination_location` varchar(255) NOT NULL,
  `fare` decimal(5,2) NOT NULL,
  `company_id` int DEFAULT NULL,
  `system_id` int DEFAULT NULL,
  `mode` varchar(50) DEFAULT NULL COMMENT 'Tipo de ônibus (ex: articulado, convencional)',
  `is_public` tinyint(1) DEFAULT NULL COMMENT 'Se é transporte público ou privado',
  `has_integration` tinyint(1) DEFAULT NULL COMMENT 'Se possui integração com outras linhas',
  `observations` text,
  `type` int DEFAULT NULL COMMENT 'Tipo da linha: 1 - Coletivo Urbano; 2 - Executivo Urbano; 3 - Executivo Rodoviário; 4 - Coletivo Rodoviário',
  `scope` int NOT NULL COMMENT 'Abrangência: 1 - Municipal; 2 - Metropolitano; 3 - Rodoviário',
  PRIMARY KEY (`line_id`),
  KEY `company_id` (`company_id`),
  KEY `system_id` (`system_id`),
  KEY `in_lines_line_number` (`line_number`(10)),
  CONSTRAINT `lines_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`),
  CONSTRAINT `lines_ibfk_2` FOREIGN KEY (`system_id`) REFERENCES `systems` (`system_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `observations`
--

DROP TABLE IF EXISTS `observations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `observations` (
  `observation_id` int NOT NULL AUTO_INCREMENT,
  `observation_name` varchar(30) NOT NULL,
  `observation_abrev` varchar(5) NOT NULL,
  PRIMARY KEY (`observation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Observações para caracterizar os horários de partidas';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `recharge_points`
--

DROP TABLE IF EXISTS `recharge_points`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recharge_points` (
  `recharge_point_id` int NOT NULL AUTO_INCREMENT,
  `system_id` int DEFAULT NULL,
  `point_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`recharge_point_id`),
  KEY `system_id` (`system_id`),
  CONSTRAINT `recharge_points_ibfk_1` FOREIGN KEY (`system_id`) REFERENCES `systems` (`system_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `systems`
--

DROP TABLE IF EXISTS `systems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `systems` (
  `system_id` int NOT NULL AUTO_INCREMENT,
  `system_name` varchar(255) NOT NULL,
  PRIMARY KEY (`system_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Bus system table (e.g., municipal, intercity)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'bus_system'
--

--
-- Dumping routines for database 'bus_system'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-20 17:23:56
