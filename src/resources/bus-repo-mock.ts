import {ConservationState, IncidentType, Vehicle, VehicleStatus} from './bus-repo-types';

export const mockVehicles: Vehicle[] = [
  {
    id: 'v1',
    licensePlate: 'O1N3E09',
    fleetNumber: '44089',
    status: VehicleStatus.ACTIVE,
    generationBatch: 'Aquis. com rec. próprios - Renovação Viação Cuiabá - FEV 2018',
    operationStartDate: '2018-02-15T00:00:00-03:00',
    company: {id: 'c1', name: 'Viação Cuiabá'},
    chassis: {id: 'ch1', manufacturer: 'Mercedes Benz', model: 'OF-1721'},
    bodywork: {id: 'bw1', manufacturer: 'Marcopolo', model: 'Mega Plus'},
    manufactureYear: 2017,
    modelYear: 2018,
    dimensionDescription: 'Carroceria de 11 metros',
    optimizationTechnology: 'Bluetec 5',
    capacitySeated: 39,
    capacityStanding: 35,
    hasAc: false,
    hasAirSuspension: false,
    floorType: 'Taraflex',
    seatType: 'Acolchoado - encosto alto',
    hasWifi: true,
    accessibilityElevator: 'Elevador para cadeira de rodas',
    accessibilityExclusiveSeats: 'Possui assentos exclusivos',
    accessibilityVisualContrast: 'Possui contraste visual entre os componentes do veículo',
    accessibilityDisembarkDoor: 'Possui ao menos uma porta para desembarque',
    doorsQuantity: 3,
    operatedLines: ['4988', '4989'],
    conservationState: ConservationState.GOOD,
    incidents: [
      {
        id: 'inc1',
        vehicleId: 'v1',
        type: IncidentType.ACCIDENT,
        date: '2022-06-15T10:00:00Z',
        description: 'Batida leve em Junho de 2022: laceração lateral'
      },
      {
        id: 'inc2',
        vehicleId: 'v1',
        type: IncidentType.VANDALISM,
        date: '2023-01-20T14:30:00Z',
        description: '12 assentos reformados por vandalismo'
      }
    ],
    maintenances: [
      {
        id: 'm1',
        vehicleId: 'v1',
        date: '2023-02-10T08:00:00Z',
        description: 'Troca de pneus e revisão de freios'
      }
    ],
    generalNotes: 'Veículo com bom histórico de manutenção.',
    lastUpdate: '2026-05-10T00:00:00-03:00'
  },
  {
    id: 'v2',
    licensePlate: 'P2M4A10',
    fleetNumber: '55012',
    status: VehicleStatus.MAINTENANCE,
    generationBatch: 'Aquis. com rec. próprios - Expresso Atual - JAN 2020',
    operationStartDate: '2020-01-10T00:00:00-03:00',
    company: {id: 'c2', name: 'Expresso Atual'},
    chassis: {id: 'ch2', manufacturer: 'Volkswagen', model: '17.230 OD'},
    bodywork: {id: 'bw2', manufacturer: 'Caio', model: 'Apache VIP IV'},
    manufactureYear: 2020,
    modelYear: 2020,
    dimensionDescription: 'Carroceria de 13.2 metros',
    optimizationTechnology: 'Euro 5',
    capacitySeated: 42,
    capacityStanding: 40,
    hasAc: true,
    hasAirSuspension: true,
    floorType: 'Alumínio com passadeira antiderrapante',
    seatType: 'Estofado',
    hasWifi: true,
    accessibilityElevator: 'Elevador embutido',
    accessibilityExclusiveSeats: 'Assentos em cor diferenciada para preferenciais',
    accessibilityVisualContrast: 'Balaústres em amarelo tátil',
    accessibilityDisembarkDoor: 'Duas portas de desembarque',
    doorsQuantity: 3,
    operatedLines: ['1001', '1002', '4988'],
    conservationState: ConservationState.REGULAR,
    incidents: [
      {
        id: 'inc3',
        vehicleId: 'v2',
        type: IncidentType.MECHANICAL_DEFECT,
        date: '2024-03-12T09:15:00Z',
        description: 'Vazamento no sistema de suspensão a ar'
      }
    ],
    maintenances: [],
    generalNotes: 'Aguardando peças para suspensão.',
    lastUpdate: '04/06/2026'
  }
];
