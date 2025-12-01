// noinspection JSCheckFunctionSignatures

import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {terser} from 'rollup-plugin-terser'
import {visualizer} from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    // Abre um gráfico após a build
    visualizer({open: true})
  ],
  server: {
    historyApiFallback: true
  },
  optimizeDeps: {
    include: ['react-bootstrap', 'bootstrap/dist/js/bootstrap.bundle.min.js'],
  },
  build: {
    minify: 'terser',
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/]
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/bootstrap')) return 'vendor-bootstrap';
          if (id.includes('node_modules/react-bootstrap')) return 'vendor-react-bootstrap';
          if (id.includes('node_modules/bootstrap-icons')) return 'vendor-bootstrap-icons';
          if (id.includes('node_modules/moment')) return 'vendor-moment';
          
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
        format: 'es',
        plugins: [
          terser({
            format: {
              // Remove comentários
              comments: false,
            },
            compress: {
              // Remove console.log
              drop_console: true,
              // Remove debugger
              drop_debugger: true,
              // Compressão mais agressiva
              passes: 3,
              pure_funcs: ['console.info', 'console.debug', 'console.warn'],
            }
          })
        ]
      },
      treeshake: {
        moduleSideEffects: id => {
          return id.includes('bootstrap/dist/js/bootstrap.bundle');
        }
      },
      // Remove o pacote do bundle
      // external: ['leaflet'],
    }
  },
  resolve: {
    alias: {
      react: 'react',
      'react-dom': 'react-dom',
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
})
