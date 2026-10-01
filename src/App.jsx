import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import appLogo from '/favicon.svg'
import PWABadge from './PWABadge.jsx'
import './App.css'

function obtenerProductos(){
 return [
  {
    id: 1, nombre: "Leche", precio: 10.001, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaNCv1cOzr9VlFjAe2KF_ai0-ygIn_w-j5-9N9iUzyqw&s=10"
  },
  {
    id: 2, nombre: "Aceite", precio: 18.00, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVNUacvva9YYFhtnv7ae49g97HRHEIokZED5PC63qgoA&s=10"
  },
  {
    id: 3, nombre: "cubito de pollo", precio: 5.50, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvsmKMFQpV-N6TqoBM04BtuA0qB9hUxbPezp-ltj58HA&s=10"
  },
  {
    id: 4, nombre: "Maizena", precio: 15.50, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNtJOO2WrUqJiUYju_cCzKIDJxDdA8ko3uhyVYDgu5ww&s"
  },
 ]
}

function formatearPrecio(precio) {
  return `$${precio.toFixed(2)} MXN`;
}

function formatearNombre(nombre) {
  return nombre.toUpperCase();
}

function crearMensajeCompra(producto) {
  return `Hola usuario, tomaste el producto: ${producto}`;
}

function Header({ tituloPrincipal }) {
  return (
    <div className="text-center mb-4">
      <a href="https://vite.dev" target="_blank">
        <img src={appLogo} className="logo" alt="prueba logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <h1 className="text-success fw-bold">{tituloPrincipal}</h1>
    </div>
  )
}

function Cargando({ segundosRestantes }) {
  return (
    <div className="text-center my-5">
      <h3 className="text-secondary">Cargando catálogo de abarrotes...</h3>
      <p className="fs-4 fw-bold text-danger">Tiempo restante: {segundosRestantes} segundos</p>
    </div>
  )
}

function ProductoCard({ id, nombre, precio, url }) {
  const manejarCompra = (nombreProd) => {
    alert(crearMensajeCompra(nombreProd));
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm border-success">
        <img src={url} alt={nombre} className="card-img-top p-3" style={{ height: '200px'}} />
        <div className="card-body d-flex flex-column justify-content-between text-center">
          <div>
            <h5 className="card-title text-dark">{formatearNombre(nombre)}</h5>
            <p className="card-text text-success">{formatearPrecio(precio)}</p>
          </div>
          <button className="btn btn-outline-success mt-2" onClick={() => manejarCompra(nombre)}>
            Comprar
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [contador, setContador] = useState(3)

  async function cargarCatalogo() {
    try {
      let datos = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(obtenerProductos());
        }, 3000);
      });

      setProductos(datos);
      setCargando(false);
    } catch (error) {
      console.error("Ocurrió un error al cargar el catálogo", error);
      setCargando(false);
    }
  }

  useEffect(() => {
    const intervaloId = setInterval(() => {
      setContador((contador) => {
        if (contador > 1) {
          return contador - 1;
        } else {
          clearInterval(intervaloId);
          return 0;
        }
      });
    }, 1000);

    cargarCatalogo();

    return () => clearInterval(intervaloId);
  }, [])

  return (
    <div className="container mt-4">
      <Header tituloPrincipal="Tienda de Abarrotes 'Don Pepe'" />

      {cargando ? (
        <Cargando segundosRestantes={contador} />
      ) : (
        <div className="row">
          {productos.map((prod) => (
            <ProductoCard 
              key={prod.id} 
              id={prod.id} 
              nombre={prod.nombre} 
              precio={prod.precio} 
              url={prod.url} 
            />
          ))}
        </div>
      )}

      <PWABadge />
    </div>
  )
}

export default App