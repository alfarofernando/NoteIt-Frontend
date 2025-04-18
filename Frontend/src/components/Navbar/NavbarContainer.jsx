import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AuthModal from '../AuthModal/AuthModalContainer';
import Logo from './Logo';
import MenuLinks from './MenuLinks';
import AuthButton from './AuthButton';
import HamburgerMenu from './HamburgerMenu';
import DropdownMenu from './DropdownMenu';
import navbarLg from "../../assets/images/navbarLg.webp";

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleShowModal = () => {
        document.body.style.overflow = "hidden"; // Bloquea el scroll
        setShowModal(true);
    };

    const handleCloseModal = () => {
        document.body.style.overflow = "auto"; // Restaura el scroll
        setShowModal(false);
    };

    return (
        <nav className="flex justify-between items-center px-10 py-1 overflow-hidden">
            <Logo />

            <div
                className="text-gray-800 text-2xl items-center space-x-4 p-4 bg-cover"
                style={{
                    backgroundImage: `url(${navbarLg})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {user ? (
                    <MenuLinks />
                ) : (
                    <AuthButton onClick={handleShowModal} />
                )}
            </div>

            {user && (
                <>
                    {/* Mostrar el HamburgerMenu solo en pantallas pequeñas y si el usuario está logueado */}
                    <div className="md:hidden">
                        <HamburgerMenu onClick={() => setIsMenuOpen(!isMenuOpen)} />
                    </div>

                    <DropdownMenu
                        isOpen={isMenuOpen}
                        onClose={() => setIsMenuOpen(false)}
                        user={user}
                        onLoginClick={handleShowModal}
                    />
                </>
            )}

            {showModal &&
                ReactDOM.createPortal(
                    <AuthModal
                        isLogin={isLogin}
                        setIsLogin={setIsLogin}
                        closeModal={handleCloseModal}
                    />,
                    document.body // Renderiza fuera del DOM principal
                )}
        </nav>
    );
};

export default Navbar;
