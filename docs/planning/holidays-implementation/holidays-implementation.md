# Planejamento: Implementação e Desacoplamento do Sistema de Feriados e Dias de Operação

## 1. Visão Geral e Motivação

Este documento detalha o planejamento, análise técnica e arquitetura de implementação para a reformulação do sistema de identificação de **Feriados** e **Dias de Operação de Exceção (Atípicos)** da aplicação.

O objetivo central é **desacoplar a lógica de feriados do campo regulatório `line.scope` da tabela `lines` do banco de dados**, alinhando o comportamento do sistema ao modelo conceitual de abrangência territorial/geopolítica de transporte.

---

## 2. Análise do Esquema Inicial (Diagrama Proposto)

O fluxo arquitetural proposto pelo diagrama organiza os feriados em 4 pilares bem definidos:

```
[Feriado Municipal]   -> Escopo: Municipal   -> Linhas específicas (ex: Linha W, X, Y, Z, A)
[Feriado Metrópole]   -> Escopo: Metrópole    -> Linhas metropolitanas específicas (ex: Linha D, E, F, G, H)
[Feriado Estadual]    -> Escopo: Estadual     -> Todas as linhas que responderem a esse escopo
[Feriado Nacional]    -> Escopo: Nacional     -> Todas as linhas que responderem a esse escopo
```

### Premissas do Diagrama:
1. **Feriados possuem escopo próprio:** A abrangência pertence ao evento do calendário (Municipal, Metropolitano, Estadual ou Nacional).
2. **Filtragem de linhas por abrangência:**
   - **Nacional:** Afeta incondicionalmente todas as linhas em operação.
   - **Estadual:** Afeta todas as linhas do estado correspondente (municipais, metropolitanas e intermunicipais do estado).
   - **Metrópole / Metropolitano:** Afeta as linhas do sistema metropolitano ou aquelas conectadas à cidade-polo (ex: Belo Horizonte).
   - **Municipal:** Afeta estritamente as linhas pertencentes àquele município (ex: Sabará).
3. **Associação direta ou territorial de linhas:** Possibilidade de vincular linhas específicas a um evento municipal ou metropolitano.

---

## 3. Diagnóstico: O que foi Implementado vs. Limitações do Estado Atual

### 3.1. Confusão Conceitual entre `line.scope` e "Escopo do Feriado"
No banco de dados (`structure-dump.sql`), a tabela `lines` possui a coluna:
```sql
`scope` int NOT NULL COMMENT 'Abrangência: 1 - Municipal; 2 - Metropolitano; 3 - Rodoviário; 4 - Intermunicipal'
```
Esse atributo define a **natureza regulatória da concessão** da linha (se ela opera dentro de um único município ou interliga municípios de uma conurbação). Ele **não indica em qual cidade ou estado a linha opera**.

### 3.2. Implementação Anterior (`holiday-utils.js` e `regional.js`)
Anteriormente, o sistema realizava um mapeamento rígido e cego em `getTodayHolidayData(scope)`:
```javascript
// Implementação anterior em src/lib/holiday-utils.js
switch (typeof scope === "string" ? scope.toLowerCase() : scope) {
  case "metropolitano":
  case 2:
    codeScope = 4; // Buscava a chave fixa "SC04"
    break;
  case "municipal":
  case 1:
  default:
    codeScope = 3; // Buscava a chave fixa "SC03"
    break;
}
```
E em `regional.js`:
- `"SC04"` continha apenas *Aniversário de Sabará* (17/07).
- `"SC03"` continha apenas *Aniversário de Belo Horizonte* (15/08).

### 3.3. Problemas Identificados
1. **Inversão / Troca de chaves:** Linhas metropolitanas (2) buscavam o aniversário de Sabará (`SC04`), enquanto linhas municipais (1) buscavam BH (`SC03`).
2. **Escopo Estadual Inexistente:** Feriados estaduais de Minas Gerais (ou outros estados) não existiam no sistema.
3. **Impossibilidade de Escala Municipal:** Se houvesse linhas municipais de Belo Horizonte e linhas municipais de Sabará, ambas com `scope = 1`, o sistema aplicaria o mesmo feriado para ambas indistintamente.
4. **Retorno de Horário Fixo (`'domingo'`):** Toda linha afetada por feriado retornava compulsoriamente `['domingo']` em `getCurrentDayGroupName`, impossibilitando linhas metropolitanas de operarem com horário de sábado ou atípico em dias de feriado na capital.
5. **Código Rascunhado na UI (`ShowHolidayInfo.jsx`):** O componente continha comentários `TODO` com divs marcadas com classe `d-none`, demonstrando que a diferenciação textual por escopo nunca fora concluída.

