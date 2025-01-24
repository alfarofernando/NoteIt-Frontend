import React from 'react';
import { Link } from 'react-router-dom';
import noteItLogo from "../../assets/images/noteItLogo.webp";

const Logo = () => (
    <Link to="/" className="hover:opacity-80 hover:scale-110 transition duration-300">
        <img
            src={noteItLogo}
            alt="Logo"
            className="w-16 h-16 md:w-20 md:h-20"
        />
    </Link>
);

export default Logo;
