import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga las variables de entorno desde el archivo .env correspondiente al modo
  const env = loadEnv(mode, process.cwd(), '');

  return {  // Asegúrate de devolver el objeto de configuración
    plugins: [react()],
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
