import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../contexts/AuthContext';

const AuthModal = ({ isLogin, loading, errorMessage, successMessage, setIsLogin, setShowModal }) => {
    const { register, login, error } = useContext(AuthContext);  // Usamos el contexto aquí
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');
    const [registrationMessage, setRegistrationMessage] = useState('');
    const [isRegistrationError, setIsRegistrationError] = useState(false);

    const cleanFields = () => {
        setName("");
        setEmail("");
        setPassword("");
    };

    const handleRegisterClick = async () => {
        if (!name || !email || !password) {
            setFormError("Todos los campos son obligatorios");
            return;
        }
        setFormError('');
        setRegistrationMessage('');

        try {
            const success = await register(name, email, password);
            if (success) {
                setRegistrationMessage('¡Registro exitoso!');
                setIsRegistrationError(false);
                setTimeout(() => {
                    cleanFields();
                    setShowModal(false);
                }, 1000);
            } else {
                setRegistrationMessage('Hubo un problema con el registro.');
                setIsRegistrationError(true);
            }
        } catch (error) {
            setRegistrationMessage('Error al registrar. Intenta nuevamente.');
            setIsRegistrationError(true);
        }
    };

    const handleLoginClick = async () => {
        if (!email || !password) {
            setFormError("Por favor, rellena todos los campos.");
            return;
        }
        setFormError('');
        await login(email, password);
    };

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="bg-white p-8 rounded-lg w-96 shadow-lg relative"
                initial={{ y: "-50%", opacity: 0 }}
                animate={{ y: "0", opacity: 1 }}
                exit={{ y: "50%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                {registrationMessage ? (
                    <div className={`text-center ${isRegistrationError ? 'text-red-500' : 'text-green-500'}`}>
                        <h2 className="text-2xl font-semibold">{registrationMessage}</h2>
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-4 w-full p-2 bg-amber-800 text-white rounded-md"
                        >
                            Cerrar
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-semibold mb-6 text-center">{isLogin ? 'Login' : 'Register'}</h2>

                        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                        {formError && <div className="text-red-500 mb-4">{formError}</div>}

                        {isLogin ? (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                                <button
                                    onClick={handleLoginClick}
                                    className="w-full p-2 bg-amber-800 text-white rounded-md transition-all duration-200 transform hover:scale-105"
                                    disabled={loading}
                                >
                                    {loading ? 'Cargando...' : 'Iniciar sesión'}
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                                <button
                                    onClick={handleRegisterClick}
                                    className="w-full p-2 bg-amber-800 text-white rounded-md transition-all duration-200 transform hover:scale-105"
                                    disabled={loading}
                                >
                                    {loading ? 'Cargando...' : 'Registrarse'}
                                </button>
                            </>
                        )}

                        <div className="mt-6 text-center">
                            <span>
                                {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes cuenta?"}
                            </span>
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-blue-500 hover:underline ml-2"
                            >
                                {isLogin ? "Registrarse" : "Iniciar sesión"}
                            </button>
                        </div>

                        <motion.button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-gray-500 p-2 hover:bg-gray-200 rounded-full"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <span className="text-2xl">&times;</span>
                        </motion.button>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
};

export default AuthModal;
