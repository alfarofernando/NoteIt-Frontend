import React, { useEffect } from 'react';

const NoteCard = ({ note, onClick }) => {
  useEffect(() => {
  }, [note]);

  if (!note) return null;

  // Extraer categorías y tags
  const categories = note.categories && note.categories.length > 0
    ? note.categories.map((category) => category.name).join(', ')
    : null;

  const tags = note.tags && note.tags.length > 0
    ? note.tags.map((tag) => tag.name).join(', ')
    : null;

  return (
    <div
      onClick={onClick}
      className={`p-5 text-left max-w-lg max-h-md border rounded-xl shadow-lg cursor-pointer transition-transform transform hover:scale-105 ${note.archived ? 'bg-gray-200' : 'bg-white'}`}
    >
      <h2 className=" text-2xl font-bold truncate">{note.title}</h2>

      {/* Mostrar las categorías */}
      {categories ? (
        <p className="text-sm text-gray-600 mt-2 truncate">
          <strong>Cats:</strong> {categories}
        </p>
      ) : (
        <p className="text-sm text-gray-600 mt-2 ">No categories available</p>
      )}

      {/* Mostrar los tags */}
      {tags ? (
        <p className="text-sm text-gray-600 mt-1 truncate" >
          <strong>Tags:</strong> {tags}
        </p>
      ) : (
        <p className="text-sm text-gray-600 mt-1 truncate">No tags available</p>
      )}

      {/* Si la nota está archivada, mostrar el estado */}
      {note.archived && <span className="text-sm text-gray-500 mt-2">Archived</span>}
    </div>
  );
};

export default NoteCard;
