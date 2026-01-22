import apiClients from './UseIntercept';

const { apiClient, apiClient2 } = apiClients;

export const ObtenerProductos = async (data) => {
  try {
    const response = await apiClient.post('Listados', data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const GuardarConfiguracion = async (data) => {
  try {
    const response = await apiClient2.post('ConfiguracionSave', data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const GuardarSucursales = async (data) => {
  try {
    const response = await apiClient2.post('SucursalSave', data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const IniciarSesion = async (data) => {
  try {
    const response = await apiClient.post('login', data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const GuardarPosVenta2 = async (data) => {
  try {
    const response = await apiClient2.post('PosventaSave', data);
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
export const GuardarConocenos = async (data) => {
  try {
    const response = await apiClient2.post('ConocenosSave', data);
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
export const GuardarPromociones = async (data) => {
  try {
    const response = await apiClient2.post('GuardarPromociones', data);
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
export const EliminarPromociones = async (data) => {
  try {
    const response = await apiClient2.post('EliminarItemsPromociones' ,data);
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
export const GuardarUbicacion = async (data) => {
  try {
    const response = await apiClient2.post('GuardarUbicacion' ,data);
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
export const GuardarHome = async (data) => {
  try {
    console.log(data)
    const response = await apiClient2.post('HomeSave', data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
