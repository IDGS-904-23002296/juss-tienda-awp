import React, { useState, useEffect } from "react";
import { UsuarioContext } from "./contexts/UsuarioContext";
import AppRouter from "./routes/AppRouter";
import "./App.css";

function App() {
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const sesion = localStorage.getItem("sesion");
    if (sesion) {
      setAutenticado(true);
    }
  }, []);

  return (
    <UsuarioContext.Provider value={{ autenticado, setAutenticado }}>
      <AppRouter />
    </UsuarioContext.Provider>
  );
}

export default App;