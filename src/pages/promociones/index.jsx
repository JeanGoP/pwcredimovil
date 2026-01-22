import React, { useEffect, useState, useContext } from "react";
import CardPromociones from "../../components/cardPromociones";
import "./promociones.css"
import {jsonLinkPromociones} from "../../constants/constants"
import { LanguageContext } from '../../context/context';
export function Promociones(){
    const NIT = import.meta.env.VITE_API_NIT_EMPRESA;
    const { configuracionData = [],getCofiguracion } = useContext(LanguageContext);
    useEffect(() => {
      if (configuracionData) {
        getCofiguracion(NIT, 'Token', 'nit', 'USERFINALLY');
        
      }
    }, []);
    let ImgPromociones = [];

    try {
        if (configuracionData?.promocionesImagen) {
            ImgPromociones = JSON.parse(configuracionData.promocionesImagen);
        }
    } catch (error) {
        console.error("Error al parsear promocionesImagen:", error);
        ImgPromociones = [];
    }
    // ImgPromociones = [
    //         {
    //             ruta:"/images/credimovilagosto_1.jpg"
    //         },
    //         {
    //             ruta:"/images/credimovilagosto_2.jpg"
    //         },
    //         {
    //             ruta:"/images/credimovilagosto_2.jpg"
    //         }
    // ]
    return(
   <div style={{backgroundColor:"#eeeeee"}}>
    
                <div className="container">
                        <div className="row row__Promociones">
                            <div className="col-md-12 coll-sm-12 container__row__Promociones"
                              style={{
                                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${configuracionData?.rutapromocionesportada}')`
                                }}
                            >
                                <label className="label__row__Promociones">NUESTRAS PROMOCIONES DISPONIBLES</label>
                            </div>
                        </div>

                </div>
   
                <div className="row__card__imagenes__promociones">
                <div className="container contenido--promociones" >
                    <div className="row" >
                    {ImgPromociones.map((item, index)=>(
                        <CardPromociones 
                            key={index}
                            Url={item.imagen} 
                        />

                    ))}
                    </div>
                   
                </div>
                </div>
 </div>
      
    )
}