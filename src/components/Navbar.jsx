import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Ruta a tu contexto de autenticación
import AuthModal from './AuthModal'; // Importamos el componente AuthModal
import { motion } from 'framer-motion'; // Importamos Framer Motion
import noteItLogo from "../assets/images/noteItLogo.webp";

const Navbar = () => {
    const { user, login, logout, loading, register } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
    const [isLogin, setIsLogin] = useState(true); // Estado para cambiar entre Login y Register
    const [errorMessage, setErrorMessage] = useState(''); // Estado para manejar los errores
    const [successMessage, setSuccessMessage] = useState(''); // Estado para manejar mensajes de éxito
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú hamburguesa

    const cleanFields = () => {
        setErrorMessage(""); // Limpia el mensaje de error
        setSuccessMessage(""); // Limpia el mensaje de éxito
    };

    const handleRegister = async (name, email, password) => {
        setErrorMessage(''); // Limpiar errores previos
        if (!name || !email || !password) {
            setErrorMessage("Todos los campos son obligatorios");
            return;
        }

        try {
            const response = await register(name, email, password); // Usamos la función register desde el contexto
            if (response) {
                setSuccessMessage('Registro exitoso. Bienvenido!');
                setTimeout(() => {
                    setShowModal(false); // Cierra el modal después de mostrar el mensaje
                    cleanFields(); // Limpia los campos después de un registro exitoso
                }, 2000);
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            setErrorMessage('No se pudo registrar correctamente. Intenta nuevamente.');
        }
    };

    const handleLogin = async (email, password) => {
        setErrorMessage(''); // Limpiar errores previos
        if (!email || !password) {
            setErrorMessage("Todos los campos son obligatorios");
            return;
        }

        try {
            const loggedUser = await login(email, password);  // Aquí se realiza el login
            if (loggedUser) {
                setSuccessMessage('Usuario logueado con éxito!');
                setTimeout(() => {
                    setShowModal(false);  // Cierra el modal después de mostrar el mensaje
                    cleanFields();  // Limpia los campos después de un login exitoso
                }, 2000);
            } else {
                setErrorMessage('Credenciales incorrectas');
            }
        } catch (error) {
            setErrorMessage('Error al iniciar sesión. Intenta nuevamente.');
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <>
            <nav className="w-full flex justify-between items-center bg-amber-800 px-10 py-1 shadow-lg">
                <div className="flex items-center">
                    <Link to="/" className="hover:opacity-80 transition duration-300">
                        <img
                            src={noteItLogo} // Aquí defines la ruta de tu imagen
                            alt="Logo"
                            className="w-14 h-14 md:w-16 md:h-16" // Ajusta el tamaño según lo que necesites
                        />
                    </Link>
                </div>

                {/* Menu normal */}
                <div className="text-white text-2xl items-center space-x-6 hidden md:flex">
                    {user ? (
                        <>
                            {/* Enlaces de Active Notes, Archived Notes y Profile */}
                            <div className="flex space-x-6">
                                <Link to="/active-notes" className="hover:text-gray-300 hover:scale-110 transition duration-300">
                                    Active
                                </Link>
                                <Link to="/archived-notes" className="hover:text-gray-300 hover:scale-110 transition duration-300">
                                    Archived
                                </Link>
                                <Link to="/profile-page" className="hover:text-gray-300 hover:scale-110 transition duration-300">
                                    Profile
                                </Link>
                            </div>

                            <button
                                onClick={logout}
                                className="hover:text-gray-300 transition duration-300 hover:scale-110"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setShowModal(true)}
                            className="ml-4 hover:text-gray-300 transition duration-300 hover:scale-110"
                        >
                            Login To Start
                        </button>
                    )}
                </div>

                {/* Menu hamburguesa en pantallas pequeñas */}
                <div className="md:hidden">
                    <motion.button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: isMenuOpen ? 90 : 0 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <span className="block w-6 h-0.5 bg-white mb-1"></span>
                        <span className="block w-6 h-0.5 bg-white mb-1"></span>
                        <span className="block w-6 h-0.5 bg-white"></span>
                    </motion.button>
                </div>
            </nav>

            {/* Menú desplegable */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden fixed top-0 left-0 w-full h-full bg-amber-800 flex flex-col justify-center items-center z-10"
                >
                    <motion.button
                        onClick={() => setIsMenuOpen(false)}
                        className="absolute top-4 right-4 text-white text-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        X
                    </motion.button>
                    {user ? (
                        <>
                            <Link
                                to="/active-notes"
                                className="text-white py-2 px-6 text-lg"
                                onClick={() => setIsMenuOpen(false)} // Cierra el menú al hacer clic
                            >
                                Active
                            </Link>
                            <Link
                                to="/archived-notes"
                                className="text-white py-2 px-6 text-lg"
                                onClick={() => setIsMenuOpen(false)} // Cierra el menú al hacer clic
                            >
                                Archived
                            </Link>
                            <Link
                                to="/profile-page"
                                className="text-white py-2 px-6 text-lg"
                                onClick={() => setIsMenuOpen(false)} // Cierra el menú al hacer clic
                            >
                                Profile
                            </Link>
                            <button
                                onClick={logout}
                                className="text-white py-2 px-6 text-lg"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => { setShowModal(true); setIsMenuOpen(false); }}
                            className="text-white py-2 px-6 text-lg"
                        >
                            Login
                        </button>
                    )}
                </motion.div>
            )}

            {
                showModal && (
                    <AuthModal
                        isLogin={isLogin}
                        setIsLogin={setIsLogin}
                        login={handleLogin}
                        register={handleRegister}
                        closeModal={() => setShowModal(false)}
                        errorMessage={errorMessage}
                        successMessage={successMessage}
                    />
                )
            }
        </>
    );
};

export default Navbar;
