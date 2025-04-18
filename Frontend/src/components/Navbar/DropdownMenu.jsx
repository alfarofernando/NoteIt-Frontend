import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import navbarSm from "../../assets/images/navbarSm.webp";

const DropdownMenu = ({ isOpen, onClose, user, onLoginClick }) => {
    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100%" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            layout
            className="fixed top-6 right-2 px-4 bg-cover flex flex-col z-10"
            style={{
                backgroundImage: `url(${navbarSm})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
            }}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-red-600 text-2xl"
            >
                X
            </button>
            {user ? (
                <>
                    <Link
                        to="/active-notes"
                        className="text-gray-700 py-2 px-6 text-lg"
                        onClick={onClose}
                    >
                        Active
                    </Link>
                    <Link
                        to="/archived-notes"
                        className="text-gray-700 py-2 px-6 text-lg"
                        onClick={onClose}
                    >
                        Archived
                    </Link>
                    <Link
                        to="/profile-page"
                        className="text-gray-700 py-2 px-6 text-lg"
                        onClick={onClose}
                    >
                        Profile
                    </Link>
                </>
            ) : (
                <button
                    onClick={() => { onLoginClick(); onClose(); }}
                    className="text-gray-700 py-2 px-6 text-lg"
                >
                    Login
                </button>
            )}
        </motion.div>
    );
};

export default DropdownMenu;
