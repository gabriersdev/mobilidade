# Diretrizes de Definição de Banco de Dados

Este documento fornece diretrizes de implementação para o banco de dados do projeto.

## Padrões de Nomenclatura (Naming Conventions)

Todas as entidades físicas devem ser nomeadas em inglês e utilizar o padrão `camelCase`.

### Tabelas e Colunas

* Tabelas: Devem ser substantivos no singular.
* *Correto:* `user`, `purchaseOrder`, `paymentMethod`
* *Incorreto:* `users`, `PurchaseOrders`, `payment_methods`

* Colunas: Devem descrever o dado de forma clara, sem repetir o nome da tabela desnecessariamente.
* *Correto:* `firstName`, `birthDate`, `documentNumber`

* Chaves Primárias (PK): A coluna deve se chamar simplesmente `id`. O nome da *constraint* (restrição física) no
  banco deve seguir o prefixo `pk` + NomeDaTabela com a primeira letra maiúscula.
* *Coluna:* `id`
* *Constraint:* `pkUser`, `pkPurchaseOrder`

* Chaves Estrangeiras (FK): A coluna deve conter o nome da tabela de destino (no singular) com o sufixo `Id`. A
  *constraint* deve seguir o prefixo `fk` + TabelaOrigem + TabelaDestino.
* *Coluna:* `userId`, `purchaseOrderId`
* *Constraint:* `fkOrderUser`, `fkPaymentPurchaseOrder`

### Índices e Restrições

* Índices (Indexes): Prefixo `idx` + NomeDaTabela + Coluna(s).
* *Exemplo:* `idxUserEmail`, `idxOrderCreatedAt`

* Restrições Únicas (Unique): Prefixo `uq` + NomeDaTabela + Coluna.
* *Exemplo:* `uqUserEmail`, `uqProductSku`

* Validações (Check): Prefixo `chk` + NomeDaTabela + Regra.
* *Exemplo:* `chkOrderTotalAmount` (para garantir que o valor seja > 0).

## Padrões de Auditoria e Rastreabilidade

Para manter um histórico confiável e auditável, o modelo físico deve implementar rastreabilidade em duas camadas: *
*colunas padrão por tabela e tabelas de log/histórico.

### Camada 1: Colunas Padrão de Auditoria (Em todas as tabelas)

Toda tabela que armazena dados transacionais ou de negócio deve conter as seguintes colunas de metadados:

| Coluna      | Tipo de Dado (Genérico) | Descrição                                                                                                                                |
|-------------|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `createdAt` | `TIMESTAMP`             | Data e hora exatas da inserção do registro.                                                                                              |
| `updatedAt` | `TIMESTAMP`             | Data e hora da última alteração. Deve ser atualizada automaticamente via *Trigger* ou pelo ORM.                                          |
| `createdBy` | `UUID` ou `INT`         | ID do usuário ou sistema que criou o registro (FK opcional para a tabela `user`).                                                        |
| `updatedBy` | `UUID` ou `INT`         | ID do usuário ou sistema que modificou o registro pela última vez.                                                                       |
| `isActive`  | `BOOLEAN`               | Define se o registro está ativo. *Nunca faça Hard Delete (DELETE) em tabelas auditadas, use Soft Delete alterando esta flag para false.* |
| `deletedAt` | `TIMESTAMP` (Nulo)      | Preenchido apenas quando `isActive` se torna falso, marcando o exato momento da exclusão lógica.                                         |

### Camada 2: Tabela Central de Logs (Audit Trail)

Para sistemas que exigem auditoria rigorosa (LGPD/GDPR, sistemas financeiros), as colunas padrão não são suficientes,
pois você perde o histórico de "como o dado era antes da alteração".

Crie uma tabela central chamada `auditLog` (ou tabelas de histórico separadas, como `userHistory`). A abordagem
centralizada costuma ser mais fácil de escalar:

Estrutura da tabela `auditLog`:

* `id` (PK)
* `tableName` (Nome da tabela afetada, ex: "purchaseOrder")
* `recordId` (ID do registro afetado na tabela de origem)
* `action` (Tipo de ação: "INSERT", "UPDATE", "DELETE")
* `oldData` (Coluna JSON/JSONB contendo o estado completo do registro ANTES da alteração)
* `newData` (Coluna JSON/JSONB contendo o estado completo do registro DEPOIS da alteração)
* `performedBy` (ID do usuário que executou a ação)
* `performedAt` (Timestamp da ocorrência)

Regra de Ouro da Auditoria: A inserção na tabela `auditLog` deve ser feita, preferencialmente, por meio de *Triggers* (
Gatilhos) no próprio banco de dados, e não na camada de aplicação (PHP, Java, JS). Isso garante que, mesmo que alguém
acesse o banco via terminal e faça um `UPDATE` manual, o log será gerado incondicionalmente.
