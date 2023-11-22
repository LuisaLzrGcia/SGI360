async function dataAPI(URL, method = "GET", body = null) {
    try {
      const options = {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
  
      if (body) {
        options.body = JSON.stringify(body);
      }
  
      const response = await fetch(URL, options);
  
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
  
  export default dataAPI;
  