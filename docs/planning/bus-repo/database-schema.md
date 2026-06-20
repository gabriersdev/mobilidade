# Projeto de Banco de Dados: Repositório de Ônibus

Este documento descreve o modelo relacional lógico para o módulo de Repositório de Ônibus. Embora a aplicação atual seja um Single Page Application (SPA) que utiliza dados em formato JSON mockado, este esquema serve como base para a futura implementação de uma API e um banco de dados relacional.

## Entidades e Relacionamentos

### Padrão de Auditoria (Aplicado a todas as entidades de negócio)
Todas as tabelas de negócio abaixo possuem as seguintes colunas de auditoria padrão (conforme as diretrizes):
- `createdAt` (Timestamp): Data e hora exatas da inserção.
- `updatedAt` (Timestamp): Data e hora da última alteração.
- `createdBy` (UUID): ID do usuário ou sistema que criou o registro.
- `updatedBy` (UUID): ID do usuário que modificou o registro pela última vez.
- `isActive` (Boolean): Flag de exclusão lógica (Soft Delete).
- `deletedAt` (Timestamp, Nullable): Momento da exclusão lógica.

---

### 1. `company` (Empresa Proprietária e Operadora)
Armazena as empresas responsáveis pelos veículos.
- `id` (PK, UUID): Identificador único.
- `name` (String, Unique): Nome da empresa (ex: Viação Cuiabá).

### 2. `chassisModel` (Modelo de Chassi)
Catálogo unificado de chassis para evitar redundância.
- `id` (PK, UUID)
- `manufacturer` (String): Fabricante (ex: Mercedes Benz, Volkswagen).
- `model` (String): Modelo do chassi (ex: OF-1721, 17.230 OD).

### 3. `bodyworkModel` (Modelo de Carroceria)
Catálogo unificado de carrocerias.
- `id` (PK, UUID)
- `manufacturer` (String): Encarroçadora (ex: Marcopolo, Caio).
- `model` (String): Modelo (ex: Mega Plus, Apache VIP IV).

### 4. `vehicle` (Veículo)
Tabela principal que centraliza as informações do ônibus.
- `id` (PK, UUID)
- `licensePlate` (String, Unique): Placa do veículo (ex: O1N3E09).
- `fleetNumber` (String, Unique): Identificação interna na frota (ex: 44089).
- `status` (Enum): `ACTIVE`, `REPLACED`, `DEACTIVATED`, `MAINTENANCE`, `UNKNOWN`.
- `generationBatch` (String): Descrição da leva ou lote de aquisição.
- `companyId` (FK -> company.id)
- `chassisModelId` (FK -> chassisModel.id)
- `bodyworkModelId` (FK -> bodyworkModel.id)
- `manufactureYear` (Int): Ano de fabricação.
- `modelYear` (Int): Ano do modelo.
- `dimensionDescription` (String): (ex: Carroceria de 11 metros).
- `optimizationTechnology` (String): Tecnologia empregada (ex: Bluetec 5).
- `capacitySeated` (Int): Número de assentos.
- `capacityStanding` (Int): Capacidade de pessoas em pé.
- `hasAc` (Boolean): Ar condicionado.
- `hasAirSuspension` (Boolean): Suspensão a ar.
- `floorType` (String): Material ou tipo do piso (ex: Taraflex).
- `seatType` (String): Tipo do assento (ex: Acolchoado).
- `hasWifi` (Boolean): Disponibilidade de Wi-Fi.
- `accessibilityElevator` (String): Descrição do elevador de acessibilidade.
- `accessibilityExclusiveSeats` (String): Descrição de assentos preferenciais.
- `accessibilityVisualContrast` (String): Contraste visual para deficientes visuais.
- `accessibilityDisembarkDoor` (String): Informações sobre portas adaptadas.
- `doorsQuantity` (Int): Número total de portas.
- `conservationState` (Enum): `EXCELLENT`, `GOOD`, `REGULAR`, `BAD`, `PRECARIOUS`.
- `generalNotes` (Text): Observações livres.

### 5. `vehicleLine` (Relação Veículo-Linha)
Relacionamento N:M entre veículos e as linhas de operação que eles atendem rotineiramente.
- `id` (PK, UUID)
- `vehicleId` (FK -> vehicle.id)
- `lineNumber` (String): Identificador ou número da linha (ex: 4988).

### 6. `vehicleIncident` (Histórico de Incidentes)
Registra acidentes, defeitos e atos de vandalismo.
- `id` (PK, UUID)
- `vehicleId` (FK -> vehicle.id)
- `incidentType` (Enum): `ACCIDENT`, `MECHANICAL_DEFECT`, `VANDALISM`.
- `incidentDate` (DateTime): Data e hora da ocorrência.
- `description` (Text): Detalhamento do incidente.

### 7. `vehicleMaintenance` (Histórico de Manutenção)
Registra revisões e trocas de peças.
- `id` (PK, UUID)
- `vehicleId` (FK -> vehicle.id)
- `maintenanceDate` (DateTime): Data e hora da manutenção.
- `description` (Text): Detalhamento do serviço realizado.

### 8. `auditLog` (Histórico de Auditoria)
Tabela central para registrar o histórico completo de alterações dos registros (Audit Trail).
- `id` (PK, UUID)
- `tableName` (String): Nome da tabela afetada (ex: "vehicle").
- `recordId` (UUID): ID do registro afetado na tabela de origem.
- `action` (Enum): `INSERT`, `UPDATE`, `DELETE`.
- `oldData` (JSONB): Estado completo do registro ANTES da alteração.
- `newData` (JSONB): Estado completo do registro DEPOIS da alteração.
- `performedBy` (UUID): ID do usuário ou sistema que executou a ação.
- `performedAt` (Timestamp): Timestamp da ocorrência.

## Considerações
- O campo `status` em `vehicle` deve ser atualizado automaticamente ou impedido de ser `ACTIVE` caso existam registros recentes de `vehicleIncident` com severidade alta, o que demandará validações a nível de aplicação.
- Todas as exclusões devem ser lógicas (`isActive` = false), exceto em tabelas estritamente relacionais como `vehicleLine` se o modelo de negócio permitir a exclusão física desta.
- Operações de `UPDATE` e soft `DELETE` devem preencher a tabela `auditLog` via Triggers (gatilhos) no banco de dados.
