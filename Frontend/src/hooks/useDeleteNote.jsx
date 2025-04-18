import { useState } from 'react';
import axios from 'axios';
import { URL_PROD } from '../config/UrlBackend';


const useDeleteNote = () => {
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const [successMessage, setSuccessMessage] = useState(null); // Mensaje de éxito

  const deleteNote = async (id, userId) => {
    setLoading(true); // Inicia el estado de carga
    setError(null); // Resetea el estado de error
    setSuccessMessage(null); // Resetea el mensaje de éxito

    try {
      // Realiza la solicitud DELETE con el userId en el cuerpo
      const response = await axios.delete(`${URL_PROD}/notes/${id}`, {
        data: { userId },
      });

      if (response.status === 204) {
        setSuccessMessage('Nota eliminada con éxito');
        console.log(`Nota con ID ${id} eliminada exitosamente`);
      } else {
        setError('No se pudo eliminar la nota. Intenta nuevamente.');
        console.error('Respuesta inesperada del servidor:', response);
      }
    } catch (err) {
      // Manejo detallado de errores
      console.error('Error al eliminar la nota:', err);
      setError(err.response?.data?.error || 'Error al eliminar la nota');
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  return { deleteNote, loading, error, successMessage };
};

export default useDeleteNote;
