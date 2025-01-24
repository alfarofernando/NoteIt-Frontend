import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useUpdateUser from "../hooks/useUpdateUser";
import { quotes } from "../assets/quotes";
import zxcvbn from "zxcvbn"; // Importamos zxcvbn

const ProfilePage = () => {
    const { user, loading, logout, setUser } = useContext(AuthContext);
    const { isLoading, error, success, updateUser } = useUpdateUser();

    const [formData, setFormData] = React.useState({
        id: user?.id || "",
        name: user?.name || "",
        email: user?.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [passwordStrength, setPasswordStrength] = React.useState(0); // Estado para la fortaleza de la contraseña

    if (loading) return <p>Cargando...</p>;
    if (!user) return <p>No se ha encontrado el usuario</p>;

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Si estamos editando la nueva contraseña, actualizamos la fuerza
        if (name === "newPassword") {
            const strength = zxcvbn(value).score; // Calculamos la fortaleza
            setPasswordStrength(strength); // Actualizamos el estado
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            alert("La nueva contraseña y su confirmación no coinciden.");
            return;
        }

        const payload = {
            id: formData.id,
            name: formData.name,
            email: formData.email,
            password: formData.newPassword || undefined,
        };
        await updateUser(payload, setUser); // Aquí pasamos setUser para actualizar el estado

        if (success) {
            alert("Perfil actualizado con éxito.");
            setFormData((prev) => ({
                ...prev,
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            }));
            window.location.reload();
        }
    };

    const getStrengthLabel = () => {
        switch (passwordStrength) {
            case 0:
                return "Muy débil";
            case 1:
                return "Débil";
            case 2:
                return "Moderada";
            case 3:
                return "Fuerte";
            case 4:
                return "Muy fuerte";
            default:
                return "";
        }
    };

    return (
        <>
            <div className="bg-gray-300 max-w-2xl mx-auto p-6 w-[95%] border rounded-lg shadow-lg shadow-black transition duration-500 hover:scale-125 my-4">
                <h2 className="text-2xl font-semibold text-center mb-4">Quote of the Day</h2>
                <p className="text-center text-lg italic mb-6">{randomQuote}</p>
            </div>
            <div className="max-w-md mx-auto mb-2 p-6 border w-[95%] rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-4">Profile</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">Profile updated succesfully</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Sección: Nombre */}
                    <section>
                        <h3 className="text-xl font-medium text-gray-700 mb-2">Username</h3>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </section>

                    {/* Sección: Correo Electrónico */}
                    <section>
                        <h3 className="text-xl font-medium text-gray-700 mb-2">Email</h3>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </section>

                    {/* Sección: Contraseña */}
                    <section>
                        <h3 className="text-xl font-medium text-gray-700 mb-2">Password</h3>
                        <div className="space-y-4">
                            <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                placeholder="Actual password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            {/* Leyenda explicativa para una contraseña fuerte */}
                            <p className="text-sm text-gray-600">
                                Password must contain at least 8 characters. one lowcase letter, one uppercase letter, one number and one simbol !@#$%^&*()_-=+{ }[]:|\;"'<>,.?/</>
                            </p>
                            {/* Medidor de contraseña */}
                            <div className="flex justify-between">
                                <span className="text-sm">{getStrengthLabel()}</span>
                                <span className={`text-sm ${passwordStrength < 2 ? 'text-red-500' : 'text-green-500'}`}>
                                    {getStrengthLabel()}
                                </span>
                            </div>

                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="New password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />


                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm new password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />

                        </div>
                    </section>

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        disabled={isLoading}
                    >
                        {isLoading ? "Updating..." : "Update Profile"}
                    </button>
                </form>

                <button
                    onClick={logout}
                    className="w-full mt-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                    Close Session
                </button>
            </div>
        </>
    );
};

export default ProfilePage;
