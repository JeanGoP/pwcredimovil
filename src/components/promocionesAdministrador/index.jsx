import React, { useState, useEffect, useRef } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { GuardarPromociones,EliminarPromociones } from "../../services/ServicioConsumo";
import { GrView } from "react-icons/gr";
import ModalImagen from "../modalImagen";
import { toast } from "react-toastify";

const PromocionesAdministrador = ({
  getPromocionesImagenes = "",
  getTituloPromocion = "",
  getDescripcionPromocion = "",
  getTituloCardPromocion = "",
  getDescripcionCard = "",
  getDisponiblePromocion = "",
}) => {
  const url = import.meta.env.VITE_API_URL_SITE;
  const NIT = import.meta.env.VITE_API_NIT_EMPRESA;
  const [promocionesImagenes, setPromocionesImagenes] = useState([]);
  const [imagenActual, setImagenActual] = useState(null);
  const [imagenPortada, setImagenPortada] = useState(null);
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    file: null,
    preview: null,
  });

  const [formDataPromociones, setformDataPromociones] = useState({
    tituloPromociones: "",
    descripcionPromociones: "",
    tituloCard: "",
    descripcioncard: "",
    descripciondisponible: "",
    nit: NIT,
  });

  // Cargar datos iniciales
  useEffect(() => {
    setformDataPromociones({
      tituloPromociones: getTituloPromocion || "",
      descripcionPromociones: getDescripcionPromocion || "",
      tituloCard: getTituloCardPromocion || "",
      descripcioncard: getDescripcionCard || "",
      descripciondisponible: getDisponiblePromocion || "",
      nit: NIT,
    });

    if (getPromocionesImagenes) {
      try {
        const parsed =
          typeof getPromocionesImagenes === "string"
            ? JSON.parse(getPromocionesImagenes)
            : getPromocionesImagenes;

        // aseguramos que todo tenga la misma estructura
        const normalizadas = parsed.map((p) => ({
          id_promo :p.id_promo,
          titulo: p.titulo,
          descripcion: p.descripcion,
          imagen: p.imagen, // URL de la API
          file: null, // porque viene de servidor
        }));

        setPromocionesImagenes(normalizadas);
      } catch (error) {
        console.error("Error al parsear Promociones:", error);
      }
    }
  }, [
    getTituloPromocion,
    getDescripcionPromocion,
    getTituloCardPromocion,
    getDescripcionCard,
    getDisponiblePromocion,
    getPromocionesImagenes,
  ]);

  const eliminarImagen = (index, id_promo=0) => {
    const nuevas = promocionesImagenes.filter((_, i) => i !== index);
    setPromocionesImagenes(nuevas);
    if(id_promo!= 0 || id_promo != undefined){
      EliminarImg(id_promo);
    }
    //console.log(id_promo)
  };


  const mostrarModalImagen = (rutaImg) => {
    setImagenActual(rutaImg);
    const modal = new window.bootstrap.Modal(modalRef.current);
    modal.show();
  };

  const handleChangePosventa = (e) => {
    const { name, value } = e.target;
    setformDataPromociones((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImagenPortada(file);
  };

  const handleGuadarPromociones = async () => {
    const data = formDataPromociones;
  
    // Validaciones
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
  
    if (promocionesImagenes.length === 0) {
      toast.warning("Debes agregar al menos una imagen de promoción.");
      return;
    }
  
    const formDataSend = new FormData();
  
    // Datos generales
    formDataSend.append("tituloPortada", data.tituloPromociones);
    formDataSend.append("descripcionPortada", data.descripcionPromociones);
    formDataSend.append("tituloCard", data.tituloCard);
    formDataSend.append("descripcioncard", data.descripcioncard);
    formDataSend.append("descripciondisponible", data.descripciondisponible);
    formDataSend.append("nit", data.nit);
    formDataSend.append("Driverid", "b!mEzOU6FN402e5kDXM6ImwH_pVr3rflJNnoqSenwwO0C1LfVyI2YtTZA_n_j_ttK3");
    formDataSend.append("carpeta", "MOTOSABURRA_PAGEWEB");
  
    // Portada (obligatoria)
    formDataSend.append("files", imagenPortada);
    formDataSend.append("Titulos", data.tituloPromociones);
    formDataSend.append("Descripciones", data.descripcionPromociones);
    formDataSend.append("Portadas", "1");
  
    
    promocionesImagenes.forEach((promo) => {
      if (promo.file) {
        formDataSend.append("files", promo.file);
        formDataSend.append("Titulos", promo.titulo);
        formDataSend.append("Descripciones", promo.descripcion);
        formDataSend.append("Portadas", "0");
      }
    });
  
    try {
      const response = await GuardarPromociones(formDataSend);
      if (!response.Error) {
        toast.success("Promociones guardadas exitosamente.");
      } else {
        toast.error(response.Mensaje);
      }
    } catch (error) {
      console.error("Error al guardar promociones:", error);
      toast.error("Hubo un error al guardar las promociones.");
    }
  };
  const EliminarImg = async (id_promo) => {

    const formDataSend = new FormData();
    formDataSend.append("id_promocion", id_promo);
    formDataSend.append("nit", NIT);
    try {
        
      const response = await EliminarPromociones(formDataSend);
      if (!response.Error) {
        toast.success("Promocion Eliminada exitosamente.");
      } else {
        toast.error(response.Mensaje);
      }
    } catch (error) {
      console.error("Error a eliminar promociones:", error);
      toast.error("Hubo un error a eliminar promociones.");
    }
  };
  
  const handleChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChangePromocion = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        file,
        preview: URL.createObjectURL(file), // URL temporal
      });
    }
  };

  const agregarImgPromocion = () => {
    if (formData.titulo && formData.descripcion && formData.file) {
      setPromocionesImagenes([
        ...promocionesImagenes,
        {
          id_promo:0,
          titulo: formData.titulo,
          descripcion: formData.descripcion,
          imagen: formData.preview, // preview local
          file: formData.file,
        },
      ]);
      setFormData({ titulo: "", descripcion: "", file: null, preview: null });
    } else {
      toast.info("Todos los campos son obligatorios");
    }
  };

  return (
    <div>
      {/* formulario portada */}
      <div className="row">
        <div className="col-lg-12">
          <label className="form-label">Portada Promociones</label>
          <input
            className="form-control"
            name="ImagenPortadaPromociones"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="col-lg-12">
          <label className="form-label">Titulo</label>
          <input
            type="text"
            name="tituloPromociones"
            value={formDataPromociones.tituloPromociones || ""}
            onChange={handleChangePosventa}
            className="form-control"
          />
        </div>
        <div className="col-lg-12">
          <label className="form-label">Descripción</label>
          <textarea
            name="descripcionPromociones"
            rows="4"
            className="form-control"
            value={formDataPromociones.descripcionPromociones || ""}
            onChange={handleChangePosventa}
          />
        </div>
      </div>

      <h5>Imagenes de Promociones </h5>
      <hr />

      {/* formulario para agregar imagen */}
      <div className="row">
        <div className="col-lg-6">
          <label className="form-label">Titulo Imagen</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChangeInput}
            className="form-control"
          />
        </div>
        <div className="col-lg-6">
          <label className="form-label">Descripción</label>
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChangeInput}
            className="form-control"
          />
        </div>
        <div className="col-lg-11">
          <label className="form-label">Imagen</label>
          <input
            className="form-control"
            type="file"
            accept="image/*"
            onChange={handleFileChangePromocion}
          />
        </div>
        <div className="col-lg-1 d-flex align-items-end">
          <button
            type="button"
            className="btn btn-success"
            onClick={agregarImgPromocion}
          >
            +
          </button>
        </div>
      </div>

      {/* tabla de imágenes */}
      <div className="row">
        <div className="col-lg-12">
          <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th style={{ textAlign: "center" }}>Nombre</th>
                  <th style={{ textAlign: "center" }}>Descripcion</th>
                  <th style={{ textAlign: "center" }}>Ver</th>
                  <th style={{ textAlign: "center" }}>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {promocionesImagenes.map((promocion, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{promocion.titulo}</td>
                    <td>{promocion.descripcion}</td>
                    <td style={{ textAlign: "center" }}>
                      <GrView
                        title="Ver Promoción"
                        style={{ cursor: "pointer", color: "#0d6efd" }}
                        onClick={() => mostrarModalImagen(promocion.imagen)}
                      />
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <RiDeleteBinLine
                        title="Eliminar"
                        style={{ cursor: "pointer" }}
                        onClick={() => eliminarImagen(index, promocion.id_promo)}
                      />
                    </td>
                  </tr>
                ))}
                {promocionesImagenes.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No hay Imagenes registradas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* botón guardar */}
      <div className="text-end">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleGuadarPromociones}
        >
          Guardar
        </button>
      </div>

      <ModalImagen urlImagen={imagenActual} modalRef={modalRef} />
    </div>
  );
};

export default PromocionesAdministrador;
