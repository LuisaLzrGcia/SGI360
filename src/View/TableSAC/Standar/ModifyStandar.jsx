import React, { useContext, useEffect, useState } from "react";
const API_SGI360 = import.meta.env.VITE_API_DATABASE;

function ModifyStandar({ item, handleRefresh = () => { }, closeModal }) {
  const idStandar = item.id;
  const [nameInput, setNameInput] = useState(item.name);
  const [descriptionInput, setDescriptionInput] = useState(item.description);

  function saveData() {
    const URL = `${API_SGI360}/admin/Standar/updateStandar.php`;
    console.log(URL)
    const data = {
      name: nameInput,
      description: descriptionInput,
      id: idStandar
    };

    console.log(data)
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        if (result.status === 'Successfully') {
          alert("Datos guardados");
          handleRefresh()
          closeModal();
        } else {
          console.log('Error al insertar');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al intentar guardar los datos');
      });
  }


  return (
    <>
      <div className="grid grid-cols-1 mt-3">
        <div>Nombre del estándar</div>
        <input
          type="text"
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Descripción</div>
        <input
          value={descriptionInput}
          onChange={(event) => setDescriptionInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <button
          onClick={saveData}
          disabled={nameInput === "" || descriptionInput === ""}
          className={`rounded-md p-2 text-white text-sm mt-1 ${nameInput === "" || descriptionInput === ""
            ? "bg-slate-500"
            : "bg-slate-700"
            }`}
        >
          Guardar datos
        </button>
      </div>
    </>
  );
}

export default ModifyStandar;
