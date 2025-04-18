import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { URL_PROD } from '../config/UrlBackend';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Recargar el usuario de localStorage al iniciar
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const register = async (name, email, password) => {
        setError(null);
        try {
            const response = await axios.post(
                `${URL_PROD}/user/register`,
                { name, email, password }
            );
            if (response.status === 201) {
                setUser(response.data.user);
                return '¡Registro exitoso!';
            }
        } catch (err) {
            setError('Error al registrar: ' + (err.response?.data?.message || err.message));
            return null;
        }
    };


    const login = async (email, password) => {
        try {
            const response = await axios.post(`${URL_PROD}/login`, { email, password });
            if (response.data && response.data.user) {
                const { user } = response.data;
                setUser(user);
                // Guardamos el usuario en localStorage para persistencia
                localStorage.setItem('user', JSON.stringify(user));
                return user;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error de inicio de sesión:", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        // Limpiamos el usuario de localStorage al cerrar sesión
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, register, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
