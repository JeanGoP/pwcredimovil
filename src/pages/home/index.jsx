import React, { useContext } from 'react';
import Carousel from '../../components/carousel';
import CardTecnologia from '../../components/cardTecnologia';
import {
  jsonCardTecnologia,
  jsonSeccionMotoDetallada,
  jsonBarraPorcentaje,
  jsonSeccionBarraPorcentaje,
  jsonTituloSeccionBarraPorcentaje,
  jsonDescripcionTecnica,
  jsonLinkMarcas,
  jsonCardMarcasMotos
} from '../../constants/constants';
import SeccionMotoDetallada from '../../components/seccionMotoDetallada';
import BarraPorcentaje from '../../components/barraPorcentaje';
import SeccionBarraPorcentaje from '../../components/seccionBarraPorcentaje';
import TituloSeccionBarraPorcentaje from '../../components/tituloSeccionBarraPorcentaje';
import DescripcionSeccionBarraPorcentaje from '../../components/descripcionSeccionBarraPorcentaje';
import VideoPublicitario from '../../components/videoPublicitario';
import MarcasPublicitarias from '../../components/marcasPublicitaria';
import CatalogoMoto from '../../components/catalogoMoto';
import './home.css';
import { LanguageContext } from '../../context/context';
import CarruselAliados from './carousel';
import AnimatedCounter from './animator';
import { useEffect } from 'react';
import CardMarcaMoto from '../../components/cardMarcaMoto';

