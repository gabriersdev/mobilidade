import axios from 'axios';
import config from '@/assets/config.js';

/**
 * Service para interagir com o repositório de veículos.
 * Substituído de mock para chamadas da API real via Axios.
 */
export const busRepoService = {
  /**
   * Retorna a lista de todos os veículos.
   */
  async getVehicles() {
    try {
      const response = await axios.get(`${config.host}/api/vehicles`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar lista de veículos:', error);
      throw error;
    }
  },

  /**
   * Retorna os detalhes de um veículo específico pelo ID.
   */
  async getVehicleById(id) {
    try {
      const response = await axios.get(`${config.host}/api/vehicles/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes do veículo %s:', id, error);
      throw error;
    }
  }
};
