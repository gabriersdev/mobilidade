-- Script do Modelo Físico: Repositório de Ônibus
-- Este script cria as novas tabelas seguindo as diretrizes (DATABASE-GUIDELINES.md)
-- e estabelece os relacionamentos com as tabelas legadas (companies e lines).

-- 1. chassisModel
CREATE TABLE IF NOT EXISTS `chassisModel` (
                                            `id` CHAR(36) NOT NULL,
  `manufacturer` VARCHAR(255) NOT NULL,
  `model` VARCHAR(255) NOT NULL,

  -- Colunas de Auditoria
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` INT NOT NULL,
  `updatedBy` INT NOT NULL,
  `isActive` BOOLEAN NOT NULL DEFAULT TRUE,
  `deletedAt` TIMESTAMP NULL,

  CONSTRAINT `pkChassisModel` PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. bodyworkModel
CREATE TABLE IF NOT EXISTS `bodyworkModel` (
                                             `id` CHAR(36) NOT NULL,
  `manufacturer` VARCHAR(255) NOT NULL,
  `model` VARCHAR(255) NOT NULL,

  -- Colunas de Auditoria
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` INT NOT NULL,
  `updatedBy` INT NOT NULL,
  `isActive` BOOLEAN NOT NULL DEFAULT TRUE,
  `deletedAt` TIMESTAMP NULL,

  CONSTRAINT `pkBodyworkModel` PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. vehicle
CREATE TABLE IF NOT EXISTS `vehicle` (
                                       `id` CHAR(36) NOT NULL,
  `licensePlate` VARCHAR(20) NOT NULL,
  `fleetNumber` VARCHAR(20) NOT NULL,
  `status` ENUM('ACTIVE', 'REPLACED', 'DEACTIVATED', 'MAINTENANCE', 'UNKNOWN') NOT NULL DEFAULT 'UNKNOWN',
  `generationBatchId` CHAR(36),
  `operationStartDate` DATE,
  `operationEndDate` DATE,

  `operatorId` INT NOT NULL,
  `companyId` INT NOT NULL,
  `chassisModelId` CHAR(36) NOT NULL,
  `bodyworkModelId` CHAR(36) NOT NULL,

  `manufactureYear` INT,
  `modelYear` INT,
  `dimensionDescription` VARCHAR(255),
  `optimizationTechnology` VARCHAR(255),
  `capacitySeated` INT,
  `capacityStanding` INT,
  `hasAc` BOOLEAN,
  `hasAirSuspension` BOOLEAN,
  `floorType` VARCHAR(100),
  `seatType` VARCHAR(100),
  `hasWifi` BOOLEAN,
  `accessibilityElevator` VARCHAR(255),
  `accessibilityExclusiveSeats` VARCHAR(255),
  `accessibilityVisualContrast` VARCHAR(255),
  `accessibilityDisembarkDoor` VARCHAR(255),
  `doorsQuantity` INT,
  `conservationState` ENUM('EXCELLENT', 'GOOD', 'REGULAR', 'BAD', 'PRECARIOUS'),
  `generalNotes` TEXT,

  -- Colunas de Auditoria
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` INT NOT NULL,
  `updatedBy` INT NOT NULL,
  `isActive` BOOLEAN NOT NULL DEFAULT TRUE,
  `deletedAt` TIMESTAMP NULL,

  CONSTRAINT `pkVehicle` PRIMARY KEY (`id`),
  CONSTRAINT `uqVehicleLicensePlate` UNIQUE (`licensePlate`),
  CONSTRAINT `uqVehicleFleetNumber` UNIQUE (`fleetNumber`),
  CONSTRAINT `fkVehicleOperators` FOREIGN KEY (`operatorId`) REFERENCES `operators`(`id`),
  CONSTRAINT `fkVehicleCompanies` FOREIGN KEY (`companyId`) REFERENCES `companies`(`company_id`),
  CONSTRAINT `fkVehicleGenerationBatch` FOREIGN KEY (`generationBatchId`) REFERENCES `generationBatch`(`id`),
  CONSTRAINT `fkVehicleChassisModel` FOREIGN KEY (`chassisModelId`) REFERENCES `chassisModel`(`id`),
  CONSTRAINT `fkVehicleBodyworkModel` FOREIGN KEY (`bodyworkModelId`) REFERENCES `bodyworkModel`(`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. vehicleLine
CREATE TABLE IF NOT EXISTS `vehicleLine` (
                                           `id` CHAR(36) NOT NULL,
  `vehicleId` CHAR(36) NOT NULL,
  `lineId` INT NOT NULL,

  -- Colunas de Auditoria
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` INT NOT NULL,
  `updatedBy` INT NOT NULL,
  `isActive` BOOLEAN NOT NULL DEFAULT TRUE,
  `deletedAt` TIMESTAMP NULL,

  CONSTRAINT `pkVehicleLine` PRIMARY KEY (`id`),
  CONSTRAINT `fkVehicleLineVehicle` FOREIGN KEY (`vehicleId`) REFERENCES `vehicle`(`id`),
  CONSTRAINT `fkVehicleLineLines` FOREIGN KEY (`lineId`) REFERENCES `lines`(`line_id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. vehicleIncident
CREATE TABLE IF NOT EXISTS `vehicleIncident` (
                                               `id` CHAR(36) NOT NULL,
  `vehicleId` CHAR(36) NOT NULL,
  `incidentType` ENUM('ACCIDENT', 'MECHANICAL_DEFECT', 'VANDALISM') NOT NULL,
  `incidentDate` DATETIME NOT NULL,
  `description` TEXT NOT NULL,

  -- Colunas de Auditoria
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` INT NOT NULL,
  `updatedBy` INT NOT NULL,
  `isActive` BOOLEAN NOT NULL DEFAULT TRUE,
  `deletedAt` TIMESTAMP NULL,

  CONSTRAINT `pkVehicleIncident` PRIMARY KEY (`id`),
  CONSTRAINT `fkVehicleIncidentVehicle` FOREIGN KEY (`vehicleId`) REFERENCES `vehicle`(`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. vehicleMaintenance
CREATE TABLE IF NOT EXISTS `vehicleMaintenance` (
                                                  `id` CHAR(36) NOT NULL,
  `vehicleId` CHAR(36) NOT NULL,
  `maintenanceDate` DATETIME NOT NULL,
  `description` TEXT NOT NULL,

  -- Colunas de Auditoria
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` INT NOT NULL,
  `updatedBy` INT NOT NULL,
  `isActive` BOOLEAN NOT NULL DEFAULT TRUE,
  `deletedAt` TIMESTAMP NULL,

  CONSTRAINT `pkVehicleMaintenance` PRIMARY KEY (`id`),
  CONSTRAINT `fkVehicleMaintenanceVehicle` FOREIGN KEY (`vehicleId`) REFERENCES `vehicle`(`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. auditLog (Audit Trail - Camada 2)
CREATE TABLE IF NOT EXISTS `auditLog` (
                                        `id` CHAR(36) NOT NULL,
  `tableName` VARCHAR(100) NOT NULL,
  `recordId` VARCHAR(50) NOT NULL,
  `action` ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
  `oldData` JSON,
  `newData` JSON,
  `performedBy` INT NOT NULL,
  `performedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT `pkAuditLog` PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Trigger para registrar modificações nas datas de operação
DROP TRIGGER IF EXISTS `trg_vehicle_operation_dates`;

DELIMITER //

CREATE TRIGGER `trg_vehicle_operation_dates`
  AFTER UPDATE ON `vehicle`
  FOR EACH ROW
BEGIN
  IF NOT (OLD.operationStartDate <=> NEW.operationStartDate) OR NOT (OLD.operationEndDate <=> NEW.operationEndDate) THEN
        INSERT INTO `auditLog` (`id`, `tableName`, `recordId`, `action`, `oldData`, `newData`, `performedBy`)
        VALUES (
            UUID(),
            'vehicle',
            NEW.id,
            'UPDATE',
            JSON_OBJECT('operationStartDate', OLD.operationStartDate, 'operationEndDate', OLD.operationEndDate),
            JSON_OBJECT('operationStartDate', NEW.operationStartDate, 'operationEndDate', NEW.operationEndDate),
            NEW.updatedBy
        );
END IF;
END //

DELIMITER ;

-- 9. Tabela para informações da OPERADORA (empresa de ônibus, quando a companhia for um consórcio OU um órgão/instituição pública
CREATE TABLE IF NOT EXISTS operators (
                                       `id` INT NOT NULL AUTO_INCREMENT,
                                       `name` VARCHAR(20) NOT NULL,
  `CNPJ` VARCHAR(16) NOT NULL,
  `contact` TEXT NULL,
  `report` TEXT NULL,

  CONSTRAINT `pkOperator` PRIMARY KEY (`id`)
  );

-- 10. Tabela para informações da geração de renovação (Leva/Lote)
CREATE TABLE IF NOT EXISTS `generationBatch` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    -- Colunas de Auditoria
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `createdBy` INT NOT NULL,
    `updatedBy` INT NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT TRUE,
    `deletedAt` TIMESTAMP NULL,

    CONSTRAINT `pkGenerationBatch` PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
