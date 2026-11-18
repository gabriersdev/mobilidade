-- ============================================================================
-- Script de inserção das linhas municipais do TCS (Transporte Coletivo Suplementar)
-- Baseado no PDF oficial com 15 páginas (16 linhas registradas devido à divisão V1/V2 na pág. 11)
-- Banco de dados alvo: bus_system (MySQL 8+/9+)
-- Escopo: companies (se necessário), lines, fare_history (via trigger) e departure_times
-- Observação: pontos de parada (departure_points) não são inseridos neste script.
-- ============================================================================

USE `bus_system`;
SET NAMES utf8mb4;

START TRANSACTION;

-- ----------------------------------------------------------------------------
-- 1. Garantia de registros auxiliares (company, system e day_types)
-- ----------------------------------------------------------------------------
INSERT INTO `companies` (`company_name`, `contact`, `report_contact`)
SELECT
  'TCS - Transporte Coletivo Suplementar',
  'Prefeitura Municipal de Sabará',
  'https://site.sabara.mg.gov.br/cidadao/ouvidoria/'
WHERE NOT EXISTS (
  SELECT 1
  FROM `companies`
  WHERE `company_name` = 'TCS - Transporte Coletivo Suplementar'
);

SET @company_id = (
  SELECT `company_id`
  FROM `companies`
  WHERE `company_name` = 'TCS - Transporte Coletivo Suplementar'
  LIMIT 1
);

INSERT INTO `systems` (`system_name`)
SELECT 'Municipal'
WHERE NOT EXISTS (
  SELECT 1 FROM `systems`
);

SET @system_id = COALESCE(
  (SELECT `system_id` FROM `lines` WHERE `company_id` = 3 AND `system_id` IS NOT NULL LIMIT 1),
  (SELECT `system_id` FROM `systems` WHERE LOWER(`system_name`) LIKE '%municipal%' OR LOWER(`system_name`) LIKE '%sabar%' ORDER BY `system_id` ASC LIMIT 1),
  (SELECT `system_id` FROM `systems` ORDER BY `system_id` ASC LIMIT 1)
);

-- Garantia dos tipos de dia PC1 caso o script rode em base limpa
INSERT INTO `day_types` (`day_type_id`, `day_type_name`)
SELECT 5, 'DIA ÚTIL PC1'
WHERE NOT EXISTS (SELECT 1 FROM `day_types` WHERE `day_type_id` = 5);

INSERT INTO `day_types` (`day_type_id`, `day_type_name`)
SELECT 6, 'SÁBADO PC1'
WHERE NOT EXISTS (SELECT 1 FROM `day_types` WHERE `day_type_id` = 6);

INSERT INTO `day_types` (`day_type_id`, `day_type_name`)
SELECT 7, 'DOMINGO/FERIADO PC1'
WHERE NOT EXISTS (SELECT 1 FROM `day_types` WHERE `day_type_id` = 7);


-- ----------------------------------------------------------------------------
-- PÁGINA 01: S01 - Siderúrgica/Ravena
-- 1ª saída: Siderúrgica (05:50) -> Ravena (06:50)
-- Sentidos: 1 (Ida: Siderúrgica -> Ravena), 2 (Volta: Ravena -> Siderúrgica)
-- ----------------------------------------------------------------------------
INSERT INTO `lines` (
  `line_number`, `line_name`, `departure_location`, `destination_location`,
  `fare`, `company_id`, `system_id`, `modal`, `mode`, `is_public`,
  `has_integration`, `observations`, `type`, `direction`, `scope`, `active`
) VALUES (
  'S01', 'Siderúrgica/Ravena', 'Siderúrgica', 'Ravena',
  0.00, @company_id, @system_id, 1, NULL, 1,
  0, NULL, 1, 1, 1, 1
);
SET @line_id_s01 = LAST_INSERT_ID();
UPDATE `lines`
SET `fare_id` = (SELECT `id` FROM `fare_history` WHERE `line_id_of_fare` = @line_id_s01 ORDER BY `id` DESC LIMIT 1)
WHERE `line_id` = @line_id_s01;

INSERT INTO `departure_times` (`line_id`, `day`, `departure_time`, `direction`, `day_type_id`, `active`) VALUES
  -- Dias úteis (5) - Sentido 1 (Saída Siderúrgica)
  (@line_id_s01, 5, '05:50:00', 1, 5, 1),
  (@line_id_s01, 5, '06:40:00', 1, 5, 1),
  (@line_id_s01, 5, '07:30:00', 1, 5, 1),
  (@line_id_s01, 5, '11:00:00', 1, 5, 1),
  (@line_id_s01, 5, '14:00:00', 1, 5, 1),
  (@line_id_s01, 5, '17:00:00', 1, 5, 1),
  (@line_id_s01, 5, '18:00:00', 1, 5, 1),
  -- Dias úteis (5) - Sentido 2 (Saída Ravena)
  (@line_id_s01, 5, '06:50:00', 2, 5, 1),
  (@line_id_s01, 5, '07:40:00', 2, 5, 1),
  (@line_id_s01, 5, '08:40:00', 2, 5, 1),
  (@line_id_s01, 5, '12:00:00', 2, 5, 1),
  (@line_id_s01, 5, '15:30:00', 2, 5, 1),
  (@line_id_s01, 5, '18:00:00', 2, 5, 1),
  (@line_id_s01, 5, '19:10:00', 2, 5, 1),
  -- Sábado (6) - Sentido 1 (Saída Siderúrgica)
  (@line_id_s01, 6, '06:00:00', 1, 6, 1),
  (@line_id_s01, 6, '08:30:00', 1, 6, 1),
  (@line_id_s01, 6, '17:00:00', 1, 6, 1),
  -- Sábado (6) - Sentido 2 (Saída Ravena)
  (@line_id_s01, 6, '07:00:00', 2, 6, 1),
  (@line_id_s01, 6, '09:30:00', 2, 6, 1),
  (@line_id_s01, 6, '18:00:00', 2, 6, 1),
  -- Domingo/Feriado (7) - Sentido 1 (Saída Siderúrgica)
  (@line_id_s01, 7, '06:00:00', 1, 7, 1),
  (@line_id_s01, 7, '08:30:00', 1, 7, 1),
  (@line_id_s01, 7, '17:00:00', 1, 7, 1),
  -- Domingo/Feriado (7) - Sentido 2 (Saída Ravena)
  (@line_id_s01, 7, '07:00:00', 2, 7, 1),
  (@line_id_s01, 7, '09:30:00', 2, 7, 1),
  (@line_id_s01, 7, '18:00:00', 2, 7, 1);


-- ----------------------------------------------------------------------------
-- PÁGINA 02: S02 - Rosário/Centro/Cabral
-- 1ª saída: Cabral (06:30) -> Rosário (07:00)
-- Sentidos: 1 (Ida: Cabral -> Rosário), 2 (Volta: Rosário -> Cabral)
-- ----------------------------------------------------------------------------
INSERT INTO `lines` (
  `line_number`, `line_name`, `departure_location`, `destination_location`,
  `fare`, `company_id`, `system_id`, `modal`, `mode`, `is_public`,
  `has_integration`, `observations`, `type`, `direction`, `scope`, `active`
) VALUES (
  'S02', 'Rosário/Centro/Cabral', 'Cabral', 'Rosário',
  0.00, @company_id, @system_id, 1, NULL, 1,
  0, NULL, 1, 1, 1, 1
);
SET @line_id_s02 = LAST_INSERT_ID();
UPDATE `lines`
SET `fare_id` = (SELECT `id` FROM `fare_history` WHERE `line_id_of_fare` = @line_id_s02 ORDER BY `id` DESC LIMIT 1)
WHERE `line_id` = @line_id_s02;

