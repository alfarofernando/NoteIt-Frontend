import React from 'react';

const AuthButton = ({ onClick }) => (
    <button
        onClick={onClick}
        className="ml-4 hover:text-gray-500 transition duration-300 hover:scale-110"
    >
        Login
    </button>
);

export default AuthButton;
