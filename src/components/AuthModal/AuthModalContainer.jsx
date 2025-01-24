import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../contexts/AuthContext';
import AuthHeader from './AuthHeader';
import AuthForm from './AuthForm';
import loginBgImage from "../../assets/images/loginBgImage.webp";

const AuthModal = ({ isLogin, setIsLogin, closeModal }) => {
    const { login, register } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);

    console.log(name, email, password);

    const handleRegisterClick = async () => {
        if (!name || !email || !password) {
            setFormError("Todos los campos son obligatorios");
            return;
        }
        try {
            const message = await register(name, email, password);
            setSuccessMessage(message);
            setTimeout(closeModal, 2000); // Cierra el modal tras 2 segundos
        } catch (err) {
            setErrorMessage(err.message || 'Error al registrar');
        }
    };

    const handleLoginClick = async () => {
        if (!email || !password) {
            setFormError("Todos los campos son obligatorios");
            return;
        }
        try {
            await login(email, password);
            setSuccessMessage('Inicio de sesión exitoso');
            setTimeout(closeModal, 2000);
        } catch (err) {
            setErrorMessage('Error al iniciar sesión');
        }
    };

    const handlePasswordChange = async (e) => {
        const value = e.target.value;
        setPassword(value);

        const zxcvbn = (await import('zxcvbn')).default;
        const strength = zxcvbn(value).score;
        setPasswordStrength(strength);
    };

    const handleClose = () => {
        setName('');
        setEmail('');
        setPassword('');
        setFormError('');
        setErrorMessage('');
        setSuccessMessage('');
        setPasswordStrength(0);
        closeModal();
    };

    return (
        <>
            <div className="absolute inset-0 bg-black bg-opacity-50 z-40"></div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    duration: 0.3, // Animación más corta para menor carga
                    ease: "ease-in-out", // Transición estándar y ligera
                }}
                className="relative z-50 rounded-lg"
            >


                <div
                    className="fixed inset-0 flex items-center justify-center pr-3 z-50 brightness-[0.85]"
                    style={{
                        backgroundImage: `url(${loginBgImage})`,
                        backgroundSize: '70% 80%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className="bg-[#ebc884] rounded-lg w-6/12">
                        <AuthHeader isLogin={isLogin} handleClose={handleClose} />
                        <AuthForm
                            isLogin={isLogin}
                            name={name}
                            setName={setName}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            passwordStrength={passwordStrength}
                            handlePasswordChange={handlePasswordChange}
                            formError={formError}
                            errorMessage={errorMessage}
                            successMessage={successMessage}
                            handleActionClick={isLogin ? handleLoginClick : handleRegisterClick}
                        />
                        <div className="text-center mt-1">
                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-sm md:text-md lg:text-lg xl:text-xl text-blue-700 semibold hover:underline"
                            >
                                {isLogin
                                    ? '¿No tienes una cuenta? Regístrate'
                                    : '¿Ya tienes una cuenta? Inicia Sesión'}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default AuthModal;