INSERT INTO `departure_times` (`line_id`, `day`, `departure_time`, `direction`, `day_type_id`, `active`) VALUES
  -- Dias úteis (5) - Sentido 1 (Saída Cabral)
  (@line_id_s02, 5, '06:30:00', 1, 5, 1),
  (@line_id_s02, 5, '07:40:00', 1, 5, 1),
  (@line_id_s02, 5, '09:00:00', 1, 5, 1),
  (@line_id_s02, 5, '10:30:00', 1, 5, 1),
  (@line_id_s02, 5, '11:20:00', 1, 5, 1),
  (@line_id_s02, 5, '12:10:00', 1, 5, 1),
  (@line_id_s02, 5, '13:30:00', 1, 5, 1),
  (@line_id_s02, 5, '14:30:00', 1, 5, 1),
  (@line_id_s02, 5, '15:35:00', 1, 5, 1),
  (@line_id_s02, 5, '16:50:00', 1, 5, 1),
  (@line_id_s02, 5, '18:20:00', 1, 5, 1),
  (@line_id_s02, 5, '19:30:00', 1, 5, 1),
  (@line_id_s02, 5, '20:45:00', 1, 5, 1),
  (@line_id_s02, 5, '22:25:00', 1, 5, 1),
  -- Dias úteis (5) - Sentido 2 (Saída Rosário)
  (@line_id_s02, 5, '07:00:00', 2, 5, 1),
  (@line_id_s02, 5, '08:20:00', 2, 5, 1),
  (@line_id_s02, 5, '09:40:00', 2, 5, 1),
  (@line_id_s02, 5, '11:25:00', 2, 5, 1),
  (@line_id_s02, 5, '12:00:00', 2, 5, 1),
  (@line_id_s02, 5, '12:40:00', 2, 5, 1),
  (@line_id_s02, 5, '14:10:00', 2, 5, 1),
  (@line_id_s02, 5, '15:30:00', 2, 5, 1),
  (@line_id_s02, 5, '16:15:00', 2, 5, 1),
  (@line_id_s02, 5, '17:20:00', 2, 5, 1),
  (@line_id_s02, 5, '18:50:00', 2, 5, 1),
  (@line_id_s02, 5, '20:10:00', 2, 5, 1);


-- ----------------------------------------------------------------------------
-- PÁGINA 03: S03 - Mangueiras/Morro da Cruz
-- 1ª saída (dias úteis): Morro da Cruz (05:30) -> Mangueiras (06:45)
-- Sentidos: 1 (Ida: Morro da Cruz -> Mangueiras), 2 (Volta: Mangueiras -> Morro da Cruz)
-- ----------------------------------------------------------------------------
INSERT INTO `lines` (
  `line_number`, `line_name`, `departure_location`, `destination_location`,
  `fare`, `company_id`, `system_id`, `modal`, `mode`, `is_public`,
  `has_integration`, `observations`, `type`, `direction`, `scope`, `active`
) VALUES (
  'S03', 'Mangueiras/Morro da Cruz', 'Morro da Cruz', 'Mangueiras',
  0.00, @company_id, @system_id, 1, NULL, 1,
  0, NULL, 1, 1, 1, 1
);
SET @line_id_s03 = LAST_INSERT_ID();
UPDATE `lines`
SET `fare_id` = (SELECT `id` FROM `fare_history` WHERE `line_id_of_fare` = @line_id_s03 ORDER BY `id` DESC LIMIT 1)
WHERE `line_id` = @line_id_s03;

INSERT INTO `departure_times` (`line_id`, `day`, `departure_time`, `direction`, `day_type_id`, `active`) VALUES
  -- Dias úteis (5) - Sentido 1 (Saída Morro da Cruz)
  (@line_id_s03, 5, '05:30:00', 1, 5, 1),
  (@line_id_s03, 5, '06:20:00', 1, 5, 1),
  (@line_id_s03, 5, '07:30:00', 1, 5, 1),
  (@line_id_s03, 5, '09:00:00', 1, 5, 1),
  (@line_id_s03, 5, '10:45:00', 1, 5, 1),
  (@line_id_s03, 5, '12:00:00', 1, 5, 1),
  (@line_id_s03, 5, '14:00:00', 1, 5, 1),
  (@line_id_s03, 5, '15:30:00', 1, 5, 1),
  (@line_id_s03, 5, '17:00:00', 1, 5, 1),
  (@line_id_s03, 5, '18:30:00', 1, 5, 1),
  -- Dias úteis (5) - Sentido 2 (Saída Mangueiras)
  (@line_id_s03, 5, '06:45:00', 2, 5, 1),
  (@line_id_s03, 5, '08:00:00', 2, 5, 1),
  (@line_id_s03, 5, '10:00:00', 2, 5, 1),
  (@line_id_s03, 5, '11:20:00', 2, 5, 1),
  (@line_id_s03, 5, '12:30:00', 2, 5, 1),
  (@line_id_s03, 5, '14:40:00', 2, 5, 1),
  (@line_id_s03, 5, '16:00:00', 2, 5, 1),
  (@line_id_s03, 5, '17:30:00', 2, 5, 1),
  (@line_id_s03, 5, '19:00:00', 2, 5, 1),
  -- Sábado (6) - Sentido 1 (Saída Morro da Cruz)
  (@line_id_s03, 6, '07:30:00', 1, 6, 1),
  (@line_id_s03, 6, '10:30:00', 1, 6, 1),
  (@line_id_s03, 6, '12:00:00', 1, 6, 1),
  (@line_id_s03, 6, '17:00:00', 1, 6, 1),
  (@line_id_s03, 6, '18:20:00', 1, 6, 1),
  (@line_id_s03, 6, '20:00:00', 1, 6, 1),
  -- Sábado (6) - Sentido 2 (Saída Mangueiras)
  (@line_id_s03, 6, '06:45:00', 2, 6, 1),
  (@line_id_s03, 6, '08:00:00', 2, 6, 1),
  (@line_id_s03, 6, '10:00:00', 2, 6, 1),
  (@line_id_s03, 6, '12:30:00', 2, 6, 1),
  (@line_id_s03, 6, '17:30:00', 2, 6, 1),
  (@line_id_s03, 6, '18:50:00', 2, 6, 1),
  (@line_id_s03, 6, '20:35:00', 2, 6, 1),
  -- Domingo/Feriado (7) - Sentido 1 (Saída Morro da Cruz)
  (@line_id_s03, 7, '07:30:00', 1, 7, 1),
  (@line_id_s03, 7, '10:30:00', 1, 7, 1),
  (@line_id_s03, 7, '12:00:00', 1, 7, 1),
  (@line_id_s03, 7, '17:00:00', 1, 7, 1),
  (@line_id_s03, 7, '18:20:00', 1, 7, 1),
  (@line_id_s03, 7, '20:00:00', 1, 7, 1),
  -- Domingo/Feriado (7) - Sentido 2 (Saída Mangueiras)
  (@line_id_s03, 7, '06:45:00', 2, 7, 1),
  (@line_id_s03, 7, '08:00:00', 2, 7, 1),
  (@line_id_s03, 7, '10:00:00', 2, 7, 1),
  (@line_id_s03, 7, '12:30:00', 2, 7, 1),
  (@line_id_s03, 7, '17:30:00', 2, 7, 1),
  (@line_id_s03, 7, '18:50:00', 2, 7, 1),
  (@line_id_s03, 7, '20:35:00', 2, 7, 1);