---

## 4. Integração com Dias de Operação de Exceção (Eleições e Dias Atípicos)

Recentemente foi implementada a funcionalidade de **Exceções de Operação** (`src/assets/holidays/exceptions.js`), criada com o propósito de atender a dias como o 1º Turno (04/10/2026) e o 2º Turno (25/10/2026) das Eleições, garantindo que operassem como `"dia útil atípico"`.

Porém, como essa implementação se baseou no modelo anterior, ela também acabou herdando os códigos `SC03` e `SC04`.

**Diretriz do Novo Modelo:**
- Dias de eleição e exceções gerais são eventos de abrangência **Nacional/Geral** (ou seja, `scope: 'national'`).
- A prioridade máxima das exceções é **mantida**: se houver uma exceção aplicável no dia corrente, ela sobrepõe feriados e o dia da semana convencional, aplicando o `groupName` da exceção (ex: `'dia útil atípico'`).

---

## 5. Nova Proposta Arquitetural

### 5.1. Estrutura de Metadados do Feriado / Exceção
Cada evento (feriado ou exceção) passa a ser um objeto com tipagem e metadados estruturados:

```typescript
interface HolidayDefinition {
  id?: string;
  name: string;
  month: number;
  day: number;
  year?: number; // Opcional, para feriados móveis ou exceções de ano específico
  scope: 'national' | 'state' | 'metropolitan' | 'municipal' | 'line';
  state?: string; // Ex: 'MG'
  city?: string; // Ex: 'Sabará', 'Belo Horizonte'
  lineIds?: (number | string)[]; // Lista explícita de IDs de linhas afetadas (opcional)
  scheduleTarget: 'domingo' | 'sábado' | 'dia útil atípico'; // Quadro de horário esperado
  description?: string;
}
```

### 5.2. Desacoplamento da Avaliação da Linha
As funções utilitárias em `holiday-utils.js` (`getTodayHolidayData`, `getTodayExceptionData`, `getCurrentDayGroupName`) passam a aceitar como parâmetro:
- Um objeto `line` completo (contendo `{ line_id, line_number, scope, departure_location, destination_location }`); OU
- Um objeto descritor `{ lineId, city, state, scope }`; OU
- Um valor primitivo numérico/string para compatibilidade regressiva.

### 5.3. Hierarquia de Avaliação de Feriados para uma Linha

```
                ┌──────────────────────────────────────┐
                │        Verificar Exceções            │
                │     (Prioridade Máxima)              │
                └──────────────────┬───────────────────┘
                                   │ Não há exceção
                                   ▼
                ┌──────────────────────────────────────┐
                │    1. Feriado Nacional?              │ ──Sim──► Aplica feriado nacional
                └──────────────────┬───────────────────┘
                                   │ Não
                                   ▼
                ┌──────────────────────────────────────┐
                │    2. Feriado Estadual? (Estado)     │ ──Sim──► Aplica feriado estadual
                └──────────────────┬───────────────────┘
                                   │ Não
                                   ▼
                ┌──────────────────────────────────────┐
                │ 3. Linha explícita em lineIds?       │ ──Sim──► Aplica feriado da linha
                └──────────────────┬───────────────────┘
                                   │ Não
                                   ▼
                ┌──────────────────────────────────────┐
                │ 4. Feriado Municipal? (Origem/Dest)  │ ──Sim──► Aplica feriado municipal
                └──────────────────┬───────────────────┘
                                   │ Não
                                   ▼
                ┌──────────────────────────────────────┐
                │ 5. Feriado Metropolitano?            │ ──Sim──► Aplica feriado metropolitano
                └──────────────────┬───────────────────┘
                                   │ Não
                                   ▼
                ┌──────────────────────────────────────┐
                │  Nenhum feriado aplicável à linha    │
                └──────────────────────────────────────┘
```

---

## 6. Mapeamento de Arquivos e Mudanças no Código

