import React from "react";
import { jsonImagenCarousel } from "../../constants/constants"
import './carousel.css';
import { useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
function Carousel({ img = '' }) {
  const rutalogin = useNavigate();
  const rutas = useMemo(() => {
    
    
    try {
      if (typeof img === "string" && img.trim() !== "") {
        return JSON.parse(img); // si viene como string JSON
      }
      if (Array.isArray(img)) {
        return img; // si ya viene como array
      }
      return [];
    } catch (e) {
      console.error("Error al parsear img:", e);
      return [];
    }
  }, [img]);

  const slides = rutas.map((ruta, index) => ({
    img: ruta,
    alt: `Imagen ${index + 1}`,
  }));

  if (slides.length === 0) {
    return <p>Cargando imágenes...</p>;
  }

  const handlePagina = (ruta, seccionId = null) => {
    if (ruta === "/" && seccionId) {
      rutalogin(ruta);
      setTimeout(() => {
        const elemento = document.getElementById(seccionId);
        if (elemento) {
          elemento.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
    } else {
  
      window.scrollTo({ top: 0, behavior: "smooth" });
  
      setTimeout(() => {
        rutalogin(ruta);
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 400);
      }, 300);
    }
  };
  return (
    <div id="carouseContenido" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators" style={{ maxHeight: "550px" }}>
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouseContenido"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            {/* <img src={slide.img} className="d-block w-100 carousel__Imagen" alt={slide.alt} /> */}
            <div className="carousel-img-wrapper">
              <img
                src={slide.img}
                className="d-block w-100 carousel__Imagen"
                alt={slide.alt}
              />

              {/* BOTÓN */}
              <a
                onClick={()=>handlePagina('/cotizacion')}
                className="btn btn-primary btn-cotizar"
              > 
                Cotiza aquí
              </a>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouseContenido" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouseContenido" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  )
}

export default Carousel