-- ----------------------------------------------------------------------------
-- PÁGINA 04: S04 - Centro Histórico/Rosário III (CIRCULAR)
-- Sentido: 0 (Único - ida e volta)
-- ----------------------------------------------------------------------------
INSERT INTO `lines` (
  `line_number`, `line_name`, `departure_location`, `destination_location`,
  `fare`, `company_id`, `system_id`, `modal`, `mode`, `is_public`,
  `has_integration`, `observations`, `type`, `direction`, `scope`, `active`
) VALUES (
  'S04', 'Centro Histórico/Rosário III', 'Centro Histórico', 'Rosário III',
  0.00, @company_id, @system_id, 1, NULL, 1,
  0, NULL, 1, 0, 1, 1
);
SET @line_id_s04 = LAST_INSERT_ID();
UPDATE `lines`
SET `fare_id` = (SELECT `id` FROM `fare_history` WHERE `line_id_of_fare` = @line_id_s04 ORDER BY `id` DESC LIMIT 1)
WHERE `line_id` = @line_id_s04;

INSERT INTO `departure_times` (`line_id`, `day`, `departure_time`, `direction`, `day_type_id`, `active`) VALUES
  -- Dias úteis (5) - Sentido único (0)
  (@line_id_s04, 5, '06:00:00', 0, 5, 1),
  (@line_id_s04, 5, '08:00:00', 0, 5, 1),
  (@line_id_s04, 5, '10:00:00', 0, 5, 1),
  (@line_id_s04, 5, '12:00:00', 0, 5, 1),
  (@line_id_s04, 5, '13:30:00', 0, 5, 1),
  (@line_id_s04, 5, '15:30:00', 0, 5, 1),
  (@line_id_s04, 5, '17:30:00', 0, 5, 1),
  (@line_id_s04, 5, '19:30:00', 0, 5, 1);


-- ----------------------------------------------------------------------------
-- PÁGINA 05: S05 - Nova Vista/Siderúrgica (CIRCULAR)
-- Partida do itinerário e horário: Siderúrgica
-- Sentido: 0 (Único - ida e volta)
-- ----------------------------------------------------------------------------
INSERT INTO `lines` (
  `line_number`, `line_name`, `departure_location`, `destination_location`,
  `fare`, `company_id`, `system_id`, `modal`, `mode`, `is_public`,
  `has_integration`, `observations`, `type`, `direction`, `scope`, `active`
) VALUES (
  'S05', 'Nova Vista/Siderúrgica', 'Siderúrgica', 'Nova Vista',
  0.00, @company_id, @system_id, 1, NULL, 1,
  0, NULL, 1, 0, 1, 1
);
SET @line_id_s05 = LAST_INSERT_ID();
UPDATE `lines`
SET `fare_id` = (SELECT `id` FROM `fare_history` WHERE `line_id_of_fare` = @line_id_s05 ORDER BY `id` DESC LIMIT 1)
WHERE `line_id` = @line_id_s05;

INSERT INTO `departure_times` (`line_id`, `day`, `departure_time`, `direction`, `day_type_id`, `active`) VALUES
  -- Dias úteis (5) - Sentido único (0)
  (@line_id_s05, 5, '06:00:00', 0, 5, 1),
  (@line_id_s05, 5, '06:35:00', 0, 5, 1),
  (@line_id_s05, 5, '07:40:00', 0, 5, 1),
  (@line_id_s05, 5, '08:15:00', 0, 5, 1),
  (@line_id_s05, 5, '09:30:00', 0, 5, 1),
  (@line_id_s05, 5, '11:20:00', 0, 5, 1),
  (@line_id_s05, 5, '12:15:00', 0, 5, 1),
  (@line_id_s05, 5, '14:00:00', 0, 5, 1),
  (@line_id_s05, 5, '15:40:00', 0, 5, 1),
  (@line_id_s05, 5, '17:20:00', 0, 5, 1),
  (@line_id_s05, 5, '18:50:00', 0, 5, 1),
  (@line_id_s05, 5, '20:30:00', 0, 5, 1);


-- ----------------------------------------------------------------------------
-- PÁGINA 06: S06 - General Carneiro/Nossa Senhora de Fátima
-- Quadro único de horários (sem separação por local de saída)
-- Sentido: 0 (Único - ida e volta)
-- ----------------------------------------------------------------------------
INSERT INTO `lines` (
  `line_number`, `line_name`, `departure_location`, `destination_location`,
  `fare`, `company_id`, `system_id`, `modal`, `mode`, `is_public`,
  `has_integration`, `observations`, `type`, `direction`, `scope`, `active`
) VALUES (
  'S06', 'General Carneiro/Nossa Senhora de Fátima', 'General Carneiro', 'Nossa Senhora de Fátima',
  0.00, @company_id, @system_id, 1, NULL, 1,
  0, NULL, 1, 0, 1, 1
);
SET @line_id_s06 = LAST_INSERT_ID();
UPDATE `lines`
SET `fare_id` = (SELECT `id` FROM `fare_history` WHERE `line_id_of_fare` = @line_id_s06 ORDER BY `id` DESC LIMIT 1)
WHERE `line_id` = @line_id_s06;

INSERT INTO `departure_times` (`line_id`, `day`, `departure_time`, `direction`, `day_type_id`, `active`) VALUES
  -- Dias úteis (5) - Sentido único (0)
  (@line_id_s06, 5, '05:30:00', 0, 5, 1),
  (@line_id_s06, 5, '07:00:00', 0, 5, 1),
  (@line_id_s06, 5, '08:30:00', 0, 5, 1),
  (@line_id_s06, 5, '10:00:00', 0, 5, 1),
  (@line_id_s06, 5, '11:30:00', 0, 5, 1),
  (@line_id_s06, 5, '14:00:00', 0, 5, 1),
  (@line_id_s06, 5, '15:30:00', 0, 5, 1),
  (@line_id_s06, 5, '17:00:00', 0, 5, 1),
  (@line_id_s06, 5, '18:30:00', 0, 5, 1),
  (@line_id_s06, 5, '20:00:00', 0, 5, 1),
  -- Sábado (6) - Sentido único (0)
  (@line_id_s06, 6, '06:00:00', 0, 6, 1),
  (@line_id_s06, 6, '08:00:00', 0, 6, 1),
  (@line_id_s06, 6, '10:00:00', 0, 6, 1),
  (@line_id_s06, 6, '12:00:00', 0, 6, 1),
  (@line_id_s06, 6, '14:00:00', 0, 6, 1),
  (@line_id_s06, 6, '16:00:00', 0, 6, 1);


-- ----------------------------------------------------------------------------
-- PÁGINA 07: S07 - Pompéu/Paciência
-- 1ª saída: Paciência (05:00) -> Pompéu (05:30)
-- Sentidos: 1 (Ida: Paciência -> Pompéu), 2 (Volta: Pompéu -> Paciência)
-- ----------------------------------------------------------------------------
INSERT INTO `lines` (
  `line_number`, `line_name`, `departure_location`, `destination_location`,
  `fare`, `company_id`, `system_id`, `modal`, `mode`, `is_public`,
  `has_integration`, `observations`, `type`, `direction`, `scope`, `active`
) VALUES (
  'S07', 'Pompéu/Paciência', 'Paciência', 'Pompéu',
  0.00, @company_id, @system_id, 1, NULL, 1,
  0, NULL, 1, 1, 1, 1
);
SET @line_id_s07 = LAST_INSERT_ID();
UPDATE `lines`
SET `fare_id` = (SELECT `id` FROM `fare_history` WHERE `line_id_of_fare` = @line_id_s07 ORDER BY `id` DESC LIMIT 1)
WHERE `line_id` = @line_id_s07;

