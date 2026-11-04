import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

const FormularioAdd = ({ dispatch, productoEditando, setProductoEditando }) => {
    const [data, setData] = useState({ nombre: "", precio: "", url: "" });

    useEffect(() => {
        if (productoEditando) {
            setData({
                nombre: productoEditando.nombre,
                precio: productoEditando.precio,
                url: productoEditando.url
            });
        } else {
            setData({ nombre: "", precio: "", url: "" });
        }
    }, [productoEditando]);

    const { nombre, precio, url } = data;

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (nombre.trim() === "" || precio === "" || url.trim() === "") {
            alert("Todos los campos son obligatorios");
            return;
        }

        if (productoEditando) {
            dispatch({
                type: "update",
                payload: {
                    id: productoEditando.id,
                    nombre,
                    precio: parseFloat(precio),
                    url,
                },
            });
            setProductoEditando(null);
        } else {
            dispatch({
                type: "add",
                payload: {
                    id: uuid(),
                    nombre,
                    precio: parseFloat(precio),
                    url,
                },
            });
        }

        setData({ nombre: "", precio: "", url: "" });
    };

    return (
        <div className="container mb-4 p-3 border border-success rounded bg-light shadow-sm">
            <h5 className="mb-3 text-secondary">
                {productoEditando ? "Editar Producto" : "Agregar Nuevo Producto"}
            </h5>
            <form onSubmit={handleSubmit}>
                <label className="mx-1 d-grid gap-2 mb-2">
                    Nombre del producto:{" "}
                    <input
                        onChange={handleChange}
                        name="nombre"
                        value={nombre}
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        placeholder="Ej. Arroz"
                    />
                </label>

                <label className="mx-1 d-grid gap-2 mb-2">
                    Precio ($ MXN):{" "}
                    <input
                        onChange={handleChange}
                        value={precio}
                        name="precio"
                        type="number"
                        step="0.01"
                        className="form-control"
                        autoComplete="off"
                        placeholder="Ej. 20.50"
                    />
                </label>

                <label className="mx-1 d-grid gap-2 mb-3">
                    URL de la Imagen:{" "}
                    <input
                        onChange={handleChange}
                        value={url}
                        name="url"
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        placeholder="https://..."
                    />
                </label>

                <div className="mx-1 d-grid gap-2">
                    <button type="submit" className={`btn ${productoEditando ? "btn-warning text-dark" : "btn-success"} mt-2 fw-bold`}>
                        {productoEditando ? "Actualizar Producto" : "Agregar Producto"}
                    </button>
                    {productoEditando && (
                        <button 
                            type="button" 
                            className="btn btn-secondary btn-sm mt-1"
                            onClick={() => {
                                setProductoEditando(null);
                                setData({ nombre: "", precio: "", url: "" });
                            }}
                        >
                            Cancelar Edición
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default FormularioAdd;