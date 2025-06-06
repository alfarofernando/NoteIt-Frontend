import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useCreateNote from '../hooks/useCreateNote';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {
  const { handleSubmit, title, setTitle, content, setContent, categoryNames, setCategoryNames, tagNames, setTagNames, loading, error, success } = useCreateNote();
  const [categoryName, setCategoryName] = useState('');
  const [tagName, setTagName] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddCategory = () => {
    if (categoryName && !categories.includes(categoryName)) {
      setCategories((prev) => [...prev, categoryName]);
      setCategoryNames((prev) => [...prev, categoryName]);
      setCategoryName('');
    }
  };

  const handleAddTag = () => {
    if (tagName && !tags.includes(tagName)) {
      setTags((prev) => [...prev, tagName]);
      setTagNames((prev) => [...prev, tagName]);
      setTagName('');
    }
  };

  const handleRemoveCategory = (category) => {
    setCategories(categories.filter((cat) => cat !== category));
    setCategoryNames(categoryNames.filter((name) => name !== category));
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
    setTagNames(tagNames.filter((name) => name !== tag));
  };

  if (!user || !user.id) {
    return <div>You need to be logged in to create a note.</div>;
  }

  return (
    <div className="flex justify-center m-4 p-4">
      <div className="flex flex-col p-6 w-[90%] max-w-3xl items-center bg-gray-200 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Create a New Note</h1>
        <form onSubmit={(e) => handleSubmit(e, user.id)} className="space-y-4 w-full">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-lg font-medium text-gray-700">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Add Category */}
          <div>
            <label htmlFor="category" className="block text-lg font-medium text-gray-700">
              Add Category
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="category"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
          </div>

          {/* Add Tag */}
          <div>
            <label htmlFor="tag" className="block text-lg font-medium text-gray-700">
              Add Tag
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="tag"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
          </div>

          {/* Selected Categories */}
          <div>
            <h3 className="mt-4 text-lg font-medium text-gray-700">Selected Categories:</h3>
            <ul className="list-disc pl-5">
              {categories.map((category, index) => (
                <li key={index} className="flex justify-between items-center">
                  {category}
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(category)}
                    className="ml-2 text-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Selected Tags */}
          <div>
            <h3 className="mt-4 text-lg font-medium text-gray-700">Selected Tags:</h3>
            <ul className="list-disc pl-5">
              {tags.map((tag, index) => (
                <li key={index} className="flex justify-between items-center">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Note'}
            </button>
          </div>
        </form>
        {error && <div className="mt-4 text-red-600">{error}</div>}
        {success && <div className="mt-4 text-green-600">{success}</div>}
        {success && navigate("/active-notes")}
      </div>
    </div>
  );
};

export default CreateNote;
