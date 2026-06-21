# Projeto de Banco de Dados: Repositório de Ônibus

Este documento descreve o modelo relacional lógico para o módulo de Repositório de Ônibus. O esquema integra as novas entidades — que seguem rigorosamente as diretrizes de banco de dados (`DATABASE-GUIDELINES.md`) — com as tabelas já existentes na estrutura atual do banco de dados (conforme `structure-dump.sql`).

## Tabelas Existentes (Legado)

Estas tabelas já existem no banco de dados, possuindo suas próprias regras de nomenclatura (snake_case) e não contêm os campos padronizados de auditoria das novas diretrizes. Elas são referenciadas pelas novas entidades.

### `companies` (Empresas Proprietárias e Operadoras)
- `company_id` (PK, INT): Identificador único.
- `company_name` (String, Unique): Nome da empresa.
- `contact` (Text): Contatos gerais.
- `report_contact` (Text): Contato para relatórios.

### `lines` (Linhas de Operação)
- `line_id` (PK, INT): Identificador único.
- `line_number` (String): Número da linha.
- `line_name` (String): Nome da linha.
- *(Outras colunas existentes omitidas por brevidade)*

---

## Novas Entidades (Seguindo DATABASE-GUIDELINES.md)

### Padrão de Auditoria
Todas as tabelas de negócio abaixo possuem as seguintes colunas de auditoria padrão:
- `createdAt` (Timestamp): Data e hora exatas da inserção.
- `updatedAt` (Timestamp): Data e hora da última alteração.
- `createdBy` (INT): ID do usuário (`users.id`) que criou o registro.
- `updatedBy` (INT): ID do usuário que modificou o registro pela última vez.
- `isActive` (Boolean): Flag de exclusão lógica (Soft Delete).
- `deletedAt` (Timestamp, Nullable): Momento da exclusão lógica.

---

### 1. `chassisModel` (Modelo de Chassi)
Catálogo unificado de chassis para evitar redundância.
- `id` (PK, UUID)
- `manufacturer` (String): Fabricante (ex: Mercedes Benz).
- `model` (String): Modelo do chassi (ex: OF-1721).

### 2. `bodyworkModel` (Modelo de Carroceria)
Catálogo unificado de carrocerias.
- `id` (PK, UUID)
- `manufacturer` (String): Encarroçadora (ex: Marcopolo).
- `model` (String): Modelo (ex: Mega Plus).

### 3. `vehicle` (Veículo)
Tabela principal que centraliza as informações do ônibus.
- `id` (PK, UUID)
- `licensePlate` (String, Unique): Placa do veículo.
- `fleetNumber` (String, Unique): Identificação interna na frota.
- `status` (Enum): `ACTIVE`, `REPLACED`, `DEACTIVATED`, `MAINTENANCE`, `UNKNOWN`.
- `generationBatchId` (FK -> generationBatch.id, UUID): Identificação da leva ou lote de aquisição.
- `operationStartDate` (Date): Data de início de operação.
- `operationEndDate` (Date): Data de término de operação.
- `operatorId` (FK -> operators.id, INT): Operador responsável pelo veículo.
- `companyId` (FK -> companies.company_id, INT): Relacionamento com tabela existente.
- `chassisModelId` (FK -> chassisModel.id, UUID)
- `bodyworkModelId` (FK -> bodyworkModel.id, UUID)
- `manufactureYear` (Int): Ano de fabricação.
- `modelYear` (Int): Ano do modelo.
- `dimensionDescription` (String)
- `optimizationTechnology` (String)
- `capacitySeated` (Int)
- `capacityStanding` (Int)
- `hasAc` (Boolean)
- `hasAirSuspension` (Boolean)
- `floorType` (String)
- `seatType` (String)
- `hasWifi` (Boolean)
- `accessibilityElevator` (String)
- `accessibilityExclusiveSeats` (String)
- `accessibilityVisualContrast` (String)
- `accessibilityDisembarkDoor` (String)
- `doorsQuantity` (Int)
- `conservationState` (Enum): `EXCELLENT`, `GOOD`, `REGULAR`, `BAD`, `PRECARIOUS`.
- `generalNotes` (Text)

### 4. `vehicleLine` (Relação Veículo-Linha)
Relacionamento N:M entre veículos e as linhas de operação existentes.
- `id` (PK, UUID)
- `vehicleId` (FK -> vehicle.id, UUID)
- `lineId` (FK -> lines.line_id, INT): Relacionamento com a tabela de linhas existente.

### 5. `vehicleIncident` (Histórico de Incidentes)
Registra acidentes, defeitos e atos de vandalismo.
- `id` (PK, UUID)
- `vehicleId` (FK -> vehicle.id, UUID)
- `incidentType` (Enum): `ACCIDENT`, `MECHANICAL_DEFECT`, `VANDALISM`.
- `incidentDate` (DateTime)
- `description` (Text)

### 6. `vehicleMaintenance` (Histórico de Manutenção)
Registra revisões e trocas de peças.
- `id` (PK, UUID)
- `vehicleId` (FK -> vehicle.id, UUID)
- `maintenanceDate` (DateTime)
- `description` (Text)

### 7. `auditLog` (Histórico de Auditoria)
Tabela central para registrar o histórico completo de alterações (Audit Trail).
- `id` (PK, UUID)
- `tableName` (String): Nome da tabela afetada (ex: "vehicle").
- `recordId` (String): ID do registro afetado (convertido para string pois pode ser INT do legado ou UUID do novo modelo).
- `action` (Enum): `INSERT`, `UPDATE`, `DELETE`.
- `oldData` (JSONB): Estado do registro ANTES da alteração.
- `newData` (JSONB): Estado do registro DEPOIS da alteração.
- `performedBy` (INT): ID do usuário (`users.id`).
- `performedAt` (Timestamp): Data e hora da ocorrência.

### 8. `operators` (Operadora)
Tabela para informações da operadora (empresa de ônibus, consórcio ou órgão/instituição pública).
- `id` (PK, INT, Auto Increment)
- `name` (String): Nome da operadora.
- `CNPJ` (String): CNPJ da operadora.
- `contact` (Text, Nullable): Contatos gerais.
- `report` (Text, Nullable): Contatos para relatórios.

### 9. `generationBatch` (Geração/Leva)
Tabela para o catálogo e informações da geração/lote de renovação da frota.
- `id` (PK, UUID)
- `name` (String): Nome descritivo da geração/lote (ex: Aquis. com rec. próprios - Renovação Viação Cuiabá - FEV 2018).

## Considerações
- O campo `status` em `vehicle` deve ser atualizado automaticamente ou impedido de ser `ACTIVE` caso existam incidentes com severidade alta.
- Todas as exclusões das tabelas novas devem ser lógicas (`isActive` = false).
- A tabela `auditLog` deve ser alimentada via Triggers no banco de dados. Um trigger específico (`trg_vehicle_operation_dates`) deve registrar alterações nas datas de início e término de operação (`operationStartDate` e `operationEndDate`).
