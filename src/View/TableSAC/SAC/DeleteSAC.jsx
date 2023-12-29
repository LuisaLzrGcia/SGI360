import React, { useContext, useEffect, useState } from "react";
import deleteAPI from '../../../Hooks/deleteAPI';
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;

function DeleteSAC({ item, handleRefresh = () => { }, closeModal, }) {
  const [standarInput, setStandarInput] = useState(item.standar_name);
  const [codeInput, setCodeInput] = useState(item.code);
  const [processInput, setProcessInput] = useState(item.process_name)
  const [statusInput, setStatusInput] = useState(item.sac_status)
  const [codeSAC, setCodeSAC] = useState(item.sac_code)
  const [descriptionInput, setDescriptionInput] = useState(item.sac_description);

  function saveData() {
    const URL = `${API_SGI360_NODEJS}/sac/${item.id_sac_pk}`;

    deleteAPI(URL, closeModal, handleRefresh)

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
        <div>Código</div>
        <input type="text"
          className="px-2 py-1 border rounded-md bg-gray-50"
          value={codeSAC}
          disabled={true}
          onChange={(event) => setCodeInput(event.target.value)} />
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
