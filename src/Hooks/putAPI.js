export default function putApi(URL, data, closeModal, refresh) {
  fetch(URL, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status == "Successfully") {
        alert("Datos modificados");
        closeModal();
        refresh();
      } else {
        console.log("Error al insertar");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al intentar guardar los datos");
    });
}
