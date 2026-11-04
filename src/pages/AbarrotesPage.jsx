import React, { useEffect, useReducer, useState } from "react";
import { AbarrotesReducer } from "../reducer/AbarrotesReducer";
import { productosData } from "../helpers/productosData";
import Formulario from "./Formulario";
import ListContainer from "../components/ListContainer";
import Header from "./Header";

const init = () => {
    const storage = localStorage.getItem("abarrotes");
    return storage ? JSON.parse(storage) : productosData.data;
};

const AbarrotesPage = () => {
    const [state, dispatch] = useReducer(AbarrotesReducer, [], init);
    const [cargando, setCargando] = useState(true);
    const [contador, setContador] = useState(3);
    const [formView, setFormView] = useState(false);
    const [productoEditando, setProductoEditando] = useState(null);

    useEffect(() => {
        if (state && state.length > 0) {
            localStorage.setItem("abarrotes", JSON.stringify(state));
        }
    }, [state]);

    useEffect(() => {
        const intervaloId = setInterval(() => {
            setContador((c) => (c > 1 ? c - 1 : (clearInterval(intervaloId), 0)));
        }, 1000);

        const timer = setTimeout(() => setCargando(false), 3000);

        return () => {
            clearInterval(intervaloId);
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="container mt-4">
            <Header tituloPrincipal="Tienda de Abarrotes 'Don Pepe'" />
            
            <div className="mb-4 text-center">
                <button
                    onClick={() => {
                        setFormView(!formView);
                        if (formView) setProductoEditando(null);
                    }}
                    className="btn btn-success shadow-sm fw-bold"
                >
                    {!formView ? "+ Agregar Producto" : "- Cerrar Formulario"}
                </button>
            </div>
            
            {formView && (
                <Formulario 
                    dispatch={dispatch} 
                    productoEditando={productoEditando} 
                    setProductoEditando={setProductoEditando} 
                />
            )}

            {cargando ? (
                <div className="text-center my-5">
                    <h3 className="text-secondary">Cargando catálogo de abarrotes...</h3>
                    <p className="fs-4 fw-bold text-danger">Tiempo restante: {contador} segundos</p>
                </div>
            ) : (
                <ListContainer 
                    productos={state} 
                    dispatch={dispatch} 
                    setProductoEditando={setProductoEditando} 
                    setFormView={setFormView} 
                />
            )}
        </div>
    );
};

export default AbarrotesPage;