export function Home() {
  const NIT = import.meta.env.VITE_API_NIT_EMPRESA;
  const { configuracionData = [],getCofiguracion } = useContext(LanguageContext);
  useEffect(() => {
    if (configuracionData) {
      getCofiguracion(NIT, 'Token', 'nit', 'USERFINALLY');
     // console.log(configuracionData)
    }
  }, []);

  const textoCompleto = configuracionData?.descripcionMoto_1 || '';
  const mitad = Math.floor(textoCompleto.length / 2);
  let puntoDivision = textoCompleto.indexOf(' ', mitad);
  if (puntoDivision === -1) puntoDivision = mitad;

  const descripcion1 = textoCompleto.slice(0, puntoDivision).trim();
  const descripcion2 = textoCompleto.slice(puntoDivision).trim();

  const jsonItemsTecnicos = [
    {
      titulo: 'Arranque',
      descripcion: 'Eléctrico',
    },
    {
      titulo: 'Alimentación',
      descripcion: 'Inyección Electrónica',
    },
    {
      titulo: 'Torque máximo',
      descripcion: '18.6 N.m @ 8000 rpm',
    },
    {
      titulo: 'Batería',
      descripcion:  '12 V, 8 Ah, VRLA',
    },
    {
      titulo: 'Transmisión',
      descripcion:  '6 Velocidades',
    },
    {
      titulo: 'Capacidad del Tanque',
      descripcion: '12 L',
    },
    {
      titulo: 'Peso',
      descripcion: '155 Kg',
    },
    {
      titulo: 'Ancho',
      descripcion:  '803.5 mm',
    },
  ];

  const scrollToCatalogoMoto = () => {
    const section = document.getElementById("contenidoMotocicleta");
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",  // top
      });
    }
  };
  return (
    // <div style={{ background: configuracionData?.colorPagina }}>
    <div style={{ background: "#eeeeee"}}>
      <div className="contenedor__imagen__HomePulsar"
          style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)), url('${configuracionData?.rutaPortadaHome}')`
                 }}
      >
        <div className='contenedor__texto__HomePulsar'>
            <p>
              MÁS POTENTE
            </p>
            <p>
              LIGERA Y RECARGADA
            </p>
        </div>
        <div className='contenedor__images__HomePulsar'>
          <img src='/images/logopulsarns.png'></img>
          <img src='/images/logopulsarns2.png'></img>
        </div>
        <div className="btn__imagen__HomePulsar">
          <button type="button" className="btn__HomePulsar" onClick={scrollToCatalogoMoto}>
            VER MÁS
          </button>
        </div>
      </div>

      <div className='container-fluid'>
      <div className="row justify-content-center">
          <div className="col-12 div__carousel__Home">
            <Carousel  img = {configuracionData?.rutaImgCarrousel|| ''}/>
          </div>
        </div>
      </div>
      <div>
      <main className="container">


        <div className="row row__pioneros__home text-center my-5">
          <p className="pioneros__home" style={{ color: configuracionData?.colorCuerpo }}>
            Pioneros en
          </p>
          <p className="tecnologia__home" style={{ color: configuracionData?.colorTituloHome }}>
            TECNOLOGÍA EFICIENTE Y ACCESIBLE
          </p>
        </div>

        <div className="row g-4">
          {jsonCardTecnologia.map((item, idx) => (
            <CardTecnologia
              key={item.id || idx}
              Titulo={item.titulo}
              Texto={item.texto}
              Imagen={item.imagen}
              // Color={configuracionData?.colorCuerpo}
              Color={'#0e60ad'}
              // ColorFondo={configuracionData?.colorPagina}
              ColorFondo={"#eeeeee"}
            />
          ))}
        </div>
        <div className="row div__padding__centro my-5" style={{ position: 'relative' }}>
          {/* {jsonSeccionMotoDetallada.map((item, idx) => ( */}
          <SeccionMotoDetallada
            key="UYTZ"
            ImagenMoto="/images/motoSeccion.jpg"
            Titulo='La mejor sport tourer'
            Subtitulo='DOMINAR 400 TERRA'
            Descripcion_1='Creada para devorar kilómetros en todo tipo de terrenos, equipada para todo tipo de batallas, en la Dominar 400 Terra encontraras todo tipo de comodidad gracias a sus múltiples accesorios pensados en mejorar'
            Descripcion_2='la calidad de tus aventuras. La Dominar 400 Terra simplemente se convertirá en esa extensión de tu espíritu aventurero llevándote a las mejores rodadas de tu vida con comodidad, potencia, y seguridad.'
            Transmision='6 velocidades'
            Cilindraje='373.27 cc'
            Motor='4 tiempos, Monocilíndrico, DOHC'
            ColorTitulo={configuracionData?.colorTituloHome || ''}
            ColorCuerpo={configuracionData?.colorCuerpo || ''}
          />
          {/* ))} */}
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            width: '100%',
            backgroundColor: configuracionData?.colorFranja || '#222',
            color: 'white',
            padding: '1rem',
            zIndex: 999,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '100%',
              maxWidth: '1200px',
            }}
          >
            <AnimatedCounter target={configuracionData?.tiempoExperiencia || 0} suffix="+" label="Años de Experiencia" />
            <AnimatedCounter target={configuracionData?.clientesFelices || 0} suffix="+" label="Clientes Felices" />
            <AnimatedCounter target={configuracionData?.ventas || 0} suffix="+" label="Ventas" />
            <AnimatedCounter target={configuracionData?.puntosVentas || 0} label="Puntos de Venta" />
          </div>
        </div>
        </main> 
        <div style={{background:"white"}}>
          <div className='container-fluid contenidoCatalogoMoto'>

        <div className="row mb-5" style={{ marginTop: '200px'}} id='contenidoMotocicleta'>
          <CatalogoMoto ColorTitulo={configuracionData?.colorTituloHome || ''} ColorPagina={configuracionData?.colorPagina || ''} />
        </div>
        </div>
        </div>
        <div style={{background:"#eeeeee"}}>
        <div className='container'>
        <div className="row align-items-center mb-5">
          <div className="col-lg-6 col-md-6 col-sm-12 mb-4 mb-md-0">
            <img src="/images/pulsarns200.png" alt="Moto Pulsar NS200" className="img-fluid " style={{ width: '100%', height: 'auto' }} />
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12">
            <TituloSeccionBarraPorcentaje
              Titulo='DEPORTIVA'
              Subtitulo='PULSAR NS 200 FI ABS'
              ColorSubtiutlo={configuracionData?.colorTituloHome || ''}
              ColorCuerpo={configuracionData?.colorCuerpo || ''}
            />

            <div className="row gy-3 my-3">
              {jsonBarraPorcentaje.map((item, idx) => (
                <BarraPorcentaje
                  key={item.id || idx}
                  porcentaje={item.porcentaje}
                  color={item.color}
                  titulo={item.titulo}
                  ColorCuerpo={configuracionData?.colorCuerpo || ''}
                />
              ))}
            </div>

            <div className="row gy-3">
              {/* {jsonSeccionBarraPorcentaje.map((item, idx) => ( */}
              <SeccionBarraPorcentaje
                key="PNTY"
                Motor={configuracionData?.motorMoto_2 || ''}
                Cilindraje={configuracionData?.cilindrajeMoto_2 || ''}
                potencia={configuracionData?.maximaPotencianMoto_2 || ''}
                ColorCuerpo={configuracionData?.colorCuerpo || ''}
              />
              {/* ))} */}
            </div>
          </div>
        </div>

        <section className="row contenido__label__Especificacion text-center my-5">
          <label className="EspecificacionesTecnicas__Titulo__Home" style={{ color: configuracionData?.colorCuerpo }}>
            ESPECIFICACIONES TÉCNICAS
          </label>
        </section>

        <div className="row g-4 mb-5">
          {jsonItemsTecnicos.map((item, idx) => (
            <DescripcionSeccionBarraPorcentaje
              key={item.titulo || idx}
              Titulo={item.titulo}
              Descripcion={item.descripcion}
              ColorCuerpo={configuracionData?.colorCuerpo}
            />
          ))}
        </div>


        </div>
        </div>
      {/* </main> */}
      <div style={{background:"black"}} className='conten--video--youtube' >
      <div className='container-fluid' >
      <div className="row row--video--youtube--">
          <VideoPublicitario Link={configuracionData?.rutaYoutube} />
        </div>
      </div></div>
     <div style={{background:"#eeeeee"}}>
      <div className="contenido__NuestrasMarcas__Home" style={{ background: '#0e60ad' }}>
        <div className="container">
          <section className="row text-center">
            <label className="TituloNuestraMarca">NUESTRAS MARCAS</label>
          </section>

          <div className="row g-3 justify-content-center mb-1">
            {jsonLinkMarcas.map((item, idx) => (
              <MarcasPublicitarias key={item.id || idx} Link={item.url} />
            ))}
          </div>
        </div>
      </div>
      </div>
      <main className="container" style={{ padding: '1px' }}>
        <section className="row contenido__label__Especificacion text-center my-5 m-3">
          <label className="NuestraAliado__Titulo__Home" style={{ color: configuracionData?.colorTituloHome }}>
            ALIADOS FINANCIEROS
          </label>
          <CarruselAliados colorTitulo={configuracionData?.colorTituloHome} />
        </section>
      </main>
      </div>
    </div>
  );
}
