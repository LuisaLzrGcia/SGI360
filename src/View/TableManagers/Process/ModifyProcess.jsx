import React, { useEffect, useState } from "react";
import getData from "../../../Hooks/getData";
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;

const ModifyProcess = ({ processData = "", setData = "", closeModal }) => {
  const [process, setProcess] = useState(processData.name)
  const [abbreviation, setAbbreviation] = useState(processData.abbreviation)

  const saveData = async () => {
    const URL = `${API_SGI360_NODEJS}/process`;
    const data = {
      newNameProcess: process,
      newAbbreviation: abbreviation,
      processId: processData.id_process_pk
    };

    fetch(URL, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        if (result.status === 'Successfully') {
          alert("Datos guardados");
          setData()
          closeModal();
        } else {
          console.log('Error al insertar');
        }
      })
      .catch(error => {
        console.log(result.status)
        console.error('Error:', error);
        alert('Error al intentar guardar los datos');
      });
      
  }

  return (
    <>
      <div className="grid grid-cols-1 mt-3">
        <div>Nombre del proceso</div>
        <input type="text"
          value={process}
          onChange={(event) => setProcess(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50" />
        <div>Abreviación</div>
        <input
          value={abbreviation}
          onChange={(event) => setAbbreviation(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50" />
        <button
          onClick={saveData}
          disabled={process === "" || abbreviation === ""}
          className={`rounded-md p-2 text-white text-sm mt-1 ${process === "" || abbreviation === "" ? 'bg-slate-500' : 'bg-slate-700'}`}
        >
          Guardar datos
        </button>
      </div>
    </>
  )
};
export default ModifyProcess;