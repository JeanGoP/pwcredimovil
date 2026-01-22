import React, { useRef,useState } from "react";
import { Route, Routes, HashRouter as BrowserRouter,useLocation  } from "react-router-dom";
import Navbar from './../components/navbar'
import Footer from './../components/footer'
import { Home } from "../pages/home"; 
import {Cotizador} from "../pages/cotizador"
import {Posventa} from "../pages/posventa"
import {Promociones} from "../pages/promociones"
import { Visitanos } from "../pages/visitanos";
import { Administrador } from "../pages/administrador";
import {Login} from "../pages/login"
import ModalContacto from "./../components/modalContacto"
import BotonWhatsapp from "./../components/botonWhatsapp";
import ModalWhatsapp from "./../components/modalWhatsapp";
import { TratamientoDatos } from "../pages/tratamientoDatos";
import 'react-toastify/dist/ReactToastify.css';

function AppRoutesWrapper() {
  const location = useLocation();
  const modalReferencia = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const handleMostrarModal = () => {
    const modal = new window.bootstrap.Modal(modalReferencia.current);
    modal.show();
  };

  const handleMostrarModalWhatsapp = () => {
    if(modalOpen){
      setModalOpen(false);
    }else{
      setModalOpen(true);
    }
    
  };

  const handleCerrarModalWhatsapp = () => {
    setModalOpen(false);
  };

 // const ocultarLayout = ((location.pathname === "/login/Administrador" || location.pathname === "/Login/administrador"|| location.pathname === "/Login/Administrador") || (location.pathname === "/Login" || location.pathname === "/login" || location.pathname === "/login/" || location.pathname === "/Login/")) 
 const path = location.pathname.toLowerCase().replace(/\/+$/, '');

 const ocultarLayout = path === '/login/administrador' || path === '/login';
 return (
    <>
  {!ocultarLayout && <Navbar onAbrilModal={handleMostrarModal} />}
      <ModalContacto modalReferencia={modalReferencia} />
      <ModalWhatsapp isOpen={modalOpen} onClose={handleCerrarModalWhatsapp} />
      {!ocultarLayout &&  <BotonWhatsapp onClick={handleMostrarModalWhatsapp} />}   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cotizacion" element={<Cotizador />} />
        <Route path="/postventa" element={<Posventa />} />
        <Route path="/promociones" element={<Promociones />} />
        <Route path="/visitanos" element={<Visitanos />} />
        <Route path="/tratamientoDatos" element={<TratamientoDatos />}/>
        {/* <Route path="/Login/Administrador" element={<Administrador />} /> 
        <Route path="/Login" element={<Login />}/> */}
        <Route path="*" element={<span style={{ fontSize: '100px' }}>404 - LOST</span>} />
      </Routes>
      {!ocultarLayout && <Footer />}
   </>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <AppRoutesWrapper />
    </BrowserRouter>
  );
}


export default AppRoutes;