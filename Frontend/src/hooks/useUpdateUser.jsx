// useUpdateUser.js
import { useState } from "react";
import axios from "axios";
import { URL_PROD } from '../config/UrlBackend';

const useUpdateUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const updateUser = async ({ id, name, email, password }, setUser) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        console.log("Actualizando usuario con datos:", { id, name, email, password });

        try {
            const response = await axios.put(`${URL_PROD}/user/update/${id}`, { name, email, password });
            console.log("Respuesta del backend:", response);

            if (response.status === 200) {
                setSuccess(true);

                // Actualizar el contexto con los nuevos datos
                setUser((prevUser) => ({
                    ...prevUser,
                    name,
                    email,
                }));

                // Guardar los datos actualizados en localStorage
                localStorage.setItem('user', JSON.stringify({ ...response.data.user, password: undefined }));

                return response.data;
            }
        } catch (err) {
            console.error("Error al actualizar el usuario:", err);
            if (response.status !== 200) {
                setSuccess(false);
                setError(err.response?.data?.message || "Error al actualizar el usuario.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        error,
        success,
        updateUser,
    };
};

export default useUpdateUser;
