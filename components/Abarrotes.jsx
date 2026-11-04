import React, { useEffect, useReducer, useState } from "react";
import { AbarrotesReducer } from "../reducer/AbarrotesReducer";
import FormularioAdd from "./Formulario";
import TablaAbarrotes from "./TablaAbarrotes";

function obtenerProductosIniciales(){
 return [
  { id: 1, nombre: "Leche", precio: 10.00, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaNCv1cOzr9VlFjAe2KF_ai0-ygIn_w-j5-9N9iUzyqw&s=10" },
  { id: 2, nombre: "Aceite", precio: 18.00, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVNUacvva9YYFhtnv7ae49g97HRHEIokZED5PC63qgoA&s=10" },
  { id: 3, nombre: "cubito de pollo", precio: 5.50, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvsmKMFQpV-N6TqoBM04BtuA0qB9hUxbPezp-ltj58HA&s=10" },
  { id: 4, nombre: "Maizena", precio: 15.50, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNtJOO2WrUqJiUYju_cCzKIDJxDdA8ko3uhyVYDgu5ww&s" }
];
}

const init = () => {
    const productosStorage = localStorage.getItem("abarrotes");
    return productosStorage ? JSON.parse(productosStorage) : null;
};

const Abarrotes = () => {
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
            setContador((contadorActual) => {
                if (contadorActual > 1) {
                    return contadorActual - 1;
                } else {
                    clearInterval(intervaloId);
                    return 0;
                }
            });
        }, 1000);

        const cargarCatalogo = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 3000));
                if (!state || state.length === 0) {
                    dispatch({ type: "populate", payload: obtenerProductosIniciales() });
                }
                setCargando(false);
            } catch (error) {
                console.error("Error al cargar catálogo", error);
                setCargando(false);
            }
        };

        cargarCatalogo();

        return () => clearInterval(intervaloId);
    }, []);

    return (
        <div>
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
                <FormularioAdd 
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
                <TablaAbarrotes 
                    productos={state} 
                    dispatch={dispatch} 
                    setProductoEditando={setProductoEditando} 
                    setFormView={setFormView} 
                />
            )}
        </div>
    );
};

export default Abarrotes;