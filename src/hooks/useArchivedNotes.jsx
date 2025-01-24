import { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_PROD, URL_PROD } from '../config/UrlBackend';


const useArchivedNotes = (userId) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArchivedNotes = async () => {
            if (!userId) return; //

            setLoading(true);
            try {
                const response = await axios.get(`${URL_PROD}/notes/archived?userId=${userId}`);
                setNotes(response.data);
            } catch (err) {
                setError('Error al obtener notas archivadas');
            } finally {
                setLoading(false);
            }
        };

        fetchArchivedNotes();
    }, [userId]);

    return { notes, loading, error };
};

export default useArchivedNotes;
