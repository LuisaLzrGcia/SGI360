export default function deleteAPI(URL, closeModal, refresh) {
  fetch(URL, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status == "Successfully") {
        alert("Datos eliminados");
        closeModal();
        refresh();
      } else {
        console.log("Error al eliminar");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al intentar eliminar los datos");
    });
}
