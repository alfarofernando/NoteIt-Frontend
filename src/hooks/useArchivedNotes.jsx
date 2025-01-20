import { useState, useEffect } from 'react';
import axios from 'axios';

const useArchivedNotes = (userId) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArchivedNotes = async () => {
            if (!userId) return; // Verifica si hay un userId antes de hacer la solicitud

            setLoading(true);
            try {
                // Aquí pasamos el userId como parámetro de consulta
                const response = await axios.get(`https://ancient-sierra-88614-5721e3ef19cd.herokuapp.com//notes/archived?userId=${userId}`);
                setNotes(response.data);
            } catch (err) {
                setError('Error al obtener notas archivadas');
            } finally {
                setLoading(false);
            }
        };

        fetchArchivedNotes();
    }, [userId]); // Vuelve a ejecutar el efecto cuando el userId cambie

    return { notes, loading, error };
};

export default useArchivedNotes;
