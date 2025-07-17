import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga las variables de entorno desde el archivo .env correspondiente al modo
  const env = loadEnv(mode, process.cwd(), '');

  return {  // Asegúrate de devolver el objeto de configuración
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@layout': path.resolve(__dirname, './src/layout'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@context': path.resolve(__dirname, './src/context'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@assets': path.resolve(__dirname, './src/assets'),
      },
    },
    server: {
      proxy: {
        '/auth': {
          target: env.VITE_API_URL,
          rewrite: (path) => path.replace(/^\/auth/, '/auth'),
          changeOrigin: true,
          secure: true,
        },
        '/user': {
          target: env.VITE_API_URL,
          rewrite: (path) => path.replace(/^\/user/, '/user'),  // Asegúrate de corregir esto
          changeOrigin: true,
          secure: true,
        },
        '/institucion': {
          target: env.VITE_API_URL,
          rewrite: (path) => path.replace(/^\/institucion/, '/institucion'),  // Asegúrate de corregir esto
          changeOrigin: true,
          secure: true,
          ws: true,
        }
      }
    }
  };
});
