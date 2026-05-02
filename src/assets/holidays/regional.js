import {holidaysForAllScopes} from "./national";

// Container for regional fixed-date holidays, keyed by region code string (e.g. "SP", "RJ", "MG", or "BH" / "município")
export const regionalFixedHolidays = {
  "SC04": [
    {name: "Aniversário de Sabará", month: 7, day: 17},
    ...holidaysForAllScopes
  ],
  "SC03": [
    {name: "Aniversário de Belo Horizonte", month: 8, day: 15},
    ...holidaysForAllScopes
  ],
};
