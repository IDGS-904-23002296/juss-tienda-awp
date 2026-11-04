import React from "react";
import Header from "./components/Header";
import Abarrotes from "./components/Abarrotes";
import PWABadge from "./PWABadge.jsx";
import "./App.css";

function App() {
  return (
    <div className="container mt-4">
      <Header tituloPrincipal="La Tiendilla de Abarrotes" />
      <Abarrotes />
      <PWABadge />
    </div>
  );
}

export default App;