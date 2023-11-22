import React, { useContext, useEffect, useState } from "react";
import deleteAPI from '../../../Hooks/deleteAPI'
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;

function DeleteAudit({ item, handleRefresh = () => { }, closeModal }) {
  const [codeInput, setCodeInput] = useState(item.audit_code);
  const [standarInput, setStandarInput] = useState(item.standar_name);
  const [descriptionInput, setDescriptionInput] = useState(item.audit_description);
  const [startDateInput, setStartDateInput] = useState(item.formattedStartDate);
  const [finishDateInput, setFinishDateInput] = useState(item.formattedFinishDate);


  const [typeInput, setTypeInput] = useState(item.audit_type);
  const [statusInput, setStatusInput] = useState(item.audit_status)

  function saveData() {
    const URL = `${API_SGI360_NODEJS}/audit/${item.id_audit_pk}`;
    deleteAPI(URL, closeModal, handleRefresh)
  }

  const isEmpty =
    codeInput.trim() == "" ||
    startDateInput == "" ||
    finishDateInput == "" ||
    standarInput.trim() == "" ||
    typeInput == "" ||
    descriptionInput.trim() == "";

  return (
    <>
      <div className="grid grid-cols-1 mt-3">
        <h1 className="font-bold text-center my-1">
          ¿Esta seguro de eliminar esta auditoría?
        </h1>
        <div>Fecha de inicio</div>
        <input
          type="text"
          disabled={true}
          value={startDateInput}
          onChange={(event) => startDateInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Fecha de cierre</div>
        <input
          type="text"
          disabled={true}
          value={finishDateInput}
          onChange={(event) => setFinishDateInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Tipo</div>
        <input
          type="text"
          disabled={true}
          value={typeInput}
          onChange={(event) => setTypeInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Estado</div>
        <input
          type="text"
          disabled={true}
          value={statusInput}
          onChange={(event) => setStatusInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Código</div>
        <input
          type="text"
          disabled={true}
          value={codeInput}
          onChange={(event) => setCodeInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Estándar</div>
        <input
          type="text"
          disabled={true}
          value={standarInput}
          onChange={(event) => setStandarInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Descripción</div>
        <textarea
          cols="5" rows=""
          disabled={true}
          value={descriptionInput}
          onChange={(event) => setStandarInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        ></textarea>
        <button
          onClick={saveData}
          disabled={isEmpty}
          className={`rounded-md p-2 text-white text-sm mt-1 ${isEmpty ? 'bg-slate-500' : 'bg-slate-700'}
            `}
        >
          Eliminar datos
        </button>
      </div >
    </>
  );
}

export default DeleteAudit;
