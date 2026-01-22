import React, { useState,useEffect  } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import './visitanosAdministrador.css'
import { GuardarSucursales } from "../../services/ServicioConsumo";
const VisitanosAdministrador = ({getRutaGoogle, getSucursales, getColorCard, getColorLetras}) => {
    const NIT = import.meta.env.VITE_API_NIT_EMPRESA;
    const [rutaGoogle, setRutaGoogle] = useState("");
    const [colorCard, setColorCard] = useState("");
    const [colorLetras, setColorLetras] = useState("");
    const [sucursales, setSucursales] = useState([]);
    const [imagenPortada, setImagenPortada] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        direccion: '',
        telefono: '',
        rutaSucursalGoogle: ''
    });
       // Cargar datos iniciales
       useEffect(() => {
        if (getRutaGoogle) {
            setRutaGoogle(getRutaGoogle);
        }
        if (getSucursales) {
            try {
                const parsed = typeof getSucursales === 'string' ? JSON.parse(getSucursales) : getSucursales;
                setSucursales(parsed);
            } catch (err) {
                console.error("Error al parsear sucursales:", err);
            }
        }
        if(getColorCard){
            setColorCard(getColorCard)
        }
        if(getColorLetras){
            setColorLetras(getColorLetras)
        }
    }, [getRutaGoogle, getSucursales, getColorCard,getColorLetras]);

    const handleChangeInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleChangeRutaGoogle =(e)=>{
        setRutaGoogle(e.target.value);
    }
    const handleChangeColorCard =(e)=>{
        setColorCard(e.target.value);
    }
    const handleChangeColorLetra =(e)=>{
        setColorLetras(e.target.value);
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImagenPortada(file);
      };
    
    const agregarSucursal = () => {
        if (formData.nombre && formData.direccion && formData.telefono && formData.rutaSucursalGoogle) {
            setSucursales([...sucursales, formData]);
            setFormData({ nombre: '', direccion: '', telefono: '', rutaSucursalGoogle:'' });
        } else {
            toast.info('Todos los campos son obligatorios');
        }
    };
    const eliminarSucursal = (index) => {
        const nuevas = sucursales.filter((_, i) => i !== index);
        setSucursales(nuevas);
    };
    const handleGuardarSucursales = async () =>{
        if(!rutaGoogle.trim()){
            toast.info("La ruta de Google Maps es obligatoria.");
            return;
        }
        if (sucursales.length === 0) {
            toast.info("Debe agregar al menos una sucursal");
            return;
        }
        if (!imagenPortada) {
            toast.warning("Por favor selecciona una imagen de portada.");
            return;
          }
          const formData = new FormData();
          formData.append("nit", NIT);
          formData.append("rutaGoogleMaps", rutaGoogle);
          formData.append("colorCard", colorCard);
          formData.append("colorLetras", colorLetras);
          formData.append("sucursales", JSON.stringify(sucursales));
          formData.append("files", imagenPortada);
          formData.append("Driverid", "b!mEzOU6FN402e5kDXM6ImwH_pVr3rflJNnoqSenwwO0C1LfVyI2YtTZA_n_j_ttK3");
          formData.append("carpeta", "MOTOSABURRA_PAGEWEB");
          formData.append("nombrePortada", imagenPortada.name);
        // const jsonSucursal = {
        //     nit:NIT,
        //     rutaGoogleMaps : rutaGoogle,
        //     colorCard : colorCard,
        //     colorLetras : colorLetras, 
        //     sucursales :JSON.stringify(sucursales)
        // }
        try {
           // console.log(jsonSucursal)
            //const response = await GuardarSucursales(jsonSucursal);
            const response = await GuardarSucursales(formData);
            if (!response.Error) {
              toast.success("Proceso ejecutado Exitosamente.")
            }else{
                toast.error(response.Mensaje);
            }
          } catch (error) {
            console.log(error);
            console.error('Error al obtener productos:', error.message);
          }
    }
    return (
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12">
                    <label htmlFor="" className="form-label">Portada Visitanos</label>
                    <input className="form-control" name="ImagenPortadaSucursal"  type="file" accept="image/*"  />
             </div>
             <div className="col-lg-4 col-md-4 col-sm-12">
                <label htmlFor="" className="form-label">Color Fondo Card</label>
                <input type="color" name="colorCard" className="form-control form-control-lg" value={colorCard || ""} onChange={handleChangeColorCard} aria-label="Sizing example input" aria-describedby="inputGroup-sizing" />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
                <label htmlFor="" className="form-label">Color Letras Card</label>
                <input type="color" name="colorLetras" className="form-control form-control-lg" value={colorLetras || ""} onChange={handleChangeColorLetra} aria-label="Sizing example input" aria-describedby="inputGroup-sizing" />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12">
                <label htmlFor="" className="form-label">Ruta Google Maps</label>
                <input type="text" name="rutaGoogle" value={rutaGoogle} onChange={handleChangeRutaGoogle} className="form-control " aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
            </div>
            <h5 className="subtitulo__administrador__home">Rutas de Sucursales </h5>
            <hr />
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <label htmlFor="" className="form-label">Nombre</label>
                    <input type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChangeInput}
                        className="form-control "
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg" />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <label htmlFor="" className="form-label">Dirección</label>
                    <input type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChangeInput}
                        className="form-control "
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg" />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <label htmlFor="" className="form-label">Telefono</label>
                    <input type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChangeInput}
                        className="form-control "
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg" />
                </div>
                <div className="col-lg-11 col-md-11 col-sm-12">
                    <label htmlFor="" className="form-label">Ruta Google</label>
                    <input type="text"
                        name="rutaSucursalGoogle"
                        value={formData.rutaSucursalGoogle}
                        onChange={handleChangeInput}
                        className="form-control "
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg" />
                </div>
                <div className="col-lg-1 col-md-1 col-sm-12 div__contenido__btn__add__administrador">
                    <button type="button" className="btn btn-success btn__add__visitanos__administrador" onClick={agregarSucursal} title="Agregar Sucursal">+</button>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                <div style={{ maxHeight: '40vh', overflowY: 'auto' }}>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Dirección</th>
                                <th scope="col">Telefono</th>
                                <th scope="col">Ruta Google</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {sucursales.map((sucursal, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{sucursal.nombre}</td>
                                    <td>{sucursal.direccion}</td>
                                    <td>{sucursal.telefono}</td>
                                    <td>{sucursal.rutaSucursalGoogle}</td>
                                    <td>
                                        <RiDeleteBinLine
                                            title="Eliminar"
                                            className="delete__table__rutas"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => eliminarSucursal(index)}
                                        />
                                    </td>
                                </tr>
                            ))}
                            {sucursales.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center">No hay sucursales registradas.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
               </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 div__btn__administrador text-end">
                <button type="button" className="btn btn-primary btn__guardar__info__administrador" onClick={handleGuardarSucursales}>Guardar</button>
            </div>
           
        </div>
    )
}
export default VisitanosAdministrador;