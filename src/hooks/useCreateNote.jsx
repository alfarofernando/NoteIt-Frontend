import { useState } from 'react';

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
      const response = await fetch('https://ancient-sierra-88614-5721e3ef19cd.herokuapp.com/notes', {
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
