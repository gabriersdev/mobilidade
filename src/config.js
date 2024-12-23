let config;

if (window.location.hostname === 'localhost') {
  config = {
    host: 'http://localhost:3001'
  };
} else {
  config = {
    host: 'https://mobilidade-server-production.up.railway.app'
  };
}

export default config;
