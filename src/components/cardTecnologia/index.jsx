import React from "react";
import './cardTecnologia.css';
const CardTecnologia = ({Titulo, Texto, Imagen,Color, ColorFondo}) =>{
    return(
        <div className="col-md-3 col-sm-12" >
            <div className="card card__Tecnologia h-100" style={{ background:ColorFondo}}>
                <img src={Imagen} className="card-img-top" alt="..." style={{borderRadius:"10px"}}/>
                <div className="card-body">
                     <p className="card-title titulo__card__Tecnologia" style={{ color:"black" }}>{Titulo}</p>
                     <p className="card-text texto__card__Tecnologia" style={{ color: Color }}>{Texto}</p>
            
                </div>
            </div>
        </div>
        
    )
}

export default CardTecnologia; 