import axios from 'axios';
import config from "@/assets/config.js";

// Cria uma instância do Axios com configurações padrão
const apiClient = axios.create({
  baseURL: `${config.host}/api`,
  // Garante que os cookies de sessão sejam enviados em todas as requisições
  withCredentials: true,
});

// Adiciona um interceptor para tratar erros 401 globalmente.
// Conforme a documentação, um 401 deve redirecionar o usuário para a verificação.
apiClient.interceptors.response.use(
  (response) => {
    // Se a requisição foi bem-sucedida, apenas a retorne
    return response;
  },
  (error) => {
    // Verifica se o erro é uma resposta 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Redireciona para a página inicial para forçar a revalidação do captcha.
      // Isso causa um reload da página, limpando o estado do frontend.
      window.location.assign('/re-valid-session/');
    }
    
    // Rejeita a promise para que o erro possa ser tratado localmente se necessário
    return Promise.reject(error);
  }
);

export default apiClient;
