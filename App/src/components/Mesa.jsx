import React from 'react';
import mesa from '../imagenes/mesa.png'; 

const Mesa = ({ numero }) => {
  return (
    <div className="mesa">
      <img src={mesa} alt={`Mesa ${numero}`} />
      <div className="numero">Mesa {numero}</div>
    </div>
  );
};

export default Mesa;