INSERT INTO `departure_times` (`line_id`, `day`, `departure_time`, `direction`, `day_type_id`, `active`) VALUES
  -- Dias úteis (5) - Sentido 1 (Saída Paciência)
  (@line_id_s07, 5, '05:00:00', 1, 5, 1),
  (@line_id_s07, 5, '05:40:00', 1, 5, 1),
  (@line_id_s07, 5, '06:20:00', 1, 5, 1),
  (@line_id_s07, 5, '07:00:00', 1, 5, 1),
  (@line_id_s07, 5, '07:40:00', 1, 5, 1),
  (@line_id_s07, 5, '08:30:00', 1, 5, 1),
  (@line_id_s07, 5, '09:50:00', 1, 5, 1),
  (@line_id_s07, 5, '11:10:00', 1, 5, 1),
  (@line_id_s07, 5, '12:40:00', 1, 5, 1),
  (@line_id_s07, 5, '14:00:00', 1, 5, 1),
  (@line_id_s07, 5, '15:20:00', 1, 5, 1),
  (@line_id_s07, 5, '16:40:00', 1, 5, 1),
  (@line_id_s07, 5, '17:20:00', 1, 5, 1),
  (@line_id_s07, 5, '18:00:00', 1, 5, 1),
  (@line_id_s07, 5, '18:40:00', 1, 5, 1),
  (@line_id_s07, 5, '19:20:00', 1, 5, 1),
  (@line_id_s07, 5, '20:40:00', 1, 5, 1),
  (@line_id_s07, 5, '22:10:00', 1, 5, 1),
  -- Dias úteis (5) - Sentido 2 (Saída Pompéu)
  (@line_id_s07, 5, '05:30:00', 2, 5, 1),
  (@line_id_s07, 5, '06:20:00', 2, 5, 1),
  (@line_id_s07, 5, '07:00:00', 2, 5, 1),
  (@line_id_s07, 5, '07:40:00', 2, 5, 1),
  (@line_id_s07, 5, '09:10:00', 2, 5, 1),
  (@line_id_s07, 5, '10:30:00', 2, 5, 1),
  (@line_id_s07, 5, '12:00:00', 2, 5, 1),
  (@line_id_s07, 5, '13:20:00', 2, 5, 1),
  (@line_id_s07, 5, '14:40:00', 2, 5, 1),
  (@line_id_s07, 5, '16:00:00', 2, 5, 1),
  (@line_id_s07, 5, '17:20:00', 2, 5, 1),
  (@line_id_s07, 5, '18:00:00', 2, 5, 1),
  (@line_id_s07, 5, '18:40:00', 2, 5, 1),
  (@line_id_s07, 5, '19:20:00', 2, 5, 1),
  (@line_id_s07, 5, '20:00:00', 2, 5, 1),
  (@line_id_s07, 5, '21:30:00', 2, 5, 1),
  (@line_id_s07, 5, '22:45:00', 2, 5, 1),
  -- Sábado (6) - Sentido 2 (Saída Pompéu)
  (@line_id_s07, 6, '06:30:00', 2, 6, 1),
  (@line_id_s07, 6, '07:10:00', 2, 6, 1),
  (@line_id_s07, 6, '07:50:00', 2, 6, 1),
  (@line_id_s07, 6, '09:10:00', 2, 6, 1),
  (@line_id_s07, 6, '10:30:00', 2, 6, 1),
  (@line_id_s07, 6, '12:00:00', 2, 6, 1),
  (@line_id_s07, 6, '13:20:00', 2, 6, 1),
  (@line_id_s07, 6, '14:00:00', 2, 6, 1),
  (@line_id_s07, 6, '15:20:00', 2, 6, 1),
  (@line_id_s07, 6, '16:00:00', 2, 6, 1),
  (@line_id_s07, 6, '17:20:00', 2, 6, 1),
  (@line_id_s07, 6, '18:40:00', 2, 6, 1),
  (@line_id_s07, 6, '20:00:00', 2, 6, 1),
  (@line_id_s07, 6, '21:20:00', 2, 6, 1),
  -- Domingo/Feriado (7) - Sentido 2 (Saída Pompéu)
  (@line_id_s07, 7, '06:30:00', 2, 7, 1),
  (@line_id_s07, 7, '07:10:00', 2, 7, 1),
  (@line_id_s07, 7, '07:50:00', 2, 7, 1),
  (@line_id_s07, 7, '09:10:00', 2, 7, 1),
  (@line_id_s07, 7, '10:30:00', 2, 7, 1),
  (@line_id_s07, 7, '12:00:00', 2, 7, 1),
  (@line_id_s07, 7, '13:20:00', 2, 7, 1),
  (@line_id_s07, 7, '14:00:00', 2, 7, 1),
  (@line_id_s07, 7, '15:20:00', 2, 7, 1),
  (@line_id_s07, 7, '16:00:00', 2, 7, 1),
  (@line_id_s07, 7, '17:20:00', 2, 7, 1),
  (@line_id_s07, 7, '18:40:00', 2, 7, 1),
  (@line_id_s07, 7, '20:00:00', 2, 7, 1),
  (@line_id_s07, 7, '21:20:00', 2, 7, 1);


-- ----------------------------------------------------------------------------
-- PÁGINA 08: S08 - Rota 1 - Val Paraíso - Vila Rica - Nações Unidas/Siderúrgica (CIRCULAR)
-- Sentido: 0 (Único - ida e volta)
-- ----------------------------------------------------------------------------
INSERT INTO `lines` (
  `line_number`, `line_name`, `departure_location`, `destination_location`,
  `fare`, `company_id`, `system_id`, `modal`, `mode`, `is_public`,
  `has_integration`, `observations`, `type`, `direction`, `scope`, `active`
) VALUES (
  'S08', 'Rota 1 - Val Paraíso - Vila Rica - Nações Unidas/Siderúrgica', 'Val Paraíso', 'Siderúrgica',
  0.00, @company_id, @system_id, 1, NULL, 1,
  0, NULL, 1, 0, 1, 1
);
SET @line_id_s08 = LAST_INSERT_ID();
UPDATE `lines`
SET `fare_id` = (SELECT `id` FROM `fare_history` WHERE `line_id_of_fare` = @line_id_s08 ORDER BY `id` DESC LIMIT 1)
WHERE `line_id` = @line_id_s08;

INSERT INTO `departure_times` (`line_id`, `day`, `departure_time`, `direction`, `day_type_id`, `active`) VALUES
  -- Dias úteis (5) - Sentido único (0)
  (@line_id_s08, 5, '05:30:00', 0, 5, 1),
  (@line_id_s08, 5, '07:00:00', 0, 5, 1),
  (@line_id_s08, 5, '08:30:00', 0, 5, 1),
  (@line_id_s08, 5, '10:00:00', 0, 5, 1),
  (@line_id_s08, 5, '11:30:00', 0, 5, 1),
  (@line_id_s08, 5, '14:00:00', 0, 5, 1),
  (@line_id_s08, 5, '15:30:00', 0, 5, 1),
  (@line_id_s08, 5, '17:00:00', 0, 5, 1),
  (@line_id_s08, 5, '18:30:00', 0, 5, 1),
  (@line_id_s08, 5, '20:00:00', 0, 5, 1);


-- ----------------------------------------------------------------------------
-- PÁGINA 09: S09 - Rota 2 - General Carneiro/Centro (CIRCULAR)
-- Sentido: 0 (Único - ida e volta)
-- ----------------------------------------------------------------------------
INSERT INTO `lines` (
  `line_number`, `line_name`, `departure_location`, `destination_location`,
  `fare`, `company_id`, `system_id`, `modal`, `mode`, `is_public`,
  `has_integration`, `observations`, `type`, `direction`, `scope`, `active`
) VALUES (
  'S09', 'Rota 2 - General Carneiro/Centro', 'General Carneiro', 'Centro',
  0.00, @company_id, @system_id, 1, NULL, 1,
  0, NULL, 1, 0, 1, 1
);
SET @line_id_s09 = LAST_INSERT_ID();
UPDATE `lines`
SET `fare_id` = (SELECT `id` FROM `fare_history` WHERE `line_id_of_fare` = @line_id_s09 ORDER BY `id` DESC LIMIT 1)
WHERE `line_id` = @line_id_s09;

