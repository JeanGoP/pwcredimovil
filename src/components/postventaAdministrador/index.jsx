import React,{ useState,useEffect } from "react";
import {     GuardarPosVenta2 } from "../../services/ServicioConsumo";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
const url = import.meta.env.VITE_API_URL_SITE;
const API_BASE_URL = url;

const PosVentaAdministrador=({getTitloPosventa, getDescripcionPosventa})=>{
    const NIT = import.meta.env.VITE_API_NIT_EMPRESA;
    const [imagenPortada, setImagenPortada] = useState(null);
    const [formDataPosventa, setFormDataPosventa] = useState({
        tituloPosventa:"",
        descripcionPosventa :"",
        nit:NIT
    });
    const jsonPosventa ={
        tituloPosventa:getTitloPosventa,
        descripcionPosventa :getDescripcionPosventa,
        nit:NIT
    }
    useEffect(()=>{
        setFormDataPosventa(jsonPosventa)
    },[getTitloPosventa])

    const handleChangePosventa = (e) => {
        const { name, value } = e.target;
        setFormDataPosventa(prev => ({ ...prev, [name]: value }));
    };


        const handleFileChange = (e) => {
            const file = e.target.files[0];
            setImagenPortada(file);
          };



    const handleGuadarPosventa = async () => { 
        const data = formDataPosventa;
        for (const key in data) {
            if (typeof data[key] === "string" && data[key].trim() === "") {
              toast.warning(`Por favor completa el campo: ${key}`);
              return;
            }
          }
        
          if (!imagenPortada) {
            toast.warning("Por favor selecciona una imagen de portada.");
            return;
        }
            const formData = new FormData();
            formData.append("tituloPosventa", data.tituloPosventa);
            formData.append("descripcionPosventa", data.descripcionPosventa);
            formData.append("nit", data.nit);
            formData.append("files", imagenPortada);
            formData.append("Driverid", "b!mEzOU6FN402e5kDXM6ImwH_pVr3rflJNnoqSenwwO0C1LfVyI2YtTZA_n_j_ttK3");
            formData.append("carpeta", "MOTOSABURRA_PAGEWEB");
            formData.append("nombrePortada", imagenPortada.name); 
            
          try { 
            const response = await GuardarPosVenta2(formData);//await GuardarPosVenta(data);
            if (!response.Error) {
              toast.success("Proceso ejecutado Exitosamente.")
            }else{
                toast.error(response.Mensaje);
            }
          } catch (error) {
            console.log(error);
            console.error('Error al obtener productos:', error.message);
          }
    };

    // const handleGuadarPosventa = async () => { 
    //     const data = formDataPosventa;
      
    //     // Validación de campos vacíos
    //     for (const key in data) {
    //       if (data[key].trim() === "") {
    //         toast.warning(`Por favor completa el campo: ${key}`);
    //         return;
    //       }
    //     }
      
    //     // Validación de imagen
    //     if (!imagenPortada) {
    //       toast.warning("Por favor selecciona una imagen de portada.");
    //       return;
    //     }
       
    //     const formData = new FormData();
    //     formData.append("tituloPosventa", data.tituloPosventa);
    //     formData.append("descripcionPosventa", data.descripcionPosventa);
    //     formData.append("nit", data.nit);
    //     formData.append("files", imagenPortada); 
    //     formData.append("Driverid", "b!mEzOU6FN402e5kDXM6ImwH_pVr3rflJNnoqSenwwO0C1LfVyI2YtTZA_n_j_ttK3");
    //     formData.append("carpeta", "imagenPortada");
    //     formData.append("nombrePortada", imagenPortada.name);  
      
    //     try {
    //       const response = await axios.post(API_BASE_URL+"PosventaSave", formData, {
    //         headers: {
    //           "Content-Type": "multipart/form-data"
    //         }
    //       });
      
    //       if (!response.data.Error) {
    //         toast.success("Proceso ejecutado exitosamente.");
    //       } else {
    //         toast.error(response.data.Mensaje || "Error en el proceso.");
    //       }
    //     } catch (error) {
    //       console.error("Error al guardar posventa:", error);
    //       toast.error("Error al enviar los datos.");
    //     }
    //   };


    return(
        <div className="row">
         <div className="col-lg-12 col-md-12 col-sm-12">
                    <label htmlFor="" className="form-label">Portada PosVenta</label>
                    <input className="form-control" name="ImagenPortadaPosVenta"  type="file" accept="image/*"  onChange={handleFileChange} />
             </div>
            <div className="col-lg-12 col-md-12 col-sm-12">
                <label htmlFor="" className="form-label">Titulo</label>
                <input type="text" name="tituloPosventa" value={formDataPosventa.tituloPosventa || ""} onChange={handleChangePosventa} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing" />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12">
                <label htmlFor=""  className="form-label">Descripción</label>
                <textarea
                    id="comentario"
                    rows="4"
                    cols="50"
                    placeholder="Detalle..."
                    className="form-control"
                    name="descripcionPosventa" 
                    value={formDataPosventa.descripcionPosventa || ""} onChange={handleChangePosventa}
                />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 div__btn__administrador text-end">
                             <button type="button" className="btn btn-primary btn__guardar__info__administrador" onClick={handleGuadarPosventa} >Guardar</button>
                        </div>
        </div>
    )
}
export default PosVentaAdministrador;