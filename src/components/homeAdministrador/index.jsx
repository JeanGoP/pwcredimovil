import React, { useState, useEffect, useRef } from "react";
import { GuardarHome } from "../../services/ServicioConsumo";
import './homeAdministrador.css'
import { GrFormView } from "react-icons/gr";
import ModalTableImagenes from "../modalTableImagenes";
import { ToastContainer, toast } from 'react-toastify';

const HomeAdministrador = ({

    getrutaImgCarrousel
    , gettituloMoto_1
    , getsubTituloMoto_1
    , getmotorMoto_1
    , getcilindrajeMoto_1
    , gettransmisionMoto_1
    , getdescripcionMoto_1
    , gettituloMoto_2
    , getsubTituloMoto_2
    , getmotorMoto_2
    , getcilindrajeMoto_2
    , getmaximaPotencianMoto_2
    , getarranqueMoto_2
    , getalimentacionMoto_2
    , gettorqueMoto_2
    , getbateriaMoto_2
    , gettransmisionMoto_2
    , gettanqueMoto_2
    , getpesoMoto_2
    , getanchoMoto_2
    , gettiempoExperiencia
    , getclientesFelices
    , getventas
    , getpuntosVentas
}) => {
    const NIT = import.meta.env.VITE_API_NIT_EMPRESA;
    const modalRefe = useRef(null);
    const [files, setFiles] = useState([]);
    const [formDataHome, setFormDataHome] = useState({
        ImagenCarousel: "111",
        Titulo_moto_1: "",
        Subtitulo_moto_1: "",
        Motor_moto_1: "",
        Cilindraje_moto_1: "",
        Transmision_moto_1: "",
        Descripcion_moto_1: "",
        Titulo_moto_2: "",
        Subtitulo_moto_2: "",
        Motor_moto_2: "",
        Cilindraje_moto_2: "",
        Maxima_moto_2: "",
        Arranque_moto_2: "",
        Alimentacion_moto_2: "",
        Torque_moto_2: "",
        Bateria_moto_2: "",
        Transmision_moto_2: "",
        Tanque_moto_2: "",
        Peso_moto_2: "",
        Ancho_moto_2: ""
        , tiempoExperiencia: ""
        , clientesFelices: ""
        , ventas: ""
        , puntosVentas: ""
    });


    const jsonConfigHome = {
        ImagenCarousel: "111",
        Titulo_moto_1: gettituloMoto_1,
        Subtitulo_moto_1: getsubTituloMoto_1,
        Motor_moto_1: getmotorMoto_1,
        Cilindraje_moto_1: getcilindrajeMoto_1,
        Transmision_moto_1: gettransmisionMoto_1,
        Descripcion_moto_1: getdescripcionMoto_1,
        Titulo_moto_2: gettituloMoto_2,
        Subtitulo_moto_2: getsubTituloMoto_2,
        Motor_moto_2: getmotorMoto_2,
        Cilindraje_moto_2: getcilindrajeMoto_2,
        Maxima_moto_2: getmaximaPotencianMoto_2,
        Arranque_moto_2: getarranqueMoto_2,
        Alimentacion_moto_2: getalimentacionMoto_2,
        Torque_moto_2: gettorqueMoto_2,
        Bateria_moto_2: getbateriaMoto_2,
        Transmision_moto_2: gettransmisionMoto_2,
        Tanque_moto_2: gettanqueMoto_2,
        Peso_moto_2: getpesoMoto_2,
        Ancho_moto_2: getanchoMoto_2
        , tiempoExperiencia: gettiempoExperiencia
        , clientesFelices: getclientesFelices
        , ventas: getventas
        , puntosVentas: getpuntosVentas
    }
    // Cargar datos iniciales
    useEffect(() => {
        setFormDataHome(jsonConfigHome)
    }, [gettituloMoto_1]);

    const handleChangeHome = (e) => {
        const { name, value } = e.target;
        setFormDataHome(prev => ({ ...prev, [name]: value }));
    };
    const AbrilModalTable = () => {
        const modalTable = new window.bootstrap.Modal(modalRefe.current);
        modalTable.show();
    }

    // const handleGuadarHome = async () => {
    //     const data = formDataHome;
    //     for (const key in data) {
    //         if (typeof data[key] === "string" &&  data[key].trim() === "") {
    //           toast.warning(`Por favor completa el campo: ${key}`);
    //           return;
    //         }
    //       }

    //       try {
    //         const jsonData = {

    //             rutaImgCarrousel: data.ImagenCarousel               
    //             ,tituloMoto_1 : data.Titulo_moto_1           
    //             ,subTituloMoto_1 : data.Subtitulo_moto_1         
    //             ,motorMoto_1 : data.Motor_moto_1            
    //             ,cilindrajeMoto_1 : data.Cilindraje_moto_1       
    //             ,transmisionMoto_1 : data.Transmision_moto_1      
    //             ,descripcionMoto_1 : data.Descripcion_moto_1            
    //             ,tituloMoto_2 : data.Titulo_moto_2           
    //             ,subTituloMoto_2 :data.Subtitulo_moto_2        
    //             ,motorMoto_2 : data.Motor_moto_2             
    //             ,cilindrajeMoto_2 : data.Cilindraje_moto_2       
    //             ,maximaPotencianMoto_2 : data.Maxima_moto_2   
    //             ,arranqueMoto_2 : data.Arranque_moto_2        
    //             ,alimentacionMoto_2 : data.Alimentacion_moto_2     
    //             ,torqueMoto_2 : data.Torque_moto_2            
    //             ,bateriaMoto_2 : data.Bateria_moto_2          
    //             ,transmisionMoto_2 : data.Transmision_moto_2       
    //             ,tanqueMoto_2 : data.Tanque_moto_2           
    //             ,pesoMoto_2 : data.Peso_moto_2              
    //             ,anchoMoto_2 : data.Ancho_moto_2     
    //             ,tiempoExperiencia : data.tiempoExperiencia
    //             ,clientesFelices :data.clientesFelices      
    //             ,ventas : data.ventas
    //             ,puntosVentas: data.puntosVentas
    //             ,nit :NIT
    //         }
    //         const response = await GuardarHome(jsonData);
    //         if (!response.Error) {
    //           toast.success("Proceso ejecutado Exitosamente.")
    //         }else{
    //             toast.error(response.Mensaje);
    //         }
    //       } catch (error) {
    //         console.log(error);
    //         console.error('Error al obtener productos:', error.message);
    //       }
    // };
    const handleGuadarHome = async () => {
        const data = formDataHome;


        for (const key in data) {
            if (typeof data[key] === "string" && data[key].trim() === "") {
                toast.warning(`Por favor completa el campo: ${key}`);
                return;
            }
        }

        try {

            const formData = new FormData();
            formData.append("tituloMoto_1", data.Titulo_moto_1);
            formData.append("subTituloMoto_1", data.Subtitulo_moto_1);
            formData.append("motorMoto_1", data.Motor_moto_1);
            formData.append("cilindrajeMoto_1", data.Cilindraje_moto_1);
            formData.append("transmisionMoto_1", data.Transmision_moto_1);
            formData.append("descripcionMoto_1", data.Descripcion_moto_1);

            formData.append("tituloMoto_2", data.Titulo_moto_2);
            formData.append("subTituloMoto_2", data.Subtitulo_moto_2);
            formData.append("motorMoto_2", data.Motor_moto_2);
            formData.append("cilindrajeMoto_2", data.Cilindraje_moto_2);
            formData.append("maximaPotencianMoto_2", data.Maxima_moto_2);
            formData.append("arranqueMoto_2", data.Arranque_moto_2);
            formData.append("alimentacionMoto_2", data.Alimentacion_moto_2);
            formData.append("torqueMoto_2", data.Torque_moto_2);
            formData.append("bateriaMoto_2", data.Bateria_moto_2);
            formData.append("transmisionMoto_2", data.Transmision_moto_2);
            formData.append("tanqueMoto_2", data.Tanque_moto_2);
            formData.append("pesoMoto_2", data.Peso_moto_2);
            formData.append("anchoMoto_2", data.Ancho_moto_2);

            formData.append("tiempoExperiencia", data.tiempoExperiencia);
            formData.append("clientesFelices", data.clientesFelices);
            formData.append("ventas", data.ventas);
            formData.append("puntosVentas", data.puntosVentas);

            formData.append("nit", NIT);


            files.forEach((file) => {
                formData.append("filesCarrousel", file);
            });

            // Debug: ver lo que se envía
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            // Llamada a la API
            const response = await GuardarHome(formData);

            if (!response.Error) {
                toast.success("Proceso ejecutado exitosamente.");
            } else {
                toast.error(response.Mensaje);
            }
        } catch (error) {
            console.error("Error al guardar home:", error);
            toast.error("Error en el proceso");
        }
    };
    return (
        <>

            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <label htmlFor="formFileLg" className="form-label">Imagen Carrousel</label>
                    <input className="form-control" name="ImagenCarousel" id="ImagenCarousel" type="file" accept="image/*" multiple onChange={(e) => setFiles(Array.from(e.target.files))} />
                </div>
                {/* <div className="col-lg-1 col-md-1 col-sm-12 div__contenido__btn__add__administrador">
                    <button type="button" className="btn btn-primary btn__add__visitanos__administrador" onClick={AbrilModalTable} ><span><GrFormView /></span> </button>
                     </div> */}
                <ModalTableImagenes modalReferenciaTable={modalRefe} />
            </div>

            <div className="row">
                <h5 className="subtitulo__administrador__home">Motocileta N° 1 </h5>
                <hr />
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <label htmlFor="" className="form-label">Titulo Motocicleta</label>
                    <input type="text" className="form-control" name="Titulo_moto_1" value={formDataHome.Titulo_moto_1 || ""} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleChangeHome} />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <label htmlFor="" className="form-label">Subtitulo Motocicleta</label>
                    <input type="text" className="form-control" name="Subtitulo_moto_1" value={formDataHome.Subtitulo_moto_1 || ""} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleChangeHome} />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <label htmlFor="" className="form-label">Motor</label>
                    <input type="text" className="form-control" name="Motor_moto_1" value={formDataHome.Motor_moto_1 || ""} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleChangeHome} />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <label htmlFor="" className="form-label">Cilindraje</label>
                    <input type="text" className="form-control" name="Cilindraje_moto_1" value={formDataHome.Cilindraje_moto_1 || ""} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleChangeHome} />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <label htmlFor="" className="form-label">Transmisión</label>
                    <input type="text" className="form-control" name="Transmision_moto_1" value={formDataHome.Transmision_moto_1 || ""} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleChangeHome} />
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <label htmlFor="" className="form-label">Descripción de Motocicleta</label>
                    <textarea
                        id="comentario"
                        rows="4"
                        cols="50"
                        placeholder="Detalle de Motocicleta..."
                        className="form-control"
                        name="Descripcion_moto_1"
                        onChange={handleChangeHome}
                        value={formDataHome.Descripcion_moto_1 || ""}
                    />
                </div>

                <h5 className="subtitulo__administrador__home">Motocileta N° 2 </h5>
                <hr />
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <label htmlFor="" className="form-label">Titulo Motocicleta 2</label>
                    <input type="text" className="form-control" name="Titulo_moto_2" value={formDataHome.Titulo_moto_2 || ""} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleChangeHome} />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <label htmlFor="" className="form-label">Subtitulo Motocicleta 2</label>
                    <input type="text" className="form-control" name="Subtitulo_moto_2" value={formDataHome.Subtitulo_moto_2 || ""} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleChangeHome} />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <label htmlFor="" className="form-label">Motor</label>
                    <input type="text" className="form-control" name="Motor_moto_2" value={formDataHome.Motor_moto_2 || ""} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleChangeHome} />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <label htmlFor="" className="form-label">Cilindraje</label>
                    <input type="text" className="form-control" name="Cilindraje_moto_2" value={formDataHome.Cilindraje_moto_2 || ""} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleChangeHome} />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <label htmlFor="" className="form-label">Maxima Potencia</label>
                    <input type="text" className="form-control" name="Maxima_moto_2" value={formDataHome.Maxima_moto_2 || ""} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleChangeHome} />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12">
                    <label htmlFor="" className="form-label">Arranque</label>
                    <input type="text" className="form-control" name="Arranque_moto_2" value={formDataHome.Arranque_moto_2 || ""} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleChangeHome} />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12">
                    <label htmlFor="" className="form-label">Alimentación</label>
                    <input type="text" className="form-control" name="Alimentacion_moto_2" value={formDataHome.Alimentacion_moto_2 || ""} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleChangeHome} />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12">
                    <label htmlFor="" className="form-label">Torque</label>
                    <input type="text" className="form-control" name="Torque_moto_2" value={formDataHome.Torque_moto_2 || ""} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleChangeHome} />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12">
                    <label htmlFor="" className="form-label">Batería</label>
                    <input type="text" className="form-control" name="Bateria_moto_2" value={formDataHome.Bateria_moto_2 || ""} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleChangeHome} />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12">
                    <label htmlFor="" className="form-label">Transmisión</label>
                    <input type="text" className="form-control" name="Transmision_moto_2" value={formDataHome.Transmision_moto_2 || ""} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleChangeHome} />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12">
                    <label htmlFor="" className="form-label">Tanque</label>
                    <input type="text" className="form-control" name="Tanque_moto_2" value={formDataHome.Tanque_moto_2 || ""} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleChangeHome} />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12">
                    <label htmlFor="" className="form-label">Peso</label>
                    <input type="text" className="form-control" name="Peso_moto_2" value={formDataHome.Peso_moto_2 || ""} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleChangeHome} />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12">
                    <label htmlFor="" className="form-label">Ancho</label>
                    <input type="text" className="form-control" name="Ancho_moto_2" value={formDataHome.Ancho_moto_2 || ""} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleChangeHome} />
                </div>
                <div className="row">
                    <h5 className="subtitulo__administrador__home">Información Ventas</h5>
                    <hr />
                    <div className="col-lg-3 col-md-3 col-sm-12">
                        <label htmlFor="" className="form-label">Años Experiencia</label>
                        <input type="text" className="form-control" name="tiempoExperiencia" value={formDataHome.tiempoExperiencia || ""} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleChangeHome} />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12">
                        <label htmlFor="" className="form-label">Clientes Felices</label>
                        <input type="text" className="form-control" name="clientesFelices" value={formDataHome.clientesFelices || ""} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleChangeHome} />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12">
                        <label htmlFor="" className="form-label">Ventas</label>
                        <input type="text" className="form-control" name="ventas" value={formDataHome.ventas || ""} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleChangeHome} />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12">
                        <label htmlFor="" className="form-label">Puntos Ventas</label>
                        <input type="text" className="form-control" name="puntosVentas" value={formDataHome.puntosVentas || ""} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleChangeHome} />
                    </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 div__btn__administrador text-end">
                    <button type="button" className="btn btn-primary btn__guardar__info__administrador" onClick={handleGuadarHome}>Guardar</button>
                </div>
            </div>

        </>
    )
}

export default HomeAdministrador;