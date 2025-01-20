import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useDeleteNote from '../hooks/useDeleteNote';
import useToggleArchiveNote from '../hooks/useToggleArchiveNote';

const NoteDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { note: initialNote } = location.state || {};

  const [note, setNote] = useState(initialNote); // Estado local para manejar la nota
  const { deleteNote, loading: deleteLoading, error: deleteError, successMessage: deleteSuccessMessage } = useDeleteNote();
  const { toggleArchiveNote, loading: archiveLoading, error: archiveError, successMessage: archiveSuccessMessage } = useToggleArchiveNote();

  useEffect(() => {
    if (!initialNote) return;
    setNote(initialNote); // Establecer la nota al cargar el componente o cuando cambie
  }, [initialNote]);

  if (!note) {
    return <div>No note selected</div>;
  }

  // Extraer categorías y tags
  const categories = note.categories && note.categories.length > 0
    ? note.categories.map((category) => category.name).join(', ')
    : null;

  const tags = note.tags && note.tags.length > 0
    ? note.tags.map((tag) => tag.name).join(', ')
    : null;


  const handleDelete = async () => {
    const userId = note.userId; // Asegúrate de que `note` contiene el userId
    await deleteNote(note.id, userId);

    // Si no hay error, navega hacia atrás
    if (!deleteError) {
      navigate(-1);
    }
  };

  const handleArchive = async () => {
    await toggleArchiveNote(note.id, (updatedNote) => {
      setNote((prevNote) => ({
        ...prevNote,
        archived: updatedNote.archived, // solo actualizas el estado de 'archived' por ejemplo
        categories: prevNote.categories,  // mantienes las categorías existentes
        tags: prevNote.tags,  // mantienes las etiquetas existentes
      }));
    });
  };

  const handleUpdate = () => {
    navigate(`/update-note/${note.id}`, { state: { noteId: note.id, note } });
  };

  return (
    <div className="flex justify-center m-4 p-4">
      <div className="flex flex-col p-6 w-[90%] max-w-3xl items-center bg-gray-200 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
        <p className="text-xl mb-8">{note.content}</p>

        {/* Mostrar las categorías */}
        {categories ? (
          <p className="text-sm text-gray-600 mt-2">
            <strong>Categories:</strong> {categories}
          </p>
        ) : (
          <p className="text-sm text-gray-600 mt-2 ">No categories available</p>
        )}

        {/* Mostrar los tags */}
        {tags ? (
          <p className="text-sm text-gray-600 mt-1">
            <strong>Tags:</strong> {tags}
          </p>
        ) : (
          <p className="text-sm text-gray-600 mt-1 ">No tags available</p>
        )}

        {/* Botones de acción */}
        <div className="flex text-lg space-x-4 mt-4">
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
          >
            Update
          </button>
          <button
            onClick={handleArchive}
            disabled={archiveLoading} // Deshabilitar mientras se carga
            className={`px-6 py-2 ${archiveLoading
              ? 'bg-yellow-300'
              : note.archived
                ? 'bg-gray-500 hover:bg-gray-600'
                : 'bg-yellow-500 hover:bg-yellow-600'
              } text-white rounded-lg shadow transition-colors`}
          >
            {archiveLoading ? 'Archiving...' : note.archived ? 'Unarchive' : 'Archive'}
          </button>

          <button
            onClick={handleDelete}
            disabled={deleteLoading}
            className={`px-6 py-2 text-white rounded-lg shadow transition-colors ${deleteLoading ? 'bg-red-300' : 'bg-red-500 hover:bg-red-600'
              }`}
          >
            {deleteLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>

        {/* Mensajes de éxito o error */}
        {deleteSuccessMessage && (
          <p className="mt-4 text-green-600 font-semibold">{deleteSuccessMessage}</p>
        )}
        {deleteError && (
          <p className="mt-4 text-red-600 font-semibold">{deleteError}</p>
        )}
        {archiveSuccessMessage && (
          <p className="mt-4 text-green-600 font-semibold">{archiveSuccessMessage}</p>
        )}
        {archiveError && (
          <p className="mt-4 text-red-600 font-semibold">{archiveError}</p>
        )}
      </div>
    </div>
  );
};

export default NoteDetail;
