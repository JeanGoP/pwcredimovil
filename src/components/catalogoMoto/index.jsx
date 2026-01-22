import React, { useContext, useEffect, useState, useRef, useMemo } from 'react';
import './catalogoMoto.css';
import CardMarcaMoto from '../../components/cardMarcaMoto';
import CardMotocicleta from '../../components/cardMotocicleta';
import { jsonCardMarcasMotos } from '../../constants/constants';
import { LanguageContext } from '../../context/context';
import { Fragment } from 'react';
import { LuPanelBottomClose } from "react-icons/lu";
import { motion, AnimatePresence } from 'framer-motion';
import { MdFilterAltOff } from "react-icons/md";
import CardDetalle from '../cardDetalle';
import { useNavigate } from 'react-router-dom';

const CatalogoMoto = ({ ColorTitulo, colorPagina }) => {
  const { productos, segmentos, productoSeleccionado, setProductoSeleccionado } = useContext(LanguageContext);
  const { filtroInicial, setFiltroInicial } = useContext(LanguageContext);
  const imagenLogo = [
    { nombre: 'Arranque', ruta: '/images/arranque.png' },
    { nombre: 'Cilindrada', ruta: '/images/cilindraje.png' },
    { nombre: 'Equipo de encendido', ruta: '/images/encendido.png' },
    { nombre: 'Freno delantero', ruta: '/images/frenos.png' },
    { nombre: 'Freno trasero', ruta: '/images/frenos.png' },
    { nombre: 'Motor', ruta: '/images/motor.png' },
    { nombre: 'Potencia', ruta: '/images/potencia.png' },
    { nombre: 'Potencia Máxima', ruta: '/images/potencia.png' },
    { nombre: 'Suspensión delantera', ruta: '/images/suspension.png' },
    { nombre: 'Suspensión trasera', ruta: '/images/suspension.png' },
    { nombre: 'Torque', ruta: '/images/torque.png' },
    { nombre: 'Torque Máximo', ruta: '/images/torque.png' },
    { nombre: 'Peso En Seco', ruta: '/images/peso.png' },
    { nombre: 'Refrigeración', ruta: '/images/refrigeracion.png' },
    { nombre: 'Transmisión', ruta: '/images/transmision.png' },
  ]

  const [marcaFiltro, setMarcaFiltro] = useState('');
  const [cilindrajeFiltro, setCilindrajeFiltro] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [cantidadMostrar, setCantidadMostrar] = useState(8);
  const [segmentoFiltro, setSegmentoFiltro] = useState('');
  const productosRef = useRef(null);
  const [colorSeleccionado, setColorSeleccionado] = useState(null);
  const carouselRef = useRef(null);
  const [verTodasFicha, setVerTodasFicha] = useState(false);
  const fichaCarouselRef = useRef(null);
  const [mostrarFlechas, setMostrarFlechas] = useState(false);
  const navigate = useNavigate();

  const autoScrollRef = useRef(null);
  const marcasUnicas = useMemo(() => {

    return [...new Set(productos.map((p) => p.marca_nombre))];
  }, [productos]);

  const cilindrajesUnicos = useMemo(() => {
    return [
      ...new Set(
        productos
          .map((p) => p.ficha_tecnica?.find((i) => i.ficha_tecnica_name === 'Cilindrada')?.ficha_tecnica_detalle)
          .filter(Boolean)
      ),
    ];
  }, [productos]);

  const productosFiltrados = useMemo(() => {
    return productos.filter((producto) => {
      if (producto.lista_precio_id !== "1") return false;

      const anioActual = new Date().getFullYear();
      const precio = Number(producto.precio?.[anioActual]) || 0;
      const cilindrada = producto.ficha_tecnica?.find((i) => i.ficha_tecnica_name === 'Cilindrada')?.ficha_tecnica_detalle || '';
      const segmento = producto.segmento?.[0] || '';

      return (
        (!marcaFiltro || producto.marca_nombre === marcaFiltro) &&
        (!cilindrajeFiltro || cilindrada === cilindrajeFiltro) &&
        (!precioMin || precio >= Number(precioMin)) &&
        (!precioMax || precio <= Number(precioMax)) &&
        (!segmentoFiltro || segmento.toUpperCase() === segmentoFiltro.toUpperCase())
      );
    });
  }, [productos, marcaFiltro, cilindrajeFiltro, precioMin, precioMax, segmentoFiltro]);

  const productosParaMostrar = useMemo(() => {
    return productosFiltrados.slice(0, cantidadMostrar);
  }, [productosFiltrados, cantidadMostrar]);

  const sugerencias = useMemo(() => {
    return [...productos].sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [productos]);

  const cargarMas = () => {
    setCantidadMostrar((prev) => prev + 8);
  };

  useEffect(() => {
    setCantidadMostrar(8);
    setSegmentoFiltro('');

  }, [marcaFiltro, cilindrajeFiltro, precioMin, precioMax]);
  useEffect(() => {
    if (cantidadMostrar > 8) {
      productosRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [cantidadMostrar]);

  useEffect(() => {
    if (filtroInicial) {

      setMarcaFiltro(filtroInicial.toUpperCase());

      setTimeout(() => {
        const catalogo = document.getElementById('catalogo-motos');
        if (catalogo) catalogo.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);

      setFiltroInicial('');
    }
  }, [filtroInicial]);



  const limpiarFiltros = () => {
    setMarcaFiltro('');
    setCilindrajeFiltro('');
    setPrecioMin('');
    setPrecioMax('');
    setSegmentoFiltro('');
    setCantidadMostrar(8);
  };


  const scrollColores = (direction) => {
    const scrollAmount = 60 * 2; 
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };



  const scrollFicha = (dir) => {
    pauseAutoScroll();

    const el = fichaCarouselRef.current;
    if (!el) return;

    const scrollAmount = 250;

    el.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!productoSeleccionado?.ficha_tecnica?.length) return;

    const el = fichaCarouselRef.current;
    if (!el) return;

    setMostrarFlechas(el.scrollWidth > el.clientWidth);
  }, [productoSeleccionado]);

  useEffect(() => {
    if (!productoSeleccionado?.ficha_tecnica?.length) return;

    const el = fichaCarouselRef.current;
    if (!el) return;

    const scrollStep = 1;      // velocidad
    const intervalTime = 20;   // suavidad

    autoScrollRef.current = setInterval(() => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 5) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollLeft += scrollStep;
      }
    }, intervalTime);

    return () => clearInterval(autoScrollRef.current);
  }, [productoSeleccionado]);

  const pauseAutoScroll = () => {
    clearInterval(autoScrollRef.current);
  };

 
  const resumeAutoScroll = () => {
    if (!productoSeleccionado?.ficha_tecnica?.length) return;
  };

  const handleCotizacion = () => {

    localStorage.setItem('producto',productoSeleccionado.producto_id)
    setProductoSeleccionado(null);
    navigate("/cotizacion");
    
}

  return (
    <div className="container mt-4">
      <div className="row row__CatalogoMoto" style={{ backgroundColor: colorPagina }}>
        <p className="Titlulo__CatalogoMoto">MOTOCICLETAS</p>
        {segmentos.map((item) => {
          const cardInfo = jsonCardMarcasMotos.find((moto) => moto.titulo.toUpperCase() === item.segmento_nombre.toUpperCase());
          return (
            <CardMarcaMoto
              key={item.segmento_id}
              Titulo={item.segmento_nombre}
              Descripcion={cardInfo?.descripcion || 'Descripción no disponible'}
              Imagen={cardInfo?.imagen || '/images/platino.jpg'}
              onClick={() => {
                setSegmentoFiltro(item.segmento_nombre);
                setTimeout(() => {
                  productosRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 200);
              }}
            />
          );
        })}
      </div>

      <div className="text-end container-fluid mb-3">
        <AnimatePresence>
          {(marcaFiltro || cilindrajeFiltro || precioMin || precioMax || segmentoFiltro) && (
            <motion.button
              key="btn-quitarfiltro"
              className="btn btn-default btn__quitarfiltro"
              title="Quitar Filtro"
              onClick={limpiarFiltros}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 0.4,
              }}
            >
              <MdFilterAltOff />
            </motion.button>
          )}
        </AnimatePresence>
        <button className="btn btn-primary btnfiltros" data-bs-toggle="modal" data-bs-target="#filtroModal">
          Mostrar Filtros
        </button>
      </div>

      <div className="modal fade" id="filtroModal" tabIndex="-1" aria-labelledby="filtroModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="filtroModalLabel">
                Filtrar Motocicletas
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Marca</label>
                <select className="form-select" value={marcaFiltro} onChange={(e) => setMarcaFiltro(e.target.value)}>
                  <option value="">Todas</option>
                  {marcasUnicas.map((marca, idx) => (
                    <option key={idx} value={marca}>
                      {marca}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Cilindraje</label>
                <select className="form-select" value={cilindrajeFiltro} onChange={(e) => setCilindrajeFiltro(e.target.value)}>
                  <option value="">Todos</option>
                  {cilindrajesUnicos.map((cil, idx) => (
                    <option key={idx} value={cil}>
                      {cil}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Precio mínimo</label>
                <input type="number" className="form-control" value={precioMin} onChange={(e) => setPrecioMin(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Precio máximo</label>
                <input type="number" className="form-control" value={precioMax} onChange={(e) => setPrecioMax(e.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">
                Aplicar filtros
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row" ref={productosRef} style={{ marginBottom: "20px" }} id="catalogo-motos">
        {productosParaMostrar.length > 0 ? (
          productosParaMostrar.map((producto, index) => {
            const cilindrada = producto.ficha_tecnica?.find((i) => i.ficha_tecnica_name === 'Cilindrada')?.ficha_tecnica_detalle || 'No disponible';

            return (
              <CardMotocicleta
                key={index}
                Imagen={producto.imagen_portada}
                Cilindraje={cilindrada}
                Modelo={(() => {
                  const precios = producto.precio || {};
                  const añosDisponibles = Object.keys(precios)
                    .map(Number)
                    .filter((año) => precios[año]);

                  if (añosDisponibles.length === 0) {
                    return 'No disponible';
                  }

                  const añoMasReciente = Math.max(...añosDisponibles);
                  return añoMasReciente;
                })()}
                NombreProducto={producto.producto_nombre}
                Precio={(() => {
                  const precios = producto.precio || {};
                  const añosDisponibles = Object.keys(precios)
                    .map(Number)
                    .filter((año) => precios[año]);

                  if (añosDisponibles.length === 0) {
                    return 'No Disponible';
                  }

                  const añoMasReciente = Math.max(...añosDisponibles);
                  const precio = precios[añoMasReciente];

                  return ` ${Number(precio).toLocaleString('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0,
                  })}`;
                })()}
                Marca={producto.marca_nombre}
                producto={producto}
              />
            );
          })
        ) : (
          <div className="col-12 text-center">
            <p className="text-danger fw-bold mt-4">No hay resultados según el filtro, pero te sugerimos estas motocicletas:</p>
            <div className="row justify-content-center">
              {sugerencias.map((producto, index) => {
                const anioActual = new Date().getFullYear();
                const precio = producto.precio?.[anioActual];
                const precioFormateado = precio
                  ? Number(precio).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })
                  : 'Precio no disponible';

                const cilindrada = producto.ficha_tecnica?.find((i) => i.ficha_tecnica_name === 'Cilindrada')?.ficha_tecnica_detalle || 'No disponible';

                return (
                  // <div onClick={() => setProductoSeleccionado(producto)}>
                  <CardMotocicleta
                    key={index}
                    Imagen={producto.imagen_portada}
                    Cilindraje={cilindrada}
                    Modelo="2022"
                    NombreProducto={producto.producto_nombre}
                    Precio={(() => {
                      const precios = producto.precio || {};
                      const añosDisponibles = Object.keys(precios)
                        .map(Number)
                        .filter((año) => precios[año]);

                      if (añosDisponibles.length === 0) {
                        return 'Precio No Disponible';
                      }

                      const añoMasReciente = Math.max(...añosDisponibles);
                      const precio = precios[añoMasReciente];

                      return `${Number(precio).toLocaleString('es-CO', {
                        style: 'currency',
                        currency: 'COP',
                        minimumFractionDigits: 0,
                      })}`;
                    })()}
                    Marca={producto.marca_nombre}
                    producto={producto}
                  />
                  //  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {productosParaMostrar.length > 0 && productosParaMostrar.length < productosFiltrados.length && (
        <div className="text-center mt-4">
          <button className="btn btn-outline-primary btn__mostrarMas" onClick={cargarMas}>
            <LuPanelBottomClose />  CARGAR MÁS VEHÍCULOS
          </button>
        </div>
      )}
      <AnimatePresence>
        {productoSeleccionado && (
          <motion.div
            key="modal-backdrop"
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <motion.div
              key="modal-dialog"
              className="modal-dialog modal-dialog-centered contenidoModalMoto"
              role="document"
              initial={{ y: -40, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -40, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              style={{ maxWidth: "95vw" }}
            >
              <motion.div
                key="modal-content"
                className="modal-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ borderRadius: "12px", overflow: "hidden", border: "none" }}
              >
                <div
                  className="modal-header"
                  style={{ backgroundColor: "#f8f9fa", borderBottom: "1px solid #dee2e6" }}
                >
                  <h5 className="modal-title fw-bold">{productoSeleccionado.producto_nombre}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setProductoSeleccionado(null)}
                  ></button>
                </div>

                <div className="modal-body" style={{ padding: "20px" }}>
                  <div className="container-fluid">
                    <div className="row g-4 align-items-stretch">
                      {/* Imagen del producto */}
                      <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center">
                        <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-white rounded shadow-sm p-3">
                          <img
                            src={productoSeleccionado.imagen_portada}
                            alt={productoSeleccionado.producto_nombre}
                            className="img-fluid rounded"
                            style={{
                              maxHeight: "400px",
                              objectFit: "contain",
                              width: "100%",
                            }}
                          />
                        </div>
                      </div>

                      {/* Información del producto */}
                      <div className="col-12 col-lg-6 d-flex">
                        <div className="p-4 bg-light rounded shadow-sm w-100 d-flex flex-column justify-content-between">
                          {/* Sección superior: marca, referencia y descripción */}
                          <div>
                            <div className="mb-2 d-flex justify-content-between">
                              <span className='spanModalMoto_nombre'>{productoSeleccionado.marca_nombre}</span>
                            </div>

                            <div className="mb-2 d-flex justify-content-between">
                              <span className='spanModalMoto_referencia'>{productoSeleccionado.referencia}</span>
                            </div>
                            {/* 
                            {productoSeleccionado.color?.length > 0 && (
                              <div className="mb-4 mt-4">
                                <div className="motoObjeto-colores">
                             
                                  <div className="colores-grid">
                                    {productoSeleccionado.color.map((c, i) => (

                                      <button
                                        key={i}
                                        className={`color-btn ${colorSeleccionado === i ? "activo" : ""}`}
                                        onClick={() => setColorSeleccionado(i)}
                                      >
                                        <div className="color-info">
                                          <span
                                            className="color-circle"
                                            style={{
                                              background: c.color_code?.startsWith("linear")
                                                ? c.color_code
                                                : c.color_code || "#fff"
                                            }}
                                            title={c.color_name}
                                          ></span>
                                        </div>

                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )} */}

                            {productoSeleccionado.color?.length > 0 && (
                              <div className="" style={{ paddingTop: '15px' }}>
                                <p className='' >COLORES DISPONIBLES</p>
                                <div className="motoObjeto-colores">

                                  {productoSeleccionado.color.length > 5 && (
                                    <>
                                      <button
                                        className="carousel-btn left"
                                        onClick={() => scrollColores("left")}
                                      >
                                        ‹
                                      </button>
                                      <button
                                        className="carousel-btn right"
                                        onClick={() => scrollColores("right")}
                                      >
                                        ›
                                      </button>
                                    </>
                                  )}

                                  <div className="colores-carousel" ref={carouselRef}>
                                    {productoSeleccionado.color.map((c, i) => (
                                      <button
                                        key={i}
                                        className={`color-btn ${colorSeleccionado === i ? "activo" : ""}`}
                                        onClick={() => setColorSeleccionado(i)}
                                        title={c.color_name}
                                      >
                                        <span
                                          className="color-circle"
                                          style={{
                                            background: c.color_code?.startsWith("linear")
                                              ? c.color_code
                                              : c.color_code || "#fff",
                                          }}
                                        />
                                      </button>
                                    ))}
                                  </div>

                                </div>
                              </div>
                            )}

                          </div>

                          {/* Sección inferior: precio */}
                          <div className="d-flex justify-content-center align-items-center" style={{ paddingTop: '20px' }}>
                            <div className="motoObjeto-precio text-center">
                              <h4>
                                {(() => {
                                  const precios = productoSeleccionado.precio || {};
                                  const añosDisponibles = Object.keys(precios)
                                    .map(Number)
                                    .filter((año) => precios[año]);

                                  if (añosDisponibles.length === 0)
                                    return "Precio No Disponible";

                                  const añoMasReciente = Math.max(...añosDisponibles);
                                  const precio = precios[añoMasReciente];
                                  return `${añoMasReciente}: ${Number(precio).toLocaleString(
                                    "es-CO",
                                    {
                                      style: "currency",
                                      currency: "COP",
                                      minimumFractionDigits: 0,
                                    }
                                  )}`;
                                })()}
                              </h4>
                              <p>
                                Precio • No incluye matrícula, gastos administrativos, ni SOAT!
                              </p>
                            </div>
                          </div>
                          <div className="d-flex justify-content-center align-items-center">
                            <div className="motoObjeto-botones">
                              <button className="btn btn-rojo--contac" onClick={()=> handleCotizacion()}>Quiero Esta Moto!</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* {productoSeleccionado.ficha_tecnica?.length > 0 && (
                    <div className="mb-4" style={{ paddingTop: "50px" }}>
                      <div className="row g-3">
                        {productoSeleccionado.ficha_tecnica
                          .slice(0, verTodasFicha ? productoSeleccionado.ficha_tecnica.length : 6)
                          .map((item, idx) => {
                            const icono =
                              imagenLogo.find(
                                (img) =>
                                  img.nombre.trim().toLowerCase() ===
                                  item.ficha_tecnica_name.trim().toLowerCase()
                              ) || { ruta: "/images/torque.png" };

                            return (
                              <div className="col-6 col-md-6 col-lg-3 col-xl-2" key={idx}>
                                <CardDetalle
                                  titulo={item.ficha_tecnica_name}
                                  contenido={
                                    item.ficha_tecnica_detalle
                                      ? item.ficha_tecnica_detalle
                                        .toLowerCase()
                                        .replace(/^\w/, (c) => c.toUpperCase())
                                      : ""
                                  }
                                  icono={icono.ruta}
                                />
                              </div>
                            );
                          })}
                      </div>

                      {productoSeleccionado.ficha_tecnica.length > 8 && (
                        <div className="text-center mt-4">
                          <button
                            className="btn btn-link fs-4"
                            onClick={() => setVerTodasFicha(!verTodasFicha)}
                          >
                            {verTodasFicha ? "▲" : "…"}
                          </button>
                        </div>
                      )}
                    </div>
                  )} */}
                  {productoSeleccionado?.ficha_tecnica?.length > 0 && (
                    <div className="mb-4" style={{ paddingTop: "50px" }}>
                      <div style={{ position: "relative" }}>

                        {mostrarFlechas && (
                          <>
                            <button
                              className="carousel-btn leftf"
                              onClick={() => scrollFicha("left")}
                            >
                              ‹
                            </button>

                            <button
                              className="carousel-btn rightf"
                              onClick={() => scrollFicha("right")}
                            >
                              ›
                            </button>
                          </>
                        )}

                        <div
                          className="ficha-carousel"
                          ref={fichaCarouselRef}
                          onMouseEnter={pauseAutoScroll}
                          onMouseLeave={resumeAutoScroll}
                          onTouchStart={pauseAutoScroll}
                        >
                          {productoSeleccionado.ficha_tecnica.map((item, idx) => {
                            const icono =
                              imagenLogo.find(
                                (img) =>
                                  img.nombre.trim().toLowerCase() ===
                                  item.ficha_tecnica_name.trim().toLowerCase()
                              ) || { ruta: "/images/torque.png" };

                            return (
                              <div className="ficha-item" key={idx}>
                                <CardDetalle
                                  titulo={item.ficha_tecnica_name}
                                  contenido={
                                    item.ficha_tecnica_detalle
                                      ? item.ficha_tecnica_detalle
                                        .toLowerCase()
                                        .replace(/^\w/, (c) => c.toUpperCase())
                                      : ""
                                  }
                                  icono={icono.ruta}
                                />
                              </div>
                            );
                          })}
                        </div>

                      </div>
                    </div>
                  )}


                </div>

                <div className="modal-footer" style={{ borderTop: "1px solid #dee2e6" }}>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setProductoSeleccionado(null)}
                    style={{ background: "#0e60ad", color: "white", border: "none" }}
                  >
                    Cerrar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CatalogoMoto;
