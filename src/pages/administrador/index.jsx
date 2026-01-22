import React, { useEffect, useState, useContext } from "react";
import './administrador.css'
import NavbarAdministrador from '../../components/navbarAdministrador'
import HomeAdministrador from "../../components/homeAdministrador";
import PosVentaAdministrador from "../../components/postventaAdministrador";
import VisitanosAdministrador from "../../components/visitanosAdministrador";
import PromocionesAdministrador from "../../components/promocionesAdministrador";
import ConfiguracionAdministrador from "../../components/configuracionAdministrador";
// import CotizadorAdministrador from "../../components/cotizadorAdministrador";
import { FaGear, FaLocationDot } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { TbFileReport } from "react-icons/tb";
import { MdOutlineRequestQuote } from "react-icons/md";
import { IoInformationCircle } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import { LanguageContext } from '../../context/context';
export function Administrador() {
  const NIT = import.meta.env.VITE_API_NIT_EMPRESA;
  const { configuracionData =[],getCofiguracion } = useContext(LanguageContext);
  const { empresa } = useContext(LanguageContext);
  
  useEffect(() => {
    if (configuracionData) {
      let Token = sessionStorage.getItem('SessionToken');
      let nit = NIT;
      if (nit && Token) {
        getCofiguracion(NIT, Token, nit);
      } else {
        navigate('/Login');
      }
    }
  }, []);
  useEffect(() => {
    toast.success('¡Bienvenido al panel de administración!', {
      autoClose: 3000, 
    });
  }, []); 
  return (
    <div className="admi__contenedor">
      <NavbarAdministrador usuario={configuracionData?.usuario} empresa={configuracionData?.empresa} nit={configuracionData?.nit} urlImagen={empresa?.url_logo} />
      <div className="container mt-5">
        <ul className="nav nav-tabs tabs__admin" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="tab6-tab" data-bs-toggle="tab" data-bs-target="#tab6" type="button" role="tab" aria-controls="tab6" aria-selected="true"><FaGear /> Configuración</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1" type="button" role="tab" aria-controls="tab1" aria-selected="true"><IoMdHome /> Home</button>
          </li>
          {/* <li className="nav-item" role="presentation">
            <button className="nav-link" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2" type="button" role="tab" aria-controls="tab2" aria-selected="false"> <MdOutlineRequestQuote /> Cotizador</button>
          </li> */}
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="tab3-tab" data-bs-toggle="tab" data-bs-target="#tab3" type="button" role="tab" aria-controls="tab3" aria-selected="false"><IoInformationCircle /> PostVenta</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="tab4-tab" data-bs-toggle="tab" data-bs-target="#tab4" type="button" role="tab" aria-controls="tab4" aria-selected="false"> <FaLocationDot /> Visitanos</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="tab5-tab" data-bs-toggle="tab" data-bs-target="#tab5" type="button" role="tab" aria-controls="tab5" aria-selected="false"><TbFileReport /> Promociones</button>
          </li>
        </ul>
        <div className="tab-content p-3 border border-top-0">
          <div className="tab-pane fade show active" id="tab6" role="tabpanel" aria-labelledby="tab6-tab">
            <p className="titulo__admin">Configuración</p>
            <hr />
            <ConfiguracionAdministrador
              getColorMenu={configuracionData?.colorMenu}
              getColorFooter={configuracionData?.colorFooter}
              getColorPagina={configuracionData?.colorPagina}
              getColorTituloHome ={configuracionData?.colorTituloHome}
              getColorCuerpo ={configuracionData?.colorCuerpo}
              getColorFranja={configuracionData?.colorFranja}
              getRutaYoutbe={configuracionData?.rutaYoutube}
              getRutaFacebook={configuracionData?.rutaFacebook}
              getRutaInstagram={configuracionData?.rutaInstagram}
              getWhatsapp={configuracionData?.whatsapp}
              getRutaCotizador={configuracionData?.rutaCotizador}
              getTratamientoDatos={configuracionData?.tratamientoDatos}
               />
          </div>
          <div className="tab-pane fade show" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
            <p className="titulo__admin">Contenido Home</p>
            <hr />
            <HomeAdministrador
                getrutaImgPortada ={configuracionData?.rutaImgPortada}       
                getrutaImgCarrousel   ={configuracionData?.rutaImgCarrousel}          
                getrutaImgMoto_1   ={configuracionData?.rutaImgMoto_1}           
                gettituloMoto_1    ={configuracionData?.tituloMoto_1}        
                getsubTituloMoto_1    ={configuracionData?.subTituloMoto_1}       
                getmotorMoto_1     ={configuracionData?.motorMoto_1}          
                getcilindrajeMoto_1    ={configuracionData?.cilindrajeMoto_1}     
                gettransmisionMoto_1     ={configuracionData?.transmisionMoto_1}    
                getdescripcionMoto_1  ={configuracionData?.descripcionMoto_1}      
                getrutaImgMoto_2    ={configuracionData?.rutaImgMoto_2}          
                gettituloMoto_2     ={configuracionData?.tituloMoto_2}         
                getsubTituloMoto_2    ={configuracionData?.subTituloMoto_2}      
                getmotorMoto_2       ={configuracionData?.motorMoto_2}          
                getcilindrajeMoto_2    ={configuracionData?.cilindrajeMoto_2}     
                getmaximaPotencianMoto_2   ={configuracionData?.maximaPotencianMoto_2} 
                getarranqueMoto_2  ={configuracionData?.arranqueMoto_2}         
                getalimentacionMoto_2    ={configuracionData?.alimentacionMoto_2}    
                gettorqueMoto_2   ={configuracionData?.torqueMoto_2}         
                getbateriaMoto_2    ={configuracionData?.bateriaMoto_2}          
                gettransmisionMoto_2    ={configuracionData?.transmisionMoto_2}      
                gettanqueMoto_2    ={configuracionData?.tanqueMoto_2}         
                getpesoMoto_2   ={configuracionData?.pesoMoto_2}             
                getanchoMoto_2    ={configuracionData?.anchoMoto_2} 
                gettiempoExperiencia   ={configuracionData?.tiempoExperiencia} 
                getclientesFelices    ={configuracionData?.clientesFelices} 
                getventas    ={configuracionData?.ventas} 
                getpuntosVentas    ={configuracionData?.puntosVentas} 
            />
          </div>
          {/* <div className="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
            <p className="titulo__admin">Contenido Cotizador</p>
            <hr/>
            <CotizadorAdministrador/>
          </div> */}
          <div className="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
            <p className="titulo__admin">Contenido PosVenta</p>
            <hr />
            { }
            <PosVentaAdministrador getTitloPosventa={configuracionData?.tituloPosVenta} getDescripcionPosventa={configuracionData?.descripcionPosventa} />
          </div>
          <div className="tab-pane fade" id="tab4" role="tabpanel" aria-labelledby="tab3-tab">
            <p className="titulo__admin">Contenido Visítanos</p>
            <hr />
            <VisitanosAdministrador getRutaGoogle={configuracionData?.rutaGoogleMaps} getSucursales={configuracionData?.sucursal} getColorCard={configuracionData?.colorCard} getColorLetras={configuracionData?.colorLetras} />
          </div>
          <div className="tab-pane fade" id="tab5" role="tabpanel" aria-labelledby="tab3-tab">
            <p className="titulo__admin">Contenido Promociones</p>
            <hr />
            {/* <PromocionesAdministrador getPromocionesImagenes={configuracionData?.promocionesImagen} /> */}
            <PromocionesAdministrador 
              getPromocionesImagenes={configuracionData?.promocionesImagen} 
              getTituloPromocion ={configuracionData?.tituloPromocion} 
              getDescripcionPromocion={configuracionData?.descripcionPromocion} 
              getTituloCardPromocion={configuracionData?.tituloCardPromocion} 
              getDescripcionCard ={configuracionData?.descricardPromocion} 
              getDisponiblePromocion={configuracionData?.disponiblePromocion} 
              getpromocionesImagenPreview = {configuracionData?.promocionesImagenPreview} 
            />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
}
