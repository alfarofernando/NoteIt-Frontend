import React, { useEffect } from 'react';
import noteBg from '../assets/images/noteBackground.webp';

const NoteCard = ({ note, onClick }) => {
  useEffect(() => { }, [note]);

  if (!note) return null;

  // Extraer categorías y tags
  const categories =
    note.categories && note.categories.length > 0
      ? note.categories.map((category) => category.name).join(', ')
      : null;

  const tags =
    note.tags && note.tags.length > 0
      ? note.tags.map((tag) => tag.name).join(', ')
      : null;

  return (
    <div
      onClick={onClick}
      className="w-full max-w-[350px] h-[360px] rounded-xl cursor-pointer transition-transform transform hover:scale-105 bg-cover bg-center p-10"
      style={{
        backgroundImage: `url(${noteBg})`,
      }}
    >
      <h2 className="text-2xl font-bold truncate text-gray-800 my-4">{note.title}</h2>
      <p className="line-clamp-5 text-gray-800">{note.content}</p>
      {/* Mostrar las categorías */}
      <div className="absolute bottom-10">
        {categories ? (
          <p className="text-sm text-gray-800 my-2 line-clamp-2">
            {categories}
          </p>
        ) : (
          <p className="text-sm text-gray-800 mt-2 ">No categories available</p>
        )}

        {/* Mostrar los tags */}
        {tags ? (
          <p className="text-sm text-gray-800 my-4 line-clamp-2">
            {tags}
          </p>
        ) : (
          <p className="text-sm text-gray-800 mt-1 truncate">No tags available</p>
        )}

        {/* Si la nota está archivada, mostrar el estado */}
        {note.archived && <span className="text-md  text-gray-800 mt-4">Archived</span>}
      </div>
    </div>
  );
};

export default NoteCard;
