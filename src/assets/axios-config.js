import axios from 'axios';
import config from "@/assets/config.js";

// Cria uma instância do Axios com configurações padrão
const apiClient = axios.create({
  baseURL: `${config.host}/api`,
  // Garante que os cookies de sessão sejam enviados em todas as requisições
  withCredentials: true,
});

// Adiciona um interceptor para tratar erros 401 globalmente.
apiClient.interceptors.response.use(
  (response) => {
    // Se a requisição foi bem-sucedida, apenas a retorne
    return response;
  },
  (error) => {
    // A URL da requisição que falhou.
    const failedUrl = error.config.url;

    // Verifica se o erro é uma resposta 401 Unauthorized.
    // A verificação `failedUrl !== '/check-auth'` é crucial para evitar o loop de redirecionamento,
    // pois a primeira chamada ao carregar a página é justamente para verificar a sessão,
    // e um 401 nesse caso é esperado e tratado localmente no CaptchaProvider.
    if (error.response && error.response.status === 401 && failedUrl !== '/check-auth') {
      // Redireciona para a página para forçar a revalidação do captcha.
      window.location.assign('/re-valid-session/');
    }
    
    // Rejeita a promise para que o erro possa ser tratado localmente se necessário
    return Promise.reject(error);
  }
);

export default apiClient;
