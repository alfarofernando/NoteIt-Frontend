import React, { useContext, useState, useMemo } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useArchivedNotes from '../hooks/useArchivedNotes';
import { useNavigate } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import { motion, AnimatePresence } from 'framer-motion';
import Select from 'react-select';
import { ClipLoader } from 'react-spinners';


const ArchivedNotes = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { notes, loading, error } = useArchivedNotes(user?.id);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const orderOptions = [
        { label: 'Newest', value: 'newest' },
        { label: 'Oldest', value: 'oldest' },
    ];

    // Filtrado de notas
    const filteredNotes = useMemo(() => {
        let notesToDisplay = [...notes];

        if (searchTerm) {
            notesToDisplay = notesToDisplay.filter((note) =>
                note.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedTag?.value) {
            notesToDisplay = notesToDisplay.filter((note) =>
                note.tags.some((tag) => tag.id === selectedTag.value)
            );
        }

        if (selectedCategory?.value) {
            notesToDisplay = notesToDisplay.filter((note) =>
                note.categories.some((category) => category.id === selectedCategory.value)
            );
        }

        if (selectedOrder) {
            notesToDisplay.sort((a, b) => {
                const dateA = a.updatedAt ? new Date(a.updatedAt) : new Date(0);
                const dateB = b.updatedAt ? new Date(b.updatedAt) : new Date(0);

                return selectedOrder.value === 'newest' ? dateB - dateA : dateA - dateB;
            });
        }

        return notesToDisplay;
    }, [notes, searchTerm, selectedTag, selectedCategory, selectedOrder]);

    const handleNoteClick = (note) => {
        navigate(`/note/${note.id}`, { state: { note } });
    };

    const tagOptions = notes
        .map((note) => note.tags)
        .flat()
        .filter((tag, index, self) => self.findIndex((t) => t.id === tag.id) === index)
        .map((tag) => ({ label: tag.name, value: tag.id }));

    const categoryOptions = notes
        .map((note) => note.categories)
        .flat()
        .filter((category, index, self) => self.findIndex((c) => c.id === category.id) === index)
        .map((category) => ({ label: category.name, value: category.id }));

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader size={50} color="#0000ff" loading={loading} />
            </div>
        );
    } if (error) return <div className="text-center text-lg text-red-500">{error}</div>;

    return (
        <div className="archived-notes p-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8 space-x-4">
                <h1 className="text-4xl font-semibold text-center text-gray-800 flex-grow">Archived Notes</h1>
                <button
                    className="md:hidden p-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-800"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    Search
                </button>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-8 md:hidden bg-gray-100 p-4 rounded-lg shadow-md"
                    >
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by name"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Select
                                options={[{ label: 'All Categories', value: null }, ...categoryOptions]}
                                value={selectedCategory}
                                onChange={setSelectedCategory}
                                placeholder="Filter by category"
                                className="react-select-container"
                            />
                            <Select
                                options={[{ label: 'All Tags', value: null }, ...tagOptions]}
                                value={selectedTag}
                                onChange={setSelectedTag}
                                placeholder="Filter by tag"
                                className="react-select-container"
                            />
                            <Select
                                options={orderOptions}
                                value={selectedOrder}
                                onChange={setSelectedOrder}
                                placeholder="Order by"
                                className="react-select-container"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="hidden md:flex justify-between mb-8 space-x-4">
                <div className="w-1/4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="w-1/4">
                    <Select
                        options={[{ label: 'All Categories', value: null }, ...categoryOptions]}
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        placeholder="Filter by category"
                        className="react-select-container"
                    />
                </div>
                <div className="w-1/4">
                    <Select
                        options={[{ label: 'All Tags', value: null }, ...tagOptions]}
                        value={selectedTag}
                        onChange={setSelectedTag}
                        placeholder="Filter by tag"
                        className="react-select-container"
                    />
                </div>
                <div className="w-1/4">
                    <Select
                        options={orderOptions}
                        value={selectedOrder}
                        onChange={setSelectedOrder}
                        placeholder="Order by"
                        className="react-select-container"
                    />
                </div>
            </div>

            {filteredNotes.length === 0 ? (
                <p className="text-center text-lg text-gray-600">You don't have any archived notes yet.</p>
            ) : (
                <div className="notes-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredNotes.map((note) => (
                            <motion.div
                                key={note.id}
                                className="note-card cursor-pointer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => handleNoteClick(note)}
                            >
                                <NoteCard note={note} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default ArchivedNotes;
