import { useState } from 'react';
import { URL_PROD, URL_PROD } from '../config/UrlBackend';


const useCreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryNames, setCategoryNames] = useState([]);
  const [tagNames, setTagNames] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e, userId) => {
    e.preventDefault();

    const noteData = {
      title,
      content,
      userId,
      categoryNames, // Pasamos las categorías al backend
      tagNames, // Pasamos las etiquetas al backend
    };

    setLoading(true);
    try {
      // Enviar todo a la misma ruta de la API para crear la nota, categorías y etiquetas
      const response = await fetch(`${URL_PROD}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess('Note created successfully');
        setTitle('');
        setContent('');
        setCategoryNames([]);
        setTagNames([]);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create note');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    categoryNames,
    setCategoryNames,
    tagNames,
    setTagNames,
    error,
    success,
    loading,
    handleSubmit,
  };
};

export default useCreateNote;
