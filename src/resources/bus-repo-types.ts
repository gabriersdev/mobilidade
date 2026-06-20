export enum VehicleStatus {
  ACTIVE = 'Em atividade',
  REPLACED = 'Substituído',
  DEACTIVATED = 'Desativado',
  MAINTENANCE = 'Em manutenção',
  UNKNOWN = 'Desconhecido',
}

export enum ConservationState {
  EXCELLENT = 'Excelente',
  GOOD = 'Bom',
  REGULAR = 'Regular',
  BAD = 'Ruim',
  PRECARIOUS = 'Precário',
}

export enum IncidentType {
  ACCIDENT = 'Acidente',
  MECHANICAL_DEFECT = 'Defeito Mecânico',
  VANDALISM = 'Vandalismo/Depreciação',
}

export interface Company {
  id: string;
  name: string;
}

export interface Operator {
  id: string;
  name: string;
  CNPJ: string;
  contact?: string;
  report?: string;
}

export interface ChassisModel {
  id: string;
  manufacturer: string;
  model: string;
}

export interface BodyworkModel {
  id: string;
  manufacturer: string;
  model: string;
}

export interface VehicleIncident {
  id: string;
  vehicleId: string;
  type: IncidentType;
  date: string; // ISO String
  description: string;
}

export interface VehicleMaintenance {
  id: string;
  vehicleId: string;
  date: string; // ISO String
  description: string;
}

export interface Vehicle {
  id: string;
  licensePlate: string;
  fleetNumber: string;
  status: VehicleStatus;
  generationBatch: string;
  operationStartDate?: string;
  operationEndDate?: string;
  
  operator: Operator;
  company: Company;
  chassis: ChassisModel;
  bodywork: BodyworkModel;
  
  manufactureYear: number;
  modelYear: number;
  dimensionDescription: string;
  optimizationTechnology: string;
  
  capacitySeated: number;
  capacityStanding: number;
  hasAc: boolean;
  hasAirSuspension: boolean;
  floorType: string;
  seatType: string;
  hasWifi: boolean;
  
  accessibilityElevator: string;
  accessibilityExclusiveSeats: string;
  accessibilityVisualContrast: string;
  accessibilityDisembarkDoor: string;
  doorsQuantity: number;
  
  operatedLines: string[];
  conservationState: ConservationState;
  incidents: VehicleIncident[];
  maintenances: VehicleMaintenance[];
  generalNotes: string;
  lastUpdate?: string;
}
