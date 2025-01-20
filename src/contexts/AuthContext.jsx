// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (err) {
                console.error("Error al parsear el usuario desde localStorage:", err);
            }
        }
        setLoading(false);
    }, []);

    const register = async (name, email, password) => {
        setError(null);
        try {

            const response = await axios.post(
                'https://ancient-sierra-88614-5721e3ef19cd.herokuapp.com/user/register',
                { name, email, password }
            );
            const { user } = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
        } catch (err) {
            setError('Error al registrar: ' + (err.response?.data?.message || err.message));
        }
    };


    const login = async (email, password) => {
        try {
            const response = await axios.post('https://ancient-sierra-88614-5721e3ef19cd.herokuapp.com/login', { email, password });
            if (response.data && response.data.user) {
                const { user } = response.data;
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
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
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, register, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
