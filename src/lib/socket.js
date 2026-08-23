import { io } from 'socket.io-client';
import config from "@/assets/config.js";

// Inicializa a conexão com o WebSocket na mesma origem da API
// autoConnect: false garante que a conexão só será aberta quando requisitada
const socket = io(config.host, {
  withCredentials: true,
  autoConnect: false,
});

let activeSubscriptions = 0;

export const connectSocket = () => {
  activeSubscriptions++;
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  activeSubscriptions--;
  if (activeSubscriptions <= 0) {
    activeSubscriptions = 0;
    if (socket.connected) {
      socket.disconnect();
    }
  }
};

socket.on('connect', () => {
  console.log('[Socket.io] Connected with id:', socket.id);
});

socket.on('disconnect', () => {
  console.log('[Socket.io] Disconnected');
});

export default socket;
