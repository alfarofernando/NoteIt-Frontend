import React from 'react';

const HamburgerMenu = ({ onClick }) => (
    <button
        onClick={onClick}
        className="text-white flex flex-col space-y-1"
    >
        <span className="block w-6 h-0.5 bg-white"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
    </button>
);

export default HamburgerMenu;
