import { useState } from 'react';
import axios from 'axios';
import { URL_PROD, URL_DEV } from '../config/UrlBackend';

const useUpdateProfile = (user) => {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setLoading(true);

        if (formData.newPassword !== formData.confirmPassword) {
            setFormError('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.put(
                `${URL_DEV}/user/update`,
                {
                    name: formData.name,
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                },
                {
                    headers: { Authorization: `Bearer ${user.token}` }
                }
            );
            alert('Perfil actualizado con éxito');
            setFormData({
                ...formData,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (err) {
            console.error(err);
            setFormError('Error al actualizar el perfil');
        } finally {
            setLoading(false);
        }
    };

    return { formData, formError, loading, handleChange, handleSubmit };
};

export default useUpdateProfile;
