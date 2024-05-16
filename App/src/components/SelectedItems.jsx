import React from 'react';

// defino el componente funcional que recibe dos propiedades
const SelectedItems = ({ menuItems, onAddItem }) => {
  // función para seleccionar un item
  const handleAddItem = (item) => {
    onAddItem(item);
    console.log('id item add', item);
  };
 
  // renderizo el componente
  return (
    <div className="selected-items">
      <h1>Menu</h1>
      <ul className="menu-list">
        {/* itero los elementos del menú y los muestro en una lista */}
        {menuItems.map((item) => (
          <li key={item.idMeal || item.idDrink} className="menu-item text-center">
            {item.strMeal && <p><strong>Nombre:</strong> {item.strMeal}</p>}
            {item.strDrink && <p><strong>Nombre:</strong> {item.strDrink}</p>}
            {item.strCategory && <p><strong>Categoría:</strong> {item.strCategory}</p>}
            {item.strArea && <p className="area"><strong>Área:</strong> {item.strArea}</p>}            
            {item.strDrinkThumb && <img src={item.strDrinkThumb} alt={item.strDrink} className="menu-item-img" />}
            {item.strMealThumb && <img src={item.strMealThumb} alt={item.strMeal} className="menu-item-img" />}           
            {item.price && <p><strong>Precio:</strong> $ {item.price}</p>} 
            {/* defino el evento onClick que se activa 
            cuando se ejecuta la funcion handleAddItem */}
            <button className='btn btn-dark w-100' onClick={() => handleAddItem(item)}>Agregar</button>  
          </li>
        ))}
      </ul>
    </div>  
  );
};

export default SelectedItems;