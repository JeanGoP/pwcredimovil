import React, { useState } from "react";
import "./carDetalle.css";


const CardDetalle = ({ titulo = '', contenido = '', icono = '' }) => {


  return (
    <div>
      <div  className='detalle-card h-100'>
        <div className="detalle-icono" >
        <img
          src={icono}
          alt={titulo}
          style={{
            width: "25px",
            height: "25px",
            objectFit: "contain",
          }}
        />
        </div>
        <h5 className="detalle-titulo">{titulo}</h5>
        <p className="detalle-descripcion"> {contenido}</p>

      </div>

    </div>
  );
};

export default CardDetalle;
