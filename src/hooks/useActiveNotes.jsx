import { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_PROD, URL_DEV } from '../config/UrlBackend';


const useActiveNotes = (userId) => {
  const [notes, setNotes] = useState([]); // Estado para las notas activas
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchActiveNotes = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${URL_DEV}/notes/active`, {
          params: { userId: userId },
        });


        if (response.data && Array.isArray(response.data)) {
          if (response.data.length === 0) {
            setNotes([]);
          } else {
            setNotes(response.data);
          }
        } else {
          setError('No se recibieron datos válidos.');
        }
      } catch (err) {
        console.error('Error al obtener notas activas:', err);
        setError('Error al obtener notas activas');
      } finally {
        setLoading(false);
      }
    };

    fetchActiveNotes();
  }, [userId]);

  return { notes, loading, error };
};

export default useActiveNotes;
