import React, { useState, useContext } from "react";
import { UsuarioContext } from "../contexts/UsuarioContext";
import { usuarioData } from "../helpers/usuarioData";

const LoginPage = () => {
    const { setAutenticado } = useContext(UsuarioContext);
    const [form, setForm] = useState({ usuario: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setError("");
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const userValid = usuarioData.data;

        if (
            form.usuario === userValid.usuario && 
            form.password === userValid.password && 
            userValid.estado
        ) {
            localStorage.setItem("sesion", JSON.stringify(userValid));
            setAutenticado(true);
        } else {
            setError("Usuario, contraseña incorrectos o cuenta inactiva.");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <div className="card shadow-lg p-4 border-success rounded-4" style={{ width: "400px" }}>
                <h3 className="text-center text-success fw-bold mb-4">🛒 Iniciar Sesión</h3>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Usuario:</label>
                        <input type="text" name="usuario" className="form-control" value={form.usuario} onChange={handleChange} placeholder="usuario" autoComplete="off"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Contraseña:</label>
                        <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} placeholder="contraseña"/>
                    </div>
                    {error && <div className="alert alert-danger py-2 text-center">{error}</div>}
                    <div className="d-grid gap-2 mt-4">
                        <button type="submit" className="btn btn-success fw-bold py-2">
                            Ingresar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;