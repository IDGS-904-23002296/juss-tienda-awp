import React from "react";
import ListItem from "./ListItem";

const ListContainer = ({ productos = [], dispatch, setProductoEditando, setFormView }) => {
    return (
        <div className="row">
            {productos.map((prod) => (
                <ListItem 
                    key={prod.id} 
                    prod={prod} 
                    dispatch={dispatch} 
                    setProductoEditando={setProductoEditando} 
                    setFormView={setFormView} 
                />
            ))}
        </div>
    );
};

export default ListContainer;