import apiClient from "@/assets/axios-config.js";
import {normalize} from "./string-utils.js";
import {getCurrentDayGroupName} from "./holiday-utils.js";

export async function convertNumberToDay(day) {
  const transformDayTypeName = (t) => {
    let newT = t.replaceAll("/", " e ")
    newT = newT.replace(/PC(?<num>\d+)/gi, "- PC $1");
    return newT.substring(0, 1).toUpperCase() + newT.substring(1);
  }
  
  const table = []
  
  await apiClient.get(`/day-tipes/`).then((response) => {
    response.data.forEach((row) => {
      table.push([row["day_type_id"], transformDayTypeName(row["day_type_name"]?.toLowerCase())]);
    })
    
    return response.data;
  }).then(() => {
  }).catch(error => {
    console.log(error);
  })
  
  const find = table.find((item) => item[0] === parseInt(day, 10))
  
  if (!find) {
    console.error(`Dia ${day} não categorizado. Retornado: "Horário não mapeado".`);
    return 'Horário não mapeado'
  }
  
  return find[1]
}

export async function getBestMatchDayIndex(uniqueDays, scope) {
  if (!uniqueDays || uniqueDays.length === 0) return -1;
  const convertedDayNames = await Promise.all(
    uniqueDays.map(day => convertNumberToDay(day))
  );
  
  const dayGroup = getCurrentDayGroupName(scope);
  const currentDayNameRaw = Array.isArray(dayGroup) ? dayGroup[0] : dayGroup;
  const currentDayNameIsVacationRaw = Array.isArray(dayGroup) ? dayGroup[1] : null;
  
  const currentDayName = normalize(currentDayNameRaw.toLowerCase());
  const isVacation = currentDayNameIsVacationRaw && (currentDayNameIsVacationRaw.includes('ferias') || currentDayNameIsVacationRaw.includes('férias'));
  
  let bestMatchIndex = -1;
  let bestMatchScore = -1;
  
  convertedDayNames.forEach((name, index) => {
    const normalizedName = normalize(name.toLowerCase());
    const nameHasVacation = normalizedName.includes('ferias') || normalizedName.includes('férias');
    let nameHasDay = normalizedName.includes(currentDayName);
    
    if (!nameHasDay && currentDayName === 'dia util') nameHasDay = normalizedName.includes('dias uteis') || normalizedName.includes('dia util');
    
    let score = -1;
    if (isVacation) {
      if (nameHasDay) {
        if (nameHasVacation) score = 2;
        else score = 1;
      }
    } else {
      if (nameHasDay) {
        if (!nameHasVacation) score = 2;
        else score = -1;
      }
    }
    
    if (score > bestMatchScore) {
      bestMatchScore = score;
      bestMatchIndex = index;
    }
  });
  
  return bestMatchIndex;
}
