import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../utils/firebaseConfig';
import SelectedItems from './SelectedItems';
const db = getFirestore(app);
import { useNavigate } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // función para ver el ticket
  const handleViewTicket = () => {
    // La función navigate redirige al usuario a la ruta /ticket 
    // y pasa los selectedItems como parte del estado de la ubicación.
    navigate('/ticket', { state: { selectedItems } }); 
  };  
  
  // useEffect realizar la solicitud de datos al servidor 
  // cuando el componente se monta por primera vez.
  useEffect(() => {
    // función asincrónica
    const fetchMenuData = async () => {
      try {
        // solicitudes HTTP para obtener datos de comidas y bebidas
        const mealResponse = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const mealData = mealResponse.data;

        const drinkResponse = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');
        const drinkData = drinkResponse.data;

        // combina comidas y bebidas en un solo arreglo
        // utilizando el Operator Spread
        const combinedDataFromAPI = [...mealData.meals, ...drinkData.drinks];
        
        // función para realizar la consulta a la bd
        const mealsSnapshot = await getDocs(collection(db, 'meals'));
        
        // método reduce: para reducir el arreglo a un objeto
        // con el nombre de la comida y el precio
        const mealPrices = mealsSnapshot.docs.reduce((acc, doc) => {
          acc[doc.data().name] = doc.data().price;
          return acc;
        }, {});

        const drinksSnapshot = await getDocs(collection(db, 'drinks'));

        const drinkPrices = drinksSnapshot.docs.reduce((acc, doc) => {
          acc[doc.data().name] = doc.data().price;
          return acc;
        }, {});

        // creo un nuevo arreglo y con el método map 
        // itero cada elemento del arreglo
        const combinedDataWithPrices = combinedDataFromAPI.map(item => {
          let price = '';
          if (item.strMeal && mealPrices[item.strMeal]) {
            price = parseFloat(mealPrices[item.strMeal]).toFixed(2);
          } else if (item.strDrink && drinkPrices[item.strDrink]) {
            price = parseFloat(drinkPrices[item.strDrink]).toFixed(2);
          }
          // devuelve un objeto con todos los atributos
          // del objeto item y los del precio
          return { ...item, price };
        });

        // actualiza el estado del menú en el nuevo arreglo
        // que contiene los elementos del menú con los precios
        setMenuItems(combinedDataWithPrices);

      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  // función para agregar el item seleccionado a la lista selectedItems
  const handleAddItem = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  // para controlar si estamos cargando datos
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // para almacenar errores ocurridos durante la carga
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // bloque que se renderiza en el componente Menu
  return (
    <div className="container">
      {/* se renderiza SelectItems y se le pasan 2 propiedades */}
      <SelectedItems menuItems={menuItems} onAddItem={handleAddItem} />
      {/* se activa la función handleViewTicket al hacer click */}
      <button className="w-100 btn btn-primary" type="button" onClick={handleViewTicket}>Ver Ticket</button>
    </div>
  );
}

export default Menu; 