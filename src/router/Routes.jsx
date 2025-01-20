import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import ActiveNotes from "../pages/ActiveNotes";
import NoteDetail from "../pages/NoteDetails";
import ArchivedNotes from "../pages/ArchivedNotes";
import CreateNote from "../pages/CreateNote";
import UpdateNote from "../pages/UpdateNote";
import ProfilePage from "../pages/ProfilePage";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "./ProtectedRoutes";
import { AuthContext } from "../contexts/AuthContext"; // Asume que tienes un contexto de autenticación

const Router = () => {
  const { user } = useContext(AuthContext); // Obtén el estado de autenticación

  const isAuthenticated = !!user; // Si hay un usuario, está autenticado

  return (
    <Routes>
      {/* Rutas accesibles para todos */}
      <Route path="/" element={<HomePage />} />

      {/* Rutas protegidas */}
      <Route
        path="/note/:id"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <NoteDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/active-notes"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ActiveNotes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/archived-notes"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ArchivedNotes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-note"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <CreateNote />
          </ProtectedRoute>
        }
      />
      <Route
        path="/update-note/:id"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <UpdateNote />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile-page"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Router;
