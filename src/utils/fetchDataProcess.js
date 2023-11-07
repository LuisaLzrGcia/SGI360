import getData from "../Hooks/getData";
const API_SGI360 = import.meta.env.VITE_API_DATABASE;

export async function fetchDataProcess() {
  try {
    const data = await getData(`${API_SGI360}/admin/Process/nameProcess.php`);
    return data;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return [];
  }
}
