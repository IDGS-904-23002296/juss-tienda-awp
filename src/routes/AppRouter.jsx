import React, { useContext } from "react";
import { UsuarioContext } from "../contexts/UsuarioContext";
import LoginPage from "../pages/LoginPage";
import AbarrotesPage from "../pages/AbarrotesPage";

const AppRouter = () => {
    const { autenticado, setAutenticado } = useContext(UsuarioContext);

    const handleLogout = () => {
        localStorage.removeItem("sesion");
        setAutenticado(false);
    };

    return (
        <div>
            {autenticado && (
                <nav className="navbar navbar-light bg-light shadow-sm px-4 mb-3 d-flex justify-content-end">
                    <button onClick={handleLogout} className="btn btn-outline-danger btn-sm fw-bold">
                        Cerrar Sesión 🚪
                    </button>
                </nav>
            )}

            {autenticado ? <AbarrotesPage /> : <LoginPage />}
        </div>
    );
};

export default AppRouter;