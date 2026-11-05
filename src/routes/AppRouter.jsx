import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UsuarioContext } from "../contexts/UsuarioContext";
import LoginPage from "../pages/LoginPage";
import AbarrotesPage from "../pages/AbarrotesPage";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
    const { autenticado, setAutenticado } = useContext(UsuarioContext);

    const handleLogout = () => {
        localStorage.removeItem("sesion");
        setAutenticado(false);
    };

    return (
        <BrowserRouter>
            {autenticado && (
                <nav className="navbar navbar-light bg-light shadow-sm px-4 mb-3 d-flex justify-content-end">
                    <button onClick={handleLogout} className="btn btn-outline-danger btn-sm fw-bold">
                        Cerrar Sesión 🚪
                    </button>
                </nav>
            )}

            <Routes>
                <Route path="/" element={autenticado ? <AbarrotesPage /> : <LoginPage />}/>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;