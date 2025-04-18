import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
        // Si no está autenticado, redirige al HomePage
        return <Navigate to="/" />;
    }

    // Si está autenticado, renderiza el contenido de la ruta protegida
    return children;
};

export default ProtectedRoute;
