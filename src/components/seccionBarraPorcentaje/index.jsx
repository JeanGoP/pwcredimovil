import React from "react";
import "./seccionBarraPorcentaje.css"
import { mix } from 'polished';
function isValidHex(color) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  }
const SeccionBarraPorcentaje = ({Motor, Cilindraje, potencia, ColorCuerpo}) =>{
    const gray = '#808080';
    let newColor = ColorCuerpo;
    if (ColorCuerpo && isValidHex(ColorCuerpo)) {
      newColor = mix(0.5, gray, ColorCuerpo);
    } 
    return(
        <div>
        <div className="row contenido__seccionBarraPorcentaje">
            <div className="col-lg-4 col-md-4 col-sm-12">
                <label className="titulo__seccionBarraPorcentaje" style={{ color: ColorCuerpo }}>MOTOR</label>
                 <p className="p__seccionBarraPorcentaje" style={{ color: newColor }}>{Motor}</p>
              
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
                 <label className="titulo__seccionBarraPorcentaje" style={{ color: ColorCuerpo }}>CILINDRAJE</label>
                    <p className="p__seccionBarraPorcentaje" style={{ color: newColor }}>{Cilindraje}</p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
                <label className="titulo__seccionBarraPorcentaje" style={{ color: ColorCuerpo }}>MÁXIMA POTENCIA</label>
                 <p className="p__seccionBarraPorcentaje" style={{ color: newColor }}>{potencia}</p>
             
            </div>
        </div>
        <div className="row contenido__seccionBarraPorcentaje">
            <div className="col-lg-4 col-md-4 col-sm-12">
                <div className=" div__barra__"></div>
              
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 ">
            <div className=" div__barra__"></div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 ">
                
            <div className=" div__barra__"></div>
            </div>
        </div>
        </div>
    )
}

export default SeccionBarraPorcentaje;