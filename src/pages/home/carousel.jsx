// components/carruselAliados.jsx
import React from 'react';

const aliados = [
  '/images/ban-100.png',
  '/images/bogoa.png',
  '/images/credicol.png',
  '/images/crediconsump.png',
  '/images/daviviend.png',
  '/images/exito.png',
  '/images/finaval.png',
  '/images/progresa.png',
  '/images/sistecre.png',
  '/images/sufi-1.png',
  '/images/vanti.png',
  '/images/daviviend.png',
];

const agruparDeTres = (arr) => {
  const grupos = [];
  for (let i = 0; i < arr.length; i += 3) {
    grupos.push(arr.slice(i, i + 3));
  }
  return grupos;
};
const CarruselAliados = () => {
  const grupos = agruparDeTres(aliados);

  return (
    <div id="carruselAliados" className="carousel slide carrusel__aliados" data-bs-ride="carousel">
      <div className="carousel-inner carrusel__aliados__inner">
        {grupos.map((grupo, idx) => (
          <div key={idx} className={`carousel-item carrusel__aliados__item ${idx === 0 ? 'active' : ''}`}>
            <div className="d-flex justify-content-center gap-3">
              {grupo.map((img, i) => (
                <img key={i} src={img} alt={`Aliado ${i}`} className="img-fluid carrusel__aliados__img" />
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev carrusel__aliados__control" type="button" data-bs-target="#carruselAliados" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>

      <button className="carousel-control-next carrusel__aliados__control" type="button" data-bs-target="#carruselAliados" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};

export default CarruselAliados;
