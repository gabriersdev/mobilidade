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
    include: ['react-bootstrap'],
    // exclude: ['react', 'react-dom'],
  },
  build: {
    minify: false,
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
        },
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
        format: 'es',
      },
      treeshake: {
        moduleSideEffects: false,
      },
    }
  },
  resolve: {
    alias: {
      react: 'react',
      'react-dom': 'react-dom',
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  }
})
