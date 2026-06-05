import { mockVehicles } from '../resources/bus-repo-mock';

/**
 * Service para interagir com o repositório de veículos.
 * Atualmente utiliza dados em memória (mock), mas no futuro
 * pode ser facilmente substituído por chamadas de API (e.g. Axios).
 */
export const busRepoService = {
  /**
   * Retorna a lista de todos os veículos.
   */
  async getVehicles() {
    // Simular delay de rede
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockVehicles);
      }, 300);
    });
  },

  /**
   * Retorna os detalhes de um veículo específico pelo ID.
   */
  async getVehicleById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const vehicle = mockVehicles.find(v => v.id === id);
        if (vehicle) {
          resolve(vehicle);
        } else {
          reject(new Error('Veículo não encontrado'));
        }
      }, 300);
    });
  }
};