INSERT INTO `departure_times` (`line_id`, `day`, `departure_time`, `direction`, `day_type_id`, `active`) VALUES
  -- Dias úteis (5) - Sentido único (0)
  (@line_id_s09, 5, '05:30:00', 0, 5, 1),
  (@line_id_s09, 5, '06:00:00', 0, 5, 1),
  (@line_id_s09, 5, '07:00:00', 0, 5, 1),
  (@line_id_s09, 5, '07:45:00', 0, 5, 1),
  (@line_id_s09, 5, '08:30:00', 0, 5, 1),
  (@line_id_s09, 5, '09:15:00', 0, 5, 1),
  (@line_id_s09, 5, '10:00:00', 0, 5, 1),
  (@line_id_s09, 5, '10:45:00', 0, 5, 1),
  (@line_id_s09, 5, '11:30:00', 0, 5, 1),
  (@line_id_s09, 5, '12:00:00', 0, 5, 1),
  (@line_id_s09, 5, '13:00:00', 0, 5, 1),
  (@line_id_s09, 5, '14:00:00', 0, 5, 1),
  (@line_id_s09, 5, '14:45:00', 0, 5, 1),
  (@line_id_s09, 5, '15:30:00', 0, 5, 1),
  (@line_id_s09, 5, '16:15:00', 0, 5, 1),
  (@line_id_s09, 5, '17:00:00', 0, 5, 1),
  (@line_id_s09, 5, '18:00:00', 0, 5, 1),
  (@line_id_s09, 5, '18:30:00', 0, 5, 1),
  (@line_id_s09, 5, '19:30:00', 0, 5, 1),
  (@line_id_s09, 5, '20:00:00', 0, 5, 1);


-- ----------------------------------------------------------------------------
-- PÁGINA 10: S10 - Roça Grande/Campo Santo Antônio
-- 1ª saída: Roça Grande (05:35) -> Campo Santo Antônio (06:50)
-- Sentidos: 1 (Ida: Roça Grande -> Campo Santo Antônio), 2 (Volta: Campo Santo Antônio -> Roça Grande)
-- ----------------------------------------------------------------------------
INSERT INTO `lines` (
  `line_number`, `line_name`, `departure_location`, `destination_location`,
  `fare`, `company_id`, `system_id`, `modal`, `mode`, `is_public`,
  `has_integration`, `observations`, `type`, `direction`, `scope`, `active`
) VALUES (
  'S10', 'Roça Grande/Campo Santo Antônio', 'Roça Grande', 'Campo Santo Antônio',
  0.00, @company_id, @system_id, 1, NULL, 1,
  0, NULL, 1, 1, 1, 1
);
SET @line_id_s10 = LAST_INSERT_ID();
UPDATE `lines`
SET `fare_id` = (SELECT `id` FROM `fare_history` WHERE `line_id_of_fare` = @line_id_s10 ORDER BY `id` DESC LIMIT 1)
WHERE `line_id` = @line_id_s10;

INSERT INTO `departure_times` (`line_id`, `day`, `departure_time`, `direction`, `day_type_id`, `active`) VALUES
  -- Dias úteis (5) - Sentido 1 (Saída Roça Grande)
  (@line_id_s10, 5, '05:35:00', 1, 5, 1),
  (@line_id_s10, 5, '06:20:00', 1, 5, 1),
  (@line_id_s10, 5, '07:20:00', 1, 5, 1),
  (@line_id_s10, 5, '08:50:00', 1, 5, 1),
  (@line_id_s10, 5, '10:30:00', 1, 5, 1),
  (@line_id_s10, 5, '12:00:00', 1, 5, 1),
  (@line_id_s10, 5, '13:20:00', 1, 5, 1),
  (@line_id_s10, 5, '14:50:00', 1, 5, 1),
  (@line_id_s10, 5, '16:30:00', 1, 5, 1),
  (@line_id_s10, 5, '17:50:00', 1, 5, 1),
  (@line_id_s10, 5, '19:20:00', 1, 5, 1),
  (@line_id_s10, 5, '20:00:00', 1, 5, 1),
  -- Dias úteis (5) - Sentido 2 (Saída Campo Santo Antônio)
  (@line_id_s10, 5, '06:50:00', 2, 5, 1),
  (@line_id_s10, 5, '08:05:00', 2, 5, 1),
  (@line_id_s10, 5, '09:35:00', 2, 5, 1),
  (@line_id_s10, 5, '11:15:00', 2, 5, 1),
  (@line_id_s10, 5, '12:35:00', 2, 5, 1),
  (@line_id_s10, 5, '14:05:00', 2, 5, 1),
  (@line_id_s10, 5, '15:50:00', 2, 5, 1),
  (@line_id_s10, 5, '17:10:00', 2, 5, 1),
  (@line_id_s10, 5, '18:30:00', 2, 5, 1),
  (@line_id_s10, 5, '20:20:00', 2, 5, 1),
  -- Sábado (6) - Sentido 1 (Saída Roça Grande)
  (@line_id_s10, 6, '06:20:00', 1, 6, 1),
  (@line_id_s10, 6, '07:20:00', 1, 6, 1),
  (@line_id_s10, 6, '08:50:00', 1, 6, 1),
  (@line_id_s10, 6, '10:20:00', 1, 6, 1),
  (@line_id_s10, 6, '11:50:00', 1, 6, 1),
  (@line_id_s10, 6, '13:20:00', 1, 6, 1),
  (@line_id_s10, 6, '14:50:00', 1, 6, 1),
  (@line_id_s10, 6, '16:20:00', 1, 6, 1),
  (@line_id_s10, 6, '18:20:00', 1, 6, 1),
  (@line_id_s10, 6, '20:00:00', 1, 6, 1),
  -- Sábado (6) - Sentido 2 (Saída Campo Santo Antônio)
  (@line_id_s10, 6, '08:05:00', 2, 6, 1),
  (@line_id_s10, 6, '09:35:00', 2, 6, 1),
  (@line_id_s10, 6, '11:05:00', 2, 6, 1),
  (@line_id_s10, 6, '12:35:00', 2, 6, 1),
  (@line_id_s10, 6, '14:05:00', 2, 6, 1),
  (@line_id_s10, 6, '15:35:00', 2, 6, 1),
  (@line_id_s10, 6, '17:10:00', 2, 6, 1),
  (@line_id_s10, 6, '18:45:00', 2, 6, 1),
  (@line_id_s10, 6, '20:35:00', 2, 6, 1),
  -- Domingo/Feriado (7) - Sentido 1 (Saída Roça Grande)
  (@line_id_s10, 7, '06:20:00', 1, 7, 1),
  (@line_id_s10, 7, '07:20:00', 1, 7, 1),
  (@line_id_s10, 7, '08:50:00', 1, 7, 1),
  (@line_id_s10, 7, '10:20:00', 1, 7, 1),
  (@line_id_s10, 7, '11:50:00', 1, 7, 1),
  (@line_id_s10, 7, '13:20:00', 1, 7, 1),
  (@line_id_s10, 7, '14:50:00', 1, 7, 1),
  (@line_id_s10, 7, '16:20:00', 1, 7, 1),
  (@line_id_s10, 7, '18:20:00', 1, 7, 1),
  (@line_id_s10, 7, '20:00:00', 1, 7, 1),
  -- Domingo/Feriado (7) - Sentido 2 (Saída Campo Santo Antônio)
  (@line_id_s10, 7, '08:05:00', 2, 7, 1),
  (@line_id_s10, 7, '09:35:00', 2, 7, 1),
  (@line_id_s10, 7, '11:05:00', 2, 7, 1),
  (@line_id_s10, 7, '12:35:00', 2, 7, 1),
  (@line_id_s10, 7, '14:05:00', 2, 7, 1),
  (@line_id_s10, 7, '15:35:00', 2, 7, 1),
  (@line_id_s10, 7, '17:10:00', 2, 7, 1),
  (@line_id_s10, 7, '18:45:00', 2, 7, 1),
  (@line_id_s10, 7, '20:35:00', 2, 7, 1);