| Arquivo | Mudança Planejada |
| :--- | :--- |
| `src/assets/holidays/national.js` | Enriquecer com `scope: 'national'`, `scheduleTarget: 'domingo'`. |
| `src/assets/holidays/movable.js` | Definir feriados móveis com `scope: 'national'` e `scheduleTarget: 'domingo'`. |
| `src/assets/holidays/state.js` | **Novo arquivo**: feriados estaduais (ex: Data Magna de MG, 21 de abril estadual). |
| `src/assets/holidays/regional.js` | Substituir `SC03`/`SC04` por coleções nomeadas com `city`, `scope: 'municipal' | 'metropolitan'`, `lineIds` e `scheduleTarget`. |
| `src/assets/holidays/exceptions.js` | Desacoplar das chaves `SC03`/`SC04`. Definir Eleições 2026 como `scope: 'national'`, `groupName: 'dia útil atípico'`. |
| `src/assets/holidays/index.js` | Centralizar exports e utilitário `getAllHolidays` normalizando novos metadados. |
| `src/lib/holiday-utils.js` | Atualizar `getTodayHolidayData`, `getTodayExceptionData` e `getCurrentDayGroupName` com lógica de matching territorial e suporte ao parâmetro `line`. |
| `src/components/line-info/show-holiday-info.jsx` | Remover `TODO`s e `d-none`. Renderizar mensagens contextuais de acordo com `data.scope` e `data.scheduleTarget`. |
| `src/components/line/line-header.jsx` | Atualizar passagem da prop: `<ShowHolidayInfo line={line} scope={line.scope} />`. |

---

## 7. Critérios de Validação e Sucesso

- [x] O sistema identifica feriados nacionais para qualquer linha.
- [x] Uma linha de Sabará é afetada no Aniversário de Sabará (17/07), operando com quadro de domingo.
- [x] Uma linha metropolitana Sabará ⇄ BH é afetada em feriados de BH (15/08) com quadro adequado (sábado).
- [x] Dias de eleição (04/10 e 25/10) acionam exceção de "dia útil atípico" para todas as linhas sem depender de `SC03`/`SC04`.
- [x] Nenhuma dependência cega no campo `scope` da tabela `lines` para decisões de território.
- [x] Alinhamento total com a documentação do projeto (`BUSINESS-RULES.md`, `ARCHITECTURE.md`, `CHANGELOG.md`).

---

## 8. Guia Prático: Onde Definir e Como Usar Feriados e Quadros de Horários

### 8.1. Onde Definir Cada Tipo de Feriado

Todos os arquivos de configuração residem no diretório `src/assets/holidays/`:

| Tipo de Feriado / Evento | Arquivo de Definição | Exemplo de Estrutura | Quando Usar |
| :--- | :--- | :--- | :--- |
| **Nacional Fixo** | `src/assets/holidays/national.js` | `{ name: "Tiradentes", month: 4, day: 21, scope: "national", scheduleTarget: "domingo" }` | Feriados federais que afetam todas as linhas do país. |
| **Geral / Facultativo** | `src/assets/holidays/national.js` | `{ name: "Véspera de Natal", month: 12, day: 24, scope: "national", scheduleTarget: "domingo" }` | Datas comemorativas universais ou pontos facultativos de grande impacto. |
| **Móvel (Páscoa)** | `src/assets/holidays/movable.js` | Calculado via algoritmo: Carnaval, Sexta-feira Santa, Páscoa, Corpus Christi. | Feriados móveis nacionais calculados automaticamente a cada ano. |
| **Estadual** | `src/assets/holidays/state.js` | `{ name: "Data Magna de Minas Gerais", month: 4, day: 21, state: "MG", scope: "state", scheduleTarget: "domingo" }` | Feriados estaduais oficiais (afetam linhas no estado de MG). |
| **Municipal** | `src/assets/holidays/regional.js` (em `municipalFixedHolidays`) | `{ name: "Aniversário de Sabará", month: 7, day: 17, city: "Sabará", scope: "municipal", scheduleTarget: "domingo" }` | Feriados locais municipais (afetam linhas de Sabará ou linhas que atendem a cidade). |
| **Metropolitano** | `src/assets/holidays/regional.js` (em `metropolitanFixedHolidays`) | `{ name: "Assunção de Nossa Senhora (BH)", month: 8, day: 15, city: "Belo Horizonte", scope: "metropolitan", scheduleTarget: "sábado" }` | Feriados na capital/polo que alteram a operação de linhas metropolitanas intermunicipais (ex: operando como sábado). |
| **Linhas Específicas** | `src/assets/holidays/regional.js` | `{ name: "Feriado Local Específico", month: 10, day: 15, scope: "line", lineIds: [18, 20, "4987"], scheduleTarget: "domingo" }` | Quando um evento afeta apenas uma lista explícita de linhas de ônibus. |
| **Exceções de Operação (Atípicos)** | `src/assets/holidays/exceptions.js` | `{ name: "Eleições 2026 - 1º Turno", year: 2026, month: 10, day: 4, groupName: "dia útil atípico", scope: "national" }` | Dias com horário atípico (eleições, pontes, decretos) com **prioridade máxima** sobre feriados e dias normais. |

