import React from "react";
import "./cardPuntosVentas.css"
import { IoMdCall } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
const CardPuntosVentas = ({Nombre, Direccion, Telefono, RutaGoogleMaps, ColorCard, ColorLetras}) =>{
    const handleComoLlegar = () => {
        if (RutaGoogleMaps) {
            window.open(RutaGoogleMaps, '_blank');
        }
    }
    return(
       
            <div className="col-lg-12 col-md-12 col-sm-12 div__CardPuntosVentas" style={{background : ColorCard , color:ColorLetras}}>
                <div className="row">
                    <p className="text-md-start text-center titulo__CardPuntosVentas">{Nombre}</p>
                </div>
                <div className="row">
                    <p><IoLocationSharp /> {Direccion}</p>
                </div>
                <div className="row">
                <p> <IoMdCall />  {Telefono}</p>
                </div>
                <div className="row row__btn__CardPuntosVentas">
                     <button type="button" className="btn btn-primary  btn__CardPuntosVentas"  onClick={handleComoLlegar}>¿Cómo llegar?</button>
                     
                </div>
            </div>
       
    )
}

export default CardPuntosVentas;