-- ----------------------------------------------------------------------------
-- PÁGINA 11 (Rota 1 - V1): S11A - Nossa Senhora de Fátima/Siderúrgica - Rota 1
-- 1ª saída V1: Siderúrgica (05:50) -> Fátima (06:35)
-- Sentidos: 1 (Ida: Siderúrgica -> Nossa Senhora de Fátima), 2 (Volta: Nossa Senhora de Fátima -> Siderúrgica)
-- ----------------------------------------------------------------------------
INSERT INTO `lines` (
  `line_number`, `line_name`, `departure_location`, `destination_location`,
  `fare`, `company_id`, `system_id`, `modal`, `mode`, `is_public`,
  `has_integration`, `observations`, `type`, `direction`, `scope`, `active`
) VALUES (
  'S11A', 'Nossa Senhora de Fátima/Siderúrgica - Rota 1', 'Siderúrgica', 'Nossa Senhora de Fátima',
  0.00, @company_id, @system_id, 1, NULL, 1,
  0, NULL, 1, 1, 1, 1
);
SET @line_id_s11a = LAST_INSERT_ID();
UPDATE `lines`
SET `fare_id` = (SELECT `id` FROM `fare_history` WHERE `line_id_of_fare` = @line_id_s11a ORDER BY `id` DESC LIMIT 1)
WHERE `line_id` = @line_id_s11a;

INSERT INTO `departure_times` (`line_id`, `day`, `departure_time`, `direction`, `day_type_id`, `active`) VALUES
  -- Dias úteis (5) - Sentido 1 (Saída Siderúrgica V1)
  (@line_id_s11a, 5, '05:50:00', 1, 5, 1),
  (@line_id_s11a, 5, '07:15:00', 1, 5, 1),
  (@line_id_s11a, 5, '09:40:00', 1, 5, 1),
  (@line_id_s11a, 5, '11:40:00', 1, 5, 1),
  (@line_id_s11a, 5, '17:00:00', 1, 5, 1),
  (@line_id_s11a, 5, '20:20:00', 1, 5, 1),
  (@line_id_s11a, 5, '22:30:00', 1, 5, 1),
  -- Dias úteis (5) - Sentido 2 (Saída Fátima V1)
  (@line_id_s11a, 5, '06:35:00', 2, 5, 1),
  (@line_id_s11a, 5, '08:00:00', 2, 5, 1),
  (@line_id_s11a, 5, '10:25:00', 2, 5, 1),
  (@line_id_s11a, 5, '12:20:00', 2, 5, 1),
  (@line_id_s11a, 5, '17:50:00', 2, 5, 1),
  (@line_id_s11a, 5, '21:20:00', 2, 5, 1),
  (@line_id_s11a, 5, '23:05:00', 2, 5, 1),
  -- Sábado (6) - Sentido 1 (Sábados Siderúrgica V1)
  (@line_id_s11a, 6, '05:50:00', 1, 6, 1),
  (@line_id_s11a, 6, '10:20:00', 1, 6, 1),
  -- Domingo/Feriado (7) - Sentido 1 (Domingos Siderúrgica V1)
  (@line_id_s11a, 7, '10:20:00', 1, 7, 1);


-- ----------------------------------------------------------------------------
-- PÁGINA 11 (Rota 2 - V2): S11B - Nossa Senhora de Fátima/Siderúrgica - Rota 2
-- 1ª saída V2: Siderúrgica (06:50) -> Fátima (07:30)
-- Sentidos: 1 (Ida: Siderúrgica -> Nossa Senhora de Fátima), 2 (Volta: Nossa Senhora de Fátima -> Siderúrgica)
-- ----------------------------------------------------------------------------
INSERT INTO `lines` (
  `line_number`, `line_name`, `departure_location`, `destination_location`,
  `fare`, `company_id`, `system_id`, `modal`, `mode`, `is_public`,
  `has_integration`, `observations`, `type`, `direction`, `scope`, `active`
) VALUES (
  'S11B', 'Nossa Senhora de Fátima/Siderúrgica - Rota 2', 'Siderúrgica', 'Nossa Senhora de Fátima',
  0.00, @company_id, @system_id, 1, NULL, 1,
  0, NULL, 1, 1, 1, 1
);
SET @line_id_s11b = LAST_INSERT_ID();
UPDATE `lines`
SET `fare_id` = (SELECT `id` FROM `fare_history` WHERE `line_id_of_fare` = @line_id_s11b ORDER BY `id` DESC LIMIT 1)
WHERE `line_id` = @line_id_s11b;

INSERT INTO `departure_times` (`line_id`, `day`, `departure_time`, `direction`, `day_type_id`, `active`) VALUES
  -- Dias úteis (5) - Sentido 1 (Saída Siderúrgica V2)
  (@line_id_s11b, 5, '06:50:00', 1, 5, 1),
  (@line_id_s11b, 5, '12:15:00', 1, 5, 1),
  (@line_id_s11b, 5, '15:30:00', 1, 5, 1),
  (@line_id_s11b, 5, '18:20:00', 1, 5, 1),
  -- Dias úteis (5) - Sentido 2 (Saída Fátima V2)
  (@line_id_s11b, 5, '07:30:00', 2, 5, 1),
  (@line_id_s11b, 5, '13:25:00', 2, 5, 1),
  (@line_id_s11b, 5, '16:30:00', 2, 5, 1),
  (@line_id_s11b, 5, '19:30:00', 2, 5, 1),
  -- Sábado (6) - Sentido 1 (Sábados Siderúrgica V2)
  (@line_id_s11b, 6, '06:50:00', 1, 6, 1),
  (@line_id_s11b, 6, '12:20:00', 1, 6, 1),
  (@line_id_s11b, 6, '18:10:00', 1, 6, 1),
  (@line_id_s11b, 6, '22:30:00', 1, 6, 1),
  -- Domingo/Feriado (7) - Sentido 1 (Domingos Siderúrgica V2)
  (@line_id_s11b, 7, '06:50:00', 1, 7, 1),
  (@line_id_s11b, 7, '12:20:00', 1, 7, 1),
  (@line_id_s11b, 7, '18:10:00', 1, 7, 1),
  (@line_id_s11b, 7, '22:30:00', 1, 7, 1);


-- ----------------------------------------------------------------------------
-- PÁGINA 12: S12 - Adelmolândia/Morada da Serra - Rota 1
-- 1ª saída: Adelmolândia (05:15) -> Morada da Serra (05:25)
-- Sentidos: 1 (Ida: Adelmolândia -> Morada da Serra), 2 (Volta: Morada da Serra -> Adelmolândia)
-- ----------------------------------------------------------------------------
INSERT INTO `lines` (
  `line_number`, `line_name`, `departure_location`, `destination_location`,
  `fare`, `company_id`, `system_id`, `modal`, `mode`, `is_public`,
  `has_integration`, `observations`, `type`, `direction`, `scope`, `active`
) VALUES (
  'S12', 'Adelmolândia/Morada da Serra - Rota 1', 'Adelmolândia', 'Morada da Serra',
  0.00, @company_id, @system_id, 1, NULL, 1,
  0, NULL, 1, 1, 1, 1
);
SET @line_id_s12 = LAST_INSERT_ID();
UPDATE `lines`
SET `fare_id` = (SELECT `id` FROM `fare_history` WHERE `line_id_of_fare` = @line_id_s12 ORDER BY `id` DESC LIMIT 1)
WHERE `line_id` = @line_id_s12;

