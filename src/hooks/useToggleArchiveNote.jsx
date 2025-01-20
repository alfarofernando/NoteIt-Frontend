import { useState } from 'react';
import axios from 'axios';

const useToggleArchiveNote = () => {
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const [successMessage, setSuccessMessage] = useState(null); // Mensaje de éxito

  const toggleArchiveNote = async (id, setNote) => {
    setLoading(true); // Inicia el estado de carga
    setError(null); // Resetea el estado de error
    setSuccessMessage(null); // Resetea el mensaje de éxito

    try {
      // Realiza la solicitud PUT para alternar el estado archivado
      const response = await axios.put(`https://ancient-sierra-88614-5721e3ef19cd.herokuapp.com/notes/${id}/archive`);

      if (response.status === 200 && response.data?.note) {
        // Si la respuesta es correcta, actualiza el estado en el componente
        setNote(response.data.note); // Actualiza el estado de la nota
        setSuccessMessage('Estado de archivado actualizado correctamente');
        console.log(`Estado de archivado para la nota con ID ${id} actualizado exitosamente`);
      } else {
        setError('No se pudo actualizar el estado de archivado. Intenta nuevamente.');
        console.error('Respuesta inesperada del servidor:', response);
      }
    } catch (err) {
      setError('Error al alternar el estado de archivado');
      console.error('Error al alternar el estado de archivado:', err);
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  return { toggleArchiveNote, loading, error, successMessage };
};

export default useToggleArchiveNote;
