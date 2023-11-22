import getDataAPI from "../Hooks/getDataAPI"; 
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;

export async function fetchDataProcess() {
  try {
    const data = await getDataAPI(`${API_SGI360_NODEJS}/process`);
    return data;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return [];
  }
}
