export const getStatusConfig = (status) => {
  switch (status) {
    case 'Em atividade':
    case 'Ativo':
      return {icon: 'bi-check-circle-fill', color: 'text-success'};
    case 'Em manutenção':
    case 'Manutenção':
      return {icon: 'bi-tools', color: 'text-warning'};
    case 'Desativado':
      return {icon: 'bi-x-circle-fill', color: 'text-danger'};
    case 'Substituído':
      return {icon: 'bi-arrow-left-right', color: 'text-secondary'};
    default:
      return {icon: 'bi-info-circle-fill', color: 'text-secondary'};
  }
};

export const getConservationConfig = (state) => {
  switch (state) {
    case 'Excelente':
      return {icon: 'bi-star-fill', color: 'text-success'};
    case 'Bom':
      return {icon: 'bi-star-fill', color: 'text-primary'};
    case 'Regular':
      return {icon: 'bi-star-fill', color: 'text-warning'};
    case 'Ruim':
      return {icon: 'bi-exclamation-triangle', color: 'text-danger'};
    case 'Precário':
      return {icon: 'bi-exclamation-octagon-fill', color: 'text-dark'};
    default:
      return {icon: 'bi-info-circle', color: 'text-secondary'};
  }
};
