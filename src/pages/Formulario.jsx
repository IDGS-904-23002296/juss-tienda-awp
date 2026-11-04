import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

const Formulario = ({ dispatch, productoEditando, setProductoEditando }) => {
    const [data, setData] = useState({ id: null, nombre: "", precio: "", url: "" });
    const [errores, setErrores] = useState({});

    useEffect(() => {
        if (productoEditando) {
            setData(productoEditando);
        } else {
            setData({ id: null, nombre: "", precio: "", url: "" });
        }
    }, [productoEditando]);

    const { nombre, precio, url } = data;

    const validarFormulario = () => {
        let nuevosErrores = {};

        if (!nombre.trim()) {
            nuevosErrores.nombre = "El nombre del producto es obligatorio";
        }
        if (precio === "" || precio === null || precio === undefined) {
            nuevosErrores.precio = "El precio es obligatorio";
        } else if (parseFloat(precio) <= 0) {
            nuevosErrores.precio = "El precio debe ser mayor a 0";
        }
        if (!url.trim()) {
            nuevosErrores.url = "La URL de la imagen es obligatoria";
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        if (errores[name]) {
            setErrores({ ...errores, [name]: null });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        if (data.id != null) {
            dispatch({ type: "update", payload: { ...data, precio: parseFloat(precio) } });
            alert("¡Producto actualizado exitosamente!");
        } else {
            dispatch({ type: "add", payload: { id: uuid(), nombre, precio: parseFloat(precio), url } });
            alert("¡Producto registrado exitosamente!");
        }

        setData({ id: null, nombre: "", precio: "", url: "" });
        setErrores({});
        if (setProductoEditando) setProductoEditando(null);
    };

    return (
        <div className="container mb-4 p-4 shadow-lg rounded-4" style={{ backgroundColor: "#f8f9fa", border: "3px solid #198754", position: "relative" }}>
            <div className="position-absolute top-0 start-50 translate-middle px-3 py-1 text-white rounded-pill fw-bold shadow-sm" style={{ backgroundColor: "#198754", fontSize: "0.85rem" }}>
                {data.id != null ? "MODIFICAR PRODUCTO" : "NUEVO PRODUCTO"}
            </div>
            <form onSubmit={handleSubmit} noValidate className="mt-3">
                <div className="mb-3">
                    <label className="form-label fw-bold">Nombre del producto:</label>
                    <input type="text" name="nombre"
                        className={`form-control border-2 ${errores.nombre ? 'is-invalid' : ''}`}
                        value={nombre}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Ej. Arroz"
                    />
                    <div className="invalid-feedback">{errores.nombre}</div>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Precio ($ MXN):</label>
                    <input
                        type="number"
                        step="0.01"
                        name="precio"
                        className={`form-control border-2 ${errores.precio ? 'is-invalid' : ''}`}
                        value={precio}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Ej. 20.50"
                    />
                    <div className="invalid-feedback">{errores.precio}</div>
                </div>

                <div className="mb-4">
                    <label className="form-label fw-bold">URL de la Imagen:</label>
                    <input
                        type="text"
                        name="url"
                        className={`form-control border-2 ${errores.url ? 'is-invalid' : ''}`}
                        value={url}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Url de la imagen del producto"
                    />
                    <div className="invalid-feedback">{errores.url}</div>
                </div>

                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-success py-2 text-white fw-bold shadow flex-grow-1">
                        {data.id != null ? "Actualizar Producto" : "¡Registrar Producto!"}
                    </button>
                    {data.id != null && (
                        <button
                            type="button"
                            onClick={() => {
                                setData({ id: null, nombre: "", precio: "", url: "" });
                                setErrores({});
                                if (setProductoEditando) setProductoEditando(null);
                            }}
                            className="btn btn-outline-secondary fw-bold"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Formulario;