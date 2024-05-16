import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Ticket.css';

const Ticket = () => {
  const navigate = useNavigate();
  // para obtener la ubicación actual
  const location = useLocation();
  // obtiene los elementos seleccionados del estado de la ubicación
  const selectedItems = location.state?.selectedItems || [];
  const [items, setItems] = useState(selectedItems);

  // función para eliminar un elemento x su id
  // filtra los elementos para mantener solo los que
  // NO coinciden con el id del elemento a eliminar
  // y actualiza el estado del item
  const handleRemoveItem = (id) => {
    console.log('id item a remover', id);
    const filteredItems = items.filter(
      (item) => item.idMeal !== id && item.idDrink !== id
    );
    setItems(filteredItems);
    console.log('item removido', id);
  };

  const [totalPrice, setTotalPrice] = useState(0);

  // para calcular el precio total cada vez 
  // que el estado del item cambia
  useEffect(() => {
    const total = items.reduce((acc, item) => acc + parseFloat(item.price), 0);
  setTotalPrice(total);
    console.log('Items updated:', items);
  }, [items]);

  return (
    <div className="ticket-container">
      <h2>Ticket Pedido</h2>
      <ul className="ticket-list">
        {/* itera los elementos del ticket y los muestra en 1 lista */}
        {items.map((item) => (          
          <li key={item.idMeal || item.idDrink} className="ticket-item"> 
            <div className="item-name">{item.strMeal} {item.strDrink}</div> 
            <div className="item-price">$ {item.price}</div>
            <button className="btn btn-danger" onClick={() => handleRemoveItem(item.idMeal || item.idDrink)}>Quitar</button>         
          </li>
        ))}
        <div className="total-price text-center mt-4"><strong>Total a Pagar:</strong> $ {totalPrice.toFixed(2)}</div>
        <button className='btn btn-primary w-100 mt-4' onClick={() => navigate('/menu')}>Volver</button>
      </ul>
      
    </div>
  );
};

export default Ticket;
