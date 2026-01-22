import React from "react";
import { useNavigate } from "react-router-dom";

const NavbarAdministrador=({usuario, empresa, nit, urlImagen})=>{
    const rutalogin = useNavigate();
    const handleCerrarLogin = () =>{
        rutalogin("/Login");
        sessionStorage.setItem('SessionToken', undefined);
        sessionStorage.setItem('nit', undefined);
        
    }
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
            <a className="navbar-brand" ><img src={urlImagen} alt="" height="40" className="me-2" /> {empresa}</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto"> {/* <-- Aquí agregamos ms-auto */}
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <span style={{ marginRight: "10px" }}>   NIT: {nit} </span> <span>
                                        <img
                                            src="/user.jpg"
                                            alt="Usuario"
                                            className="rounded-circle img-fluid"
                                            style={{ width: "32px", height: "32px", objectFit: "cover" }}
                                        />
                   </span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end"> {/* <-- Esto alinea el dropdown hacia la derecha */}
                    <li><button className="dropdown-item disabled">Configuración</button></li>
                    <li><button className="dropdown-item" onClick={handleCerrarLogin}>Salir</button></li>
                </ul>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    )
}

export default NavbarAdministrador;