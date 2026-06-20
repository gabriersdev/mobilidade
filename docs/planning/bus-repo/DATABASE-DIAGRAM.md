# Diagrama do Banco de Dados: Repositório de Ônibus

Abaixo está a representação visual (Entity-Relationship Diagram) do esquema lógico do banco de dados projetado para o módulo de Repositório de Ônibus. 

Este diagrama inclui as tabelas legadas existentes em `structure-dump.sql` (`companies` e `lines`) relacionando-se corretamente com as novas tabelas (projetadas com `DATABASE-GUIDELINES.md`).

```mermaid
erDiagram
    companies ||--o{ vehicle : "owns"
    chassisModel ||--o{ vehicle : "has"
    bodyworkModel ||--o{ vehicle : "has"
    lines ||--o{ vehicleLine : "assigned to"
    vehicle ||--o{ vehicleLine : "operates on"
    vehicle ||--o{ vehicleIncident : "has history of"
    vehicle ||--o{ vehicleMaintenance : "undergoes"

    companies {
        int company_id PK
        string company_name "Unique"
        text contact
        text report_contact
    }

    lines {
        int line_id PK
        string line_number
        string line_name
    }

    chassisModel {
        uuid id PK
        string manufacturer
        string model
        timestamp createdAt
        timestamp updatedAt
        int createdBy
        int updatedBy
        boolean isActive
        timestamp deletedAt
    }

    bodyworkModel {
        uuid id PK
        string manufacturer
        string model
        timestamp createdAt
        timestamp updatedAt
        int createdBy
        int updatedBy
        boolean isActive
        timestamp deletedAt
    }

    vehicle {
        uuid id PK
        string licensePlate "Unique"
        string fleetNumber "Unique"
        string status "ACTIVE, MAINTENANCE, REPLACED, DEACTIVATED, UNKNOWN"
        string generationBatch
        date operationStartDate
        date operationEndDate
        int companyId FK
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
        int createdBy
        int updatedBy
        boolean isActive
        timestamp deletedAt
    }

    vehicleLine {
        uuid id PK
        uuid vehicleId FK
        int lineId FK
        timestamp createdAt
        timestamp updatedAt
        int createdBy
        int updatedBy
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
        int createdBy
        int updatedBy
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
        int createdBy
        int updatedBy
        boolean isActive
        timestamp deletedAt
    }

    auditLog {
        uuid id PK
        string tableName
        string recordId
        string action "INSERT, UPDATE, DELETE"
        jsonb oldData
        jsonb newData
        int performedBy
        timestamp performedAt
    }
```

> **Nota:** Este diagrama foi gerado utilizando a sintaxe `mermaid`. Se estiver visualizando no GitHub ou em um editor compatível (como VSCode com a extensão apropriada), o diagrama será renderizado automaticamente.
