import React from 'react';
import { Link } from 'react-router-dom';

const MenuLinks = () => (
    <div className="space-x-6 hidden md:flex">
        <Link
            to="/active-notes"
            className="hover:text-gray-600 hover:scale-110 transition duration-300"
        >
            Active
        </Link>
        <Link
            to="/archived-notes"
            className="hover:text-gray-600 hover:scale-110 transition duration-300"
        >
            Archived
        </Link>
        <Link
            to="/profile-page"
            className="hover:text-gray-600 hover:scale-110 transition duration-300"
        >
            Profile
        </Link>
    </div>
);

export default MenuLinks;
