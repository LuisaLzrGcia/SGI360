import getDataAPI from "../Hooks/getDataAPI";
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;

export default async function fetchDataPerspective() {
  try {
    const data = await getDataAPI(`${API_SGI360_NODEJS}/perspective`);
    const perspective = data.map((item) => item.perspective);
    return perspective;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return [];
  }
}
