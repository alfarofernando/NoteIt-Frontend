import { useState, useEffect } from 'react';
import axios from 'axios';

const useUpdateNote = (noteId) => {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const updateNote = async (e, userId) => {
        e.preventDefault();

        try {
            setLoading(true);
            const updatedNote = {
                title,
                content,
                categoryNames, // Ajustado para coincidir con el backend
                tagNames, // Ajustado para coincidir con el backend
                userId,
            };

            await axios.put(`https://ancient-sierra-88614-5721e3ef19cd.herokuapp.com//notes/${noteId}`, updatedNote);
            setSuccess('Note updated successfully');
        } catch (err) {
            setError(err.response?.data?.message || 'Error updating note');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchNote();
    }, [noteId]);

    return { handleSubmit: updateNote, title, setTitle, content, setContent, categoryNames, setCategoryNames, tagNames, setTagNames, loading, error, success };
};

export default useUpdateNote;
