import { createContext, useState, useEffect, useContext } from 'react';
import { ObtenerProductos, IniciarSesion } from '../services/ServicioConsumo';
import { decodeUnicodeDeep } from '../utils/decodeUnicode';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [empresa, setEmpresa] = useState('');
  const [productos, setProductos] = useState([]);
  const [segmentos, setSegmentos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [configuracionData, setConfiguracionData] = useState([]);
  const [marcaFiltro, setMarcaFiltro] = useState('');
  const [desplazamiento, setDesplazamiento] = useState('');
  const [marcasUnicas, setMarcasUnicas] = useState([]);
  const [marcasProductos, SetmarcasProductos] = useState([]);
  const [filtroInicial, setFiltroInicial] = useState('');
  const NIT = import.meta.env.VITE_API_NIT_EMPRESA;

  const getSegmentos = async () => {
    const data = {
      tipo: 'segmentos',
      nit: NIT,
    };
    try {
      const response = await ObtenerProductos(data);
      if (!response.Error) {
        const apiData = decodeUnicodeDeep(JSON.parse(response.Resultado).content)
        //setSegmentos(JSON.parse(response.Resultado).content);
       // console.log(apiData)
        setSegmentos(apiData)
      }
    } catch (error) {
      console.log(error);
      console.error('Error al obtener productos:', error.message);
    }
  };
  const getMarcasProductos = async () => {
    const data = {
      tipo: 'marcas',
      nit: NIT,
    };
    try {
      const response = await ObtenerProductos(data);
      if (!response.Error) {
        const apiData = decodeUnicodeDeep(JSON.parse(response.Resultado).content)
        //setSegmentos(JSON.parse(response.Resultado).content);
       // console.log(apiData)
       SetmarcasProductos(apiData)
      }
    } catch (error) {
      console.log(error);
      console.error('Error al obtener productos:', error.message);
    }
  };
  const getProductos = async () => {
    const data = {
      tipo: 'productos',
      nit: NIT,
    };
    try {
      const response = await ObtenerProductos(data);
      if (!response.Error) {
       // console.log(JSON.parse(response.Resultado).content)
        const apiData = decodeUnicodeDeep(JSON.parse(response.Resultado).content)
        //console.log(apiData)
        setProductos(apiData);
        //console.log(apiData)
       // setProductos(JSON.parse(response.Resultado).content);
    
      }
    } catch (error) {
      console.log(error);
      console.error('Error al obtener productos:', error.message);
    }
  };

  const getCofiguracion = async (nit, usuario, password, opcion) => {
    try {
      const jsonLogin = {
        nit: nit,
        usuario: usuario,
        password: password,
        opcion: opcion,
      };
      const response = await IniciarSesion(jsonLogin);
      if (!response.Error) {
        setConfiguracionData(response.Resultado);
      } else {
        toast.error(response.Mensaje);
      }
    } catch (error) {
      console.log(error);
      console.error('Error al obtener productos:', error.message);
    }
  };

  const getEmpresa = async () => {
    const data = {
      tipo: 'empresa',
      nit: NIT,
    };
    try {
      const response = await ObtenerProductos(data);
      if (!response.Error) {
        setEmpresa(JSON.parse(response.Resultado).content);
      }
    } catch (error) {
      console.log(error);
      console.error('Error al obtener productos:', error.message);
    }
  };

  useEffect(() => {
    // getCofiguracion();
    getEmpresa();
    getProductos();
    getSegmentos();
    getMarcasProductos();
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        marcaFiltro,
        setMarcaFiltro,
        productoSeleccionado,
        setProductoSeleccionado,
        segmentos,
        productos,
        empresa,
        configuracionData,
        setConfiguracionData,
        getCofiguracion,
        marcasUnicas,
        setMarcasUnicas,
        desplazamiento,
        setDesplazamiento,
        getProductos,
        getSegmentos,
        getMarcasProductos,
        marcasProductos,
        filtroInicial,         
        setFiltroInicial   
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
