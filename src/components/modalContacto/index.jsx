import React from "react";
import {ciudadModal} from '../../constants/constants'
import './modalContacto.css'
const modalContacto = ({modalReferencia})=>{
    return(
        <div className="modal fade" tabIndex="-1" ref={modalReferencia} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" style={{maxWidth:"600px"}}>
                <div className="modal-content modalcontent__modalContacto">
                <div className="modal-header" style={{border:"none", paddingBottom:"0px", fontSize:"11px", paddingTop:"2px", position:"relative", top:"5px"}} >
                   
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                </div>
                <div className="modal-header modalcontacto_header" >
                   
                <h5 className="modal-title titulo__modal__contacto">CONTACTO</h5>
               </div>
                <div className="modal-body">
                    <div className="mb-3">
                         <input className="form-control input_text__modalContacto" type="text" placeholder="Tu Nombre" aria-label=""/>
                    </div>
                    <div className="mb-3">
                         <input className="form-control input_text__modalContacto" type="number" placeholder="Tu telefono" aria-label=""/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">¿En que ciudad te encuentras?</label>
                        <select className="form-select input_text__modalContacto" aria-label="Default select example">
                            {ciudadModal.map((item, index)=>(
                                 <option value={item.label} key={item.label}>{item.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                         <label className="form-check-label">
                             Al enviar este formulario autorizo el tratamiento de datos personales en los términos descritos.
                        </label>
                 </div>
                </div>
                <div className="">
                
                    <button type="button" className="btn btn-primary btn__modalContacto" >Quiero hablar con un asesor</button>
                </div>
                </div>
            </div>
      </div>
    )
}
export default modalContacto;