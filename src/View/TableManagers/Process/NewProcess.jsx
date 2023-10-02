import React, { useContext, useEffect, useState } from "react";
import getData from "../../../Hooks/getData";
const API_SGI360 = import.meta.env.VITE_API_DATABASE;

function NewProcess({ setData = "", closeModal, updateData }) {
  const [nameInput, setNameInput] = useState("");
  const [abbreviationInput, setAbbreviationInput] = useState("");
  function saveData() {
    const URL = `${API_SGI360}/admin/Process/insertProcess.php`;
    const data = {
      newNameProcess: nameInput,
      newAbbreviation: abbreviationInput
    };

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
          setData(`${API_SGI360}/admin/Process/allProcess.php`)
          closeModal();
        } else {
          console.log('Error al insertar');
        }
        alert(result.status);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al intentar guardar los datos');
      });
  }


  return (
    <>
      <div className="grid grid-cols-1 mt-3">
        <div>Nombre del proceso</div>
        <input
          type="text"
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Abreviación</div>
        <input
          value={abbreviationInput}
          onChange={(event) => setAbbreviationInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <button
          onClick={saveData}
          disabled={nameInput === "" || abbreviationInput === ""}
          className={`rounded-md p-2 text-white text-sm mt-1 ${nameInput === "" || abbreviationInput === ""
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

export default NewProcess;
