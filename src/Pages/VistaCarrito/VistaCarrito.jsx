import './VistaCarrito.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsTrashFill } from 'react-icons/bs';
import { useEffect } from 'react';


const Carrito = () => {
  const api_url = process.env.REACT_APP_API_URL;

  const [productos, setProductos] = useState([]);
  
  const[ cantidades, setCantidades ] = useState({});

  const handleChangeCantidad = (idProducto, cantidad) => {
    setCantidades({ ...cantidades, [idProducto]: cantidad });
  };
  /*
  const [productosDePrueba, setProductosDePrueba] = useState([
    {
      ID_Producto: 1,
      Nombre_producto: "Fresas Camarrosa x500g",
      Precio_producto: 5600,
      Cantidad: 3,
      Ruta_img_producto: "https://cdn.pixabay.com/photo/2016/11/18/17/23/strawberries-1835934_1280.jpg",
    },
  ]);
  */
  const calcularSubtotal = (producto) => {
    const cantidad = cantidades[producto.ID_Producto] || 1; // Obtener la cantidad del estado o asumir 1 si no está definida
    const subtotal = producto.Precio_producto * cantidad;
    return `${subtotal.toLocaleString()} `; // Aplicar formato con separador de miles y concatenar
  };
  
  const calcularTotalCarrito = (productos) => {
    const total = productos.reduce((total, producto) => {
      return total + producto.Precio_producto * (cantidades[producto.ID_Producto] || 1); // Aquí ya se está aplicando el formato correctamente
    }, 0);
    return `${total.toLocaleString()} `; // Aplicar formato con separador de miles y concatenar
  };

  const idUser = localStorage.getItem('id');
  
  const token = localStorage.getItem('token');

  const fetchProduct = () => {
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }; 
    fetch(`${api_url}/carrito/productos/${idUser}`, { headers })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
          return console.error(data.body); 
        }
        setProductos(data.body);
    })
    .catch(error => {
        console.error('There was an error!', error);
    });

  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const EliminarProducto = async(idProducto) => {
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
    fetch(`${api_url}/carrito/producto/${idUser}/${idProducto}`, { method: 'DELETE', headers })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
          alert(data.body);
          return console.error(data.body);
        }
        alert('Producto eliminado del carrito')
        fetchProduct();
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
  }

  return (
    <div className="contenedor-1">
      <div className="producto-detalle-carrito">
        <div className="producto-informacion-carrito">
          <div className="info-productos">
            <p className='descripcion-carrito'>Este es tu carrito, por favor verifica tu pedido</p>
            <div className="table-container">
            <table cellSpacing={0}>
              <thead className='table-head'>
                <tr>
                  <th></th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.ID_Producto}>
                    <td><img src={producto.Ruta_img_producto} alt={producto.Nombre_producto} /></td>
                    <td className='nombre-producto'>{producto.Nombre_producto}</td>
                    <td className='precio-producto'>${producto.Precio_producto} COP</td>
                    <td>
                      <input
                        id='cantidad-det'
                        type="number"
                        min="1"
                        max="20"
                        defaultValue={cantidades[producto.ID_Producto] || 1}
                        onChange={(e) => handleChangeCantidad(producto.ID_Producto, parseInt(e.target.value))}
                      />
                    </td>
                    <td className='subtotal-producto'>$ {calcularSubtotal(producto)} COP</td>
                    <td>
                      <button className='btn btn-outline-danger' onClick={() => EliminarProducto(producto.ID_Producto)}>
                        <BsTrashFill/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="segunda-tabla-contenedor">
              <table cellSpacing={0}>
                <thead>
                  <tr className="titulo-total-carrito">
                    <th>Total Carrito</th>
                  </tr>
                </thead>
                <tbody>
                  <tr> 
                    <td className="subtotal-carrito">Subtotal</td>
                    <td className='precios-carrito'>${calcularTotalCarrito(productos)} COP</td>
                  </tr>
                  <tr> 
                    <td>Envío</td>
                    <td className='precios-carrito'>$0 COP</td>
                  </tr>
                  <tr> 
                    <td>Total</td>
                    <td className='precios-carrito'>${calcularTotalCarrito(productos)} COP</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="contenedor-btn">
              <Link to="/checkout" className="btns-compra-carrito">
                Finalizar compra 
              </Link>

              <Link to="/products" className="btns-compra-carrito">
                Seguir comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
</div>

  );
};

export default Carrito;








