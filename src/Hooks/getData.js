async function getData(URL) {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error en la petición");
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}
export default getData;
