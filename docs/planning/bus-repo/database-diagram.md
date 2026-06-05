# Diagrama do Banco de Dados: Repositório de Ônibus

Abaixo está a representação visual (Entity-Relationship Diagram) do esquema lógico do banco de dados projetado para o módulo de Repositório de Ônibus.

```mermaid
erDiagram
    COMPANIES ||--o{ VEHICLES : "owns"
    CHASSIS_MODELS ||--o{ VEHICLES : "has"
    BODYWORK_MODELS ||--o{ VEHICLES : "has"
    VEHICLES ||--o{ VEHICLE_LINES : "operates on"
    VEHICLES ||--o{ VEHICLE_INCIDENTS : "has history of"
    VEHICLES ||--o{ VEHICLE_MAINTENANCES : "undergoes"

    COMPANIES {
        uuid id PK
        string name "Unique"
    }

    CHASSIS_MODELS {
        uuid id PK
        string manufacturer
        string model
    }

    BODYWORK_MODELS {
        uuid id PK
        string manufacturer
        string model
    }

    VEHICLES {
        uuid id PK
        string license_plate "Unique"
        string fleet_number "Unique"
        string status "ACTIVE, MAINTENANCE, etc"
        string generation_batch
        uuid company_id FK
        uuid chassis_id FK
        uuid bodywork_id FK
        int manufacture_year
        int model_year
        string dimension_description
        string optimization_technology
        int capacity_seated
        int capacity_standing
        boolean has_ac
        boolean has_air_suspension
        string floor_type
        string seat_type
        boolean has_wifi
        string accessibility_elevator
        string accessibility_exclusive_seats
        string accessibility_visual_contrast
        string accessibility_disembark_door
        int doors_quantity
        string conservation_state
        text general_notes
        datetime last_update
    }

    VEHICLE_LINES {
        uuid vehicle_id FK
        string line_number
    }

    VEHICLE_INCIDENTS {
        uuid id PK
        uuid vehicle_id FK
        string incident_type "ACCIDENT, VANDALISM, etc"
        datetime incident_date
        text description
    }

    VEHICLE_MAINTENANCES {
        uuid id PK
        uuid vehicle_id FK
        datetime maintenance_date
        text description
    }
```

> **Nota:** Este diagrama foi gerado utilizando a sintaxe `mermaid`. Se estiver visualizando no GitHub ou em um editor compatível (como VSCode com a extensão apropriada), o diagrama será renderizado automaticamente.
