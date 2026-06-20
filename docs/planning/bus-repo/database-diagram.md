# Diagrama do Banco de Dados: Repositório de Ônibus

Abaixo está a representação visual (Entity-Relationship Diagram) do esquema lógico do banco de dados projetado para o módulo de Repositório de Ônibus, atualizado de acordo com as novas diretrizes de nomenclatura e auditoria.

```mermaid
erDiagram
    company ||--o{ vehicle : "owns"
    chassisModel ||--o{ vehicle : "has"
    bodyworkModel ||--o{ vehicle : "has"
    vehicle ||--o{ vehicleLine : "operates on"
    vehicle ||--o{ vehicleIncident : "has history of"
    vehicle ||--o{ vehicleMaintenance : "undergoes"

    company {
        uuid id PK
        string name "Unique"
        timestamp createdAt
        timestamp updatedAt
        uuid createdBy
        uuid updatedBy
        boolean isActive
        timestamp deletedAt
    }

    chassisModel {
        uuid id PK
        string manufacturer
        string model
        timestamp createdAt
        timestamp updatedAt
        uuid createdBy
        uuid updatedBy
        boolean isActive
        timestamp deletedAt
    }

    bodyworkModel {
        uuid id PK
        string manufacturer
        string model
        timestamp createdAt
        timestamp updatedAt
        uuid createdBy
        uuid updatedBy
        boolean isActive
        timestamp deletedAt
    }

    vehicle {
        uuid id PK
        string licensePlate "Unique"
        string fleetNumber "Unique"
        string status "ACTIVE, MAINTENANCE, REPLACED, DEACTIVATED, UNKNOWN"
        string generationBatch
        uuid companyId FK
        uuid chassisModelId FK
        uuid bodyworkModelId FK
        int manufactureYear
        int modelYear
        string dimensionDescription
        string optimizationTechnology
        int capacitySeated
        int capacityStanding
        boolean hasAc
        boolean hasAirSuspension
        string floorType
        string seatType
        boolean hasWifi
        string accessibilityElevator
        string accessibilityExclusiveSeats
        string accessibilityVisualContrast
        string accessibilityDisembarkDoor
        int doorsQuantity
        string conservationState
        text generalNotes
        timestamp createdAt
        timestamp updatedAt
        uuid createdBy
        uuid updatedBy
        boolean isActive
        timestamp deletedAt
    }

    vehicleLine {
        uuid id PK
        uuid vehicleId FK
        string lineNumber
        timestamp createdAt
        timestamp updatedAt
        uuid createdBy
        uuid updatedBy
        boolean isActive
        timestamp deletedAt
    }

    vehicleIncident {
        uuid id PK
        uuid vehicleId FK
        string incidentType "ACCIDENT, VANDALISM, etc"
        datetime incidentDate
        text description
        timestamp createdAt
        timestamp updatedAt
        uuid createdBy
        uuid updatedBy
        boolean isActive
        timestamp deletedAt
    }

    vehicleMaintenance {
        uuid id PK
        uuid vehicleId FK
        datetime maintenanceDate
        text description
        timestamp createdAt
        timestamp updatedAt
        uuid createdBy
        uuid updatedBy
        boolean isActive
        timestamp deletedAt
    }

    auditLog {
        uuid id PK
        string tableName
        uuid recordId
        string action "INSERT, UPDATE, DELETE"
        jsonb oldData
        jsonb newData
        uuid performedBy
        timestamp performedAt
    }
```

> **Nota:** Este diagrama foi gerado utilizando a sintaxe `mermaid`. Se estiver visualizando no GitHub ou em um editor compatível (como VSCode com a extensão apropriada), o diagrama será renderizado automaticamente.