INSERT INTO `departure_times` (`line_id`, `day`, `departure_time`, `direction`, `day_type_id`, `active`) VALUES
  -- Dias úteis (5) - Sentido 1 (Saída Adelmolândia)
  (@line_id_s12, 5, '05:15:00', 1, 5, 1),
  (@line_id_s12, 5, '05:25:00', 1, 5, 1),
  (@line_id_s12, 5, '06:00:00', 1, 5, 1),
  (@line_id_s12, 5, '06:15:00', 1, 5, 1),
  (@line_id_s12, 5, '06:40:00', 1, 5, 1),
  (@line_id_s12, 5, '06:55:00', 1, 5, 1),
  (@line_id_s12, 5, '07:20:00', 1, 5, 1),
  (@line_id_s12, 5, '07:35:00', 1, 5, 1),
  (@line_id_s12, 5, '08:00:00', 1, 5, 1),
  (@line_id_s12, 5, '08:40:00', 1, 5, 1),
  (@line_id_s12, 5, '09:20:00', 1, 5, 1),
  (@line_id_s12, 5, '10:00:00', 1, 5, 1),
  (@line_id_s12, 5, '10:40:00', 1, 5, 1),
  (@line_id_s12, 5, '11:20:00', 1, 5, 1),
  (@line_id_s12, 5, '12:00:00', 1, 5, 1),
  (@line_id_s12, 5, '13:25:00', 1, 5, 1),
  (@line_id_s12, 5, '14:40:00', 1, 5, 1),
  (@line_id_s12, 5, '15:20:00', 1, 5, 1),
  (@line_id_s12, 5, '15:55:00', 1, 5, 1),
  (@line_id_s12, 5, '16:30:00', 1, 5, 1),
  (@line_id_s12, 5, '17:20:00', 1, 5, 1),
  (@line_id_s12, 5, '18:20:00', 1, 5, 1),
  (@line_id_s12, 5, '18:55:00', 1, 5, 1),
  (@line_id_s12, 5, '19:35:00', 1, 5, 1),
  (@line_id_s12, 5, '20:15:00', 1, 5, 1),
  (@line_id_s12, 5, '22:05:00', 1, 5, 1),
  -- Dias úteis (5) - Sentido 2 (Saída Morada da Serra)
  (@line_id_s12, 5, '05:25:00', 2, 5, 1),
  (@line_id_s12, 5, '05:40:00', 2, 5, 1),
  (@line_id_s12, 5, '06:05:00', 2, 5, 1),
  (@line_id_s12, 5, '06:40:00', 2, 5, 1),
  (@line_id_s12, 5, '07:20:00', 2, 5, 1),
  (@line_id_s12, 5, '07:35:00', 2, 5, 1),
  (@line_id_s12, 5, '08:00:00', 2, 5, 1),
  (@line_id_s12, 5, '08:40:00', 2, 5, 1),
  (@line_id_s12, 5, '09:30:00', 2, 5, 1),
  (@line_id_s12, 5, '10:10:00', 2, 5, 1),
  (@line_id_s12, 5, '10:45:00', 2, 5, 1),
  (@line_id_s12, 5, '11:20:00', 2, 5, 1),
  (@line_id_s12, 5, '12:00:00', 2, 5, 1),
  (@line_id_s12, 5, '12:15:00', 2, 5, 1),
  (@line_id_s12, 5, '12:40:00', 2, 5, 1),
  (@line_id_s12, 5, '13:45:00', 2, 5, 1),
  (@line_id_s12, 5, '14:05:00', 2, 5, 1),
  (@line_id_s12, 5, '14:35:00', 2, 5, 1),
  (@line_id_s12, 5, '15:20:00', 2, 5, 1),
  (@line_id_s12, 5, '16:00:00', 2, 5, 1),
  (@line_id_s12, 5, '16:40:00', 2, 5, 1),
  (@line_id_s12, 5, '17:20:00', 2, 5, 1),
  (@line_id_s12, 5, '18:05:00', 2, 5, 1),
  (@line_id_s12, 5, '18:50:00', 2, 5, 1),
  (@line_id_s12, 5, '19:25:00', 2, 5, 1),
  (@line_id_s12, 5, '20:20:00', 2, 5, 1),
  (@line_id_s12, 5, '20:45:00', 2, 5, 1),
  (@line_id_s12, 5, '21:55:00', 2, 5, 1),
  (@line_id_s12, 5, '22:35:00', 2, 5, 1);


-- ----------------------------------------------------------------------------
-- PÁGINA 13: S13 - Morada da Serra/Adelmolândia - Rota 2
-- 1ª saída: Adelmolândia (05:15) -> Morada da Serra (05:25)
-- Sentidos: 1 (Ida: Adelmolândia -> Morada da Serra), 2 (Volta: Morada da Serra -> Adelmolândia)
-- ----------------------------------------------------------------------------
INSERT INTO `lines` (
  `line_number`, `line_name`, `departure_location`, `destination_location`,
  `fare`, `company_id`, `system_id`, `modal`, `mode`, `is_public`,
  `has_integration`, `observations`, `type`, `direction`, `scope`, `active`
) VALUES (
  'S13', 'Morada da Serra/Adelmolândia - Rota 2', 'Adelmolândia', 'Morada da Serra',
  0.00, @company_id, @system_id, 1, NULL, 1,
  0, NULL, 1, 1, 1, 1
);
SET @line_id_s13 = LAST_INSERT_ID();
UPDATE `lines`
SET `fare_id` = (SELECT `id` FROM `fare_history` WHERE `line_id_of_fare` = @line_id_s13 ORDER BY `id` DESC LIMIT 1)
WHERE `line_id` = @line_id_s13;

