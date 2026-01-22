import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { IniciarSesion } from "../../services/ServicioConsumo";
import { LanguageContext } from '../../context/context';
import { ToastContainer, toast } from 'react-toastify';
// import ImgLogin from '../../../public/images/ImgLogin.png';

import './login.css' 
export function Login() {
    const ruta = useNavigate();
    const [nit, setNit] = useState("");
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const {setConfiguracionData} =  useContext(LanguageContext);
      // Estados para errores
    const [errors, setErrors] = useState({});
    const handleLogin = async () =>{
        const newErrors = {};
        if (!nit.trim()) newErrors.nit = "El NIT es obligatorio";
        if (!usuario.trim()) newErrors.usuario = "El nombre de usuario es obligatorio";
        if (!password.trim()) newErrors.password = "La contraseña es obligatoria";
        setErrors(newErrors);
          // Si no hay errores, navegar
    if (Object.keys(newErrors).length === 0) {
        try {
            const jsonLogin = {
                nit:nit,
                usuario : usuario,
                password :password
            }
            const response = await IniciarSesion(jsonLogin);
            //console.log(response)
            if (!response.Error) {
              
              setConfiguracionData(response.Resultado);
              ruta("/Login/Administrador", { state: { fromLogin: true } });
              sessionStorage.setItem('nit', nit);
              sessionStorage.setItem('SessionToken', response.Resultado.SessionToken);
            }else{
                toast.error(response.Mensaje);
            }
          } catch (error) {
            console.log(error);
            console.error('Error al obtener productos:', error.message);
          }
        
      }
    }
    return (
        <section className="vh-100 body_section__login">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                 src='/images/ImgLogin.png'
               // src="https://sidecilco.sharepoint.com/sites/gestordocumental/IMG_PAGEWEB_OB/MOTOSABURRA_PAGEWEB/Londres1.png"
                className="img-fluid"
                alt="Sample"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Inicio de Sesión</p>
                </div>
  
                <div className="form-outline mb-4">
                  <input
                    type="number"
                    id="nit"
                    className={`form-control form-control-lg ${errors.nit ? "is-invalid" : ""}`}
                    placeholder="Número de NIT"
                    value={nit}
                    onChange={(e) => setNit(e.target.value)}
                  />
                  <label className="form-label" htmlFor="nit">Nit</label>
                  {errors.nit && <div className="invalid-feedback">{errors.nit}</div>}
                </div>
  
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="usuario"
                    className={`form-control form-control-lg ${errors.usuario ? "is-invalid" : ""}`}
                    placeholder="Nombre de usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                  />
                  <label className="form-label" htmlFor="usuario">Usuario</label>
                  {errors.usuario && <div className="invalid-feedback">{errors.usuario}</div>}
                </div>
  
                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="password"
                    className={`form-control form-control-lg ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" htmlFor="password">Contraseña</label>
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
  
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

    )
}