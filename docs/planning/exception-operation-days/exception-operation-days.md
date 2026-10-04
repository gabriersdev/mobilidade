# Planejamento: Exceções de Dias de Operação

## 1. Análise do Diretório e Arquivos
- **`src/assets/holidays/`**: Diretório modular contendo os arquivos de configuração e definições de feriados.
- **`src/assets/holidays.js`**: Arquivo de exportação que aponta para `@/assets/holidays/index`.
- **`src/lib/holiday-utils.js`**: Este arquivo possui funções como `getTodayHolidayData`, `getTodayVacationData` e a função principal de interesse, `getCurrentDayGroupName`.
- **`docs/`**: Não foi encontrada nenhuma documentação estritamente sobre feriados (pesquisei por "feriado" e "holiday" e o único retorno útil estava em `structure-dump.sql`, listando os tipos de dia como "Dias úteis atípico", "Sábado atípico", etc.).

## 2. Análise da Função `getCurrentDayGroupName()`
A função `getCurrentDayGroupName(scope, consideringVacations)` atualmente:
1. Verifica se hoje é feriado através de `getTodayHolidayData(scope)`. Se for, retorna diretamente `['domingo']`.
2. Caso não seja feriado, usa a subfunção `theDayIs()` que avalia `moment().get("day")` (o dia da semana atual) e retorna `'domingo'`, `'sábado'` ou `'dia útil'`.
3. Se o parâmetro `consideringVacations` for verdadeiro, avalia se existe férias hoje e, se sim, adiciona `'ferias'` à matriz (ex: `['dia útil', 'ferias']`).

**Conclusão**: A função **não permite** atualmente trabalhar com excepcionalidades que fogem à regra matemática de feriados ou dias da semana, porque o retorno está fixo ou no feriado (`'domingo'`) ou no dia padrão da semana (`theDayIs()`). Não é possível forçar que um dia 25 de janeiro (sábado) seja retornado como `'dia útil atípico'`, por exemplo, sem modificar sua lógica.

## 3. Proposta de Implementação (Plano de Ação)
Para resolver esse problema, criaremos um sistema de "Exceções de Operação".

**Passo 3.1: Criar base de Exceções (`src/assets/holidays/exceptions.js`)**
Criaremos um arquivo exportando as regras excepcionais, permitindo sobrescrever o `groupName`.
```javascript
import moment from "moment";

export const regionalExceptions = {
  "SC04": [
    // Exemplo: { name: "Sábado com horário de dia útil atípico", year: 2026, month: 1, day: 25, groupName: "dia útil atípico" }
  ],
  "SC03": [
    // Exemplo: { name: "Sábado com horário de dia útil atípico", year: 2026, month: 1, day: 25, groupName: "dia útil atípico" }
  ]
};

export function getAllExceptions(year, options = {}) {
  const { includeRegion = null } = options;
  let exceptions = [];

  if (includeRegion && regionalExceptions[includeRegion]) {
      exceptions = exceptions.concat(regionalExceptions[includeRegion]);
  }

  // Filtrar apenas do ano atual ou exceções recorrentes (sem ano definido)
  const filtered = exceptions.filter(e => !e.year || e.year === year);

  return filtered.map(e => ({
      name: e.name,
      month: e.month,
      day: e.day,
      groupName: e.groupName,
      date: moment(`${year}-${("0" + e.month).slice(-2)}-${("0" + e.day).slice(-2)}T00:00:00-03:00`)
  }));
}
```

**Passo 3.2: Exportar Exceções em `src/assets/holidays/index.js`**
Adicionar o arquivo de exceções no ponto de entrada:
```javascript
export * from './exceptions';
```

**Passo 3.3: Criar função `getTodayExceptionData` em `src/lib/holiday-utils.js`**
Isso seguirá o mesmo padrão de `getTodayHolidayData`.
```javascript
import { getAllExceptions } from "@/assets/holidays/exceptions.js";

export function getTodayExceptionData(scope) {
  let codeScope;
  switch (typeof scope === "string" ? scope.toLowerCase() : scope) {
    case "metropolitano":
    case 2:
      codeScope = 4;
      break;
    case "municipal":
    case 1:
    default:
      codeScope = 3
      break;
  }
  const m = moment();
  const now = moment(`${m.get("year")}-${('0' + (m.get("month") + 1)).slice(-2)}-${('0' + m.get("date")).slice(-2)}T00:00:00-03:00`);
  
  let exceptionsScope = getAllExceptions(now.year(), {includeRegion: `SC${('0' + codeScope).slice(-2)}`});
  return exceptionsScope.find((e) => now.diff(e.date, "days") === 0);
}
```

**Passo 3.4: Modificar `getCurrentDayGroupName` em `src/lib/holiday-utils.js`**
A primeira verificação passará a ser se há uma *exceção*. Se houver, sobrepomos todas as outras lógicas, a menos que existam férias que devem ser concatenadas.
```javascript
export function getCurrentDayGroupName(scope, consideringVacations) {
  const exception = getTodayExceptionData(scope);
  
  // Se existir uma exceção, o dia recebe o escopo definido por ela
  if (exception) {
    if ([null, undefined, true].includes(consideringVacations)) {
      const vacation = getTodayVacationData();
      if (vacation) return [exception.groupName, 'ferias'];
    }
    return [exception.groupName];
  }

  // Comportamento padrão anterior
  if (getTodayHolidayData(scope)) return ['domingo'];
  
  function theDayIs() { ... }
  // ...
}
```

Este plano atende integralmente os requisitos de adicionar um condicionante flexível e isolado, garantindo o funcionamento do sistema atual e facilitando a gestão futura.
