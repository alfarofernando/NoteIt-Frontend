import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AuthModal = ({ isLogin, setIsLogin, login, register, closeModal, errorMessage, successMessage }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');

    const handleRegisterClick = async () => {
        if (!name || !email || !password) {
            setFormError("Todos los campos son obligatorios");
            return;
        }
        setFormError('');
        await register(name, email, password);
    };

    const handleLoginClick = async () => {
        if (!email || !password) {
            setFormError("Todos los campos son obligatorios");
            return;
        }
        setFormError('');
        await login(email, password);
    };

    const cleanFields = () => {
        setName('');
        setEmail('');
        setPassword('');
        setFormError('');
    };

    const handleClose = () => {
        cleanFields();
        closeModal();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold text-center mb-4">
                    {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                </h2>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="space-y-4"
                >
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    {formError && (
                        <p className="text-red-500 text-sm">{formError}</p>
                    )}
                    {errorMessage && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}
                    {successMessage && (
                        <p className="text-green-500 text-sm">{successMessage}</p>
                    )}
                    <button
                        type="button"
                        onClick={isLogin ? handleLoginClick : handleRegisterClick}
                        className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600 transition duration-300"
                    >
                        {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                    </button>
                </form>
                <div className="text-center mt-4">
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm text-blue-500 hover:underline"
                    >
                        {isLogin
                            ? '¿No tienes una cuenta? Regístrate'
                            : '¿Ya tienes una cuenta? Inicia Sesión'}
                    </button>
                </div>
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                    &times;
                </button>
            </motion.div>
        </div>
    );
};

export default AuthModal;
