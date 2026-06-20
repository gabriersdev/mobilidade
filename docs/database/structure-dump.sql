CREATE DATABASE  IF NOT EXISTS `bus_system` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bus_system`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: caboose.proxy.rlwy.net    Database: bus_system
-- ------------------------------------------------------
-- Server version	9.6.0

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `arrival_predictions`
--

DROP TABLE IF EXISTS `arrival_predictions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `arrival_predictions` (
  `prediction_id` bigint NOT NULL AUTO_INCREMENT,
  `departure_point_id` int NOT NULL,
  `line_id` int NOT NULL,
  `direction` tinyint(1) NOT NULL COMMENT '1 - Ida ou 2 - Volta',
  `departure_time_trip` datetime NOT NULL COMMENT 'O datetime exato da partida desta viagem específica do ponto inicial.',
  `expected_arrival_time` datetime NOT NULL COMMENT 'O datetime exato da chegada prevista neste ponto de parada.',
  `prediction_line_order` bigint DEFAULT NULL,
  `prediction_generated_in` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` char(1) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`prediction_id`),
  KEY `fk_forecasts_lines` (`line_id`),
  KEY `idx_arrival_predictions` (`departure_point_id`,`expected_arrival_time`),
  CONSTRAINT `fk_forecasts_departure_points` FOREIGN KEY (`departure_point_id`) REFERENCES `departure_points` (`departure_point_id`),
  CONSTRAINT `fk_forecasts_lines` FOREIGN KEY (`line_id`) REFERENCES `lines` (`line_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10755893 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `city_id` mediumint NOT NULL AUTO_INCREMENT,
  `city_name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`city_id`),
  UNIQUE KEY `city_name_UNIQUE` (`city_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `company_id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `contact` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `report_contact` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  PRIMARY KEY (`company_id`),
  UNIQUE KEY `company_name` (`company_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `day_types`
--

DROP TABLE IF EXISTS `day_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `day_types` (
  `day_type_id` int NOT NULL AUTO_INCREMENT,
  `day_type_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `abs_name` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  PRIMARY KEY (`day_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
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
  `direction` tinyint(1) DEFAULT NULL COMMENT '1 - Ida ou 2 - Volta',
  `order_departure_point` mediumint NOT NULL DEFAULT '-1' COMMENT 'Ordem do ponto de parada. Usado para organizar a exibição dos pontos de paradas. (padrão: -1)',
  `point_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `city_id` mediumint DEFAULT NULL,
  `state_id` tinyint DEFAULT NULL,
  `physical_stop_id` int DEFAULT NULL,
  `observations` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `datetime_modify` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`departure_point_id`),
  KEY `line_id` (`line_id`),
  KEY `departure_points_ibfk_2_idx` (`city_id`),
  KEY `departure_points_ifbk_3_idx` (`state_id`),
  KEY `idx_physical_stop_id` (`physical_stop_id`),
  CONSTRAINT `departure_points_ibfk_1` FOREIGN KEY (`line_id`) REFERENCES `lines` (`line_id`),
  CONSTRAINT `departure_points_ibfk_2` FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`),
  CONSTRAINT `departure_points_ifbk_3` FOREIGN KEY (`state_id`) REFERENCES `states` (`state_id`),
  CONSTRAINT `fk_departure_points_physical_stop` FOREIGN KEY (`physical_stop_id`) REFERENCES `physical_stops` (`stop_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4027 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `departure_times`
--

DROP TABLE IF EXISTS `departure_times`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departure_times` (
  `schedule_id` int NOT NULL AUTO_INCREMENT,
  `line_id` int NOT NULL,
  `day` tinyint NOT NULL COMMENT '1 - Dias úteis; 2 - Sábado; 3 - Domingo; 4 - Domingos e feriados; 5 - Dias úteis atípico; 6 - Sábado atípico; 7 - Domingos atípicos; 8 - Dias úteis férias; 9 - Sábados férias; 10 - Domingos férias',
  `departure_time` time NOT NULL,
  `direction` tinyint(1) NOT NULL COMMENT '1 - Ida ou 2 - Volta',
  `day_type_id` int DEFAULT NULL,
  `active` int NOT NULL DEFAULT '1',
  `datetime_modify` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`schedule_id`),
  KEY `line_id` (`line_id`),
  KEY `day_type_id` (`day_type_id`),
  CONSTRAINT `departure_times_ibfk_1` FOREIGN KEY (`line_id`) REFERENCES `lines` (`line_id`),
  CONSTRAINT `departure_times_ibfk_2` FOREIGN KEY (`day_type_id`) REFERENCES `day_types` (`day_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=462470 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
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
  PRIMARY KEY (`departure_time_id`,`observation_id`),
  KEY `fk_departure_times_observations_departures_times_idx` (`departure_time_id`),
  KEY `departure_times_observations_observations_idx` (`observation_id`),
  CONSTRAINT `departure_times_observations_observations` FOREIGN KEY (`observation_id`) REFERENCES `observations` (`observation_id`),
  CONSTRAINT `fk_departure_times_observations_departures_times` FOREIGN KEY (`departure_time_id`) REFERENCES `departure_times` (`schedule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emails`
--

DROP TABLE IF EXISTS `emails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message_id` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `subject` varchar(512) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `sender` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `recipients_to` text COLLATE utf8mb3_unicode_ci,
  `recipients_cc` text COLLATE utf8mb3_unicode_ci,
  `recipients_bcc` text COLLATE utf8mb3_unicode_ci,
  `date` datetime DEFAULT NULL,
  `body_text` longtext COLLATE utf8mb3_unicode_ci,
  `body_html` longtext COLLATE utf8mb3_unicode_ci,
  `folder` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `message_id` (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fare_history`
--

DROP TABLE IF EXISTS `fare_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fare_history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `value` decimal(10,2) unsigned NOT NULL,
  `datetime_modify` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `line_id_of_fare` int NOT NULL,
  `init_valid_fare` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_valid_fare` datetime DEFAULT NULL,
  `increase_percent` decimal(10,4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_line_id_of_tare` (`line_id_of_fare`)
) ENGINE=InnoDB AUTO_INCREMENT=361 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `guide_ts`
--

DROP TABLE IF EXISTS `guide_ts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guide_ts` (
  `id_guide_ts` bigint NOT NULL AUTO_INCREMENT,
  `departure_point_id` bigint DEFAULT NULL,
  `line_id` bigint DEFAULT NULL,
  `physical_stop_id` int NOT NULL,
  `line_number` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `line_name` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `point_name` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `address` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `active` char(1) COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_guide_ts`)
) ENGINE=InnoDB AUTO_INCREMENT=774257 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `guide_vw`
--

DROP TABLE IF EXISTS `guide_vw`;
/*!50001 DROP VIEW IF EXISTS `guide_vw`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `guide_vw` AS SELECT 
 1 AS `departure_point_id`,
 1 AS `line_id`,
 1 AS `line_number`,
 1 AS `line_name`,
 1 AS `point_name`,
 1 AS `address`,
 1 AS `physical_stop_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `lines`
--

DROP TABLE IF EXISTS `lines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lines` (
  `line_id` int NOT NULL AUTO_INCREMENT,
  `line_number` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `line_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `departure_location` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `destination_location` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `fare` decimal(5,2) NOT NULL,
  `fare_id` bigint DEFAULT NULL,
  `company_id` int DEFAULT NULL,
  `system_id` int DEFAULT NULL,
  `modal` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 - Ônibus; 2 - Metrô',
  `mode` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT 'Tipo de ônibus (ex: articulado, convencional)',
  `is_public` tinyint(1) DEFAULT NULL COMMENT 'Se é transporte público ou privado',
  `has_integration` tinyint(1) DEFAULT NULL COMMENT 'Se possui integração com outras linhas',
  `observations` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `type` int DEFAULT NULL COMMENT 'Tipo da linha: 1 - Coletivo Urbano; 2 - Executivo Urbano; 3 - Executivo Rodoviário; 4 - Coletivo Rodoviário; 5 - Seletivo',
  `direction` int DEFAULT NULL,
  `scope` int NOT NULL COMMENT 'Abrangência: 1 - Municipal; 2 - Metropolitano; 3 - Rodoviário; 4 - Intermunicipal',
  `active` int NOT NULL DEFAULT '1',
  `accessibility` tinyint(1) NOT NULL DEFAULT '1',
  `aircon` tinyint(1) NOT NULL DEFAULT '1',
  `linescol` tinyint(1) NOT NULL DEFAULT '1',
  `teraflex` tinyint(1) NOT NULL DEFAULT '1',
  `bench` tinyint(1) NOT NULL DEFAULT '1',
  `fleet` tinyint(1) NOT NULL DEFAULT '1',
  `airsuspension` tinyint(1) NOT NULL DEFAULT '1',
  `wifi` tinyint(1) NOT NULL DEFAULT '1',
  `conc` tinyint(1) NOT NULL DEFAULT '1',
  `atws` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`line_id`),
  KEY `company_id` (`company_id`),
  KEY `system_id` (`system_id`),
  KEY `in_lines_line_number` (`line_number`),
  KEY `lines_ibfk_3_idx` (`fare_id`),
  CONSTRAINT `lines_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`),
  CONSTRAINT `lines_ibfk_2` FOREIGN KEY (`system_id`) REFERENCES `systems` (`system_id`),
  CONSTRAINT `lines_ibfk_3` FOREIGN KEY (`fare_id`) REFERENCES `fare_history` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `trg_lines_after_insert` AFTER INSERT ON `lines` FOR EACH ROW BEGIN
    INSERT INTO fare_history (
        value,
        line_id_of_fare,
        increase_percent
    ) VALUES (
        NEW.fare,
        NEW.line_id,
        0
    );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `trg_lines_after_update` AFTER UPDATE ON `lines` FOR EACH ROW BEGIN
    IF OLD.fare <> NEW.fare THEN
        INSERT INTO fare_history (
            value,
            line_id_of_fare,
            increase_percent
        ) VALUES (
            NEW.fare,
            NEW.line_id,
            ((NEW.fare - OLD.fare) / OLD.fare) * 100
        );
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `trg_lines_after_delete` AFTER DELETE ON `lines` FOR EACH ROW BEGIN
    INSERT INTO fare_history (
        value,
        line_id_of_fare,
        increase_percent
    ) VALUES (
        OLD.fare,
        OLD.line_id,
        0
    );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `lines_warnings`
--

DROP TABLE IF EXISTS `lines_warnings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lines_warnings` (
  `line_id` int NOT NULL,
  `warning_id` bigint NOT NULL,
  `active` char(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '1',
  PRIMARY KEY (`line_id`,`warning_id`),
  KEY `fk_lines_warnings_warnings_idx` (`warning_id`),
  CONSTRAINT `fk_lines_warnings_lines` FOREIGN KEY (`line_id`) REFERENCES `lines` (`line_id`),
  CONSTRAINT `fk_lines_warnings_warnings` FOREIGN KEY (`warning_id`) REFERENCES `warnings` (`warning_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logs` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `log_timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `origin` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `table_name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `event_type` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `event_details` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `user_id` int DEFAULT NULL,
  `os` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `browser` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ip_address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `user_agent` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `page` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `line_id_access` int DEFAULT NULL,
  `referrer` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`log_id`),
  KEY `line_id_access` (`line_id_access`)
) ENGINE=InnoDB AUTO_INCREMENT=3294 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `observations`
--

DROP TABLE IF EXISTS `observations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `observations` (
  `observation_id` int NOT NULL AUTO_INCREMENT,
  `observation_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `observation_abrev` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`observation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci COMMENT='Observações para caracterizar os horários de partidas';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `physical_stops`
--

DROP TABLE IF EXISTS `physical_stops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `physical_stops` (
  `stop_id` int NOT NULL AUTO_INCREMENT,
  `stop_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `city_id` mediumint DEFAULT NULL,
  PRIMARY KEY (`stop_id`),
  KEY `idx_address` (`address`),
  KEY `fk_physical_stops_city` (`city_id`),
  CONSTRAINT `fk_physical_stops_city` FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5083 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `recharge_points`
--

DROP TABLE IF EXISTS `recharge_points`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recharge_points` (
  `recharge_point_id` int NOT NULL AUTO_INCREMENT,
  `company_id` int DEFAULT NULL,
  `point_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `link_google_maps` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `observations` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`recharge_point_id`),
  KEY `fk_recharge_points_companies_idx` (`company_id`),
  CONSTRAINT `fk_recharge_points_companies` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `report_id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `subject` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `message` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `page` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `report_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_validate` char(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '0',
  `temp_code_id` bigint NOT NULL,
  PRIMARY KEY (`report_id`),
  KEY `fk_temp_code_id_idx` (`temp_code_id`),
  CONSTRAINT `fk_temp_code_id` FOREIGN KEY (`temp_code_id`) REFERENCES `temp_code` (`temp_code_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(128) COLLATE utf8mb3_unicode_ci NOT NULL,
  `user_id` int DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb3_unicode_ci,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `states` (
  `state_id` tinyint NOT NULL AUTO_INCREMENT,
  `state_sigla` char(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `state_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`state_id`),
  UNIQUE KEY `sigla_UNIQUE` (`state_sigla`),
  UNIQUE KEY `name_UNIQUE` (`state_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `systems`
--

DROP TABLE IF EXISTS `systems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `systems` (
  `system_id` int NOT NULL AUTO_INCREMENT,
  `system_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`system_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci COMMENT='Bus system table (e.g., municipal, intercity)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `temp_code`
--

DROP TABLE IF EXISTS `temp_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temp_code` (
  `temp_code_id` bigint NOT NULL AUTO_INCREMENT,
  `code` bigint NOT NULL,
  `datetime_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `datetime_validate` datetime NOT NULL,
  PRIMARY KEY (`temp_code_id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `time_first_start`
--

DROP TABLE IF EXISTS `time_first_start`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `time_first_start` (
  `data` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `otp_code` varchar(10) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `otp_expires_at` datetime DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `warnings`
--

DROP TABLE IF EXISTS `warnings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warnings` (
  `warning_id` bigint NOT NULL,
  `title` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `text` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `frequency` tinyint(1) NOT NULL COMMENT '1 - nenhuma; 2 - semanal; 3 - anual; 4 - diaria',
  `time_init` time DEFAULT NULL,
  `time_finish` time DEFAULT NULL,
  `day_init` char(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `day_finish` char(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `date_init` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT 'Usa varchar como tipo de dado pois só precisa de usar o dia e mês',
  `date_finish` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT 'Usa varchar como tipo de dado pois só precisa de usar o dia e mês',
  `datetime_init` datetime DEFAULT NULL,
  `datetime_finish` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`warning_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci COMMENT='Avisos para as linhas, que podem se repetir por período de tempo, de acordo com critérios definidos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'bus_system'
--

--
-- Dumping routines for database 'bus_system'
--
/*!50003 DROP FUNCTION IF EXISTS `get_arrival_predictions` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `get_arrival_predictions`(
    in_physical_stop_id INT,
    in_start_time DATETIME
) RETURNS json
    DETERMINISTIC
BEGIN
    DECLARE result JSON DEFAULT JSON_ARRAY();
    DECLARE sql_error BOOL DEFAULT FALSE;

    -- Tratamento de erro
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
        SET sql_error = TRUE;

    -- Executa o SELECT e concatena os resultados em JSON
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'order_departure_point', dp.order_departure_point,
            'line_id', l.line_id,
            'line_number', l.line_number,
            'line_name', l.line_name,
            'departure_location', l.departure_location,
            'destination_location', l.destination_location,
            'direction', p.direction,
            'departure_time_trip', p.departure_time_trip,
            'expected_arrival_time', p.expected_arrival_time,
            'prediction_line_order', p.prediction_line_order,
            'total_departure_points', (
                SELECT COUNT(*) FROM departure_points WHERE line_id = l.line_id
            )
        )
    )
    INTO result
    FROM arrival_predictions AS p
        JOIN departure_points AS dp ON p.departure_point_id = dp.departure_point_id
        JOIN `lines` AS l ON p.line_id = l.line_id
    WHERE
        dp.physical_stop_id = in_physical_stop_id
        AND p.expected_arrival_time BETWEEN in_start_time AND DATE_ADD(in_start_time, INTERVAL 20 MINUTE)
        AND p.prediction_line_order IS NOT NULL
        AND p.status = '1'
    ORDER BY p.prediction_generated_in DESC, p.expected_arrival_time
    LIMIT 50;

    -- Retorna erro ou resultado
    IF sql_error THEN
        RETURN JSON_OBJECT('error', 'An SQL error occurred while executing the query.');
    ELSEIF result IS NULL THEN
        RETURN JSON_ARRAY(); -- Retorna array vazio se nada encontrado
    END IF;

    RETURN result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `get_arrival_predictions_filter_per_line` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `get_arrival_predictions_filter_per_line`(
    in_physical_stop_id INT,
    in_line_id INT,
    in_start_time DATETIME
) RETURNS json
    DETERMINISTIC
BEGIN
    DECLARE result JSON DEFAULT JSON_ARRAY();
    DECLARE sql_error BOOL DEFAULT FALSE;

    -- Tratamento de erro
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
        SET sql_error = TRUE;

    -- Executa o SELECT e concatena os resultados em JSON
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'order_departure_point', dp.order_departure_point,
            'line_id', l.line_id,
            'line_number', l.line_number,
            'line_name', l.line_name,
            'departure_location', l.departure_location,
            'destination_location', l.destination_location,
            'direction', p.direction,
            'departure_time_trip', p.departure_time_trip,
            'expected_arrival_time', p.expected_arrival_time,
            'prediction_line_order', p.prediction_line_order,
            'total_departure_points', (
                SELECT COUNT(*) FROM departure_points WHERE line_id = l.line_id
            )
        ) 
    )
    INTO result
    FROM arrival_predictions AS p
        JOIN departure_points AS dp ON p.departure_point_id = dp.departure_point_id
        JOIN `lines` AS l ON p.line_id = l.line_id
    WHERE
        dp.physical_stop_id = in_physical_stop_id
        AND l.line_id = in_line_id
        AND p.expected_arrival_time BETWEEN in_start_time AND DATE_ADD(in_start_time, INTERVAL 20 MINUTE)
        AND p.prediction_line_order IS NOT NULL
        AND p.status = '1'
    ORDER BY p.prediction_generated_in DESC, p.expected_arrival_time
	LIMIT 50;

    -- Retorna erro ou resultado
    IF sql_error THEN
        RETURN JSON_OBJECT('error', 'An SQL error occurred while executing the query.');
    ELSEIF result IS NULL THEN
        RETURN JSON_ARRAY(); -- Retorna array vazio se nada encontrado
    END IF;

    RETURN result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `duplicate_departure_points` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `duplicate_departure_points`(dl_line_id INT)
BEGIN
    DECLARE done INT DEFAULT FALSE;
	DECLARE v_direction TINYINT(1);
    DECLARE v_order_departure_point MEDIUMINT;
    DECLARE v_point_name VARCHAR(255);
    DECLARE v_address VARCHAR(255);
    DECLARE v_city_id MEDIUMINT;
    DECLARE v_state_id TINYINT;
    DECLARE v_observations TEXT;

    DECLARE cur CURSOR FOR SELECT `direction`, `order_departure_point`, `point_name`, `address`, `city_id`, `state_id`, `observations` FROM `departure_points` WHERE line_id = 19;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO v_direction, v_order_departure_point, v_point_name, v_address, v_city_id, v_state_id, v_observations;
        IF done THEN
            LEAVE read_loop;
        END IF;

        INSERT INTO `departure_points` (`line_id`, `direction`, `order_departure_point`, `point_name`, `address`, `city_id`, `state_id`, `observations`) 
        VALUES (dl_line_id, v_direction, v_order_departure_point, v_point_name, v_address, v_city_id, v_state_id, v_observations);
    END LOOP;

    CLOSE cur;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_next_arrival_predictions` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `get_next_arrival_predictions`(
    IN in_physical_stop_id INT,
    IN in_start_time DATETIME,
    OUT out_result JSON
)
BEGIN
    DECLARE sql_error BOOL DEFAULT FALSE;

    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
        SET sql_error = TRUE;

    SELECT JSON_ARRAYAGG(row_json) INTO out_result
    FROM (
        SELECT 
            JSON_OBJECT(
                'order_departure_point', dp.order_departure_point,
                'line_id', l.line_id,
                'line_number', l.line_number,
                'line_name', l.line_name,
                'departure_location', l.departure_location,
                'destination_location', l.destination_location,
                'direction', p.direction,
                'departure_time_trip', p.departure_time_trip,
                'expected_arrival_time', p.expected_arrival_time,
                'prediction_line_order', p.prediction_line_order,
                'prediction_generated_in', p.prediction_generated_in,
                'total_departure_points', (SELECT COUNT(*) FROM departure_points WHERE line_id = l.line_id)
            ) AS row_json
        FROM arrival_predictions AS p
        JOIN departure_points AS dp ON p.departure_point_id = dp.departure_point_id
        JOIN `lines` AS l ON p.line_id = l.line_id
        WHERE
            dp.physical_stop_id = in_physical_stop_id
            AND p.expected_arrival_time BETWEEN 
                DATE_ADD(in_start_time, INTERVAL 1 MINUTE)
                AND DATE_ADD(DATE_ADD(in_start_time, INTERVAL 1 MINUTE), INTERVAL 24 HOUR)
            AND p.prediction_line_order IS NOT NULL
            AND p.status = '1'
        ORDER BY ABS(TIMESTAMPDIFF(SECOND, p.expected_arrival_time, in_start_time)) ASC,
                 p.prediction_generated_in DESC
        LIMIT 1000
    ) AS t;

    IF sql_error OR out_result IS NULL THEN
        SET out_result = JSON_ARRAY(); -- retorna array vazio em erro ou sem rows
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_next_arrival_predictions_filter_per_line` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `get_next_arrival_predictions_filter_per_line`(
    IN in_physical_stop_id INT,
	IN in_line_id INT,
    IN in_start_time DATETIME,
    OUT out_result JSON
)
BEGIN
    DECLARE sql_error BOOL DEFAULT FALSE;

    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
        SET sql_error = TRUE;

    SELECT JSON_ARRAYAGG(row_json) INTO out_result
    FROM (
        SELECT 
            JSON_OBJECT(
                'order_departure_point', dp.order_departure_point,
                'line_id', l.line_id,
                'line_number', l.line_number,
                'line_name', l.line_name,
                'departure_location', l.departure_location,
                'destination_location', l.destination_location,
                'direction', p.direction,
                'departure_time_trip', p.departure_time_trip,
                'expected_arrival_time', p.expected_arrival_time,
                'prediction_line_order', p.prediction_line_order,
                'prediction_generated_in', p.prediction_generated_in,
                'total_departure_points', (SELECT COUNT(*) FROM departure_points WHERE line_id = l.line_id)
            ) AS row_json
        FROM arrival_predictions AS p
        JOIN departure_points AS dp ON p.departure_point_id = dp.departure_point_id
        JOIN `lines` AS l ON p.line_id = l.line_id
        WHERE
            dp.physical_stop_id = in_physical_stop_id
			AND l.line_id = in_line_id
            AND p.expected_arrival_time BETWEEN 
                DATE_ADD(in_start_time, INTERVAL 1 MINUTE)
                AND DATE_ADD(DATE_ADD(in_start_time, INTERVAL 1 MINUTE), INTERVAL 24 HOUR)
            AND p.prediction_line_order IS NOT NULL
            AND p.status = '1'
        ORDER BY 
			ABS(TIMESTAMPDIFF(SECOND, p.expected_arrival_time, in_start_time)) ASC,
            p.prediction_generated_in DESC
        LIMIT 1000
    ) AS t;

    IF sql_error OR out_result IS NULL THEN
        SET out_result = JSON_ARRAY(); -- retorna array vazio em erro ou sem rows
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_time_first_start` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `get_time_first_start`(line_id INT)
BEGIN
  DECLARE done INT DEFAULT FALSE;
  DECLARE i TINYINT(4);
  DECLARE departure_time TIME; 
  DECLARE res TEXT;
  DECLARE cur1 CURSOR FOR 
  
	SELECT DISTINCT dt.`day`, MIN(dt.departure_time) 
    FROM departure_times AS dt 
    WHERE dt.line_id = line_id AND dt.direction = 1 
    GROUP BY dt.`day` 
    ORDER BY dt.`day`;

  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
  OPEN cur1;
  SET res = "";

  read_loop: LOOP
    FETCH cur1 INTO i, departure_time; 
    IF done THEN
      LEAVE read_loop;
    END IF;

    SET res = CONCAT(res, i, " => ", departure_time, ";");
  END LOOP;

  SELECT res AS 'get_time_first_start';
  INSERT INTO time_first_start (`data`) VALUE (res);
  CLOSE cur1; 
 END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `populate_tare_history` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `populate_tare_history`()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_line_id INT;
    DECLARE v_fare DECIMAL(10,2);
    DECLARE v_new_fare_id BIGINT;

    -- Declara o cursor
    DECLARE cur_lines CURSOR FOR
        SELECT line_id, fare FROM `lines`;

    -- Tratamento de fim do cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur_lines;

    read_loop: LOOP
        FETCH cur_lines INTO v_line_id, v_fare;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Inserir registro em tare_history
        INSERT INTO fare_history (
            value,
            line_id_of_fare,
            datetime_modify,
            init_valid_fare
        )
        VALUES (
            v_fare,
            v_line_id,
            NOW(),
            NOW()
        );

        -- Capturar o ID da inserção
        SET v_new_fare_id = LAST_INSERT_ID();

        -- Atualizar o registro em lines
        UPDATE `lines`
        SET fare_id = v_new_fare_id
        WHERE line_id = v_line_id;
    END LOOP;

    CLOSE cur_lines;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_populate_guide_ts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_populate_guide_ts`()
BEGIN
    -- 1. Declaração das variáveis para armazenar os dados de cada linha da view
    DECLARE v_departure_point_id BIGINT(10);
    DECLARE v_line_id BIGINT(5);
    DECLARE v_line_number VARCHAR(15);
    DECLARE v_line_name TEXT;
    DECLARE v_point_name TEXT;
    DECLARE v_address TEXT;
    DECLARE v_physical_stop_id INT;

    -- 2. Variável de controle para saber quando o cursor terminar
    DECLARE done INT DEFAULT FALSE;

    -- 3. Declaração do cursor que seleciona os dados da sua view
    DECLARE cur_guide CURSOR FOR
        SELECT
            gv.departure_point_id,
            gv.line_id,
            gv.line_number,
            gv.line_name,
            gv.point_name,
            gv.address,
            gv.physical_stop_id
        FROM guide_vw AS gv
        INNER JOIN `lines` AS l
        ON l.line_id = gv.line_id
        WHERE l.`active` = 1; 

    -- 4. Handler para atualizar a variável 'done' quando não houver mais linhas para ler
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Altera status para inativo
	UPDATE guide_ts SET `active` = 0 WHERE `active` = 1 AND line_number IS NOT NULL;

    -- 5. Abre o cursor para iniciar a consulta
    OPEN cur_guide;

    -- 6. Inicia o loop para ler as linhas
    read_loop: LOOP
        -- Pega os dados da próxima linha e armazena nas variáveis
        FETCH cur_guide INTO
            v_departure_point_id,
            v_line_id,
            v_line_number,
            v_line_name,
            v_point_name,
            v_address,
            v_physical_stop_id;

        -- Se 'done' for TRUE, significa que não há mais linhas, então sai do loop
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- 7. Insere a linha atual na tabela de destino 'guide_ts'
        INSERT INTO guide_ts (
            departure_point_id,
            line_id,
            line_number,
            line_name,
            point_name,
            address,
            physical_stop_id
        ) VALUES (
            v_departure_point_id,
            v_line_id,
            v_line_number,
            v_line_name,
            v_point_name,
            v_address,
            v_physical_stop_id
        );

    END LOOP read_loop;

    -- 8. Fecha o cursor para liberar os recursos
    CLOSE cur_guide;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `guide_vw`
--

/*!50001 DROP VIEW IF EXISTS `guide_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `guide_vw` AS select `dp`.`departure_point_id` AS `departure_point_id`,`dp`.`line_id` AS `line_id`,`l`.`line_number` AS `line_number`,`l`.`line_name` AS `line_name`,`dp`.`point_name` AS `point_name`,`dp`.`address` AS `address`,`dp`.`physical_stop_id` AS `physical_stop_id` from (`departure_points` `dp` join `lines` `l` on((`dp`.`line_id` = `l`.`line_id`))) order by `dp`.`address`,`l`.`line_number` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-19 21:04:15
