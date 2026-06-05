# Projeto de Banco de Dados: Repositório de Ônibus

Este documento descreve o modelo relacional lógico para o módulo de Repositório de Ônibus. Embora a aplicação atual seja um Single Page Application (SPA) que utiliza dados em formato JSON mockado, este esquema serve como base para a futura implementação de uma API e um banco de dados relacional.

## Entidades e Relacionamentos

### 1. `companies` (Empresas Proprietárias e Operadoras)
Armazena as empresas responsáveis pelos veículos.
- `id` (PK, UUID): Identificador único.
- `name` (String, Unique): Nome da empresa (ex: Viação Cuiabá).

### 2. `chassis_models` (Modelos de Chassi)
Catálogo unificado de chassis para evitar redundância.
- `id` (PK, UUID)
- `manufacturer` (String): Fabricante (ex: Mercedes Benz, Volkswagen).
- `model` (String): Modelo do chassi (ex: OF-1721, 17.230 OD).

### 3. `bodywork_models` (Modelos de Carroceria)
Catálogo unificado de carrocerias.
- `id` (PK, UUID)
- `manufacturer` (String): Encarroçadora (ex: Marcopolo, Caio).
- `model` (String): Modelo (ex: Mega Plus, Apache VIP IV).

### 4. `vehicles` (Veículos)
Tabela principal que centraliza as informações do ônibus.
- `id` (PK, UUID)
- `license_plate` (String, Unique): Placa do veículo (ex: O1N3E09).
- `fleet_number` (String, Unique): Identificação interna na frota (ex: 44089).
- `status` (Enum): `ACTIVE`, `REPLACED`, `DEACTIVATED`, `MAINTENANCE`, `UNKNOWN`.
- `generation_batch` (String): Descrição da leva ou lote de aquisição.
- `company_id` (FK -> companies.id)
- `chassis_id` (FK -> chassis_models.id)
- `bodywork_id` (FK -> bodywork_models.id)
- `manufacture_year` (Int): Ano de fabricação.
- `model_year` (Int): Ano do modelo.
- `dimension_description` (String): (ex: Carroceria de 11 metros).
- `optimization_technology` (String): Tecnologia empregada (ex: Bluetec 5).
- `capacity_seated` (Int): Número de assentos.
- `capacity_standing` (Int): Capacidade de pessoas em pé.
- `has_ac` (Boolean): Ar condicionado.
- `has_air_suspension` (Boolean): Suspensão a ar.
- `floor_type` (String): Material ou tipo do piso (ex: Taraflex).
- `seat_type` (String): Tipo do assento (ex: Acolchoado).
- `has_wifi` (Boolean): Disponibilidade de Wi-Fi.
- `accessibility_elevator` (String): Descrição do elevador de acessibilidade.
- `accessibility_exclusive_seats` (String): Descrição de assentos preferenciais.
- `accessibility_visual_contrast` (String): Contraste visual para deficientes visuais.
- `accessibility_disembark_door` (String): Informações sobre portas adaptadas.
- `doors_quantity` (Int): Número total de portas.
- `conservation_state` (Enum): `EXCELLENT`, `GOOD`, `REGULAR`, `BAD`, `PRECARIOUS`.
- `general_notes` (Text): Observações livres.
- `last_update` (DateTime): Data e hora da última atualização dos dados do veículo.

### 5. `vehicle_lines` (Relação Veículo-Linha)
Relacionamento N:M entre veículos e as linhas de operação que eles atendem rotineiramente.
- `vehicle_id` (FK -> vehicles.id)
- `line_number` (String): Identificador ou número da linha (ex: 4988).

### 6. `vehicle_incidents` (Histórico de Incidentes)
Registra acidentes, defeitos e atos de vandalismo.
- `id` (PK, UUID)
- `vehicle_id` (FK -> vehicles.id)
- `incident_type` (Enum): `ACCIDENT`, `MECHANICAL_DEFECT`, `VANDALISM`.
- `incident_date` (DateTime): Data e hora da ocorrência.
- `description` (Text): Detalhamento do incidente.

### 7. `vehicle_maintenances` (Histórico de Manutenção)
Registra revisões e trocas de peças.
- `id` (PK, UUID)
- `vehicle_id` (FK -> vehicles.id)
- `maintenance_date` (DateTime): Data e hora da manutenção.
- `description` (Text): Detalhamento do serviço realizado.

## Considerações
- O campo `status` deve ser atualizado automaticamente ou impedido de ser `ACTIVE` caso existam registros recentes de `vehicle_incidents` com severidade alta, o que demandará validações a nível de aplicação.
- A exclusão de um `vehicle` deve causar a deleção em cascata (Cascade) em `vehicle_lines`, `vehicle_incidents` e `vehicle_maintenances`.
