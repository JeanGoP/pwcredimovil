import React, { useEffect, useState } from 'react';

const AnimatedCounter = ({ target, duration = 4000, suffix = '', label = '' }) => {
  const [count, setCount] = useState(0);
  const [fontSize, setFontSize] = useState('4rem');

  useEffect(() => {
    // Calcular tamaño de fuente según ancho de ventana
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setFontSize('2.5rem'); // Móviles pequeños
      } else if (width < 768) {
        setFontSize('3rem'); // Tablets o móviles grandes
      } else if (width < 1024) {
        setFontSize('3.5rem'); // Laptops pequeñas
      } else {
        setFontSize('4rem'); // Escritorio
      }
    };

    handleResize(); // Ejecutar al inicio
    window.addEventListener('resize', handleResize); // Escuchar cambios
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 50);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 50);
    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <div style={{ textAlign: 'center', fontFamily: "'Bebas Neue', sans-serif" }}>
      <div style={{ fontSize, fontWeight: 'bolder' }}>
        {count}
        <span style={{ color: '#d63201' }}>{suffix}</span>
      </div>
      <div style={{ fontSize: '1rem', marginTop: '0.25rem' }}>{label}</div>
    </div>
  );
};

export default AnimatedCounter;
