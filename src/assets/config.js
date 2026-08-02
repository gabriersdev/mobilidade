let config;

if (window.location.hostname === 'localhost') {
  config = {
    host: 'http://localhost:3001'
  };
} else {
  config = {
    host: 'https://server.mobilidade.lts.app.br'
  };
}

export default config;
