import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    historyApiFallback: true
  },
  optimizeDeps: {
    include: ['react-bootstrap']
  },
  build: {
    minify: false
    // commonjsOptions: {
    //   include: [/node_modules/]
    // },
    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes('node_modules/react')) {
    //         return 'vendor-react';
    //       }
    //       if (id.includes('node_modules/react-dom')) {
    //         return 'vendor-react-dom';
    //       }
    //       if (id.includes('node_modules/bootstrap')) {
    //         return 'vendor-bootstrap';
    //       }
    //       if (id.includes('node_modules/react-bootstrap')) {
    //         return 'vendor-react-bootstrap';
    //       }
    //       if (id.includes('node_modules/bootstrap-icons')) {
    //         return 'vendor-bootstrap-icons';
    //       }
    //       if (id.includes('node_modules/moment')) {
    //         return 'vendor-moment';
    //       }
    //       if (id.includes('/src/components/')) {
    //         return 'components';
    //       }
    //       if (id.includes('/src/pages/')) {
    //         return 'pages';
    //       }
    //       if (id.includes('/src/assets/')) {
    //         return 'assets';
    //       }
    //     }
    //     ,
    //   },
    // },
  },
})
