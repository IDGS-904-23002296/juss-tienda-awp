import React from "react";

function formatearPrecio(precio) {
  return `$${Number(precio).toFixed(2)} MXN`;
}

function formatearNombre(nombre) {
  return nombre.toUpperCase();
}

const TablaAbarrotes = ({ productos = [], dispatch, setProductoEditando, setFormView }) => {
    const handleDelete = (id, nombreProd) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar "${nombreProd}"?`)) {
            dispatch({ type: "delete", payload: id });
        }
    };

    const handleEditarClick = (prod) => {
        setProductoEditando(prod);
        setFormView(true);
    };

    const manejarCompra = (nombreProd) => {
        alert(`Hola usuario, tomaste el producto: ${nombreProd}`);
    };

    return (
        <div className="row">
            {productos.map((prod) => (
                <div className="col-md-4 mb-4" key={prod.id}>
                    <div className="card h-100 shadow-sm border-success">
                        <img 
                            src={prod.url} 
                            alt={prod.nombre} 
                            className="card-img-top p-3" 
                            style={{ height: '200px', objectFit: 'contain' }} 
                        />
                        <div className="card-body d-flex flex-column justify-content-between text-center">
                            <div>
                                <h5 className="card-title text-dark">{formatearNombre(prod.nombre)}</h5>
                                <p className="card-text text-success fw-bold">{formatearPrecio(prod.precio)}</p>
                            </div>
                            <div className="d-grid gap-2 mt-2">
                                <button className="btn btn-outline-success" onClick={() => manejarCompra(prod.nombre)}>
                                    Comprar
                                </button>
                                <button className="btn btn-outline-warning btn-sm fw-bold" onClick={() => handleEditarClick(prod)}>
                                    Editar
                                </button>
                                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(prod.id, prod.nombre)}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TablaAbarrotes;