INSERT INTO `departure_times` (`line_id`, `day`, `departure_time`, `direction`, `day_type_id`, `active`) VALUES
  -- Dias úteis (5) - Sentido 1 (Saída Adelmolândia)
  (@line_id_s13, 5, '05:15:00', 1, 5, 1),
  (@line_id_s13, 5, '05:25:00', 1, 5, 1),
  (@line_id_s13, 5, '06:00:00', 1, 5, 1),
  (@line_id_s13, 5, '06:15:00', 1, 5, 1),
  (@line_id_s13, 5, '06:40:00', 1, 5, 1),
  (@line_id_s13, 5, '06:55:00', 1, 5, 1),
  (@line_id_s13, 5, '07:20:00', 1, 5, 1),
  (@line_id_s13, 5, '07:35:00', 1, 5, 1),
  (@line_id_s13, 5, '08:00:00', 1, 5, 1),
  (@line_id_s13, 5, '08:40:00', 1, 5, 1),
  (@line_id_s13, 5, '09:20:00', 1, 5, 1),
  (@line_id_s13, 5, '10:00:00', 1, 5, 1),
  (@line_id_s13, 5, '10:40:00', 1, 5, 1),
  (@line_id_s13, 5, '11:20:00', 1, 5, 1),
  (@line_id_s13, 5, '12:00:00', 1, 5, 1),
  (@line_id_s13, 5, '13:25:00', 1, 5, 1),
  (@line_id_s13, 5, '14:40:00', 1, 5, 1),
  (@line_id_s13, 5, '15:20:00', 1, 5, 1),
  (@line_id_s13, 5, '15:55:00', 1, 5, 1),
  (@line_id_s13, 5, '16:30:00', 1, 5, 1),
  (@line_id_s13, 5, '17:20:00', 1, 5, 1),
  (@line_id_s13, 5, '18:20:00', 1, 5, 1),
  (@line_id_s13, 5, '18:55:00', 1, 5, 1),
  (@line_id_s13, 5, '19:35:00', 1, 5, 1),
  (@line_id_s13, 5, '20:15:00', 1, 5, 1),
  (@line_id_s13, 5, '22:05:00', 1, 5, 1),
  -- Dias úteis (5) - Sentido 2 (Saída Morada da Serra)
  (@line_id_s13, 5, '05:25:00', 2, 5, 1),
  (@line_id_s13, 5, '05:40:00', 2, 5, 1),
  (@line_id_s13, 5, '06:05:00', 2, 5, 1),
  (@line_id_s13, 5, '06:40:00', 2, 5, 1),
  (@line_id_s13, 5, '07:20:00', 2, 5, 1),
  (@line_id_s13, 5, '07:35:00', 2, 5, 1),
  (@line_id_s13, 5, '08:00:00', 2, 5, 1),
  (@line_id_s13, 5, '08:40:00', 2, 5, 1),
  (@line_id_s13, 5, '09:30:00', 2, 5, 1),
  (@line_id_s13, 5, '10:10:00', 2, 5, 1),
  (@line_id_s13, 5, '10:45:00', 2, 5, 1),
  (@line_id_s13, 5, '11:20:00', 2, 5, 1),
  (@line_id_s13, 5, '12:00:00', 2, 5, 1),
  (@line_id_s13, 5, '12:15:00', 2, 5, 1),
  (@line_id_s13, 5, '12:40:00', 2, 5, 1),
  (@line_id_s13, 5, '13:45:00', 2, 5, 1),
  (@line_id_s13, 5, '14:05:00', 2, 5, 1),
  (@line_id_s13, 5, '14:35:00', 2, 5, 1),
  (@line_id_s13, 5, '15:20:00', 2, 5, 1),
  (@line_id_s13, 5, '16:00:00', 2, 5, 1),
  (@line_id_s13, 5, '16:40:00', 2, 5, 1),
  (@line_id_s13, 5, '17:20:00', 2, 5, 1),
  (@line_id_s13, 5, '18:05:00', 2, 5, 1),
  (@line_id_s13, 5, '18:50:00', 2, 5, 1),
  (@line_id_s13, 5, '19:25:00', 2, 5, 1),
  (@line_id_s13, 5, '20:20:00', 2, 5, 1),
  (@line_id_s13, 5, '20:45:00', 2, 5, 1),
  (@line_id_s13, 5, '21:55:00', 2, 5, 1),
  (@line_id_s13, 5, '22:35:00', 2, 5, 1);


-- ----------------------------------------------------------------------------
-- PÁGINA 14: S14 - Alto do Fidalgo/Esplanada
-- 1ª saída: Alto do Fidalgo (06:10) -> UPA/Esplanada (08:10)
-- Sentidos: 1 (Ida: Alto do Fidalgo -> Esplanada), 2 (Volta: Esplanada -> Alto do Fidalgo)
-- ----------------------------------------------------------------------------
INSERT INTO `lines` (
  `line_number`, `line_name`, `departure_location`, `destination_location`,
  `fare`, `company_id`, `system_id`, `modal`, `mode`, `is_public`,
  `has_integration`, `observations`, `type`, `direction`, `scope`, `active`
) VALUES (
  'S14', 'Alto do Fidalgo/Esplanada', 'Alto do Fidalgo', 'Esplanada',
  0.00, @company_id, @system_id, 1, NULL, 1,
  0, NULL, 1, 1, 1, 1
);
SET @line_id_s14 = LAST_INSERT_ID();
UPDATE `lines`
SET `fare_id` = (SELECT `id` FROM `fare_history` WHERE `line_id_of_fare` = @line_id_s14 ORDER BY `id` DESC LIMIT 1)
WHERE `line_id` = @line_id_s14;

INSERT INTO `departure_times` (`line_id`, `day`, `departure_time`, `direction`, `day_type_id`, `active`) VALUES
  -- Dias úteis (5) - Sentido 1 (Saída Alto do Fidalgo)
  (@line_id_s14, 5, '06:10:00', 1, 5, 1),
  (@line_id_s14, 5, '07:30:00', 1, 5, 1),
  (@line_id_s14, 5, '08:50:00', 1, 5, 1),
  (@line_id_s14, 5, '11:40:00', 1, 5, 1),
  (@line_id_s14, 5, '13:30:00', 1, 5, 1),
  (@line_id_s14, 5, '16:20:00', 1, 5, 1),
  (@line_id_s14, 5, '17:40:00', 1, 5, 1),
  (@line_id_s14, 5, '19:00:00', 1, 5, 1),
  (@line_id_s14, 5, '20:20:00', 1, 5, 1),
  -- Dias úteis (5) - Sentido 2 (Saída UPA / Esplanada)
  (@line_id_s14, 5, '08:10:00', 2, 5, 1),
  (@line_id_s14, 5, '09:35:00', 2, 5, 1),
  (@line_id_s14, 5, '12:20:00', 2, 5, 1),
  (@line_id_s14, 5, '14:15:00', 2, 5, 1),
  (@line_id_s14, 5, '17:00:00', 2, 5, 1),
  (@line_id_s14, 5, '18:20:00', 2, 5, 1),
  (@line_id_s14, 5, '19:45:00', 2, 5, 1),
  -- Domingo/Feriado (7) - Sentido 1 (Domingo Alto do Fidalgo)
  (@line_id_s14, 7, '07:30:00', 1, 7, 1),
  (@line_id_s14, 7, '08:50:00', 1, 7, 1),
  (@line_id_s14, 7, '11:40:00', 1, 7, 1),
  (@line_id_s14, 7, '16:20:00', 1, 7, 1),
  (@line_id_s14, 7, '18:00:00', 1, 7, 1),
  (@line_id_s14, 7, '20:30:00', 1, 7, 1),
  -- Domingo/Feriado (7) - Sentido 2 (Domingo UPA / Esplanada)
  (@line_id_s14, 7, '08:10:00', 2, 7, 1),
  (@line_id_s14, 7, '12:20:00', 2, 7, 1),
  (@line_id_s14, 7, '17:00:00', 2, 7, 1),
  (@line_id_s14, 7, '19:00:00', 2, 7, 1);


-- ----------------------------------------------------------------------------
-- PÁGINA 15: S15 - Castanheiras (CIRCULAR)
-- Itinerário único partindo e retornando ao Siderúrgica (Rua do Gaia)
-- Sentido: 0 (Único - ida e volta)
-- ----------------------------------------------------------------------------
INSERT INTO `lines` (
  `line_number`, `line_name`, `departure_location`, `destination_location`,
  `fare`, `company_id`, `system_id`, `modal`, `mode`, `is_public`,
  `has_integration`, `observations`, `type`, `direction`, `scope`, `active`
) VALUES (
  'S15', 'Castanheiras', 'Siderúrgica', 'Castanheiras',
  0.00, @company_id, @system_id, 1, NULL, 1,
  0, NULL, 1, 0, 1, 1
);
SET @line_id_s15 = LAST_INSERT_ID();
UPDATE `lines`
SET `fare_id` = (SELECT `id` FROM `fare_history` WHERE `line_id_of_fare` = @line_id_s15 ORDER BY `id` DESC LIMIT 1)
WHERE `line_id` = @line_id_s15;

INSERT INTO `departure_times` (`line_id`, `day`, `departure_time`, `direction`, `day_type_id`, `active`) VALUES
  -- Dias úteis (5) - Sentido único (0)
  (@line_id_s15, 5, '05:30:00', 0, 5, 1),
  (@line_id_s15, 5, '07:30:00', 0, 5, 1),
  (@line_id_s15, 5, '09:30:00', 0, 5, 1),
  (@line_id_s15, 5, '11:30:00', 0, 5, 1),
  (@line_id_s15, 5, '13:30:00', 0, 5, 1),
  (@line_id_s15, 5, '15:30:00', 0, 5, 1),
  (@line_id_s15, 5, '17:30:00', 0, 5, 1),
  (@line_id_s15, 5, '19:30:00', 0, 5, 1);

COMMIT;