---

### 8.2. Como Definir Escopo e Quadro Alvo (`scheduleTarget`)

Cada objeto de feriado aceita as seguintes propriedades:

```javascript
{
  name: "Nome do Feriado",          // [Obrigatório] Nome exibido nos alertas e informativos
  month: 7,                         // [Obrigatório] Mês (1 a 12)
  day: 17,                          // [Obrigatório] Dia (1 a 31)
  year: 2026,                       // [Opcional] Ano específico (omitir para feriados recorrentes anuais)
  scope: "municipal",               // [Obrigatório] "national" | "state" | "metropolitan" | "municipal" | "line"
  city: "Sabará",                   // [Obrigatório para municipal/metropolitan] Nome da cidade correspondente
  state: "MG",                      // [Opcional] Estado (padrão assumido: "MG")
  lineIds: [18, 20],                // [Opcional] Array de IDs ou números de linhas para matching direto
  scheduleTarget: "domingo"         // [Padrão: "domingo"] "domingo" | "sábado" | "dia útil atípico"
}
```

> **Atenção sobre Quadros de Horários:** No cadastro de transporte deste projeto (`day_types` no banco de dados), **não existem quadros como "segunda-feira feriado" ou "terça-feira feriado"**. O quadro padrão de todo feriado é **`"domingos e feriados"`** (representado internamente por `scheduleTarget: "domingo"`). Altere para `"sábado"` ou `"dia útil atípico"` apenas quando houver determinação especial do órgão gestor.

---

### 8.3. Como Consumir os Feriados no Código

#### 1. Identificar se hoje é feriado para uma linha:
```javascript
import Util from "@/lib/Util.jsx";
// ou diretamente: import { getTodayHolidayData } from "@/lib/holiday-utils.js";

// Passando o objeto line completo retornado pela API:
const holiday = Util.getTodayHolidayData(line);

if (holiday) {
  console.log(holiday.name);           // Ex: "Aniversário de Sabará"
  console.log(holiday.scope);          // Ex: "municipal"
  console.log(holiday.scheduleTarget); // Ex: "domingo"
}
```

#### 2. Obter o grupo do dia operacional corrente (para casamento de abas):
```javascript
import Util from "@/lib/Util.jsx";
// ou: import { getCurrentDayGroupName } from "@/lib/holiday-utils.js";

const [dayGroupName] = Util.getCurrentDayGroupName(line);
// Retorna: ['domingo'], ['sábado'] ou ['dia útil atípico']
// Este retorno é usado automaticamente por getBestMatchDayIndex para abrir a aba correspondente.
```

#### 3. Exibir o componente de alerta na página da linha:
```jsx
import ShowHolidayInfo from "@/components/line-info/show-holiday-info.jsx";

// O componente recebe 'line' (ou 'scope' como fallback):
<ShowHolidayInfo line={line} scope={line.scope} />
```
O componente renderiza automaticamente a mensagem contextual formatada:
- **Municipal:** `"Feriado municipal (Sabará): hoje é Aniversário de Sabará! As linhas municipais operam no horário de domingo e feriado."`
- **Metropolitano:** `"Feriado metropolitano: hoje é Assunção de Nossa Senhora! As linhas metropolitanas operam no horário de sábado."`
- **Nacional:** `"Feriado nacional: hoje é Independência do Brasil! As linhas operam no horário de domingo e feriado."`

