import React from 'react';
import './botonWhatsapp.css';
import { FaWhatsapp } from 'react-icons/fa';
const BotonWhatsapp = ({ onClick }) => {
  return (
    <button className="whatsapp-float" onClick={onClick}>
      <FaWhatsapp size={30} />
    </button>
  );
};

export default BotonWhatsapp;
