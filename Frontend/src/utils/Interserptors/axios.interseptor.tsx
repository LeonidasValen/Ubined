import axios from 'axios';

// Configura los interceptores
axios.interceptors.response.use(
  (response) => response, // Respuesta exitosa
  (error) => {
    if (error.response?.status === 404) {
      console.warn('Ruta no encontrada, manejando internamente');
      return Promise.reject({ message: 'Ruta no encontrada' }); // Personaliza el mensaje
    }
    return Promise.reject(error); // Rechaza otros errores para manejarlos donde corresponda
  }
);

export default axios;