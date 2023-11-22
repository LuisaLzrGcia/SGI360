import React, { useContext, useEffect, useState } from "react";
const API_SGI360 = import.meta.env.VITE_API_DATABASE;

function DeleteSAC({ item, handleRefresh = () => { }, closeModal, }) {
  console.log(item)
  const [standarInput, setStandarInput] = useState(item.standar_name);
  const [codeInput, setCodeInput] = useState(item.code);
  const [processInput, setProcessInput] = useState(item.process_name)
  const [statusInput, setStatusInput] = useState(item.sac_status)
  const [descriptionInput, setDescriptionInput] = useState(item.sac_description);

  function saveData() {
    const URL = `${API_SGI360}/admin/SAC/deleteSAC.php`;
    const data = {
      id: item.id_sac_pk,
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
          alert("Datos eliminados");
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
        <h1 className="font-bold text-center my-1">
          ¿Esta seguro de eliminar esta SAC?
        </h1>
        <div>Estándar</div>
        <input
          type="text"
          value={standarInput}
          disabled={true}
          onChange={(event) => setStandarInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Auditoría</div>
        <input
          type="text"
          value={codeInput}
          disabled={true}
          onChange={(event) => setCodeInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Proceso</div>
        <input
          type="text"
          value={processInput}
          disabled={true}
          onChange={(event) => setProcessInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Estado</div>
        <input
          type="text"
          value={statusInput}
          disabled={true}
          onChange={(event) => setStatusInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Descripción</div>
        <textarea
          cols="5" rows=""
          disabled={true}
          value={descriptionInput}
          onChange={(event) => setDescriptionInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        ></textarea>
        <button
          onClick={saveData}
          className={`rounded-md p-2 text-white text-sm mt-1 bg-slate-700`}
        >
          Eliminar datos
        </button>
      </div >
    </>
  );
}

export default DeleteSAC;
