import {VehicleStatus} from "@/resources/bus-repo-types.ts";
import moment from "moment";
import {dateConfigs} from "@/assets/resources.js";

moment.locale(dateConfigs.lang);

export default function generateVehicleDescription(vehicle) {
  if (!vehicle) return "";
  
  const parts = [];
  
  const bodywork = vehicle.bodywork ? `${vehicle.bodywork.manufacturer} ${vehicle.bodywork.model}` : '';
  const chassis = vehicle.chassis ? `${vehicle.chassis.manufacturer} ${vehicle.chassis.model}` : '';
  
  if (bodywork && chassis) {
    let intro = `Veículo modelo ${bodywork} montado sobre chassi ${chassis}`;
    if (vehicle.generationBatch && vehicle.generationBatch.name) intro += `, pertencente ao lote "${vehicle.generationBatch.name}"`;
    else if (vehicle.modelYear) intro += `, ano modelo ${vehicle.modelYear}`;
    intro += ".";
    parts.push(intro);
  }
  
  if (vehicle.capacitySeated !== undefined && vehicle.capacityStanding !== undefined) {
    const totalCapacity = vehicle.capacitySeated + vehicle.capacityStanding;
    parts.push(`Possui capacidade total para ${totalCapacity} passageiros, sendo ${vehicle.capacitySeated} sentados e ${vehicle.capacityStanding} em pé.`);
  }
  
  if (vehicle.operationStartDate) {
    const start = moment(vehicle.operationStartDate);
    const end = vehicle.operationEndDate ? moment(vehicle.operationEndDate) : moment();
    
    let timeString;
    const diffYears = Math.abs(start.diff(end, 'years'));
    const diffMonths = Math.abs(start.diff(end, 'months'));
    const diffDays = Math.abs(start.diff(end, 'days'));
    
    if (diffYears > 0) timeString = `${diffYears} ${diffYears > 1 ? 'anos' : 'ano'}`;
    else if (diffMonths > 0) timeString = `${diffMonths} ${diffMonths > 1 ? 'meses' : 'mês'}`;
    else timeString = `${diffDays} ${diffDays > 1 ? 'dias' : 'dia'}`;
    
    const isActive = ![
      VehicleStatus.DEACTIVATED.toLowerCase(),
      "desativado"
    ].includes((vehicle.status || "").toLowerCase());
    
    if (isActive) parts.push(`Atualmente em operação, o veículo está em atividade há ${timeString}.`);
    else parts.push(`O veículo operou por ${timeString} antes de ser retirado de operação.`);
  }
  
  return parts.join(' ');
};
