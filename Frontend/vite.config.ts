import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:8800',
        rewrite: (path) => path.replace(/^\/auth/, '/auth'),
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/user': {
        target: 'http://localhost:8800',
        rewrite: (path) => path.replace(/^\/auth/, '/user'),
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/institucion': {
        target: 'http://localhost:8800',
        rewrite: (path) => path.replace(/^\/auth/, '/institucion'),
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
})
